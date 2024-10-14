import { UltraLoot, LootTablePoolEasyDefinition } from './ultraloot';
import { default as LootTablePool, LootTablePoolDefinition } from './table/pool';
import { FunctionDefinition, ConditionDefinition } from './table/pool/entry';
import LootTableEntryResult from './table/pool/entry/result';
import LootTableEntryResults from './table/pool/entry/results';
import { RngInterface, Chancy } from './rng';
/**
 * Object used when creating a loot table.
 */
export type LootTableDefinition = {
    name?: string;
    id?: string;
    fn?: string;
    rng?: RngInterface;
    pools?: Array<LootTablePool>;
    ul?: UltraLoot;
};
export type LootTableFunctionSignature = ({ rng, looted, looter, context, result, args }: {
    rng: RngInterface;
    looted: LootTableEntryResult;
    looter: any;
    context: any;
    result: LootTableEntryResults;
    args: Record<string, any>;
}) => void;
export type LootTableConditionSignature = ({ rng, looted, looter, context, result, args }: {
    rng: RngInterface;
    looted?: LootTableEntryResult;
    looter: any;
    context: any;
    result: LootTableEntryResults;
    args: Record<string, any>;
}) => boolean | Promise<boolean>;
export interface TableRollInterface {
    looter?: any;
    context?: any;
    result?: LootTableEntryResults;
    rng?: RngInterface;
    n?: Chancy;
}
export interface TablePoolRollInterface {
    pool: LootTablePool;
    looter?: any;
    context?: any;
    result?: LootTableEntryResults;
    rng?: RngInterface;
    n?: Chancy;
}
export default class LootTable {
    name?: string;
    id?: string;
    /**
     * Filename that should be used to represent this table
     * when it is saved as JSON. This should include relative
     * path/folder names
     */
    fn?: string;
    ul?: UltraLoot;
    rng: RngInterface;
    pools?: Array<LootTablePool>;
    functions: Record<string, LootTableFunctionSignature>;
    conditions: Record<string, LootTableConditionSignature>;
    /**
     * A parent's functions should be available to an Entry table when rolling.
     * For this case, we have to "borrow" the parent table to allow functions/
     * conditions to be used from there if needed.
     *
     * This is a set, so we don't end up with the same table in there multiple times.
     */
    borrowed: Set<LootTable>;
    /**
     * @param definition The loot table definition
     */
    constructor({ name, rng, id, pools, fn, ul }?: LootTableDefinition);
    registerFunction(name: string, fn: LootTableFunctionSignature): void;
    registerCondition(name: string, fn: LootTableConditionSignature): void;
    /**
     * The string to be used as a filename for this table.
     */
    get filename(): string | null;
    set filename(fn: string | null);
    /**
     * ultraloot instance
     */
    get ultraloot(): UltraLoot | undefined;
    set ultraloot(ul: UltraLoot | undefined);
    get description(): string;
    describe(): string;
    borrow(table: LootTable): this;
    unborrow(table: LootTable): this;
    getPools(): LootTablePool[];
    setRng(rng: RngInterface): this;
    protected rollBasics({ rng, looter, context, n }: Omit<TableRollInterface, 'result'>): [RngInterface, number];
    /**
     * Roll for loot on this table
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    rollSync({ looter, context, result, rng, n }?: TableRollInterface): LootTableEntryResults;
    /**
     * Roll for loot on this table
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    roll({ looter, context, result, rng, n }?: TableRollInterface): Promise<LootTableEntryResults>;
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     * @param rollDefinition
     */
    rollPoolSync({ pool, looter, context, result, rng, n }: TablePoolRollInterface): LootTableEntryResults;
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     *
     * @param rollDefinition
     */
    rollPool({ pool, looter, context, result, rng, n }: TablePoolRollInterface): Promise<LootTableEntryResults>;
    hasFunction(fn: FunctionDefinition): boolean;
    hasCondition(cond: ConditionDefinition): boolean;
    createPool(def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootTablePool;
    addPool(def: LootTablePool | LootTablePoolEasyDefinition | LootTablePoolDefinition): this;
    getPotentialDrops(): {
        entry: any;
        weight: number;
        min: number;
        max: number;
    }[];
    /**
     * @param functionDefinition
     * @param context
     */
    applyFunction(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted?: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    /**
     * @param conditionDefinition
     * @param context
     */
    applyCondition(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<boolean>;
    /**
     * @param functionDefinition
     * @param context
     */
    applyFunctionSync(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
    /**
     * @param conditionDefinition
     * @param context
     */
    applyConditionSync(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): boolean;
}
