import LootTableEntry from '../src/table/pool/entry';
import UltraLoot, { RecursiveTableError } from '../src/ultraloot';

test('round trips deep graphs and shared children without changing input', () => {
  const ul = new UltraLoot(123);
  const leaf = ul.createTable({ id: 'leaf', pools: [{ entries: [{ id: 'gold', unique: true }] }] });
  const left = ul.createTable({ id: 'left', pools: [{ entries: [leaf] }] });
  const right = ul.createTable({ id: 'right', pools: [{ entries: [leaf] }] });
  const root = ul.createTable({ id: 'root', pools: [{ entries: [left, right, leaf] }] });
  const saved = ul.serialize(root);
  expect(Object.keys(saved.tables).sort()).toEqual(['leaf', 'left', 'right', 'root']);
  const before = JSON.stringify(saved);
  const restored = ul.unserialize(saved);
  expect(JSON.stringify(saved)).toBe(before);
  expect((restored.left.pools[0].entries[0] as LootTableEntry).getItem()).toBe(restored.leaf);
  expect((restored.right.pools[0].entries[0] as LootTableEntry).getItem()).toBe(restored.leaf);
  expect(restored.leaf.pools[0].entries[0]).toHaveProperty('unique', true);
  expect(restored.root.rollSync()[0].id).toBe('gold');
  expect(Object.keys(ul.unserialize(saved))).toHaveLength(4);
});

test('restores the effective default RNG and the next sequence after rolling', () => {
  const ul = new UltraLoot();
  const table = ul.createTable({ id: 'root', pools: [{ entries: [{ id: 'a' }, { id: 'b' }] }] });
  table.rollSync();
  const saved = JSON.parse(ul.toJson(table, { includeRng: true }));
  const restored = new UltraLoot().unserialize(saved).root;
  expect(Array.from({ length: 20 }, () => restored.rng.random())).toEqual(Array.from({ length: 20 }, () => table.rng.random()));
});

test('serialization does not advance RNG state or change table filenames', () => {
  const ul = new UltraLoot(123);
  const child = ul.createTable({ id: 'child' });
  const table = ul.createTable({ id: 'root', pools: [{ entries: [child] }] });
  const state = ul.getRng().serialize();
  const filename = child.fn;
  ul.serialize(table);
  expect(ul.getRng().serialize()).toEqual(state);
  expect(child.fn).toBe(filename);
});

test('serialization distinguishes tables that use the same filename', () => {
  const ul = new UltraLoot(123);
  const a = ul.createTable({ id: 'same', pools: [{ entries: [{ id: 'a' }] }] });
  const b = ul.createTable({ id: 'same', pools: [{ entries: [{ id: 'b' }] }] });
  const root = ul.createTable({ id: 'root', pools: [{ entries: [a, b] }] });
  expect(Object.keys(ul.serialize(root).tables)).toHaveLength(3);
});

test('rejects real cycles and unresolved references without consuming input', () => {
  const ul = new UltraLoot(123);
  const root = ul.createTable({ id: 'root', pools: [{}] });
  root.pools[0].addEntry(root);
  expect(() => ul.serialize(root)).toThrow(RecursiveTableError);
  const cycle = { __version__: '0.3.0', tables: { root: { id: 'root', pools: [{ entries: [{ type: 'table', item: 'root' }] }] } } };
  const before = JSON.stringify(cycle);
  expect(() => ul.unserialize(cycle)).toThrow(/recursive|cycle/i);
  expect(JSON.stringify(cycle)).toBe(before);
  const missing = { __version__: '0.3.0', tables: { root: { id: 'root', pools: [{ entries: [{ type: 'table', item: 'missing' }] }] } } };
  expect(() => ul.unserialize(missing)).toThrow(/missing/);
});
