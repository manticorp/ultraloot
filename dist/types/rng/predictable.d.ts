import { RngAbstract } from './../rng';
import { RngDistributionsInterface, RngInterface, Seed } from './interface';
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
export default class PredictableRng extends RngAbstract implements RngInterface, RngDistributionsInterface {
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
