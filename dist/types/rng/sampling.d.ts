/** Dependency-free sampling algorithms embedded in UltraLoot at build time. */
export declare const SAMPLING_VERSION = 2;
/** Marsaglia–Tsang sampling, with shape boosting below one, in log space. */
export declare function gammaLog(random: () => number, normal: () => number, shape: number): number;
export declare function betaSample(random: () => number, normal: () => number, alpha: number, beta: number): number;
export declare function semicircleSample(random: () => number, radius: number): number;
export declare function weightedChoice<T>(entries: Array<[T, number]>, random: () => number): T | null;
