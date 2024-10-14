import { default as LootTable, LootTableFunctionSignature, LootTableConditionSignature, LootTableDefinition } from './table';
import { default as LootTablePool, LootTablePoolDefinition } from './table/pool';
import { default as LootTableEntry, LootTableEntryDefinition, FunctionDefinition, ConditionDefinition } from './table/pool/entry';
import LootTableEntryResult from './table/pool/entry/result';
import LootTableEntryResults from './table/pool/entry/results';
import { Seed, RngInterface, RngConstructor, Chancy } from './rng';
declare const VERSION_KEY = "__version__";
/**
 * This is for easily creating loot tables using a json like
 * object instead of all the specific loot table objects
 */
export type LootTableEasyDefinition = {
    name?: string;
    id?: string;
    rng?: string | number | RngInterface;
    pools?: Array<LootTablePool | LootTablePoolEasyDefinition>;
};
/**
 * This is for easily creating loot table pools using a json like
 * object instead of all the specific loot table objects
 */
export type LootTablePoolEasyDefinition = {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    template?: LootTableEntryDefinition;
    rolls?: Chancy;
    nulls?: Chancy;
    entries?: Array<LootTableEntry | LootTableEntryDefinition | LootTable>;
};
/**
 * This defines how a LootTable is stored in JSON files
 */
export type LootTableJsonDefinition = {
    name?: string;
    id?: string;
    fn?: string;
    rng?: string | number | RngInterface;
    pools?: Array<LootTablePoolJsonDefinition>;
};
/**
 * This defines how a LootTablePool is stored in JSON files
 */
export type LootTablePoolJsonDefinition = {
    name?: string;
    id?: string;
    conditions?: Array<ConditionDefinition>;
    functions?: Array<FunctionDefinition>;
    rolls?: Chancy;
    nulls?: Chancy;
    entries: Array<LootTableEntryJsonDefinition>;
};
/**
 * This defines how a LootTableEntry is stored in JSON files
 */
export type LootTableEntryJsonDefinition = {
    name?: string;
    id: number | string;
    type?: string;
    stackable?: boolean;
    weight?: number;
    item?: any;
    qty?: Chancy;
    functions?: Array<FunctionDefinition>;
    conditions?: Array<ConditionDefinition>;
};
export declare class RecursiveTableError extends Error {
}
export interface SerializedTables {
    [VERSION_KEY]: string;
    tables: Record<string, LootTableJsonDefinition>;
}
export type LoadSaveArgs = {
    defaultExtension?: string;
    path?: string;
};
/**
 * @todo detect recursively required tables
 * @example
 * import {UltraLoot} from "ultraloot";
 *
 * const ultralootDefaultRng = new UltraLoot();           // default RNG
 * const ultralootCustomRng = new UltraLoot("UL7R4L007"); // seeding the built in RNG
 * const ultralootCustomRng = new UltraLoot(rngSource);   // using a custom RNG
 */
export declare class UltraLoot {
    static version: string;
    version: string;
    /**
     * Default RNG source when none is given
     */
    protected defaultRng: RngInterface;
    /**
     * RNG source given by the end user
     */
    protected rng?: RngInterface;
    /**
     * RNG Constructor for making new RNGs
     */
    protected rngConstructor?: RngConstructor;
    /**
     * Global functions that can be used by loot table entries.
     *
     * The keys in the object are the function identifier used in the table entries
     */
    protected functions: Record<string, LootTableFunctionSignature>;
    /**
     * Global conditions that can be used by loot table pools and entries.
     *
     * The keys in the object are the function identifier used in the table entries/pools
     */
    protected conditions: Record<string, LootTableConditionSignature>;
    /**
     * Whether to throw errors when functions are missing, otherwise just does console.error
     */
    throwOnMissingFunctions: boolean;
    /**
     * Whether to throw errors when conditions are missing, otherwise just does console.error
     */
    throwOnMissingConditions: boolean;
    constructor(rng?: Seed | RngInterface);
    registerDefaults(): this;
    registerDefaultFunctions(): this;
    registerDefaultConditions(): this;
    /**
     * As we dont expose the class as default, in browser it would be nice
     * if there was a way to create new instances. This can be done using
     * this function.
     */
    instance(rng?: Seed | RngInterface): UltraLoot;
    setRng(rng: RngInterface): void;
    getRng(): RngInterface;
    getDefaultRng(): RngInterface;
    setRngConstructor(rngConstructor: RngConstructor): void;
    getRngConstructor(): RngConstructor;
    isRng(rng?: any): rng is RngInterface;
    makeRng(rng?: Seed | RngInterface): RngInterface;
    registerFunction(name: string, fn: LootTableFunctionSignature): void;
    registerCondition(name: string, fn: LootTableConditionSignature): void;
    hasFunction(name: string): boolean;
    hasCondition(name: string): boolean;
    noThrowOnMissingFunctionsOrConditions(): this;
    throwOnMissingFunctionsOrConditions(): this;
    functionCheck(fn: FunctionDefinition): boolean;
    conditionCheck(cond: ConditionDefinition): boolean;
    applyFunctionSync(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): void;
    applyConditionSync(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): boolean;
    applyFunction(functionDefinition: FunctionDefinition, { rng, looted, looter, context, result }: {
        rng: RngInterface;
        looted: LootTableEntryResult;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<void>;
    applyCondition(conditionDefinition: ConditionDefinition, { rng, looter, context, result }: {
        rng: RngInterface;
        looter: any;
        context: any;
        result: LootTableEntryResults;
    }): Promise<boolean>;
    /**
     * Create a loot table, with this ultraloot instance
     *
     * @example
     *
     * const ul = new UltraLoot('UL7R4L007');
     * const table = ul.createTable({name: 'Food'});
     *
     * table.addPool([
     *   {
     *     rolls: 1,
     *     name: 'Cakes'
     *     entries: [
     *       {id: 'chocolate_cake'},
     *       {id: 'fruit_cake'},
     *       {id: 'star_cake'}
     *     ]
     *   }
     * ]);
     */
    createTable(def: LootTable | LootTableDefinition | LootTableEasyDefinition): LootTable;
    /**
     * Create a loot pool for use in a loot table
     */
    createPool(def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootTablePool;
    /**
     * Create an entry for a loot pool, either with object definition or from a loot table
     */
    createEntry(def: LootTableEntryDefinition | LootTable): LootTableEntry;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isLootTableDefinition(def: any): def is LootTableDefinition;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isEasyLootTableDefinition(def: any): def is LootTableEasyDefinition;
    /**
     * Used for Typescript type guarding and parameter checking
     */
    protected isEasyLootTablePoolDefinition(def: any): def is LootTablePoolEasyDefinition;
    protected transformEasyToProperLootTableDefinition(def: LootTableEasyDefinition): LootTableDefinition;
    protected transformEasyToProperLootTablePoolDefinition(def: LootTablePoolEasyDefinition): LootTablePoolDefinition;
    protected pathJoin(parts: string[], sep?: string): string;
    protected finishWith(str: string, ending: string): string;
    protected finishWithExtension(str: string, extension: string): string;
    protected getExtension(str: string): string | null | undefined;
    /**
     * Serializes a LootTable ready for converting to text, e.g. JSON
     *
     * Returns a key value object, where the keys are the loot table filenames/ids
     *
     * @example
     * const result = await ultraloot.serialize(table);
     *
     * result = {
     *   kitchen_cupboard: {
     *     fn: 'kitchen_cupboard',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             type: 'table',
     *             item: 'vegetables'
     *           },
     *           {
     *             type: 'table',
     *             item: 'fruit'
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   fruit_bowl: {
     *     fn: 'fruit_bowl',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             type: 'table',
     *             item: 'fruit'
     *           }
     *         ]
     *       }
     *     ]
     *   },
     *   vegetables: {
     *     fn: 'vegetables',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             id: 'carrot'
     *           },
     *           {
     *             id: 'cabbage'
     *           },
     *         ]
     *       }
     *     ]
     *   },
     *   fruit: {
     *     fn: 'fruit',
     *     pools: [
     *       {
     *         entries: [
     *           {
     *             id: 'apple'
     *           },
     *           {
     *             id: 'pear'
     *           },
     *         ]
     *       }
     *     ]
     *   }
     * }
     */
    serialize(table: LootTable, { includeRng, key, had }?: {
        includeRng?: boolean;
        key?: string;
        had?: Set<any>;
    }): SerializedTables;
    /**
     * Convert a LootTable to JSON
     * @param  {LootTable}       table               The table to serialize
     * @param  {Object}          options             Options
     * @param  {boolean}         options.includeRng  Whether to include the RNG seed in the serialized tables
     * @return {Promise<string>}                     The resulting LootTable representation in a JSON string
     */
    toJson(table: LootTable, { includeRng }?: {
        includeRng?: boolean;
    }): string;
    /**
     * @todo Implement this
     */
    saveTable(table: LootTable, { path, defaultExtension }?: LoadSaveArgs): Promise<void>;
    /**
     * Load serialized tables from a file.
     *
     * This is just a wrapper around unserializing json contents of a file.
     *    */
    loadTables(filename: string, { path, defaultExtension }?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    /**
     * Loads serialized tables from a local file
     */
    loadTablesFromFile(filename: string, { path, defaultExtension }?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    /**
     * Load serialized tables from a url
     */
    loadTablesFromUrl(url: string, { path, defaultExtension }?: LoadSaveArgs): Promise<Record<string, LootTable>>;
    /**
     * Load a table from a file.
     *
     * The file can be local or a url. If running in browser, it's always treated as
     * a URL. When run in node, it will only treat it as a URL if it's prefixed with
     * http.
     *
     * This function expects a single table to be located in the file, as the base object.
     */
    loadTable(filename: string, { path, defaultExtension }?: LoadSaveArgs): Promise<LootTable | null>;
    /**
     * Loads a table from a local file
     */
    loadTableFromFile(filename: string, { path, defaultExtension }?: LoadSaveArgs): Promise<LootTable | null>;
    /**
     * Loads a table from a url
     */
    loadTableFromUrl(url: string, { path, defaultExtension }?: LoadSaveArgs): Promise<LootTable | null>;
    /**
     * Turns a JSON representation into a LootTable, and does the
     * same for all nested tables inside pools recursively.
     */
    resolveTable(table: LootTableJsonDefinition, { path, defaultExtension }?: LoadSaveArgs): Promise<LootTable | null>;
    /**
     * Unserializes tables serialized with the "serialize" function
     * @param  {Record<string, LootTableJsonDefinition>} tables Record of tables serialized using the "serialize" function
     * @return {Promise<Record<string, LootTable>>}             A key/value pairing of tables
     */
    unserialize(tables: SerializedTables): Record<string, LootTable>;
}
export default UltraLoot;
