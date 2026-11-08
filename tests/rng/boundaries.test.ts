import fc from 'fast-check';
import Queue from '../../src/rng/queue';
import Rng from '../../src/rng';
import PredictableRng from '../../src/rng/predictable';

const options = { seed: 20261108, numRuns: 200 };
test('a bounded queue always retains the newest values', () => {
  fc.assert(fc.property(fc.integer({ min: 1, max: 30 }), fc.array(fc.integer(), { maxLength: 200 }), (size, values) => {
    const queue = new Queue<number>(size);
    values.forEach(value => queue.push(value));
    expect(queue.elements).toEqual(values.slice(-size));
  }), options);
});
test('invalid draw counts are rejected without changing the pool', () => {
  fc.assert(fc.property(fc.double().filter(value => !Number.isSafeInteger(value) || value < 0), count => {
    const pool = new Rng(123).pool([1, 2, 3]);
    expect(() => pool.drawMany(count)).toThrow();
    expect(pool.entries).toEqual([1, 2, 3]);
  }), options);
});
test('predictable values must be finite and isolated from the input array', () => {
  for (const value of [NaN, Infinity, -Infinity]) expect(() => { new PredictableRng().results = [value]; }).toThrow();
  fc.assert(fc.property(fc.array(fc.double({ min: 0, max: 0.999999, noNaN: true }), { minLength: 1, maxLength: 30 }), values => {
    const expected = [...values];
    const rng = new PredictableRng(123, values);
    values[0] = NaN;
    expect(Array.from({ length: expected.length }, () => rng.random())).toEqual(expected);
  }), options);
});
test('zero weights are never selected for generated tables', () => {
  fc.assert(fc.property(fc.array(fc.integer({ min: 0, max: 100 }), { minLength: 1, maxLength: 30 }), weights => {
    const rng = new Rng(123);
    const selected = rng.weightedChoice(new Map(weights.map((weight, index) => [index, weight])));
    if (weights.every(value => value === 0)) expect(selected).toBeNull();
    else expect(weights[selected]).toBeGreaterThan(0);
  }), options);
});

test('non-finite seeds are rejected and predictable snapshots cannot poison the generator', () => {
  for (const seed of [NaN, Infinity, -Infinity]) expect(() => new Rng(seed)).toThrow();
  const rng = new PredictableRng(123, [0.25]);
  rng.results[0] = NaN;
  expect(rng.random()).toBe(0.25);
});
