import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const utils = new URL('node_modules/typedoc/dist/node-utils.js', root);
const text = await readFile(utils, 'utf8');
// TypeDoc 0.28 calls an internal method removed in patched minimatch 11.
// Use minimatch's public partial-match API while retaining the security pin.
const internal = /return mini\.set\.some\(\(row\) => mini\.matchOne\(\s*childPath,\s*row,\s*\/\* partial \*\/\s*true\s*\)\);/;
if (text.includes('mini.matchOne(')) {
  if (!internal.test(text)) throw new Error('Review the TypeDoc/minimatch compatibility patch for this version');
  await writeFile(utils, text.replace(internal, 'return mini.match(childPath.join("/"), true);'));
}
execFileSync(process.execPath, [fileURLToPath(new URL('node_modules/typedoc/bin/typedoc', root))], { cwd: fileURLToPath(root), stdio: 'inherit' });
