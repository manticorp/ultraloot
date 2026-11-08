import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceAt = process.argv.indexOf('--source');
const source = sourceAt >= 0 ? resolve(process.argv[sourceAt + 1]) : resolve(root, '../gamerng');
const require = createRequire(import.meta.url);
const { GameRng } = require(resolve(source, 'dist/gamerng.cjs'));
const { Rng } = require(resolve(root, 'dist/ultraloot.cjs'));
const uniform = () => {
  let state = 123;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
};
for (const [method, args] of [
  ['gamma', { shape: 0.2, rate: 2 }],
  ['beta', { alpha: 0.2, beta: 0.8 }],
  ['betaBinomial', { alpha: 2, beta: 5, n: 10 }],
  ['studentsT', 8],
  ['wignerSemicircle', 2],
  ['weightedChoice', { disabled: 0, a: 1, b: 2 }]
]) {
  const left = new GameRng(123).randomSource(uniform());
  const right = new Rng(123).randomSource(uniform());
  assert.deepEqual(Array.from({ length: 1000 }, () => left[method](args)), Array.from({ length: 1000 }, () => right[method](args)), method);
}
console.log('GameRNG and UltraLoot sampling APIs agree for identical injected randomness');
