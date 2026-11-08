import { readFile, writeFile } from 'node:fs/promises';

// Webpack emits whitespace-only bootstrap comments; keep generated diffs clean.
for (const name of ['ultraloot.js', 'ultraloot.cjs', 'ultraloot.mjs']) {
  const file = new URL(`../dist/${name}`, import.meta.url);
  const text = await readFile(file, 'utf8');
  await writeFile(file, text.replace(/^(\/\*+\/)[ \t]+$/gm, '$1'));
}
