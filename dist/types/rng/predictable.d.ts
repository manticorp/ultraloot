import { RngAbstract, RngInterface, Seed } from './../rng';
/**
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 */
export default class Rng extends RngAbstract implements RngInterface {
    counter: number;
    protected _results: number[];
    constructor(seed?: Seed, results?: number[]);
    get results(): number[];
    set results(results: number[]);
    evenSpread(n: number): number[];
    setEvenSpread(n: number): this;
    sameAs(other: Rng): boolean;
    reset(): this;
    protected _random(): number;
}
