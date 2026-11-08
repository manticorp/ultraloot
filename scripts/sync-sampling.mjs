import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const check = args.includes('--check');
const sourceIndex = args.indexOf('--source');
const source = sourceIndex >= 0 ? resolve(args[sourceIndex + 1]) : undefined;
const header = '// Generated from GameRNG src/sampling.ts; update with npm run sync:rng -- --source ../gamerng\n';
const hash = text => createHash('sha256').update(text).digest('hex');
const destination = resolve(root, 'src/rng/sampling.ts');
const manifest = resolve(root, 'sampling-source.json');

if (check) {
  const pin = JSON.parse(await readFile(manifest, 'utf8'));
  const embedded = await readFile(destination, 'utf8');
  if (!embedded.startsWith(header) || hash(embedded.slice(header.length)) !== pin.sha256) {
    throw new Error('Embedded sampling code differs from its pinned source; run sync:rng');
  }
  if (source && hash(await readFile(resolve(source, 'src/sampling.ts'), 'utf8')) !== pin.sha256) {
    throw new Error('GameRNG sampling changed; refresh the embedded source and rerun regression tests');
  }
  console.log('Embedded GameRNG sampling source verified');
} else {
  if (!source) throw new Error('Provide --source /path/to/gamerng');
  const text = await readFile(resolve(source, 'src/sampling.ts'), 'utf8');
  const pkg = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
  await writeFile(destination, header + text);
  await writeFile(manifest, JSON.stringify({ package: pkg.name, version: pkg.version, source: 'src/sampling.ts', license: 'MIT', sha256: hash(text) }, null, 2) + '\n');
  console.log('Embedded the canonical GameRNG sampling source');
}
