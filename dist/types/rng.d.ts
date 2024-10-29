import Pool from './rng/pool';
import { DiceInterface, Distribution, Chancy, ChancyNumeric, Seed, Randfunc, RngInterface, RngDistributionsInterface } from './rng/interface';
export interface SerializedRng {
    mask: number;
    seed: number;
    m_z: number;
}
export declare class MaxRecursionsError extends Error {
}
export declare class NonRandomRandomError extends Error {
}
/**
 * This abstract class implements most concrete implementations of
 * functions, as the only underlying changes are likely to be to the
 * uniform random number generation, and how that is handled.
 *
 * All the typedoc documentation for this has been sharded out to RngInterface
 * in a separate file.
 */
export declare abstract class RngAbstract implements RngInterface, RngDistributionsInterface {
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
export default Rng;
