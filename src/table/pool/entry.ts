import log from './../../log';
import LootTable from './../../table';
import { RngInterface, Chancy } from './../../rng';
import LootTableEntryResult from './entry/result';
import LootTableEntryResults from './entry/results';

export type LootTableEntryDefinition = {
  name?: string,
  id?: number | string,
  stackable?: boolean,
  unique?: boolean,
  weight?: number,
  item?: any,
  qty?: Chancy,
  functions?: Array<FunctionDefinition>,
  conditions?: Array<ConditionDefinition>
};

export interface FunctionDefinition {
  function: string,
  arguments?: Array<any> | Record<string, any>
}
export interface ConditionDefinition {
  function: string,
  arguments?: Array<any> | Record<string, any>
}

export default class LootTableEntry {
  id?: number | string;
  stackable?: boolean = true;
  unique?: boolean = false;
  name?: string;
  weight: number = 1;
  item?: any;
  qty?: Chancy = 1;
  functions: Array<FunctionDefinition>;
  conditions: Array<ConditionDefinition>;

  /**
   * @param definition The loot table entry definition
   */
  constructor ({
    id,
    stackable = true,
    unique = false,
    name,
    weight = 1,
    item,
    functions = [],
    conditions = [],
    qty = 1,
  } : LootTableEntryDefinition = {}) {
    this.id = id;
    this.name = name;
    this.stackable = stackable;
    this.unique = unique;
    this.weight = weight;
    this.item = item;
    this.qty = qty;
    this.functions = functions ?? [];
    this.conditions = conditions ?? [];
  }

  get description () {
    return this.describe();
  }

  describe () {
    if (this.name) {
      return `${this.name} [${this.id}]`;
    }
    return `[${this.id}]`;
  }

  getItem () {
    return this.item ?? this.id;
  }

  deepCloneObject (ob: object) {
    // Simplest way to deep clone a simple object.
    // Anything more complex will have to implement a "clone" function.
    return JSON.parse(JSON.stringify(ob));
  }

  cloneItem () {
    if (this.item === null) {
      return null;
    }
    if (typeof this.item === 'object') {
      if (typeof this.item.clone === 'function') {
        return this.item.clone(this.item);
      }

      // Here we have to do a deep clone, because if we only do
      // a shallow clone, any nested properties will be persisted across
      // rolls, which is probably not what we want.
      return this.deepCloneObject(this.item);
    } else {
      return this.item;
    }
  }

  isTable (): boolean {
    return this.getItem() instanceof LootTable;
  }

  resultDefinition (rng: RngInterface) {
    const def = {
      id: this.id,
      stackable: this.stackable,
      name: this.name,
      item: this.cloneItem(),
      qty: rng.chancy(this.qty)
    };
    return def;
  }

  generateBaseResults (rng: RngInterface) {
    const def = this.resultDefinition(rng);
    return new LootTableEntryResults([new LootTableEntryResult(def)]);
  }

  async applyConditions ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults(),
  } : {
    rng?: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result?: LootTableEntryResults
  }) {
    let add = true;
    for (const cond of this.conditions) {
      add = add && await table.applyCondition(cond, { rng, looter, context, result });
      if (!add) {
        log.d(`Entry: ${this.description} | Condition "${cond.function}" stopped this from being added`);
        break;
      }
    }
    return add;
  }

  async roll ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults(),
  } : {
    rng?: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result?: LootTableEntryResults
  }) : Promise<LootTableEntryResults> {
    if (this.isTable()) {
      return await this.rollTable({ rng, table, looter, context, result });
    } else {
      return await this.rollItem({ rng, table, looter, context, result });
    }
  }

  async rollItem ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    log.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
    await this.processEntryResults(this.generateBaseResults(rng), { rng, table, looter, context, result });
    return result;
  }

  async rollTable ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
    const entryResults = await this.getItem().borrow(table).roll({ looter, context, result: [], rng, n: this.qty });
    this.getItem().unborrow(table);
    await this.processEntryResults(entryResults, { rng, table, looter, context, result });
    return result;
  }

  async processEntryResults (entryResults : LootTableEntryResults,
    {
      rng,
      table,
      looter,
      context,
      result = new LootTableEntryResults()
    } : {
      rng: RngInterface,
      table: LootTable,
      looter: any,
      context: any,
      result: LootTableEntryResults
    }) {
    for (const entryResult of entryResults) {
      await this.processEntryResult(entryResult, { rng, table, looter, context, result });
    }
    return entryResults;
  }

  async processEntryResult (entryResult : LootTableEntryResult, {
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    for (const fn of this.functions) {
      await table.applyFunction(fn, { rng, looted: entryResult, looter, context, result });
    }
    if (entryResult.qty > 0) {
      if (entryResult.stackable) {
        result.push(entryResult);
      } else {
        for (let i = 0; i < entryResult.qty; i++) {
          result.push(new LootTableEntryResult({ ...entryResult, ...{ qty: 1 } }));
        }
      }
    }
  }

  applyConditionsSync ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults(),
  } : {
    rng?: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result?: LootTableEntryResults
  }) {
    let add = true;
    for (const cond of this.conditions) {
      add = add && table.applyConditionSync(cond, { rng, looter, context, result });
      if (!add) {
        log.d(`Entry: ${this.description} | Condition "${cond.function}" stopped this from being added`);
        break;
      }
    }
    return add;
  }

  rollSync ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults(),
  } : {
    rng?: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result?: LootTableEntryResults
  }) : LootTableEntryResults {
    if (this.isTable()) {
      return this.rollTableSync({ rng, table, looter, context, result });
    } else {
      return this.rollItemSync({ rng, table, looter, context, result });
    }
  }

  rollItemSync ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    log.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
    this.processEntryResultsSync(this.generateBaseResults(rng), { rng, table, looter, context, result });
    return result;
  }

  rollTableSync ({
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
    const entryResults = this.getItem().borrow(table).rollSync({ looter, context, result: [], rng, n: this.qty });
    this.getItem().unborrow(table);
    this.processEntryResultsSync(entryResults, { rng, table, looter, context, result });
    return result;
  }

  processEntryResultsSync (entryResults : LootTableEntryResults,
    {
      rng,
      table,
      looter,
      context,
      result = new LootTableEntryResults()
    } : {
      rng: RngInterface,
      table: LootTable,
      looter: any,
      context: any,
      result: LootTableEntryResults
    }) {
    for (const entryResult of entryResults) {
      this.processEntryResultSync(entryResult, { rng, table, looter, context, result });
    }
    return entryResults;
  }

  processEntryResultSync (looted : LootTableEntryResult, {
    rng,
    table,
    looter,
    context,
    result = new LootTableEntryResults()
  } : {
    rng: RngInterface,
    table: LootTable,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    for (const fn of this.functions) {
      table.applyFunctionSync(fn, { rng, looted, looter, context, result });
    }
    if (looted.qty > 0) {
      if (looted.stackable || looted.qty === 1) {
        result.push(looted);
      } else {
        for (let i = 0; i < looted.qty; i++) {
          result.push(new LootTableEntryResult({ ...looted, ...{ qty: 1 } }));
        }
      }
    }
  }
}
