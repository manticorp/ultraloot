import { UltraLoot, RecursiveTableError } from './../src/ultraloot';
import Rng from './../src/rng';
import PredictableRng from './../src/rng/predictable';
import LootTable from './../src/table';
import LootTablePool from './../src/table/pool';
import LootTableEntry from './../src/table/pool/entry';
import LootTableEntryResult from './../src/table/pool/entry/result';
import LootTableEntryResults from './../src/table/pool/entry/results';

describe('testing ultraloot', () => {
  test('Basic instantiation', () => {
    expect(() => {
      const u = new UltraLoot();
      u.instance();
    }).not.toThrow();
  });

  test('Set and get rng', () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    expect(u.getRng()).toEqual(rng);

    const u2 = new UltraLoot();
    u2.setRng(rng);

    expect(u2.getRng()).toEqual(rng);
  });

  test('Set invalid rng', () => {
    const rng = new Set();
    const u = new UltraLoot();
    expect(() => {
      // @ts-ignore - we are deliberately doing something wrong
      u.setRng(rng);
    }).toThrow();

    const rng2 = false;
    expect(() => {
      // @ts-ignore - we are deliberately doing something wrong
      u.setRng(rng2);
    }).toThrow();
  });

  test('Default RNG works', () => {
    const u = new UltraLoot();

    expect(u.getRng()).not.toBeNull();
    expect(u.getRng()).toBeInstanceOf(Rng);
  });

  test('Setting RNG constructor and getting default RNG', () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    expect(u.getRng()).toEqual(rng);
    expect(u.getRngConstructor()).toEqual(PredictableRng);

    u.setRngConstructor(Rng);
    expect(u.getRngConstructor()).toEqual(Rng);
  });

  test('Register function', () => {
    const u = new UltraLoot();
    const fn = () => {};

    u.registerFunction('my_func', fn);

    expect(u.hasFunction('my_func')).toBeTruthy();
  });

  test('Register condition', () => {
    const u = new UltraLoot();
    const fn = () => {
      return true;
    };

    u.registerCondition('my_func', fn);

    expect(u.hasCondition('my_func')).toBeTruthy();
  });

  test('noThrowOnMissingFunctionsOrConditions', async () => {
    const u = new UltraLoot();

    u.registerFunction('my_func', () => {});
    u.registerCondition('my_func', () => { return true; });

    u.throwOnMissingFunctionsOrConditions();

    const context : {
      rng: Rng,
      looted: LootTableEntryResult,
      looter: null,
      context: null,
      result: LootTableEntryResults,
    } = {
      rng: new Rng(),
      looted: null,
      looter: null,
      context: null,
      result: new LootTableEntryResults(),
    };

    console.error = jest.fn();

    await expect(u.applyFunction({ function: 'my_func' }, context)).resolves.not.toThrow();

    await expect(u.applyFunction({ function: 'my_non_existing_func' }, context)).rejects.toThrow();

    await expect(u.applyCondition({ function: 'my_func' }, context)).resolves.not.toThrow();

    await expect(u.applyCondition({ function: 'my_non_existing_func' }, context)).rejects.toThrow();

    u.noThrowOnMissingFunctionsOrConditions();

    await expect(u.applyFunction({ function: 'my_func' }, context)).resolves.not.toThrow();

    await expect(u.applyFunction({ function: 'my_non_existing_func' }, context)).resolves.not.toThrow();

    await expect(u.applyCondition({ function: 'my_func' }, context)).resolves.not.toThrow();

    await expect(u.applyCondition({ function: 'my_non_existing_func' }, context)).resolves.not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('createTable - most basic setup', () => {
    const u = new UltraLoot();
    let table;

    expect(() => {
      table = u.createTable({
        pools: []
      });
    }).not.toThrow();

    expect(table).toBeInstanceOf(LootTable);
  });

  test('createTable - most basic setup with entries', () => {
    const u = new UltraLoot();

    const table = u.createTable({
      pools: [
        {
          entries: [
            {},
            {}
          ]
        }
      ]
    });

    expect(table).toBeInstanceOf(LootTable);
    return expect(table.roll().then(a => {
      expect(a).toHaveLength(1);
    })).resolves.not.toThrow();
  });

  test('createTable - more advanced setup', () => {
    const u = new UltraLoot();
    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: {
            min: 1,
            max: 2,
          },
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 4,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    expect(table).toBeInstanceOf(LootTable);
    table.pools.forEach((pool) => {
      expect(pool).toBeInstanceOf(LootTablePool);
      pool.entries.forEach((entry) => {
        expect(entry).toBeInstanceOf(LootTableEntry);
      });
    });
  });

  test('createTable - bad setup', () => {
    const u = new UltraLoot();

    expect(() => {
      // @ts-ignore
      u.createTable('bad');
    }).toThrow();

    expect(() => {
      // @ts-ignore
      u.createTable(u.createPool({ id: 'test' }));
    }).toThrow();
  });

  test('createPool', () => {
    const u = new UltraLoot();

    expect(() => {
      u.createPool({ id: 'test' });
    }).not.toThrow();

    expect(() => {
      u.createPool({
        rolls: {
          min: 1,
          max: 2,
        },
        nulls: 0,
        entries: [
          {
            name: 'Gold',
            id: 'gold',
            weight: 1,
          },
          {
            name: 'Silver',
            id: 'silver',
            weight: 2,
          },
          {
            name: 'Bronze',
            id: 'bronze',
            weight: 4,
          }
        ]
      });
    }).not.toThrow();

    expect(() => {
      u.createPool({
        id: 'test',
        entries: [
          {
            name: 'Gold',
            id: 'gold',
            weight: 1,
          },
          {
            name: 'Silver',
            id: 'silver',
            weight: 2,
          },
          {
            name: 'Bronze',
            id: 'bronze',
            weight: 4,
          }
        ]
      });
    }).not.toThrow();
  });

  test('createTable - on the fly', () => {
    const u = new UltraLoot();
    const t = u.createTable({ id: 'test' });
    const p = u.createPool({ id: 'test' });
    const e = u.createEntry({ id: 'test' });
    t.addPool(p);
    p.addEntry(e);

    expect(t.getPools()[0]).toBe(p);
    expect(p.getEntries()[0]).toBe(e);
  });

  test('createTable - on the fly alternate', () => {
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', pools: [p] });

    expect(t.getPools()[0]).toBe(p);
    expect(p.getEntries()[0]).toBe(e);
  });

  test('createTable - loot table entries', () => {
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', pools: [p] });
    const et = u.createEntry(t);

    expect(t.getPools()[0]).toBe(p);
    expect(p.getEntries()[0]).toBe(e);
    expect(et).toBeInstanceOf(LootTableEntry);
  });

  test('createTable - from another table', () => {
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', pools: [p] });
    const t2 = u.createTable(t);

    expect(t.getPools()[0]).toBe(t2.getPools()[0]);
  });

  test('serialize', () => {
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const s = u.serialize(t);

    expect(s).toHaveProperty('tables.test_filename');
  });

  test('serialize with RNG', () => {
    expect.assertions(1);
    const rng = new Rng(123456789);
    const u = new UltraLoot(rng);
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const s = u.serialize(t, { includeRng: true });

    expect(s).toHaveProperty('tables.test_filename');
  });

  test('serialize and unserialize with RNG', () => {
    expect.assertions(4);
    const rng = new Rng(123456789);
    const u = new UltraLoot(rng);
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const s = u.serialize(t, { includeRng: true });

    expect(s).toHaveProperty('tables.test_filename');

    const tables = u.unserialize(s);
    expect(tables).toHaveProperty('test_filename');
    expect(tables.test_filename.rng.getSeed()).toBe(123456789);
    expect(tables.test_filename.rng.sameAs(rng)).toBeTruthy();
  });

  test('serialize deep tables', () => {
    expect.assertions(2);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const et = u.createEntry(t);
    const pd = u.createPool({ id: 'test_deep', entries: [et] });
    const td = u.createTable({ id: 'test_deep', fn: 'test_deep_filename', pools: [pd] });

    const s = u.serialize(td);
    expect(s).toHaveProperty('tables.test_filename');
    expect(s).toHaveProperty('tables.test_deep_filename');
  });

  test('serialize table as entry somehow', () => {
    expect.assertions(2);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const p2 = u.createPool({ id: 'test2', entries: [{ id: 'teste' }] });
    const t2 = u.createTable({ id: 'test', fn: 'test_filename', pools: [p2] });

    p.entries.push(t2);

    const et = u.createEntry(t);
    const pd = u.createPool({ id: 'test_deep', entries: [et] });
    const td = u.createTable({ id: 'test_deep', fn: 'test_deep_filename', pools: [pd] });

    const s = u.serialize(td);
    expect(s).toHaveProperty('tables.test_filename');
    expect(s).toHaveProperty('tables.test_deep_filename');
  });

  test('serialize table recursive issue', () => {
    expect.assertions(1);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const p2 = u.createPool({ id: 'test2', entries: [t] });
    const t2 = u.createTable({ id: 'test', fn: 'test_filename', pools: [p2] });

    p.addEntry(t2);

    const et = u.createEntry(t);
    const pd = u.createPool({ id: 'test_deep', entries: [et] });
    const td = u.createTable({ id: 'test_deep', fn: 'test_deep_filename', pools: [pd] });

    expect(() => {
      u.serialize(td);
    }).toThrow(RecursiveTableError);
  });

  test('serialize and unserialize', () => {
    expect.assertions(2);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const et = u.createEntry(t);
    const pd = u.createPool({ id: 'test_deep', entries: [et] });
    const td = u.createTable({ id: 'test_deep', fn: 'test_deep_filename', pools: [pd] });

    const s = u.serialize(td);
    const tu = u.unserialize(s);
    expect(tu).toHaveProperty('test_filename');
    expect(tu).toHaveProperty('test_deep_filename');
  });

  test('toJson', () => {
    expect.assertions(2);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const s = u.toJson(t)
    expect(s).not.toBeNull();
    expect(typeof s).toBe('string');
  });

  test('save table', async () => {
    expect.assertions(1);
    const u = new UltraLoot();
    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    await expect(u.saveTable(t)).rejects.toThrow();
  });

  test('roll', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('id', 'silver');
      expect(a[3]).toHaveProperty('id', 'bronze');
      expect(a[4]).toHaveProperty('id', 'bronze');
      expect(a[5]).toHaveProperty('id', 'bronze');
    })).resolves.not.toThrow();
  });

  test('roll with pool with loot table', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const e = u.createEntry({ id: 'test' });
    const p = u.createPool({ id: 'test', entries: [e] });
    const t = u.createTable({ id: 'test', fn: 'test_filename', pools: [p] });

    const p2 = u.createPool({ id: 'test2', entries: [{ id: 'teste' }] });
    const t2 = u.createTable({ id: 'test', fn: 'test_filename', pools: [p2] });

    p.entries.push(t2);

    const et = u.createEntry(t);
    const pd = u.createPool({ id: 'test_deep', entries: [et] });
    const td = u.createTable({ id: 'test_deep', fn: 'test_deep_filename', pools: [pd] });

    return (td.roll({ n: 6 }).then(a => {
      expect(a[0]).toHaveProperty('id', 'test');
      expect(a[1]).toHaveProperty('id', 'test');
      expect(a[2]).toHaveProperty('id', 'test');
      expect(a[3]).toHaveProperty('id', 'teste');
      expect(a[4]).toHaveProperty('id', 'teste');
      expect(a[5]).toHaveProperty('id', 'teste');
    }));
  });

  test('roll with nulls', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 6,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    return expect(table.roll({ n: 12 }).then(a => {
      expect(a).toHaveLength(6);
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('id', 'silver');
      expect(a[3]).toHaveProperty('id', 'bronze');
      expect(a[4]).toHaveProperty('id', 'bronze');
      expect(a[5]).toHaveProperty('id', 'bronze');
    })).resolves.not.toThrow();
  });

  test('roll subtable with nulls', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 6,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable({
      pools: [
        {
          rolls: 12,
          entries: [
            pm
          ]
        }
      ]
    });

    return expect(table.roll({ n: 1 }).then(a => {
      expect(a).toHaveLength(6);
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('id', 'silver');
      expect(a[3]).toHaveProperty('id', 'bronze');
      expect(a[4]).toHaveProperty('id', 'bronze');
      expect(a[5]).toHaveProperty('id', 'bronze');
    })).resolves.not.toThrow();
  });

  test('roll with non stackable', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              qty: 2,
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              qty: 2,
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              qty: 2,
              weight: 3,
              stackable: false,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(a).toHaveLength(9);
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[0]).toHaveProperty('qty', 2);
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[1]).toHaveProperty('qty', 2);
      expect(a[2]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('qty', 2);
      expect(a[3]).toHaveProperty('id', 'bronze');
      expect(a[3]).toHaveProperty('qty', 1);
      expect(a[4]).toHaveProperty('id', 'bronze');
      expect(a[4]).toHaveProperty('qty', 1);
      expect(a[5]).toHaveProperty('id', 'bronze');
      expect(a[5]).toHaveProperty('qty', 1);
      expect(a[6]).toHaveProperty('id', 'bronze');
      expect(a[6]).toHaveProperty('qty', 1);
      expect(a[7]).toHaveProperty('id', 'bronze');
      expect(a[7]).toHaveProperty('qty', 1);
      expect(a[8]).toHaveProperty('id', 'bronze');
      expect(a[8]).toHaveProperty('qty', 1);
    })).resolves.not.toThrow();
  });

  test('roll with pool conditions', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          conditions: [
            {
              function: 'test'
            }
          ],
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              qty: 2,
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              qty: 2,
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              qty: 2,
              weight: 3,
              stackable: false,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(() => true);
    table.registerCondition('test', cond);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(a).toHaveLength(9);
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[0]).toHaveProperty('qty', 2);
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[1]).toHaveProperty('qty', 2);
      expect(a[2]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('qty', 2);
      expect(a[3]).toHaveProperty('id', 'bronze');
      expect(a[3]).toHaveProperty('qty', 1);
      expect(a[4]).toHaveProperty('id', 'bronze');
      expect(a[4]).toHaveProperty('qty', 1);
      expect(a[5]).toHaveProperty('id', 'bronze');
      expect(a[5]).toHaveProperty('qty', 1);
      expect(a[6]).toHaveProperty('id', 'bronze');
      expect(a[6]).toHaveProperty('qty', 1);
      expect(a[7]).toHaveProperty('id', 'bronze');
      expect(a[7]).toHaveProperty('qty', 1);
      expect(a[8]).toHaveProperty('id', 'bronze');
      expect(a[8]).toHaveProperty('qty', 1);
    })).resolves.not.toThrow();
  });

  test('roll with pool false conditions', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          conditions: [
            {
              function: 'test'
            }
          ],
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              qty: 2,
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              qty: 2,
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              qty: 2,
              weight: 3,
              stackable: false,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(() => false);
    table.registerCondition('test', cond);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(a).toHaveLength(0);
    })).resolves.not.toThrow();
  });

  test('roll with entry false conditions', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ]
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
              conditions: [
                {
                  function: 'test'
                }
              ]
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
              conditions: [
                {
                  function: 'test'
                }
              ]
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(() => false);
    table.registerCondition('test', cond);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(a).toHaveLength(0);
    })).resolves.not.toThrow();
  });

  test('roll with entry true conditions', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ]
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
              conditions: [
                {
                  function: 'test'
                }
              ]
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
              conditions: [
                {
                  function: 'test'
                }
              ]
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(() => true);
    table.registerCondition('test', cond);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });

  test('roll with entry false and true conditions', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'testtrue'
                },
                {
                  function: 'testfalse'
                }
              ]
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
              conditions: [
                {
                  function: 'testtrue'
                },
                {
                  function: 'testfalse'
                }
              ]
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
              conditions: [
                {
                  function: 'testtrue'
                },
                {
                  function: 'testfalse'
                }
              ]
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const condtrue = jest.fn(() => true);
    table.registerCondition('testtrue', condtrue);
    const condfalse = jest.fn(() => false);
    table.registerCondition('testfalse', condfalse);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(condfalse).toBeCalled();
      expect(a).toHaveLength(0);
    })).resolves.not.toThrow();
  });

  test('roll with collapsed result', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    return expect(table.roll({ n: 12 }).then(a => a.collapsed()).then(a => {
      expect(a).toHaveLength(3);
      expect(a[0]).toHaveProperty('id', 'gold');
      expect(a[1]).toHaveProperty('id', 'silver');
      expect(a[2]).toHaveProperty('id', 'bronze');
    })).resolves.not.toThrow();
  });

  test('roll with function', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ],
              functions: [
                {
                  function: 'test'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(() => true);
    const func = jest.fn(() => null);
    table.registerCondition('test', cond);
    table.registerFunction('test', func);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(func).toBeCalled();
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });

  test('roll with function gets passed arguments', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const funcArgs = { args: { foo: 'bar' } };

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              functions: [
                {
                  function: 'test',
                  args: funcArgs
                }
              ],
            },
          ]
        }
      ],
    };

    expect.assertions(9);
    const table = u.createTable(pm);
    const func = jest.fn(({ args }) => {
      expect(args).toBe(funcArgs);
    });
    table.registerFunction('test', func);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(func).toBeCalled();
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });

  test('roll with function is passed correct parameters', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ],
              functions: [
                {
                  function: 'test'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const looter = { id: 'looter' };
    const context = { id: 'context' };
    const table = u.createTable(pm);
    const cond = jest.fn(() => true);
    const func = jest.fn(({ rng, looted, looter, context }) => {
      expect(rng).toBe(rng);
      expect(looter).toHaveProperty('id', 'looter');
      expect(context).toHaveProperty('id', 'context');
      expect(looted).toHaveProperty('id', 'gold');
    });
    table.registerCondition('test', cond);
    table.registerFunction('test', func);

    return expect(table.roll({ n: 6, looter, context }).then(a => {
      expect(cond).toBeCalledTimes(6);
      expect(func).toBeCalledTimes(1);
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });

  test('roll with function and condition on borrowed tables', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ],
              functions: [
                {
                  function: 'test'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    parent.registerCondition('test', cond);
    parent.registerFunction('test', func);

    return expect(parent.roll({ n: 6 }).then(a => {
      expect(a).toHaveLength(6);
      expect(cond).toBeCalledTimes(6);
      expect(func).toBeCalledTimes(1);
    })).resolves.not.toThrow();
  });

  test('roll with function and condition on pool', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          conditions: [
            {
              function: 'test'
            }
          ],
          functions: [
            {
              function: 'test'
            }
          ],
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    u.registerCondition('test', cond);
    u.registerFunction('test', func);

    return expect(parent.roll({ n: 6 }).then(a => {
      expect(a).toHaveLength(6);
      expect(cond).toBeCalledTimes(6);
      expect(func).toBeCalledTimes(6);
    })).resolves.not.toThrow();
  });

  test('roll with function and condition on ultraloot', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ],
              functions: [
                {
                  function: 'test'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    u.registerCondition('test', cond);
    u.registerFunction('test', func);

    return expect(parent.roll({ n: 6 }).then(a => {
      expect(a).toHaveLength(6);
      expect(cond).toBeCalledTimes(6);
      expect(func).toBeCalledTimes(1);
    })).resolves.not.toThrow();
  });

  test('roll with missing function', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cn_7346867432'
                }
              ],
              functions: [
                {
                  function: 'test_fn_45162764547'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    // const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    // u.registerCondition('test_cn_7346867432', cond);
    u.registerFunction('test_fn_45162764547', func);

    return expect(parent.roll({ n: 6 })).rejects.toThrow();
  });

  test('roll with missing condition', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cn_347439864'
                }
              ],
              functions: [
                {
                  function: 'test_fun_7863478634'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    const cond = jest.fn(() => true);
    // const func = jest.fn(() => {});
    u.registerCondition('test_cn_347439864', cond);
    // u.registerFunction('test_fun_7863478634', func);

    return expect(parent.roll({ n: 6 })).rejects.toThrow();
  });

  test('roll no throw with missing condition', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cond_478634678'
                }
              ],
              functions: [
                {
                  function: 'test_fn_76467483'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    u.noThrowOnMissingFunctionsOrConditions();

    const cond = jest.fn(() => true);
    // const func = jest.fn(() => {});
    u.registerCondition('test_cond_478634678', cond);
    // u.registerFunction('test_fn_76467483', func);

    console.error = jest.fn();
    await expect(parent.roll({ n: 6 })).resolves.not.toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('roll no throw with missing function', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cond_1475368453678'
                }
              ],
              functions: [
                {
                  function: 'test_fn_4787586486'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);

    const parent = u.createTable({
      name: 'Parent',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [table]
        }
      ],
    });

    u.noThrowOnMissingFunctionsOrConditions();

    // const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    // u.registerCondition('test_cond_1475368453678', cond);
    u.registerFunction('test_fn_4787586486', func);

    console.error = jest.fn();
    await expect(parent.roll({ n: 6 })).resolves.not.toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('roll console error with missing function and no ultraloot', async () => {
    const rng = new PredictableRng();

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        new LootTablePool({
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              functions: [
                {
                  function: 'test_func_doesnt_exist_18756'
                }
              ],
            },
          ]
        })
      ],
    };
    const table = new LootTable(pm);

    const parent = new LootTable({
      name: 'Parent',
      pools: [
        new LootTablePool({
          rolls: 1,
          nulls: 0,
          entries: [table]
        })
      ],
    });
    parent.setRng(rng);

    console.error = jest.fn();
    await expect(parent.roll({ rng, n: 6 })).resolves.not.toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('roll console error with missing condition and no ultraloot', async () => {
    const rng = new PredictableRng();

    rng.setEvenSpread(12);

    const pm = {
      name: 'Precious Metals',
      pools: [
        new LootTablePool({
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test'
                }
              ],
            },
          ]
        })
      ],
    };
    const table = new LootTable(pm);

    const parent = new LootTable({
      name: 'Parent',
      pools: [
        new LootTablePool({
          rolls: 1,
          nulls: 0,
          entries: [table]
        })
      ],
    });
    parent.setRng(rng);

    console.error = jest.fn();
    await expect(parent.roll({ rng, n: 6 })).resolves.not.toThrow();
    expect(console.error).toHaveBeenCalled();
  });

  test('unique entry does not get returned twice', async () => {
    const rng = new PredictableRng();

    rng.results = [0.1];

    const goldEntry = new LootTableEntry({
      id: 'gold',
      unique: false
    });

    const pmnu = {
      name: 'Precious Metals',
      pools: [
        new LootTablePool({
          rolls: 10,
          nulls: 0,
          entries: [
            goldEntry,
            {
              id: 'silver',
              unique: false
            }
          ]
        })
      ],
    };
    const tablenu = new LootTable(pmnu);
    tablenu.setRng(rng);

    await expect(tablenu.roll({ n: 1 }).then(a => {
      expect(a).toHaveLength(10);
      expect(a[0].id).toBe('gold');
      expect(a[1].id).toBe('gold');
      expect(a[2].id).toBe('gold');
      expect(a[3].id).toBe('gold');
      expect(a[4].id).toBe('gold');
      expect(a[5].id).toBe('gold');
      expect(a[6].id).toBe('gold');
      expect(a[7].id).toBe('gold');
      expect(a[8].id).toBe('gold');
      expect(a[9].id).toBe('gold');
    })).resolves.not.toThrow();

    goldEntry.unique = true;

    return expect(tablenu.roll({ n: 1 }).then(b => {
      expect(b).toHaveLength(10);
      expect(b[0].id).toBe('gold');
      expect(b[1].id).toBe('silver');
      expect(b[2].id).toBe('silver');
      expect(b[3].id).toBe('silver');
      expect(b[4].id).toBe('silver');
      expect(b[5].id).toBe('silver');
      expect(b[6].id).toBe('silver');
      expect(b[7].id).toBe('silver');
      expect(b[8].id).toBe('silver');
      expect(b[9].id).toBe('silver');
    })).resolves.not.toThrow();
  });

  test('roll with async condition', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cn_5347682345786'
                }
              ],
              functions: [
                {
                  function: 'test_fn_54387658476'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(async () => true);
    const func = jest.fn(async () => null);
    table.registerCondition('test_cn_5347682345786', cond);
    table.registerFunction('test_fn_54387658476', func);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(func).toBeCalled();
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });

  test('roll with async condition returning false', async () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(6);

    const pm = {
      name: 'Precious Metals',
      pools: [
        {
          rolls: 1,
          nulls: 0,
          entries: [
            {
              name: 'Gold',
              id: 'gold',
              weight: 1,
              conditions: [
                {
                  function: 'test_cn_56789'
                }
              ],
              functions: [
                {
                  function: 'test_fn_12345'
                }
              ],
            },
            {
              name: 'Silver',
              id: 'silver',
              weight: 2,
            },
            {
              name: 'Bronze',
              id: 'bronze',
              weight: 3,
            }
          ]
        }
      ],
    };
    const table = u.createTable(pm);
    const cond = jest.fn(async () => false);
    const func = jest.fn(async () => null);
    table.registerCondition('test_cn_56789', cond);
    table.registerFunction('test_fn_12345', func);

    return expect(table.roll({ n: 6 }).then(a => {
      expect(cond).toBeCalled();
      expect(func).not.toBeCalled();
      expect(a).toHaveLength(6);
    })).resolves.not.toThrow();
  });
});
