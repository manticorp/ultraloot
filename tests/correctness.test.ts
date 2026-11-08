import UltraLoot from '../src/ultraloot';

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


});

test.each([0, ''])('accepts the valid falsy seed %p', seed => {
  const a = new UltraLoot(seed);
  const b = new UltraLoot(seed);
  expect(a.getRng().getSeed()).toBe(0);
  expect(a.getRng().random()).toBe(b.getRng().random());
});

test('table-specific falsy seeds work without mutating the definition', () => {
  const ul = new UltraLoot(123);
  const definition = Object.freeze({ rng: 0, id: 'root', pools: [] });
  expect(ul.createTable(definition).rng.getSeed()).toBe(0);
});

