/** Preserve callback payload shapes while retaining legacy object-alias merging. */
export function callbackArgs ({ args, arguments: legacy }: { args?: unknown, arguments?: unknown }, cloneRecord = false): any {
  const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
  if (record(args) && record(legacy)) return { ...legacy, ...args };
  const value = args !== undefined ? args : legacy;
  if (cloneRecord && record(value)) return { ...value };
  return value === undefined ? {} : value;
}
