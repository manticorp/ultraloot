import { default as Rng } from './../../src/rng';
import { RngInterface, RngDistributionsInterface, ChancyInterface } from './../../src/rng/interface';
import { default as PredictableRng } from './../../src/rng/predictable';

const defaultResultSet = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
const smruns = 100;
const mdruns = 1000;
const lgruns = 10000;

describe('Testing Chancy Specifically', () => {
  let rng: Rng;
  let prng: PredictableRng;

  beforeEach(() => {
    rng = new Rng();
    prng = new PredictableRng();
  });

  describe('Basic functionality tests', () => {
    test('should handle array input correctly', () => {
      const input = [1, 2, 3, 4, 5];
      jest.spyOn(rng, 'choice').mockReturnValue(3);
      const result = rng.chancy(input);
      expect(result).toBe(3);
      expect(rng.choice).toHaveBeenCalledWith(input);
    });

    test('should handle string input correctly', () => {
      const input = '3d6';
      jest.spyOn(rng, 'dice').mockReturnValue(10);
      const result = rng.chancy(input);
      expect(result).toBe(10);
      expect(rng.dice).toHaveBeenCalledWith(input);
    });

    test('should handle integer input correctly', () => {
      const input = { type: 'int', min: 1, max: 10 } as const;
      jest.spyOn(rng, 'randInt').mockReturnValue(7);
      const result = rng.chancy(input);
      expect(result).toBe(7);
      expect(rng.randInt).toHaveBeenCalledWith(1, 10, undefined);
    });

    test('should handle random input correctly', () => {
      const input = { type: 'random', min: 0, max: 1 } as const;
      jest.spyOn(rng, 'random').mockReturnValue(0.5);
      const result = rng.chancy(input);
      expect(result).toBe(0.5);
      expect(rng.random).toHaveBeenCalledWith(0, 1, undefined);
    });

    test('should handle skew input correctly', () => {
      const input = { type: 'random', min: 0, max: 1, skew: 0.5 } as const;
      jest.spyOn(rng, 'random').mockReturnValue(0.7);
      const result = rng.chancy(input);
      expect(result).toBe(0.7);
      expect(rng.random).toHaveBeenCalledWith(0, 1, 0.5);
    });

    test('should handle various distributions', () => {
      const distributions = [
        { type: 'normal', mean: 0, stddev: 1 },
        { type: 'gamma', shape: 2, rate: 1 },
        { type: 'exponential', rate: 1 },
        { type: 'beta', alpha: 2, beta: 2 }
      ] as const;

      distributions.forEach(dist => {
        const methodName = dist.type as keyof (RngInterface & RngDistributionsInterface);
        jest.spyOn(rng, methodName).mockReturnValue(1);
        const result = rng.chancy(dist);
        expect(result).toBe(1);
        expect(rng[methodName]).toHaveBeenCalledWith(dist);
      });
    });

    test('should handle number input correctly', () => {
      const input = 5;
      const result = rng.chancy(input);
      expect(result).toBe(5);
    });

    test('should throw error for invalid input', () => {
      const input = { type: 'invalid_type' };
      // @ts-ignore
      expect(() => rng.chancy(input)).toThrow('Invalid input type given to chancy: "invalid_type".');
    });

    test('should respect maximum recursion depth', () => {
      const input : ChancyInterface = { type: 'random', min: 10, max: 20 };
      // @ts-ignore
      jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockReturnValue(true);
      expect(() => rng.chancy(input, 1000)).toThrow();
    });

    test('should handle specific distributions correctly', () => {
      const inputNormal = { type: 'normal', mean: 0, stddev: 1 } as const;
      jest.spyOn(rng, 'normal').mockReturnValue(1);
      const resultNormal = rng.chancy(inputNormal);
      expect(resultNormal).toBe(1);
      expect(rng.normal).toHaveBeenCalledWith(inputNormal);

      const inputGamma = { type: 'gamma', shape: 2, rate: 1 } as const;
      jest.spyOn(rng, 'gamma').mockReturnValue(3);
      const resultGamma = rng.chancy(inputGamma);
      expect(resultGamma).toBe(3);
      expect(rng.gamma).toHaveBeenCalledWith(inputGamma);
    });
  });

  test('Number just returns that number', () => {
    expect(rng.chancy(1)).toBe(1);
    expect(rng.chancy(-1)).toBe(-1);
  }, 100);

  test('min and max always within bounds', () => {
    const minMaxes = [
      [-5, 5],
      [0, 1],
      [100, 200],
      [-10, -5]
    ];
    for (const [min, max] of minMaxes) {
      for (let i = 0; i < mdruns; i++) {
        const r = rng.chancy({ min, max });
        expect(r).toBeGreaterThanOrEqual(min);
        expect(r).toBeLessThan(max);
      }
    }
  }, 5000);

  test('chancyInt', () => {
    const r1 = rng.chancyInt(5.5);
    expect(Number.isInteger(r1)).toBeTruthy();

    const r2 = rng.chancyInt(5);
    expect(r2).toBe(5);
    expect(Number.isInteger(r2)).toBeTruthy();

    const r3 = rng.chancyInt('2d6');
    expect(Number.isInteger(r3)).toBeTruthy();

    const r4 = rng.chancyInt({ min: 1, max: 3 });
    expect(Number.isInteger(r4)).toBeTruthy();
  }, 100);

  test('chancyInt - with array always produces ints', () => {
    expect(Number.isInteger(rng.chancyInt([1.1, 2.2, 3.3]))).toBeTruthy();
    expect(Number.isInteger(rng.chancyInt([-5.5, -10.10, -11.11]))).toBeTruthy();
    expect(rng.chancyInt([1])).toBe(1);
    expect(rng.chancyInt([2.2])).toBe(2);
    expect(rng.chancyInt([2.7])).toBe(3);
    expect(rng.chancyInt([0o777])).toBe(511);
    expect(rng.chancyInt([0XA])).toBe(10);
    expect(rng.chancyInt([Number.MAX_SAFE_INTEGER])).toBe(Number.MAX_SAFE_INTEGER);
    expect(rng.chancyInt([Number.EPSILON])).toBe(0);
    expect(rng.chancyInt([Number.POSITIVE_INFINITY])).toBe(Number.POSITIVE_INFINITY);
    expect(rng.chancyInt([Number.NEGATIVE_INFINITY])).toBe(Number.NEGATIVE_INFINITY);
    expect(rng.chancyInt([0b01010])).toBe(10);
    expect(rng.chancyInt([0b10000000000000000000000000000000])).toBe(2_147_483_648);

    expect(rng.chancyInt(['1'])).toBe(1);
    expect(rng.chancyInt(['2.2'])).toBe(2);
    expect(rng.chancyInt(['2.7'])).toBe(3);
    expect(rng.chancyInt(['512e-2'])).toBe(5);
    expect(rng.chancyInt(['592e-2'])).toBe(6);
  }, 100);

  test('chancyInt - with array of non-numbers throws', () => {
    expect(() => rng.chancyInt(['a'])).toThrow();
    expect(() => rng.chancyInt([1, 2, 3, 'a'])).toThrow();
    expect(() => rng.chancyInt(['Number.MAX_VALUE'])).toThrow();
  }, 100);

  test('choice', () => {
    const from = ['a', 'b', 'c'];
    prng.results = [0];

    expect(prng.chancy(from)).toBe('a');

    const r = rng.chancy(from);
    expect(from.includes(r)).toBeTruthy();
    expect(['d', 'e', 'f'].includes(rng.chancy(['d', 'e', 'f']))).toBeTruthy();
  }, 100);

  test('choice - invalid args produces invalid results', () => {
    const from = ['a', 'b', 'c'];
    expect(() => rng.chancyMax(from)).toThrow();
    expect(() => rng.chancyMin(from)).toThrow();
  }, 100);

  test('chancy - basic usage', () => {
    prng.results = defaultResultSet;
    expect(prng.chancy(5)).toBe(5);
    expect(prng.chancy({ min: 0, max: 10 })).toBe(0);
    expect(prng.chancy({ min: 0, max: 10 })).toBe(1);
    expect(prng.chancy({ min: 0, max: 1 })).toBe(0.2);
  }, 100);

  test('chancy - type int / integer', () => {
    prng.results = [0.5];
    expect(prng.chancy({ type: 'int', min: 0, max: 10 })).toBe(5);
    expect(prng.chancy({ type: 'integer', min: 0, max: 10 })).toBe(5);
  }, 100);

  test('chancy - random / int / integer with min but no max produces results', () => {
    prng.results = [0.5];
    expect(prng.chancy({ type: 'random', min: 0 })).toMatchInlineSnapshot('4503599627370495.5');
    expect(prng.chancy({ type: 'int', min: 0 })).toMatchInlineSnapshot('4503599627370496');
    expect(prng.chancy({ type: 'integer', min: 0 })).toMatchInlineSnapshot('4503599627370496');

    expect(rng.chancy({ type: 'random', min: 10 })).toBeGreaterThanOrEqual(10);
    expect(rng.chancy({ type: 'int', min: 10 })).toBeGreaterThanOrEqual(10);
    expect(rng.chancy({ type: 'integer', min: 10 })).toBeGreaterThanOrEqual(10);
  }, 100);

  test('chancy - normal', () => {
    const results = [];
    const mean = 0.5;
    for (let i = 0; i < 100000; i++) {
      results.push(rng.chancy({ min: 0, max: 1, type: 'normal' }));
    }
    const sum = results.reduce((a, b) => a + b);
    const calcMean = sum / results.length;

    expect(Math.abs(mean - calcMean)).toBeLessThan(0.003);

    expect(Math.max(...results)).toBeLessThan(0.9999);
    expect(Math.min(...results)).toBeGreaterThan(0.0001);
  }, 5000);

  test('chancy - normal_integer', () => {
    const results = [];
    const mean = 50;
    for (let i = 0; i < 100000; i++) {
      results.push(rng.chancy({ min: 0, max: 100, type: 'normal_integer' }));
    }
    const sum = results.reduce((a, b) => a + b);
    const calcMean = sum / results.length;

    expect(Math.abs(mean - calcMean)).toBeLessThan(1);
  }, 1000);

  const distributions = [
    'normal',
    'gaussian',
    'boxMuller',
    'irwinHall',
    'bates',
    'bernoulli',
    'exponential',
    'pareto',
    'poisson',
    'hypergeometric',
    'rademacher',
    'binomial',
    'betaBinomial',
    'beta',
    'gamma',
    'studentsT',
    'wignerSemicircle',
    'kumaraswamy',
    'hermite',
    'chiSquared',
    'rayleigh',
    'logNormal',
    'cauchy',
    'laplace',
    'logistic',
  ];

  test.each(distributions)('Test all chancy distributions', (type) => {
    expect(() => {
      // @ts-ignore
      rng.chancy({ type });
    }).not.toThrow();

    expect(() => {
      // @ts-ignore
      rng.chancyMin({ type });
    }).not.toThrow();

    expect(() => {
      // @ts-ignore
      rng.chancyMax({ type });
    }).not.toThrow();

    rng.randomSource(() => 0.1);
    // @ts-ignore
    expect(rng.chancy({ type })).toBe(rng[type]());
  }, 1000);

  test('chancy max', () => {
    expect(rng.chancyMax('1d6+2')).toBe(8);
    expect(Rng.chancyMax('1d6+2')).toBe(8);
    expect(Rng.chancyMax('2d6+2')).toBe(14);
    expect(Rng.chancyMax('2d6+5')).toBe(17);
    expect(Rng.chancyMax(5)).toBe(5);
    expect(Rng.chancyMax({ min: 0, max: 10 })).toBe(10);
    expect(Rng.chancyMax({})).toBe(1);
    expect(Rng.chancyMax({ type: 'random' })).toBe(1);
    expect(Rng.chancyMax({ type: 'integer' })).toBe(1);
    expect(Rng.chancyMax({ min: 0, type: 'integer' })).toBe(Number.MAX_SAFE_INTEGER);
    expect(Rng.chancyMax({ min: 0, type: 'random' })).toBe(Number.MAX_SAFE_INTEGER);
    expect(Rng.chancyMax({ min: 0, max: 10, type: 'integer' })).toBe(10);
    expect(Rng.chancyMax({ mean: 0.5, type: 'normal' })).toBe(Number.POSITIVE_INFINITY);
    expect(Rng.chancyMax({ mean: 0.5, type: 'normal_integer' })).toBe(Number.POSITIVE_INFINITY);
    expect(Rng.chancyMax({ mean: 0.5, max: 10, type: 'normal' })).toBe(10);
    expect(Rng.chancyMax([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
  }, 100);

  test('chancy min', () => {
    expect(rng.chancyMin('1d6+2')).toBe(3);
    expect(Rng.chancyMin('1d6+2')).toBe(3);
    expect(Rng.chancyMin('2d6+2')).toBe(4);
    expect(Rng.chancyMin('2d6+5')).toBe(7);
    expect(Rng.chancyMin(5)).toBe(5);
    expect(Rng.chancyMin({})).toBe(0);
    expect(Rng.chancyMin({ type: 'integer' })).toBe(0);
    expect(Rng.chancyMin({ min: 0 })).toBe(0);
    expect(Rng.chancyMin({ min: 0, max: 10 })).toBe(0);
    expect(Rng.chancyMin({ min: 5 })).toBe(5);
    expect(Rng.chancyMin({ min: 5, max: 10 })).toBe(5);
    expect(Rng.chancyMin({ min: 5, max: 10, type: 'integer' })).toBe(5);
    expect(Rng.chancyMin({ mean: 0.5, type: 'normal' })).toBe(Number.NEGATIVE_INFINITY);
    expect(Rng.chancyMin({ mean: 0.5, type: 'normal_integer' })).toBe(Number.NEGATIVE_INFINITY);
    expect(Rng.chancyMin({ mean: 0.5, max: 10, type: 'normal' })).toBe(Number.NEGATIVE_INFINITY);
    expect(Rng.chancyMin({ mean: 0.5, min: -10, type: 'normal' })).toBe(-10);
    expect(Rng.chancyMin([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(1);
  }, 100);

  test('chancy with invalid type throws', () => {
    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancy({ type: 'foobar' })).toThrow();
    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMin({ type: 'foobar' })).toThrow();
    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMax({ type: 'foobar' })).toThrow();
  }, 100);

  test('chancy with invalid input throws', () => {
    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancy()).toThrow();

    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancy(false)).toThrow();

    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMin()).toThrow();

    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMin(false)).toThrow();

    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMax()).toThrow();

    // @ts-ignore - we are deliberately passing nonsense
    expect(() => rng.chancyMax(false)).toThrow();
  }, 100);
});
