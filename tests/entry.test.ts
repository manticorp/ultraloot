import LootTableEntry from './../src/table/pool/entry';
import LootTableEntryResult from './../src/table/pool/entry/result';
import LootTableEntryResults from './../src/table/pool/entry/results';
import Rng from './../src/rng/predictable';

describe('testing entries and entry results', () => {
  test('Basic instantiation of Entry', () => {
    expect(() => {
      const u = new LootTableEntry({ id: 'test_id' });
      (() => u)(); // avoid eslint error
    }).not.toThrow();
  });

  test('Basic instantiation of LootTableEntryResult', () => {
    expect(() => {
      const u = new LootTableEntryResult({ id: 'test_id' });
      (() => u)(); // avoid eslint error
    }).not.toThrow();
  });

  test('LootTableEntryResult get set qty', () => {
    const u = new LootTableEntryResult({ id: 'test_id' });
    u.setQty(10);
    expect(u.getQty()).toBe(10);
  });

  test('LootTableEntryResult describe', () => {
    const u = new LootTableEntryResult({ id: 'test_id' });
    expect(u.describe()).toMatch(/test_id/);
  });

  test('LootTableEntryResult describe with name', () => {
    const u = new LootTableEntryResult({ name: 'test_name', id: 'test_id' });
    expect(u.describe()).toMatch(/test_name/);
    expect(u.description).toMatch(/test_id/);
  });

  test('Basic instantiation of LootTableEntryResults', () => {
    expect(() => {
      const u = new LootTableEntryResults([new LootTableEntryResult({ id: 'test_id' })]);
      (() => u)(); // avoid eslint error
    }).not.toThrow();
  });

  test('Describe', () => {
    const u = new LootTableEntry({ id: 'test_id' });
    expect(u.describe()).toMatch(/test_id/);
  });

  test('Describe with name', () => {
    const u = new LootTableEntry({ id: 'test_id', name: 'My cool test entry' });
    expect(u.describe()).toMatch(/test_id/);
    expect(u.describe()).toMatch(/My cool test entry/);
  });

  test('Generate result does not throw and has expected id', () => {
    expect(() => {
      const u = new LootTableEntry({ id: 'test_id' });
      const result = u.generateBaseResults(new Rng());
      expect(result[0].id).toBe('test_id');
    }).not.toThrow();
  });

  test('Generate result passes item', () => {
    expect(() => {
      const u = new LootTableEntry({ id: 'test_id', item: 'some_item_id' });
      const result = u.generateBaseResults(new Rng());
      expect(result[0].id).toBe('test_id');
      expect(result[0].item).toBe('some_item_id');
    }).not.toThrow();
  });

  test('Generate result passes clone of item', () => {
    expect(() => {
      const theItem = { foo: { bar: 'baz' } };
      const u = new LootTableEntry({ id: 'test_id', item: theItem });
      const result = u.generateBaseResults(new Rng());

      theItem.foo.bar = 'eggs';

      expect(result[0].id).toBe('test_id');
      expect(result[0].item.foo.bar).toBe('baz');
      expect(theItem.foo.bar).toBe('eggs');
    }).not.toThrow();
  });

  test('Generate result calls clone on item', () => {
    expect(() => {
      const fn = jest.fn(function (item) {
        return JSON.parse(JSON.stringify(item));
      });
      const theItem = { foo: { bar: 'baz' }, clone: fn };
      const u = new LootTableEntry({ id: 'test_id', item: theItem });
      const result = u.generateBaseResults(new Rng());

      theItem.foo.bar = 'eggs';

      expect(result[0].id).toBe('test_id');
      expect(result[0].item.foo.bar).toBe('baz');
      expect(theItem.foo.bar).toBe('eggs');
      expect(fn).toBeCalled();
      expect(fn).toBeCalledWith(theItem);
    }).not.toThrow();
  });

  test('LootTableEntryResults collapsed', () => {
    const u = new LootTableEntryResults([
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 })
    ]);

    const collapsed = u.collapsed();

    expect(collapsed).toHaveLength(3);
  });

  test('LootTableEntryResults collapsed with non-compatible items', () => {
    const u = new LootTableEntryResults([
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', item: { foo: 'bar' }, qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', item: { foo: 'baz' }, qty: 1 })
    ]);

    const collapsed = u.collapsed();

    expect(collapsed).toHaveLength(5);
  });

  test('LootTableEntryResults merged', () => {
    const u = new LootTableEntryResults([
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 })
    ]);

    const t = new LootTableEntryResults([
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_unstackable', qty: 1, stackable: false }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 }),
      new LootTableEntryResult({ id: 'test_stackable', qty: 1 })
    ]);

    const merged = u.merged(t);

    expect(merged).toHaveLength(8);
  });
});
