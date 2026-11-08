import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const rng = pkg.name.endsWith('/gamerng');
const directory = await mkdtemp(join(tmpdir(), 'game-package-'));
const env = { ...process.env, npm_config_cache: join(directory, 'npm-cache') };
const run = (command, args, cwd = directory) => execFileSync(command, args, { cwd, env, stdio: 'pipe', encoding: 'utf8' });
try {
  const packed = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', directory], root));
  await writeFile(join(directory, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  run('npm', ['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', join(directory, packed[0].filename)]);
  const named = rng ? 'GameRng, PredictableRng' : 'UltraLoot, LootTable, validateTable';
  const esm = `import Main, { ${named} } from '${pkg.name}';\nconst instance = new Main(0);\nconsole.log(instance);\n`;
  const cjs = `import { ${named} } from '${pkg.name}';\nconsole.log(new ${rng ? 'GameRng' : 'UltraLoot'}(0));\n`;
  const typed = `
import { TypedUltraLoot } from '${pkg.name}';
type Item = { power: number };
const sync = new TypedUltraLoot<Item, {level:number}, {zone:string}, {scale:{factor:number}}, {}>('sync');
sync.registerFunction('scale', ({looted,args}) => { looted.item!.power *= args.factor; });
// @ts-expect-error sync callbacks cannot be async
sync.registerFunction('scale', async () => {});
// @ts-expect-error callback args must match the declared registry
sync.createTable({pools:[{entries:[{functions:[{function:'scale',args:{factor:'bad'}}]}]}]});
const table = sync.createTable({pools:[{entries:[{item:{power:1}}]}]});
table.rollSync({looter:{level:1},context:{zone:'forest'}})[0].item!.power.toFixed();
// @ts-expect-error looter shape must match
table.rollSync({looter:{level:'bad'},context:{zone:'forest'}});
`;
  await writeFile(join(directory, 'consumer.mts'), esm + (rng ? '' : typed));
  await writeFile(join(directory, 'consumer.cts'), cjs);
  run(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '--strict', '--noEmit', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', '--target', 'ES2022', 'consumer.mts', 'consumer.cts']);

  await writeFile(join(directory, 'esm.mjs'), `
    import assert from 'node:assert/strict';
    import Main, * as lib from '${pkg.name}';
    const value = new Main(0);
    ${rng
? `
      assert.equal(typeof lib.GameRng, 'function');
      assert.ok(Number.isFinite(value.gamma({shape: 0.2})));
      assert.equal(value.weightedChoice({disabled: 0}), null);
    `
: `
      import { writeFile } from 'node:fs/promises';
      import { resolve } from 'node:path';
      import { createRequire } from 'node:module';
      const schema = createRequire(import.meta.url)('${pkg.name}/schema.json');
      assert.equal(schema.title, 'UltraLoot table definition');
      assert.equal(value.validateTable({pools: []}).valid, true);
      assert.equal(lib.validateTable({pools: []}).valid, true);
      assert.equal(value.getRng().getSeed(), 0);
      const table = value.createTable({id: 'root', pools: [{rolls: 3, entries: [{id: 'gold', unique: true}]}]});
      assert.equal(table.rollSync().length, 1);
      assert.equal(value.unserialize(JSON.parse(value.toJson(table, {includeRng: true}))).root.rollSync().length, 1);
      await writeFile('module.mjs', "export default {id: 'esm', pools: [{entries: [{id: 'gold'}]}]};");
      await writeFile('module.cjs', "module.exports = {id: 'cjs', pools: [{entries: [{id: 'gold'}]}]};");
      for (const file of ['module.mjs', 'module.cjs']) assert.equal((await value.loadTable(resolve(file))).rollSync()[0].id, 'gold');
    `}
  `);
  await writeFile(join(directory, 'cjs.cjs'), `
    const assert = require('node:assert/strict');
    const { ${rng ? 'GameRng' : 'UltraLoot'}: Main } = require('${pkg.name}');
    const instance = new Main(0);
    assert.equal(typeof instance.${rng ? 'random' : 'createTable'}, 'function');
  `);
  run(process.execPath, ['esm.mjs']);
  run(process.execPath, ['cjs.cjs']);

  const browser = vm.createContext({ console });
  const browserFile = rng ? 'gamerng.js' : 'ultraloot.js';
  vm.runInContext(await readFile(join(directory, 'node_modules', pkg.name, 'dist', browserFile), 'utf8'), browser);
  const result = vm.runInContext(rng ? 'new GameRng(0).random()' : 'new UltraLoot(0).createTable({pools:[{entries:[{id:"gold"}]}]}).rollSync()[0].id', browser);
  assert.ok(rng ? Number.isFinite(result) : result === 'gold');
  console.log(`${pkg.name}: packed ESM/CJS runtime, NodeNext declarations, and browser bundle passed`);
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
} finally {
  await rm(directory, { recursive: true, force: true });
}
