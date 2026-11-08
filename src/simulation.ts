import Rng from './rng';
import type { RngInterface, Seed } from './rng/interface';
import type LootTable from './table';
import type LootTableEntryResults from './table/pool/entry/results';

export interface SimulationOptions {
  iterations?: number;
  seed?: Seed;
  rng?: RngInterface;
  looter?: any;
  context?: any;
  signal?: AbortSignal;
}
export interface ItemStatistics {
  key: string;
  id?: string | number;
  name?: string;
  hits: number;
  probability: number;
  probability95: [number, number];
  meanQuantity: number;
  totalQuantity: number;
  /** Geometric estimate assuming independent rolls with a stationary probability. */
  rollsFor95Percent: number;
}
export interface SimulationResult {
  iterations: number;
  emptyRolls: number;
  noDropProbability: number;
  items: ItemStatistics[];
}

function accumulator (options: SimulationOptions) {
  const iterations = options.iterations ?? 10000;
  if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 1000000) throw new Error('Iterations must be an integer from 1 to 1000000');
  const rng = options.rng ?? new Rng(options.seed ?? 123);
  const items = new Map<string, { id?: string | number, name?: string, hits: number, total: number }>();
  let empty = 0;
  return {
    iterations,
    rng,
    record (results: LootTableEntryResults) {
      const quantities = new Map<string, number>();
      for (const entry of results) {
        if (!Number.isFinite(entry.qty)) throw new Error(`Cannot simulate non-finite quantity for ${entry.id ?? entry.name ?? 'unidentified item'}`);
        if (entry.qty <= 0) continue;
        const key = entry.id === undefined ? `name:${entry.name ?? '<unidentified>'}` : `${typeof entry.id}:${entry.id}`;
        if (!items.has(key)) items.set(key, { id: entry.id, name: entry.name, hits: 0, total: 0 });
        quantities.set(key, (quantities.get(key) ?? 0) + entry.qty);
      }
      if (quantities.size === 0) empty++;
      for (const [key, quantity] of quantities) {
        const item = items.get(key)!;
        item.hits++;
        item.total += quantity;
      }
    },
    result (): SimulationResult {
      return {
        iterations,
        emptyRolls: empty,
        noDropProbability: empty / iterations,
        items: Array.from(items, ([key, item]) => {
          const probability = item.hits / iterations;
          const z2 = 1.959963984540054 ** 2;
          const centre = (probability + z2 / (2 * iterations)) / (1 + z2 / iterations);
          const radius = Math.sqrt(z2 * probability * (1 - probability) / iterations + z2 ** 2 / (4 * iterations ** 2)) / (1 + z2 / iterations);
          return {
            key,
            id: item.id,
            name: item.name,
            hits: item.hits,
            probability,
            probability95: [Math.max(0, centre - radius), Math.min(1, centre + radius)] as [number, number],
            meanQuantity: item.total / iterations,
            totalQuantity: item.total,
            rollsFor95Percent: probability === 1 ? 1 : Math.ceil(Math.log(0.05) / Math.log1p(-probability))
          };
        }).sort((a, b) => b.probability - a.probability)
      };
    }
  };
}

/** Execute actual modifiers/conditions. IDs identify items; names group entries without IDs. */
export function simulateTableSync (table: LootTable, options: SimulationOptions = {}): SimulationResult {
  const state = accumulator(options);
  for (let i = 0; i < state.iterations; i++) {
    if (options.signal?.aborted) throw new Error('Simulation aborted');
    state.record(table.rollSync({ rng: state.rng, looter: options.looter, context: options.context }));
  }
  return state.result();
}

export async function simulateTable (table: LootTable, options: SimulationOptions = {}): Promise<SimulationResult> {
  const state = accumulator(options);
  for (let i = 0; i < state.iterations; i++) {
    if (options.signal?.aborted) throw new Error('Simulation aborted');
    state.record(await table.roll({ rng: state.rng, looter: options.looter, context: options.context }));
    if (i % 1000 === 999) await new Promise<void>(resolve => setTimeout(resolve, 0));
  }
  return state.result();
}
