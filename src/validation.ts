export interface TableValidationIssue {
  path: string;
  code: string;
  message: string;
}

export interface TableValidationOptions {
  mode?: 'sync' | 'async';
  tables?: Record<string, unknown>;
  allowExternalReferences?: boolean;
  functions?: Record<string, unknown>;
  conditions?: Record<string, unknown>;
}

export interface TableValidationResult {
  valid: boolean;
  errors: TableValidationIssue[];
}

const distributions = new Set(['random', 'integer', 'normal_integer', 'dice', 'normal', 'gaussian', 'boxMuller', 'irwinHall', 'bates', 'batesgaussian', 'bernoulli', 'exponential', 'pareto', 'poisson', 'hypergeometric', 'rademacher', 'binomial', 'betaBinomial', 'beta', 'gamma', 'studentsT', 'wignerSemicircle', 'kumaraswamy', 'hermite', 'chiSquared', 'rayleigh', 'logNormal', 'cauchy', 'laplace', 'logistic']);
const record = (value: unknown): value is Record<string, any> => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate structure and references without rolling, invoking callbacks, or consuming RNG. */
export function validateTable (definition: unknown, options: TableValidationOptions = {}): TableValidationResult {
  const errors: TableValidationIssue[] = [];
  const active = new Set<object>();
  let visited = 0;
  const issue = (path: string, code: string, message: string) => { errors.push({ path, code, message }); };
  const chancy = (value: unknown, path: string) => {
    if (value === undefined) return;
    if (typeof value === 'number') {
      if (!Number.isFinite(value) || value < 0) issue(path, 'number.range', 'Expected a finite, non-negative number');
    } else if (typeof value === 'string') {
      if (!/^\s*(?:\d+(?:\.\d+)?|\d*\s*[dD]\s*\d+\s*(?:[+-]\s*\d+(?:\.\d+)?)?)\s*$/.test(value)) issue(path, 'chancy.dice', 'Expected a number or dice expression');
    } else if (Array.isArray(value)) {
      if (!value.length) issue(path, 'chancy.empty', 'A choice list must not be empty');
      value.forEach((entry, index) => {
        if (typeof entry !== 'number' || !Number.isFinite(entry) || entry < 0) issue(`${path}[${index}]`, 'number.range', 'Expected a finite, non-negative number');
      });
    } else if (record(value)) {
      if (value.type !== undefined && !distributions.has(value.type)) issue(`${path}.type`, 'chancy.type', 'Unknown distribution type');
      for (const key of ['min', 'max']) {
        if (value[key] !== undefined && (typeof value[key] !== 'number' || !Number.isFinite(value[key]) || value[key] < 0)) issue(`${path}.${key}`, 'number.range', 'Expected a finite, non-negative bound');
      }
      if (typeof value.min === 'number' && typeof value.max === 'number' && value.min > value.max) issue(path, 'chancy.bounds', 'Minimum must not exceed maximum');
      if (value.type === 'dice' && value.dice === undefined) issue(`${path}.dice`, 'chancy.dice', 'A dice distribution requires dice');
    } else {
      issue(path, 'chancy.type', 'Expected a number, dice expression, numeric choices, or distribution');
    }
  };
  const callbacks = (value: unknown, path: string, registry?: Record<string, unknown>) => {
    if (value === undefined) return;
    if (!Array.isArray(value)) { issue(path, 'callbacks.type', 'Expected an array of callbacks'); return; }
    value.forEach((entry, index) => {
      const at = `${path}[${index}].function`;
      if (!record(entry) || typeof entry.function !== 'string' || !entry.function) {
        issue(at, 'callback.name', 'Expected a callback function name');
      } else if (registry) {
        const fn = Object.prototype.hasOwnProperty.call(registry, entry.function) ? registry[entry.function] : undefined;
        if (typeof fn !== 'function') issue(at, 'callback.missing', `Callback ${entry.function} is not registered`);
        else if (options.mode === 'sync' && Object.prototype.toString.call(fn) === '[object AsyncFunction]') issue(at, 'callback.async', 'Async callbacks require an async roll');
      }
    });
  };
  const table = (value: unknown, path: string, inherited: TableValidationOptions, depth: number) => {
    if (!record(value)) { issue(path, 'table.type', 'Expected a table object'); return; }
    if (active.has(value)) { issue(path, 'table.cycle', 'Recursive table reference'); return; }
    if (depth > 128 || ++visited > 10000) { issue(path, 'table.limit', 'Table graph exceeds validation limits'); return; }
    active.add(value);
    const local = {
      ...inherited,
      functions: record(value.functions) ? { ...inherited.functions, ...value.functions } : inherited.functions,
      conditions: record(value.conditions) ? { ...inherited.conditions, ...value.conditions } : inherited.conditions
    };
    if (value.pools !== undefined && !Array.isArray(value.pools)) issue(`${path}.pools`, 'pools.type', 'Expected an array of pools');
    else {
      (value.pools ?? []).forEach((pool: unknown, index: number) => {
        const at = `${path}.pools[${index}]`;
        if (!record(pool)) { issue(at, 'pool.type', 'Expected a pool object'); return; }
        chancy(pool.rolls, `${at}.rolls`);
        chancy(pool.nulls, `${at}.nulls`);
        callbacks(pool.functions, `${at}.functions`, local.functions);
        callbacks(pool.conditions, `${at}.conditions`, local.conditions);
        if (pool.entries !== undefined && !Array.isArray(pool.entries)) issue(`${at}.entries`, 'entries.type', 'Expected an array of entries');
        else {
          (pool.entries ?? []).forEach((entry: unknown, position: number) => {
            const here = `${at}.entries[${position}]`;
            if (!record(entry)) { issue(here, 'entry.type', 'Expected an entry object'); return; }
            if (Array.isArray(entry.pools)) { table(entry, here, local, depth + 1); return; }
            const effective = { ...(record(pool.template) ? pool.template : {}), ...entry };
            chancy(effective.weight, `${here}.weight`);
            chancy(effective.qty, `${here}.qty`);
            for (const key of ['unique', 'stackable']) {
              if (effective[key] !== undefined && typeof effective[key] !== 'boolean') issue(`${here}.${key}`, 'boolean.type', 'Expected a boolean');
            }
            callbacks(effective.functions, `${here}.functions`, local.functions);
            callbacks(effective.conditions, `${here}.conditions`, local.conditions);
            if (effective.type === 'table') {
              if (record(effective.item)) table(effective.item, `${here}.item`, local, depth + 1);
              else if (typeof effective.item !== 'string') issue(`${here}.item`, 'reference.type', 'Expected a table name');
              else if (options.tables && Object.prototype.hasOwnProperty.call(options.tables, effective.item)) table(options.tables[effective.item], `${here}.item(${effective.item})`, local, depth + 1);
              else if (!options.allowExternalReferences) issue(`${here}.item`, 'reference.missing', `Table ${effective.item} was not supplied`);
            } else if (record(effective.item) && typeof effective.item.rollSync === 'function') table(effective.item, `${here}.item`, local, depth + 1);
          });
        }
      });
    }
    active.delete(value);
  };
  table(definition, '$', options, 0);
  return { valid: errors.length === 0, errors };
}
