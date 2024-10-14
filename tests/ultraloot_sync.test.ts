import { UltraLoot, RecursiveTableError } from './../src/ultraloot';
import Rng from './../src/rng';
import PredictableRng from './../src/rng/predictable';
import LootTable from './../src/table';
import LootTablePool from './../src/table/pool';
import LootTableEntry from './../src/table/pool/entry';
import LootTableEntryResult from './../src/table/pool/entry/result';
import LootTableEntryResults from './../src/table/pool/entry/results';

describe('testing ultraloot in a sync fashion', () => {

  test('noThrowOnMissingFunctionsOrConditions', () => {
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

    expect(() => {
      u.applyFunctionSync({ function: 'my_func' }, context);
    }).not.toThrow();

    expect(() => {
      u.applyFunctionSync({ function: 'my_non_existing_func' }, context);
    }).toThrow();

    expect(() => {
      u.applyConditionSync({ function: 'my_func' }, context);
    }).not.toThrow();

    expect(() => {
      u.applyConditionSync({ function: 'my_non_existing_func' }, context);
    }).toThrow();

    u.noThrowOnMissingFunctionsOrConditions();

    expect(() => {
      u.applyFunctionSync({ function: 'my_func' }, context);
    }).not.toThrow();

    expect(() => {
      u.applyFunctionSync({ function: 'my_non_existing_func' }, context);
    }).not.toThrow();

    expect(() => {
      u.applyConditionSync({ function: 'my_func' }, context);
    }).not.toThrow();

    expect(() => {
      u.applyConditionSync({ function: 'my_non_existing_func' }, context);
    }).not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('roll', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(a[0]).toHaveProperty('id', 'gold');
    expect(a[1]).toHaveProperty('id', 'silver');
    expect(a[2]).toHaveProperty('id', 'silver');
    expect(a[3]).toHaveProperty('id', 'bronze');
    expect(a[4]).toHaveProperty('id', 'bronze');
    expect(a[5]).toHaveProperty('id', 'bronze');
  });

  test('roll with pool with loot table', () => {
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

    const a = td.rollSync({ n: 6 });
    expect(a[0]).toHaveProperty('id', 'test');
    expect(a[1]).toHaveProperty('id', 'test');
    expect(a[2]).toHaveProperty('id', 'test');
    expect(a[3]).toHaveProperty('id', 'teste');
    expect(a[4]).toHaveProperty('id', 'teste');
    expect(a[5]).toHaveProperty('id', 'teste');
  });

  test('roll with nulls', () => {
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

    const a = table.rollSync({ n: 12 });
    expect(a).toHaveLength(6);
    expect(a[0]).toHaveProperty('id', 'gold');
    expect(a[1]).toHaveProperty('id', 'silver');
    expect(a[2]).toHaveProperty('id', 'silver');
    expect(a[3]).toHaveProperty('id', 'bronze');
    expect(a[4]).toHaveProperty('id', 'bronze');
    expect(a[5]).toHaveProperty('id', 'bronze');
  });

  test('sync roll with non stackable', () => {
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

    const a = table.rollSync({ n: 6 });

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
  });

  test('roll with pool conditions', () => {
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

    const a = table.rollSync({ n: 6 });
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
  });

  test('roll with pool false conditions', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(cond).toBeCalled();
    expect(a).toHaveLength(0);
  });

  test('roll with entry true conditions', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(cond).toBeCalled();
    expect(a).toHaveLength(6);
  });

  test('roll with entry false conditions', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(cond).toBeCalled();
    expect(a).toHaveLength(0);
  });

  test('roll with entry true and false conditions', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(condfalse).toBeCalled();
    expect(a).toHaveLength(0);
  });

  test('roll with collapsed result', () => {
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

    const a = table.rollSync({ n: 12 }).collapsed();
    expect(a).toHaveLength(3);
    expect(a[0]).toHaveProperty('id', 'gold');
    expect(a[1]).toHaveProperty('id', 'silver');
    expect(a[2]).toHaveProperty('id', 'bronze');
  });

  test('roll with function', () => {
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

    const a = table.rollSync({ n: 6 });
    expect(cond).toBeCalled();
    expect(func).toBeCalled();
    expect(a).toHaveLength(6);
  });

  test('roll with function is passed correct parameters', () => {
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

    const a = table.rollSync({ n: 6, looter, context });
    expect(cond).toBeCalledTimes(6);
    expect(func).toBeCalledTimes(1);
    expect(a).toHaveLength(6);
  });

  test('roll with function and condition on borrowed tables', () => {
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

    const a = parent.rollSync({ n: 6 });
    expect(a).toHaveLength(6);
    expect(cond).toBeCalled();
    expect(func).toBeCalled();
  });

  test('roll with function and condition on ultraloot', () => {
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

    const a = parent.rollSync({ n: 6 });
    expect(a).toHaveLength(6);
    expect(cond).toBeCalled();
    expect(func).toBeCalled();
  });

  test('roll with function and condition on pool', () => {
    const rng = new PredictableRng();
    const u = new UltraLoot(rng);

    rng.setEvenSpread(12);

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

    const a = parent.rollSync({ n: 6 });
    expect(a).toHaveLength(6);
    expect(cond).toBeCalledTimes(6);
    expect(func).toBeCalledTimes(6);
  });

  test('roll with missing function', () => {
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

    // const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    // u.registerCondition('test', cond);
    u.registerFunction('test', func);

    expect(() => {
      parent.rollSync({ n: 6 });
    }).toThrow();
  });

  test('roll with missing condition', () => {
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
    // const func = jest.fn(() => {});
    u.registerCondition('test', cond);
    // u.registerFunction('test', func);


    expect(() => {
      parent.rollSync({ n: 6 });
    }).toThrow();
  });

  test('roll no throw with missing condition', () => {
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

    u.noThrowOnMissingFunctionsOrConditions();

    const cond = jest.fn(() => true);
    // const func = jest.fn(() => {});
    u.registerCondition('test', cond);
    // u.registerFunction('test', func);

    console.error = jest.fn();

    expect(() => {
      parent.rollSync({ n: 6 });
    }).not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('roll no throw with missing function', () => {
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

    u.noThrowOnMissingFunctionsOrConditions();

    // const cond = jest.fn(() => true);
    const func = jest.fn(() => {});
    // u.registerCondition('test', cond);
    u.registerFunction('test', func);

    console.error = jest.fn();

    expect(() => {
      parent.rollSync({ n: 6 });
    }).not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('sync roll console error with missing function and no ultraloot', () => {
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
                  function: 'test'
                }
              ],
            },
          ]
        })
      ],
    };
    const table = new LootTable(pm);
    table.setRng(rng);

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

    console.error = jest.fn();

    expect(() => {
      parent.rollSync({ n: 6 });
    }).not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('sync roll console error with missing condition and no ultraloot', () => {
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

    expect(() => {
      parent.rollSync({ n: 6 });
    }).not.toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  test('sync unique entry does not get returned twice', () => {
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

    const a = tablenu.rollSync({ n: 1 });
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

    goldEntry.unique = true;

    const b = tablenu.rollSync({ n: 1 });
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
  });
});
