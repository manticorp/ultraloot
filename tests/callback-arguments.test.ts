import UltraLoot from '../src/ultraloot';

test.each(['sync', 'async'])('table callbacks accept legacy arguments during %s rolls', async mode => {
  const table = new UltraLoot(123).createTable({ pools: [{ entries: [{ id: 'gold', functions: [{ function: 'scale', arguments: { factor: 3 } }], conditions: [{ function: 'allow', arguments: { enabled: true } }] }] }] });
  table.registerFunction('scale', ({ looted, args }) => { looted.qty *= args.factor; });
  table.registerCondition('allow', ({ args }) => args.enabled);
  const result = mode === 'sync' ? table.rollSync() : await table.roll();
  expect(result[0].qty).toBe(3);
});
