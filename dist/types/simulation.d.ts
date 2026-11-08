import type { RngInterface, Seed } from './rng/interface';
import type LootTable from './table';
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
/** Execute actual modifiers/conditions. IDs identify items; names group entries without IDs. */
export declare function simulateTableSync(table: LootTable, options?: SimulationOptions): SimulationResult;
export declare function simulateTable(table: LootTable, options?: SimulationOptions): Promise<SimulationResult>;
