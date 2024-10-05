const MAX_RECURSIONS = 100;
const THROW_ON_MAX_RECURSIONS_REACHED = true;

export interface RandomInterface {
  random() : number;
}

export interface DiceInterface {
  n: number;
  d: number;
  plus: number;
}

/**
 * @interface
 * @prop mean   Used for "normal" type chancy results to determine the mean
 * @prop stddev Used for "normal" type chancy results to determine the stddev
 * @prop min    The minimum possible result
 * @prop max    The maximum possible result
 * @prop type   The type of result, can be "normal", "normal_int", "integer" or "random"
 * @prop power  The power factor to pass to the random function - basically skews results one way or the other
 * @prop skew   Skew to use when using a "normal" or "normal_int" distribution
 */
export interface ChancyInterface {
  mean?: number;
  stddev?: number;
  min?: number;
  max?: number;
  type?: string;
  skew?: number;
}

export type Chancy = ChancyInterface | string | number;

export type Seed = string | number;

export type MathFunc = 'floor' | 'ceil' | 'round';

export interface RngInterface {
  predictable(seed?: Seed) : RngInterface;
  hashStr(str : string) : string | number;
  convertStringToNumber(str : string) : number;
  getSeed() : number;
  sameAs(other: RngInterface) : boolean;
  seed(seed : Seed) : this;
  percentage() : number;
  random(from? : number, to? : number, skew? : number) : number;
  chance(n : number, chanceIn? : number) : boolean;
  chanceTo(from : number, to : number) : boolean;
  randInt(from? : number, to? : number, skew? : number) : number;
  uniqid(prefix?: string, random?: boolean) : string;
  uniqstr(len?: number) : string;
  randBetween(from : number, to : number, skew : number) : number;
  normal(args?: NormalArgs) : number;
  chancyInt(input : Chancy, fn ?: MathFunc) : number;
  chancy(input : Chancy) : number;
  choice(data : Array<any>) : any;
  weightedChoice(data : Record<any, number> | Array<any> | Map<any, number>) : any;
  dice(n : string | DiceInterface | number, d? : number, plus? : number) : number;
  parseDiceString(string : string) : DiceInterface;
  clamp(number : number, lower : number, upper : number) : number;
  bin(val : number, bins : number, min : number, max : number) : number;
  serialize() : any;
}

export interface RngConstructor {
  new (seed?:Seed): RngInterface;
  unserialize(rng: any): RngInterface;
  chancyMin(input : Chancy) : number;
  chancyMax(input : Chancy) : number;
  parseDiceString(string : string) : DiceInterface;
  diceMin(n : string | DiceInterface | number, d? : number, plus? : number) : number;
  diceMax(n : string | DiceInterface | number, d? : number, plus? : number) : number;
}

const diceRe : RegExp = /^ *([0-9]+) *[dD] *([0-9]+) *([+-]? *[0-9]*) *$/;
const diceReNoInit : RegExp = /^ *[dD] *([0-9]+) *([+-]? *[0-9]*) *$/;
const strToNumberCache : Record<string, number> = {};
const diceCache : Record<string, DiceInterface> = {};

export interface SerializedRng {
  mask: number,
  seed: number,
  m_z: number,
}

export type NormalArgs = {
  mean?: number,
  stddev?: number,
  max?: number,
  min?: number,
  skew?: number,
  skewtype?: string,
};

export abstract class RngAbstract implements RngInterface {
  #seed: number = 0;
  constructor (seed? : Seed) {
    this.setSeed(seed);
  }

  public getSeed () : number {
    return this.#seed;
  }

  public sameAs (other : RngAbstract) : boolean {
    return this.#seed === other.#seed;
  }

  protected setSeed (seed? : Seed) : this {
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

  public serialize () : any {
    return {
      seed: this.#seed,
    };
  }

  public static unserialize (serialized : SerializedRng) : RngInterface {
    const { constructor } = Object.getPrototypeOf(this);
    const rng = new constructor(serialized.seed);
    rng.setSeed(serialized.seed);
    return rng;
  }

  public predictable (seed? : Seed) : RngInterface {
    const { constructor } = Object.getPrototypeOf(this);
    const newSelf : RngInterface = new constructor(seed);
    return newSelf;
  }

  public static predictable<T extends RngAbstract>(this: new (seed: Seed) => T, seed: Seed): T {
    return new this(seed);
  }

  public hashStr (str : string) : number {
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

  public convertStringToNumber (str : string) : number {
    if (strToNumberCache[str]) {
      return strToNumberCache[str];
    }
    const num = this.hashStr(str);
    strToNumberCache[str] = num;
    return num;
  }

  protected _random (): number {
    return Math.random();
  }

  public percentage () : number {
    return this.randBetween(0, 100);
  }

  public random (from : number = 0, to : number = 1, skew : number = 0) : number {
    return this.randBetween(from, to, skew);
  }

  public chance (n : number, chanceIn : number = 1) : boolean {
    const chance = n / chanceIn;
    return this._random() <= chance;
  }

  // 500 to 1 chance, for example
  public chanceTo (from : number, to : number) : boolean {
    return this._random() <= (from / (from + to));
  }

  public randInt (from = 0, to = 1, skew = 0) : number {
    [from, to] = [Math.min(from, to), Math.max(from, to)];
    let rand = this._random();
    if (skew < 0) {
      rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
    } else {
      rand = Math.pow(rand, Math.pow(2, -skew));
    }
    return Math.floor(rand * ((to + 1) - from)) + from;
  }

  // Not deterministic
  public uniqid (prefix : string = '', random : boolean = false) : string {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`;
  }

  // Deterministic
  public uniqstr (len: number = 6) : string {
    const str : string[] = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const alen = 61;
    for (let i = 0; i < len; i++) {
      str.push(alphabet[this.randInt(0, alen)]);
    }
    return str.join('');
  }

  public randBetween (from : number = 0, to : number = 1, skew : number = 0): number {
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
    if (number > max) throw new Error(`Number ${number} is greater than max of ${max}`);
    if (number < min) throw new Error(`Number ${number} is less than min of ${min}`);
    // First we scale the number in the range [0-1)
    number = (number - min) / (max - min);
    return this.scaleNorm(number, from, to);
  }

  public scaleNorm (number: number, from: number, to: number): number {
    if (number > 1 || number < 0) throw new Error(`Number must be < 1 and > 0, got ${number}`);
    return (number * (to - from)) + from;
  }

  public shouldThrowOnMaxRecursionsReached (): boolean {
    return THROW_ON_MAX_RECURSIONS_REACHED;
  }

  // Gaussian number between 0 and 1
  public normal ({ mean, stddev = 1, max, min, skew = 0 } : NormalArgs = {}, depth = 0): number {
    if (depth > MAX_RECURSIONS && this.shouldThrowOnMaxRecursionsReached()) {
      throw new Error('Max recursive calls to rng normal function. This might be as a result of using predictable random numbers?');
    }
    let num = this.boxMuller();
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (depth > MAX_RECURSIONS) {
      num = Math.min(Math.max(num, 0), 1);
    } else {
      if (num > 1 || num < 0) {
        return this.normal({ mean, stddev, max, min, skew }, depth + 1); // resample between 0 and 1
      }
    }

    if (skew < 0) {
      num = 1 - (Math.pow(num, Math.pow(2, skew)));
    } else {
      num = Math.pow(num, Math.pow(2, -skew));
    }

    if (typeof mean === 'undefined') {
      mean = 0;
      if (typeof max !== 'undefined' && typeof min !== 'undefined') {
        num *= max - min;
        num += min;
      } else {
        num = num * 10;
        num = num - 5;
      }
    } else {
      num = num * 10;
      num = num - 5;
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

  // Standard Normal variate using Box-Muller transform.
  public boxMuller (mean : number = 0, stddev : number = 1) : number {
    const u = 1 - this._random(); // Converting [0,1) to (0,1]
    const v = this._random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    return z * stddev + mean;
  }

  public chancyInt (input : Chancy) : number {
    if (typeof input === 'number') {
      return Math.round(input);
    }
    if (typeof input === 'object') {
      input.type = 'integer';
    }
    return this.chancy(input);
  }

  public chancy (input : Chancy) : number {
    if (typeof input === 'string') {
      return this.dice(input);
    }
    if (typeof input === 'object') {
      switch (input.type) {
        case 'normal':
          return this.normal(input);
          break;
        case 'normal_integer':
          return Math.floor(this.normal(input));
          break;
        case 'integer':
          return this.randInt(
            input.min ?? 0,
            input.max ?? 1,
            input.skew ?? 0
          );
          break;
        default:
          return this.random(
            input.min ?? 0,
            input.max ?? 1,
            input.skew ?? 0
          );
      }
    }
    if (typeof input === 'number') {
      return input;
    }
    throw new Error('Invalid input given to chancy');
  }

  public static chancyMin (input : Chancy) : number {
    if (typeof input === 'string') {
      return this.diceMin(input);
    }
    if (typeof input === 'number') {
      return input;
    }
    if (typeof input === 'object') {
      if (typeof input.type === 'undefined') {
        if (typeof input.skew !== 'undefined') {
          // Regular random numbers are evenly distributed, so skew
          // only makes sense on normal numbers
          input.type = 'normal';
        }
      }
      switch (input.type) {
        case 'normal':
          return input.min ?? Number.NEGATIVE_INFINITY;
          break;
        case 'normal_integer':
          return input.min ?? Number.NEGATIVE_INFINITY;
          break;
        case 'integer':
          return input.min ?? 0;
          break;
        default:
          return input.min ?? 0;
      }
    }
  }

  public static chancyMax (input : Chancy) : number {
    if (typeof input === 'string') {
      return this.diceMax(input);
    }
    if (typeof input === 'number') {
      return input;
    }
    if (typeof input === 'object') {
      if (typeof input.type === 'undefined') {
        if (typeof input.skew !== 'undefined') {
          // Regular random numbers are evenly distributed, so skew
          // only makes sense on normal numbers
          input.type = 'normal';
        }
      }
      switch (input.type) {
        case 'normal':
          return input.max ?? Number.POSITIVE_INFINITY;
          break;
        case 'normal_integer':
          return input.max ?? Number.POSITIVE_INFINITY;
          break;
        case 'integer':
          return input.max ?? 1;
          break;
        default:
          return input.max ?? 1;
      }
    }
  }

  public choice (data : Array<any>) : any {
    return this.weightedChoice(data);
  }

  /**
   * data format:
   * {
   *   choice1: 1,
   *   choice2: 2,
   *   choice3: 3,
   * }
   */
  public weightedChoice (data : Record<any, number> | Array<any> | Map<any, number>) : any {
    let total = 0; let id;

    if (Array.isArray(data)) {
      const chances : Map<any, number> = new Map();
      data.forEach(function (a) {
        chances.set(a, 1);
      });
      return this.weightedChoice(chances);
    }

    if (data instanceof Map) {
      data.forEach((value, key) => {
        total += value;
      });
    } else {
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

  protected static parseDiceArgs (n : string | DiceInterface | number | number[] = 1, d: number = 6, plus: number = 0) : DiceInterface {
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
        d = n.d;
        plus = n.plus;
        n = n.n;
      }
    }
    return { n, d, plus };
  }

  public parseDiceArgs (n : string | DiceInterface | number | number[] = 1, d: number = 6, plus: number = 0) : DiceInterface {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.parseDiceArgs(n)
  }

  public static parseDiceString (string : string) : DiceInterface {
    // dice string like 5d10+1
    if (!diceCache[string]) {
      if (diceRe.test(string)) {
        const result = diceRe.exec(string.replace(/ +/g, ''));
        if (result !== null) {
          diceCache[string] = {
            n: (parseInt(result[1]) / 1 || 1),
            d: (parseInt(result[2]) / 1 || 1),
            plus: (parseFloat(result[3]) / 1 || 0),
          };
        }
      } else if (diceReNoInit.test(string)) {
        const result = diceReNoInit.exec(string.replace(/ +/g, ''));
        if (result !== null) {
          diceCache[string] = {
            n: 1,
            d: (parseInt(result[1]) / 1 || 1),
            plus: (parseFloat(result[2]) / 1 || 0),
          };
        }
      }
    }
    return diceCache[string];
  }

  public static diceMax (n : string | DiceInterface | number | number[] = 1, d: number = 6, plus: number = 0) : number {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    return (n * d) + plus;
  }

  public static diceMin (n : string | DiceInterface | number | number[] = 1, d: number = 6, plus: number = 0) : number {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    return n + plus;
  }

  public dice (n : string | DiceInterface | number | number[] = 1, d: number = 6, plus: number = 0) : number {
    ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
    if (typeof n === 'number') {
      let nval = Math.max(n, 1);
      const dval = Math.max(d, 1);
      if (d === 1) {
        return plus + 1;
      }
      let sum = plus || 0;
      while (nval > 0) {
        sum += this.randInt(1, dval);
        nval--;
      }
      return sum;
    }
    throw new Error('Invalid arguments given to dice');
  }

  public parseDiceString (string : string) : DiceInterface {
    const { constructor } = Object.getPrototypeOf(this);
    return constructor.parseDiceString(string);
  }

  public clamp (number : number, lower : number, upper : number) : number {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
    return number;
  }

  public bin (val : number, bins : number, min : number, max : number) : number {
    const spread = max - min;
    return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
  }
}

export default class Rng extends RngAbstract implements RngInterface {
  #mask: number;
  #seed: number;
  #m_z: number = 0;
  constructor (seed? : Seed) {
    super(seed);
    this.#mask = 0xffffffff;
    this.#m_z = 987654321;
  }

  public serialize (): any {
    return {
      mask: this.#mask,
      seed: this.getSeed(),
      m_z: this.#m_z,
    };
  }

  public sameAs (other: Rng): boolean {
    const s = other.serialize();
    return this.#seed === s.seed &&
      this.#mask === s.mask &&
      this.#m_z === s.m_z;
  }

  public static unserialize (serialized : SerializedRng): Rng {
    const rng = new this();
    rng.setSeed(serialized.seed);
    rng.#mask = serialized.mask;
    rng.#seed = serialized.seed;
    rng.#m_z = serialized.m_z;
    return rng;
  }

  public seed (i? : Seed): this {
    super.seed(i);
    this.#m_z = 987654321;
    return this;
  }

  protected _random (): number {
    this.#m_z = (36969 * (this.#m_z & 65535) + (this.#m_z >> 16)) & this.#mask;
    this.setSeed((18000 * (this.getSeed() & 65535) + (this.getSeed() >> 16)) & this.#mask);
    let result = ((this.#m_z << 16) + this.getSeed()) & this.#mask;
    result /= 4294967296;
    return result + 0.5;
  }
}
