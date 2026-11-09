import UltraLoot from '../src/ultraloot';

test.each(['sync', 'async'])('table callbacks accept legacy arguments during %s rolls', async mode => {
  const table = new UltraLoot(123).createTable({ pools: [{ entries: [{ id: 'gold', functions: [{ function: 'scale', arguments: { factor: 3 } }], conditions: [{ function: 'allow', arguments: { enabled: true } }] }] }] });
  table.registerFunction('scale', ({ looted, args }) => { looted.qty *= args.factor; });
  table.registerCondition('allow', ({ args }) => args.enabled);
  const result = mode === 'sync' ? table.rollSync() : await table.roll();
  expect(result[0].qty).toBe(3);
});

describe.each(['sync', 'async'])('%s callback payloads', mode => {
  test.each(['global', 'table'])('preserves arrays, scalars, nulls and object alias merging in %s callbacks', async scope => {
    for (const [args, legacy, expected] of [[3, undefined, 3], [[1, 2], undefined, [1, 2]], [null, undefined, null], [{ factor: 3 }, { factor: 1, extra: true }, { factor: 3, extra: true }]]) {
      const ul = new UltraLoot(123);
      const table = ul.createTable({ pools: [{ entries: [{ id: 'gold', functions: [{ function: 'inspect', args, arguments: legacy }], conditions: [{ function: 'allow', args, arguments: legacy }] }] }] });
      const registry = scope === 'global' ? ul : table;
      registry.registerFunction('inspect', value => { expect(value.args).toEqual(expected); expect(Array.isArray(value.args)).toBe(Array.isArray(expected)); });
      registry.registerCondition('allow', value => { expect(value.args).toEqual(expected); return true; });
      expect(mode === 'sync' ? table.rollSync() : await table.roll()).toHaveLength(1);
    }
  });
});
