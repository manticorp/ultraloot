import {
  RngAbstract,
  RngInterface,
  Seed
} from './../rng';

/**
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 */
export default class Rng extends RngAbstract implements RngInterface {
  public counter = 0;
  protected _results: number[] = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
  constructor (seed? : Seed, results?: number[]) {
    super(seed);
    if (results) {
      this.results = results;
    }
  }

  get results () {
    return this._results;
  }

  set results (results) {
    if (results.length <= 0) {
      throw new Error('Must provide some fake results.');
    }
    for (const r of results) {
      if (r < 0) {
        throw new Error(`Results must be greater than or equal to 0, got '${r}'`);
      }
      if (r >= 1) {
        throw new Error(`Results must be less than 1, got '${r}'`);
      }
    }
    this._results = results;
    this.reset();
  }

  public evenSpread (n : number) {
    const p = [];
    for (let i = 0; i < (n - 1); i++) {
      p.push(i / (n - 1));
    }
    p.push(1 - Number.EPSILON);
    return p;
  }

  public setEvenSpread (n : number) {
    this.results = this.evenSpread(n);
    return this;
  }

  public sameAs (other : Rng) : boolean {
    return this.results.sort().join(',') === other.results.sort().join(',') &&
    this.counter === other.counter;
  }

  public reset () {
    this.counter = 0;
    return this;
  }

  protected _random () : number {
    return this.results[this.counter++ % this.results.length];
  }
}
