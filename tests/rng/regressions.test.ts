import Rng from '../../src/rng';
import PredictableRng from '../../src/rng/predictable';

describe('weighted choices', () => {
  const emptyWeights: Array<Record<string, number> | Map<string, number>> = [{}, { disabled: 0 }, { a: 0, b: 0 }, new Map(), new Map([['disabled', 0]])];
  test.each(emptyWeights)('zero total weight returns no choice: %p', weights => {
    expect(new Rng(123).weightedChoice(weights)).toBeNull();
  });

  test.each([-1, NaN, Infinity, -Infinity])('rejects invalid object and Map weights: %p', weight => {
    for (const weights of [{ disabled: weight }, new Map([['disabled', weight]])]) {
      expect(() => new Rng(123).weightedChoice(weights)).toThrow();
    }
  });

  test('ignores inherited weights and never selects zero weights at either boundary', () => {
    const rng = new PredictableRng(123, [0, 1 - Number.EPSILON]);
    const weights = Object.assign(Object.create({ inherited: 100 }), { first: 0, enabled: 1, last: 0 });
    expect(rng.weightedChoice(weights)).toBe('enabled');
    expect(rng.weightedChoice(weights)).toBe('enabled');
    expect(rng.weightedChoice(new Map([['first', 0], ['enabled', 1], ['last', 0]]))).toBe('enabled');
  });

  test('large finite weights do not overflow the total', () => {
    const rng = new PredictableRng(123, [0, 0.75]);
    const weights = new Map([['a', Number.MAX_VALUE], ['b', Number.MAX_VALUE]]);
    expect(rng.weightedChoice(weights)).toBe('a');
    expect(rng.weightedChoice(weights)).toBe('b');
  });
});

function moments (sample: () => number, count = 30000) {
  let sum = 0;
  let squares = 0;
  for (let i = 0; i < count; i++) {
    const value = sample();
    expect(Number.isFinite(value)).toBe(true);
    sum += value;
    squares += value * value;
  }
  const mean = sum / count;
  return { mean, variance: squares / count - mean * mean };
}

describe('distribution correctness', () => {
  test.each([0.2, 0.5, 1, 2])('Gamma handles shape %p with the expected mean', shape => {
    const rng = new Rng(12345);
    const result = moments(() => rng.gamma({ shape, rate: 2 }));
    expect(Math.abs(result.mean - shape / 2)).toBeLessThan(0.025);
    expect(Math.abs(result.variance - shape / 4)).toBeLessThan(0.04);
  });

  test('Gamma rate and scale are reciprocal for identical seeds', () => {
    const base = new Rng(12345).gamma({ shape: 2 });
    expect(new Rng(12345).gamma({ shape: 2, rate: 2 })).toBeCloseTo(base / 2, 12);
    expect(new Rng(12345).gamma({ shape: 2, scale: 2 })).toBeCloseTo(base * 2, 12);
  });

  test.each([0, -1, NaN, Infinity])('Gamma rejects invalid parameters: %p', value => {
    const rng = new Rng(12345);
    expect(() => rng.gamma({ shape: value })).toThrow();
    expect(() => rng.gamma({ rate: value })).toThrow();
    expect(() => rng.gamma({ scale: value })).toThrow();
  });

  test('fractional Beta has the expected variance and asymmetric mean', () => {
    const rng = new Rng(12345);
    const symmetric = moments(() => rng.beta({ alpha: 0.5, beta: 0.5 }));
    expect(Math.abs(symmetric.mean - 0.5)).toBeLessThan(0.015);
    expect(Math.abs(symmetric.variance - 0.125)).toBeLessThan(0.008);
    expect(Math.abs(moments(() => rng.beta({ alpha: 0.2, beta: 0.8 })).mean - 0.2)).toBeLessThan(0.015);
  });

  test('Beta-binomial uses the requested Beta mixing distribution', () => {
    const rng = new Rng(12345);
    const result = moments(() => rng.betaBinomial({ alpha: 2, beta: 5, n: 10 }));
    expect(Math.abs(result.mean - 20 / 7)).toBeLessThan(0.06);
    expect(Math.abs(result.variance - 1700 / 392)).toBeLessThan(0.15);
  });

  test('Wigner semicircle has variance R squared over four', () => {
    const rng = new Rng(12345);
    const result = moments(() => rng.wignerSemicircle(2));
    expect(Math.abs(result.mean)).toBeLessThan(0.03);
    expect(Math.abs(result.variance - 1)).toBeLessThan(0.04);
  });

  test('Student t remains correctly scaled after fixing Gamma', () => {
    const rng = new Rng(12345);
    const result = moments(() => rng.studentsT(8));
    expect(Math.abs(result.mean)).toBeLessThan(0.035);
    expect(Math.abs(result.variance - 8 / 6)).toBeLessThan(0.1);
  });
});

// This sequence predates the sampling corrections and must remain stable.
test('uniform engine keeps its established seeded sequence', () => {
  const rng = new Rng(123);
  expect(Array.from({ length: 5 }, () => rng.random())).toEqual([0.23280003294348717, 0.7731058078352362, 0.393878421979025, 0.6992767751216888, 0.30870480556041]);
  expect(rng.serialize().samplingVersion).toBe(2);
});
