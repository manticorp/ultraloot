// Generated from GameRNG src/sampling.ts; update with npm run sync:rng -- --source ../gamerng
/** Dependency-free sampling algorithms embedded in UltraLoot at build time. */
export const SAMPLING_VERSION = 2;

export function weightedChoice<T> (entries: Array<[T, number]>, random: () => number): T | null {
  let largest = 0;
  for (const [, weight] of entries) {
    if (!Number.isFinite(weight) || weight < 0) {
      throw new Error('Probability weights must be finite, non-negative numbers');
    }
    largest = Math.max(largest, weight);
  }
  if (largest === 0) return null;
  if (entries.length === 1) return entries[0][0];

  // Scaling prevents overflow when individually finite weights have a huge sum.
  const total = entries.reduce((sum, [, weight]) => sum + weight / largest, 0);
  const target = random() * total;
  let cumulative = 0;
  let lastPositive: T | null = null;
  for (const [key, weight] of entries) {
    if (weight === 0) continue;
    lastPositive = key;
    cumulative += weight / largest;
    if (target < cumulative) return key;
  }
  return lastPositive;
}
