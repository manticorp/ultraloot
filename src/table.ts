import { callbackArgs } from './args';
import type { RollTraceEvent, RollTraceSink } from './trace';
import { invokeSync } from './sync';
import log from './log';
import { UltraLoot, LootTablePoolEasyDefinition } from './ultraloot';
import { default as LootTablePool, LootTablePoolDefinition } from './table/pool';
import { FunctionDefinition, ConditionDefinition } from './table/pool/entry';
import LootTableEntryResult from './table/pool/entry/result';
import LootTableEntryResults from './table/pool/entry/results';
import RNG from './rng';
import { RngInterface, ChancyNumeric } from './rng/interface';

/**
 * Object used when creating a loot table.
 */
export type LootTableDefinition = {
  name ?: string,
  id ?: string | number,
  fn ?: string | number | null,
  rng ?: RngInterface,
  pools ?: Array<LootTablePool>,
  ul ?: UltraLoot,
};

export type LootTableFunctionSignature = ({
  rng,
  looted,
  looter,
  context,
  result,
  args
}: {
  rng: RngInterface,
  looted: LootTableEntryResult,
  looter: any,
  context: any,
  result: LootTableEntryResults,
  args?: any,
}) => void;

export type LootTableConditionSignature = ({
  rng,
  looted,
  looter,
  context,
  result,
  args
}: {
  rng: RngInterface,
  looted?: LootTableEntryResult,
  looter: any,
  context: any,
  result: LootTableEntryResults,
  args?: any,
}) => boolean | Promise<boolean>;

export interface TableRollInterface {
  /** @internal Parent callback scope for a nested roll. */
  parent?: LootTable,
  trace?: RollTraceSink,
  looter?: any,
  context?: any,
  result?: LootTableEntryResults,
  rng?: RngInterface,
  n?: ChancyNumeric,
}

export interface TablePoolRollInterface {
  pool: LootTablePool,
  looter?: any,
  context?: any,
  result?: LootTableEntryResults,
  rng?: RngInterface,
  n?: ChancyNumeric,
}

export default class LootTable {
  name?: string;
  id: string | number;

  /**
   * Filename that should be used to represent this table
   * when it is saved as JSON. This should include relative
   * path/folder names
   */
  fn?: string | number | null;

  ul?: UltraLoot;
  rng: RngInterface;
  pools: Array<LootTablePool> = [];
  functions: Record<string, LootTableFunctionSignature> = {};
  conditions: Record<string, LootTableConditionSignature> = {};

  /**
   * A parent's functions should be available to an Entry table when rolling.
   * For this case, we have to "borrow" the parent table to allow functions/
   * conditions to be used from there if needed.
   *
   * This is a set, so we don't end up with the same table in there multiple times.
   */
  borrowed: Set<LootTable> = new Set();

  private rollAncestors: LootTable[] = [];
  private sourceTable?: LootTable;
  private traceSink?: RollTraceSink;

  private createRollScope (parent?: LootTable, trace?: RollTraceSink): LootTable {
    const source = this.sourceTable ?? this;
    const ancestors = parent?.rollAncestors ?? [];
    if (ancestors.includes(source)) throw new Error('Recursive loot table roll detected');
    // Only callback lookup state belongs to this invocation. Definitions stay shared.
    return Object.assign(Object.create(this), {
      sourceTable: source,
      traceSink: trace ?? parent?.traceSink,
      rollAncestors: [...ancestors, source],
      borrowed: new Set([...this.borrowed, ...(parent ? [parent] : [])])
    });
  }

  get tracing (): boolean { return this.traceSink !== undefined; }

  /** @internal Emit an observation without drawing random numbers. */
  emitTrace (event: Omit<RollTraceEvent, 'tableId'>): void {
    if (this.traceSink) this.traceSink({ ...event, tableId: this.id });
  }

  /**
   * @param definition The loot table definition
   */
  constructor ({ name, rng, id, pools = [], fn, ul } : LootTableDefinition = {}) {
    this.name = name;
    this.pools = pools;
    this.fn = fn;
    this.ul = ul;
    this.rng = rng ?? (ul ? ul.getRng() : new RNG());
    this.id = id ?? this.rng.randomString(6);
  }

  // Register a function for use in loot pools
  registerFunction (name: string, fn: LootTableFunctionSignature) {
    this.functions[name] = fn;
  }

  // Register a condition function for use in loot pools
  registerCondition (name: string, fn: LootTableConditionSignature) {
    this.conditions[name] = fn;
  }

  /**
   * The string to be used as a filename for this table.
   */
  get filename (): string | number | undefined | null {
    return this.fn ?? this.id ?? this.name;
  }

  set filename (fn: string | number | null | undefined) {
    this.fn = fn;
  }

  /**
   * ultraloot instance
   */
  get ultraloot () : UltraLoot | undefined {
    return this.ul;
  }

  set ultraloot (ul) {
    this.ul = ul;
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

  borrow (table: LootTable) {
    this.borrowed.add(table);
    return this;
  }

  unborrow (table: LootTable) {
    this.borrowed.delete(table);
    return this;
  }

  getPools () {
    return this.pools;
  }

  setRng (rng : RngInterface) {
    this.rng = rng;
    return this;
  }

  protected rollBasics ({
    rng,
    looter,
    context,
    n = 1
  } : Omit<TableRollInterface, 'result'>) : [RngInterface, number] {
    const rngToUse = rng ?? this.rng;
    const rolls = rngToUse.chancy(n);
    if (log.enabled) log.gc(`Table: ${this.description} | Rolling table ${rolls} times (from chancy(${JSON.stringify(n)}))`, { looter, context });
    return [rngToUse, rolls];
  }

  /**
   * Roll for loot on this table
   *
   * The looter will generally be the player
   * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
   *
   * @param rollDefinition
   */
  rollSync ({
    parent,
    trace,
    looter,
    context,
    result = new LootTableEntryResults(),
    rng,
    n = 1
  } : TableRollInterface = {}) : LootTableEntryResults {
    const scope = this.createRollScope(parent, trace);
    const [rngToUse, rolls] = scope.rollBasics({ rng, n, looter, context });
    if (scope.tracing) scope.emitTrace({ type: 'table:start', state: scope.tracing ? { ...rngToUse.serialize() } : undefined });
    for (const pool of this.pools) {
      scope.rollPoolSync({
        n: rolls,
        pool,
        rng: rngToUse,
        looter,
        context,
        result
      });
    }
    if (scope.tracing) scope.emitTrace({ type: 'table:end', quantity: result.reduce((sum, entry) => sum + entry.qty, 0), state: scope.tracing ? { ...rngToUse.serialize() } : undefined });
    if (log.enabled) log.ge();
    return result;
  }

  /**
   * Roll for loot on this table
   *
   * The looter will generally be the player
   * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
   *
   * @param rollDefinition
   */
  async roll ({
    parent,
    trace,
    looter,
    context,
    result = new LootTableEntryResults(),
    rng,
    n = 1
  } : TableRollInterface = {}) : Promise<LootTableEntryResults> {
    const scope = this.createRollScope(parent, trace);
    const [rngToUse, rolls] = scope.rollBasics({ rng, n, looter, context });
    if (scope.tracing) scope.emitTrace({ type: 'table:start', state: scope.tracing ? { ...rngToUse.serialize() } : undefined });
    for (const pool of this.pools) {
      await scope.rollPool({
        n: rolls,
        pool,
        rng: rngToUse,
        looter,
        context,
        result
      });
    }
    if (scope.tracing) scope.emitTrace({ type: 'table:end', quantity: result.reduce((sum, entry) => sum + entry.qty, 0), state: scope.tracing ? { ...rngToUse.serialize() } : undefined });
    if (log.enabled) log.ge();
    return result;
  }

  /**
   * Roll for loot on a pool
   *
   * The looter will generally be the player
   * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
   * @param rollDefinition
   */
  rollPoolSync ({
    pool,
    looter,
    context,
    result = new LootTableEntryResults(),
    rng,
    n = 1
  } : TablePoolRollInterface) : LootTableEntryResults {
    const rngToUse = rng ?? this.rng;
    const rolls = rngToUse.chancy(n);
    for (let i = 0; i < rolls; i++) {
      pool.rollSync({ rng: rngToUse, table: this, looter, context, result });
    }
    return result;
  }

  /**
   * Roll for loot on a pool
   *
   * The looter will generally be the player
   * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
   *
   * @param rollDefinition
   */
  async rollPool ({
    pool,
    looter,
    context,
    result = new LootTableEntryResults(),
    rng,
    n = 1
  } : TablePoolRollInterface) : Promise<LootTableEntryResults> {
    const rngToUse = rng ?? this.rng;
    const rolls = rngToUse.chancy(n);
    for (let i = 0; i < rolls; i++) {
      await pool.roll({ rng: rngToUse, table: this, looter, context, result });
    }
    return result;
  }

  hasFunction (fn : FunctionDefinition): boolean {
    const hasSelf = (typeof this.functions[fn.function] !== 'undefined');
    return hasSelf || Array.from(this.borrowed).reduce((acc, cur) => acc || cur.hasFunction(fn), false);
  }

  hasCondition (cond : ConditionDefinition): boolean {
    const hasSelf = (typeof this.conditions[cond.function] !== 'undefined');
    return hasSelf || Array.from(this.borrowed).reduce((acc, cur) => acc || cur.hasCondition(cond), false);
  }

  createPool (def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootTablePool {
    const pool = new LootTablePool(def);
    this.pools.push(pool);
    return pool;
  }

  addPool (def: LootTablePool | LootTablePoolEasyDefinition | LootTablePoolDefinition) : this {
    if ((def instanceof LootTablePool)) {
      this.pools.push(def);
    } else {
      this.createPool(def);
    }
    return this;
  }

  getPotentialDrops () {
    const entries = [];
    for (const pool of this.pools) {
      let totalWeight = 0;
      for (const entry of pool.getEntries()) {
        if (entry instanceof LootTable) {
          totalWeight += 1;
        } else {
          totalWeight += (entry.weight ?? 1);
        }
      }
      const rollsMax = RNG.chancyMax(pool.rolls);
      const rollsMin = RNG.chancyMin(pool.rolls);
      const nullsMin = RNG.chancyMin(pool.nulls);
      for (const entry of pool.getEntries()) {
        if (entry instanceof LootTable || entry.isTable()) {
          let table;
          let weight = 1;
          if (entry instanceof LootTable) {
            weight = 1;
            table = entry;
          } else if (entry.isTable()) {
            weight = entry.weight ?? 1;
            table = entry.getItem();
          }
          // merge the results...
          const pd = table.getPotentialDrops();
          for (const subDrop of pd) {
            entries.push({
              entry: subDrop.entry,
              weight: subDrop.weight / weight,
              min: nullsMin > 0 ? 0 : (rollsMin * subDrop.min),
              max: rollsMax * subDrop.max,
            });
          }
        } else {
          entries.push({
            entry,
            weight: entry.weight / totalWeight,
            min: nullsMin > 0 ? 0 : (rollsMin * RNG.chancyMin(entry.qty)),
            max: rollsMax * RNG.chancyMax(entry.qty),
          });
        }
      }
    }
    return entries;
  }

  /**
   * @param functionDefinition
   * @param context
   */
  async applyFunction (functionDefinition: FunctionDefinition, {
    rng,
    looted,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looted: LootTableEntryResult,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }): Promise<void> {
    if (typeof this.functions[functionDefinition.function] === 'undefined') {
      for (const subtable of Array.from(this.borrowed)) {
        if (subtable.hasFunction(functionDefinition)) {
          return await subtable.applyFunction(functionDefinition, { rng, looted, looter, context, result });
        }
      }
      const err = `Function ${functionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerFunction(name, function).`;
      if (this.ultraloot) {
        if (this.ultraloot.hasFunction(functionDefinition.function)) {
          return await this.ultraloot.applyFunction(functionDefinition, { rng, looted, looter, context, result });
        }
        if (this.ultraloot.throwOnMissingFunctions) {
          throw new Error(err);
        } else {
          console.error(err);
        }
      } else {
        console.error(err);
      }
    } else {
      return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: callbackArgs(functionDefinition) });
    }
  }

  /**
   * @param conditionDefinition
   * @param context
   */
  async applyCondition (conditionDefinition: ConditionDefinition, {
    rng,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }): Promise<boolean> {
    if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
      for (const subtable of Array.from(this.borrowed)) {
        if (subtable.hasCondition(conditionDefinition)) {
          return await subtable.applyCondition(conditionDefinition, { rng, looter, context, result });
        }
      }
      const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
      if (this.ultraloot) {
        if (this.ultraloot.hasCondition(conditionDefinition.function)) {
          return await this.ultraloot.applyCondition(conditionDefinition, { rng, looter, context, result });
        }
        if (this.ultraloot.throwOnMissingConditions) {
          throw new Error(err);
        } else {
          console.error(`CR: ${err}`);
          return true;
        }
      } else {
        console.error(`CR: ${err}`);
        return true;
      }
    }
    return await this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: callbackArgs(conditionDefinition) });
  }

  /**
   * @param functionDefinition
   * @param context
   */
  applyFunctionSync (functionDefinition: FunctionDefinition, {
    rng,
    looted,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looted: LootTableEntryResult,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }): void {
    if (typeof this.functions[functionDefinition.function] === 'undefined') {
      for (const subtable of Array.from(this.borrowed)) {
        if (subtable.hasFunction(functionDefinition)) {
          return subtable.applyFunctionSync(functionDefinition, { rng, looted, looter, context, result });
        }
      }
      const err = `Function ${functionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerFunction(name, function).`;
      if (this.ultraloot) {
        if (this.ultraloot.hasFunction(functionDefinition.function)) {
          return this.ultraloot.applyFunctionSync(functionDefinition, { rng, looted, looter, context, result });
        }
        if (this.ultraloot.throwOnMissingFunctions) {
          throw new Error(err);
        } else {
          console.error(err);
        }
      } else {
        console.error(err);
      }
    } else {
      return invokeSync(this.functions[functionDefinition.function], { rng, looted, looter, context, result, args: callbackArgs(functionDefinition) }, 'function');
    }
  }

  /**
   * @param conditionDefinition
   * @param context
   */
  applyConditionSync (conditionDefinition: ConditionDefinition, {
    rng,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }): boolean {
    if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
      for (const subtable of Array.from(this.borrowed)) {
        if (subtable.hasCondition(conditionDefinition)) {
          return subtable.applyConditionSync(conditionDefinition, { rng, looter, context, result });
        }
      }
      const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
      if (this.ultraloot) {
        if (this.ultraloot.hasCondition(conditionDefinition.function)) {
          return this.ultraloot.applyConditionSync(conditionDefinition, { rng, looter, context, result });
        }
        if (this.ultraloot.throwOnMissingConditions) {
          throw new Error(err);
        } else {
          console.error(err);
          return true;
        }
      } else {
        console.error(err);
        return true;
      }
    }
    return invokeSync(this.conditions[conditionDefinition.function], { rng, looter, context, result, args: callbackArgs(conditionDefinition) }, 'condition');
  }
}
