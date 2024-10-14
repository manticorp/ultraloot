import * as functions from './../src/default/functions';
import { default as PredictableRng } from './../src/rng/predictable';
import { default as LootTableEntryResult } from './../src/table/pool/entry/result';

describe('testing default functions and conditions', () => {
  test('functions.inheritLooter', () => {
    const looted = new LootTableEntryResult({id: 'test'});
    const looter = { experience: { level: 10 } };
    functions.inheritLooter({
      looter,
      looted,
      args: {
        looterProperty: 'experience.level',
        lootedProperty: 'item.level',
        default: 0
      }
    });

    // @ts-ignore
    expect(looted.item.level).toBe(10);
  });

  test('functions.inheritContext', () => {
    const looted = new LootTableEntryResult({id: 'test'});
    const context = { status: { onfire: true } };
    functions.inheritContext({
      context,
      looted,
      args: {
        contextProperty: 'status.onfire',
        lootedProperty: 'status.onfire',
        default: false
      }
    });

    // @ts-ignore
    expect(looted.status.onfire).toBeTruthy();
  });

  test('functions.setToRandomChoice', () => {
    const looted = new LootTableEntryResult({id: 'test'});
    const rng = new PredictableRng();
    rng.results = [0];

    functions.setToRandomChoice({
      rng,
      looted,
      args: {
        property: 'item.color',
        choices: ['red', 'green', 'blue']
      }
    });

    // @ts-ignore
    expect(looted.item.color).toBe('red');
  });
});
