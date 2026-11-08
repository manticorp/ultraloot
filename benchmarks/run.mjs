import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const name = pkg.name.split('/').pop();
const at = process.argv.indexOf('--module');
const library = createRequire(import.meta.url)(at >= 0 ? resolve(process.argv[at + 1]) : resolve(root, `dist/${name}.cjs`));
const cases = name === 'gamerng'
  ? {
      uniform: [100000, () => { const rng = new library.GameRng(123); return () => rng.random(); }],
      weighted32: [10000, () => { const rng = new library.GameRng(123); const weights = Object.fromEntries(Array.from({ length: 32 }, (_, i) => [i, i + 1])); return () => rng.weightedChoice(weights); }],
      gamma: [10000, () => { const rng = new library.GameRng(123); return () => rng.gamma({ shape: 2, rate: 2 }); }]
    }
  : {
      simple: [10000, () => { const table = new library.UltraLoot(123).createTable({ pools: [{ entries: [{ id: 'gold' }] }] }); return () => table.rollSync().length; }],
      weighted32: [10000, () => { const table = new library.UltraLoot(123).createTable({ pools: [{ entries: Array.from({ length: 32 }, (_, i) => ({ id: String(i), weight: i + 1 })) }] }); return () => table.rollSync().length; }],
      nested4: [5000, () => { const ul = new library.UltraLoot(123); let table = ul.createTable({ pools: [{ entries: [{ id: 'gold' }] }] }); for (let i = 0; i < 4; i++) table = ul.createTable({ pools: [{ entries: [table] }] }); return () => table.rollSync().length; }],
      itemClone: [10000, () => { const table = new library.UltraLoot(123).createTable({ pools: [{ entries: [{ id: 'gear', item: { stats: { power: 10, armor: 20 }, tags: ['a', 'b', 'c'] } }] }] }); return () => table.rollSync().length; }]
    };
const results = {};
let checksum = 0;
for (const [scenario, [iterations, setup]] of Object.entries(cases)) {
  const samples = [];
  for (let repeat = 0; repeat < 5; repeat++) {
    const sample = setup();
    for (let i = 0; i < 1000; i++) sample();
    const start = process.hrtime.bigint();
    for (let i = 0; i < iterations; i++) checksum += Number(sample());
    samples.push(Number(process.hrtime.bigint() - start) / 1e6);
  }
  samples.sort((a, b) => a - b);
  results[scenario] = { iterations, medianMs: samples[2], minMs: samples[0], operationsPerSecond: Math.round(iterations / (samples[2] / 1000)) };
}
console.log(JSON.stringify({ package: pkg.name, node: process.version, platform: `${process.platform}/${process.arch}`, seed: 123, repeats: 5, checksum, results }, null, 2));
