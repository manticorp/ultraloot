export interface RandomInterface {
    random(): number;
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
    predictable(seed?: Seed): RngInterface;
    hashStr(str: string): string | number;
    convertStringToNumber(str: string): number;
    getSeed(): number;
    sameAs(other: RngInterface): boolean;
    seed(seed: Seed): this;
    percentage(): number;
    random(from?: number, to?: number, skew?: number): number;
    chance(n: number, chanceIn?: number): boolean;
    chanceTo(from: number, to: number): boolean;
    randInt(from?: number, to?: number, skew?: number): number;
    uniqid(prefix?: string, random?: boolean): string;
    uniqstr(len?: number): string;
    randBetween(from: number, to: number, skew: number): number;
    normal(args?: NormalArgs): number;
    chancyInt(input: Chancy, fn?: MathFunc): number;
    chancy(input: Chancy): number;
    choice(data: Array<any>): any;
    weightedChoice(data: Record<any, number> | Array<any> | Map<any, number>): any;
    dice(n: string | DiceInterface | number, d?: number, plus?: number): number;
    parseDiceString(string: string): DiceInterface;
    clamp(number: number, lower: number, upper: number): number;
    bin(val: number, bins: number, min: number, max: number): number;
    serialize(): any;
}
export interface RngConstructor {
    new (seed?: Seed): RngInterface;
    unserialize(rng: any): RngInterface;
    chancyMin(input: Chancy): number;
    chancyMax(input: Chancy): number;
    parseDiceString(string: string): DiceInterface;
    diceMin(n: string | DiceInterface | number, d?: number, plus?: number): number;
    diceMax(n: string | DiceInterface | number, d?: number, plus?: number): number;
}
export interface SerializedRng {
    mask: number;
    seed: number;
    m_z: number;
}
export type NormalArgs = {
    mean?: number;
    stddev?: number;
    max?: number;
    min?: number;
    skew?: number;
    skewtype?: string;
};
export declare abstract class RngAbstract implements RngInterface {
    #private;
    constructor(seed?: Seed);
    getSeed(): number;
    sameAs(other: RngAbstract): boolean;
    protected setSeed(seed?: Seed): this;
    seed(seed?: Seed): this;
    serialize(): any;
    static unserialize(serialized: SerializedRng): RngInterface;
    predictable(seed?: Seed): RngInterface;
    static predictable<T extends RngAbstract>(this: new (seed: Seed) => T, seed: Seed): T;
    hashStr(str: string): number;
    convertStringToNumber(str: string): number;
    protected _random(): number;
    percentage(): number;
    random(from?: number, to?: number, skew?: number): number;
    chance(n: number, chanceIn?: number): boolean;
    chanceTo(from: number, to: number): boolean;
    randInt(from?: number, to?: number, skew?: number): number;
    uniqid(prefix?: string, random?: boolean): string;
    uniqstr(len?: number): string;
    randBetween(from?: number, to?: number, skew?: number): number;
    scale(number: number, from: number, to: number, min?: number, max?: number): number;
    scaleNorm(number: number, from: number, to: number): number;
    shouldThrowOnMaxRecursionsReached(): boolean;
    normal({ mean, stddev, max, min, skew }?: NormalArgs, depth?: number): number;
    boxMuller(mean?: number, stddev?: number): number;
    chancyInt(input: Chancy): number;
    chancy(input: Chancy): number;
    static chancyMin(input: Chancy): number;
    static chancyMax(input: Chancy): number;
    choice(data: Array<any>): any;
    /**
     * data format:
     * {
     *   choice1: 1,
     *   choice2: 2,
     *   choice3: 3,
     * }
     */
    weightedChoice(data: Record<any, number> | Array<any> | Map<any, number>): any;
    protected static parseDiceArgs(n?: string | DiceInterface | number | number[], d?: number, plus?: number): DiceInterface;
    parseDiceArgs(n?: string | DiceInterface | number | number[], d?: number, plus?: number): DiceInterface;
    static parseDiceString(string: string): DiceInterface;
    static diceMax(n?: string | DiceInterface | number | number[], d?: number, plus?: number): number;
    static diceMin(n?: string | DiceInterface | number | number[], d?: number, plus?: number): number;
    dice(n?: string | DiceInterface | number | number[], d?: number, plus?: number): number;
    parseDiceString(string: string): DiceInterface;
    clamp(number: number, lower: number, upper: number): number;
    bin(val: number, bins: number, min: number, max: number): number;
}
export default class Rng extends RngAbstract implements RngInterface {
    #private;
    constructor(seed?: Seed);
    serialize(): any;
    sameAs(other: Rng): boolean;
    static unserialize(serialized: SerializedRng): Rng;
    seed(i?: Seed): this;
    protected _random(): number;
}
