import UltraLoot from '../src/ultraloot';

test('concurrent rolls keep parent callbacks isolated across a shared child', async () => {
  const ul = new UltraLoot(123);
  const child = ul.createTable({ pools: [{ entries: [{ id: 'gold', functions: [{ function: 'mark' }], conditions: [{ function: 'allowed' }] }] }] });
  const parents = ['A', 'B'].map(name => {
    const table = ul.createTable({ id: name, pools: [{ entries: [child] }] });
    table.registerFunction('mark', async ({ looted }) => { await Promise.resolve(); looted.name = name; });
    table.registerCondition('allowed', async () => { await Promise.resolve(); return true; });
    return table;
  });
  const results = await Promise.all(parents.map(table => table.roll()));
  expect(results.map(result => result[0].name)).toEqual(['A', 'B']);
  expect(child.borrowed.size).toBe(0);
});

test('nested scopes keep nearest-parent precedence without leaking after failures', async () => {
  const ul = new UltraLoot(123);
  const child = ul.createTable({ pools: [{ entries: [{ functions: [{ function: 'mark' }] }] }] });
  const middle = ul.createTable({ pools: [{ entries: [child] }] });
  middle.registerFunction('mark', ({ looted }) => { looted.name = 'middle'; });
  const root = ul.createTable({ pools: [{ entries: [middle] }] });
  root.registerFunction('mark', () => { throw new Error('wrong parent'); });
  expect((await root.roll())[0].name).toBe('middle');
  expect(root.rollSync()[0].name).toBe('middle');
  expect(child.borrowed.size).toBe(0);
});
