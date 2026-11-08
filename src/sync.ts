/** Invoke a synchronous extension without silently accepting asynchronous work. */
export function invokeSync (fn: (args: any) => any, args: any, label: string): any {
  if (Object.prototype.toString.call(fn) === '[object AsyncFunction]') {
    throw new Error(`Cannot use an async ${label} in a sync roll`);
  }
  const value = fn(args);
  if (value != null && typeof value.then === 'function') {
    // Observe rejected promises before throwing our synchronous contract error.
    Promise.resolve(value).catch(() => {});
    throw new Error(`Cannot return a promise from a sync ${label} call`);
  }
  return value;
}
