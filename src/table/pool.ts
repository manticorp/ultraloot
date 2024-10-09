import log from './../log';
import { default as LootTableEntry, LootTableEntryDefinition, ConditionDefinition, FunctionDefinition } from './pool/entry';
import LootTableEntryResult from './pool/entry/result';
import LootTableEntryResults from './pool/entry/results';
import { default as LootTable } from './../table';
import { default as RNG, RngInterface, Chancy } from './../rng';

export interface LootTablePoolDefinition {
  name?: string,
  id?: string,
  conditions?: Array<ConditionDefinition>,
  functions?: Array<FunctionDefinition>,
  rolls?: Chancy,
  nulls?: Chancy,
  entries?: Array<LootTableEntry | LootTable | LootTableEntryDefinition>,
  template?: Partial<LootTableEntryDefinition>
}

export default class LootPool {
  name: string;
  id: string;
  conditions: Array<ConditionDefinition> = [];
  functions: Array<FunctionDefinition> = [];
  rolls: Chancy = 1;
  nulls: Chancy = 0;
  entries: Array<LootTableEntry | LootTable> = [];
  template: Partial<LootTableEntryDefinition> = {};

  static NULLKEY = '__NULL__fd2a99d2-26c0-4454-a284-34578b94e0f6';

  /**
   * @param definition The loot table pool definition
   */
  constructor ({
    name,
    id,
    conditions = [],
    functions = [],
    rolls = 1,
    nulls = 0,
    entries = [],
    template,
  } : LootTablePoolDefinition = {}) {
    this.name = name;
    this.conditions = conditions ?? [];
    this.functions = functions ?? [];
    this.rolls = rolls;
    this.nulls = nulls;
    this.id = id ?? (new RNG()).uniqstr(6);
    this.template = template;
    if (entries) {
      for (const entry of entries) {
        this.addEntry(entry);
      }
    }
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

  createEntry (def: LootTableEntryDefinition) {
    const entry = new LootTableEntry({ ...(this.template ?? {}), ...def });
    this.entries.push(entry);
    return entry;
  }

  addEntry (entry: LootTableEntry | LootTable | LootTableEntryDefinition, def?: Omit<LootTableEntryDefinition, 'id'>) : this {
    if (entry instanceof LootTable) {
      entry = new LootTableEntry({
        ...(this.template ?? {}),
        ...(def ?? {}),
        ...{
          id: entry.id,
          item: entry,
        }
      });
    }
    if (entry instanceof LootTableEntry) {
      this.entries.push(entry);
    } else {
      this.createEntry(entry);
    }
    return this;
  }

  getEntries () {
    return this.entries;
  }

  rollPreamble ({ rng } : { rng: RngInterface }) : [number, Record<string, number>] {
    const numRolls = rng.chancyInt(this.rolls);

    log.gc(`Pool ${this.description} | Rolling pool ${numRolls} times (from chancy(${JSON.stringify(this.rolls)}))`);

    // We store a list of key/value choices with their weights in an array
    const choices : Record<string, number> = {};

    // A special NULL key to track null results
    if (rng.chancy(this.nulls) > 0) {
      choices[LootPool.NULLKEY] = rng.chancy(this.nulls);
    }

    // map the weights to positions in entries.
    this.entries.forEach((a, i) => {
      if (a instanceof LootTable) {
        choices[i] = 1;
      } else {
        choices[i] = rng.chancy(a.weight ?? 1);
      }
    });
    log.vv(`Pool ${this.description} | Choices:`, choices);
    return [numRolls, choices];
  }

  async roll ({
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
    const [numRolls, choices] = this.rollPreamble({ rng });
    const overallIntermediate = new LootTableEntryResults();

    for (let i = 0; i < numRolls; i++) {
      // This is our choice from the choices table
      const choice = rng.weightedChoice(choices);

      // Then, unless it is the null key, we extract it!
      if (choice !== LootPool.NULLKEY) {
        const entry = this.entries[choice];
        if (entry instanceof LootTable) {
          // If the entry is a loot table, voila - we can roll it directly
          overallIntermediate.merge(await entry.roll({ looter, context, rng }));
        } else if (entry instanceof LootTableEntry) {
          // Otherwise, we can roll the entry itself
          log.g(`Pool ${this.description} | Rolling Loot Table Entry`);
          overallIntermediate.merge(await entry.roll({ rng, table, looter, context }));
          log.ge();
          if (entry.unique) {
            choices[choice] = 0;
          }
        }
      } else {
        log.v(`Pool ${this.description} | Got null result`);
      }
    }

    // Then we process all the results
    await this.processEntryResults(overallIntermediate, { rng, table, looter, context, result });
    log.ge();
    return result;
  }

  rollSync ({
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
    const [numRolls, choices] = this.rollPreamble({ rng });
    const overallIntermediate = new LootTableEntryResults();

    for (let i = 0; i < numRolls; i++) {
      // This is our choice from the choices table
      const choice = rng.weightedChoice(choices);

      // Then, unless it is the null key, we extract it!
      if (choice !== LootPool.NULLKEY) {
        const entry = this.entries[choice];
        if (entry instanceof LootTable) {
          // If the entry is a loot table, voila - we can roll it directly
          overallIntermediate.merge(entry.rollSync({ looter, context, rng }));
        } else if (entry instanceof LootTableEntry) {
          // Otherwise, we can roll the entry itself
          log.g(`Pool ${this.description} | Rolling Loot Table Entry`);
          overallIntermediate.merge(entry.rollSync({ rng, table, looter, context }));
          log.ge();
          if (entry.unique) {
            choices[choice] = 0;
          }
        }
      } else {
        log.v(`Pool ${this.description} | Got null result`);
      }
    }

    // Then we process all the results
    this.processEntryResultsSync(overallIntermediate, { rng, table, looter, context, result });
    log.ge();
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
    const results = [];
    for (const entryResult of entryResults) {
      results.push(this.processEntryResult(entryResult, { rng, table, looter, context, result }));
    }
    return Promise.all(results);
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

  async processEntryResult (looted : LootTableEntryResult, {
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
      await table.applyFunction(fn, { rng, looted, looter, context, result });
    }
    let add = true;
    for (const cond of this.conditions) {
      const conditionResult = await table.applyCondition(cond, { rng, looted, looter, context, result });
      log.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
      add = add && conditionResult;
      if (!add) {
        log.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
        break;
      }
    }
    log.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
    if (add && looted.qty > 0) {
      if (looted.stackable) {
        result.push(looted);
      } else {
        for (let i = 0; i < looted.qty; i++) {
          result.push(new LootTableEntryResult({ ...looted, ...{ qty: 1 } }));
        }
      }
    }
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
    let add = true;
    for (const cond of this.conditions) {
      const conditionResult = table.applyConditionSync(cond, { rng, looted, looter, context, result });
      log.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
      add = add && conditionResult;
      if (!add) {
        log.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
        break;
      }
    }
    log.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
    if (add && looted.qty > 0) {
      if (looted.stackable) {
        result.push(looted);
      } else {
        for (let i = 0; i < looted.qty; i++) {
          result.push(new LootTableEntryResult({ ...looted, ...{ qty: 1 } }));
        }
      }
    }
  }
}
