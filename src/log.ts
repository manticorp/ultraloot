declare let PRODUCTION: boolean;

let debug = false;
if (typeof PRODUCTION !== 'undefined') {
  debug = !PRODUCTION;
}

/**
 * Logging functions that disappears in production,
 * and still give accurate line numbers in dev.
 */

/**
 * Trigger verbose logs
 */
// debug = false;
const verbose = true;
const ultraverbose = true;

const voidFunc = (...args: any): void => {};
let r = {
  debug: voidFunc,
  v: voidFunc,
  vv: voidFunc,
  vi: voidFunc,
  ve: voidFunc,
  vg: voidFunc,
  vge: voidFunc,
  vgc: voidFunc,
  vt: voidFunc,
  d: voidFunc,
  g: voidFunc,
  ge: voidFunc,
  gc: voidFunc,
  t: voidFunc,
  te: voidFunc,
  time: voidFunc,
  timeEnd: voidFunc,
  group: voidFunc,
  groupEnd: voidFunc,
  groupCollapsed: voidFunc,
  log: voidFunc,
  error: voidFunc,
  table: voidFunc,
  info: voidFunc,
};
if (debug) {
  r = {
    ...r,
    ...{
      debug: function (fn: () => void): void {
        if (debug) {
          fn();
        }
      },
      d: console.log,
      g: console.group,
      ge: console.groupEnd,
      gc: console.groupCollapsed,
      group: console.group,
      groupEnd: console.groupEnd,
      groupCollapsed: console.groupCollapsed,
      log: console.log,
      error: console.error,
      table: console.table,
      info: console.info
    }
  };
  if (verbose) {
    r = {
      ...r,
      ...{
        v: console.log,
        vi: console.info,
        ve: console.error,
        vg: console.group,
        vge: console.groupEnd,
        vgc: console.groupCollapsed,
        vt: console.table,
        t: console.time,
        te: console.timeEnd,
        time: console.time,
        timeEnd: console.timeEnd,
      }
    };
  }
  if (ultraverbose) {
    r.vv = console.log;
  }
}

export default r;
