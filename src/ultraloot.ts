import { invokeSync } from './sync';
import log from './log';
import { default as LootTable, LootTableFunctionSignature, LootTableConditionSignature, LootTableDefinition } from './table';
import { default as LootTablePool, LootTablePoolDefinition } from './table/pool';
import { default as LootTableEntry, LootTableEntryDefinition, FunctionDefinition, ConditionDefinition } from './table/pool/entry';
import LootTableEntryResult from './table/pool/entry/result';
import LootTableEntryResults from './table/pool/entry/results';
import RNG from './rng';
import { Seed, RngInterface, RngConstructor, ChancyNumeric } from './rng/interface';
import packageInfo from './../package.json';
const CURRENT_VERSION = packageInfo.version;
import * as defaultFunctions from './default/functions';
import * as defaultConditions from './default/conditions';

// Set fs properly if we are in node environment
let fs : any;
let nodePath: any;
let nodeUrl: any;
let isNode = false;
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      fs = require('fs');
      nodePath = require('path');
      nodeUrl = require('url');
      isNode = true;
    }
  }
}

const VERSION_KEY = '__version__';

/**
 * This is for easily creating loot tables using a json like
 * object instead of all the specific loot table objects
 */
export type LootTableEasyDefinition = {
  name?: string,
  id?: string,
  rng?: string | number | RngInterface,
  pools?: Array<LootTablePool | LootTablePoolEasyDefinition>,
};

/**
 * This is for easily creating loot table pools using a json like
 * object instead of all the specific loot table objects
 */
export type LootTablePoolEasyDefinition = {
  name?: string,
  id?: string,
  conditions?: Array<ConditionDefinition>,
  functions?: Array<FunctionDefinition>,
  template?: LootTableEntryDefinition,
  rolls?: ChancyNumeric,
  nulls?: ChancyNumeric,
  entries?: Array<LootTableEntry | LootTableEntryDefinition | LootTable>,
};

/**
 * This defines how a LootTable is stored in JSON files
 */
export type LootTableJsonDefinition = {
  name?: string,
  id: string | number,
  fn?: string | number | null,
  rng?: string | number | RngInterface,
  pools?: Array<LootTablePoolJsonDefinition>,
};

/**
 * This defines how a LootTablePool is stored in JSON files
 */
export type LootTablePoolJsonDefinition = {
  name?: string,
  id?: string,
  conditions?: Array<ConditionDefinition>,
  functions?: Array<FunctionDefinition>,
  rolls?: ChancyNumeric,
  nulls?: ChancyNumeric,
  entries: Array<LootTableEntryJsonDefinition>,
};

/**
 * This defines how a LootTableEntry is stored in JSON files
 */
export type LootTableEntryJsonDefinition = {
  name?: string,
  id?: number | string,
  type?: string,
  stackable?: boolean,
  unique?: boolean,
  weight?: number,
  item?: any,
  qty?: ChancyNumeric,
  functions?: Array<FunctionDefinition>,
  conditions?: Array<ConditionDefinition>
};

export class RecursiveTableError extends Error {}

export interface SerializedTables {
  [VERSION_KEY]: string,
  tables: Record<string, LootTableJsonDefinition>
}

export type LoadSaveArgs = { defaultExtension?: string, path?: string };
export type SaveTableArgs = LoadSaveArgs & { filename?: string, includeRng?: boolean, overwrite?: boolean };
type LoadState = { active: Set<string>, tables: Map<string, LootTable>, rootPath?: string };

/**
 * @todo detect recursively required tables
 * @example
 * import {UltraLoot} from "ultraloot";
 *
 * const ultralootDefaultRng = new UltraLoot();           // default RNG
 * const ultralootCustomRng = new UltraLoot("UL7R4L007"); // seeding the built in RNG
 * const ultralootCustomRng = new UltraLoot(rngSource);   // using a custom RNG
 */
export class UltraLoot {
  static version = CURRENT_VERSION;

  version = CURRENT_VERSION;

  /**
   * Default RNG source when none is given
   */
  protected defaultRng?: RngInterface;

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
  protected functions: Record<string, LootTableFunctionSignature> = {};

  /**
   * Global conditions that can be used by loot table pools and entries.
   *
   * The keys in the object are the function identifier used in the table entries/pools
   */
  protected conditions: Record<string, LootTableConditionSignature> = {};

  /**
   * Whether to throw errors when functions are missing, otherwise just does console.error
   */
  public throwOnMissingFunctions: boolean = true;

  /**
   * Whether to throw errors when conditions are missing, otherwise just does console.error
   */
  public throwOnMissingConditions: boolean = true;

  constructor (rng?: Seed | RngInterface) {
    log.d('UltraLoot initialising');
    if (rng !== undefined && rng !== null) {
      this.rng = this.makeRng(rng);
    }
  }

  public registerDefaults () {
    this.registerDefaultFunctions();
    this.registerDefaultConditions();
    return this;
  }

  public registerDefaultFunctions () {
    for (const [key, fn] of Object.entries(defaultFunctions)) {
      this.registerFunction(key, fn);
    }
    return this;
  }

  public registerDefaultConditions () {
    for (const [key, fn] of Object.entries(defaultConditions)) {
      this.registerCondition(key, fn);
    }
    return this;
  }

  /**
   * As we dont expose the class as default, in browser it would be nice
   * if there was a way to create new instances. This can be done using
   * this function.
   */
  public instance (rng?: Seed | RngInterface): UltraLoot {
    return new UltraLoot(rng);
  }

  public setRng (rng: RngInterface): void {
    if (!this.isRng(rng)) {
      throw new Error('rng given does not confirm to RngInterface');
    }
    this.rng = rng;
  }

  public getRng (): RngInterface {
    return this.rng ?? this.getDefaultRng();
  }

  public getDefaultRng (): RngInterface {
    return this.defaultRng ?? (this.defaultRng = this.makeRng());
  }

  public setRngConstructor (rngConstructor: RngConstructor): void {
    this.rngConstructor = rngConstructor;
  }

  public getRngConstructor (): RngConstructor {
    return this.rngConstructor ?? Object.getPrototypeOf(this.getRng()).constructor;
  }

  public isRng (rng?: any): rng is RngInterface {
    if (typeof rng === 'undefined') {
      return false;
    }
    if (typeof rng !== 'object') {
      return false;
    }
    const neededFunctions = [
      'predictable',
      'hashStr',
      'convertStringToNumber',
      'getSeed',
      'seed',
      'percentage',
      'random',
      'chance',
      'chanceTo',
      'randInt',
      'uniqid',
      'randomString',
      'randBetween',
      'normal',
      'chancyInt',
      'chancy',
      'weightedChoice',
      'dice',
      'parseDiceString',
      'clamp',
      'bin',
      'serialize',
    ];
    let hasAllKeys = true;
    for (const key of neededFunctions) {
      hasAllKeys = hasAllKeys && (typeof rng[key] === 'function');
    }
    return hasAllKeys;
  }

  public makeRng (rng?: Seed | RngInterface): RngInterface {
    if (this.isRng(rng)) {
      return rng;
    }
    const RngConstructor : RngConstructor = this.rngConstructor ?? RNG;
    return new RngConstructor(rng);
  }

  public registerFunction (name: string, fn: LootTableFunctionSignature) {
    this.functions[name] = fn;
  }

  public registerCondition (name: string, fn: LootTableConditionSignature) {
    this.conditions[name] = fn;
  }

  public hasFunction (name: string) {
    return typeof this.functions[name] !== 'undefined';
  }

  public hasCondition (name: string) {
    return typeof this.conditions[name] !== 'undefined';
  }

  public noThrowOnMissingFunctionsOrConditions () {
    this.throwOnMissingFunctions = false;
    this.throwOnMissingConditions = false;
    return this;
  }

  public throwOnMissingFunctionsOrConditions () {
    this.throwOnMissingFunctions = true;
    this.throwOnMissingConditions = true;
    return this;
  }

  public functionCheck (fn: FunctionDefinition) {
    log.d(`UL | Applying function ${fn.function}`);
    if (typeof this.functions[fn.function] === 'undefined') {
      const err = `Function ${fn.function} has not been defined. Did you forget to register the function with this loot table? UltraLoot.registerFunction(name, function).`;
      if (this.throwOnMissingFunctions) {
        throw new Error(err);
      } else {
        console.error(err);
      }
      return false;
    } else {
      return true;
    }
  }

  public conditionCheck (cond: ConditionDefinition) {
    log.d(`UL | Applying condition ${cond.function}`);
    if (typeof this.conditions[cond.function] === 'undefined') {
      const err = `Condition ${cond.function} has not been defined. Did you forget to register the function with this loot table? UltraLoot.registerCondition(name, condition_function).`;
      if (this.throwOnMissingConditions) {
        throw new Error(err);
      } else {
        console.error(err);
      }
      return false;
    } else {
      return true;
    }
  }

  public applyFunctionSync (functionDefinition: FunctionDefinition, {
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
  }) {
    if (this.functionCheck(functionDefinition)) {
      return invokeSync(this.functions[functionDefinition.function], { rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.arguments ?? {}, functionDefinition.args ?? {}) }, 'function');
    }
  }

  public applyConditionSync (conditionDefinition: ConditionDefinition, {
    rng,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    if (this.conditionCheck(conditionDefinition)) {
      return invokeSync(this.conditions[conditionDefinition.function], { rng, looter, context, result, args: Object.assign({}, conditionDefinition.arguments ?? {}, conditionDefinition.args ?? {}) }, 'condition');
    }
    return true;
  }

  public async applyFunction (functionDefinition: FunctionDefinition, {
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
  }) {
    if (this.functionCheck(functionDefinition)) {
      return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.arguments ?? {}, functionDefinition.args ?? {}) });
    }
  }

  public async applyCondition (conditionDefinition: ConditionDefinition, {
    rng,
    looter,
    context,
    result
  } : {
    rng: RngInterface,
    looter: any,
    context: any,
    result: LootTableEntryResults
  }) {
    if (this.conditionCheck(conditionDefinition)) {
      return await this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: Object.assign({}, conditionDefinition.arguments ?? {}, conditionDefinition.args ?? {}) });
    }
    return true;
  }

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
  public createTable (def: LootTable | LootTableDefinition | LootTableEasyDefinition | LootTableJsonDefinition): LootTable {
    if (def instanceof LootTable || this.isLootTableDefinition(def)) {
      return new LootTable({ ...def, ul: this, rng: this.makeRng(def.rng ?? this.getRng()) });
    }
    if (this.isEasyLootTableDefinition(def)) {
      return new LootTable(this.transformEasyToProperLootTableDefinition({ ...def, rng: def.rng ?? this.getRng() }));
    }
    throw new Error('Cannot create loot table from these params');
  }

  /**
   * Create a loot pool for use in a loot table
   */
  public createPool (def: LootTablePoolDefinition | LootTablePoolEasyDefinition): LootTablePool {
    if (this.isEasyLootTablePoolDefinition(def)) {
      log.vv('Creating pool from LootTablePoolEasyDefinition');
      return new LootTablePool(this.transformEasyToProperLootTablePoolDefinition(def));
    } else {
      log.vv('Creating pool from LootTablePoolDefinition');
      return new LootTablePool(def);
    }
  }

  /**
   * Create an entry for a loot pool, either with object definition or from a loot table
   */
  public createEntry (def: LootTableEntryDefinition | LootTable): LootTableEntry {
    if (def instanceof LootTable) {
      return new LootTableEntry({
        id: def.id,
        name: def.name,
        item: def,
        qty: 1,
      });
    } else {
      return new LootTableEntry(def);
    }
  }

  /**
   * Used for Typescript type guarding and parameter checking
   */
  protected isLootTableDefinition (def: any): def is LootTableDefinition {
    if (
      def instanceof LootTable ||
      def instanceof LootTablePool ||
      def instanceof LootTableEntry
    ) {
      return false;
    }
    if (def.pools) {
      for (const pool of def.pools) {
        if (!(pool instanceof LootTablePool)) {
          return false;
        }
      }
    }
    return typeof def === 'object';
  }

  /**
   * Used for Typescript type guarding and parameter checking
   */
  protected isEasyLootTableDefinition (def: any): def is LootTableEasyDefinition {
    if (
      def instanceof LootTable ||
      def instanceof LootTablePool ||
      def instanceof LootTableEntry
    ) {
      return false;
    }
    if (def.pools) {
      for (const pool of def.pools) {
        if (pool instanceof LootTablePool) {
          return false;
        }
      }
    }
    return typeof def === 'object';
  }

  /**
   * Used for Typescript type guarding and parameter checking
   */
  protected isEasyLootTablePoolDefinition (def: any): def is LootTablePoolEasyDefinition {
    if (
      def instanceof LootTable ||
      def instanceof LootTablePool ||
      def instanceof LootTableEntry
    ) {
      return false;
    }
    if (def.entries) {
      for (const entry of def.entries) {
        if (entry instanceof LootTableEntry) {
          return false;
        }
      }
    }
    return typeof def === 'object';
  }

  protected transformEasyToProperLootTableDefinition (def: LootTableEasyDefinition): LootTableDefinition {
    const result: LootTableDefinition = {
      rng: this.makeRng(def.rng ?? this.getRng()),
      name: def.name,
      id: def.id,
      pools: [],
    };
    result.pools = [];
    if (def.pools) {
      for (const pool of def.pools) {
        result.pools.push(this.createPool(pool));
      }
    }
    result.ul = this;
    return result;
  }

  protected transformEasyToProperLootTablePoolDefinition (def: LootTablePoolEasyDefinition): LootTablePoolDefinition {
    const transformedEntries = [];
    for (let entry of (def.entries ?? [])) {
      if (this.isEasyLootTableDefinition(entry)) {
        if (typeof entry.pools !== 'undefined' && Array.isArray(entry.pools)) {
          entry = this.createTable(entry);
        }
      }
      transformedEntries.push(entry);
    }
    const result: LootTablePoolDefinition = {
      name: def.name,
      id: def.id,
      rolls: def.rolls,
      nulls: def.nulls,
      template: def.template,
      conditions: def.conditions,
      functions: def.functions,
      entries: transformedEntries
    };
    return result;
  }

  protected pathJoin (parts: string[], sep: string = '/') : string {
    return parts.join(sep).replace(new RegExp(sep + '{1,}', 'g'), sep);
  }

  protected finishWith (str: string, ending: string) : string {
    if (str.endsWith(ending)) {
      return str;
    }
    return str + ending;
  }

  protected finishWithExtension (str: string, extension: string) : string {
    if (str.endsWith(extension)) {
      return str;
    }
    if (str.length === 0) {
      return extension;
    }
    const lastPart = str.split('/').pop() as string;
    const last = lastPart.split('\\').pop() as string;
    const pos = last.includes('.') ? last.lastIndexOf('.') : last.length;
    const fileRoot = str.substring(0, (str.length - last.length) + pos);
    const output = `${fileRoot}.${extension.replace('.', '')}`;
    return output;
  }

  protected getExtension (str: string) : string | null | undefined {
    if (str.length === 0) {
      return null;
    }
    const lastPart = str.split('/').pop() as string;
    const last = lastPart.split('\\').pop() as string;
    if (!last.includes('.')) {
      return null;
    }
    const pos = last.lastIndexOf('.');
    return last.substring(pos, last.length);
  }

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
  public serialize (table: LootTable, { includeRng = false, key, had = new Set() }: { includeRng?: boolean, key?: string | number, had?: Set<any> } = {}): SerializedTables {
    const tables: Record<string, LootTableJsonDefinition> = Object.create(null);
    const keys = new Map<LootTable, string>();
    const owners = new Map<string, LootTable>();
    const active = new Set(had);
    const visit = (current: LootTable, requestedKey?: string | number): string => {
      if (active.has(current)) {
        throw new RecursiveTableError('Recursive requirement detected - cannot serialize recursively required tables.');
      }
      const existing = keys.get(current);
      if (existing !== undefined) return existing;
      const base = String(requestedKey ?? current.filename ?? `table_${keys.size + 1}`);
      let name = base;
      for (let suffix = 2; owners.has(name); suffix++) name = `${base}_${suffix}`;
      keys.set(current, name);
      owners.set(name, current);
      active.add(current);
      const definition: LootTableJsonDefinition = {
        name: current.name,
        id: current.id,
        fn: current.fn,
        pools: current.pools.map(pool => ({
          name: pool.name,
          id: pool.id,
          rolls: pool.rolls,
          nulls: pool.nulls,
          conditions: pool.conditions,
          functions: pool.functions,
          entries: pool.entries.map(entry => {
            const nested = entry instanceof LootTable ? entry : entry.item;
            const saved: LootTableEntryJsonDefinition = entry instanceof LootTable
              ? { id: entry.id, name: entry.name }
              : {
                  id: entry.id,
                  name: entry.name,
                  stackable: entry.stackable,
                  unique: entry.unique,
                  weight: entry.weight,
                  qty: entry.qty,
                  conditions: entry.conditions,
                  functions: entry.functions,
                  item: entry.item
                };
            if (nested instanceof LootTable) {
              saved.type = 'table';
              saved.item = visit(nested);
            }
            return saved;
          })
        }))
      };
      if (includeRng) definition.rng = current.rng.serialize();
      active.delete(current);
      tables[name] = definition;
      return name;
    };
    visit(table, key);
    return { [VERSION_KEY]: CURRENT_VERSION, tables };
  }

  /**
   * Convert a LootTable to JSON
   * @param  {LootTable}       table               The table to serialize
   * @param  {Object}          options             Options
   * @param  {boolean}         options.includeRng  Whether to include the RNG seed in the serialized tables
   * @return {Promise<string>}                     The resulting LootTable representation in a JSON string
   */
  toJson (table: LootTable, { includeRng = false }: { includeRng?: boolean } = {}): string {
    return JSON.stringify(this.serialize(table, { includeRng }));
  }

  /** Save a complete graph as JSON. An explicit destination directory is required. */
  async saveTable (table: LootTable, { path = '', filename, defaultExtension = '.json', includeRng = false, overwrite = false }: SaveTableArgs = {}): Promise<string> {
    if (!isNode) throw new Error('saveTable is only available in Node; use toJson in a browser');
    if (!path) throw new Error('Provide a destination path to saveTable');
    const destination = this.location(filename ?? String(table.filename ?? table.id), path, defaultExtension);
    if (/^https?:/i.test(destination)) throw new Error('saveTable requires a filesystem destination');
    await fs.promises.mkdir(nodePath.dirname(destination), { recursive: true });
    await fs.promises.writeFile(destination, this.toJson(table, { includeRng }), { encoding: 'utf8', flag: overwrite ? 'w' : 'wx' });
    return destination;
  }

  private location (filename: string, path = '', extension = '.json'): string {
    let location: string;
    if (/^(?:https?|file):/i.test(filename)) {
      location = filename;
    } else if (/^(?:https?|file):/i.test(path)) {
      location = new URL(filename, path.endsWith('/') ? path : path + '/').href;
    } else if (isNode) {
      location = nodePath.resolve(path || '.', filename);
    } else {
      location = [path, filename].filter(Boolean).join('/');
    }
    if (/^file:/i.test(location)) location = nodeUrl.fileURLToPath(location);
    if (/^https?:/i.test(location)) {
      const url = new URL(location);
      if (!this.getExtension(url.pathname) && extension) url.pathname = this.finishWithExtension(url.pathname, extension);
      return url.href;
    }
    if (!this.getExtension(location) && extension) location = this.finishWithExtension(location, extension);
    return location;
  }

  private directory (location: string): string {
    if (/^https?:/i.test(location)) return new URL('.', location).href;
    if (isNode) return nodePath.dirname(location);
    return location.substring(0, location.lastIndexOf('/') + 1);
  }

  private async readDefinition (location: string): Promise<any> {
    if (/^https?:/i.test(location) || !isNode) {
      const response = await fetch(location);
      if (!response.ok) throw new Error(`Could not load ${location}: HTTP ${response.status} ${response.statusText}`);
      const text = await response.text();
      try { return JSON.parse(text); } catch (error: any) {
        throw new Error(`Invalid JSON in ${location}: ${error.message}`);
      }
    }
    const extension = this.getExtension(location);
    if (extension === '.js' || extension === '.mjs' || extension === '.cjs') {
      // Leave native module loading intact in both webpack outputs.
      const loaded = await import(/* webpackIgnore: true */ nodeUrl.pathToFileURL(location).href);
      return loaded.default ?? loaded;
    }
    const text = await fs.promises.readFile(location, 'utf8');
    try { return JSON.parse(text); } catch (error: any) {
      throw new Error(`Invalid JSON in ${location}: ${error.message}`);
    }
  }

  private async loadTableInternal (filename: string, options: LoadSaveArgs, state: LoadState): Promise<LootTable> {
    let location = this.location(filename, options.path, options.defaultExtension);
    // Preserve extension discovery for local module tables.
    if (isNode && !/^https?:/i.test(location) && !this.getExtension(filename) && !fs.existsSync(location)) {
      const candidates = [this.location(filename, options.path, ''), ...['.json', '.js', '.cjs', '.mjs'].map(extension => this.finishWithExtension(location, extension))];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) { location = candidate; break; }
      }
    }
    if (state.active.has(location)) throw new RecursiveTableError(`Recursive table reference detected at ${location}`);
    const existing = state.tables.get(location);
    if (existing) return existing;
    state.active.add(location);
    try {
      const definition = await this.readDefinition(location);
      const base = state.rootPath ?? this.directory(location);
      const table = await this.resolveDefinition(definition, child => this.loadTableInternal(child, { ...options, path: base }, state));
      state.tables.set(location, table);
      return table;
    } finally {
      state.active.delete(location);
    }
  }

  /** Load a single definition. Explicit path is shared by all nested references. */
  async loadTable (filename: string, options: LoadSaveArgs = {}): Promise<LootTable> {
    return this.loadTableInternal(filename, options, { active: new Set(), tables: new Map(), rootPath: options.path || undefined });
  }

  async loadTableFromFile (filename: string, options: LoadSaveArgs = {}): Promise<LootTable> {
    if (!isNode) throw new Error('Filesystem loading is only available in Node');
    return this.loadTable(filename, options);
  }

  async loadTableFromUrl (url: string, options: LoadSaveArgs = {}): Promise<LootTable> {
    return this.loadTable(url, options);
  }

  /** Load a serialized graph, including files written by saveTable. */
  async loadTables (filename: string, options: LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    return this.unserialize(await this.readDefinition(this.location(filename, options.path, options.defaultExtension)));
  }

  async loadTablesFromFile (filename: string, options: LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    if (!isNode) throw new Error('Filesystem loading is only available in Node');
    return this.loadTables(filename, options);
  }

  async loadTablesFromUrl (url: string, options: LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    return this.loadTables(url, options);
  }

  private async resolveDefinition (definition: LootTableJsonDefinition, load: (filename: string) => Promise<LootTable>): Promise<LootTable> {
    if (!definition || typeof definition !== 'object') throw new Error('Expected a loot table definition');
    const pools = [];
    for (const pool of definition.pools ?? []) {
      const entries = [];
      for (const entry of pool.entries ?? []) {
        const { type, ...copy } = entry;
        if (type === 'table') copy.item = await load(String(entry.item));
        entries.push(copy);
      }
      pools.push({ ...pool, entries });
    }
    return this.createTable({ ...definition, pools });
  }

  async resolveTable (table: LootTableJsonDefinition, options: LoadSaveArgs = {}): Promise<LootTable> {
    const state: LoadState = { active: new Set(), tables: new Map(), rootPath: options.path || undefined };
    return this.resolveDefinition(table, filename => this.loadTableInternal(filename, options, state));
  }

  /**
   * Unserializes tables serialized with the "serialize" function
   * @param  {Record<string, LootTableJsonDefinition>} tables Record of tables serialized using the "serialize" function
   * @return {Promise<Record<string, LootTable>>}             A key/value pairing of tables
   */
  unserialize (tables: SerializedTables): Record<string, LootTable> {
    if (!tables || !tables.tables || typeof tables.tables !== 'object') {
      throw new Error('Expected a serialized tables object');
    }
    const result: Record<string, LootTable> = Object.create(null);
    const pending = new Map(Object.entries(tables.tables));
    while (pending.size > 0) {
      let progress = false;
      for (const [id, definition] of pending) {
        const dependencies = (definition.pools ?? []).flatMap(pool => pool.entries ?? [])
          .filter(entry => entry.type === 'table').map(entry => String(entry.item));
        for (const dependency of dependencies) {
          if (!Object.prototype.hasOwnProperty.call(tables.tables, dependency)) {
            throw new Error(`Table ${dependency} not present in serialized data`);
          }
        }
        if (dependencies.some(dependency => !Object.prototype.hasOwnProperty.call(result, dependency))) continue;
        // Work on fresh definitions: callers can reuse a saved graph repeatedly.
        const restored: LootTableJsonDefinition = {
          ...definition,
          rng: undefined,
          pools: (definition.pools ?? []).map(pool => ({
            ...pool,
            entries: (pool.entries ?? []).map(entry => {
              const { type, ...copy } = entry;
              if (type === 'table') copy.item = result[String(entry.item)];
              return copy;
            })
          }))
        };
        result[id] = this.createTable(restored);
        if (definition.rng != null) {
          result[id].setRng(this.getRngConstructor().unserialize(definition.rng as any));
        }
        pending.delete(id);
        progress = true;
      }
      if (!progress) throw new RecursiveTableError('Recursive table dependency cycle detected in serialized data');
    }
    return result;
  }
}

export default UltraLoot;
