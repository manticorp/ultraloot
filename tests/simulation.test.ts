import UltraLoot from '../src/ultraloot';
import Rng from '../src/rng';
import { simulateTable, simulateTableSync } from '../src/simulation';
import type { RollTraceEvent } from '../src/trace';

test('simulation estimates per-roll probability and quantity without advancing the table RNG', async () => {
  const ul = new UltraLoot(123);
  const table = ul.createTable({ id: 'root', pools: [{ nulls: 1, entries: [{ id: 'gold', weight: 1, qty: 2 }] }] });
  const before = table.rng.serialize();
  const result = simulateTableSync(table, { iterations: 10000, seed: 12 });
  expect(Math.abs(result.items[0].probability - 0.5)).toBeLessThan(0.02);
  expect(Math.abs(result.items[0].meanQuantity - 1)).toBeLessThan(0.04);
  expect(result.items[0].probability95[0]).toBeLessThan(result.items[0].probability);
  expect(result.items[0].probability95[1]).toBeGreaterThan(result.items[0].probability);
  expect(result.noDropProbability + result.items[0].probability).toBe(1);
  expect(table.rng.serialize()).toEqual(before);
  expect(await simulateTable(table, { iterations: 10000, seed: 12 })).toEqual(result);
});

test('multiple results for an item count once per roll and traces do not alter outcomes', () => {
  const ul = new UltraLoot(123);
  ul.registerFunction('double', ({ looted }) => { looted.qty *= 2; });
  const table = ul.createTable({ pools: [{ rolls: 3, entries: [{ id: 'gold', functions: [{ function: 'double' }] }] }] });
  const events: RollTraceEvent[] = [];
  const plainRng = new Rng(42);
  const tracedRng = new Rng(42);
  const plain = table.rollSync({ rng: plainRng });
  const traced = table.rollSync({ rng: tracedRng, trace: event => events.push(event) });
  expect(tracedRng.serialize()).toEqual(plainRng.serialize());
  expect(traced).toEqual(plain);
  expect(events.map(event => event.type)).toEqual(expect.arrayContaining(['table:start', 'pool', 'choice', 'modifier', 'table:end']));
  const result = simulateTableSync(table, { iterations: 100 });
  expect(result.items[0].probability).toBe(1);
  expect(result.items[0].meanQuantity).toBe(6);
  expect(result.items[0].rollsFor95Percent).toBe(1);
});

test('simulation validates iteration counts and honours cancellation', () => {
  const table = new UltraLoot(123).createTable({});
  for (const iterations of [0, NaN, 1.5, 1000001]) expect(() => simulateTableSync(table, { iterations })).toThrow();
  const controller = new AbortController(); controller.abort();
  expect(() => simulateTableSync(table, { signal: controller.signal })).toThrow(/aborted/);
});

test('simulation rejects non-finite quantities from a modifier', () => {
  const ul = new UltraLoot(123);
  ul.registerFunction('invalid', ({ looted }) => { looted.qty = Infinity; });
  const table = ul.createTable({ pools: [{ entries: [{ id: 'gold', stackable: true, functions: [{ function: 'invalid' }] }] }] });
  expect(() => simulateTableSync(table, { iterations: 1 })).toThrow(/non-finite quantity/);
});
