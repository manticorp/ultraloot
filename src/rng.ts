import validate from './number';
import Pool from './rng/pool';
import { NonRandomDetector } from './rng/queue';
import { ChancyInterface, DiceInterface, Distribution, Chancy, ChancyNumeric, Seed, Randfunc, RngInterface, RngDistributionsInterface } from './rng/interface';

/**
 * Safeguard against huge loops. If loops unintentionally grow beyond this
 * arbitrary limit, bail out..
 */
const LOOP_MAX = 10000000;

/**
 * Safeguard against too much recursion - if a function recurses more than this,
 * we know we have a problem.
 *
 * Max recursion limit is around ~1000 anyway, so would get picked up by interpreter.
 */
const MAX_RECURSIONS = 500;

const THROW_ON_MAX_RECURSIONS_REACHED = true;
const PREDICTABLE_SEED = 5789938451;
const SAMERANDOM_MAX = 10;

const diceRe: RegExp = /^ *([+-]? *[0-9_]*) *[dD] *([0-9_]+) *([+-]? *[0-9_.]*) *$/;
const strToNumberCache: Record<string, number> = {};
const diceCache: Record<string, DiceInterface> = {};

export interface SerializedRng {
  mask: number,
  seed: number,
  m_z: number,
}

export class MaxRecursionsError extends Error {}
export class NonRandomRandomError extends Error {}

function sum (numbers: number[], ...other: []): number;
function sum (...numbers: number[]): number;
function sum (numbersFirstArg: number | number[], ...numbers: number[]): number {
  if (Array.isArray(numbersFirstArg)) {
    return numbersFirstArg.reduce((a, b) => a + b, 0);
  }
  return numbers.reduce((a, b) => a + b, 0);
}

function isNumeric (input: any) {
  return (typeof input === 'number') || (!isNaN(parseFloat(input)) && isFinite(input));
}

/**
 * This abstract class implements most concrete implementations of
 * functions, as the only underlying changes are likely to be to the
 * uniform random number generation, and how that is handled.
 *
 * All the typedoc documentation for this has been sharded out to RngInterface
 * in a separate file.
 */
export abstract class RngAbstract implements RngInterface, RngDistributionsInterface {
  #seed: number = 0;
  #monotonic: number = 0;
  #lastuniqid: number = 0;
  #randFunc?: Randfunc | null;
  #shouldThrowOnMaxRecursionsReached?: boolean;
  #distributions: Distribution[] = [
    'normal',
    'gaussian',
    'boxMuller',
    'irwinHall',
    'bates',
    'batesgaussian',
    'bernoulli',
    'exponential',
    'pareto',
    'poisson',
    'hypergeometric',
    'rademacher',
    'binomial',
    'betaBinomial',
    'beta',
    'gamma',
    'studentsT',
    'wignerSemicircle',
    'kumaraswamy',
    'hermite',
    'chiSquared',
    'rayleigh',
    'logNormal',
    'cauchy',
    'laplace',
    'logistic',
  ];

  constructor (seed?: Seed) {
    this.setSeed(seed);
  }

  public getSeed (): number {
    return this.#seed;
  }

  public sameAs (other: RngInterface): boolean {
    if (other instanceof RngAbstract) {
      return this.#seed === other.#seed && this.#randFunc === other.#randFunc;
    }
    return false;
  }

  public randomSource (source?: Randfunc | null): this {
    this.#randFunc = source;
    return this;
  }

  public getRandomSource () {
    return this.#randFunc;
  }

  protected setSeed (seed?: Seed): this {
    if (typeof seed !== 'undefined' && seed !== null) {
      if (typeof seed === 'string') {
        seed = this.convertStringToNumber(seed);
      }
      this.#seed = seed;
    } else {
      return this.setSeed(Math.ceil(Math.random() * 100000000));
    }
    return this;
  }

  public seed (seed?: Seed): this {
    this.setSeed(seed);
    return this;
  }

  public serialize (): any {
    return {
      seed: this.#seed,
    };
  }

  /**
   * {@inheritDoc RngConstructor.unserialize}
   * @group Serialization
   */
  public static unserialize (serialized: SerializedRng): RngInterface {
    const { constructor } = Object.getPrototypeOf(this);
    const rng = new constructor(serialized.seed);
    rng.setSeed(serialized.seed);
    return rng;
  }

  public predictable (seed?: Seed): RngInterface {
    const { constructor } = Object.getPrototypeOf(this);
    const newSelf: RngInterface = new constructor(seed ?? PREDICTABLE_SEED);
    return newSelf;
  }

  /**
   * {@inheritDoc RngInterface.predictable}
   * @group Seeding
   */
  public static predictable<T extends RngAbstract>(this: new (seed: Seed) => T, seed: Seed): T {
    return new this(seed ?? PREDICTABLE_SEED);
  }

  protected hashStr (str: string): number {
    let hash = 0;
    let i;
    let chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  protected convertStringToNumber (str: string): number {
    if (strToNumberCache[str]) {
      return strToNumberCache[str];
    }
    const num = this.hashStr(str);
    strToNumberCache[str] = num;
    return num;
  }

  protected _random (): number {
    if (typeof this.#randFunc === 'function') {
      return this.#randFunc();
    }
    return this._next();
  }

  /**
   * Internal source of uniformly distributed random numbers between 0 and 1, [0, 1)
   *
   * Simplest implementation would be Math.random()
   */
  protected abstract _next (): number;

  public percentage (): number {
    return this.randBetween(0, 100);
  }

  public probability (): number {
    return this.randBetween(0, 1);
  }

  public random (from: number = 0, to: number = 1, skew: number = 0): number {
    return this.randBetween(from, to, skew);
  }

  public chance (n: number, chanceIn: number = 1): boolean {
    validate({ chanceIn }).positive();
    validate({ n }).positive();

    const chance = n / chanceIn;
    return this._random() <= chance;
  }

  // 500 to 1 chance, for example
  public chanceTo (from: number, to: number): boolean {
    return this.chance(from, from + to);
  }

  public randInt (from: number = 0, to: number = 1, skew: number = 0): number {
    validate({ from }).int();
    validate({ to }).int();

    if (from === to) {
      return from;
    }

    [from, to] = [Math.min(from, to), Math.max(from, to)];
    let rand = this._random();
    if (skew < 0) {
      rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
    } else {
      rand = Math.pow(rand, Math.pow(2, -skew));
    }
    return Math.floor(rand * ((to + 1) - from)) + from;
  }

  public uniqid (prefix: string = ''): string {
    const now = Date.now() * 1000;
    if (this.#lastuniqid === now) {
      this.#monotonic++;
    } else {
      this.#monotonic = Math.round(this._random() * 100);
    }
    const sec = now + this.#monotonic;
    const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
    this.#lastuniqid = now;
    return `${prefix}${id}`;
  }

  public randomString (len: number = 6): string {
    validate({ len }).gt(0);

    const str: string[] = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const alen = 61;
    for (let i = 0; i < len; i++) {
      str.push(alphabet[this.randInt(0, alen)]);
    }
    return str.join('');
  }

  public randBetween (from: number = 0, to?: number, skew: number = 0): number {
    if (typeof to === 'undefined') {
      to = from + 1;
    }
    [from, to] = [Math.min(from, to), Math.max(from, to)];
    let rand = this._random();
    if (skew < 0) {
      rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
    } else {
      rand = Math.pow(rand, Math.pow(2, -skew));
    }
    return this.scaleNorm(rand, from, to);
  }

  public scale (number: number, from: number, to: number, min: number = 0, max: number = 1): number {
    validate({ number }).lteq(max);
    validate({ number }).gteq(min);

    // First we scale the number in the range [0-1)
    number = (number - min) / (max - min);
    return this.scaleNorm(number, from, to);
  }

  public scaleNorm (number: number, from: number, to: number): number {
    validate({ number }).betweenEq(0, 1);

    return (number * (to - from)) + from;
  }

  public shouldThrowOnMaxRecursionsReached (): boolean;
  public shouldThrowOnMaxRecursionsReached (val: boolean): this;
  public shouldThrowOnMaxRecursionsReached (val?: boolean): boolean | this {
    if (typeof val === 'boolean') {
      this.#shouldThrowOnMaxRecursionsReached = val;
      return this;
    }
    if (typeof this.#shouldThrowOnMaxRecursionsReached !== 'undefined') {
      return this.#shouldThrowOnMaxRecursionsReached;
    }
    return THROW_ON_MAX_RECURSIONS_REACHED;
  }

  /**
   * Generates a normally distributed number, but with a special clamping and skewing procedure
   * that is sometimes useful.
   *
   * Note that the results of this aren't strictly gaussian normal when min/max are present,
   * but for our puposes they should suffice.
   *
   * Otherwise, without min and max and skew, the results are gaussian normal.
   *
   * @example
   *
   * rng.normal({ min: 0, max: 1, stddev: 0.1 });
   * rng.normal({ mean: 0.5, stddev: 0.5 });
   *
   * @see [Normal Distribution - Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)
   * @group Random Number Generation
   * @param [options]
   * @param [options.mean] - The mean value of the distribution
   * @param [options.stddev] - Must be > 0 if present
   * @param [options.skew] - The skew to apply. -ve = left, +ve = right
   * @param [options.min] - Minimum value allowed for the output
   * @param [options.max] - Maximum value allowed for the output
   * @param [depth] - used internally to track the recursion depth
   * @return A normally distributed number
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   * @throws {@link MaxRecursionsError} If the function recurses too many times in trying to generate in bounds numbers
   */
  public normal ({ mean, stddev, max, min, skew = 0 }: { mean?: number, stddev?: number, max?: number, min?: number, skew?: number } = {}, depth = 0): number {
    if (typeof min === 'undefined' && typeof max === 'undefined') {
      return this.gaussian({ mean, stddev, skew });
    }
    if (depth > MAX_RECURSIONS && this.shouldThrowOnMaxRecursionsReached()) {
      throw new MaxRecursionsError(`Max recursive calls to rng normal function. This might be as a result of using predictable random numbers, or inappropriate arguments? Args: ${JSON.stringify({ mean, stddev, max, min, skew })}`);
    }
    let num = this.bates(7);

    if (skew < 0) {
      num = 1 - (Math.pow(num, Math.pow(2, skew)));
    } else {
      num = Math.pow(num, Math.pow(2, -skew));
    }

    if (
      typeof mean === 'undefined' &&
      typeof stddev === 'undefined' &&
      typeof max !== 'undefined' &&
      typeof min !== 'undefined'
    ) {
      // This is a simple scaling of the bates distribution.
      return this.scaleNorm(num, min, max);
    }

    num = (num * 10) - 5;
    if (typeof mean === 'undefined') {
      mean = 0;
      if (typeof max !== 'undefined' && typeof min !== 'undefined') {
        mean = (max + min) / 2;
        if (typeof stddev === 'undefined') {
          stddev = Math.abs(max - min) / 10;
        }
      }
      if (typeof stddev === 'undefined') {
        stddev = 0.1;
      }
      num = num * stddev + mean;
    } else {
      if (typeof stddev === 'undefined') {
        if (typeof max !== 'undefined' && typeof min !== 'undefined') {
          stddev = Math.abs(max - min) / 10;
        } else {
          stddev = 0.1;
        }
      }
      num = num * stddev + mean;
    }

    if (depth <= MAX_RECURSIONS && ((typeof max !== 'undefined' && num > max) || (typeof min !== 'undefined' && num < min))) {
      return this.normal({ mean, stddev, max, min, skew }, depth + 1);
    }

    // In the case where we are above the max recursion limit, we just clamp the number...
    // this can happen in extreme cases where parameters are very marginal, but we do not
    // want to return any out of bounds numbers in the case that max and min are given, even
    // if they are not strictly normally distributed - i.e. there will be a very marginal bias
    // to the bounds numbers in certain cases, but it's largely a non-issue.
    if (typeof max !== 'undefined') {
      num = Math.min(num, max);
    }
    if (typeof min !== 'undefined') {
      num = Math.max(num, min);
    }
    return num;
  }

  public gaussian ({ mean = 0, stddev = 1, skew = 0 } : { mean?: number, stddev?: number, skew?: number } = {}): number {
    validate({ stddev }).positive();

    if (skew === 0) {
      return this.boxMuller({ mean, stddev });
    }

    let num = this.boxMuller({ mean: 0, stddev: 1 });
    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (skew < 0) {
      num = 1 - (Math.pow(num, Math.pow(2, skew)));
    } else {
      num = Math.pow(num, Math.pow(2, -skew));
    }

    num = num * 10;
    num = num - 5;
    num = num * stddev + mean;

    return num;
  }

  public boxMuller (mean: number | { mean?: number, stddev?: number } = 0, stddev: number = 1): number {
    if (typeof mean === 'object') {
      ({ mean = 0, stddev = 1 } = mean);
    }
    validate({ stddev }).gteq(0);
    const u = 1 - this._random(); // Converting [0,1) to (0,1]
    const v = this._random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    return z * stddev + mean;
  }

  public irwinHall (n: number | { n?: number } = 6): number {
    if (typeof n === 'object') {
      ({ n = 6 } = n);
    }
    validate({ n }).int().positive();
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += this._random();
    }
    return sum;
  }

  public bates (n: number | { n?: number } = 6): number {
    if (typeof n === 'object') {
      ({ n = 6 } = n);
    }
    validate({ n }).int().positive();

    return this.irwinHall({ n }) / n;
  }

  public batesgaussian (n: number | { n?: number } = 6): number {
    if (typeof n === 'object') {
      ({ n = 6 } = n);
    }
    validate({ n }).int().gt(1);

    return (this.irwinHall({ n }) / Math.sqrt(n)) - ((1 / Math.sqrt(1 / n)) / 2);
  }

  public bernoulli (p: number | { p?: number } = 0.5): number {
    if (typeof p === 'object') {
      ({ p = 0.5 } = p);
    }
    validate({ p }).lteq(1).gteq(0);

    return this._random() < p ? 1 : 0;
  }

  public exponential (rate: number | { rate?: number } = 1): number {
    if (typeof rate === 'object') {
      ({ rate = 1 } = rate);
    }
    validate({ rate }).gt(0);
    return -Math.log(1 - this._random()) / rate;
  }

  public pareto ({ shape = 0.5, scale = 1, location = 0 }: { shape?: number, scale?: number, location?: number } = {}): number {
    validate({ shape }).gteq(0);
    validate({ scale }).positive();

    const u = this._random();
    if (shape !== 0) {
      return location + (scale / shape) * (Math.pow(u, -shape) - 1);
    } else {
      return location - scale * Math.log(u);
    }
  }

  public poisson (lambda: number | { lambda?: number } = 1): number {
    if (typeof lambda === 'object') {
      ({ lambda = 1 } = lambda);
    }
    validate({ lambda }).positive();

    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    let i = 0;
    const nq = new NonRandomDetector(SAMERANDOM_MAX, 2);

    do {
      k++;
      const r = this._random();
      nq.push(r);
      p *= r;
      nq.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the poisson distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${r}`);
    } while (p > L && i++ < LOOP_MAX);

    if ((i + 1) >= LOOP_MAX) {
      throw new Error('LOOP_MAX reached in poisson - bailing out - possible parameter error, or using non-random source?');
    }

    return k - 1;
  }

  public hypergeometric ({ N = 50, K = 10, n = 5, k }: { N?: number, K?: number, n?: number, k?: number } = {}): number {
    validate({ N }).int().positive();
    validate({ K }).int().positive().lteq(N);
    validate({ n }).int().positive().lteq(N);

    if (typeof k === 'undefined') {
      k = this.randInt(0, Math.min(K, n));
    }
    validate({ k }).int().betweenEq(0, Math.min(K, n));

    function logFactorial (x: number): number {
      let res = 0;
      for (let i = 2; i <= x; i++) {
        res += Math.log(i);
      }
      return res;
    }

    function logCombination (a: number, b: number): number {
      return logFactorial(a) - logFactorial(b) - logFactorial(a - b);
    }

    const logProb = logCombination(K, k) + logCombination(N - K, n - k) - logCombination(N, n);
    return Math.exp(logProb);
  }

  public rademacher (): -1 | 1 {
    return this._random() < 0.5 ? -1 : 1;
  }

  public binomial ({ n = 1, p = 0.5 }: { n?: number, p?: number } = {}): number {
    validate({ n }).int().positive();
    validate({ p }).betweenEq(0, 1);

    let successes = 0;
    for (let i = 0; i < n; i++) {
      if (this._random() < p) {
        successes++;
      }
    }
    return successes;
  }

  public betaBinomial ({ alpha = 1, beta = 1, n = 1 }: { alpha?: number, beta?: number, n?: number } = {}): number {
    validate({ alpha }).positive();
    validate({ beta }).positive();
    validate({ n }).int().positive();

    const bd = (alpha: number, beta: number): number => {
      let x = this._random();
      let y = this._random();
      x = Math.pow(x, 1 / alpha);
      y = Math.pow(y, 1 / beta);
      return x / (x + y);
    };

    const p = bd(alpha, beta);
    let k = 0;

    for (let i = 0; i < n; i++) {
      if (this._random() < p) {
        k++;
      }
    }
    return k;
  }

  public beta ({ alpha = 0.5, beta = 0.5 }: { alpha?: number, beta?: number } = {}): number {
    validate({ alpha }).positive();
    validate({ beta }).positive();

    const gamma = (alpha: number): number => {
      let x = 0;
      for (let i = 0; i < alpha; i++) {
        const r = this._random();
        x += -Math.log(r);
        if ((i + 1) >= LOOP_MAX) {
          throw new Error('LOOP_MAX reached in beta - bailing out - possible parameter error, or using non-random source?');
        }
      }
      return x;
    };

    const x = gamma(alpha);
    const y = gamma(beta);
    return x / (x + y);
  }

  public gamma ({ shape = 1, rate, scale }: { shape?: number, rate?: number, scale?: number } = {}): number {
    validate({ shape }).positive();
    if (typeof scale !== 'undefined' && typeof rate !== 'undefined' && rate !== 1 / scale) {
      throw new Error('Cannot supply rate and scale');
    }
    if (typeof scale !== 'undefined') {
      validate({ scale }).positive();
      rate = 1 / scale;
    }
    if (typeof rate === 'undefined') {
      rate = 1;
    }
    if (rate) {
      validate({ rate }).positive();
    }
    let flg;
    let x2;
    let v0;
    let v1;
    let x;
    let u;
    let v = 1;
    const d = shape - 1 / 3;
    const c = 1.0 / Math.sqrt(9.0 * d);
    let i = 0;

    flg = true;
    const nq1 = new NonRandomDetector(SAMERANDOM_MAX);

    while (flg && i++ < LOOP_MAX) {
      let j = 0;
      const nq2 = new NonRandomDetector(SAMERANDOM_MAX);
      do {
        x = this.normal();
        nq2.push(x);
        nq2.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul ofthe looped way of generating.`);
        v = 1.0 + (c * x);
      } while (v <= 0.0 && j++ < LOOP_MAX);
      if ((j + 1) >= LOOP_MAX) {
        throw new Error(`LOOP_MAX reached inside gamma inner loop - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
      }

      v *= Math.pow(v, 2);
      x2 = Math.pow(x, 2);

      v0 = 1.0 - (0.331 * x2 * x2);
      v1 = (0.5 * x2) + (d * (1.0 - v + Math.log(v)));

      u = this._random();
      nq1.push(u);
      nq1.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${u}`);
      if (u < v0 || Math.log(u) < v1) {
        flg = false;
      }
    }
    if ((i + 1) >= LOOP_MAX) {
      throw new Error(`LOOP_MAX reached inside gamma - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
    }
    return rate * d * v;
  }

  public studentsT (nu: number | { nu?: number } = 1): number {
    if (typeof nu === 'object') {
      ({ nu = 1 } = nu);
    }
    validate({ nu }).positive();

    const normal = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
    const chiSquared = this.gamma({ shape: nu / 2, rate: 2 });
    return normal / Math.sqrt(chiSquared / nu);
  }

  public wignerSemicircle (R: number | { R?: number } = 1): number {
    if (typeof R === 'object') {
      ({ R = 1 } = R);
    }
    validate({ R }).gt(0);

    const theta = this._random() * 2 * Math.PI;
    return R * Math.cos(theta);
  }

  public kumaraswamy ({ alpha = 0.5, beta = 0.5 }: { alpha?: number, beta?: number } = {}): number {
    validate({ alpha }).gt(0);
    validate({ beta }).gt(0);

    const u = this._random();
    return Math.pow(1 - Math.pow(1 - u, 1 / beta), 1 / alpha);
  }

  public hermite ({ lambda1 = 1, lambda2 = 2 }: { lambda1?: number, lambda2?: number } = {}): number {
    validate({ lambda1 }).gt(0);
    validate({ lambda2 }).gt(0);

    const x1 = this.poisson({ lambda: lambda1 });
    const x2 = this.poisson({ lambda: lambda2 });

    return x1 + x2;
  }

  public chiSquared (k: number | { k?: number } = 1): number {
    if (typeof k === 'object') {
      ({ k = 1 } = k);
    }
    validate({ k }).positive().int();

    let sum = 0;
    for (let i = 0; i < k; i++) {
      const z = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
      sum += z * z;
    }
    return sum;
  }

  public rayleigh (scale: number | { scale?: number } = 1): number {
    if (typeof scale === 'object') {
      ({ scale = 1 } = scale);
    }
    validate({ scale }).gt(0);
    return scale * Math.sqrt(-2 * Math.log(this._random()));
  }

  public logNormal ({ mean = 0, stddev = 1 } : { mean?: number, stddev?: number } = {}): number {
    validate({ stddev }).gt(0);

    const normal = mean + stddev * Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
    return Math.exp(normal);
  }

  public cauchy ({ median = 0, scale = 1 } : { median?: number, scale?: number } = {}): number {
    validate({ scale }).gt(0);

    const u = this._random();
    return median + scale * Math.tan(Math.PI * (u - 0.5));
  }

  public laplace ({ mean = 0, scale = 1 } : { mean?: number, scale?: number } = {}): number {
    validate({ scale }).gt(0);

    const u = this._random() - 0.5;
    return mean - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
  }

  public logistic ({ mean = 0, scale = 1 } : { mean?: number, scale?: number } = {}): number {
    validate({ scale }).gt(0);

    const u = this._random();
    return mean + scale * Math.log(u / (1 - u));
  }

  /**
   * Returns the support of the given distribution.
   *
   * @see [Wikipedia - Support (mathematics)](https://en.wikipedia.org/wiki/Support_(mathematics)#In_probability_and_measure_theory)
   */
  public support (distribution: Distribution): string | undefined {
    const map : Record<Distribution | 'random' | 'integer', string> = {
      random: '[min, max)',
      integer: '[min, max]',
      normal: '(-INF, INF)',
      boxMuller: '(-INF, INF)',
      gaussian: '(-INF, INF)',
      irwinHall: '[0, n]',
      bates: '[0, 1]',
      batesgaussian: '(-INF, INF)',
      bernoulli: '{0, 1}',
      exponential: '[0, INF)',
      pareto: '[scale, INF)',
      poisson: '{1, 2, 3 ...}',
      hypergeometric: '{max(0, n+K-N), ..., min(n, K)}',
      rademacher: '{-1, 1}',
      binomial: '{0, 1, 2, ..., n}',
      betaBinomial: '{0, 1, 2, ..., n}',
      beta: '(0, 1)',
      gamma: '(0, INF)',
      studentsT: '(-INF, INF)',
      wignerSemicircle: '[-R; +R]',
      kumaraswamy: '(0, 1)',
      hermite: '{0, 1, 2, 3, ...}',
      chiSquared: '[0, INF)',
      rayleigh: '[0, INF)',
      logNormal: '(0, INF)',
      cauchy: '(-INF, +INF)',
      laplace: '(-INF, +INF)',
      logistic: '(-INF, +INF)',
    };
    return map[distribution];
  }

  public chancyInt (input: Chancy): number {
    if (typeof input === 'number') {
      return Math.round(input);
    }
    if (Array.isArray(input)) {
      for (const el of input) {
        if (!isNumeric(el)) {
          throw new Error('Cannot pass non-numbers to chancyInt');
        }
      }
      let choice = this.choice(input);
      if (typeof choice !== 'number') {
        choice = parseFloat(choice);
      }
      return Math.round(choice);
    }
    if (typeof input === 'object') {
      const type = input.type ?? 'random';
      if (type === 'random') {
        input.type = 'integer';
      } else if (type === 'normal') {
        input.type = 'normal_integer';
      }
    }
    return Math.round(this.chancy(input));
  }

  public chancy<T>(input: T[], depth?: number): T;
  public chancy (input: ChancyNumeric, depth?: number): number;
  public chancy(input: Chancy, depth = 0): any {
    if (depth >= MAX_RECURSIONS) {
      if (this.shouldThrowOnMaxRecursionsReached()) {
        throw new MaxRecursionsError('Max recursions reached in chancy. Usually a case of badly chosen min/max values.');
      } else {
        return 0;
      }
    }
    if (Array.isArray(input)) {
      return this.choice(input);
    }
    if (typeof input === 'string') {
      return this.dice(input);
    }
    if (typeof input === 'object') {
      input.type = input.type ?? 'random';

      if (
        input.type === 'random' ||
        input.type === 'int' ||
        input.type === 'integer'
      ) {
        if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
          input.max = Number.MAX_SAFE_INTEGER;
        }
      }

      switch (input.type) {
        case 'random':
          return this.random(
            input.min,
            input.max,
            input.skew
          );
        case 'int':
        case 'integer':
          return this.randInt(
            input.min,
            input.max,
            input.skew
          );
        case 'normal_integer':
        case 'normal_int':
          return Math.floor(this.normal(input));
        case 'dice':
          return this.chancyMinMax(this.dice(input.dice ?? input), input, depth);
        case 'rademacher':
          return this.chancyMinMax(this.rademacher(), input, depth);
        case 'normal':
        case 'gaussian':
        case 'boxMuller':
        case 'irwinHall':
        case 'bates':
        case 'batesgaussian':
        case 'bernoulli':
        case 'exponential':
        case 'pareto':
        case 'poisson':
        case 'hypergeometric':
        case 'binomial':
        case 'betaBinomial':
        case 'beta':
        case 'gamma':
        case 'studentsT':
        case 'wignerSemicircle':
        case 'kumaraswamy':
        case 'hermite':
        case 'chiSquared':
        case 'rayleigh':
        case 'logNormal':
        case 'cauchy':
        case 'laplace':
        case 'logistic':
          return this.chancyMinMax(this[input.type](input), input, depth);
      }
      throw new Error(`Invalid input type given to chancy: "${input.type}".`);
    }
    if (typeof input === 'number') {
      return input;
    }
    throw new Error('Invalid input given to chancy');
  }

  private chancyMinMax (result: number, input: ChancyInterface, depth : number = 0) {
    const { min, max } = input;
    if ((depth + 1) >= MAX_RECURSIONS && !this.shouldThrowOnMaxRecursionsReached()) {
      if (typeof min !== 'undefined') {
        result = Math.max(min, result);
      }
      if (typeof max !== 'undefined') {
        result = Math.min(max, result);
      }
      // always returns something in bounds.
      return result;
    }
    if (typeof min !== 'undefined' && result < min) {
      return this.chancy(input, depth + 1);
    }
    if (typeof max !== 'undefined' && result > max) {
      return this.chancy(input, depth + 1);
    }
    return result;
  }

  /**
   * {@inheritDoc RngInterface.chancyMin}
   * @group Result Prediction
   */
  public chancyMin (input: Chancy): number {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.chancyMin(input);
  }

  /**
   * {@inheritDoc RngInterface.chancyMax}
   * @group Result Prediction
   */
  public chancyMax (input: Chancy): number {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.chancyMax(input);
  }

  /**
   * {@inheritDoc RngInterface.chancyMin}
   * @group Result Prediction
   */
  public static chancyMin (input: Chancy): number {
    if (Array.isArray(input)) {
      for (const el of input) {
        if (!isNumeric(el)) {
          throw new Error('Cannot pass non-numbers to chancyMin array input');
        }
      }
      return Math.min(...input);
    }
    if (typeof input === 'string') {
      return this.diceMin(input);
    }
    if (typeof input === 'number') {
      return input;
    }
    if (typeof input === 'object') {
      input.type = input.type ?? 'random';

      if (input.type === 'random' || input.type === 'integer') {
        if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
          input.max = Number.MAX_SAFE_INTEGER;
        }
      }

      switch (input.type) {
        case 'dice':
          return this.diceMin(input.dice);
        case 'normal':
          return input.min ?? Number.NEGATIVE_INFINITY;
        case 'normal_integer':
          return input.min ?? Number.NEGATIVE_INFINITY;
        case 'integer':
          return input.min ?? 0;
        case 'random':
          return input.min ?? 0;
        case 'boxMuller':
          return Number.NEGATIVE_INFINITY;
        case 'gaussian':
          return Number.NEGATIVE_INFINITY;
        case 'irwinHall':
          return 0;
        case 'bates':
          return 0;
        case 'batesgaussian':
          return Number.NEGATIVE_INFINITY;
        case 'bernoulli':
          return 0;
        case 'exponential':
          return 0;
        case 'pareto':
          return input.scale ?? 1;
        case 'poisson':
          return 1;
        case 'hypergeometric':
          // eslint-disable-next-line no-case-declarations
          const { N = 50, K = 10, n = 5 } = input;
          return Math.max(0, (n + K - N));
        case 'rademacher':
          return -1;
        case 'binomial':
          return 0;
        case 'betaBinomial':
          return 0;
        case 'beta':
          return Number.EPSILON;
        case 'gamma':
          return Number.EPSILON;
        case 'studentsT':
          return Number.NEGATIVE_INFINITY;
        case 'wignerSemicircle':
          return -1 * (input.R ?? 10);
        case 'kumaraswamy':
          return Number.EPSILON;
        case 'hermite':
          return 0;
        case 'chiSquared':
          return 0;
        case 'rayleigh':
          return 0;
        case 'logNormal':
          return Number.EPSILON;
        case 'cauchy':
          return Number.NEGATIVE_INFINITY;
        case 'laplace':
          return Number.NEGATIVE_INFINITY;
        case 'logistic':
          return Number.NEGATIVE_INFINITY;
      }
      throw new Error(`Invalid input type ${input.type}.`);
    }
    throw new Error('Invalid input supplied to chancyMin');
  }

  /**
   * {@inheritDoc RngInterface.chancyMax}
   * @group Result Prediction
   */
  public static chancyMax (input: Chancy): number {
    if (Array.isArray(input)) {
      for (const el of input) {
        if (!isNumeric(el)) {
          throw new Error('Cannot pass non-numbers to chancyMax array input');
        }
      }
      return Math.max(...input);
    }
    if (typeof input === 'string') {
      return this.diceMax(input);
    }
    if (typeof input === 'number') {
      return input;
    }
    if (typeof input === 'object') {
      input.type = input.type ?? 'random';

      if (input.type === 'random' || input.type === 'integer') {
        if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
          input.max = Number.MAX_SAFE_INTEGER;
        }
      }

      switch (input.type) {
        case 'dice':
          return this.diceMax(input.dice);
        case 'normal':
          return input.max ?? Number.POSITIVE_INFINITY;
        case 'normal_integer':
          return input.max ?? Number.POSITIVE_INFINITY;
        case 'integer':
          return input.max ?? 1;
        case 'random':
          return input.max ?? 1;
        case 'boxMuller':
          return Number.POSITIVE_INFINITY;
        case 'gaussian':
          return Number.POSITIVE_INFINITY;
        case 'irwinHall':
          return (input.n ?? 6);
        case 'bates':
          return 1;
        case 'batesgaussian':
          return Number.POSITIVE_INFINITY;
        case 'bernoulli':
          return 1;
        case 'exponential':
          return Number.POSITIVE_INFINITY;
        case 'pareto':
          return Number.POSITIVE_INFINITY;
        case 'poisson':
          return Number.MAX_SAFE_INTEGER;
        case 'hypergeometric':
          // eslint-disable-next-line no-case-declarations
          const { K = 10, n = 5 } = input;
          return Math.min(n, K);
        case 'rademacher':
          return 1;
        case 'binomial':
          return (input.n ?? 1);
        case 'betaBinomial':
          return (input.n ?? 1);
        case 'beta':
          return 1;
        case 'gamma':
          return Number.POSITIVE_INFINITY;
        case 'studentsT':
          return Number.POSITIVE_INFINITY;
        case 'wignerSemicircle':
          return (input.R ?? 10);
        case 'kumaraswamy':
          return 1;
        case 'hermite':
          return Number.MAX_SAFE_INTEGER;
        case 'chiSquared':
          return Number.POSITIVE_INFINITY;
        case 'rayleigh':
          return Number.POSITIVE_INFINITY;
        case 'logNormal':
          return Number.POSITIVE_INFINITY;
        case 'cauchy':
          return Number.POSITIVE_INFINITY;
        case 'laplace':
          return Number.POSITIVE_INFINITY;
        case 'logistic':
          return Number.POSITIVE_INFINITY;
      }
      throw new Error(`Invalid input type ${input.type}.`);
    }
    throw new Error('Invalid input supplied to chancyMax');
  }

  public choice (data: Array<any>): any {
    return this.weightedChoice(data);
  }

  public weights (data: Array<any>): Map<any, number> {
    const chances: Map<any, number> = new Map();
    data.forEach(function (a) {
      let init = 0;
      if (chances.has(a)) {
        init = (chances.get(a) as number);
      }
      chances.set(a, init + 1);
    });
    return chances;
  }

  public weightedChoice (data: Record<any, number> | Array<any> | Map<any, number>): any {
    let total = 0; let id;

    if (Array.isArray(data)) {
      // Some shortcuts
      if (data.length === 0) {
        return null;
      }
      if (data.length === 1) {
        return data[0];
      }
      const chances = this.weights(data);
      const result = this.weightedChoice(chances);
      chances.clear();
      return result;
    }

    if (data instanceof Map) {
      // Some shortcuts
      if (data.size === 0) {
        return null;
      }
      if (data.size === 1) {
        return data.keys().next().value;
      }
      data.forEach((value, key) => {
        total += value;
      });
    } else {
      // Some shortcuts
      const entries = Object.keys(data);
      if (entries.length === 0) {
        return null;
      }
      if (entries.length === 1) {
        return entries[0];
      }
      for (id in data) {
        if (data[id] < 0) {
          throw new Error('Probability cannot be negative');
        }
        total += data[id];
      }
    }
    const random = this._random() * total;

    let part = 0;
    if (data instanceof Map) {
      for (const [id, value] of data) {
        part += value;
        if (random < part) {
          return id;
        }
      }
    } else {
      for (id in data) {
        part += data[id];
        if (random < part) {
          return id;
        }
      }
    }

    // If by some floating-point annoyance we have
    // random >= total, just return the last id.
    return id;
  }

  public pool<T>(entries?: T[]): Pool<T> {
    return new Pool<T>(entries, this);
  }

  protected static parseDiceArgs (n: string | Partial<DiceInterface> | number | number[] = 1, d: number = 6, plus: number = 0): DiceInterface {
    if (n === null || typeof n === 'undefined' || arguments.length <= 0) {
      throw new Error('Dice expects at least one argument');
    }
    if (typeof n === 'string') {
      return this.parseDiceString(n);
    }
    if (typeof n === 'object') {
      if (Array.isArray(n)) {
        [n, d, plus] = n;
      } else {
        if (
          typeof n.n === 'undefined' &&
          typeof n.d === 'undefined' &&
          typeof n.plus === 'undefined'
        ) {
          throw new Error('Invalid input given to dice related function - dice object must have at least one of n, d or plus properties.');
        }
        ({ n = 1, d = 6, plus = 0 } = n);
      }
    }

    validate({ n }).int(`Expected n to be an integer, got ${n}`);
    validate({ d }).int(`Expected d to be an integer, got ${d}`);

    return { n, d, plus };
  }

  protected parseDiceArgs (n: string | Partial<DiceInterface> | number | number[] = 1, d: number = 6, plus: number = 0): DiceInterface {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.parseDiceArgs(n);
  }

  /**
   * {@inheritDoc RngInterface.parseDiceString}
   * @group Utilities
   */
  public static parseDiceString (string: string): DiceInterface {
    // dice string like 5d10+1
    if (!diceCache[string]) {
      const trimmed = string.replace(/ +/g, '');
      if (/^[+-]*[\d.]+$/.test(trimmed)) {
        return { n: 0, d: 0, plus: parseFloat(trimmed) };
      }
      if (diceRe.test(string)) {
        const result = diceRe.exec(trimmed);
        if (result !== null) {
          diceCache[string] = {
            n: parseInt(result[1]),
            d: parseInt(result[2]),
            plus: parseFloat(result[3]),
          };
          if (Number.isNaN(diceCache[string].n)) {
            diceCache[string].n = 1;
          }
          if (Number.isNaN(diceCache[string].d)) {
            diceCache[string].d = 6;
          }
          if (Number.isNaN(diceCache[string].plus)) {
            diceCache[string].plus = 0;
          }
        }
      }
      if (typeof diceCache[string] === 'undefined') {
        throw new Error(`Could not parse dice string ${string}`);
      }
    }
    return diceCache[string];
  }

  /**
   * {@inheritDoc RngInterface.diceMax}
   * @group Result Prediction
   */
  public diceMax (n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.diceMax(n, d, plus);
  }

  /**
   * {@inheritDoc RngInterface.diceMin}
   * @group Result Prediction
   */
  public diceMin (n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.diceMin(n, d, plus);
  }

  /**
   * {@inheritDoc RngInterface.diceMax}
   * @group Result Prediction
   */
  public static diceMax (n: string | Partial<DiceInterface> | number | number[] = 1, d: number = 6, plus: number = 0): number {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    return (n * d) + plus;
  }

  /**
   * {@inheritDoc RngInterface.diceMin}
   * @group Result Prediction
   */
  public static diceMin (n: string | Partial<DiceInterface> | number | number[] = 1, d: number = 6, plus: number = 0): number {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    return n + plus;
  }

  public diceExpanded (n: string | Partial<DiceInterface> | number | number[] = 1, d: number = 6, plus: number = 0): { dice: number[], plus: number, total: number } {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    if (typeof n === 'number') {
      let nval = n;
      const dval = Math.max(d, 0);
      if (d === 1) {
        return { dice: Array(n).fill(d), plus, total: (n * d + plus) };
      }
      if (n === 0 || d === 0) {
        return { dice: [], plus, total: plus };
      }
      const multiplier = nval < 0 ? -1 : 1;
      nval *= multiplier;
      const results: { dice: number[], plus: number, total: number } = { dice: [], plus, total: plus };
      while (nval > 0) {
        results.dice.push(multiplier * this.randInt(1, dval));
        nval--;
      }
      results.total = sum(results.dice) + plus;
      return results;
    }
    throw new Error('Invalid arguments given to dice');
  }

  public dice (n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number {
    return this.diceExpanded(n, d, plus).total;
  }

  /**
   * {@inheritDoc RngInterface.parseDiceString}
   * @group Utilities
   */
  public parseDiceString (string: string): DiceInterface {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.parseDiceString(string);
  }

  public clamp (number: number, lower?: number, upper?: number): number {
    if (typeof upper !== 'undefined') {
      number = number <= upper ? number : upper;
    }
    if (typeof lower !== 'undefined') {
      number = number >= lower ? number : lower;
    }
    return number;
  }

  public bin (val: number, bins: number, min: number, max: number): number {
    validate({ val }).gt(min).lt(max);
    const spread = max - min;
    return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
  }
}

/**
 * @category Main Class
 */
class Rng extends RngAbstract implements RngInterface, RngDistributionsInterface {
  #mask: number;
  #seed: number = 0;
  #randFunc?: Randfunc | null;
  #m_z: number = 0;
  constructor (seed?: Seed) {
    super(seed);
    this.#mask = 0xffffffff;
    this.#m_z = 987654321;
  }

  /**
   * {@inheritDoc RngInterface.predictable}
   * @group Seeding
   */
  public static predictable<Rng>(this: new (seed: Seed) => Rng, seed: Seed): Rng {
    return new this(seed ?? PREDICTABLE_SEED);
  }

  public serialize (): any {
    return {
      mask: this.getMask(),
      seed: this.getSeed(),
      m_z: this.getMz(),
    };
  }

  public sameAs (other: any): boolean {
    if (other instanceof Rng) {
      return this.getRandomSource() === other.getRandomSource() &&
        this.getSeed() === other.getSeed() &&
        this.getMask() === other.getMask() &&
        this.getMz() === other.getMz();
    }
    return false;
  }

  /** @hidden */
  public getMask (): number {
    return this.#mask;
  }

  /** @hidden */
  public getMz (): number {
    return this.#m_z;
  }

  /** @hidden */
  public setMask (mask: number): void {
    this.#mask = mask;
  }

  /** @hidden */
  public setMz (mz: number): void {
    this.#m_z = mz;
  }

  /**
   * {@inheritDoc RngConstructor.unserialize}
   * @group Serialization
   */
  public static unserialize (serialized: SerializedRng): Rng {
    const rng = new this();
    rng.setSeed(serialized.seed);
    rng.setMask(serialized.mask);
    rng.setMz(serialized.m_z);
    return rng;
  }

  public seed (i?: Seed): this {
    super.seed(i);
    this.#m_z = 987654321;
    return this;
  }

  protected _next (): number {
    this.#m_z = (36969 * (this.#m_z & 65535) + (this.#m_z >> 16)) & this.#mask;
    this.setSeed((18000 * (this.getSeed() & 65535) + (this.getSeed() >> 16)) & this.#mask);
    let result = ((this.#m_z << 16) + this.getSeed()) & this.#mask;
    result /= 4294967296;
    return result + 0.5;
  }
}

export default Rng;
