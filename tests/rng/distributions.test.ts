import { default as Rng } from './../../src/rng';
import { default as PredictableRng } from './../../src/rng/predictable';
import { NumberValidationError } from './../../src/number';
import { Distribution } from './../../src/rng/interface';

const defaultResultSet = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
const smruns = 100;
const mdruns = 1000;
const lgruns = 10000;

describe('Testing RNG Distributions specifically', () => {
  let rng: Rng;
  let prng: PredictableRng;

  beforeEach(() => {
    rng = new Rng(); // Replace with your actual constructor
    prng = new PredictableRng(); // Replace with your actual constructor
  });

  afterEach(() => {
    prng.reset();
  });

  describe('Basic functionality tests', () => {
    beforeEach(() => {
      rng = new Rng(); // Replace with your actual constructor
      prng = new PredictableRng(); // Replace with your actual constructor
    });

    afterEach(() => {
      prng.reset();
    });

    test('should generate a value from the Irwin-Hall distribution', () => {
      const result = rng.irwinHall({ n: 10 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Bates distribution', () => {
      const result = rng.bates({ n: 10 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Bates Gaussian distribution', () => {
      const result = rng.batesgaussian({ n: 10 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Bernoulli distribution', () => {
      const result = rng.bernoulli({ p: 0.5 });
      expect([0, 1]).toContain(result);
    });

    test('should generate a value from the Exponential distribution', () => {
      const result = rng.exponential({ rate: 1 });
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test('should generate a value from the Pareto distribution', () => {
      const result = rng.pareto({ shape: 1, scale: 1 });
      expect(result).toBeGreaterThanOrEqual(1);
    });

    test('should generate a value from the Poisson distribution', () => {
      const result = rng.poisson({ lambda: 2 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Hypergeometric distribution', () => {
      const result = rng.hypergeometric({ N: 100, K: 10, n: 10 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Rademacher distribution', () => {
      const result = rng.rademacher();
      expect([-1, 1]).toContain(result);
    });

    test('should generate a value from the Binomial distribution', () => {
      const result = rng.binomial({ n: 10, p: 0.5 });
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    });

    test('should generate a value from the Beta-Binomial distribution', () => {
      const result = rng.betaBinomial({ alpha: 2, beta: 2, n: 10 });
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    });

    test('should generate a value from the Beta distribution', () => {
      const result = rng.beta({ alpha: 2, beta: 2 });
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });

    test('should generate a value from the Gamma distribution', () => {
      const result = rng.gamma({ shape: 2, rate: 1 });
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test('should generate a value from the Student\'s t-distribution', () => {
      const result = rng.studentsT({ nu: 5 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Wigner Semicircle distribution', () => {
      const result = rng.wignerSemicircle({ R: 1 });
      expect(result).toBeGreaterThanOrEqual(-1);
      expect(result).toBeLessThanOrEqual(1);
    });

    test('should generate a value from the Kumaraswamy distribution', () => {
      const result = rng.kumaraswamy({ alpha: 2, beta: 2 });
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });

    test('should generate a value from the Hermite distribution', () => {
      const result = rng.hermite({ lambda1: 1, lambda2: 2 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Chi-Squared distribution', () => {
      const result = rng.chiSquared({ k: 2 });
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test('should generate a value from the Rayleigh distribution', () => {
      const result = rng.rayleigh({ scale: 1 });
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test('should generate a value from the Log-Normal distribution', () => {
      const result = rng.logNormal({ mean: 0, stddev: 1 });
      expect(result).toBeGreaterThanOrEqual(0);
    });

    test('should generate a value from the Cauchy distribution', () => {
      const result = rng.cauchy({ median: 0, scale: 1 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Laplace distribution', () => {
      const result = rng.laplace({ mean: 0, scale: 1 });
      expect(result).toEqual(expect.any(Number));
    });

    test('should generate a value from the Logistic distribution', () => {
      const result = rng.logistic({ mean: 0, scale: 1 });
      expect(result).toEqual(expect.any(Number));
    });
  });

  test('Getting and setting predictable results', () => {
    prng.results = [0.5];
    expect(prng.results).toEqual([0.5]);

    prng.results = defaultResultSet;
    expect(prng.results).toEqual(defaultResultSet);
  });

  // Normal Distributions
  test('boxMuller', () => {
    expect(() => {
      prng.boxMuller({ mean: 0.5, stddev: 0 });
    }).not.toThrow();

    expect(() => {
      prng.boxMuller(0.5, 0);
    }).not.toThrow();

    expect(prng.boxMuller({ mean: 0.5, stddev: 0 })).toBe(0.5);

    expect(() => {
      prng.boxMuller({ mean: 0.5, stddev: -1 });
    }).toThrow(NumberValidationError);

    expect(() => {
      prng.boxMuller(0.5, -1);
    }).toThrow(NumberValidationError);

    let sum = 0;
    for (let i = 0; i < lgruns; i++) {
      sum += rng.boxMuller({ mean: 0.5, stddev: 0.1 });
    }
    expect(sum / lgruns).toBeCloseTo(0.5);
  });

  // rng.irwinHall({ n }: { n?: number });
  describe('irwinHall', () => {
    test('irwinHall - basic usage', () => {
      expect(() => {
        rng.irwinHall();
        rng.irwinHall(100);
        rng.irwinHall({ n: 100 });
      }).not.toThrow();
    });

    test('irwinHall - invalid input throws', () => {
      expect(() => {
        rng.irwinHall(-5);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.irwinHall({ n: -10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('bates', () => {
    test('bates basic', () => {
      expect(() => {
        rng.bates();
        rng.bates(5);
        rng.bates({ n: 10 });
      }).not.toThrow();
    });

    test('invalid input throws', () => {
      expect(() => {
        rng.bates(-5);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.bates({ n: -10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('bernoulli', () => {
    test('basic usage', () => {
      expect(() => {
        rng.bernoulli();
        rng.bernoulli(0.4);
        rng.bernoulli({ p: 0.8 });
      }).not.toThrow();
    });

    test('invalid input throws', () => {
      expect(() => {
        rng.bernoulli(-1);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.bernoulli({ p: 10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('exponential', () => {
    test('basic usage', () => {
      expect(() => {
        rng.exponential();
        rng.exponential(1);
        rng.exponential({ rate: 10 });
      }).not.toThrow();
    });
  });

  describe('pareto', () => {
    test('basic usage', () => {
      expect(() => {
        rng.pareto();
        rng.pareto({ shape: 1 });
        rng.pareto({ shape: 1, scale: 2 });
        rng.pareto({ shape: 1, location: 5 });
        rng.pareto({ shape: 0.5, scale: 0.1, location: -5 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.pareto({ shape: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.pareto({ scale: -2 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('poisson', () => {
    test('basic usage', () => {
      expect(() => {
        rng.poisson();
        rng.poisson(1);
        rng.poisson({ lambda: 10 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.poisson(-1);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.poisson({ lambda: -10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('hypergeometric', () => {
    test('basic usage', () => {
      expect(() => {
        rng.hypergeometric();
        rng.hypergeometric({ N: 100 });
        rng.hypergeometric({ N: 100, K: 50 });
        rng.hypergeometric({ N: 100, K: 50, n: 10 });
        rng.hypergeometric({ N: 100, n: 10 });
        rng.hypergeometric({ N: 100, n: 10, k: 1 });
        rng.hypergeometric({ N: 100, k: 1 });
        rng.hypergeometric({ N: 100, K: 50, n: 10, k: 1 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.hypergeometric({ N: 100, K: 150 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hypergeometric({ N: 100, n: 150 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hypergeometric({ N: 100, K: 50, n: 150 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hypergeometric({ N: 100, K: 50, n: 30, k: 55 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hypergeometric({ N: 100, K: 50, n: 30, k: 45 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hypergeometric({ N: 100, K: 50, k: 55 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('rademacher', () => {
    test('basic usage', () => {
      expect(() => {
        rng.rademacher();
      }).not.toThrow();
    });
  });

  describe('binomial', () => {
    test('basic usage', () => {
      expect(() => {
        rng.binomial({ n: 100, p: 0.5 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.binomial({ n: 100, p: -0.5 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('betaBinomial', () => {
    test('betaBinomial - basic usage', () => {
      expect(() => {
        rng.betaBinomial();
        rng.betaBinomial({ alpha: 1 });
        rng.betaBinomial({ beta: 1 });
        rng.betaBinomial({ alpha: 3, beta: 2 });
        rng.betaBinomial({ n: 100 });
        rng.betaBinomial({ alpha: 1, n: 1 });
        rng.betaBinomial({ beta: 1, n: 50 });
        rng.betaBinomial({ alpha: 1, beta: 1, n: 999999 });
      }).not.toThrow();
    });

    test('betaBinomial - invalid arguments throws', () => {
      expect(() => {
        rng.betaBinomial({ alpha: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.betaBinomial({ beta: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.betaBinomial({ n: 0.5 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.betaBinomial({ n: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.betaBinomial({ n: 0 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('beta', () => {
    test('basic usage', () => {
      expect(() => {
        rng.beta();
        rng.beta({ beta: 1 });
        rng.beta({ alpha: 2 });
        rng.beta({ alpha: 3, beta: 4 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.beta({ alpha: -3, beta: 4 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.beta({ alpha: 3, beta: -4 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.beta({ beta: -4 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.beta({ alpha: 0 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('gamma', () => {
    test('basic usage', () => {
      expect(() => {
        rng.gamma();
        rng.gamma({ shape: 1 });
        rng.gamma({ shape: 2, rate: 2 });
        rng.gamma({ shape: 5, scale: 4 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.gamma({ shape: -1 });
        rng.gamma({ shape: 2, rate: -2 });
        rng.gamma({ shape: 5, scale: -4 });
      }).toThrow(NumberValidationError);
    });

    test('specifying rate and scale compatible doesnt throw', () => {
      expect(() => {
        rng.gamma({ rate: 2, scale: 1 / 2 });
      }).not.toThrow();

      expect(() => {
        rng.gamma({ rate: 1 / 4, scale: 4 });
      }).not.toThrow();
    });

    test('specifying rate and scale incompatible throws', () => {
      expect(() => {
        rng.gamma();
        rng.gamma({ rate: 2, scale: 2 });
      }).toThrow();
    });
  });

  describe('studentsT', () => {
    test('studentsT - basic usage', () => {
      expect(() => {
        rng.studentsT();
        rng.studentsT(1);
        rng.studentsT({ nu: 5 });
      }).not.toThrow();
    });

    test('studentsT - invalid arguments throws', () => {
      expect(() => {
        rng.studentsT(-5);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.studentsT({ nu: -0.1 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('wignerSemicircle', () => {
    test('wignerSemicircle - basic usage', () => {
      expect(() => {
        rng.wignerSemicircle();
        rng.wignerSemicircle(1);
        rng.wignerSemicircle({ R: 10 });
      }).not.toThrow();
    });

    test('wignerSemicircle - invalid arguments throws', () => {
      expect(() => {
        rng.wignerSemicircle(-2);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.wignerSemicircle({ R: 0 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('kumaraswamy', () => {
    test('basic usage', () => {
      expect(() => {
        rng.kumaraswamy();
        rng.kumaraswamy({ alpha: 10 });
        rng.kumaraswamy({ beta: 10 });
        rng.kumaraswamy({ alpha: 10, beta: 10 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.kumaraswamy({ alpha: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.kumaraswamy({ beta: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.kumaraswamy({ alpha: 10, beta: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.kumaraswamy({ alpha: -10, beta: 10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.kumaraswamy({ alpha: -10, beta: -10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('hermite', () => {
    test('basic usage', () => {
      expect(() => {
        rng.hermite();
        rng.hermite({ lambda1: 10 });
        rng.hermite({ lambda2: 10 });
        rng.hermite({ lambda1: 10, lambda2: 10 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.hermite({ lambda1: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hermite({ lambda2: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hermite({ lambda1: 10, lambda2: -10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hermite({ lambda1: -10, lambda2: 10 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.hermite({ lambda1: -10, lambda2: -10 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('chiSquared', () => {
    test('chiSquared - basic usage', () => {
      expect(() => {
        rng.chiSquared();
        rng.chiSquared(10);
        rng.chiSquared({ k: 1 });
      }).not.toThrow();
    });

    test('chiSquared - basic usage', () => {
      expect(() => {
        rng.chiSquared(-10);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.chiSquared({ k: -1 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('rayleigh', () => {
    test('basic usage', () => {
      expect(() => {
        rng.rayleigh();
        rng.rayleigh(1);
        rng.rayleigh({ scale: 10 });
      }).not.toThrow();
    });

    test('basic usage', () => {
      expect(() => {
        rng.rayleigh(-10);
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.rayleigh({ scale: -1 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('logNormal', () => {
    test('logNormal - basic usage', () => {
      expect(() => {
        rng.logNormal();
        rng.logNormal({ mean: 0.5 });
        rng.logNormal({ stddev: 0.1 });
        rng.logNormal({ mean: -5, stddev: 0.9 });
      }).not.toThrow();
    });

    test('logNormal - invalid arguments throws', () => {
      expect(() => {
        rng.logNormal({ stddev: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.logNormal({ mean: -5, stddev: -0.9 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('cauchy', () => {
    test('basic usage', () => {
      expect(() => {
        rng.cauchy();
        rng.cauchy({ median: 0.5 });
        rng.cauchy({ scale: 0.1 });
        rng.cauchy({ median: -5, scale: 0.9 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.cauchy({ scale: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.cauchy({ median: -5, scale: -0.9 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('laplace', () => {
    test('basic usage', () => {
      expect(() => {
        rng.laplace();
        rng.laplace({ mean: 0.5 });
        rng.laplace({ scale: 0.1 });
        rng.laplace({ mean: -5, scale: 0.9 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.laplace({ scale: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.laplace({ mean: -5, scale: -0.9 });
      }).toThrow(NumberValidationError);
    });
  });

  describe('logistic', () => {
    test('basic usage', () => {
      expect(() => {
        rng.logistic();
        rng.logistic({ mean: 0.5 });
        rng.logistic({ scale: 0.1 });
        rng.logistic({ mean: -5, scale: 0.9 });
      }).not.toThrow();
    });

    test('invalid arguments throws', () => {
      expect(() => {
        rng.logistic({ scale: -1 });
      }).toThrow(NumberValidationError);

      expect(() => {
        rng.logistic({ mean: -5, scale: -0.9 });
      }).toThrow(NumberValidationError);
    });
  });

  const distributions: Distribution[] = [
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

  describe.each(distributions)('Test default args are the same for empty object or no args', (distribution: Distribution) => {
    test(`Test ${distribution} default args are the same for empty object or no args`, () => {
      const rng = new Rng();
      rng.randomSource(() => 0.1);

      // @ts-ignore - otherwise we get errors
      expect(rng[distribution]()).toBe(rng[distribution]({}));
    }, 1000);
  });

  const distributionsAndRandom : [Distribution, any, number][] = [
    ['beta', { alpha: 100000000 + 1 }, 1 - Number.EPSILON],
    ['poisson', { lambda: 100 }, 1 - Number.EPSILON],
    ['gamma', { shape: 1 / 2, rate: 2 }, 0.5],
    ['studentsT', {}, 0.5],
  ];

  test.each(distributionsAndRandom)('Test non-random throws for sculpted values', (distribution: Distribution, args, num: number) => {
    const rng = new PredictableRng();
    rng.results = [num];

    // @ts-ignore - otherwise we get errors
    expect(() => rng[distribution](args)).toThrow();
  }, 1000);
});
