import { default as Pool } from './../src/table/pool';
import { default as Entry } from './../src/table/pool/entry';

describe('testing pools', () => {
  test('Basic instantiation', () => {
    expect(() => {
      const u = new Pool();
      (() => u)(); // avoid eslint error
    }).not.toThrow();
  });

  test('Describe', () => {
    const u = new Pool({ id: 'test_id' });
    expect(u.describe()).toMatch(/test_id/);
  });

  test('Describe with name', () => {
    const u = new Pool({ id: 'test_id', name: 'My cool test pool' });
    expect(u.describe()).toMatch(/test_id/);
    expect(u.describe()).toMatch(/My cool test pool/);
  });

  test('Create entry', () => {
    const u = new Pool();
    const entry = u.createEntry({
      id: 'test'
    });
    expect(u.getEntries()[0]).toBe(entry);
    expect(u.getEntries()[0].id).toBe('test');
  });

  test('Create entry with template', () => {
    const name = 'Every Entry Should Have This Name Unless Overridden';
    const u = new Pool({ template: { name } });
    const entry1 = u.createEntry({
      id: 'test1'
    });
    const entry2 = u.createEntry({
      id: 'test2'
    });
    const entry3 = u.createEntry({
      id: 'test3',
      name: 'New Name'
    });
    expect(u.getEntries()[0]).toBe(entry1);
    expect(u.getEntries()[0].id).toBe('test1');
    expect(u.getEntries()[0].name).toBe(name);
    expect(u.getEntries()[0].name).not.toBe('New Name');
    expect(u.getEntries()[1]).toBe(entry2);
    expect(u.getEntries()[1].id).toBe('test2');
    expect(u.getEntries()[1].name).toBe(name);
    expect(u.getEntries()[1].name).not.toBe('New Name');
    expect(u.getEntries()[2]).toBe(entry3);
    expect(u.getEntries()[2].id).toBe('test3');
    expect(u.getEntries()[2].name).not.toBe(name);
    expect(u.getEntries()[2].name).toBe('New Name');
  });

  test('Add entry', () => {
    const u = new Pool();
    const entry = new Entry({
      id: 'test'
    });

    u.addEntry({ id: 'test2' });
    u.addEntry(entry);
    expect(u.getEntries()).toContain(entry);

    const had = u.getEntries().reduce((had, cur) => had || cur.id === 'test2', false);
    expect(had).toBeTruthy();
  });
});
