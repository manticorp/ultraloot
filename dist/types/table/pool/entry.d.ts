import LootTable from './../../table';
import { RngInterface, Chancy } from './../../rng';
import LootTableEntryResult from './entry/result';
import LootTableEntryResults from './entry/results';
export type LootTableEntryDefinition = {
    name?: string;
    id?: number | string;
    stackable?: boolean;
    unique?: boolean;
    weight?: number;
    item?: any;
    qty?: Chancy;
    functions?: Array<FunctionDefinition>;
    conditions?: Array<ConditionDefinition>;
};
export interface FunctionDefinition {
    function: string;
    arguments?: Array<any> | Record<string, any>;
    args?: Array<any> | Record<string, any>;
}
export interface ConditionDefinition {
    function: string;
    arguments?: Array<any> | Record<string, any>;
    args?: Array<any> | Record<string, any>;
}
export default class LootTableEntry {
    id?: number | string;
    stackable?: boolean;
    unique?: boolean;
    name?: string;
    weight: number;
    item?: any;
    qty?: Chancy;
    functions: Array<FunctionDefinition>;
    conditions: Array<ConditionDefinition>;
    /**
     * @param definition The loot table entry definition
     */
    constructor({ id, stackable, unique, name, weight, item, functions, conditions, qty, }?: LootTableEntryDefinition);
    get description(): string;
    describe(): string;
    getItem(): any;
    deepCloneObject(ob: object): any;
    cloneItem(): any;
    isTable(): boolean;
    resultDefinition(rng: RngInterface): {
        id: string | number;
        stackable: boolean;
        name: string;
        item: any;
        qty: number;
    };
    generateBaseResults(rng: RngInterface): LootTableEntryResults;
    applyConditions({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): Promise<boolean>;
    roll({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    rollItem({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    rollTable({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    processEntryResults(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<LootTableEntryResults>;
    processEntryResult(entryResult: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    applyConditionsSync({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): boolean;
    rollSync({ rng, table, looter, context, result, }: {
        rng?: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result?: LootTableEntryResults;
    }): LootTableEntryResults;
    rollItemSync({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults;
    rollTableSync({ rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults;
    processEntryResultsSync(entryResults: LootTableEntryResults, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): LootTableEntryResults;
    processEntryResultSync(looted: LootTableEntryResult, { rng, table, looter, context, result }: {
        rng: RngInterface;
        table: LootTable;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
}
