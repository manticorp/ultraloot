import type { RollTraceSink } from './trace';
import UltraLoot from './ultraloot';
import LootTable from './table';
import type { LootTableEntryDefinition } from './table/pool/entry';
import type LootTableEntryResult from './table/pool/entry/result';
import type LootTableEntryResults from './table/pool/entry/results';
import type { ChancyNumeric, RngInterface, Seed } from './rng/interface';

export type CallbackRegistry = Record<string, any>;
export type ExecutionMode = 'sync' | 'async';
export type TypedCallbackDefinition<Args extends CallbackRegistry> = {
  [Name in keyof Args & string]: { function: Name } & (undefined extends Args[Name] ? { args?: Args[Name] } : { args: Args[Name] })
}[keyof Args & string];
export interface TypedCallbackContext<Item, Looter, Context, Args> {
  rng: RngInterface;
  looted: LootTableEntryResult<Item>;
  looter: Looter;
  context: Context;
  result: LootTableEntryResults<Item>;
  args: Args;
}
export type TypedModifier<Item, Looter, Context, Args, Execution extends ExecutionMode> =
  (value: TypedCallbackContext<Item, Looter, Context, Args>) => Execution extends 'sync' ? undefined : void | Promise<void>;
export type TypedCondition<Item, Looter, Context, Args, Execution extends ExecutionMode> =
  (value: Omit<TypedCallbackContext<Item, Looter, Context, Args>, 'looted'>) => Execution extends 'sync' ? boolean : boolean | Promise<boolean>;
export type TypedEntry<Item, Functions extends CallbackRegistry, Conditions extends CallbackRegistry> =
  Omit<LootTableEntryDefinition, 'item' | 'functions' | 'conditions'> & {
    item?: Item;
    functions?: Array<TypedCallbackDefinition<Functions>>;
    conditions?: Array<TypedCallbackDefinition<Conditions>>;
  };
export interface TypedTableDefinition<Item, Functions extends CallbackRegistry, Conditions extends CallbackRegistry> {
  id?: string;
  name?: string;
  rng?: Seed | RngInterface;
  pools?: Array<{
    id?: string;
    name?: string;
    rolls?: ChancyNumeric;
    nulls?: ChancyNumeric;
    template?: Partial<TypedEntry<Item, Functions, Conditions>>;
    entries?: Array<TypedEntry<Item, Functions, Conditions>>;
    functions?: Array<TypedCallbackDefinition<Functions>>;
    conditions?: Array<TypedCallbackDefinition<Conditions>>;
  }>;
}
export interface TypedRollOptions<Looter, Context> {
  trace?: RollTraceSink;
  looter: Looter;
  context: Context;
  rng?: RngInterface;
  n?: ChancyNumeric;
}

/** An opt-in typed boundary over the existing extensible loot engine. */
export class TypedLootTable<Item, Looter, Context, Functions extends CallbackRegistry, Conditions extends CallbackRegistry, Execution extends ExecutionMode> {
  constructor (public readonly raw: LootTable, public readonly mode: Execution) {}

  registerFunction<Name extends keyof Functions & string> (name: Name, fn: TypedModifier<Item, Looter, Context, Functions[Name], Execution>): this {
    this.raw.registerFunction(name, value => fn({ ...value, args: value.args }));
    return this;
  }

  registerCondition<Name extends keyof Conditions & string> (name: Name, fn: TypedCondition<Item, Looter, Context, Conditions[Name], Execution>): this {
    this.raw.registerCondition(name, value => fn({ ...value, args: value.args }));
    return this;
  }

  roll (options: TypedRollOptions<Looter, Context>): Promise<LootTableEntryResults<Item>> {
    return this.raw.roll(options);
  }

  rollSync (this: TypedLootTable<Item, Looter, Context, Functions, Conditions, 'sync'>, options: TypedRollOptions<Looter, Context>): LootTableEntryResults<Item> {
    return this.raw.rollSync(options);
  }
}

export class TypedUltraLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry, Execution extends ExecutionMode = 'sync'> {
  readonly raw: UltraLoot;
  constructor (public readonly mode: Execution, seed?: Seed | RngInterface) {
    this.raw = new UltraLoot(seed);
  }

  registerFunction<Name extends keyof Functions & string> (name: Name, fn: TypedModifier<Item, Looter, Context, Functions[Name], Execution>): this {
    this.raw.registerFunction(name, value => fn({ ...value, args: value.args }));
    return this;
  }

  registerCondition<Name extends keyof Conditions & string> (name: Name, fn: TypedCondition<Item, Looter, Context, Conditions[Name], Execution>): this {
    this.raw.registerCondition(name, value => fn({ ...value, args: value.args }));
    return this;
  }

  createTable (definition: TypedTableDefinition<Item, Functions, Conditions>): TypedLootTable<Item, Looter, Context, Functions, Conditions, Execution> {
    return new TypedLootTable(this.raw.createTable(definition), this.mode);
  }
}

export function createSyncLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry> (seed?: Seed | RngInterface): TypedUltraLoot<Item, Looter, Context, Functions, Conditions, 'sync'> {
  return new TypedUltraLoot('sync', seed);
}

export function createAsyncLoot<Item, Looter, Context, Functions extends CallbackRegistry = CallbackRegistry, Conditions extends CallbackRegistry = CallbackRegistry> (seed?: Seed | RngInterface): TypedUltraLoot<Item, Looter, Context, Functions, Conditions, 'async'> {
  return new TypedUltraLoot('async', seed);
}
