// Generated from GameRNG src/sampling.ts; update with npm run sync:rng -- --source ../gamerng
/** Dependency-free sampling algorithms embedded in UltraLoot at build time. */
export const SAMPLING_VERSION = 2;

/** Marsaglia–Tsang sampling, with shape boosting below one, in log space. */
export function gammaLog (random: () => number, normal: () => number, shape: number): number {
  if (shape < 1) {
    return gammaLog(random, normal, shape + 1) + Math.log1p(-random()) / shape;
  }
  const d = shape - 1 / 3;
  const c = 1 / (3 * Math.sqrt(d));
  for (let attempt = 0; attempt < 10000; attempt++) {
    const x = normal();
    const base = 1 + c * x;
    if (base <= 0) continue;
    const v = base * base * base;
    const u = random();
    if (u < 1 - 0.0331 * x ** 4 || Math.log(u) < x * x / 2 + d * (1 - v + Math.log(v))) {
      return Math.log(d) + 3 * Math.log(base);
    }
  }
  throw new Error('Gamma sampling could not converge; check the random source and parameters');
}

export function betaSample (random: () => number, normal: () => number, alpha: number, beta: number): number {
  const difference = gammaLog(random, normal, alpha) - gammaLog(random, normal, beta);
  if (Number.isNaN(difference)) {
    throw new Error('Beta parameters exceed the supported numeric range');
  }
  // Log space avoids 0/0 when both fractional Gamma samples underflow.
  return difference >= 0 ? 1 / (1 + Math.exp(-difference)) : Math.exp(difference) / (1 + Math.exp(difference));
}

export function semicircleSample (random: () => number, radius: number): number {
  // The x coordinate of a uniform point in a disk has a semicircle density.
  return radius * Math.sqrt(random()) * Math.cos(2 * Math.PI * random());
}

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
