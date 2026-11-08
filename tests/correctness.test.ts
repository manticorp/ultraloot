import UltraLoot from '../src/ultraloot';
import LootTableEntryResult from '../src/table/pool/entry/result';
import LootTableEntryResults from '../src/table/pool/entry/results';

describe.each(['sync', 'async'])('%s drop correctness', mode => {
  test('unique-only pools stop after their entries are exhausted', async () => {
    const table = new UltraLoot(123).createTable({ pools: [{ rolls: 3, entries: [{ id: 'one', unique: true }] }] });
    const result = mode === 'sync' ? table.rollSync() : await table.roll();
    expect(Array.from(result, entry => entry.id)).toEqual(['one']);
  });

  test('zero-weight entries do not drop', async () => {
    const table = new UltraLoot(123).createTable({ pools: [{ entries: [{ id: 'disabled', weight: 0 }] }] });
    expect(mode === 'sync' ? table.rollSync() : await table.roll()).toHaveLength(0);
  });

  test('pool functions observe previously processed results in roll order', async () => {
    const ul = new UltraLoot(123);
    ul.registerFunction('ordinal', ({ looted, result }) => { looted.qty = result.length + 1; });
    const table = ul.createTable({ pools: [{ rolls: 3, functions: [{ function: 'ordinal' }], entries: [{ id: 'one' }] }] });
    const result = mode === 'sync' ? table.rollSync() : await table.roll();
    expect(Array.from(result, entry => entry.qty)).toEqual([1, 2, 3]);
  });
});

test.each([0, ''])('accepts the valid falsy seed %p', seed => {
  const a = new UltraLoot(seed);
  const b = new UltraLoot(seed);
  expect(a.getRng().getSeed()).toBe(0);
  expect(a.getRng().random()).toBe(b.getRng().random());
});

test('collapsed results do not change the source or previous results', () => {
  const source = new LootTableEntryResults([
    new LootTableEntryResult({ id: 'gold', qty: 1 }),
    new LootTableEntryResult({ id: 'gold', qty: 1 })
  ]);
  const first = source.collapsed();
  const second = source.collapsed();
  expect(Array.from(source, entry => entry.qty)).toEqual([1, 1]);
  expect(first[0].qty).toBe(2);
  expect(second[0].qty).toBe(2);
  expect(first[0]).not.toBe(second[0]);
});

test('result collections keep their methods after native array operations', () => {
  const source = new LootTableEntryResults([new LootTableEntryResult({ id: 'gold' })]);
  const selected = source.filter(entry => entry.id === 'gold');
  expect(selected).toBeInstanceOf(LootTableEntryResults);
  const sliced = selected.slice();
  expect(sliced).toBeInstanceOf(LootTableEntryResults);
  if (!(sliced instanceof LootTableEntryResults)) throw new Error('Result methods were lost');
  expect(sliced.collapsed()[0].qty).toBe(1);
  expect(new LootTableEntryResults(2)).toHaveLength(2);
});

test.each(['global', 'table'])('sync rolls reject %s async callbacks before invoking them', scope => {
  const ul = new UltraLoot(123);
  let invoked = false;
  const fn = async () => { invoked = true; };
  const table = ul.createTable({ pools: [{ entries: [{ id: 'gold', functions: [{ function: 'async' }] }] }] });
  (scope === 'global' ? ul : table).registerFunction('async', fn);
  expect(() => table.rollSync()).toThrow(/sync/i);
  expect(invoked).toBe(false);
});

test('sync rolls reject thenables returned by ordinary callbacks', () => {
  const ul = new UltraLoot(123);
  ul.registerFunction('promise', () => Promise.resolve());
  const table = ul.createTable({ pools: [{ entries: [{ functions: [{ function: 'promise' }] }] }] });
  expect(() => table.rollSync()).toThrow(/sync/i);
});

test('table-specific falsy seeds work without mutating the definition', () => {
  const ul = new UltraLoot(123);
  const definition = Object.freeze({ rng: 0, id: 'root', pools: [] });
  expect(ul.createTable(definition).rng.getSeed()).toBe(0);
});

test('failed nested rolls release inherited callback state', async () => {
  const ul = new UltraLoot(123);
  const child = ul.createTable({ pools: [{ entries: [{ functions: [{ function: 'fail' }] }] }] });
  const parent = ul.createTable({ pools: [{ entries: [child] }] });
  parent.registerFunction('fail', () => { throw new Error('failure'); });
  expect(() => parent.rollSync()).toThrow('failure');
  expect(child.borrowed.size).toBe(0);
  await expect(parent.roll()).rejects.toThrow('failure');
  expect(child.borrowed.size).toBe(0);
});
