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

