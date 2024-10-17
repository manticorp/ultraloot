import log from './log';
import { default as LootTable, LootTableFunctionSignature, LootTableConditionSignature, LootTableDefinition } from './table';
import { default as LootTablePool, LootTablePoolDefinition } from './table/pool';
import { default as LootTableEntry, LootTableEntryDefinition, FunctionDefinition, ConditionDefinition } from './table/pool/entry';
import LootTableEntryResult from './table/pool/entry/result';
import LootTableEntryResults from './table/pool/entry/results';
import { default as RNG, Seed, RngInterface, RngConstructor, Chancy } from './rng';
import { version as CURRENT_VERSION } from './../package.json';
import * as defaultFunctions from './default/functions';
import * as defaultConditions from './default/conditions';

// Set fs properly if we are in node environment
let fs : any;
let isNode = false;
if (typeof process === 'object') {
  if (typeof process.versions === 'object') {
    if (typeof process.versions.node !== 'undefined') {
      fs = require('fs');
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
  rolls?: Chancy,
  nulls?: Chancy,
  entries?: Array<LootTableEntry | LootTableEntryDefinition | LootTable>,
};

/**
 * This defines how a LootTable is stored in JSON files
 */
export type LootTableJsonDefinition = {
  name?: string,
  id?: string,
  fn?: string,
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
  rolls?: Chancy,
  nulls?: Chancy,
  entries: Array<LootTableEntryJsonDefinition>,
};

/**
 * This defines how a LootTableEntry is stored in JSON files
 */
export type LootTableEntryJsonDefinition = {
  name?: string,
  id: number | string,
  type?: string,
  stackable?: boolean,
  weight?: number,
  item?: any,
  qty?: Chancy,
  functions?: Array<FunctionDefinition>,
  conditions?: Array<ConditionDefinition>
};

export class RecursiveTableError extends Error {}

export interface SerializedTables {
  [VERSION_KEY]: string,
  tables: Record<string, LootTableJsonDefinition>
}

export type LoadSaveArgs = { defaultExtension?: string, path?: string };

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
    if (rng) {
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
    return this.rngConstructor ?? Object.getPrototypeOf(this.rng).constructor;
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
      'uniqstr',
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
      return this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.args ?? {}, functionDefinition.arguments ?? {})});
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
      const conditionCallResult = this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: Object.assign({}, conditionDefinition.args ?? {}, conditionDefinition.arguments ?? {})});
      if (conditionCallResult instanceof Promise) {
        throw new Error('Cannot return promise from sync condition call');
      }
      return conditionCallResult;
    }
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
      return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.args ?? {}, functionDefinition.arguments ?? {})});
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
      return await this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: Object.assign({}, conditionDefinition.args ?? {}, conditionDefinition.arguments ?? {})});
    }
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
  public createTable (def: LootTable | LootTableDefinition | LootTableEasyDefinition): LootTable {
    if (def instanceof LootTable || this.isLootTableDefinition(def)) {
      if (def instanceof LootTable) {
        log.vv('Creating table from LootTable');
      } else {
        log.vv('Creating table from LootTableDefinition');
      }
      def.ul = this;
      if (def.rng) {
        def.rng = def.rng ?? this.makeRng(def.rng);
      } else {
        def.rng = this.getRng();
      }
      const lt = new LootTable(def);
      lt.ultraloot = this;
      return lt;
    } else if (this.isEasyLootTableDefinition(def)) {
      log.vv('Creating table from LootTableEasyDefinition');
      if (def.rng) {
        def.rng = def.rng ?? this.makeRng(def.rng);
      } else {
        def.rng = this.getRng();
      }
      const lt = new LootTable(this.transformEasyToProperLootTableDefinition(def));
      lt.ultraloot = this;
      return lt;
    } else {
      throw new Error('Cannot create loot table from these params');
    }
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
    const last = str.split('/').pop().split('\\').pop();
    const pos = last.includes('.') ? last.lastIndexOf('.') : last.length;
    const fileRoot = str.substr(0, (str.length - last.length) + pos);
    const output = `${fileRoot}.${extension.replace('.', '')}`;
    return output;
  }

  protected getExtension (str: string) : string | null | undefined {
    const last = str.split('/').pop().split('\\').pop();
    if (!last.includes('.')) {
      return null;
    }
    const pos = last.lastIndexOf('.');
    return last.substr(pos, last.length);
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
  public serialize (table: LootTable, { includeRng = false, key, had = new Set() }: { includeRng?: boolean, key?: string, had?: Set<any> } = {}): SerializedTables {
    const result: Record<string, LootTableJsonDefinition> = {};
    const clone: LootTableJsonDefinition = {
      name: table.name,
      id: table.id,
      fn: table.fn,
      pools: []
    };

    const keyToUse = table.filename ?? this.getRng().uniqstr(6);
    had.add(table);

    if (includeRng) {
      clone.rng = table.rng?.serialize() ?? null;
    }

    for (const pool of (table.pools ?? [])) {
      const poolClone: LootTablePoolJsonDefinition = {
        name: pool.name,
        id: pool.id,
        rolls: pool.rolls,
        nulls: pool.nulls,
        conditions: pool.conditions,
        functions: pool.functions,
        entries: [],
      };

      for (const entry of (pool.entries ?? [])) {
        const entryClone: LootTableEntryJsonDefinition = {
          name: entry.name,
          id: entry.id,
        };

        if (entry instanceof LootTable) {
          entryClone.item = entry;
        } else {
          entryClone.stackable = entry.stackable;
          entryClone.weight = entry.weight;
          entryClone.item = entry.item;
          entryClone.qty = entry.qty;
          entryClone.conditions = entry.conditions;
          entryClone.functions = entry.functions;
        }

        if (entryClone.item instanceof LootTable) {
          const subKeyToUse = entryClone.item.filename ?? this.getRng().uniqstr(6);
          if (had.has(entryClone.item)) {
            throw new RecursiveTableError('Recursive requirement detected - cannot serialize recursively required tables.');
          }
          if (typeof result[subKeyToUse] === 'undefined') {
            entryClone.item.filename = subKeyToUse;
            const r = (this.serialize(entryClone.item, { includeRng, key: subKeyToUse, had }));
            result[subKeyToUse] = r.tables[subKeyToUse];
          }
          entryClone.type = 'table';
          entryClone.item = subKeyToUse;
        }
        poolClone.entries.push(entryClone);
      }
      clone.pools.push(poolClone);
    }

    result[keyToUse] = clone;
    const final = {
      [VERSION_KEY]: CURRENT_VERSION,
      tables: result
    };
    return final;
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

  /**
   * @todo Implement this
   */
  async saveTable (table: LootTable, { path = '', defaultExtension } : LoadSaveArgs = {}) {
    throw new Error('Not yet implemented.');
  }

  /**
   * Load serialized tables from a file.
   *
   * This is just a wrapper around unserializing json contents of a file.
   *    */
  async loadTables (filename: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    defaultExtension = defaultExtension ?? this.getExtension(path) ?? '.json';
    const fullPath = this.finishWith(this.pathJoin([path, filename]), defaultExtension);
    if (isNode) {
      if (fullPath.startsWith('http') || fullPath.startsWith('file://')) {
        return this.loadTablesFromUrl(fullPath, { path });
      } else {
        return this.loadTablesFromFile(fullPath, { path });
      }
    } else {
      return this.loadTablesFromUrl(fullPath, { path });
    }
  }

  /**
   * Loads serialized tables from a local file
   */
  async loadTablesFromFile (filename: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    defaultExtension = defaultExtension ?? this.getExtension(path) ?? '.json';
    log.d(`Reading tables from ${filename}`);
    let contents;
    const ext = this.getExtension(filename);
    if (ext === '.js') {
      const cb = await fs.promises.readFile(`${filename}`, 'utf8');
      // eslint-disable-next-line no-eval
      contents = eval(cb);
    } else {
      contents = await fs.promises.readFile(filename, 'utf8')
        .then((d:string) => JSON.parse(d))
        .catch((e: any) => {
          if (e instanceof SyntaxError) {
            e.message = `There was an error loading file: "${filename}". ${e.message}`;
            throw e;
          }
          throw e;
        });
    }
    return this.unserialize(contents);
  }

  /**
   * Load serialized tables from a url
   */
  async loadTablesFromUrl (url: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<Record<string, LootTable>> {
    defaultExtension = defaultExtension ?? this.getExtension(url) ?? '.json';
    log.d(`Reading tables from ${url}`);
    return fetch(url).then(data => data.text()).then(txt => {
      try {
        return JSON.parse(txt);
      } catch (e : any) {
        if (e instanceof SyntaxError) {
          e.message = `There was an error loading file: "${url}". ${e.message}`;
          throw e;
        }
        throw e;
      }
    }).then(tables => {
      return this.unserialize(tables);
    });
  }

  /**
   * Load a table from a file.
   *
   * The file can be local or a url. If running in browser, it's always treated as
   * a URL. When run in node, it will only treat it as a URL if it's prefixed with
   * http.
   *
   * This function expects a single table to be located in the file, as the base object.
   */
  async loadTable (filename: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<LootTable | null> {
    const ext = defaultExtension ?? this.getExtension(filename) ?? '.json';
    const fullPath = this.finishWithExtension(this.pathJoin([path, filename]), ext);
    log.d('Load Table', {
      filenameWithPath: this.pathJoin([path, filename]),
      filename,
      defaultExtension,
      ext,
      path,
      fullPath
    });
    if (isNode) {
      if (fullPath.startsWith('http') || fullPath.startsWith('file://')) {
        return this.loadTableFromUrl(fullPath, { path, defaultExtension });
      } else {
        return this.loadTableFromFile(filename, { path, defaultExtension });
      }
    } else {
      return this.loadTableFromUrl(fullPath, { path, defaultExtension });
    }
  }

  /**
   * Loads a table from a local file
   */
  async loadTableFromFile (filename: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<LootTable | null> {
    defaultExtension = defaultExtension ?? this.getExtension(filename) ?? '.json';

    const extension = this.getExtension(filename);
    const pj = this.pathJoin([path, filename]);
    if (!extension) {
      // If the file exists without extension, try and read it as json
      if (fs.existsSync(pj) && fs.statSync(pj).isFile()) {
        const contents = await fs.promises.readFile(pj, 'utf8')
          .then((d:string) => JSON.parse(d))
          .catch((e: any) => {
            if (e instanceof SyntaxError) {
              e.message = `There was an error loading file: "${filename}". ${e.message}`;
              throw e;
            }
            throw e;
          });
        return this.resolveTable(contents, { path, defaultExtension });
      }

      // Try and dynamically find the filename.
      const extensions = new Set([
        defaultExtension,
        '.json',
        '.js',
        '.cjs',
        '.mjs'
      ]);
      for (const extension of extensions) {
        const fnWithExt = this.finishWithExtension(pj, extension);
        if (fs.existsSync(fnWithExt) && fs.statSync(fnWithExt).isFile()) {
          return this.loadTableFromFile(this.finishWithExtension(filename, extension), { path, defaultExtension });
        }
      }
    }

    if (!fs.existsSync(pj)) {
      throw new Error(`Could not find file "${filename}" in path "${path}"`);
    }

    let contents;
    if (
      extension === '.js' ||
      extension === '.mjs' ||
      extension === '.cjs'
    ) {
      // unfortunately, typescript mangles import statements, so the only
      // way we can do this is using eval...
      const cb = await fs.promises.readFile(`${pj}`, 'utf8');
      // eslint-disable-next-line no-eval
      contents = eval(cb);
    } else if (extension === '.json' || defaultExtension === '') {
      contents = await fs.promises.readFile(pj, 'utf8')
        .then((d:string) => JSON.parse(d))
        .catch((e: any) => {
          if (e instanceof SyntaxError) {
            e.message = `There was an error loading file: "${filename}". ${e.message}`;
            throw e;
          }
          throw e;
        });
    }
    return this.resolveTable(contents, { path, defaultExtension });
  }

  /**
   * Loads a table from a url
   */
  async loadTableFromUrl (url: string, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<LootTable | null> {
    defaultExtension = defaultExtension ?? this.getExtension(url) ?? '.json';
    return fetch(url).then(data => data.text()).then(txt => {
      try {
        return JSON.parse(txt);
      } catch (e : any) {
        if (e instanceof SyntaxError) {
          e.message = `There was an error loading file: "${url}". ${e.message}`;
          throw e;
        }
        throw e;
      }
    }).then(tables => {
      return this.resolveTable(tables, { path, defaultExtension });
    });
  }

  /**
   * Turns a JSON representation into a LootTable, and does the
   * same for all nested tables inside pools recursively.
   */
  async resolveTable (table: LootTableJsonDefinition, { path = '', defaultExtension } : LoadSaveArgs = {}): Promise<LootTable | null> {
    for (const pool of (table.pools ?? [])) {
      for (const entry of (pool.entries ?? [])) {
        if (entry.type === 'table') {
          entry.item = await this.loadTable(entry.item, { path, defaultExtension });
        }
        delete entry.type;
      }
    }
    const lootTable = this.createTable(table);
    return lootTable;
  }

  /**
   * Unserializes tables serialized with the "serialize" function
   * @param  {Record<string, LootTableJsonDefinition>} tables Record of tables serialized using the "serialize" function
   * @return {Promise<Record<string, LootTable>>}             A key/value pairing of tables
   */
  unserialize (tables: SerializedTables): Record<string, LootTable> {
    const result: Record<string, LootTable> = {};

    // When unserializing, we loop through multiple times because there is
    // inheretence - so we need to unserialize things in the right order.
    // To avoid building complex inheritance chains, we just loop through
    // up to 100 times, so things can be nested up to 100 times, restarting
    // when we hit an unserialized nested requirement.
    let i = 100;

    // @TODO Detect recursive requirements better.

    /* eslint-disable no-labels */
    while (Object.values(tables.tables).length > 0 && i-- > 0) {
      getBack:
      for (const [id, table] of Object.entries(tables.tables)) {
        const rng = table.rng ?? null;
        delete table.rng;
        log.v(`Unserializing table ${id}`);
        for (const pool of (table.pools ?? [])) {
          for (const entry of (pool.entries ?? [])) {
            if (entry.type === 'table') {
              if (typeof result[entry.item] === 'undefined') {
                if (typeof tables.tables[entry.item] === 'undefined') {
                  throw new Error(`Table ${entry.item} not present in serialized data`);
                }
                // We do the following to unserialize things in the correct order.
                log.v(`We didn't have ${entry.item} in our results`);
                // Weirdly, javascript has no way to break out of nested loops except using labels?
                // anyway...this is unusual, but hey ho
                continue getBack;
              }
              entry.item = result[entry.item];
            }
            delete entry.type;
          }
        }
        result[id] = this.createTable(table);
        if (rng) {
          result[id].setRng(this.getRngConstructor().unserialize(rng));
        }
        delete tables.tables[id];
      }
    }
    if (i === 0) {
      throw new Error('Maximum nested serialized table limit reached (could be a recursive requirement somewhere causing an issue?)');
    }
    /* eslint-enable no-labels */
    return result;
  }
}

export default UltraLoot;
