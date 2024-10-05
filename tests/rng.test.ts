import { default as Rng } from './../src/rng';
import { default as PredictableRng } from './../src/rng/predictable';

const defaultResultSet = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
const prng = new PredictableRng();
const rng = new Rng();

describe('testing Rng & predictable Rng', () => {
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

  test('Test rng predictable sets seed', () => {
    const rng = new Rng();
    const predictableRng = rng.predictable(1234);

    expect(predictableRng.getSeed()).toBe(1234);

    const predictableRngStatic = Rng.predictable(1234);

    expect(predictableRngStatic.getSeed()).toBe(1234);
  });

  test('Test scaling and scale normalizing', () => {
    for (let i = 0; i < 100; i++) {
      expect(rng.scale(i, 0, 1, 0, 100)).toBeGreaterThanOrEqual(0);
      expect(rng.scale(i, 0, 1, 0, 100)).toBeLessThanOrEqual(100);
      expect(rng.scale(i, 0, 1, 0, 100)).toBeCloseTo(i / 100);
    }
    for (let i = 0; i < 1; i += 0.1) {
      expect(rng.scaleNorm(i, 0, 100)).toBeGreaterThanOrEqual(0);
      expect(rng.scaleNorm(i, 0, 100)).toBeLessThanOrEqual(100);
      expect(rng.scaleNorm(i, 0, 100)).toBeCloseTo(i * 100);
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
    for (let i = 0; i < 10000; i++) {
      const randResult = rng.random();
      expect(randResult).toBeGreaterThanOrEqual(0);
      expect(randResult).toBeLessThan(1);
    }
  });

  test('Random int returns int', () => {
    for (let i = 0; i < 100; i++) {
      const randResult = rng.randInt(0, 100);
      expect(randResult).toBeGreaterThanOrEqual(0);
      expect(randResult).toBeLessThanOrEqual(100);
      expect(Number.isInteger(randResult)).toBeTruthy();
    }
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

  test('Serialize basic', () => {
    const orng = new Rng(56789);
    const s = orng.serialize();
    const nrng = Rng.unserialize(s);
    expect(nrng.getSeed()).toEqual(orng.getSeed());
    expect(nrng.getSeed()).toEqual(56789);
    expect(nrng.serialize()).toEqual(s);
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

  test('percentage', () => {
    prng.results = defaultResultSet;
    expect(prng.percentage()).toBe(defaultResultSet[0] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[1] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[2] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[3] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[4] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[5] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[6] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[7] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[8] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[9] * 100);
    expect(prng.percentage()).toBe(defaultResultSet[10] * 100);
  });

  test('chance', () => {
    const rng = new Rng(12345);
    expect(rng.chance(1, 1)).toBeTruthy();
    const prng = new PredictableRng(12345, [0, 0.5, 1 - Number.EPSILON]);
    expect(prng.chance(1, 10)).toBeTruthy();
    expect(prng.chance(1, 10)).toBeFalsy();
    expect(prng.chance(1, 10)).toBeFalsy();
  });

  test('chanceTo', () => {
    const rng = new Rng(12345);
    expect(rng.chanceTo(1, 0)).toBeTruthy();
    const prng = new PredictableRng(12345, [0, 0.5, 1 - Number.EPSILON]);
    expect(prng.chanceTo(10, 1)).toBeTruthy();
    expect(prng.chanceTo(10, 1)).toBeTruthy();
    expect(prng.chanceTo(10, 1)).toBeFalsy();
  });

  test('uniqid', () => {
    const rng = new Rng(12345);
    expect(rng.uniqid()).not.toBe(rng.uniqid());
  });

  test('uniqstr', () => {
    const rng = new Rng(12345);
    expect(rng.uniqstr()).not.toBe(rng.uniqstr());
  });

  test('randBetween', () => {
    const rng = new Rng();
    for (let i = 0; i < 100; i++) {
      const r = rng.randBetween(1, 100);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(100);
    }
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

  test('Test shouldThrowOnMaxRecursionsReached returns boolean', () => {
    const rng = new Rng();
    expect(typeof rng.shouldThrowOnMaxRecursionsReached()).toBe('boolean');
  });

  test('Test normal throws on max recursions', () => {
    const rng = new Rng();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockReturnValue(true);
    jest.spyOn(rng, 'boxMuller').mockReturnValue(100);
    expect(() => {
      rng.normal();
    }).toThrow();
    jest.spyOn(rng, 'boxMuller').mockRestore();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockRestore();
  });

  /** Please note if this test becomes impossible to maintain, it's not important, get rid */
  test('Test normal throws on max recursions with specifically crafted values...', () => {
    const rng = new Rng();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockReturnValue(true);
    jest.spyOn(rng, 'boxMuller').mockReturnValue(-0.5);
    expect(() => {
      rng.normal({ mean: 0.1 - Number.EPSILON, max: 0.1, min: 0.1 - (Number.EPSILON * 2) });
    }).toThrow();
    jest.spyOn(rng, 'boxMuller').mockRestore();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockRestore();
  });

  test('Test normal does not throw on max recursions when set not to', () => {
    const rng = new Rng();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockReturnValue(false);
    jest.spyOn(rng, 'boxMuller').mockReturnValue(100);
    expect(() => {
      rng.normal();
    }).not.toThrow();
    jest.spyOn(rng, 'boxMuller').mockRestore();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockRestore();
  });

  test('Test normal does not throw on max recursions when set not to with min and max', () => {
    const rng = new Rng();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockReturnValue(false);
    jest.spyOn(rng, 'boxMuller').mockReturnValue(-0.5);
    expect(() => {
      rng.normal({ mean: 0.1 - Number.EPSILON, max: 0.1, min: 0.1 - (Number.EPSILON * 2) });
    }).not.toThrow();
    jest.spyOn(rng, 'boxMuller').mockRestore();
    jest.spyOn(rng, 'shouldThrowOnMaxRecursionsReached').mockRestore();
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

  test('parseDiceString', () => {
    const expectations = {
      '5d6+6': { n: 5, d: 6, plus: 6 },
      '2d12+1': { n: 2, d: 12, plus: 1 },
      d12: { n: 1, d: 12, plus: 0 },
      '5 d 6 + 6': { n: 5, d: 6, plus: 6 },
    };
    for (const [d, exp] of Object.entries(expectations)) {
      const result = rng.parseDiceString(d);
      expect(result).toEqual(exp);
    }
  });

  test('dice', () => {
    const buildResults = (n : number) => {
      const results = [];
      for (let i = 0; i < (n - 1); i++) {
        results.push(i / (n - 1));
      }
      results.push(1 - Number.EPSILON);
      return results;
    };
    let n = 6;
    prng.results = buildResults(n);
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
    expect(prng.dice('2d6+1')).toBe(4);

    prng.reset();
    expect(prng.dice('1d1+1')).toBe(2);

    n = 12;
    prng.results = buildResults(n);
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

  test('dice - invalid inputs', () => {
    expect(() => {
      rng.dice(null);
    }).toThrow();

    expect(() => {
      // @ts-ignore
      rng.dice(new Set());
    }).toThrow();
  });

  test('clamp', () => {
    expect(rng.clamp(15, 1, 10)).toBe(10);
    expect(rng.clamp(-1, 1, 10)).toBe(1);
  });

  test('bin', () => {
    expect(rng.bin(1.5 - Number.EPSILON, 11, 0, 10)).toBe(1);
    expect(rng.bin(1.5 + Number.EPSILON, 11, 0, 10)).toBe(2);
    expect(rng.bin(9.1, 11, 0, 10)).toBe(9);
    expect(rng.bin(9.7, 11, 0, 10)).toBe(10);
  });

  test('chancyInt', () => {
    const r1 = rng.chancyInt(5.5);
    expect(Number.isInteger(r1)).toBeTruthy();

    const r2 = rng.chancyInt(5);
    expect(r2).toBe(5);
    expect(Number.isInteger(r2)).toBeTruthy();

    const r3 = rng.chancyInt('2d6');
    expect(Number.isInteger(r3)).toBeTruthy();

    const r4 = rng.chancyInt({min: 1, max: 3});
    expect(Number.isInteger(r4)).toBeTruthy();
  });

  test('chancy', () => {
    prng.results = defaultResultSet;
    expect(prng.chancy(5)).toBe(5);
    expect(prng.chancy({ min: 0, max: 10 })).toBe(0);
    expect(prng.chancy({ min: 0, max: 10 })).toBe(1);
    expect(prng.chancy({ min: 0, max: 1 })).toBe(0.2);
  });

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
  });

  test('chancy - normal_integer', () => {
    const results = [];
    const mean = 50;
    for (let i = 0; i < 100000; i++) {
      results.push(rng.chancy({ min: 0, max: 100, type: 'normal_integer' }));
    }
    const sum = results.reduce((a, b) => a + b);
    const calcMean = sum / results.length;

    expect(Math.abs(mean - calcMean)).toBeLessThan(1);
  });

  test('dice max', () => {
    expect(Rng.diceMax({ n: 1, d: 6, plus: 2 })).toBe(8);
    expect(Rng.diceMax('1d6+2')).toBe(8);
    expect(Rng.diceMax('2d6+2')).toBe(14);
    expect(Rng.diceMax('2d6+5')).toBe(17);
    expect(Rng.diceMax({ n: 0, d: 6, plus: 2 })).toBe(2);
  });

  test('dice min', () => {
    expect(Rng.diceMin({ n: 1, d: 6, plus: 2 })).toBe(3);
    expect(Rng.diceMin('1d6+2')).toBe(3);
    expect(Rng.diceMin('2d6+2')).toBe(4);
    expect(Rng.diceMin('2d6+5')).toBe(7);
    expect(Rng.diceMin({ n: 0, d: 6, plus: 2 })).toBe(2);
    expect(Rng.diceMin({ n: 1, d: 6, plus: 0 })).toBe(1);
  });

  test('chancy max', () => {
    expect(Rng.chancyMax('1d6+2')).toBe(8);
    expect(Rng.chancyMax('2d6+2')).toBe(14);
    expect(Rng.chancyMax('2d6+5')).toBe(17);
    expect(Rng.chancyMax(5)).toBe(5);
    expect(Rng.chancyMax({ min: 0, max: 10 })).toBe(10);
    expect(Rng.chancyMax({ mean: 0.5, type: 'normal' })).toBe(Number.POSITIVE_INFINITY);
    expect(Rng.chancyMax({ mean: 0.5, max: 10, type: 'normal' })).toBe(10);
  });

  test('chancy min', () => {
    expect(Rng.chancyMin('1d6+2')).toBe(3);
    expect(Rng.chancyMin('2d6+2')).toBe(4);
    expect(Rng.chancyMin('2d6+5')).toBe(7);
    expect(Rng.chancyMin(5)).toBe(5);
    expect(Rng.chancyMin({ min: 0 })).toBe(0);
    expect(Rng.chancyMin({ min: 0, max: 10 })).toBe(0);
    expect(Rng.chancyMin({ min: 5 })).toBe(5);
    expect(Rng.chancyMin({ min: 5, max: 10 })).toBe(5);
    expect(Rng.chancyMin({ mean: 0.5, type: 'normal' })).toBe(Number.NEGATIVE_INFINITY);
    expect(Rng.chancyMin({ mean: 0.5, max: 10, type: 'normal' })).toBe(Number.NEGATIVE_INFINITY);
    expect(Rng.chancyMin({ mean: 0.5, min: -10, type: 'normal' })).toBe(-10);
  });
});
