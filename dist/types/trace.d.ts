export interface RollTraceEvent {
    type: 'table:start' | 'table:end' | 'pool' | 'choice' | 'condition' | 'modifier';
    tableId: string | number;
    poolId?: string;
    entryId?: string | number | null;
    choice?: string | number | null;
    name?: string;
    passed?: boolean;
    quantity?: number;
    rolls?: number;
    weights?: Record<string, number>;
    state?: unknown;
}
export type RollTraceSink = (event: RollTraceEvent) => void;
