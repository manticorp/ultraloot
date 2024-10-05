import { default as LootTable } from './../table';

export type LootTableEntries = Record<string, LootTable>;

/**
 * Example implementation of a loot table manager.
 */
export default class LootTableManager {
  public tables: LootTableEntries = {};

  constructor (tables : LootTableEntries = {}) {
    this.addTables(tables);
  }

  addTables (tables : LootTableEntries | Array<LootTable>) {
    if (Array.isArray(tables)) {
      for (const table of tables) {
        this.addTable(table);
      }
    } else {
      for (const [key, table] of Object.entries(tables)) {
        this.addTable(key, table);
      }
    }
    return this;
  }

  addTable (name : LootTable | string, table?: LootTable | string) {
    if (typeof name === 'string' && typeof table !== 'undefined' && table instanceof LootTable) {
      this.tables[name] = table;
    } else if (typeof table === 'string' && name instanceof LootTable) {
      this.tables[table] = name;
    } else if (name instanceof LootTable) {
      this.tables[name.id] = name;
    } else {
      throw new Error('Error adding table - no loot table given?');
    }
    return this;
  }

  getTable (name: string) {
    if (typeof this.tables[name] === 'undefined') {
      throw new Error('Table not yet registered.');
    }
    return this.tables[name];
  }
}
