import { default as Rng } from './../../src/rng';
import { default as PredictableRng } from './../../src/rng/predictable';
import { default as Pool } from './../../src/rng/pool';

const defaultResultSet = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
const smruns = Math.pow(10, 2);
const mdruns = Math.pow(10, 3);
const lgruns = Math.pow(10, 4);
const xlruns = Math.pow(10, 5);

describe('testing Rng & predictable Rng', () => {
  let rng: Rng;
  let prng: PredictableRng;

  beforeEach(() => {
    rng = new Rng(); // Replace with your actual constructor
    prng = new PredictableRng(); // Replace with your actual constructor
  });

  afterEach(() => {
    prng.reset();
  });

  test('Getting and setting predictable results', () => {
    prng.results = [0.5];
    expect(prng.results).toEqual([0.5]);

    prng.results = defaultResultSet;
    expect(prng.results).toEqual(defaultResultSet);
  });

  test('Predictable results appear in proper order', () => {
    prng.results = defaultResultSet;
    expect(prng.random()).toBe(defaultResultSet[0]);
    expect(prng.random()).toBe(defaultResultSet[1]);
    expect(prng.random()).toBe(defaultResultSet[2]);
    expect(prng.random()).toBe(defaultResultSet[3]);
    expect(prng.random()).toBe(defaultResultSet[4]);
    expect(prng.random()).toBe(defaultResultSet[5]);
    expect(prng.random()).toBe(defaultResultSet[6]);
    expect(prng.random()).toBe(defaultResultSet[7]);
    expect(prng.random()).toBe(defaultResultSet[8]);
    expect(prng.random()).toBe(defaultResultSet[9]);
    expect(prng.random()).toBe(defaultResultSet[10]);
  });

  test('Predictable reset works', () => {
    prng.results = defaultResultSet;
    expect(prng.random()).toBe(defaultResultSet[0]);
    expect(prng.random()).toBe(defaultResultSet[1]);
    expect(prng.random()).toBe(defaultResultSet[2]);
    expect(prng.random()).toBe(defaultResultSet[3]);
    expect(prng.random()).toBe(defaultResultSet[4]);
    expect(prng.random()).toBe(defaultResultSet[5]);
    prng.reset();
    expect(prng.random()).toBe(defaultResultSet[0]);
    expect(prng.random()).toBe(defaultResultSet[1]);
    expect(prng.random()).toBe(defaultResultSet[2]);
    expect(prng.random()).toBe(defaultResultSet[3]);
    expect(prng.random()).toBe(defaultResultSet[4]);
    expect(prng.random()).toBe(defaultResultSet[5]);
  });

  test('Predictable results reset when set', () => {
    const prng = new PredictableRng();

    prng.results = defaultResultSet;
    expect(prng.random()).toBe(defaultResultSet[0]);

    prng.results = defaultResultSet;
    expect(prng.random()).toBe(defaultResultSet[0]);
  });

  test('Predictable even spread', () => {
    const numsToTest = [3, 6, 9, 12];
    for (const num of numsToTest) {
      prng.setEvenSpread(num);
      for (let i = 0; i < num - 1; i++) {
        expect(prng.random()).toBe(i / (num - 1));
      }
      expect(prng.random()).toBeCloseTo(1);
    }
  });

  test('Predictable same as', () => {
    const p1 = new PredictableRng();
    const p2 = new PredictableRng();

    p1.results = [0.1, 0.2, 0.3];
    p2.results = [0.1, 0.2, 0.3];

    expect(p1.sameAs(p2)).toBeTruthy();
    expect(p2.sameAs(p1)).toBeTruthy();
  });

  test('rng same as with default args should not be true', () => {
    const p1 = new Rng();
    const p2 = new Rng();

    expect(p1.sameAs(p2)).not.toBeTruthy();
    expect(p2.sameAs(p1)).not.toBeTruthy();
  });

  test('should initialize with seed', () => {
    const seedRng = new Rng('test-seed');
    expect(seedRng.getSeed()).toEqual(expect.any(Number));
  });

  test('rng same as with same seed should be true', () => {
    const p1 = new Rng();
    const p2 = new Rng();
    const p3 = new Rng('abc');
    const p4 = new Rng('abc');

    expect(p3.sameAs(p4)).toBeTruthy();
    expect(p4.sameAs(p3)).toBeTruthy();

    p1.seed('123');
    p2.seed('123');

    expect(p1.sameAs(p2)).toBeTruthy();
    expect(p2.sameAs(p1)).toBeTruthy();
  });

  test('rng same as with same seed and randomSource should be true', () => {
    const p1 = new Rng('abc');
    const p2 = new Rng('abc');

    const f = () => 1;
    p1.randomSource(f);

    expect(p1.sameAs(p2)).not.toBeTruthy();
    expect(p2.sameAs(p1)).not.toBeTruthy();

    p2.randomSource(f);

    expect(p1.sameAs(p2)).toBeTruthy();
    expect(p2.sameAs(p1)).toBeTruthy();
  });

  test('rng same as returns false for arbitrary other arguments', () => {
    const p1 = new Rng('abc');

    const f = () => 1;

    expect(p1.sameAs('some string')).toBeFalsy();
    expect(p1.sameAs({})).toBeFalsy();
    expect(p1.sameAs(f)).toBeFalsy();
    expect(p1.sameAs(-1)).toBeFalsy();
    expect(p1.sameAs(10)).toBeFalsy();
    expect(p1.sameAs(new Set())).toBeFalsy();
    expect(p1.sameAs(new PredictableRng())).toBeFalsy();
  });

  test('Predictable throws when results are empty', () => {
    expect(() => {
      prng.results = [];
    }).toThrow();
  });

  test('Predictable throws when >= 1', () => {
    expect(() => {
      prng.results = [2];
    }).toThrow();
    expect(() => {
      prng.results = [1];
    }).toThrow();
  });

  test('Predictable throws when < 0', () => {
    expect(() => {
      prng.results = [-1];
    }).toThrow();
  });

  test('Test rng accepts string seed', () => {
    expect(() => {
      const rng = new Rng('abc');
      rng.seed('def');
    }).not.toThrow();
  });

  test('Test rng accepts string seed', () => {
    expect(() => {
      const rng = new Rng('abc');
      rng.seed('def');
    }).not.toThrow();
  });

  test('Test rng predictable sets seed', () => {
    const predictableRng = rng.predictable(1234);
    expect(predictableRng.getSeed()).toBe(1234);

    const predictableRngStatic = Rng.predictable(1234);
    expect(predictableRngStatic.getSeed()).toBe(1234);
  });

  test('should provide predictable random sequence', () => {
    const predictableRng = Rng.predictable('seed');
    const randomNum1 = predictableRng.random();
    const randomNum2 = predictableRng.random();
    const newPredictableRng = Rng.predictable('seed');
    const newRandomNum1 = newPredictableRng.random();
    const newRandomNum2 = newPredictableRng.random();
    expect(randomNum1).toBe(newRandomNum1);
    expect(randomNum2).toBe(newRandomNum2);
  });

  test('Test scaling and scale normalizing', () => {
    for (let i = 0; i < 100; i++) {
      expect(rng.scale(i, 0, 1, 0, 100)).toBeGreaterThanOrEqual(0);
      expect(rng.scale(i, 0, 1, 0, 100)).toBeLessThanOrEqual(1);
      expect(rng.scale(i, 0, 1, 0, 100)).toBeCloseTo(i / 100);
    }
    expect(rng.scale(5, 0, 100, 0, 10)).toBe(50);
    expect(rng.scale(5, 100, 200, 0, 10)).toBe(150);
    for (let i = 0; i < 1; i += 0.01) {
      expect(rng.scaleNorm(i, 0, 100)).toBeGreaterThanOrEqual(0);
      expect(rng.scaleNorm(i, 0, 100)).toBeLessThanOrEqual(100);
      expect(rng.scaleNorm(i, 0, 100)).toBeCloseTo(i * 100);
    }
  });

  test('Test scale with minimum args', () => {
    for (let i = 0; i < 100; i++) {
      expect(rng.scale(i / 100, 0, 100)).toBeGreaterThanOrEqual(0);
      expect(rng.scale(i / 100, 0, 100)).toBeLessThanOrEqual(100);
      expect(rng.scale(i / 100, 0, 100)).toBeCloseTo(i);
    }

    for (let i = 0; i < 100; i++) {
      expect(rng.scale(i / 100, 0, 10)).toBeGreaterThanOrEqual(0);
      expect(rng.scale(i / 100, 0, 10)).toBeLessThanOrEqual(10);
      expect(rng.scale(i / 100, 0, 10)).toBeCloseTo(i / 10);
    }

    for (let i = 0; i < 100; i++) {
      expect(rng.scale(i / 100, 10, 20)).toBeGreaterThanOrEqual(10);
      expect(rng.scale(i / 100, 10, 20)).toBeLessThanOrEqual(20);
      expect(rng.scale(i / 100, 10, 20)).toBeCloseTo(10 + i / 10);
    }
  });

  test('Test scaling with invalid parameters throws', () => {
    expect(() => {
      rng.scale(-1, 0, 100, 0, 1);
    }).toThrow();
    expect(() => {
      rng.scale(10, 0, 100, 0, 1);
    }).toThrow();
    expect(() => {
      rng.scaleNorm(-1, 0, 100);
    }).toThrow();
    expect(() => {
      rng.scaleNorm(10, 0, 100);
    }).toThrow();
  });

  test('Random returns 0, 1', () => {
    for (let i = 0; i < mdruns; i++) {
      const randResult = rng.random();
      expect(randResult).toBeGreaterThanOrEqual(0);
      expect(randResult).toBeLessThan(1);
    }
  });

  test('should generate a random number between a given range', () => {
    for (let i = 0; i < smruns; i++) {
      const randomNumber = rng.random(1, 10);
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(10);
    }
  });

  test('Random int returns int within range', () => {
    for (let i = 0; i < smruns; i++) {
      const randResult = rng.randInt(0, 100);
      expect(randResult).toBeGreaterThanOrEqual(0);
      expect(randResult).toBeLessThanOrEqual(100);
      expect(Number.isInteger(randResult)).toBeTruthy();
    }
  });

  test('randInt with only from as 1 returns 1', () => {
    for (let i = 0; i < smruns; i++) {
      const r = rng.randInt(1);
      expect(r).toBe(1);
    }
  });

  test('randInt with no args returns 0-1', () => {
    for (let i = 0; i < smruns; i++) {
      const r = rng.randInt();
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(1);
    }
  });

  test('Random int with skew', () => {
    prng.results = [0.5];
    expect(prng.randInt(0, 100)).toBe(50);
    expect(prng.randInt(0, 100, -1)).toBeLessThan(prng.randInt(0, 100));
    expect(prng.randInt(0, 100, 1)).toBeGreaterThan(prng.randInt(0, 100));
    expect(prng.randInt(0, 100, -2)).toBeLessThan(prng.randInt(0, 100, -1));
    expect(prng.randInt(0, 100, 2)).toBeGreaterThan(prng.randInt(0, 100, 1));
  });

  test('randBetween', () => {
    for (let i = 0; i < smruns; i++) {
      const r = rng.randBetween(1, 100);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(100);
    }
  });

  test('randBetween with only from', () => {
    for (let i = 0; i < smruns; i++) {
      const r = rng.randBetween(1);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(2);
    }
  });

  test('randBetween with no args', () => {
    for (let i = 0; i < smruns; i++) {
      const r = rng.randBetween();
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(1);
    }
  });

  test('randBetween with skew', () => {
    prng.results = [0.5];
    expect(prng.randBetween(0, 100)).toBe(50);
    expect(prng.randBetween(0, 100, -1)).toBeLessThan(prng.randInt(0, 100));
    expect(prng.randBetween(0, 100, 1)).toBeGreaterThan(prng.randInt(0, 100));
    expect(prng.randBetween(0, 100, -2)).toBeLessThan(prng.randInt(0, 100, -1));
    expect(prng.randBetween(0, 100, 2)).toBeGreaterThan(prng.randInt(0, 100, 1));
  });

  test('Get/Set seed', () => {
    const orig = new Rng();
    orig.seed(12345);
    expect(orig.getSeed()).toBe(12345);
  });

  test('Constructor get/set seed', () => {
    const orig = new Rng(12345);
    expect(orig.getSeed()).toBe(12345);
  });

  test('Two instances with same seed product same random number', () => {
    const a = new Rng(12345);
    const b = new Rng(12345);
    for (let i = 0; i < 100; i++) {
      expect(a.random()).toBe(b.random());
    }
  });

  test('Seeded RNG remains the same over time.', () => {
    const seed1 = new Rng('abc');
    const seed2 = new Rng(1234);
    const seed3 = new Rng(1_000_000_000_000_000_000);
    const seed4 = new Rng(0x00FF00);
    expect(seed1.random()).toMatchInlineSnapshot('0.3614412921015173');
    expect(seed2.random()).toMatchInlineSnapshot('0.23745618015527725');
    expect(seed3.random()).toMatchInlineSnapshot('0.23227926436811686');
    expect(seed4.random()).toMatchInlineSnapshot('0.5058698654174805');

    seed1.seed('abc');
    seed2.seed(1234);
    seed3.seed(1_000_000_000_000_000_000);
    seed4.seed(0x00FF00);
    expect(seed1.random()).toMatchInlineSnapshot('0.3614412921015173');
    expect(seed2.random()).toMatchInlineSnapshot('0.23745618015527725');
    expect(seed3.random()).toMatchInlineSnapshot('0.23227926436811686');
    expect(seed4.random()).toMatchInlineSnapshot('0.5058698654174805');
  });

  test('Serialize basic', () => {
    const orng = new Rng(56789);
    const s = orng.serialize();
    const nrng = Rng.unserialize(s);
    expect(nrng.getSeed()).toEqual(orng.getSeed());
    expect(nrng.getSeed()).toEqual(56789);
    expect(nrng.serialize()).toEqual(s);
  });

  test('should serialize and unserialize RNG state', () => {
    const serialized = rng.serialize();
    const newRng = Rng.unserialize(serialized);
    expect(newRng).toEqual(expect.any(Rng));
  });

  test('Serialize after random number gen', () => {
    const orng = new Rng(56789);
    orng.random();
    orng.random();
    orng.random();
    orng.random();
    orng.random();
    const s = orng.serialize();
    const nrng = Rng.unserialize(s);
    expect(nrng.getSeed()).toEqual(orng.getSeed());
    expect(nrng.serialize()).toEqual(s);
    expect(nrng.sameAs(orng));
  });

  test('Serialize and unserialize produces same random numbers', () => {
    const orig = new Rng(12345);
    orig.random();
    const s = orig.serialize();
    const other = Rng.unserialize(s);
    expect(other.getSeed()).toBe(orig.getSeed());
    expect(other.serialize()).toEqual(s);
    for (let i = 0; i < 100; i++) {
      expect(orig.random()).toBe(other.random());
    }
  });

  test('should calculate probabilities correctly', () => {
    const percentage = rng.percentage();
    expect(percentage).toBeGreaterThanOrEqual(0);
    expect(percentage).toBeLessThanOrEqual(100);
  });

  test('percentage generates mean of ~50 over long run', () => {
    let sum = 0;
    for (let i = 0; i < lgruns; i++) {
      const r = rng.percentage();
      sum += r;
      expect(r).toBeLessThan(100);
      expect(r).toBeGreaterThan(0);
    }
    const mean = sum / lgruns;
    expect(Math.round(mean)).toBeGreaterThanOrEqual(49);
    expect(Math.round(mean)).toBeLessThanOrEqual(51);
  });

  test('probability generates mean of ~0.5 over long run', () => {
    let sum = 0;
    for (let i = 0; i < lgruns; i++) {
      const r = rng.probability();
      sum += r;
      expect(r).toBeLessThan(1);
      expect(r).toBeGreaterThan(0);
    }
    const mean = sum / lgruns;
    expect(mean).toBeCloseTo(0.5, 1);
  });

  test('should evaluate chance correctly', () => {
    const chance = rng.chance(1, 2);
    expect(typeof chance === 'boolean').toBeTruthy();
  });

  test('chance with predictable RNG gives correct results', () => {
    const rng = new Rng(12345);
    expect(rng.chance(1, 1)).toBeTruthy();
    const prng = new PredictableRng(12345, [0, 0.5, 1 - Number.EPSILON]);
    expect(prng.chance(1, 10)).toBeTruthy();
    expect(prng.chance(1, 10)).toBeFalsy();
    expect(prng.chance(1, 10)).toBeFalsy();
  });

  test('chance with only default args', () => {
    const prng = new PredictableRng(12345, [0, 0.5, 1 - Number.EPSILON]);
    expect(prng.chance(0.1)).toBeTruthy();
    expect(prng.chance(0.1)).toBeFalsy();
    expect(prng.chance(0.1)).toBeFalsy();
  });

  test('chanceTo', () => {
    const rng = new Rng(12345);
    expect(rng.chanceTo(1, 0)).toBeTruthy();
    const prng = new PredictableRng(12345, [0, 0.5, 1 - Number.EPSILON]);
    expect(prng.chanceTo(10, 1)).toBeTruthy();
    expect(prng.chanceTo(10, 1)).toBeTruthy();
    expect(prng.chanceTo(10, 1)).toBeFalsy();
  });

  test('uniqid should return a string', () => {
    const uniqid = rng.uniqid();
    expect(uniqid).toEqual(expect.any(String));
  });

  test('uniqid should not return the same thing twice for seeded RNG', () => {
    const rng = new Rng(12345);
    expect(rng.uniqid()).not.toBe(rng.uniqid());
  });

  test('uniqid should return distinct and incrementing results', async () => {
    const strs = [];
    for (let i = 0; i <= mdruns; i++) {
      strs.push(rng.uniqid());
    }
    const strCopy = [...strs].sort();
    const strSet = Array.from(new Set(strs));

    expect(strCopy).toEqual(strs);
    expect(strSet).toEqual(strs);

    return (new Promise((resolve) => {
      const strs : any[] = [];
      for (let i = 0; i <= smruns; i++) {
        strs.push(rng.uniqid());
      }
      for (let i = 0; i <= 20; i++) {
        setTimeout(() => {
          for (let i = 0; i <= smruns; i++) {
            strs.push(rng.uniqid());
          }
          const strCopy = [...strs].sort();
          const strSet = Array.from(new Set(strs));

          expect(strCopy).toEqual(strs);
          expect(strSet).toEqual(strs);
        }, i * 100);
      }
      setTimeout(() => {
        for (let i = 0; i <= smruns; i++) {
          strs.push(rng.uniqid());
        }
        const strCopy = [...strs].sort();
        const strSet = Array.from(new Set(strs));

        expect(strCopy).toEqual(strs);
        expect(strSet).toEqual(strs);
        resolve(null);
      }, 3000);
    }));
  }, 10000);

  test('randomString should return a string', () => {
    const randomString = rng.randomString();
    expect(randomString).toEqual(expect.any(String));
  });

  test('randomString should not return the same thing twice for seeded RNG', () => {
    const rng = new Rng(12345);
    expect(rng.randomString()).not.toBe(rng.randomString());
  });

  test('randomString should return string of length n', () => {
    expect(rng.randomString(12).length).toBe(12);
  });

  test('normal', () => {
    const results = [];
    const mean = 10;
    const stddev = 0.1;
    for (let i = 0; i < 100000; i++) {
      results.push(rng.normal({ mean, stddev }));
    }
    const sum = results.reduce((a, b) => a + b);
    const calcMean = sum / results.length;
    const calcStdDev = Math.sqrt(results.reduce((a, b) => a + Math.pow((b - mean), 2), 0) / (results.length - 1));

    expect(Math.abs(mean - calcMean)).toBeLessThan(stddev / 10);
    expect(Math.abs(stddev - calcStdDev)).toBeLessThan(stddev / 10);

    // There is a 1 in 390,682,215,445 chance for each result to be within 7 standard deviations.
    // It should be fairly sufficient to test that results are within this +/- 7o window.
    // i.e. these will fail only 1/3,906,822 times.
    // Using mean = 10 and stddev = 0.1 the window is then from 9.3 to 10.7
    expect(Math.max(...results)).toBeLessThan(mean + (stddev * 7));
    expect(Math.min(...results)).toBeGreaterThan(mean - (stddev * 7));
  });

  test.each([
    undefined,
    {},
    { mean: 50 },
    { mean: -50 },
    { stddev: 1 },
    { stddev: 100 },
    { min: 1, max: 100 },
    { min: 1, max: 100, skew: -1 },
    { min: 1, max: 100, skew: 10 },
    { min: 1, max: 100, skew: 1 },
    { skew: 10 },
    { min: -1 },
    { max: 100 }
  ])('normal with different number of args doesnt throw', (args) => {
    expect(() => {
      rng.normal(args);
    }).not.toThrow();
  });

  test('Test shouldThrowOnMaxRecursionsReached returns boolean', () => {
    expect(typeof rng.shouldThrowOnMaxRecursionsReached()).toBe('boolean');
  });

  test('weightedChoice', () => {
    prng.results = defaultResultSet;
    const choices = {
      a: 10,
      b: 1
    };
    for (let i = 0; i < 10; i++) expect(prng.weightedChoice(choices)).toBe('a');
    const r1 = prng.weightedChoice(choices);
    expect(r1).toBe('b');

    const stacked = {
      a: Math.pow(2, 32),
      b: 1
    };
    for (let i = 0; i < 1000; i++) {
      expect(rng.weightedChoice(stacked)).toBe('a');
    }
  });

  test('should choose a random element from an array', () => {
    const choices = [1, 2, 3, 4, 5];
    const choice = rng.choice(choices);
    expect(choices).toContain(choice);
  });

  test('should handle weighted choice from an array', () => {
    const choices = [1, 2, 3, 4, 5];
    const weightedChoice = rng.weightedChoice(choices);
    expect(choices).toContain(weightedChoice);
  });

  test('weightedChoice invalid input', () => {
    const choices = {
      a: -1,
      b: 1
    };
    expect(() => {
      rng.weightedChoice(choices);
    }).toThrow();
  });

  test('weightedChoice with map', () => {
    const map = new Map();
    const ob1 = { name: 'ob1' };
    const ob2 = { name: 'ob2' };

    map.set(ob1, 10);
    map.set(ob2, 1);

    prng.results = defaultResultSet;
    for (let i = 0; i < 10; i++) expect(prng.weightedChoice(map)).toBe(ob1);
    const r1 = prng.weightedChoice(map);
    expect(r1).toBe(ob2);
  });

  test('weightedChoice with array of strings', () => {
    const colors = ['red', 'green', 'blue'];
    prng.setEvenSpread(3);
    expect(prng.weightedChoice(colors)).toBe('red');
    expect(prng.weightedChoice(colors)).toBe('green');
    expect(prng.weightedChoice(colors)).toBe('blue');
  });

  test('weightedChoice with array of objects', () => {
    const ob1 = { name: 'ob1' };
    const ob2 = { name: 'ob2' };
    const choices = [ob1, ob2];

    prng.setEvenSpread(2);
    expect(prng.weightedChoice(choices)).toBe(ob1);
    expect(prng.weightedChoice(choices)).toBe(ob2);
  });

  test('weightedChoice with empty array produces null', () => {
    expect(rng.weightedChoice([])).toBe(null);
    expect(rng.weightedChoice({})).toBe(null);
    expect(rng.weightedChoice(new Map())).toBe(null);
  });

  test('weightedChoice with single entry returns that entry', () => {
    expect(rng.weightedChoice(['a'])).toBe('a');
    expect(rng.weightedChoice({ a: 1 })).toBe('a');
    expect(rng.weightedChoice(new Map([['b', 1]]))).toBe('b');
  });

  test('weights produces correct output', () => {
    const f = () => {};
    const weights = rng.weights(['a', 'a', 'a', 'b', 'b', f, f, 'c']);
    expect(weights.get('a')).toBe(3);
    expect(weights.get('b')).toBe(2);
    expect(weights.get(f)).toBe(2);
    expect(weights.get('c')).toBe(1);
  });

  test('parseDiceString', () => {
    const expectations = {
      '5d6+6': { n: 5, d: 6, plus: 6 },
      '2d12+1': { n: 2, d: 12, plus: 1 },
      d12: { n: 1, d: 12, plus: 0 },
      '5 d 6 + 6': { n: 5, d: 6, plus: 6 },
      6: { n: 0, d: 0, plus: 6 },
      1: { n: 0, d: 0, plus: 1 },
      1.5: { n: 0, d: 0, plus: 1.5 },
      '5d6+1.5': { n: 5, d: 6, plus: 1.5 },
      '5d6-1.5': { n: 5, d: 6, plus: -1.5 },
      '0d6-1.5': { n: 0, d: 6, plus: -1.5 },
    };
    for (const [d, exp] of Object.entries(expectations)) {
      const result = rng.parseDiceString(d);
      expect(result).toEqual(exp);
    }
  });

  test('diceExpanded - some basic results', () => {
    let n = 6;
    prng.setEvenSpread(n);
    for (let i = 1; i <= n; i++) {
      const r = prng.diceExpanded(`1d${n}+1`);
      expect(r.dice).toEqual([i]);
      expect(r.plus).toBe(1);
      expect(r.total).toBe(i + 1);
    }

    n = 12;
    prng.setEvenSpread(n);

    let r = prng.diceExpanded(`2d${n}+5`);
    expect(r.dice).toEqual([1, 2]);
    expect(r.plus).toBe(5);
    expect(r.total).toBe(5 + 3);

    r = prng.diceExpanded(`2d${n}+5`);
    expect(r.dice).toEqual([3, 4]);
    expect(r.plus).toBe(5);
    expect(r.total).toBe(5 + 3 + 4);
  });

  test('dice - some basic results', () => {
    let n = 6;
    prng.setEvenSpread(6);
    expect(prng.dice('1d6+1')).toBe(2);
    expect(prng.dice('1d6+1')).toBe(3);
    expect(prng.dice('1d6+1')).toBe(4);
    expect(prng.dice('1d6+1')).toBe(5);
    expect(prng.dice('1d6+1')).toBe(6);
    expect(prng.dice('1d6+1')).toBe(7);
    expect(prng.dice('1d6+1')).toBe(2);

    prng.reset();
    expect(prng.dice('1d6+1')).toBe(2);
    expect(prng.dice('1d6+1')).toBe(3);

    prng.reset();
    expect(prng.dice([1, 6, 1])).toBe(2);
    expect(prng.dice([1, 6, 1])).toBe(3);

    prng.reset();
    expect(prng.dice()).toBe(1);

    prng.reset();
    expect(prng.dice('2d6+1')).toBe(4);

    prng.reset();
    expect(prng.dice('1d1+1')).toBe(2);

    n = 12;
    prng.setEvenSpread(12);
    expect(prng.dice(`2d${n}+1`)).toBe(4);

    prng.results = [1 - Number.EPSILON];
    expect(prng.dice(`2d${n}+1`)).toBe(25);

    prng.results = [1 - Number.EPSILON];
    expect(prng.dice(`1d${n}`)).toBe(n);

    prng.results = [0.5 - Number.EPSILON, 1 - Number.EPSILON];
    expect(prng.dice(`2d${n}+1`)).toBe(6 + 12 + 1);

    prng.reset();
    expect(prng.dice(`2d${n}-1`)).toBe(6 + 12 - 1);
  });

  test('dice - weird combos', () => {
    prng.setEvenSpread(6);
    prng.reset();
    expect(prng.dice('1d6+0.5')).toBe(1.5);
    expect(prng.dice('1d6+0.5')).toBe(2.5);
    expect(prng.dice('1d6+0.5')).toBe(3.5);
    expect(prng.dice('1d6+0.5')).toBe(4.5);
    expect(prng.dice('1d6+0.5')).toBe(5.5);
    expect(prng.dice('1d6+0.5')).toBe(6.5);
    prng.reset();
    expect(prng.dice('1d6-0.5')).toBe(0.5);
    expect(prng.dice('1d6-0.5')).toBe(1.5);
    expect(prng.dice('1d6-0.5')).toBe(2.5);
    expect(prng.dice('1d6-0.5')).toBe(3.5);
    expect(prng.dice('1d6-0.5')).toBe(4.5);
    expect(prng.dice('1d6-0.5')).toBe(5.5);
    prng.reset();
    expect(prng.dice('0d6-0.5')).toBe(-0.5);
    prng.reset();
    expect(prng.dice('0d0-1')).toBe(-1);
  });

  test('dice - negative numbers of dice', () => {
    prng.setEvenSpread(6);
    expect(prng.dice('-1d6')).toBe(-1);
    expect(prng.dice('-1d6')).toBe(-2);
    expect(prng.dice('-1d6')).toBe(-3);
    expect(prng.dice('-1d6')).toBe(-4);
    expect(prng.dice('-1d6')).toBe(-5);
    expect(prng.dice('-1d6')).toBe(-6);
    expect(prng.dice('-1d6')).toBe(-1);
    prng.setEvenSpread(6);
    expect(prng.dice('-2d6')).toBe(-3);
  });

  test('dice - invalid inputs', () => {
    expect(() => {
      // @ts-ignore
      rng.dice(null);
    }).toThrow();

    expect(() => {
      // @ts-ignore
      rng.dice(new Set());
    }).toThrow();

    expect(() => {
      rng.dice('abcdefghijk');
    }).toThrow();
  });

  test('clamp should clamp a number within a range', () => {
    const clampedNumber = rng.clamp(15, 10, 20);
    expect(clampedNumber).toBe(15);

    const clampedNumberBelow = rng.clamp(5, 10, 20);
    expect(clampedNumberBelow).toBe(10);

    const clampedNumberAbove = rng.clamp(25, 10, 20);
    expect(clampedNumberAbove).toBe(20);

    expect(rng.clamp(15, 1, 10)).toBe(10);
    expect(rng.clamp(-1, 1, 10)).toBe(1);
  });

  test('bin', () => {
    expect(rng.bin(1.5 - Number.EPSILON, 11, 0, 10)).toBe(1);
    expect(rng.bin(1.5 + Number.EPSILON, 11, 0, 10)).toBe(2);
    expect(rng.bin(9.1, 11, 0, 10)).toBe(9);
    expect(rng.bin(9.7, 11, 0, 10)).toBe(10);
  });

  test('dice max', () => {
    expect(Rng.diceMax()).toBe(6);
    expect(Rng.diceMax({ n: 1, d: 6, plus: 2 })).toBe(8);
    expect(Rng.diceMax('1d6+2')).toBe(8);
    expect(Rng.diceMax('2d6+2')).toBe(14);
    expect(Rng.diceMax('2d6+5')).toBe(17);
    expect(Rng.diceMax({ n: 0, d: 6, plus: 2 })).toBe(2);

    expect(rng.diceMax()).toBe(6);
    expect(rng.diceMax({ n: 1, d: 6, plus: 2 })).toBe(8);
    expect(rng.diceMax('1d6+2')).toBe(8);
    expect(rng.diceMax('2d6+2')).toBe(14);
    expect(rng.diceMax('2d6+5')).toBe(17);
    expect(rng.diceMax({ n: 0, d: 6, plus: 2 })).toBe(2);
  });

  test('dice min', () => {
    expect(Rng.diceMin({ n: 1, d: 6, plus: 2 })).toBe(3);
    expect(Rng.diceMin('1d6+2')).toBe(3);
    expect(Rng.diceMin('2d6+2')).toBe(4);
    expect(Rng.diceMin('2d6+5')).toBe(7);
    expect(Rng.diceMin({ n: 0, d: 6, plus: 2 })).toBe(2);
    expect(Rng.diceMin({ n: 1, d: 6, plus: 0 })).toBe(1);

    expect(rng.diceMin()).toBe(1);
    expect(rng.diceMin({ n: 1, d: 6, plus: 2 })).toBe(3);
    expect(rng.diceMin('1d6+2')).toBe(3);
    expect(rng.diceMin('2d6+2')).toBe(4);
    expect(rng.diceMin('2d6+5')).toBe(7);
    expect(rng.diceMin({ n: 0, d: 6, plus: 2 })).toBe(2);
    expect(rng.diceMin({ n: 1, d: 6, plus: 0 })).toBe(1);
  });

  test('should handle pool of elements', () => {
    const pool = rng.pool([1, 2, 3, 4, 5]);
    expect(pool).toEqual(expect.any(Pool));
  });
});
