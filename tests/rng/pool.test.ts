import { PoolEmptyError, PoolNotEnoughElementsError } from './../../src/rng/pool';
import Rng from './../../src/rng';
import Pool from './../../src/rng/pool';

describe('Testing Pools', () => {
  test.concurrent('Basic test', () => {
    const pool = new Pool(['a', 'b', 'c', 'd']);
    pool.draw();
    pool.draw();
    pool.draw();
    pool.draw();
    expect(() => pool.draw()).toThrow(PoolEmptyError);
  });

  test.concurrent('setEntries, .entries and getEntries', () => {
    const pool = new Pool();
    pool.setEntries(['a', 'b', 'c', 'd']);
    expect(pool.entries).toContainEqual('a');
    expect(pool.getEntries()).toContainEqual('b');
    expect(pool.getEntries()).toContainEqual('c');
    expect(pool.getEntries()).toContainEqual('d');
  });

  test.concurrent('setRng', () => {
    const pool = new Pool();
    const rng = new Rng();
    pool.setRng(rng);
    expect(pool.getRng()).toBe(rng);
  });

  test.concurrent('Basic test, correct order', () => {
    const rng = new Rng();
    // This sort or relies on knowing how pool implements
    // random numbers - but we can test it
    rng.randomSource(() => 0);
    const pool = rng.pool(['a', 'b', 'c', 'd']);

    expect(pool.draw()).toBe('a');
    expect(pool.draw()).toBe('b');
    expect(pool.draw()).toBe('c');
    expect(pool.draw()).toBe('d');
    expect(() => pool.draw()).toThrow(PoolEmptyError);

    rng.randomSource();
  });

  test.concurrent('Test original array is not modified', () => {
    const rng = new Rng();
    const src = ['a', 'b', 'c', 'd'];
    const pool = rng.pool(src);

    for (let i = 0; i < 4; i++) {
      pool.draw();
    }

    expect(() => pool.draw()).toThrow(PoolEmptyError);
    expect(src.length).toBe(4);
  });

  test.concurrent('Test everything drawn is from original array', () => {
    const rng = new Rng();
    const src = ['a', 'b', 'c', 'd'];
    const pool = rng.pool(src);

    for (let i = 0; i < 4; i++) {
      expect(src).toContain(pool.draw());
    }

    expect(() => pool.draw()).toThrow(PoolEmptyError);
  });

  test.concurrent('Test with repeated entries', () => {
    const rng = new Rng();
    const src = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'];
    const pool = rng.pool(src);

    for (let i = 0; i < 8; i++) {
      expect(src).toContain(pool.draw());
    }

    expect(() => pool.draw()).toThrow(PoolEmptyError);
  });

  test.concurrent('Test with mixed entry types', () => {
    const rng = new Rng();
    const src = ['a', 1, 1.2, 0.1, -1, {}, new Set(), Symbol('foo'), ['another array']];
    const pool = rng.pool(src);

    for (let i = 0; i < src.length; i++) {
      expect(src).toContain(pool.draw());
    }

    expect(() => pool.draw()).toThrow(PoolEmptyError);
  });

  test.concurrent('Drawing multiple', () => {
    const rng = new Rng();
    const pool = rng.pool(['a', 'b', 'c', 'd']);

    expect(pool.drawMany(2)).toHaveLength(2);
    expect(pool.drawMany(2)).toHaveLength(2);
    expect(() => pool.drawMany(2)).toThrow(PoolEmptyError);
  });

  test.concurrent('Drawing too many throws error', () => {
    const rng = new Rng();
    const pool = rng.pool(['a', 'b', 'c', 'd']);
    expect(() => pool.drawMany(5)).toThrow(PoolNotEnoughElementsError);
  });

  test.concurrent('Drawing < 0 throws', () => {
    const rng = new Rng();
    const pool = rng.pool(['a', 'b', 'c', 'd']);
    expect(() => pool.drawMany(-1)).toThrow();
  });

  test.concurrent('Returns correct length', () => {
    const rng = new Rng();
    const pool = rng.pool(['a', 'b', 'c', 'd']);
    expect(pool.length).toBe(4);
  });

  test.concurrent('isEmpty', () => {
    const rng = new Rng();
    const pool = rng.pool([]);
    expect(pool.isEmpty()).toBeTruthy();
  });

  test.concurrent('instantiates empty', () => {
    const rng = new Rng();
    const pool = rng.pool();
    expect(pool.isEmpty()).toBeTruthy();
  });

  test.concurrent('empty empties the pool', () => {
    const rng = new Rng();
    const pool = rng.pool(['a', 'b', 'c', 'd']);
    expect(pool.length).toBe(4);
    pool.empty();
    expect(pool.length).toBe(0);
    expect(pool.isEmpty()).toBeTruthy();
  });
});
