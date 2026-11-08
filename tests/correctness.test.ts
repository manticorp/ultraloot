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

