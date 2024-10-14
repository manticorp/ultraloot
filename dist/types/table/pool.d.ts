import { default as LootTableEntry, LootTableEntryDefinition, ConditionDefinition, FunctionDefinition } from './pool/entry';
import LootTableEntryResult from './pool/entry/result';
import LootTableEntryResults from './pool/entry/results';
import { default as LootTable } from './../table';
import { RngInterface, Chancy } from './../rng';
export interface LootTablePoolDefinition {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    rolls?: Chancy;
    nulls?: Chancy;
    entries?: Array<LootTableEntry | LootTable | LootTableEntryDefinition>;
    template?: Partial<LootTableEntryDefinition>;
}
export default class LootPool {
    name: string;
    id: string;
    conditions: Array<ConditionDefinition>;
    functions: Array<FunctionDefinition>;
    rolls: Chancy;
    nulls: Chancy;
    entries: Array<LootTableEntry | LootTable>;
    template: Partial<LootTableEntryDefinition>;
    static NULLKEY: string;
    /**
     * @param definition The loot table pool definition
     */
    constructor({ name, id, conditions, functions, rolls, nulls, entries, template, }?: LootTablePoolDefinition);
    get description(): string;
    describe(): string;
    createEntry(def: LootTableEntryDefinition): LootTableEntry;
    addEntry(entry: LootTableEntry | LootTable | LootTableEntryDefinition, def?: Omit<LootTableEntryDefinition, 'id'>): this;
    getEntries(): (LootTableEntry | LootTable)[];
    rollPreamble({ rng }: {
        rng: RngInterface;
    }): [number, Record<string, number>];
    roll({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    rollSync({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults;
    processEntryResults(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void[]>;
    processEntryResultsSync(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults;
    processEntryResult(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    processEntryResultSync(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
}
