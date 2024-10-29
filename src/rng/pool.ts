import { RngInterface } from './interface';
import Rng from './../rng';

/**
 * @category Pool
 */
export class PoolEmptyError extends Error {}

/**
 * @category Pool
 */
export class PoolNotEnoughElementsError extends Error {}

/**
 * Allows for randomly drawing from a pool of entries without replacement
 * @category Pool
 */
export default class Pool<EntryType> {
  rng: RngInterface;
  #entries: EntryType[] = [];
  constructor (entries: EntryType[] = [], rng?: RngInterface) {
    this.entries = entries;
    if (rng) {
      this.rng = rng;
    } else {
      this.rng = new Rng();
    }
  }

  private copyArray<EntryType>(arr: EntryType[]): EntryType[] {
    return Array.from(arr);
  }

  public setEntries (entries: EntryType[]): this {
    this.entries = entries;
    return this;
  }

  public getEntries (): EntryType[] {
    return this.#entries;
  }

  set entries (entries: EntryType[]) {
    this.#entries = this.copyArray(entries);
  }

  get entries (): EntryType[] {
    return this.#entries;
  }

  get length (): number {
    return this.#entries.length;
  }

  setRng (rng: RngInterface): this {
    this.rng = rng;
    return this;
  }

  getRng (): RngInterface {
    return this.rng;
  }

  add (entry: EntryType) {
    this.#entries.push(entry);
  }

  empty (): this {
    this.#entries = [];
    return this;
  }

  isEmpty (): boolean {
    return this.length <= 0;
  }

  /**
   * Draw an element from the pool, without replacement.
   *
   * @throws {@link PoolEmptyError} if the pool is empty
   */
  draw (): EntryType {
    if (this.length === 0) {
      throw new PoolEmptyError('No more elements left to draw from in pool.');
    }
    if (this.length === 1) {
      return this.#entries.splice(0, 1)[0];
    }
    const idx = this.rng.randInt(0, this.#entries.length - 1);
    return this.#entries.splice(idx, 1)[0];
  }

  /**
   * Draw n elements from the pool, without replacement.
   *
   * @throws {@link PoolEmptyError} if the pool is empty
   * @throws {@link PoolNotEnoughElementsError} if the pool does not have enough elements to draw n values
   */
  drawMany (n: number) : EntryType[] {
    if (n < 0) {
      throw new Error('Cannot draw < 0 elements from pool');
    }
    if (this.length === 0 && n > 0) {
      throw new PoolEmptyError('No more elements left to draw from in pool.');
    }
    if (this.length < n) {
      throw new PoolNotEnoughElementsError(`Tried to draw ${n} elements from pool with only ${this.length} entries.`);
    }
    const result: EntryType[] = [];
    for (let i = 0; i < n; i++) {
      const idx = this.rng.randInt(0, this.#entries.length - 1);
      result.push(this.#entries.splice(idx, 1)[0]);
    }
    return result;
  }
}
