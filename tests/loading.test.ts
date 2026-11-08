import { mkdtemp, mkdir, writeFile, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import UltraLoot from '../src/ultraloot';

let directory: string;
beforeEach(async () => { directory = await mkdtemp(path.join(tmpdir(), 'ultraloot-test-')); });
afterEach(async () => { await rm(directory, { recursive: true, force: true }); jest.restoreAllMocks(); });

test('loads absolute files, file URLs, and nested references relative to their documents', async () => {
  await mkdir(path.join(directory, 'nested'));
  await writeFile(path.join(directory, 'root.json'), JSON.stringify({ id: 'root', pools: [{ entries: [{ type: 'table', item: 'nested/child' }] }] }));
  await writeFile(path.join(directory, 'nested/child.json'), JSON.stringify({ id: 'child', pools: [{ entries: [{ type: 'table', item: 'leaf' }] }] }));
  await writeFile(path.join(directory, 'nested/leaf.json'), JSON.stringify({ id: 'leaf', pools: [{ entries: [{ id: 'gold' }] }] }));
  for (const filename of [path.join(directory, 'root.json'), pathToFileURL(path.join(directory, 'root.json')).href]) {
    const table = await new UltraLoot(123).loadTable(filename);
    expect(table!.rollSync()[0].id).toBe('gold');
  }
});

test('preserves the explicitly supplied root path for nested references', async () => {
  await mkdir(path.join(directory, 'nested'));
  await writeFile(path.join(directory, 'nested/root.json'), JSON.stringify({ id: 'root', pools: [{ entries: [{ type: 'table', item: 'leaf' }] }] }));
  await writeFile(path.join(directory, 'leaf.json'), JSON.stringify({ id: 'leaf', pools: [{ entries: [{ id: 'gold' }] }] }));
  expect((await new UltraLoot(123).loadTable('nested/root', { path: directory }))!.rollSync()[0].id).toBe('gold');
});

test('preserves URL schemes and query strings and resolves child URLs', async () => {
  const fetchMock = jest.spyOn(globalThis, 'fetch').mockImplementation(async input => {
    const url = String(input);
    const table = url.includes('child')
      ? { id: 'child', pools: [{ entries: [{ id: 'gold' }] }] }
      : { id: 'root', pools: [{ entries: [{ type: 'table', item: 'child' }] }] };
    return { ok: true, text: async () => JSON.stringify(table) } as Response;
  });
  const table = await new UltraLoot(123).loadTable('https://example.com/tables/root?token=x');
  expect(table!.rollSync()[0].id).toBe('gold');
  expect(fetchMock.mock.calls.map(call => call[0])).toEqual(['https://example.com/tables/root.json?token=x', 'https://example.com/tables/child.json']);
});

test('reports HTTP errors with the URL rather than a JSON parse error', async () => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' } as Response);
  await expect(new UltraLoot(123).loadTable('https://example.com/missing.json')).rejects.toThrow(/404.*missing|missing.*404/);
});

test('detects recursive file references', async () => {
  await writeFile(path.join(directory, 'root.json'), JSON.stringify({ id: 'root', pools: [{ entries: [{ type: 'table', item: 'root' }] }] }));
  await expect(new UltraLoot(123).loadTable(path.join(directory, 'root.json'))).rejects.toThrow(/recursive|cycle/i);
});

test('loads JSON files that exist without an extension', async () => {
  await writeFile(path.join(directory, 'root'), JSON.stringify({ id: 'root', pools: [{ entries: [{ id: 'gold' }] }] }));
  expect((await new UltraLoot(123).loadTable(path.join(directory, 'root'))).rollSync()[0].id).toBe('gold');
});

test('saves and loads a complete graph with RNG state and unique flags', async () => {
  const ul = new UltraLoot(123);
  const leaf = ul.createTable({ id: 'leaf', pools: [{ entries: [{ id: 'gold', unique: true }] }] });
  const root = ul.createTable({ id: 'root', pools: [{ entries: [leaf] }] });
  const filename = await ul.saveTable(root, { path: directory, includeRng: true });
  expect(JSON.parse(await readFile(filename, 'utf8')).tables.leaf).toBeDefined();
  const restored = await new UltraLoot().loadTables(filename);
  expect(restored.root.rollSync()[0].id).toBe('gold');
  expect(restored.leaf.pools[0].entries[0]).toHaveProperty('unique', true);
  await expect(ul.saveTable(root, { path: directory })).rejects.toThrow();
});
