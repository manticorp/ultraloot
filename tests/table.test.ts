import { UltraLoot } from './../src/ultraloot';
import { default as Table } from './../src/table';

describe('testing tables', () => {
  test('Basic instantiation', () => {
    expect(() => {
      const t = new Table();
      (() => t)(); // avoid eslint error
    }).not.toThrow();
  });

  test('get set ultraloot', () => {
    const t = new Table({ id: 'test_id' });
    const u = new UltraLoot();
    t.ultraloot = u;
    expect(t.ultraloot).toBe(u);
  });

  test('Describe', () => {
    const t = new Table({ id: 'test_id' });
    expect(t.describe()).toMatch(/test_id/);
  });

  test('Describe with name', () => {
    const t = new Table({ id: 'test_id', name: 'My cool test pool' });
    expect(t.describe()).toMatch(/test_id/);
    expect(t.describe()).toMatch(/My cool test pool/);
  });

  test('Register and has function', () => {
    const t = new Table();
    const fn = jest.fn(() => {});
    t.registerFunction('test', fn);
    expect(t.hasFunction({ function: 'test' })).toBeTruthy();
  });

  test('Register and has function from borrowed table', () => {
    const t = new Table();
    const fn = jest.fn(() => {});
    t.registerFunction('test', fn);

    const u = new Table();
    u.borrow(t);

    expect(u.hasFunction({ function: 'test' })).toBeTruthy();
  });

  test('Register and has condition', () => {
    const t = new Table();
    const fn = jest.fn(() => true);
    t.registerCondition('test', fn);
    expect(t.hasCondition({ function: 'test' })).toBeTruthy();
  });

  test('Register and has condition from borrowed table', () => {
    const t = new Table();
    const fn = jest.fn(() => true);
    t.registerCondition('test', fn);

    const u = new Table();
    u.borrow(t);

    expect(u.hasCondition({ function: 'test' })).toBeTruthy();
  });

  test('Create pool', () => {
    const t = new Table();
    const u = new UltraLoot();
    t.ul = u;
    expect(() => {
      const p = t.createPool({ id: 'test' });
      expect(p).toHaveProperty('id', 'test');
    }).not.toThrow();
  });

  test('Create pool with entries', () => {
    const t = new Table();
    const u = new UltraLoot();
    t.ul = u;
    expect(() => {
      const p = t.createPool({ id: 'test', entries: [{ id: 'test' }] });
      expect(p).toHaveProperty('id', 'test');
      expect(p.getEntries()).toHaveLength(1);
    }).not.toThrow();
  });

  test('Add pool', () => {
    const t = new Table();
    const u = new UltraLoot();
    t.ul = u;
    expect(() => {
      t.addPool({ id: 'test', entries: [{ id: 'test' }] });
      expect(t.getPools()).toHaveLength(1);
    }).not.toThrow();
  });
});
