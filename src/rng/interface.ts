import Pool from './pool';

export interface DiceInterface {
  n: number;
  d: number;
  plus: number;
}

export interface DiceReturnInterface {
  dice: number[];
  plus: number;
  total: number;
}

/**
 * Distributions allowed for use in chancy
 * @type {String}
 */
export type Distribution = 'normal' | 'boxMuller' | 'gaussian' | keyof RngDistributionsInterface;

/**
 * Most of the properties here are used to pass on to the resepective distribution functions.
 *
 * This basically takes the form:
 *
 * ```ts
 * type ChancyInterface = {
 *   type?: string, // name of a distribution - must be valid
 *   min?: number,  // always available
 *   max?: number,  // always available
 *   ...otherArgs,  // The relevant args for the distribution named above, all optional
 * }
 * ```
 *
 * Specifying it this way allows TypeScript to perform a sort of validation for objects and
 * parameters passed to the chancy function, but will require a bit of maintenance on the user
 * end.
 *
 * @privateRemarks
 *
 * Unfortunately, this **does** mean we have to maintain call signatures in two places - both
 * in the distribution functions, and here, because it's tightly coupled to the way Chancy can
 * be called - but this added complexity in development allows for flexibility for the end user.
 *
 * @see {@link RngInterface.chancy}
 */
export type ChancyInterface = ((
  ({ type?: 'random', skew?: number }) |
  ({ type: 'integer' | 'int', skew?: number }) |
  ({ type: 'dice', dice?: string, n?: number, d?: number, plus?: number }) |
  ({ type: 'normal' | 'normal_int' | 'normal_integer', mean?: number, stddev?: number, skew?: number }) |
  ({ type: 'bates', n?: number }) |
  ({ type: 'batesgaussian', n?: number }) |
  ({ type: 'bernoulli', p?: number }) |
  ({ type: 'beta', alpha?: number, beta?: number }) |
  ({ type: 'betaBinomial', alpha?: number, beta?: number, n?: number }) |
  ({ type: 'binomial', n?: number, p?: number }) |
  ({ type: 'boxMuller', mean?: number, stddev?: number }) |
  ({ type: 'cauchy', median?: number, scale?: number }) |
  ({ type: 'chiSquared', k?: number }) |
  ({ type: 'exponential', rate?: number }) |
  ({ type: 'gamma', shape?: number, rate?: number, scale?: number }) |
  ({ type: 'gaussian', mean?: number, stddev?: number, skew?: number }) |
  ({ type: 'hermite', lambda1?: number, lambda2?: number }) |
  ({ type: 'hypergeometric', N?: number, K?: number, n?: number, k?: number }) |
  ({ type: 'irwinHall', n?: number }) |
  ({ type: 'kumaraswamy', alpha?: number, beta?: number }) |
  ({ type: 'laplace', mean?: number, scale?: number }) |
  ({ type: 'logistic', mean?: number, scale?: number }) |
  ({ type: 'logNormal', mean?: number, stddev?: number }) |
  ({ type: 'pareto', shape?: number, scale?: number, location?: number }) |
  ({ type: 'poisson', lambda?: number }) |
  ({ type: 'rademacher' }) |
  ({ type: 'rayleigh', scale?: number }) |
  ({ type: 'studentsT', nu?: number }) |
  ({ type: 'wignerSemicircle', R?: number })
) & { min?: number, max?: number });


/**
 * Chancy inputs that lead to strictly numeric results.
 * @see {@link RngInterface.chancy}
 */
export type ChancyNumeric = ChancyInterface | string | number | number[];

/**
 * Special Chancy type - for feeding to the 'chancy' function
 * @see {@link RngInterface.chancy}
 */
export type Chancy = ChancyNumeric | any[];

/**
 * Valid seeds for feeding to the RNG
 */
export type Seed = string | number;

/**
 * Interface for a random function that returns a number, given no arguments
 * that is uniformly distributed.
 */
export interface Randfunc {
  (): number
}

/**
 * Basic interface required for Rng implementations.
 *
 * Use this as an interface if you don't need all the advanced distributions
 */
export interface RngInterface {

  /**
   * Whether this is the same as another object interfacting RngInterface, i.e.
   * they will generate the same next number.
   * @param other The thing to compare
   */
  sameAs (other: RngInterface): boolean;

  /**
   * Seed the random number generator with the given seed.
   *
   * @group Seeding
   * @param  {Seed} seed Can be a string or a number
   */
  seed (seed: Seed): this;

  /**
   * Get the current seed.
   *
   * Note this may not be the same as the set seed if numbers have been generated
   * since its inception. Also, strings are usually transformed to numbers.
   *
   * @group Seeding
   * @return The current seed
   */
  getSeed (): number;

  /**
   * Whether we are going to throw if max recursions is reached
   */
  shouldThrowOnMaxRecursionsReached () : boolean;

  /**
   * Sets whether we should throw if max recursions is reached.
   */
  shouldThrowOnMaxRecursionsReached (val: boolean) : this;

  /**
   * Create a new instance. Will use a globally set seed, so every instance
   * returnd by this should generate the same numbers.
   *
   * @group Seeding
   * @return An Rng instance, set to the given seed
   */
  predictable (): RngInterface;

  /**
   * Create a new instance with the given seed
   *
   * @group Seeding
   * @param seed
   * @return An Rng instance, set to the given seed
   */
  predictable (seed: Seed): RngInterface;

  /**
   * Pass a function that will return uniform random numbers as the source
   * of this rng's randomness.
   *
   * Supersedes and seed setting.
   *
   * @example
   *
   * const rng = new Rng();
   * rng.randomSource(() => 1);
   *
   * assert(rng.random() === 1); // true
   *
   * @group Seeding
   * @param func The random function
   */
  randomSource (func?: Randfunc): this;

  /**
   * Returns a unique 14 character string.
   *
   * Highly collision resistant, and strictly incrementing
   *
   * Useful for using as object IDs or HTML ids (with prefix).
   *
   * @group Utilities
   * @param prefix A prefix to include on the output
   * @return a 14 character string
   */
  uniqid (prefix?: string): string;

  /**
   * Returns a unique string of length len
   *
   * @group Utilities
   * @param len Length of the string to generate
   * @return A string of length "len"
   */
  randomString (len?: number): string;

  /**
   * Scales a number from [min, max] to [from, to].
   *
   * Some might call this linear interpolation.
   *
   * Min and max default to 0 and 1 respectively
   *
   * @example
   * rng.scale(0.5, 100, 200); // 150
   * rng.scale(0, 100, 200); // 100
   * rng.scale(1, 100, 200); // 200
   * rng.scale(5, 100, 200, 0, 10); // 150
   *
   * @group Utilities
   * @param  number The number - must be 0 <= number <= 1
   * @param  from The min number to scale to. When number === min, will return from
   * @param  to The max number to scale to. When number === max, will return to
   * @param  min The minimum number can take, default 0
   * @param  max The maximum number can take, default 1
   * @return A number scaled to the interval [from, to]
   */
  scale (number: number, from: number, to: number, min?: number, max?: number): number;

  /**
   * Scales a number from [0, 1] to [from, to].
   *
   * Some might call this linear interpolation
   *
   * @example
   * rng.scaleNorm(0.5, 100, 200); // 150
   * rng.scaleNorm(0, 100, 200); // 100
   * rng.scaleNorm(1, 100, 200); // 200
   *
   * @group Utilities
   * @param  number The number - must be 0 <= number <= 1
   * @param  from The min number to scale to. When number === 0, will return from
   * @param  to The max number to scale to. When number === 1, will return to
   * @return A normal number scaled to the interval [from, to]
   */
  scaleNorm (number: number, from: number, to: number): number;

  /**
   * Alias of randBetween
   *
   * @group Random Number Generation
   * @see {@link randBetween}
   */
  random (from?: number, to?: number, skew?: number): number;

  /**
   * @group Random Number Generation
   * @return A random number from [0, 1)
   */
  randBetween (): number;

  /**
   * @group Random Number Generation
   * @param from Lower bound, inclusive
   * @return A random number from [from, from+1)
   */
  randBetween (from?: number): number;

  /**
   * Note that from and to should be interchangeable.
   *
   * @example
   *
   * rng.randBetween(0, 10);
   * // is the same as
   * rng.randBetween(10, 0);
   *
   * @group Random Number Generation
   * @param from Lower bound, inclusive
   * @param to Upper bound, exclusive
   * @return A random number from [from, to)
   */
  randBetween (from?: number, to?: number): number;

  /**
   * Note that from and to should be interchangeable.
   *
   * @example
   *
   * rng.randBetween(0, 10, 0);
   * // is the same as
   * rng.randBetween(10, 0, 0);
   *
   * @group Random Number Generation
   * @param from Lower bound, inclusive
   * @param to Upper bound, exclusive
   * @param skew A number by which the numbers should skew. Negative skews towards from, and positive towards to.
   * @return A random number from [from, to) skewed a bit skew direction
   */
  randBetween (from: number, to: number, skew: number): number;

  /**
   * @group Random Number Generation
   * @return A random integer from [0, 1]
   */
  randInt (): number;

  /**
   * Note that from and to should be interchangeable.
   *
   * @example
   *
   * rng.randInt(0, 10);
   * // is the same as
   * rng.randInt(10, 0);
   *
   * @group Random Number Generation
   * @param from Lower bound, inclusive
   * @param to Upper bound, inclusive
   * @return A random integer from [from, to]
   */
  randInt (from?: number, to?: number): number;

  /**
   * Note that from and to should be interchangeable.
   *
   * @example
   *
   * rng.randInt(0, 10, 1);
   * // is the same as
   * rng.randInt(10, 0, 1);
   *
   * @group Random Number Generation
   * @param from Lower bound, inclusive
   * @param to Upper bound, inclusive
   * @param skew A number by which the numbers should skew. Negative skews towards from, and positive towards to.
   * @return A random integer from [from, to] skewed a bit in skew direction
   */
  randInt (from?: number, to?: number, skew?: number): number;

  /**
   * @group Random Number Generation
   * @return A percentage [0, 100]
   */
  percentage (): number;

  /**
   * @group Random Number Generation
   * @return A probability [0, 1]
   */
  probability (): number;

  /**
   * Results of an "n" in "chanceIn" chance of something happening.
   *
   * @example
   * A "1 in 10" chance would be:
   *
   * ```ts
   * rng.chance(1, 10);
   * ```
   *
   * @group Boolean Results
   * @param n Numerator
   * @param chanceIn Denominator
   * @return Success or not
   */
  chance (n: number, chanceIn?: number): boolean;

  /**
   * Results of an "from" to "to" chance of something happening.
   *
   * @example
   * A "500 to 1" chance would be:
   *
   * ```ts
   * rng.chanceTo(500, 1);
   * ```
   *
   * @group Boolean Results
   * @param from Left hand side
   * @param to Right hand side
   * @return Success or not
   */
  chanceTo (from: number, to: number): boolean;

  /**
   * The chancy function has a very flexible calling pattern.
   *
   * You can pass it a dice string, an object or a number.
   *
   *  * If passed a dice string, it will do a roll of that dice.
   *  * If passed a number, it will return that number
   *  * If passed a config object, it will return a randomly generated number based on that object
   *
   * The purpose of this is to have easily serialised random signatures that you can pass to a single
   * function easily.
   *
   * All chancy distribution functions (that is, when called with ChancyInterface) can be called with min and
   * max parameters, however, it's highly advised to tune your parameters someway else.
   *
   * Basically, the function will just keep resampling until a figure inside the range is generated. This can
   * quickly lead to large recursion depths for out of bounds inputs, at which point an error is thrown.
   *
   * @example
   *
   * rng.chancy(1); // returns 1
   * rng.chancy('1d6'); // returns an int between 1 and 6 [1, 6]
   *
   * @example
   *
   * rng.chancy({ min: 10 }); // Equivalent to calling rng.random(10, Number.MAX_SAFE_INTEGER)
   * rng.chancy({ max: 10 }); // Equivalent to calling rng.random(0, 10)
   * rng.chancy({ min: 0, max: 1 }); // Equivalent to calling rng.random(0, 1)
   *
   * @example
   *
   * rng.chancy({ type: 'integer', min: 10 }); // Equivalent to calling rng.randInt(10, Number.MAX_SAFE_INTEGER)
   * rng.chancy({ type: 'integer', max: 10 }); // Equivalent to calling rng.randInt(0, 10)
   * rng.chancy({ type: 'integer', min: 10, max: 20 }); // Equivalent to calling rng.randInt(10, 20)
   *
   * @example
   *
   * rng.chancy({ type: 'normal', ...args }); // Equivalent to calling rng.normal(args)
   * rng.chancy({ type: 'normal_integer', ...args }); // Equivalent to calling Math.floor(rng.normal(args))
   *
   * @example
   *
   * // You can call any of the 'distribution' type functions with chancy as well.
   * rng.chancy({ type: 'boxMuller', ...args }); // Equivalent to calling rng.boxMuller(args)
   * rng.chancy({ type: 'bates', ...args }); // Equivalent to calling rng.bates(args)
   * rng.chancy({ type: 'exponential', ...args }); // Equivalent to calling rng.exponential(args)
   *
   * @example
   *
   * This is your monster file ```monster.json```:
   *
   * ```json
   * {
   *   "id": "monster",
   *   "hp": {"min": 1, "max": 6, "type": "integer"},
   *   "attack": "1d4"
   * }
   * ```
   *
   * How about a stronger monster, with normally distributed health ```strong_monster.json```:
   *
   * ```json
   * {
   *   "id": "strong_monster",
   *   "hp": {"min": 10, "max": 20, "type": "normal_integer"},
   *   "attack": "1d6+1"
   * }
   * ```
   *
   * Or something like this for ```boss_monster.json``` which has a fixed HP:
   *
   * ```json
   * {
   *   "id": "boss_monster",
   *   "hp": 140,
   *   "attack": "2d10+4"
   * }
   * ```
   *
   * Then in your code:
   *
   * ```ts
   * import {Rng, Chancy} from GameRng;
   *
   * const rng = new Rng();
   *
   * class Monster {
   *  hp = 10;
   *  id;
   *  attack = '1d4';
   *  constructor ({id, hp = 10, attack} : {id: string, hp: Chancy, attack: Chancy} = {}) {
   *    this.id = options.id;
   *    this.hp = rng.chancy(hp);
   *    if (attack) this.attack = attack;
   *  }
   *  attack () {
   *    return rng.chancy(this.attack);
   *  }
   * }
   *
   * const spec = await fetch('strong_monster.json').then(a => a.json());
   * const monster = new Monster(spec);
   * ```
   *
   * @see {@link Chancy} for details on input types
   * @see {@link RngDistributionsInterface} for details on the different distributions that can be passed to the "type" param
   * @group Random Number Generation
   * @param input Chancy type input
   * @return A randomly generated number or an element from a passed array
   */
  chancy (input: ChancyNumeric): number;
  chancy<T>(input: T[]): T;

  /**
   * Rounds the results of a chancy call so that it's always an integer.
   *
   * Not _quite_ equivalent to Math.round(rng.chancy(input)) because it will also
   * transform {type: 'random'} to {type: 'integer'} which aren't quite the same.
   *
   * 'random' has a range of [min, max) whereas interger is [min, max] (inclusive of max).
   *
   * @group Random Number Generation
   * @see {@link chancy}
   */
  chancyInt (input: Chancy): number;

  /**
   * Determines the minimum value a Chancy input can take.
   *
   * @group Result Prediction
   * @param input Chancy input
   * @return Minimum value a call to chancy with these args can take
   */
  chancyMin (input: Chancy): number;

  /**
   * Determines the maximum value a Chancy input can take.
   *
   * @group Result Prediction
   * @param input Chancy input
   * @return Maximum value a call to chancy with these args can take
   */
  chancyMax (input: Chancy): number;

  /**
   * Outputs what the distribution supports in terms of output
   */
  support (input: Distribution) : string | undefined;

  /**
   * Takes a random choice from an array of values, with equal weight.
   *
   * @group Choices
   * @param data The values to choose from
   * @return The random choice from the array
   */
  choice (data: Array<any>): any;

  /**
   * Given an array, gives a key:weight Map of entries in the array based
   * on how many times they appear in the array.
   *
   * @example
   *
   * const weights = rng.weights(['a', 'b', 'c', 'a']);
   * assert(weights['a'] === 2);
   * assert(weights['b'] === 1);
   * assert(weights['c'] === 1);
   *
   * @group Utilities
   * @param data The values to choose from
   * @return The weights of the array
   */
  weights (data: Array<any>): Map<any, number>;

  /**
   * Takes a random key from an object with a key:number pattern
   *
   * Using a Map allows objects to be specified as keys, can be useful for
   * choosing between concrete objects.
   *
   * @example
   *
   * Will return:
   *
   *  * 'a' 1/10 of the time
   *  * 'b' 2/10 of the time
   *  * 'c' 3/10 of the time
   *  * 'd' 3/10 of the time
   *
   * ```ts
   * rng.weightedChoice({
   *   a: 1,
   *   b: 2,
   *   c: 3,
   *   d: 4
   * });
   * ```
   *
   * @example
   *
   * Will return:
   *
   *  * diamond  1/111 of the time
   *  * ruby    10/111 of the time
   *  * pebble 100/111 of the time
   *
   * ```ts
   * const diamond = new Item('diamond');
   * const ruby = new Item('ruby');
   * const pebble = new Item('pebble');
   *
   * const choices = new Map();
   * choices.set(diamond, 1);
   * choices.set(ruby, 10);
   * choices.set(pebble, 100);
   *
   * rng.weightedChoice(choices);
   * ```
   *
   * @group Choices
   * @see [Map Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
   * @see [Map Object - w3schools](https://www.w3schools.com/js/js_maps.asp)
   * @param data The values to choose from
   * @return The random choice from the array
   */
  weightedChoice (data: Record<any, number> | Array<any> | Map<any, number>): any;

  /**
   * Returns a Pool with the given entries based on this RNG.
   *
   * Pools allow you to draw (without replacement) from them.
   *
   * @example
   *
   * const pool = rng.pool(['a', 'b', 'c', 'd']);
   *
   * pool.draw(); // 'b'
   * pool.draw(); // 'c'
   * pool.draw(); // 'a'
   * pool.draw(); // 'd'
   * pool.draw(); // PoolEmptyError('No more elements left to draw from in pool.')
   *
   * @param entries An array of anything
   */
  pool<T>(entries?: T[]): Pool<T>;

  /**
   * Rolls dice and returns the results in an expanded format.
   *
   * @example
   * rng.diceExpanded('2d6+1'); // returns { dice: [3, 5], plus: 1, total: 9 }
   *
   * @group Random Number Generation
   * @throws Error if the given input is invalid.
   */
  diceExpanded (dice: string): DiceReturnInterface;
  diceExpanded (options: Partial<DiceInterface>): DiceReturnInterface;
  diceExpanded (dice: number[]): DiceReturnInterface;
  diceExpanded (n: number, d: number, plus: number): DiceReturnInterface;

  /**
   * Given a string dice representation, roll it
   * @example
   *
   * rng.dice('1d6');
   * rng.dice('3d6+10');
   * rng.dice('1d20-1');
   * rng.dice('d10');
   *
   * @group Random Number Generation
   * @param dice e.g. 1d6+5
   * @return A random roll on the dice
   * @throws Error if the given input is invalid.
   */
  dice (dice: string): number;

  /**
   * Given an object representation of a dice, roll it
   * @example
   *
   * rng.dice({ d: 6 });
   * rng.dice({ n: 3, d: 6, plus: 10 });
   * rng.dice({ n: 1, d: 20, plus: -1 });
   * rng.dice({ n: 1, d: 10 });
   *
   * @group Random Number Generation
   * @param options {n, d, plus} format of dice roll
   * @return A random roll on the dice
   * @throws Error if the given input is invalid.
   */
  dice ({ n, d, plus }: Partial<DiceInterface>): number;

  /**
   * Roll "n" x "d" sided dice and add "plus"
   * @group Random Number Generation
   * @param options [n, d, plus] format of dice roll
   * @return A random roll on the dice
   * @throws Error if the given input is invalid.
   */
  dice ([n, d, plus]: number[]): number;

  /**
   * Roll "n" x "d" sided dice and add "plus"
   * @group Random Number Generation
   * @param  n    The number of dice to roll
   * @param  d    The number of faces on the dice
   * @param  plus The number to add at the end
   * @return A random roll on the dice
   * @throws Error if the given input is invalid.
   */
  dice (n: number, d?: number, plus?: number): number;

  /**
   * Parses a string representation of a dice and gives the
   * object representation {n, d, plus}
   * @group Utilities
   * @param  string String dice representation, e.g. '1d6'
   * @returns The dice representation object
   * @throws Error if the given input is invalid.
   */
  parseDiceString (string: string): DiceInterface;

  /**
   * Gives the minimum result of a call to dice with these arguments
   * @group Result Prediction
   * @see {@link dice}
   */
  diceMin (n: string | DiceInterface | number, d?: number, plus?: number): number;

  /**
   * Gives the maximum result of a call to dice with these arguments
   * @group Result Prediction
   * @see {@link dice}
   */
  diceMax (n: string | DiceInterface | number, d?: number, plus?: number): number;

  /**
   * Clamps a number to lower and upper bounds, inclusive
   *
   * @example
   * rng.clamp(5, 0, 1); // 1
   * rng.clamp(-1, 0, 1); // 0
   * rng.clamp(0.5, 0, 1); // 0.5
   * @group Utilities
   */
  clamp (number: number, lower: number, upper: number): number;

  /**
   * Gets the bin "val" sits in when between "min" and "max" is separated by "bins" number of bins
   *
   * This is right aligning, so .5 rounds up
   *
   * This is useful when wanting only a discrete number values between two endpoints
   *
   * @example
   *
   * rng.bin(1.3, 11, 0, 10); // 1
   * rng.bin(4.9, 11, 0, 10); // 5
   * rng.bin(9.9, 11, 0, 10); // 10
   * rng.bin(0.45, 11, 0, 10); // 0
   * rng.bin(0.50, 11, 0, 10); // 1
   *
   * @group Utilities
   * @param  val  The value to bin
   * @param  bins The number of bins
   * @param  min  Minimum value
   * @param  max  Maximum value
   * @return The corresponding bin (left aligned)
   */
  bin (val: number, bins: number, min: number, max: number): number;

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
   */
  normal (options?: { mean?: number, stddev?: number, max?: number, min?: number, skew?: number }, depth?: number): number;

  /**
   * Generates a gaussian normal number, but with a special skewing procedure
   * that is sometimes useful.
   *
   * @example
   *
   * rng.gaussian({ mean: 0.5, stddev: 0.5, skew: -1 });
   *
   * @see [Normal Distribution - Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.mean]
   * @param [options.stddev] Must be > 0
   * @param [options.skew]
   * @return A normally distributed number
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  gaussian (options?: { mean?: number, stddev?: number, skew?: number }): number;

  /**
   * Generates a Gaussian normal value via Box–Muller transform
   *
   * There are two ways of calling, either with an object with mean and stddev
   * as keys, or just with two params, the mean and stddev
   *
   * Support: [0, 1]
   *
   * @example
   *
   * rng.boxMuller({ mean: 0.5, stddev: 1 });
   * rng.boxMuller(0.5, 1);
   *
   * @group Distributions
   * @see [Box–Muller transform - Wikipedia](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)
   * @param [options]
   * @param [options.mean] - The mean of the underlying normal distribution.
   * @param [options.stddev] - The standard deviation of the underlying normal distribution.
   * @returns A value from the Log-Normal distribution.
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  boxMuller (options?: { mean?: number, stddev?: number }): number;

  /**
   * Generates a Gaussian normal value via Box–Muller transform
   *
   * There are two ways of calling, either with an object with mean and stddev
   * as keys, or just with two params, the mean and stddev
   *
   * Support: [0, 1]
   *
   * @example
   *
   * rng.boxMuller({ mean: 0.5, stddev: 1 });
   * rng.boxMuller(0.5, 1);
   *
   * @group Distributions
   * @see [Box–Muller transform - Wikipedia](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)
   * @param [mean] - The mean of the underlying normal distribution.
   * @param [stddev] - The standard deviation of the underlying normal distribution.
   * @returns A value from the Log-Normal distribution.
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  boxMuller (mean?: number, stddev?: number): number;

  /**
   * A serialized, storable version of this RNG that can be
   * unserialized with unserialize
   *
   * @group Serialization
   */
  serialize (): any;
}

/**
 * A version of RngInterface that includes lots of extra distributions.
 *
 * Depending on your integration, you may not need this.
 *
 */
export interface RngDistributionsInterface {
  /**
   * Sum of n uniformly distributed values
   *
   * Support: [0, n]
   *
   * @example
   *
   * rng.irwinHall({ n: 6 });
   * rng.irwinHall(6);
   *
   * @see [Irwin-Hall Distribution - Wikipedia](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.n]- Number of values to sum
   * @returns The sum
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  irwinHall (options?: { n?: number }): number;

  /**
   * Sum of n uniformly distributed values
   *
   * Support: [0, n]
   *
   * @example
   *
   * rng.irwinHall({ n: 6 });
   * rng.irwinHall(6);
   *
   * @see [Irwin-Hall Distribution - Wikipedia](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution)
   * @group Distributions
   * @param n - Number of values to sum
   * @returns The sum
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  irwinHall (n?: number): number;

  /**
   * Mean of n uniformly distributed values
   *
   * Support: [0, 1]
   *
   * @example
   *
   * rng.bates({ n: 6 });
   * rng.bates(6);
   *
   * @see [Bates Distribution - Wikipedia](https://en.wikipedia.org/wiki/Bates_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.n] - Number of values to sum
   * @returns The mean of n uniform values
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  bates (options?: { n?: number }): number;

  /**
   * Mean of n uniformly distributed values
   *
   * Support: [0, 1]
   *
   * @example
   *
   * rng.bates({ n: 6 });
   * rng.bates(6);
   *
   * @see [Bates Distribution - Wikipedia](https://en.wikipedia.org/wiki/Bates_distribution)
   * @group Distributions
   * @param n - Number of values to sum
   * @returns The mean of n uniform values
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  bates (n?: number): number;

  /**
   * A version of the bates distribution that returns gaussian normally distributed results,
   * with n acting as a shape parameter.
   *
   * @see [Bates Distribution - Wikipedia](https://en.wikipedia.org/wiki/Bates_distribution)
   * @group Distributions
   * @param n - Number of values to sum
   * @returns The mean of n uniform values
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  batesgaussian (n: number): number

  /**
   * A version of the bates distribution that returns gaussian normally distributed results,
   * with n acting as a shape parameter.
   *
   * @see [Bates Distribution - Wikipedia](https://en.wikipedia.org/wiki/Bates_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.n] - Number of values to sum
   * @returns The mean of n uniform values
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  batesgaussian (options: { n?: number }): number

  // Other distributions

  /**
   * Probability that random number is less than p, returns 1 or 0.
   *
   * Support: {0, 1}
   *
   * @example
   *
   * rng.bernoulli({ p: 0.5 });
   * rng.bernoulli(0.5);
   *
   * @see [Bernoulli distribution - Wikipedia](https://en.wikipedia.org/wiki/Bernoulli_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.p] The probability of success, from [0 to 1], default 0.5
   * @returns 1 or 0, depending on if random number was less than p
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  bernoulli (options?: { p?: number }): number;

  /**
   * Probability that random number is less than p, returns 1 or 0.
   *
   * Support: {0, 1}
   *
   * @example
   *
   * rng.bernoulli({ p: 0.5 });
   * rng.bernoulli(0.5);
   *
   * @see [Bernoulli distribution - Wikipedia](https://en.wikipedia.org/wiki/Bernoulli_distribution)
   * @group Distributions
   * @param [p = 0.5] The probability of success, from [0 to 1], default 0.5
   * @returns 1 or 0, depending on if random number was less than p
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  bernoulli (p?: number): number;

  /**
   * This function uses the inverse transform sampling method to generate
   * an exponentially distributed random variable.
   *
   * Support: [0, ∞)
   *
   * @example
   *
   * rng.exponential({ rate: 1 });
   * rng.exponential(1);
   *
   * @param [options = {}]
   * @param [options.rate = 1] The rate, must be > 0, default 1
   * @see [Exponential distribution - Wikipedia](https://en.wikipedia.org/wiki/Exponential_distribution)
   * @group Distributions
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  exponential (options?: { rate?: number }): number;

  /**
   * This function uses the inverse transform sampling method to generate
   * an exponentially distributed random variable.
   *
   * Support: [0, ∞)
   *
   * @example
   *
   * rng.exponential({ rate: 1 });
   * rng.exponential(1);
   *
   * @param [rate = 1] The rate, must be > 0, default 1
   * @see [Exponential distribution - Wikipedia](https://en.wikipedia.org/wiki/Exponential_distribution)
   * @group Distributions
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  exponential (rate?: number): number;

  /**
   * Generates a value from the Generalized Pareto distribution.
   *
   * Support: [scale, ∞)
   *
   * @example
   *
   * rng.pareto({ shape: 0.5, scale: 1, location: 0 });
   * rng.pareto({ location: 0 });
   * rng.pareto({ scale: 1 });
   * rng.pareto({ shape: 0.5 });
   *
   * @see [Pareto distribution - Wikipedia](https://en.wikipedia.org/wiki/Pareto_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.shape=0.5] - The shape parameter, must be >= 0, default 0.5.
   * @param [options.scale=1] - The scale parameter, must be positive ( > 0), default 1.
   * @param [options.location=0] - The location parameter, default 0.
   * @returns A value from the Generalized Pareto distribution, [scale, ∞).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  pareto (options?: { shape?: number, scale?: number, location?: number }): number;

  /**
   * This function uses the fact that the Poisson distribution can be generated using a series of
   * random numbers multiplied together until their product is less than e^(-lambda). The number
   * of terms needed is the Poisson-distributed random variable.
   *
   * Support: {1, 2, 3 ...}
   *
   * @example
   *
   * rng.poisson({ lambda: 1 });
   * rng.poisson(1);
   *
   * @see [Poisson distribution - Wikipedia](https://en.wikipedia.org/wiki/Poisson_distribution)
   * @group Distributions
   * @param  [options = {}]
   * @param  [options.lambda = 1] Control parameter, must be positive, default 1.
   * @returns Poisson distributed random number, {1, 2, 3 ...}
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  poisson (options?: { lambda?: number }): number;

  /**
   * This function uses the fact that the Poisson distribution can be generated using a series of
   * random numbers multiplied together until their product is less than e^(-lambda). The number
   * of terms needed is the Poisson-distributed random variable.
   *
   * Support: {1, 2, 3 ...}
   *
   * @example
   *
   * rng.poisson({ lambda: 1 });
   * rng.poisson(1);
   *
   * @see [Poisson distribution - Wikipedia](https://en.wikipedia.org/wiki/Poisson_distribution)
   * @group Distributions
   * @param [lambda = 1] Control parameter, must be positive, default 1.
   * @returns Poisson distributed random number, {1, 2, 3 ...}
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  poisson (lambda?: number): number;

  /**
   * This function uses combinations to calculate probabilities for the hypergeometric distribution.
   *
   * The hypergeometric distribution is a discrete probability distribution that describes the probability of k
   * successes (random draws for which the object drawn has a specified feature) in
   * n draws, without replacement, from a finite population of size  N that contains exactly
   * K objects with that feature
   *
   * Support: {max(0, n+K-N), ..., min(n, K)}
   *
   * @example
   *
   * rng.hypergeometric({ N: 50, K: 10, n: 5 });
   * rng.hypergeometric({ N: 50, K: 10, n: 5, k: 2 });
   *
   * @see [Hypergeometric distribution - Wikipedia](https://en.wikipedia.org/wiki/Hypergeometric_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.N = 50] - The population size, must be positive integer.
   * @param [options.K = 10] - The number of successes in the population, must be positive integer lteq N.
   * @param [options.n = 5] - The number of draws, must be positive integer lteq N.
   * @param [options.k] - The number of observed successes, must be positive integer lteq K and n.
   * @returns The probability of exactly k successes in n draws, {max(0, n+K-N), ..., min(n, K)}.
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  hypergeometric (options?: { N?: number, K?: number, n?: number, k?: number }): number;

  /**
   * Generates a value from the Rademacher distribution.
   *
   * Support: {-1, 1}
   *
   * @example
   *
   * rng.rademacher();
   *
   * @see [Rademacher distribution](https://en.wikipedia.org/wiki/Rademacher_distribution)
   * @group Distributions
   * @returns either -1 or 1 with 50% probability
   */
  rademacher (): -1 | 1;

  /**
   * Generates a value from the Binomial distribution.
   *
   * Probability distribution of getting number of successes of n trials of a boolean trial with probability p
   *
   * Support: {0, 1, 2, ..., n}
   *
   * @example
   *
   * rng.binomial({ n = 1, p = 0.5 });
   * rng.binomial({ n = 100, p = 0.1 });
   *
   * @see [Binomial distribution - Wikipedia](https://en.wikipedia.org/wiki/Binomial_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.n = 1] - The number of trials, must be positive integer, default 1.
   * @param [options.p = 0.6] - The probability of success, must be a number between 0 and 1 inclusive, default 0.5.
   * @returns The number of successes, {0, 1, 2, ..., n}.
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  binomial (options?: { n?: number, p?: number }): number;

  /**
   * Generates a value from the Beta-binomial distribution.
   *
   * Support: {0, 1, 2, ..., n}
   *
   * @example
   *
   * rng.betaBinomial({ alpha = 1, beta = 2, n = 10 })
   * rng.betaBinomial({ n = 100 })
   *
   * @see [Beta-binomial distribution - Wikipedia](https://en.wikipedia.org/wiki/Beta-binomial_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.alpha = 1] - The alpha parameter of the Beta distribution, default 1, must be positive.
   * @param [options.beta = 1] - The beta parameter of the Beta distribution, default 1, must be positive.
   * @param [options.n = 1] - The number of trials, default 1, must be positive integer.
   * @returns The number of successes in n trials, {0, 1, 2, ..., n}
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  betaBinomial (options?: { alpha?: number, beta?: number, n?: number }): number;

  /**
   * Generates a value from the Beta distribution.
   *
   * Support: (0, 1)
   *
   * @example
   *
   * rng.beta({ alpha = 0.5, beta = 0.5 })
   * rng.beta({ alpha = 1, beta = 2 })
   * rng.beta({ beta = 1 })
   *
   * @see [Beta distribution - Wikipedia](https://en.wikipedia.org/wiki/Beta_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.alpha = 0.5] - The alpha parameter of the Beta distribution, must be positive, default 0.5.
   * @param [options.beta = 0.5] - The beta parameter of the Beta distribution, must be positive, default 0.5.
   * @returns A value from the Beta distribution, (0, 1).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  beta (options?: { alpha?: number, beta?: number }): number;

  /**
   * Generates a random number from the Gamma distribution.
   *
   * Support: (0, ∞)
   *
   * @example
   *
   * rng.gamma({ shape = 0.5, rate = 0.5 })
   * rng.gamma({ shape = 0.5, scale = 2 })
   * rng.gamma({ shape = 0.5, rate = 0.5, scale = 2 }) // Redundant as scale = 1 / rate
   * rng.gamma({ shape = 0.5, rate = 2, scale = 2 }) // Error('Cannot supply scale and rate')
   *
   * @see [Gamma distribution - Wikipedia](https://en.wikipedia.org/wiki/Gamma_distribution)
   * @group Distributions
   * @see [stdlib Gamma function](https://github.com/stdlib-js/random-base-gamma/blob/main/lib/gamma.js#L39)
   * @param [options = {}]
   * @param [options.shape = 1] - The shape parameter, must be postive, default 1.
   * @param [options.rate = 1] - The rate parameter, must be postive,  default 1.
   * @param [options.scale] - The scale parameter, must be postive, ( = 1/rate).
   * @returns A random number from the Gamma distribution, from (0, ∞).
   * @throws {Error} If both scale and rate are given and are not reciprocals of each other
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  gamma (options?: { shape?: number, rate?: number, scale?: number }): number;

  /**
   * Generates a value from the Student's t-distribution.
   *
   * Support: (-∞, ∞)
   *
   * @example:
   *
   * rng.studentsT({ nu: 10 })
   * rng.studentsT(10)
   *
   * @see [Student's t-distribution - Wikipedia](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.nu = 1] - The degrees of freedom, default 1, must be positive.
   * @returns A value from the Student's t-distribution, (-∞, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  studentsT (options?: { nu?: number }): number;

  /**
   * Generates a value from the Student's t-distribution.
   *
   * Support: (-∞, ∞)
   *
   * @example:
   *
   * rng.studentsT({ nu: 10 })
   * rng.studentsT(10)
   *
   * @see [Student's t-distribution - Wikipedia](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
   * @group Distributions
   * @param [nu = 1] The degrees of freedom, must be positive, default 1
   * @returns A value from the Student's t-distribution, (-∞, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  studentsT (nu?: number): number;

  /**
   * Generates a value from the Wigner semicircle distribution.
   *
   * Support: [-R; +R]
   *
   * @example:
   *
   * rng.wignerSemicircle({ R: 1 })
   * rng.wignerSemicircle(1)
   *
   * @see [Wigner Semicircle Distribution - Wikipedia](https://en.wikipedia.org/wiki/Wigner_semicircle_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.R = 1] - The radius of the semicircle, must be positive, default 1.
   * @returns A value from the Wigner semicircle distribution, [-R; +R].
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  wignerSemicircle (options?: { R?: number }): number;

  /**
   * Generates a value from the Wigner semicircle distribution.
   *
   * Support: [-R; +R]
   *
   * @example:
   *
   * rng.wignerSemicircle({ R: 1 })
   * rng.wignerSemicircle(1)
   *
   * @see [Wigner Semicircle Distribution - Wikipedia](https://en.wikipedia.org/wiki/Wigner_semicircle_distribution)
   * @group Distributions
   * @param [R = 1] - The radius of the semicircle, must be positive, default 1.
   * @returns A value from the Wigner semicircle distribution, [-R; +R].
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  wignerSemicircle (R?: number): number;

  /**
   * Generates a value from the Kumaraswamy distribution.
   *
   * Support: (0, 1)
   *
   * @example:
   *
   * rng.kumaraswamy({ alpha: 1, beta: 2 })
   * rng.kumaraswamy({ alpha: 1 })
   * rng.kumaraswamy({ beta: 2 })
   *
   * @see [Kumaraswamy  Distribution - Wikipedia](https://en.wikipedia.org/wiki/Kumaraswamy_distribution)
   * @group Distributions
   * @param [options = {}]
   * @param [options.alpha = 0.5] - The first shape parameter of the Kumaraswamy distribution, must be positive.
   * @param [options.beta = 0.5] - The second shape parameter of the Kumaraswamy distribution, must be positive.
   * @returns A value from the Kumaraswamy distribution, (0, 1).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  kumaraswamy (options?: { alpha?: number, beta?: number }): number;

  /**
   * Generates a value from the Hermite distribution.
   *
   * Support: {0, 1, 2, 3, ...}
   *
   * @example:
   *
   * rng.hermite({ lambda1: 1, lambda2: 2 })
   * rng.hermite({ lambda1: 1 })
   * rng.hermite({ lambda2: 2 })
   *
   * @see [Hermite Distribution - Wikipedia](https://en.wikipedia.org/wiki/Hermite_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.lambda1 = 1] - The mean of the first Poisson process, must be positive.
   * @param [options.lambda2 = 2] - The mean of the second Poisson process, must be positive.
   * @returns A value from the Hermite distribution, {0, 1, 2, 3, ...}
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  hermite (options?: { lambda1?: number, lambda2?: number }): number;

  /**
   * Generates a value from the Chi-squared distribution.
   *
   * Support: [0, ∞)
   *
   * @example:
   *
   * rng.chiSquared({ k: 2 })
   * rng.chiSquared(2) // Equivalent
   *
   * @see [Chi-squared Distribution - Wikipedia](https://en.wikipedia.org/wiki/Chi-squared_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.k] - The degrees of freedom, must be a postive integer - default 1.
   * @returns A value from the Chi-squared distribution [0, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  chiSquared (options?: { k?: number }): number;

  /**
   * Generates a value from the Chi-squared distribution.
   *
   * Support: [0, ∞)
   *
   * @example:
   *
   * rng.chiSquared({ k: 2 })
   * rng.chiSquared(2) // Equivalent
   *
   * @see [Chi-squared Distribution - Wikipedia](https://en.wikipedia.org/wiki/Chi-squared_distribution)
   * @group Distributions
   * @param [k = 1] - The degrees of freedom, must be a postive integer - default 1..
   * @returns A value from the Chi-squared distribution [0, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  chiSquared (k?: number): number;

  /**
   * Generates a value from the Rayleigh distribution
   *
   * Support: [0, ∞)
   *
   * @example:
   *
   * rng.rayleigh({ scale: 2 })
   * rng.rayleigh(2) // Equivalent
   *
   * @see [Rayleigh Distribution - Wikipedia](https://en.wikipedia.org/wiki/Rayleigh_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.scale] - The scale parameter of the Rayleigh distribution, must be > 0 - default 1.
   * @returns A value from the Rayleigh distribution [0, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  rayleigh (options?: { scale?: number }): number;

  /**
   * Generates a value from the Rayleigh distribution
   *
   * Support: [0, ∞)
   *
   * @example:
   *
   * rng.rayleigh({ scale: 2 })
   * rng.rayleigh(2) // Equivalent
   *
   * @see [Rayleigh Distribution - Wikipedia](https://en.wikipedia.org/wiki/Rayleigh_distribution)
   * @group Distributions
   * @param [scale = 1] - The scale parameter of the Rayleigh distribution, must be > 0 - default 1.
   * @returns A value from the Rayleigh distribution [0, ∞).
   * @throws {@link NumberValidationError} If the input parameter is not valid.
   */
  rayleigh (scale?: number): number;

  /**
   * Generates a value from the Log-Normal distribution.
   *
   * Support: (0, ∞)
   *
   * @example:
   *
   * rng.logNormal({ mean: 2, stddev: 1 })
   * rng.logNormal({ mean: 2 })
   * rng.logNormal({ stddev: 1 })
   *
   * @see [Log Normal Distribution - Wikipedia](https://en.wikipedia.org/wiki/Log-normal_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.mean] - The mean of the underlying normal distribution - default 0.
   * @param [options.stddev] - The standard deviation of the underlying normal distribution, must be positive - default 1.
   * @returns A value from the Log-Normal distribution (0, ∞).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  logNormal (options?: { mean?: number, stddev?: number }): number;

  /**
   * Generates a value from the Cauchy distribution.
   *
   * Support: (-∞, +∞)
   *
   * @example:
   *
   * rng.cauchy({ median: 2, scale: 1 })
   * rng.cauchy({ median: 2 })
   * rng.cauchy({ scale: 1 })
   *
   * @see [Cauchy Distribution - Wikipedia](https://en.wikipedia.org/wiki/Cauchy_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.median]- The location parameter (median, sometimes called x0) - default 0.
   * @param [options.scale]- The scale parameter, must be positive - default 1.
   * @returns A value from the Cauchy distribution (-∞, +∞).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  cauchy (options?: { median?: number, scale?: number }): number;

  /**
   * Generates a value from the Laplace distribution.
   *
   * Support: (-∞, +∞)
   *
   * @example:
   *
   * rng.laplace({ mean: 2, scale: 1 })
   * rng.laplace({ mean: 2 })
   * rng.laplace({ scale: 1 })
   *
   * @see [Laplace Distribution - Wikipedia](https://en.wikipedia.org/wiki/Laplace_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.mean]- The location parameter (mean) - default 0.
   * @param [options.scale]- The scale parameter, must be positive - default 1.
   * @returns A value from the Laplace distribution (-∞, +∞).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  laplace (options?: { mean?: number, scale?: number }): number;

  /**
   * Generates a value from the Logistic distribution.
   *
   * Support: (-∞, +∞)
   *
   * @example:
   *
   * rng.logistic({ mean: 2, scale: 1 })
   * rng.logistic({ mean: 2 })
   * rng.logistic({ scale: 1 })
   *
   * @see [Laplace Distribution - Wikipedia](https://en.wikipedia.org/wiki/Logistic_distribution)
   * @group Distributions
   * @param [options]
   * @param [options.mean]- The location parameter (mean) - default 0.
   * @param [options.scale]- The scale parameter, must be positive - default 1.
   * @returns A value from the Logistic distribution (-∞, +∞).
   * @throws {@link NumberValidationError} If the input parameters are not valid.
   */
  logistic (options?: { mean?: number, scale?: number }): number;
}

export interface RngConstructor {
  new (seed?:Seed): RngInterface;

  predictable<RngConstructor>(this: new (seed: Seed) => RngConstructor, seed: Seed): RngConstructor;

  /**
   * @group Serialization
   */
  unserialize (rng: any): any;

  /**
   * {@inheritDoc RngInterface.chancyMin}
   * @group Result Prediction
   */
  chancyMin (input: Chancy): number;

  /**
   * {@inheritDoc RngInterface.chancyMax}
   * @group Result Prediction
   */
  chancyMax (input: Chancy): number;

  /**
   * {@inheritDoc RngInterface.parseDiceString}
   * @group Utilities
   */
  parseDiceString (string: string): DiceInterface;

  /**
   * {@inheritDoc RngInterface.diceMin}
   * @group Result Prediction
   */
  diceMin (n: string | DiceInterface | number, d?: number, plus?: number): number;

  /**
   * {@inheritDoc RngInterface.diceMax}
   * @group Result Prediction
   */
  diceMax (n: string | DiceInterface | number, d?: number, plus?: number): number;
}
