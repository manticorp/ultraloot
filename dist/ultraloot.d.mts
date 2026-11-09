interface RollTraceEvent {
    type: 'table:start' | 'table:end' | 'pool' | 'choice' | 'condition' | 'modifier';
    tableId: string | number;
    poolId?: string;
    entryId?: string | number | null;
    choice?: string | number | null;
    name?: string;
    passed?: boolean;
    quantity?: number;
    rolls?: number;
    weights?: Record<string, number>;
    state?: unknown;
}
type RollTraceSink = (event: RollTraceEvent) => void;

/**
 * Allows for randomly drawing from a pool of entries without replacement
 * @category Pool
 */
declare class Pool<EntryType> {
    #private;
    rng: RngInterface;
    constructor(entries?: EntryType[], rng?: RngInterface);
    private copyArray;
    setEntries(entries: EntryType[]): this;
    getEntries(): EntryType[];
    set entries(entries: EntryType[]);
    get entries(): EntryType[];
    get length(): number;
    setRng(rng: RngInterface): this;
    getRng(): RngInterface;
    add(entry: EntryType): void;
    empty(): this;
    isEmpty(): boolean;
    /**
     * Draw an element from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     */
    draw(): EntryType;
    /**
     * Draw n elements from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     * @throws {@link PoolNotEnoughElementsError} if the pool does not have enough elements to draw n values
     */
    drawMany(n: number): EntryType[];
}

interface DiceInterface {
    n: number;
    d: number;
    plus: number;
}
interface DiceReturnInterface {
    dice: number[];
    plus: number;
    total: number;
}
/**
 * Distributions allowed for use in chancy
 * @type {String}
 */
type Distribution = 'normal' | 'boxMuller' | 'gaussian' | keyof RngDistributionsInterface;
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
type ChancyInterface = ((({
    type?: 'random';
    skew?: number;
}) | ({
    type: 'integer' | 'int';
    skew?: number;
}) | ({
    type: 'dice';
    dice?: string;
    n?: number;
    d?: number;
    plus?: number;
}) | ({
    type: 'normal' | 'normal_int' | 'normal_integer';
    mean?: number;
    stddev?: number;
    skew?: number;
}) | ({
    type: 'bates';
    n?: number;
}) | ({
    type: 'batesgaussian';
    n?: number;
}) | ({
    type: 'bernoulli';
    p?: number;
}) | ({
    type: 'beta';
    alpha?: number;
    beta?: number;
}) | ({
    type: 'betaBinomial';
    alpha?: number;
    beta?: number;
    n?: number;
}) | ({
    type: 'binomial';
    n?: number;
    p?: number;
}) | ({
    type: 'boxMuller';
    mean?: number;
    stddev?: number;
}) | ({
    type: 'cauchy';
    median?: number;
    scale?: number;
}) | ({
    type: 'chiSquared';
    k?: number;
}) | ({
    type: 'exponential';
    rate?: number;
}) | ({
    type: 'gamma';
    shape?: number;
    rate?: number;
    scale?: number;
}) | ({
    type: 'gaussian';
    mean?: number;
    stddev?: number;
    skew?: number;
}) | ({
    type: 'hermite';
    lambda1?: number;
    lambda2?: number;
}) | ({
    type: 'hypergeometric';
    N?: number;
    K?: number;
    n?: number;
    k?: number;
}) | ({
    type: 'irwinHall';
    n?: number;
}) | ({
    type: 'kumaraswamy';
    alpha?: number;
    beta?: number;
}) | ({
    type: 'laplace';
    mean?: number;
    scale?: number;
}) | ({
    type: 'logistic';
    mean?: number;
    scale?: number;
}) | ({
    type: 'logNormal';
    mean?: number;
    stddev?: number;
}) | ({
    type: 'pareto';
    shape?: number;
    scale?: number;
    location?: number;
}) | ({
    type: 'poisson';
    lambda?: number;
}) | ({
    type: 'rademacher';
}) | ({
    type: 'rayleigh';
    scale?: number;
}) | ({
    type: 'studentsT';
    nu?: number;
}) | ({
    type: 'wignerSemicircle';
    R?: number;
})) & {
    min?: number;
    max?: number;
});
/**
 * Chancy inputs that lead to strictly numeric results.
 * @see {@link RngInterface.chancy}
 */
type ChancyNumeric = ChancyInterface | string | number | number[];
/**
 * Special Chancy type - for feeding to the 'chancy' function
 * @see {@link RngInterface.chancy}
 */
type Chancy = ChancyNumeric | any[];
/**
 * Valid seeds for feeding to the RNG
 */
type Seed = string | number;
/**
 * Interface for a random function that returns a number, given no arguments
 * that is uniformly distributed.
 */
interface Randfunc {
    (): number;
}
/**
 * Basic interface required for Rng implementations.
 *
 * Use this as an interface if you don't need all the advanced distributions
 */
interface RngInterface {
    /**
     * Whether this is the same as another object interfacting RngInterface, i.e.
     * they will generate the same next number.
     * @param other The thing to compare
     */
    sameAs(other: RngInterface): boolean;
    /**
     * Seed the random number generator with the given seed.
     *
     * @group Seeding
     * @param  {Seed} seed Can be a string or a number
     */
    seed(seed: Seed): this;
    /**
     * Get the current seed.
     *
     * Note this may not be the same as the set seed if numbers have been generated
     * since its inception. Also, strings are usually transformed to numbers.
     *
     * @group Seeding
     * @return The current seed
     */
    getSeed(): number;
    /**
     * Whether we are going to throw if max recursions is reached
     */
    shouldThrowOnMaxRecursionsReached(): boolean;
    /**
     * Sets whether we should throw if max recursions is reached.
     */
    shouldThrowOnMaxRecursionsReached(val: boolean): this;
    /**
     * Create a new instance. Will use a globally set seed, so every instance
     * returnd by this should generate the same numbers.
     *
     * @group Seeding
     * @return An Rng instance, set to the given seed
     */
    predictable(): RngInterface;
    /**
     * Create a new instance with the given seed
     *
     * @group Seeding
     * @param seed
     * @return An Rng instance, set to the given seed
     */
    predictable(seed: Seed): RngInterface;
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
    randomSource(func?: Randfunc): this;
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
    uniqid(prefix?: string): string;
    /**
     * Returns a unique string of length len
     *
     * @group Utilities
     * @param len Length of the string to generate
     * @return A string of length "len"
     */
    randomString(len?: number): string;
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
    scale(number: number, from: number, to: number, min?: number, max?: number): number;
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
    scaleNorm(number: number, from: number, to: number): number;
    /**
     * Alias of randBetween
     *
     * @group Random Number Generation
     * @see {@link randBetween}
     */
    random(from?: number, to?: number, skew?: number): number;
    /**
     * @group Random Number Generation
     * @return A random number from [0, 1)
     */
    randBetween(): number;
    /**
     * @group Random Number Generation
     * @param from Lower bound, inclusive
     * @return A random number from [from, from+1)
     */
    randBetween(from?: number): number;
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
    randBetween(from?: number, to?: number): number;
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
    randBetween(from: number, to: number, skew: number): number;
    /**
     * @group Random Number Generation
     * @return A random integer from [0, 1]
     */
    randInt(): number;
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
    randInt(from?: number, to?: number): number;
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
    randInt(from?: number, to?: number, skew?: number): number;
    /**
     * @group Random Number Generation
     * @return A percentage [0, 100]
     */
    percentage(): number;
    /**
     * @group Random Number Generation
     * @return A probability [0, 1]
     */
    probability(): number;
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
    chance(n: number, chanceIn?: number): boolean;
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
    chanceTo(from: number, to: number): boolean;
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
    chancy(input: ChancyNumeric): number;
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
    chancyInt(input: Chancy): number;
    /**
     * Determines the minimum value a Chancy input can take.
     *
     * @group Result Prediction
     * @param input Chancy input
     * @return Minimum value a call to chancy with these args can take
     */
    chancyMin(input: Chancy): number;
    /**
     * Determines the maximum value a Chancy input can take.
     *
     * @group Result Prediction
     * @param input Chancy input
     * @return Maximum value a call to chancy with these args can take
     */
    chancyMax(input: Chancy): number;
    /**
     * Outputs what the distribution supports in terms of output
     */
    support(input: Distribution): string | undefined;
    /**
     * Takes a random choice from an array of values, with equal weight.
     *
     * @group Choices
     * @param data The values to choose from
     * @return The random choice from the array
     */
    choice(data: Array<any>): any;
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
    weights(data: Array<any>): Map<any, number>;
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
    weightedChoice(data: Record<any, number> | Array<any> | Map<any, number>): any;
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
    diceExpanded(dice: string): DiceReturnInterface;
    diceExpanded(options: Partial<DiceInterface>): DiceReturnInterface;
    diceExpanded(dice: number[]): DiceReturnInterface;
    diceExpanded(n: number, d: number, plus: number): DiceReturnInterface;
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
    dice(dice: string): number;
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
    dice({ n, d, plus }: Partial<DiceInterface>): number;
    /**
     * Roll "n" x "d" sided dice and add "plus"
     * @group Random Number Generation
     * @param options [n, d, plus] format of dice roll
     * @return A random roll on the dice
     * @throws Error if the given input is invalid.
     */
    dice([n, d, plus]: number[]): number;
    /**
     * Roll "n" x "d" sided dice and add "plus"
     * @group Random Number Generation
     * @param  n    The number of dice to roll
     * @param  d    The number of faces on the dice
     * @param  plus The number to add at the end
     * @return A random roll on the dice
     * @throws Error if the given input is invalid.
     */
    dice(n: number, d?: number, plus?: number): number;
    /**
     * Parses a string representation of a dice and gives the
     * object representation {n, d, plus}
     * @group Utilities
     * @param  string String dice representation, e.g. '1d6'
     * @returns The dice representation object
     * @throws Error if the given input is invalid.
     */
    parseDiceString(string: string): DiceInterface;
    /**
     * Gives the minimum result of a call to dice with these arguments
     * @group Result Prediction
     * @see {@link dice}
     */
    diceMin(n: string | DiceInterface | number, d?: number, plus?: number): number;
    /**
     * Gives the maximum result of a call to dice with these arguments
     * @group Result Prediction
     * @see {@link dice}
     */
    diceMax(n: string | DiceInterface | number, d?: number, plus?: number): number;
    /**
     * Clamps a number to lower and upper bounds, inclusive
     *
     * @example
     * rng.clamp(5, 0, 1); // 1
     * rng.clamp(-1, 0, 1); // 0
     * rng.clamp(0.5, 0, 1); // 0.5
     * @group Utilities
     */
    clamp(number: number, lower: number, upper: number): number;
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
    bin(val: number, bins: number, min: number, max: number): number;
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
    normal(options?: {
        mean?: number;
        stddev?: number;
        max?: number;
        min?: number;
        skew?: number;
    }, depth?: number): number;
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
    gaussian(options?: {
        mean?: number;
        stddev?: number;
        skew?: number;
    }): number;
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
    boxMuller(options?: {
        mean?: number;
        stddev?: number;
    }): number;
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
    boxMuller(mean?: number, stddev?: number): number;
    /**
     * A serialized, storable version of this RNG that can be
     * unserialized with unserialize
     *
     * @group Serialization
     */
    serialize(): any;
}
/**
 * A version of RngInterface that includes lots of extra distributions.
 *
 * Depending on your integration, you may not need this.
 *
 */
interface RngDistributionsInterface {
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
    irwinHall(options?: {
        n?: number;
    }): number;
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
    irwinHall(n?: number): number;
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
    bates(options?: {
        n?: number;
    }): number;
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
    bates(n?: number): number;
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
    batesgaussian(n: number): number;
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
    batesgaussian(options: {
        n?: number;
    }): number;
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
    bernoulli(options?: {
        p?: number;
    }): number;
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
    bernoulli(p?: number): number;
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
    exponential(options?: {
        rate?: number;
    }): number;
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
    exponential(rate?: number): number;
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
    pareto(options?: {
        shape?: number;
        scale?: number;
        location?: number;
    }): number;
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
    poisson(options?: {
        lambda?: number;
    }): number;
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
    poisson(lambda?: number): number;
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
    hypergeometric(options?: {
        N?: number;
        K?: number;
        n?: number;
        k?: number;
    }): number;
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
    rademacher(): -1 | 1;
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
    binomial(options?: {
        n?: number;
        p?: number;
    }): number;
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
    betaBinomial(options?: {
        alpha?: number;
        beta?: number;
        n?: number;
    }): number;
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
    beta(options?: {
        alpha?: number;
        beta?: number;
    }): number;
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
    gamma(options?: {
        shape?: number;
        rate?: number;
        scale?: number;
    }): number;
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
    studentsT(options?: {
        nu?: number;
    }): number;
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
    studentsT(nu?: number): number;
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
    wignerSemicircle(options?: {
        R?: number;
    }): number;
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
    wignerSemicircle(R?: number): number;
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
    kumaraswamy(options?: {
        alpha?: number;
        beta?: number;
    }): number;
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
    hermite(options?: {
        lambda1?: number;
        lambda2?: number;
    }): number;
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
    chiSquared(options?: {
        k?: number;
    }): number;
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
    chiSquared(k?: number): number;
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
    rayleigh(options?: {
        scale?: number;
    }): number;
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
    rayleigh(scale?: number): number;
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
    logNormal(options?: {
        mean?: number;
        stddev?: number;
    }): number;
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
    cauchy(options?: {
        median?: number;
        scale?: number;
    }): number;
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
    laplace(options?: {
        mean?: number;
        scale?: number;
    }): number;
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
    logistic(options?: {
        mean?: number;
        scale?: number;
    }): number;
}
interface RngConstructor {
    new (seed?: Seed): RngInterface;
    predictable<RngConstructor>(this: new (seed: Seed) => RngConstructor, seed: Seed): RngConstructor;
    /**
     * @group Serialization
     */
    unserialize(rng: any): any;
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    chancyMin(input: Chancy): number;
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    chancyMax(input: Chancy): number;
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    parseDiceString(string: string): DiceInterface;
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    diceMin(n: string | DiceInterface | number, d?: number, plus?: number): number;
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    diceMax(n: string | DiceInterface | number, d?: number, plus?: number): number;
}

interface SerializedRng {
    samplingVersion?: number;
    mask: number;
    seed: number;
    m_z: number;
}
declare class MaxRecursionsError extends Error {
}
declare class NonRandomRandomError extends Error {
}
/**
 * This abstract class implements most concrete implementations of
 * functions, as the only underlying changes are likely to be to the
 * uniform random number generation, and how that is handled.
 *
 * All the typedoc documentation for this has been sharded out to RngInterface
 * in a separate file.
 */
declare abstract class RngAbstract implements RngInterface, RngDistributionsInterface {
    #private;
    constructor(seed?: Seed);
    getSeed(): number;
    sameAs(other: RngInterface): boolean;
    randomSource(source?: Randfunc | null): this;
    getRandomSource(): Randfunc | null | undefined;
    protected setSeed(seed?: Seed): this;
    seed(seed?: Seed): this;
    serialize(): any;
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized: SerializedRng): RngInterface;
    predictable(seed?: Seed): RngInterface;
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable<T extends RngAbstract>(this: new (seed: Seed) => T, seed: Seed): T;
    protected hashStr(str: string): number;
    protected convertStringToNumber(str: string): number;
    protected _random(): number;
    /**
     * Internal source of uniformly distributed random numbers between 0 and 1, [0, 1)
     *
     * Simplest implementation would be Math.random()
     */
    protected abstract _next(): number;
    percentage(): number;
    probability(): number;
    random(from?: number, to?: number, skew?: number): number;
    chance(n: number, chanceIn?: number): boolean;
    chanceTo(from: number, to: number): boolean;
    randInt(from?: number, to?: number, skew?: number): number;
    uniqid(prefix?: string): string;
    randomString(len?: number): string;
    randBetween(from?: number, to?: number, skew?: number): number;
    scale(number: number, from: number, to: number, min?: number, max?: number): number;
    scaleNorm(number: number, from: number, to: number): number;
    shouldThrowOnMaxRecursionsReached(): boolean;
    shouldThrowOnMaxRecursionsReached(val: boolean): this;
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
    normal({ mean, stddev, max, min, skew }?: {
        mean?: number;
        stddev?: number;
        max?: number;
        min?: number;
        skew?: number;
    }, depth?: number): number;
    gaussian({ mean, stddev, skew }?: {
        mean?: number;
        stddev?: number;
        skew?: number;
    }): number;
    boxMuller(mean?: number | {
        mean?: number;
        stddev?: number;
    }, stddev?: number): number;
    irwinHall(n?: number | {
        n?: number;
    }): number;
    bates(n?: number | {
        n?: number;
    }): number;
    batesgaussian(n?: number | {
        n?: number;
    }): number;
    bernoulli(p?: number | {
        p?: number;
    }): number;
    exponential(rate?: number | {
        rate?: number;
    }): number;
    pareto({ shape, scale, location }?: {
        shape?: number;
        scale?: number;
        location?: number;
    }): number;
    poisson(lambda?: number | {
        lambda?: number;
    }): number;
    hypergeometric({ N, K, n, k }?: {
        N?: number;
        K?: number;
        n?: number;
        k?: number;
    }): number;
    rademacher(): -1 | 1;
    binomial({ n, p }?: {
        n?: number;
        p?: number;
    }): number;
    betaBinomial({ alpha, beta, n }?: {
        alpha?: number;
        beta?: number;
        n?: number;
    }): number;
    beta({ alpha, beta }?: {
        alpha?: number;
        beta?: number;
    }): number;
    gamma({ shape, rate, scale }?: {
        shape?: number;
        rate?: number;
        scale?: number;
    }): number;
    studentsT(nu?: number | {
        nu?: number;
    }): number;
    wignerSemicircle(R?: number | {
        R?: number;
    }): number;
    kumaraswamy({ alpha, beta }?: {
        alpha?: number;
        beta?: number;
    }): number;
    hermite({ lambda1, lambda2 }?: {
        lambda1?: number;
        lambda2?: number;
    }): number;
    chiSquared(k?: number | {
        k?: number;
    }): number;
    rayleigh(scale?: number | {
        scale?: number;
    }): number;
    logNormal({ mean, stddev }?: {
        mean?: number;
        stddev?: number;
    }): number;
    cauchy({ median, scale }?: {
        median?: number;
        scale?: number;
    }): number;
    laplace({ mean, scale }?: {
        mean?: number;
        scale?: number;
    }): number;
    logistic({ mean, scale }?: {
        mean?: number;
        scale?: number;
    }): number;
    /**
     * Returns the support of the given distribution.
     *
     * @see [Wikipedia - Support (mathematics)](https://en.wikipedia.org/wiki/Support_(mathematics)#In_probability_and_measure_theory)
     */
    support(distribution: Distribution): string | undefined;
    chancyInt(input: Chancy): number;
    chancy<T>(input: T[], depth?: number): T;
    chancy(input: ChancyNumeric, depth?: number): number;
    private chancyMinMax;
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    chancyMin(input: Chancy): number;
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    chancyMax(input: Chancy): number;
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    static chancyMin(input: Chancy): number;
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    static chancyMax(input: Chancy): number;
    choice(data: Array<any>): any;
    weights(data: Array<any>): Map<any, number>;
    weightedChoice(data: Record<any, number> | Array<any> | Map<any, number>): any;
    pool<T>(entries?: T[]): Pool<T>;
    protected static parseDiceArgs(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): DiceInterface;
    protected parseDiceArgs(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): DiceInterface;
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    static parseDiceString(string: string): DiceInterface;
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    diceMax(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number;
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    diceMin(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number;
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    static diceMax(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number;
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    static diceMin(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number;
    diceExpanded(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): {
        dice: number[];
        plus: number;
        total: number;
    };
    dice(n?: string | Partial<DiceInterface> | number | number[], d?: number, plus?: number): number;
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    parseDiceString(string: string): DiceInterface;
    clamp(number: number, lower?: number, upper?: number): number;
    bin(val: number, bins: number, min: number, max: number): number;
}
/**
 * @category Main Class
 */
declare class Rng extends RngAbstract implements RngInterface, RngDistributionsInterface {
    #private;
    constructor(seed?: Seed);
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable<Rng>(this: new (seed: Seed) => Rng, seed: Seed): Rng;
    serialize(): any;
    sameAs(other: any): boolean;
    /** @hidden */
    getMask(): number;
    /** @hidden */
    getMz(): number;
    /** @hidden */
    setMask(mask: number): void;
    /** @hidden */
    setMz(mz: number): void;
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized: SerializedRng): Rng;
    seed(i?: Seed): this;
    protected _next(): number;
}

declare class LootTableEntryResult<Item = any> {
    id?: number | string;
    stackable: boolean;
    name?: string;
    item?: Item;
    qty: number;
    constructor({ id, stackable, name, item, qty }?: {
        id?: number | string;
        stackable?: boolean;
        name?: string;
        item?: Item;
        qty?: number;
    });
    get description(): string;
    describe(): string;
    getQty(): number;
    setQty(n: number): void;
    addQty(n: number): void;
}

declare class LootTableEntryResults<Item = any> extends Array<LootTableEntryResult<Item>> {
    constructor(documents?: Array<LootTableEntryResult<Item>> | number);
    merge(other: LootTableEntryResults<Item>): this;
    merged(other: LootTableEntryResults<Item>): LootTableEntryResults<Item>;
    protected entrySignature(entry: LootTableEntryResult<Item>): string;
    collapsed(): LootTableEntryResults<Item>;
}

type LootTableEntryDefinition = {
    name?: string;
    id?: number | string;
    stackable?: boolean;
    unique?: boolean;
    weight?: number;
    item?: any;
    qty?: ChancyNumeric;
    functions?: Array<FunctionDefinition>;
    conditions?: Array<ConditionDefinition>;
};
interface FunctionDefinition {
    function: string;
    arguments?: unknown;
    args?: unknown;
}
interface ConditionDefinition {
    function: string;
    arguments?: unknown;
    args?: unknown;
}
declare class LootTableEntry {
    id?: number | string;
    stackable?: boolean;
    unique?: boolean;
    name?: string;
    weight: number;
    item?: any;
    qty: ChancyNumeric;
    functions: Array<FunctionDefinition>;
    conditions: Array<ConditionDefinition>;
    rng?: RngInterface;
    /**
     * @param definition The loot table entry definition
     */
    constructor({ id, stackable, unique, name, weight, item, functions, conditions, qty, }?: LootTableEntryDefinition);
    getRng(rng?: RngInterface): RngInterface | Rng;
    setRng(rng: RngInterface): void;
    get description(): string;
    describe(): string;
    getItem(): any;
    deepCloneObject(ob: object): any;
    cloneItem(): any;
    isTable(): boolean;
    resultDefinition(rng: RngInterface): {
        id: string | number | undefined;
        stackable: boolean | undefined;
        name: string | undefined;
        item: any;
        qty: number;
    };
    generateBaseResults(rng: RngInterface): LootTableEntryResults<any>;
    applyConditions({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): Promise<boolean>;
    roll({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    rollItem({ rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults<any>>;
    rollTable({ rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults<any>>;
    processEntryResults(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults<any>>;
    processEntryResult(entryResult: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    applyConditionsSync({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): boolean;
    rollSync({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): LootTableEntryResults;
    rollItemSync({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults<any>;
    rollTableSync({ rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults<any>;
    processEntryResultsSync(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults<any>;
    processEntryResultSync(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
}

interface LootTablePoolDefinition {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    rolls?: ChancyNumeric;
    nulls?: ChancyNumeric;
    entries?: Array<LootTableEntry | LootTable | LootTableEntryDefinition>;
    template?: Partial<LootTableEntryDefinition>;
}
declare class LootPool {
    name?: string;
    id?: string;
    conditions: Array<ConditionDefinition>;
    functions: Array<FunctionDefinition>;
    rolls: ChancyNumeric;
    nulls: ChancyNumeric;
    entries: Array<LootTableEntry | LootTable>;
    template: Partial<LootTableEntryDefinition>;
    static NULLKEY: string;
    /**
     * @param definition The loot table pool definition
     */
    constructor({ name, id, conditions, functions, rolls, nulls, entries, template, }?: LootTablePoolDefinition);
    get description(): string;
    describe(): string;
    createEntry(def: LootTableEntryDefinition): LootTableEntry;
    addEntry(entry: LootTableEntry | LootTable | LootTableEntryDefinition, def?: Omit<LootTableEntryDefinition, 'id'>): this;
    getEntries(): (LootTable | LootTableEntry)[];
    roll({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults<any>>;
    rollSync({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults<any>;
    processEntryResults(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults<any>>;
    processEntryResultsSync(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults<any>;
    processEntryResult(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    processEntryResultSync(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
}

/**
 * Object used when creating a loot table.
 */
type LootTableDefinition = {
    name?: string;
    id?: string | number;
    fn?: string | number | null;
    rng?: RngInterface;
    pools?: Array<LootPool>;
    ul?: UltraLoot;
};
type LootTableFunctionSignature = ({ rng, looted, looter, context, result, args }: {
    rng: RngInterface;
    looted: LootTableEntryResult;
    looter: any;
    context: any;
    result: LootTableEntryResults;
    args?: any;
}) => void;
type LootTableConditionSignature = ({ rng, looted, looter, context, result, args }: {
    rng: RngInterface;
    looted?: LootTableEntryResult;
    looter: any;
    context: any;
    result: LootTableEntryResults;
    args?: any;
}) => boolean | Promise<boolean>;
interface TableRollInterface {
    /** @internal Parent callback scope for a nested roll. */
    parent?: LootTable;
    trace?: RollTraceSink;
    looter?: any;
    context?: any;
    result?: LootTableEntryResults;
    rng?: RngInterface;
    n?: ChancyNumeric;
}
interface TablePoolRollInterface {
    pool: LootPool;
    looter?: any;
    context?: any;
    result?: LootTableEntryResults;
    rng?: RngInterface;
    n?: ChancyNumeric;
}
declare class LootTable {
    name?: string;
    id: string | number;
    /**
     * Filename that should be used to represent this table
     * when it is saved as JSON. This should include relative
     * path/folder names
     */
    fn?: string | number | null;
    ul?: UltraLoot;
    rng: RngInterface;
    pools: Array<LootPool>;
    functions: Record<string, LootTableFunctionSignature>;
    conditions: Record<string, LootTableConditionSignature>;
    /**
     * A parent's functions should be available to an Entry table when rolling.
     * For this case, we have to "borrow" the parent table to allow functions/
     * conditions to be used from there if needed.
     *
     * This is a set, so we don't end up with the same table in there multiple times.
     */
    borrowed: Set<LootTable>;
    private rollAncestors;
    private sourceTable?;
    private traceSink?;
    private createRollScope;
    get tracing(): boolean;
    /** @internal Emit an observation without drawing random numbers. */
    emitTrace(event: Omit<RollTraceEvent, 'tableId'>): void;
    /**
     * @param definition The loot table definition
     */
    constructor({ name, rng, id, pools, fn, ul }?: LootTableDefinition);
    registerFunction(name: string, fn: LootTableFunctionSignature): void;
    registerCondition(name: string, fn: LootTableConditionSignature): void;
    /**
     * The string to be used as a filename for this table.
     */
    get filename(): string | number | undefined | null;
    set filename(fn: string | number | null | undefined);
    /**
     * ultraloot instance
     */
    get ultraloot(): UltraLoot | undefined;
    set ultraloot(ul: UltraLoot | undefined);
    get description(): string;
    describe(): string;
    borrow(table: LootTable): this;
    unborrow(table: LootTable): this;
    getPools(): LootPool[];
    setRng(rng: RngInterface): this;
    protected rollBasics({ rng, looter, context, n }: Omit<TableRollInterface, 'result'>): [RngInterface, number];
    /**
     * Roll for loot on this table
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    rollSync({ parent, trace, looter, context, result, rng, n }?: TableRollInterface): LootTableEntryResults;
    /**
     * Roll for loot on this table
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    roll({ parent, trace, looter, context, result, rng, n }?: TableRollInterface): Promise<LootTableEntryResults>;
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     * @param rollDefinition
     */
    rollPoolSync({ pool, looter, context, result, rng, n }: TablePoolRollInterface): LootTableEntryResults;
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    rollPool({ pool, looter, context, result, rng, n }: TablePoolRollInterface): Promise<LootTableEntryResults>;
    hasFunction(fn: FunctionDefinition): boolean;
    hasCondition(cond: ConditionDefinition): boolean;
    createPool(def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootPool;
    addPool(def: LootPool | LootTablePoolEasyDefinition | LootTablePoolDefinition): this;
    getPotentialDrops(): {
        entry: any;
        weight: number;
        min: number;
        max: number;
    }[];
    /**
     * @param functionDefinition
     * @param context
     */
    applyFunction(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    /**
     * @param conditionDefinition
     * @param context
     */
    applyCondition(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<boolean>;
    /**
     * @param functionDefinition
     * @param context
     */
    applyFunctionSync(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
    /**
     * @param conditionDefinition
     * @param context
     */
    applyConditionSync(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): boolean;
}

interface SimulationOptions {
    iterations?: number;
    seed?: Seed;
    rng?: RngInterface;
    looter?: any;
    context?: any;
    signal?: AbortSignal;
}
interface ItemStatistics {
    key: string;
    id?: string | number;
    name?: string;
    hits: number;
    probability: number;
    probability95: [number, number];
    meanQuantity: number;
    totalQuantity: number;
    /** Geometric estimate assuming independent rolls with a stationary probability. */
    rollsFor95Percent: number;
}
interface SimulationResult {
    iterations: number;
    emptyRolls: number;
    noDropProbability: number;
    items: ItemStatistics[];
}
/** Execute actual modifiers/conditions. IDs identify items; names group entries without IDs. */
declare function simulateTableSync(table: LootTable, options?: SimulationOptions): SimulationResult;
declare function simulateTable(table: LootTable, options?: SimulationOptions): Promise<SimulationResult>;

interface TableValidationIssue {
    path: string;
    code: string;
    message: string;
}
interface TableValidationOptions {
    mode?: 'sync' | 'async';
    tables?: Record<string, unknown>;
    allowExternalReferences?: boolean;
    functions?: Record<string, unknown>;
    conditions?: Record<string, unknown>;
}
interface TableValidationResult {
    valid: boolean;
    errors: TableValidationIssue[];
}
/** Validate structure and references without rolling, invoking callbacks, or consuming RNG. */
declare function validateTable(definition: unknown, options?: TableValidationOptions): TableValidationResult;

declare const VERSION_KEY = "__version__";
/**
 * This is for easily creating loot tables using a json like
 * object instead of all the specific loot table objects
 */
type LootTableEasyDefinition = {
    name?: string;
    id?: string;
    rng?: string | number | RngInterface;
    pools?: Array<LootPool | LootTablePoolEasyDefinition>;
};
/**
 * This is for easily creating loot table pools using a json like
 * object instead of all the specific loot table objects
 */
type LootTablePoolEasyDefinition = {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    template?: LootTableEntryDefinition;
    rolls?: ChancyNumeric;
    nulls?: ChancyNumeric;
    entries?: Array<LootTableEntry | LootTableEntryDefinition | LootTable>;
};
/**
 * This defines how a LootTable is stored in JSON files
 */
type LootTableJsonDefinition = {
    name?: string;
    id: string | number;
    fn?: string | number | null;
    rng?: string | number | RngInterface;
    pools?: Array<LootTablePoolJsonDefinition>;
};
/**
 * This defines how a LootTablePool is stored in JSON files
 */
type LootTablePoolJsonDefinition = {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    rolls?: ChancyNumeric;
    nulls?: ChancyNumeric;
    entries: Array<LootTableEntryJsonDefinition>;
};
/**
 * This defines how a LootTableEntry is stored in JSON files
 */
type LootTableEntryJsonDefinition = {
    name?: string;
    id?: number | string;
    type?: string;
    stackable?: boolean;
    unique?: boolean;
    weight?: number;
    item?: any;
    qty?: ChancyNumeric;
    functions?: Array<FunctionDefinition>;
    conditions?: Array<ConditionDefinition>;
};
declare class RecursiveTableError extends Error {
}
interface SerializedTables {
    [VERSION_KEY]: string;
    tables: Record<string, LootTableJsonDefinition>;
}
type LoadSaveArgs = {
    defaultExtension?: string;
    path?: string;
};
type SaveTableArgs = LoadSaveArgs & {
    filename?: string;
    includeRng?: boolean;
    overwrite?: boolean;
};
/**
 * @todo detect recursively required tables
 * @example
 * import {UltraLoot} from "ultraloot";
 *
 * const ultralootDefaultRng = new UltraLoot();           // default RNG
 * const ultralootCustomRng = new UltraLoot("UL7R4L007"); // seeding the built in RNG
 * const ultralootCustomRng = new UltraLoot(rngSource);   // using a custom RNG
 */
declare class UltraLoot {
    private constructingTables;
    static version: string;
    version: string;
    /**
     * Default RNG source when none is given
     */
    protected defaultRng?: RngInterface;
    /**
     * RNG source given by the end user
     */
    protected rng?: RngInterface;
    /**
     * RNG Constructor for making new RNGs
     */
    protected rngConstructor?: RngConstructor;
    /**
     * Global functions that can be used by loot table entries.
     *
     * The keys in the object are the function identifier used in the table entries
     */
    protected functions: Record<string, LootTableFunctionSignature>;
    /**
     * Global conditions that can be used by loot table pools and entries.
     *
     * The keys in the object are the function identifier used in the table entries/pools
     */
    protected conditions: Record<string, LootTableConditionSignature>;
    /**
     * Whether to throw errors when functions are missing, otherwise just does console.error
     */
    throwOnMissingFunctions: boolean;
    /**
     * Whether to throw errors when conditions are missing, otherwise just does console.error
     */
    throwOnMissingConditions: boolean;
    constructor(rng?: Seed | RngInterface);
    registerDefaults(): this;
    registerDefaultFunctions(): this;
    registerDefaultConditions(): this;
    /**
     * As we dont expose the class as default, in browser it would be nice
     * if there was a way to create new instances. This can be done using
     * this function.
     */
    instance(rng?: Seed | RngInterface): UltraLoot;
    setRng(rng: RngInterface): void;
    getRng(): RngInterface;
    getDefaultRng(): RngInterface;
    setRngConstructor(rngConstructor: RngConstructor): void;
    getRngConstructor(): RngConstructor;
    isRng(rng?: any): rng is RngInterface;
    makeRng(rng?: Seed | RngInterface): RngInterface;
    registerFunction(name: string, fn: LootTableFunctionSignature): void;
    registerCondition(name: string, fn: LootTableConditionSignature): void;
    hasFunction(name: string): boolean;
    hasCondition(name: string): boolean;
    noThrowOnMissingFunctionsOrConditions(): this;
    throwOnMissingFunctionsOrConditions(): this;
    functionCheck(fn: FunctionDefinition): boolean;
    conditionCheck(cond: ConditionDefinition): boolean;
    applyFunctionSync(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): any;
    applyConditionSync(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): any;
    applyFunction(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    applyCondition(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<boolean>;
    /**
     * Create a loot table, with this ultraloot instance
     *
     * @example
     *
     * const ul = new UltraLoot('UL7R4L007');
     * const table = ul.createTable({name: 'Food'});
     *
     * table.addPool([
     *   {
     *     rolls: 1,
     *     name: 'Cakes'
     *     entries: [
     *       {id: 'chocolate_cake'},
     *       {id: 'fruit_cake'},
     *       {id: 'star_cake'}
     *     ]
     *   }
     * ]);
     */
    simulate(table: LootTable, options?: SimulationOptions): Promise<SimulationResult>;
    simulateSync(table: LootTable, options?: SimulationOptions): SimulationResult;
    validateTable(definition: unknown, options?: TableValidationOptions): TableValidationResult;
    createTable(def: LootTable | LootTableDefinition | LootTableEasyDefinition | LootTableJsonDefinition): LootTable;
    /**
     * Create a loot pool for use in a loot table
     */
    createPool(def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootPool;
    /**
     * Create an entry for a loot pool, either with object definition or from a loot table
     */
    createEntry(def: LootTableEntryDefinition | LootTable): LootTableEntry;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isLootTableDefinition(def: any): def is LootTableDefinition;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isEasyLootTableDefinition(def: any): def is LootTableEasyDefinition;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isEasyLootTablePoolDefinition(def: any): def is LootTablePoolEasyDefinition;
    protected transformEasyToProperLootTableDefinition(def: LootTableEasyDefinition): LootTableDefinition;
    protected transformEasyToProperLootTablePoolDefinition(def: LootTablePoolEasyDefinition): LootTablePoolDefinition;
    protected pathJoin(parts: string[], sep?: string): string;
    protected finishWith(str: string, ending: string): string;
    protected finishWithExtension(str: string, extension: string): string;
    protected getExtension(str: string): string | null | undefined;
    /**
     * Serializes a LootTable ready for converting to text, e.g. JSON
     *
     * Returns a key value object, where the keys are the loot table filenames/ids
     *
     * @example
     * const result = await ultraloot.serialize(table);
     *
     * result = {
     *   kitchen_cupboard: {
     *     fn: 'kitchen_cupboard',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             type: 'table',
     *             item: 'vegetables'
     *           },
     *           {
     *             type: 'table',
     *             item: 'fruit'
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   fruit_bowl: {
     *     fn: 'fruit_bowl',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             type: 'table',
     *             item: 'fruit'
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   vegetables: {
     *     fn: 'vegetables',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             id: 'carrot'
     *           },
     *           {
     *             id: 'cabbage'
     *           },
     *         ]
     *       }
     *     ]
     *   },
     *   fruit: {
     *     fn: 'fruit',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             id: 'apple'
     *           },
     *           {
     *             id: 'pear'
     *           },
     *         ]
     *       }
     *     ]
     *   }
     * }
     */
    serialize(table: LootTable, { includeRng, key, had }?: {
        includeRng?: boolean;
        key?: string | number;
        had?: Set<any>;
    }): SerializedTables;
    /**
     * Convert a LootTable to JSON
     * @param  {LootTable}       table               The table to serialize
     * @param  {Object}          options             Options
     * @param  {boolean}         options.includeRng  Whether to include the RNG seed in the serialized tables
     * @return {Promise<string>}                     The resulting LootTable representation in a JSON string
     */
    toJson(table: LootTable, { includeRng }?: {
        includeRng?: boolean;
    }): string;
    /** Save a complete graph as JSON. An explicit destination directory is required. */
    saveTable(table: LootTable, { path, filename, defaultExtension, includeRng, overwrite }?: SaveTableArgs): Promise<string>;
    private location;
    private directory;
    private readDefinition;
    private loadTableInternal;
    /** Load a single definition. Explicit path is shared by all nested references. */
    loadTable(filename: string, options?: LoadSaveArgs): Promise<LootTable>;
    loadTableFromFile(filename: string, options?: LoadSaveArgs): Promise<LootTable>;
    loadTableFromUrl(url: string, options?: LoadSaveArgs): Promise<LootTable>;
    /** Load a serialized graph, including files written by saveTable. */
    loadTables(filename: string, options?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    loadTablesFromFile(filename: string, options?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    loadTablesFromUrl(url: string, options?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    private resolveDefinition;
    resolveTable(table: LootTableJsonDefinition, options?: LoadSaveArgs): Promise<LootTable>;
    /**
     * Unserializes tables serialized with the "serialize" function
     * @param  {Record<string, LootTableJsonDefinition>} tables Record of tables serialized using the "serialize" function
     * @return {Promise<Record<string, LootTable>>}             A key/value pairing of tables
     */
    unserialize(tables: SerializedTables): Record<string, LootTable>;
}

type CallbackRegistry = Record<string, any>;
type ExecutionMode = 'sync' | 'async';
type TypedCallbackDefinition<Args extends CallbackRegistry> = {
    [Name in keyof Args & string]: {
        function: Name;
    } & (undefined extends Args[Name] ? {
        args?: Args[Name];
    } : {
        args: Args[Name];
    });
}[keyof Args & string];
interface TypedCallbackContext<Item, Looter, Context, Args> {
    rng: RngInterface;
    looted: LootTableEntryResult<Item>;
    looter: Looter;
    context: Context;
    result: LootTableEntryResults<Item>;
    args: Args;
}
type TypedModifier<Item, Looter, Context, Args, Execution extends ExecutionMode> = (value: TypedCallbackContext<Item, Looter, Context, Args>) => Execution extends 'sync' ? undefined : void | Promise<void>;
type TypedCondition<Item, Looter, Context, Args, Execution extends ExecutionMode> = (value: Omit<TypedCallbackContext<Item, Looter, Context, Args>, 'looted'>) => Execution extends 'sync' ? boolean : boolean | Promise<boolean>;
type TypedEntry<Item, Functions extends CallbackRegistry, Conditions extends CallbackRegistry> = Omit<LootTableEntryDefinition, 'item' | 'functions' | 'conditions'> & {
    item?: Item;
    functions?: Array<TypedCallbackDefinition<Functions>>;
    conditions?: Array<TypedCallbackDefinition<Conditions>>;
};
interface TypedTableDefinition<Item, Functions extends CallbackRegistry, Conditions extends CallbackRegistry> {
    id?: string;
    name?: string;
    rng?: Seed | RngInterface;
    pools?: Array<{
        id?: string;
        name?: string;
        rolls?: ChancyNumeric;
        nulls?: ChancyNumeric;
        template?: Partial<TypedEntry<Item, Functions, Conditions>>;
        entries?: Array<TypedEntry<Item, Functions, Conditions>>;
        functions?: Array<TypedCallbackDefinition<Functions>>;
        conditions?: Array<TypedCallbackDefinition<Conditions>>;
    }>;
}
interface TypedRollOptions<Looter, Context> {
    trace?: RollTraceSink;
    looter: Looter;
    context: Context;
    rng?: RngInterface;
    n?: ChancyNumeric;
}
/** An opt-in typed boundary over the existing extensible loot engine. */
declare class TypedLootTable<Item, Looter, Context, Functions extends CallbackRegistry, Conditions extends CallbackRegistry, Execution extends ExecutionMode> {
    readonly raw: LootTable;
    readonly mode: Execution;
    constructor(raw: LootTable, mode: Execution);
    registerFunction<Name extends keyof Functions & string>(name: Name, fn: TypedModifier<Item, Looter, Context, Functions[Name], Execution>): this;
    registerCondition<Name extends keyof Conditions & string>(name: Name, fn: TypedCondition<Item, Looter, Context, Conditions[Name], Execution>): this;
    roll(options: TypedRollOptions<Looter, Context>): Promise<LootTableEntryResults<Item>>;
    rollSync(this: TypedLootTable<Item, Looter, Context, Functions, Conditions, 'sync'>, options: TypedRollOptions<Looter, Context>): LootTableEntryResults<Item>;
}
declare class TypedUltraLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry, Execution extends ExecutionMode = 'sync'> {
    readonly mode: Execution;
    readonly raw: UltraLoot;
    constructor(mode: Execution, seed?: Seed | RngInterface);
    registerFunction<Name extends keyof Functions & string>(name: Name, fn: TypedModifier<Item, Looter, Context, Functions[Name], Execution>): this;
    registerCondition<Name extends keyof Conditions & string>(name: Name, fn: TypedCondition<Item, Looter, Context, Conditions[Name], Execution>): this;
    createTable(definition: TypedTableDefinition<Item, Functions, Conditions>): TypedLootTable<Item, Looter, Context, Functions, Conditions, Execution>;
}
declare function createSyncLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry>(seed?: Seed | RngInterface): TypedUltraLoot<Item, Looter, Context, Functions, Conditions, 'sync'>;
declare function createAsyncLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry>(seed?: Seed | RngInterface): TypedUltraLoot<Item, Looter, Context, Functions, Conditions, 'async'>;

/**
 * @category Number Validator
 */
declare class NumberValidationError extends Error {
}
/**
 * @category Number Validator
 */
declare class ArrayNumberValidator {
    #private;
    /**
     * Descriptive name for this validation
     */
    name: string;
    constructor(numbers: number[], name?: string);
    get numbers(): number[];
    set numbers(numbers: number[]);
    /**
     * Specify the numbers to validate
     */
    all(numbers: number[]): this;
    /**
     * Specify the numbers to validate
     */
    validate(numbers: number | number[]): this | NumberValidator;
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potatoes = [0, 1];
     * validate(potatoes).varname('potatoes').gt(2); // "Expected every component of potatoes to be > 2, got 0"
     */
    varname(name: string): this;
    /**
     * Get the sum of our numbers
     */
    sum(): number;
    /**
     * Validates whether the total of all of our numbers is close to sum, with a maximum difference of diff
     * @param sum The sum
     * @param diff The maximum difference
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not sum close to the correct amount
     */
    sumcloseto(sum: number, diff?: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is equal (===) to sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to the correct amount
     */
    sumto(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is < sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to < sum
     */
    sumtolt(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is > sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to > sum
     */
    sumtogt(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is <= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to <= sum
     */
    sumtolteq(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is >= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to >= sum
     */
    sumtogteq(sum: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all integers
     */
    int(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all positive
     */
    positive(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all negative
     */
    negative(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all between from and to
     */
    between(from: number, to: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all between or equal to from and to
     */
    betweenEq(from: number, to: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all > n
     */
    gt(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all >= n
     */
    gteq(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all < n
     */
    lt(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all <= n
     */
    lteq(n: number, msg?: string): this;
}
/**
 * Validate numbers in a fluent fashion.
 *
 * Each validator method accepts a message as the last parameter
 * for customising the error message.
 *
 * @category Number Validator
 *
 * @example
 * const n = new NumberValidator();
 * n.validate(0).gt(1); // NumberValidationError
 *
 * @example
 * const n = new NumberValidator();
 * const probability = -0.1;
 * n.validate(probability).gteq(0, 'Probabilities should always be >= 0'); // NumberValidationError('Probabilities should always be >= 0').
 */
declare class NumberValidator {
    #private;
    /**
     * The name of the variable being validated - shows up in error messages.
     */
    name: string;
    constructor(number?: number, name?: string);
    get number(): number | undefined;
    set number(number: number | undefined);
    /**
     * Returns an ArrayNumberValidator for all the numbers
     */
    all(numbers: number[], name?: string): ArrayNumberValidator;
    assertNumber(num?: number): num is number;
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potato = 1;
     * validate(potato).varname('potato').gt(2); // "Expected potato to be greater than 2, got 1"
     * @param {string} name [description]
     */
    varname(name: string): this;
    /**
     * Specify the number to be validated
     */
    validate(number: number | number[]): ArrayNumberValidator | this;
    /**
     * Asserts that the number is an integer
     * @throws {@link NumberValidationError} if ths number is not an integer
     */
    int(msg?: string): this;
    /**
     * Asserts that the number is > 0
     * @throws {@link NumberValidationError} if the number is not positive
     */
    positive(msg?: string): this;
    /**
     * Asserts that the number is < 0
     * @throws {@link NumberValidationError} if the number is not negative
     */
    negative(msg?: string): this;
    /**
     * Asserts that the from < number < to
     * @throws {@link NumberValidationError} if it is outside or equal to those bounds
     */
    between(from: number, to: number, msg?: string): this;
    /**
     * Asserts that the from <= number <= to
     * @throws {@link NumberValidationError} if it is outside those bounds
     */
    betweenEq(from: number, to: number, msg?: string): this;
    /**
     * Asserts that number > n
     * @throws {@link NumberValidationError} if it is less than or equal to n
     */
    gt(n: number, msg?: string): this;
    /**
     * Asserts that number >= n
     * @throws {@link NumberValidationError} if it is less than n
     */
    gteq(n: number, msg?: string): this;
    /**
     * Asserts that number < n
     * @throws {@link NumberValidationError} if it is greater than or equal to n
     */
    lt(n: number, msg?: string): this;
    /**
     * Asserts that number <= n
     * @throws {@link NumberValidationError} if it is greater than n
     */
    lteq(n: number, msg?: string): this;
}

/**
 *
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 *
 * You can set an array of results that will be returned from called to _next()
 *
 * Note: To avoid unexpected results when using this in place of regular Rng, it is
 * only allowed to make the results spread from [0, 1)
 *
 * The numbers are returned and cycled, so once you reach the end of the list, it will
 * just keep on going.
 *
 * @category Other Rngs
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0];
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0, 0.5];
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.0
 *
 * @example
 * // The setEvenSpread and evenSpread methods can be used to generate
 * // n numbers between [0, 1) with even gaps between
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.setEvenSpread(11);
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.5
 * prng.random(); // 0.6
 * prng.random(); // 0.7
 * prng.random(); // 0.8
 * prng.random(); // 0.9
 * prng.random(); // 0.9999999...
 * prng.random(); // 0.0
 */
declare class PredictableRng extends RngAbstract implements RngInterface, RngDistributionsInterface {
    counter: number;
    protected _results: number[];
    constructor(seed?: Seed, results?: number[]);
    get results(): number[];
    set results(results: number[]);
    evenSpread(n: number): number[];
    setEvenSpread(n: number): this;
    sameAs(other: any): boolean;
    reset(): this;
    protected _next(): number;
}

type LootTableEntries = Record<string, LootTable>;
/**
 * Example implementation of a loot table manager.
 */
declare class LootTableManager {
    tables: LootTableEntries;
    constructor(tables?: LootTableEntries);
    addTables(tables: LootTableEntries | Array<LootTable>): this;
    addTable(name: LootTable | string, table?: LootTable | string): this;
    getTable(name: string): LootTable;
}

export { ArrayNumberValidator, LootTable, LootTableEntry, LootTableEntryResult, LootTableEntryResults, LootTableManager, LootPool as LootTablePool, MaxRecursionsError, NonRandomRandomError, NumberValidationError, NumberValidator, PredictableRng, RecursiveTableError, Rng, RngAbstract, TypedLootTable, TypedUltraLoot, UltraLoot, createAsyncLoot, createSyncLoot, UltraLoot as default, simulateTable, simulateTableSync, validateTable };
export type { CallbackRegistry, Chancy, ChancyInterface, ChancyNumeric, ConditionDefinition, DiceInterface, DiceReturnInterface, Distribution, ExecutionMode, FunctionDefinition, ItemStatistics, LoadSaveArgs, LootTableConditionSignature, LootTableDefinition, LootTableEasyDefinition, LootTableEntries, LootTableEntryDefinition, LootTableEntryJsonDefinition, LootTableFunctionSignature, LootTableJsonDefinition, LootTablePoolDefinition, LootTablePoolEasyDefinition, LootTablePoolJsonDefinition, Randfunc, RngConstructor, RngDistributionsInterface, RngInterface, RollTraceEvent, RollTraceSink, SaveTableArgs, Seed, SerializedRng, SerializedTables, SimulationOptions, SimulationResult, TablePoolRollInterface, TableRollInterface, TableValidationIssue, TableValidationOptions, TableValidationResult, TypedCallbackContext, TypedCallbackDefinition, TypedCondition, TypedEntry, TypedModifier, TypedRollOptions, TypedTableDefinition };
