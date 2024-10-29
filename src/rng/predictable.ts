import { RngAbstract } from './../rng';
import {
  RngDistributionsInterface,
  RngInterface,
  Seed
} from './interface';

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

  public sameAs (other : any) : boolean {
    if (other instanceof PredictableRng) {
      return this.results.join(',') === other.results.join(',') &&
        this.counter === other.counter &&
        this.getRandomSource() === other.getRandomSource()
      ;
    }
    return false;
  }

  public reset () {
    this.counter = 0;
    return this;
  }

  protected _next () : number {
    return this.results[this.counter++ % this.results.length];
  }
}
