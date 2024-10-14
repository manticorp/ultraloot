import { default as LootTable } from './../table';
export type LootTableEntries = Record<string, LootTable>;
/**
 * Example implementation of a loot table manager.
 */
export default class LootTableManager {
    tables: LootTableEntries;
    constructor(tables?: LootTableEntries);
    addTables(tables: LootTableEntries | Array<LootTable>): this;
    addTable(name: LootTable | string, table?: LootTable | string): this;
    getTable(name: string): LootTable;
}
