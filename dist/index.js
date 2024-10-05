(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UltraLoot"] = factory();
	else
		root["UltraLoot"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/default/conditions.ts":
/*!***********************************!*\
  !*** ./src/default/conditions.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dependLooter = exports.dependContext = void 0;
const utils_1 = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/**
 * Returns true or false depending on value set in looter
 * @param args
 * @example
 * const context = { a: { b: 'foo', c: true, d: false } };
 * dependContext({ context, args: { property: 'a.b' } }); // true
 * dependContext({ context, args: { property: 'a.b', tobe: 'foo' } }); // true
 * dependContext({ context, args: { property: 'a.c', tobe: 'foo' } }); // false
 * dependContext({ context, args: { property: 'a.c' } }); // true
 * dependContext({ context, args: { property: 'a.d' } }); // false
 *
 * @example
 * // Use in a json file:
 * {
 *   "pools": [
 *     {
 *       "conditions": [
 *         {
 *           "function": "dependContext",
 *           "args": {
 *             "property": "physical.wet"
 *           }
 *         }
 *       ],
 *       "entries": [
 *         {
 *           "id": "soggy_newspaper"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
const dependContext = ({ context, args }) => {
    return (0, utils_1.depend)(context, args);
};
exports.dependContext = dependContext;
/**
 * Returns true or false depending on value set in looter
 * @param args
 * @example
 * const looter = { a: { b: 'foo', c: true, d: false } };
 * dependLooter({ looter, args: { property: 'a.b' } }); // true
 * dependLooter({ looter, args: { property: 'a.b', tobe: 'foo' } }); // true
 * dependLooter({ looter, args: { property: 'a.c', tobe: 'foo' } }); // false
 * dependLooter({ looter, args: { property: 'a.c' } }); // true
 * dependLooter({ looter, args: { property: 'a.d' } }); // false
 *
 * @example
 * // Use in a json file:
 * {
 *   "pools": [
 *     {
 *       "conditions": [
 *         {
 *           "function": "dependLooter",
 *           "args": {
 *             "property": "status.sickness",
 *             "min": 0.5
 *           }
 *         }
 *       ],
 *       "entries": [
 *         {
 *           "id": "sickness_healing_pack"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
const dependLooter = ({ looter, args }) => {
    return (0, utils_1.depend)(looter, args);
};
exports.dependLooter = dependLooter;


/***/ }),

/***/ "./src/default/functions.ts":
/*!**********************************!*\
  !*** ./src/default/functions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setToRandomChoice = exports.inheritContext = exports.inheritLooter = void 0;
const utils_1 = __webpack_require__(/*! ./../utils */ "./src/utils.ts");
/**
 * Inherits some property from looter to looted
 * @param args
 * @example
 * inheritLooter({looted, looter, {
 *   looterProperty: 'equipped.color',
 *   lootedProperty: 'item.color'
 *   default: 'red',
 * }})
 */
const inheritLooter = ({ looted, looter, args }) => {
    (0, utils_1.dotSet)(looted, args.property ?? args.lootedProperty, (0, utils_1.dotGet)(looter, args.property ?? args.looterProperty, args.default));
};
exports.inheritLooter = inheritLooter;
/**
 * Inherits some property from context to looted
 * @param args
 * @example
 * inheritContext({looted, looter, {
 *   contextProperty: 'dyed.color',
 *   lootedProperty: 'item.color'
 *   default: 'brown',
 * }})
 */
const inheritContext = ({ looted, context, args }) => {
    (0, utils_1.dotSet)(looted, args.property ?? args.lootedProperty, (0, utils_1.dotGet)(context, args.property ?? args.contextProperty, args.default));
};
exports.inheritContext = inheritContext;
/**
 * Sets a property of looted to some random choice from choices list
 *
 * Choices can be a simple array, or a map of anything => weight.
 *
 * @param args
 * @example
 * setToRandomChoice({rng, looted, {
 *   property: 'item.color',
 *   choices: ['red', 'green', 'blue']
 * }}); // looted.item.color will be one of red, green or blue.
 */
const setToRandomChoice = ({ rng, looted, args }) => {
    const { property, choices } = args;
    if (property && looted && choices) {
        (0, utils_1.dotSet)(looted, property, rng.weightedChoice(choices));
    }
};
exports.setToRandomChoice = setToRandomChoice;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LootTableEntryResults = exports.LootTableEntryResult = exports.LootTableEntry = exports.LootTablePool = exports.LootTableManager = exports.LootTable = exports.PredictableRng = exports.Rng = void 0;
__exportStar(__webpack_require__(/*! ./ultraloot */ "./src/ultraloot.ts"), exports);
__exportStar(__webpack_require__(/*! ./rng */ "./src/rng.ts"), exports);
__exportStar(__webpack_require__(/*! ./rng/predictable */ "./src/rng/predictable.ts"), exports);
__exportStar(__webpack_require__(/*! ./table */ "./src/table.ts"), exports);
__exportStar(__webpack_require__(/*! ./table/manager */ "./src/table/manager.ts"), exports);
__exportStar(__webpack_require__(/*! ./table/pool */ "./src/table/pool.ts"), exports);
__exportStar(__webpack_require__(/*! ./table/pool/entry */ "./src/table/pool/entry.ts"), exports);
__exportStar(__webpack_require__(/*! ./table/pool/entry/result */ "./src/table/pool/entry/result.ts"), exports);
__exportStar(__webpack_require__(/*! ./table/pool/entry/results */ "./src/table/pool/entry/results.ts"), exports);
const ultraloot_1 = __webpack_require__(/*! ./ultraloot */ "./src/ultraloot.ts");
var rng_1 = __webpack_require__(/*! ./rng */ "./src/rng.ts");
Object.defineProperty(exports, "Rng", ({ enumerable: true, get: function () { return rng_1.default; } }));
var predictable_1 = __webpack_require__(/*! ./rng/predictable */ "./src/rng/predictable.ts");
Object.defineProperty(exports, "PredictableRng", ({ enumerable: true, get: function () { return predictable_1.default; } }));
var table_1 = __webpack_require__(/*! ./table */ "./src/table.ts");
Object.defineProperty(exports, "LootTable", ({ enumerable: true, get: function () { return table_1.default; } }));
var manager_1 = __webpack_require__(/*! ./table/manager */ "./src/table/manager.ts");
Object.defineProperty(exports, "LootTableManager", ({ enumerable: true, get: function () { return manager_1.default; } }));
var pool_1 = __webpack_require__(/*! ./table/pool */ "./src/table/pool.ts");
Object.defineProperty(exports, "LootTablePool", ({ enumerable: true, get: function () { return pool_1.default; } }));
var entry_1 = __webpack_require__(/*! ./table/pool/entry */ "./src/table/pool/entry.ts");
Object.defineProperty(exports, "LootTableEntry", ({ enumerable: true, get: function () { return entry_1.default; } }));
var result_1 = __webpack_require__(/*! ./table/pool/entry/result */ "./src/table/pool/entry/result.ts");
Object.defineProperty(exports, "LootTableEntryResult", ({ enumerable: true, get: function () { return result_1.default; } }));
var results_1 = __webpack_require__(/*! ./table/pool/entry/results */ "./src/table/pool/entry/results.ts");
Object.defineProperty(exports, "LootTableEntryResults", ({ enumerable: true, get: function () { return results_1.default; } }));
// This provides an easy way of using ultraloot in browser.
// It can be instantiated by new UltraLoot() and submodules can be
// instantiated by new UltraLoot.LootTable() and whatnot.
exports["default"] = ultraloot_1.UltraLoot;


/***/ }),

/***/ "./src/log.ts":
/*!********************!*\
  !*** ./src/log.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let debug = false;
if (true) {
    debug = !false;
}
/**
 * Logging functions that disappears in production,
 * and still give accurate line numbers in dev.
 */
/**
 * Trigger verbose logs
 */
debug = false;
const verbose = true;
const ultraverbose = true;
const voidFunc = (...args) => { };
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
            debug: function (fn) {
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
exports["default"] = r;


/***/ }),

/***/ "./src/rng.ts":
/*!********************!*\
  !*** ./src/rng.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RngAbstract = void 0;
const MAX_RECURSIONS = 100;
const THROW_ON_MAX_RECURSIONS_REACHED = true;
const diceRe = /^ *([0-9]+) *[dD] *([0-9]+) *([+-]? *[0-9]*) *$/;
const diceReNoInit = /^ *[dD] *([0-9]+) *([+-]? *[0-9]*) *$/;
const strToNumberCache = {};
const diceCache = {};
class RngAbstract {
    #seed = 0;
    constructor(seed) {
        this.setSeed(seed);
    }
    getSeed() {
        return this.#seed;
    }
    sameAs(other) {
        return this.#seed === other.#seed;
    }
    setSeed(seed) {
        if (typeof seed !== 'undefined' && seed !== null) {
            if (typeof seed === 'string') {
                seed = this.convertStringToNumber(seed);
            }
            this.#seed = seed;
        }
        else {
            return this.setSeed(Math.ceil(Math.random() * 100000000));
        }
        return this;
    }
    seed(seed) {
        this.setSeed(seed);
        return this;
    }
    serialize() {
        return {
            seed: this.#seed,
        };
    }
    static unserialize(serialized) {
        const { constructor } = Object.getPrototypeOf(this);
        const rng = new constructor(serialized.seed);
        rng.setSeed(serialized.seed);
        return rng;
    }
    predictable(seed) {
        const { constructor } = Object.getPrototypeOf(this);
        const newSelf = new constructor(seed);
        return newSelf;
    }
    static predictable(seed) {
        return new this(seed);
    }
    hashStr(str) {
        let hash = 0;
        let i;
        let chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    convertStringToNumber(str) {
        if (strToNumberCache[str]) {
            return strToNumberCache[str];
        }
        const num = this.hashStr(str);
        strToNumberCache[str] = num;
        return num;
    }
    _random() {
        return Math.random();
    }
    percentage() {
        return this.randBetween(0, 100);
    }
    random(from = 0, to = 1, skew = 0) {
        return this.randBetween(from, to, skew);
    }
    chance(n, chanceIn = 1) {
        const chance = n / chanceIn;
        return this._random() <= chance;
    }
    // 500 to 1 chance, for example
    chanceTo(from, to) {
        return this._random() <= (from / (from + to));
    }
    randInt(from = 0, to = 1, skew = 0) {
        [from, to] = [Math.min(from, to), Math.max(from, to)];
        let rand = this._random();
        if (skew < 0) {
            rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
        }
        else {
            rand = Math.pow(rand, Math.pow(2, -skew));
        }
        return Math.floor(rand * ((to + 1) - from)) + from;
    }
    // Not deterministic
    uniqid(prefix = '', random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`;
    }
    // Deterministic
    uniqstr(len = 6) {
        const str = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const alen = 61;
        for (let i = 0; i < len; i++) {
            str.push(alphabet[this.randInt(0, alen)]);
        }
        return str.join('');
    }
    randBetween(from = 0, to = 1, skew = 0) {
        [from, to] = [Math.min(from, to), Math.max(from, to)];
        let rand = this._random();
        if (skew < 0) {
            rand = 1 - (Math.pow(rand, Math.pow(2, skew)));
        }
        else {
            rand = Math.pow(rand, Math.pow(2, -skew));
        }
        return this.scaleNorm(rand, from, to);
    }
    scale(number, from, to, min = 0, max = 1) {
        if (number > max)
            throw new Error(`Number ${number} is greater than max of ${max}`);
        if (number < min)
            throw new Error(`Number ${number} is less than min of ${min}`);
        // First we scale the number in the range [0-1)
        number = (number - min) / (max - min);
        return this.scaleNorm(number, from, to);
    }
    scaleNorm(number, from, to) {
        if (number > 1 || number < 0)
            throw new Error(`Number must be < 1 and > 0, got ${number}`);
        return (number * (to - from)) + from;
    }
    shouldThrowOnMaxRecursionsReached() {
        return THROW_ON_MAX_RECURSIONS_REACHED;
    }
    // Gaussian number between 0 and 1
    normal({ mean, stddev = 1, max, min, skew = 0 } = {}, depth = 0) {
        if (depth > MAX_RECURSIONS && this.shouldThrowOnMaxRecursionsReached()) {
            throw new Error('Max recursive calls to rng normal function. This might be as a result of using predictable random numbers?');
        }
        let num = this.boxMuller();
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (depth > MAX_RECURSIONS) {
            num = Math.min(Math.max(num, 0), 1);
        }
        else {
            if (num > 1 || num < 0) {
                return this.normal({ mean, stddev, max, min, skew }, depth + 1); // resample between 0 and 1
            }
        }
        if (skew < 0) {
            num = 1 - (Math.pow(num, Math.pow(2, skew)));
        }
        else {
            num = Math.pow(num, Math.pow(2, -skew));
        }
        if (typeof mean === 'undefined') {
            mean = 0;
            if (typeof max !== 'undefined' && typeof min !== 'undefined') {
                num *= max - min;
                num += min;
            }
            else {
                num = num * 10;
                num = num - 5;
            }
        }
        else {
            num = num * 10;
            num = num - 5;
            num = num * stddev + mean;
        }
        if (depth <= MAX_RECURSIONS && ((typeof max !== 'undefined' && num > max) || (typeof min !== 'undefined' && num < min))) {
            return this.normal({ mean, stddev, max, min, skew }, depth + 1);
        }
        // In the case where we are above the max recursion limit, we just clamp the number...
        // this can happen in extreme cases where parameters are very marginal, but we do not
        // want to return any out of bounds numbers in the case that max and min are given, even
        // if they are not strictly normally distributed - i.e. there will be a very marginal bias
        // to the bounds numbers in certain cases, but it's largely a non-issue.
        if (typeof max !== 'undefined') {
            num = Math.min(num, max);
        }
        if (typeof min !== 'undefined') {
            num = Math.max(num, min);
        }
        return num;
    }
    // Standard Normal variate using Box-Muller transform.
    boxMuller(mean = 0, stddev = 1) {
        const u = 1 - this._random(); // Converting [0,1) to (0,1]
        const v = this._random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Transform to the desired mean and standard deviation:
        return z * stddev + mean;
    }
    chancyInt(input) {
        if (typeof input === 'number') {
            return Math.round(input);
        }
        if (typeof input === 'object') {
            input.type = 'integer';
        }
        return this.chancy(input);
    }
    chancy(input) {
        if (typeof input === 'string') {
            return this.dice(input);
        }
        if (typeof input === 'object') {
            switch (input.type) {
                case 'normal':
                    return this.normal(input);
                    break;
                case 'normal_integer':
                    return Math.floor(this.normal(input));
                    break;
                case 'integer':
                    return this.randInt(input.min ?? 0, input.max ?? 1, input.skew ?? 0);
                    break;
                default:
                    return this.random(input.min ?? 0, input.max ?? 1, input.skew ?? 0);
            }
        }
        if (typeof input === 'number') {
            return input;
        }
        throw new Error('Invalid input given to chancy');
    }
    static chancyMin(input) {
        if (typeof input === 'string') {
            return this.diceMin(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            if (typeof input.type === 'undefined') {
                if (typeof input.skew !== 'undefined') {
                    // Regular random numbers are evenly distributed, so skew
                    // only makes sense on normal numbers
                    input.type = 'normal';
                }
            }
            switch (input.type) {
                case 'normal':
                    return input.min ?? Number.NEGATIVE_INFINITY;
                    break;
                case 'normal_integer':
                    return input.min ?? Number.NEGATIVE_INFINITY;
                    break;
                case 'integer':
                    return input.min ?? 0;
                    break;
                default:
                    return input.min ?? 0;
            }
        }
    }
    static chancyMax(input) {
        if (typeof input === 'string') {
            return this.diceMax(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            if (typeof input.type === 'undefined') {
                if (typeof input.skew !== 'undefined') {
                    // Regular random numbers are evenly distributed, so skew
                    // only makes sense on normal numbers
                    input.type = 'normal';
                }
            }
            switch (input.type) {
                case 'normal':
                    return input.max ?? Number.POSITIVE_INFINITY;
                    break;
                case 'normal_integer':
                    return input.max ?? Number.POSITIVE_INFINITY;
                    break;
                case 'integer':
                    return input.max ?? 1;
                    break;
                default:
                    return input.max ?? 1;
            }
        }
    }
    choice(data) {
        return this.weightedChoice(data);
    }
    /**
     * data format:
     * {
     *   choice1: 1,
     *   choice2: 2,
     *   choice3: 3,
     * }
     */
    weightedChoice(data) {
        let total = 0;
        let id;
        if (Array.isArray(data)) {
            const chances = new Map();
            data.forEach(function (a) {
                chances.set(a, 1);
            });
            return this.weightedChoice(chances);
        }
        if (data instanceof Map) {
            data.forEach((value, key) => {
                total += value;
            });
        }
        else {
            for (id in data) {
                if (data[id] < 0) {
                    throw new Error('Probability cannot be negative');
                }
                total += data[id];
            }
        }
        const random = this._random() * total;
        let part = 0;
        if (data instanceof Map) {
            for (const [id, value] of data) {
                part += value;
                if (random < part) {
                    return id;
                }
            }
        }
        else {
            for (id in data) {
                part += data[id];
                if (random < part) {
                    return id;
                }
            }
        }
        // If by some floating-point annoyance we have
        // random >= total, just return the last id.
        return id;
    }
    static parseDiceArgs(n = 1, d = 6, plus = 0) {
        if (n === null || typeof n === 'undefined' || arguments.length <= 0) {
            throw new Error('Dice expects at least one argument');
        }
        if (typeof n === 'string') {
            return this.parseDiceString(n);
        }
        if (typeof n === 'object') {
            if (Array.isArray(n)) {
                [n, d, plus] = n;
            }
            else {
                d = n.d;
                plus = n.plus;
                n = n.n;
            }
        }
        return { n, d, plus };
    }
    parseDiceArgs(n = 1, d = 6, plus = 0) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceArgs(n);
    }
    static parseDiceString(string) {
        // dice string like 5d10+1
        if (!diceCache[string]) {
            if (diceRe.test(string)) {
                const result = diceRe.exec(string.replace(/ +/g, ''));
                if (result !== null) {
                    diceCache[string] = {
                        n: (parseInt(result[1]) / 1 || 1),
                        d: (parseInt(result[2]) / 1 || 1),
                        plus: (parseFloat(result[3]) / 1 || 0),
                    };
                }
            }
            else if (diceReNoInit.test(string)) {
                const result = diceReNoInit.exec(string.replace(/ +/g, ''));
                if (result !== null) {
                    diceCache[string] = {
                        n: 1,
                        d: (parseInt(result[1]) / 1 || 1),
                        plus: (parseFloat(result[2]) / 1 || 0),
                    };
                }
            }
        }
        return diceCache[string];
    }
    static diceMax(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return (n * d) + plus;
    }
    static diceMin(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return n + plus;
    }
    dice(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        if (typeof n === 'number') {
            let nval = Math.max(n, 1);
            const dval = Math.max(d, 1);
            if (d === 1) {
                return plus + 1;
            }
            let sum = plus || 0;
            while (nval > 0) {
                sum += this.randInt(1, dval);
                nval--;
            }
            return sum;
        }
        throw new Error('Invalid arguments given to dice');
    }
    parseDiceString(string) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceString(string);
    }
    clamp(number, lower, upper) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
        return number;
    }
    bin(val, bins, min, max) {
        const spread = max - min;
        return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
    }
}
exports.RngAbstract = RngAbstract;
class Rng extends RngAbstract {
    #mask;
    #seed;
    #m_z = 0;
    constructor(seed) {
        super(seed);
        this.#mask = 0xffffffff;
        this.#m_z = 987654321;
    }
    serialize() {
        return {
            mask: this.#mask,
            seed: this.getSeed(),
            m_z: this.#m_z,
        };
    }
    sameAs(other) {
        const s = other.serialize();
        return this.#seed === s.seed &&
            this.#mask === s.mask &&
            this.#m_z === s.m_z;
    }
    static unserialize(serialized) {
        const rng = new this();
        rng.setSeed(serialized.seed);
        rng.#mask = serialized.mask;
        rng.#seed = serialized.seed;
        rng.#m_z = serialized.m_z;
        return rng;
    }
    seed(i) {
        super.seed(i);
        this.#m_z = 987654321;
        return this;
    }
    _random() {
        this.#m_z = (36969 * (this.#m_z & 65535) + (this.#m_z >> 16)) & this.#mask;
        this.setSeed((18000 * (this.getSeed() & 65535) + (this.getSeed() >> 16)) & this.#mask);
        let result = ((this.#m_z << 16) + this.getSeed()) & this.#mask;
        result /= 4294967296;
        return result + 0.5;
    }
}
exports["default"] = Rng;


/***/ }),

/***/ "./src/rng/predictable.ts":
/*!********************************!*\
  !*** ./src/rng/predictable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const rng_1 = __webpack_require__(/*! ./../rng */ "./src/rng.ts");
/**
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 */
class Rng extends rng_1.RngAbstract {
    counter = 0;
    _results = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 - Number.EPSILON];
    constructor(seed, results) {
        super(seed);
        if (results) {
            this.results = results;
        }
    }
    get results() {
        return this._results;
    }
    set results(results) {
        if (results.length <= 0) {
            throw new Error('Must provide some fake results.');
        }
        for (const r of results) {
            if (r < 0) {
                throw new Error(`Results must be greater than or equal to 0, got '${r}'`);
            }
            if (r >= 1) {
                throw new Error(`Results must be less than 1, got '${r}'`);
            }
        }
        this._results = results;
        this.reset();
    }
    evenSpread(n) {
        const p = [];
        for (let i = 0; i < (n - 1); i++) {
            p.push(i / (n - 1));
        }
        p.push(1 - Number.EPSILON);
        return p;
    }
    setEvenSpread(n) {
        this.results = this.evenSpread(n);
        return this;
    }
    sameAs(other) {
        return this.results.sort().join(',') === other.results.sort().join(',') &&
            this.counter === other.counter;
    }
    reset() {
        this.counter = 0;
        return this;
    }
    _random() {
        return this.results[this.counter++ % this.results.length];
    }
}
exports["default"] = Rng;


/***/ }),

/***/ "./src/table.ts":
/*!**********************!*\
  !*** ./src/table.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
const pool_1 = __webpack_require__(/*! ./table/pool */ "./src/table/pool.ts");
const results_1 = __webpack_require__(/*! ./table/pool/entry/results */ "./src/table/pool/entry/results.ts");
const rng_1 = __webpack_require__(/*! ./rng */ "./src/rng.ts");
class LootTable {
    name;
    id;
    /**
     * Filename that should be used to represent this table
     * when it is saved as JSON. This should include relative
     * path/folder names
     */
    fn;
    ul;
    rng;
    pools = [];
    functions = {};
    conditions = {};
    /**
     * A parent's functions should be available to an Entry table when rolling.
     * For this case, we have to "borrow" the parent table to allow functions/
     * conditions to be used from there if needed.
     *
     * This is a set, so we don't end up with the same table in there multiple times.
     */
    borrowed = new Set();
    /**
     * @param definition The loot table definition
     */
    constructor({ name, rng, id, pools = [], fn, ul } = {}) {
        this.name = name;
        this.pools = pools;
        this.fn = fn;
        this.ul = ul;
        this.rng = rng ?? (ul ? ul.getRng() : new rng_1.default());
        this.id = id ?? this.rng.uniqstr(6);
    }
    // Register a function for use in loot pools
    registerFunction(name, fn) {
        this.functions[name] = fn;
    }
    // Register a condition function for use in loot pools
    registerCondition(name, fn) {
        this.conditions[name] = fn;
    }
    /**
     * The string to be used as a filename for this table.
     */
    get filename() {
        return this.fn ?? this.id ?? this.name ?? null;
    }
    set filename(fn) {
        this.fn = fn;
    }
    /**
     * ultraloot instance
     */
    get ultraloot() {
        return this.ul;
    }
    set ultraloot(ul) {
        this.ul = ul;
    }
    get description() {
        return this.describe();
    }
    describe() {
        if (this.name) {
            return `${this.name} [${this.id}]`;
        }
        return `[${this.id}]`;
    }
    borrow(table) {
        this.borrowed.add(table);
        return this;
    }
    unborrow(table) {
        this.borrowed.delete(table);
        return this;
    }
    getPools() {
        return this.pools;
    }
    setRng(rng) {
        this.rng = rng;
        return this;
    }
    rollBasics({ rng, looter, context, n = 1 }) {
        const rngToUse = rng ?? this.rng;
        const rolls = rngToUse.chancy(n);
        log_1.default.gc(`Table: ${this.description} | Rolling table ${rolls} times (from chancy(${JSON.stringify(n)}))`, { looter, context });
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
    rollSync({ looter, context, result = new results_1.default(), rng, n = 1 } = {}) {
        const [rngToUse, rolls] = this.rollBasics({ rng, n, looter, context });
        for (const pool of this.pools) {
            this.rollPoolSync({
                n: rolls,
                pool,
                rng: rngToUse,
                looter,
                context,
                result
            });
        }
        log_1.default.ge();
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
    async roll({ looter, context, result = new results_1.default(), rng, n = 1 } = {}) {
        const [rngToUse, rolls] = this.rollBasics({ rng, n, looter, context });
        let i = 1;
        for (const pool of this.pools) {
            await this.rollPool({
                n: rolls,
                pool,
                rng: rngToUse,
                looter,
                context,
                result
            });
        }
        log_1.default.ge();
        return result;
    }
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     * @param rollDefinition
     */
    rollPoolSync({ pool, looter, context, result = new results_1.default(), rng, n = 1 }) {
        const rngToUse = rng ?? this.rng;
        const rolls = rngToUse.chancy(n);
        for (let i = 0; i < rolls; i++) {
            pool.rollSync({ rng, table: this, looter, context, result });
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
    async rollPool({ pool, looter, context, result = new results_1.default(), rng, n = 1 }) {
        const rngToUse = rng ?? this.rng;
        const rolls = rngToUse.chancy(n);
        for (let i = 0; i < rolls; i++) {
            await pool.roll({ rng, table: this, looter, context, result });
        }
        return result;
    }
    hasFunction(fn) {
        const hasSelf = (typeof this.functions[fn.function] !== 'undefined');
        return hasSelf || Array.from(this.borrowed).reduce((acc, cur) => acc || cur.hasFunction(fn), false);
    }
    hasCondition(cond) {
        const hasSelf = (typeof this.conditions[cond.function] !== 'undefined');
        return hasSelf || Array.from(this.borrowed).reduce((acc, cur) => acc || cur.hasCondition(cond), false);
    }
    createPool(def) {
        const pool = new pool_1.default(def);
        this.pools.push(pool);
        return pool;
    }
    addPool(def) {
        if ((def instanceof pool_1.default)) {
            this.pools.push(def);
        }
        else {
            this.createPool(def);
        }
        return this;
    }
    getPotentialDrops() {
        const entries = [];
        for (const pool of this.pools) {
            let totalWeight = 0;
            for (const entry of pool.getEntries()) {
                if (entry instanceof LootTable) {
                    totalWeight += 1;
                }
                else {
                    totalWeight += (entry.weight ?? 1);
                }
            }
            const rollsMax = rng_1.default.chancyMax(pool.rolls);
            const rollsMin = rng_1.default.chancyMin(pool.rolls);
            const nullsMin = rng_1.default.chancyMin(pool.nulls);
            for (const entry of pool.getEntries()) {
                if (entry instanceof LootTable || entry.isTable()) {
                    let table;
                    let weight;
                    if (entry instanceof LootTable) {
                        weight = 1;
                        table = entry;
                    }
                    else if (entry.isTable()) {
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
                }
                else {
                    entries.push({
                        entry,
                        weight: entry.weight / totalWeight,
                        min: nullsMin > 0 ? 0 : (rollsMin * rng_1.default.chancyMin(entry.qty)),
                        max: rollsMax * rng_1.default.chancyMax(entry.qty),
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
    async applyFunction(functionDefinition, { rng, looted, looter, context, result }) {
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
                }
                else {
                    console.error(err);
                }
            }
            else {
                console.error(err);
            }
        }
        else {
            return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.arguments });
        }
    }
    /**
     * @param conditionDefinition
     * @param context
     */
    async applyCondition(conditionDefinition, { rng, looted, looter, context, result }) {
        if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
            for (const subtable of Array.from(this.borrowed)) {
                if (subtable.hasCondition(conditionDefinition)) {
                    return await subtable.applyCondition(conditionDefinition, { rng, looted, looter, context, result });
                }
            }
            const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
            if (this.ultraloot) {
                if (this.ultraloot.hasCondition(conditionDefinition.function)) {
                    return await this.ultraloot.applyCondition(conditionDefinition, { rng, looted, looter, context, result });
                }
                if (this.ultraloot.throwOnMissingConditions) {
                    throw new Error(err);
                }
                else {
                    console.error(err);
                    return true;
                }
            }
            else {
                console.error(err);
                return true;
            }
        }
        return await this.conditions[conditionDefinition.function]({ rng, looted, looter, context, result, args: conditionDefinition.arguments });
    }
    /**
     * @param functionDefinition
     * @param context
     */
    applyFunctionSync(functionDefinition, { rng, looted, looter, context, result }) {
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
                }
                else {
                    console.error(err);
                }
            }
            else {
                console.error(err);
            }
        }
        else {
            return this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.arguments });
        }
    }
    /**
     * @param conditionDefinition
     * @param context
     */
    applyConditionSync(conditionDefinition, { rng, looted, looter, context, result }) {
        if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
            for (const subtable of Array.from(this.borrowed)) {
                if (subtable.hasCondition(conditionDefinition)) {
                    return subtable.applyConditionSync(conditionDefinition, { rng, looted, looter, context, result });
                }
            }
            const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
            if (this.ultraloot) {
                if (this.ultraloot.hasCondition(conditionDefinition.function)) {
                    return this.ultraloot.applyConditionSync(conditionDefinition, { rng, looted, looter, context, result });
                }
                if (this.ultraloot.throwOnMissingConditions) {
                    throw new Error(err);
                }
                else {
                    console.error(err);
                    return true;
                }
            }
            else {
                console.error(err);
                return true;
            }
        }
        const conditionCallResult = this.conditions[conditionDefinition.function]({ rng, looted, looter, context, result, args: conditionDefinition.arguments });
        if (conditionCallResult instanceof Promise) {
            throw new Error('Cannot return promise from sync condition call');
        }
        return conditionCallResult;
    }
}
exports["default"] = LootTable;


/***/ }),

/***/ "./src/table/manager.ts":
/*!******************************!*\
  !*** ./src/table/manager.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const table_1 = __webpack_require__(/*! ./../table */ "./src/table.ts");
/**
 * Example implementation of a loot table manager.
 */
class LootTableManager {
    tables = {};
    constructor(tables = {}) {
        this.addTables(tables);
    }
    addTables(tables) {
        if (Array.isArray(tables)) {
            for (const table of tables) {
                this.addTable(table);
            }
        }
        else {
            for (const [key, table] of Object.entries(tables)) {
                this.addTable(key, table);
            }
        }
        return this;
    }
    addTable(name, table) {
        if (typeof name === 'string' && typeof table !== 'undefined' && table instanceof table_1.default) {
            this.tables[name] = table;
        }
        else if (typeof table === 'string' && name instanceof table_1.default) {
            this.tables[table] = name;
        }
        else if (name instanceof table_1.default) {
            this.tables[name.id] = name;
        }
        else {
            throw new Error('Error adding table - no loot table given?');
        }
        return this;
    }
    getTable(name) {
        if (typeof this.tables[name] === 'undefined') {
            throw new Error('Table not yet registered.');
        }
        return this.tables[name];
    }
}
exports["default"] = LootTableManager;


/***/ }),

/***/ "./src/table/pool.ts":
/*!***************************!*\
  !*** ./src/table/pool.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const log_1 = __webpack_require__(/*! ./../log */ "./src/log.ts");
const entry_1 = __webpack_require__(/*! ./pool/entry */ "./src/table/pool/entry.ts");
const result_1 = __webpack_require__(/*! ./pool/entry/result */ "./src/table/pool/entry/result.ts");
const results_1 = __webpack_require__(/*! ./pool/entry/results */ "./src/table/pool/entry/results.ts");
const table_1 = __webpack_require__(/*! ./../table */ "./src/table.ts");
const rng_1 = __webpack_require__(/*! ./../rng */ "./src/rng.ts");
class LootPool {
    name;
    id;
    conditions = [];
    functions = [];
    rolls = 1;
    nulls = 0;
    entries = [];
    template = {};
    static NULLKEY = '__NULL__fd2a99d2-26c0-4454-a284-34578b94e0f6';
    /**
     * @param definition The loot table pool definition
     */
    constructor({ name, id, conditions = [], functions = [], rolls = 1, nulls = 0, entries = [], template, } = {}) {
        this.name = name;
        this.conditions = conditions ?? [];
        this.functions = functions ?? [];
        this.rolls = rolls;
        this.nulls = nulls;
        this.id = id ?? (new rng_1.default()).uniqstr(6);
        this.template = template;
        if (entries) {
            for (const entry of entries) {
                this.addEntry(entry);
            }
        }
    }
    get description() {
        return this.describe();
    }
    describe() {
        if (this.name) {
            return `${this.name} [${this.id}]`;
        }
        return `[${this.id}]`;
    }
    createEntry(def) {
        const entry = new entry_1.default({ ...(this.template ?? {}), ...def });
        this.entries.push(entry);
        return entry;
    }
    addEntry(entry, def) {
        if (entry instanceof table_1.default) {
            entry = new entry_1.default({
                ...(this.template ?? {}),
                ...(def ?? {}),
                ...{
                    id: entry.id,
                    item: entry,
                }
            });
        }
        if (entry instanceof entry_1.default) {
            this.entries.push(entry);
        }
        else {
            this.createEntry(entry);
        }
        return this;
    }
    getEntries() {
        return this.entries;
    }
    rollPreamble({ rng }) {
        const numRolls = rng.chancyInt(this.rolls);
        log_1.default.gc(`Pool ${this.description} | Rolling pool ${numRolls} times (from chancy(${JSON.stringify(this.rolls)}))`);
        // We store a list of key/value choices with their weights in an array
        const choices = {};
        // A special NULL key to track null results
        if (rng.chancy(this.nulls) > 0) {
            choices[LootPool.NULLKEY] = rng.chancy(this.nulls);
        }
        // map the weights to positions in entries.
        this.entries.forEach((a, i) => {
            if (a instanceof table_1.default) {
                choices[i] = 1;
            }
            else {
                choices[i] = rng.chancy(a.weight ?? 1);
            }
        });
        return [numRolls, choices];
    }
    async roll({ rng, table, looter, context, result = new results_1.default() }) {
        const [numRolls, choices] = this.rollPreamble({ rng });
        const overallIntermediate = new results_1.default();
        for (let i = 0; i < numRolls; i++) {
            // This is our choice from the choices table
            const choice = rng.weightedChoice(choices);
            // Then, unless it is the null key, we extract it!
            if (choice !== LootPool.NULLKEY) {
                const entry = this.entries[choice];
                if (entry instanceof table_1.default) {
                    // If the entry is a loot table, voila - we can roll it directly
                    overallIntermediate.merge(await entry.roll({ looter, context, rng }));
                }
                else if (entry instanceof entry_1.default) {
                    // Otherwise, we can roll the entry itself
                    log_1.default.g(`Pool ${this.description} | Rolling Loot Table Entry`);
                    overallIntermediate.merge(await entry.roll({ rng, table, looter, context }));
                    log_1.default.ge();
                    if (entry.unique) {
                        choices[choice] = 0;
                    }
                }
            }
            else {
                log_1.default.v(`Pool ${this.description} | Got null result`);
            }
        }
        // Then we process all the results
        await this.processEntryResults(overallIntermediate, { rng, table, looter, context, result });
        log_1.default.ge();
        return result;
    }
    rollSync({ rng, table, looter, context, result = new results_1.default() }) {
        const [numRolls, choices] = this.rollPreamble({ rng });
        const overallIntermediate = new results_1.default();
        for (let i = 0; i < numRolls; i++) {
            // This is our choice from the choices table
            const choice = rng.weightedChoice(choices);
            // Then, unless it is the null key, we extract it!
            if (choice !== LootPool.NULLKEY) {
                const entry = this.entries[choice];
                if (entry instanceof table_1.default) {
                    // If the entry is a loot table, voila - we can roll it directly
                    overallIntermediate.merge(entry.rollSync({ looter, context, rng }));
                }
                else if (entry instanceof entry_1.default) {
                    // Otherwise, we can roll the entry itself
                    log_1.default.g(`Pool ${this.description} | Rolling Loot Table Entry`);
                    overallIntermediate.merge(entry.rollSync({ rng, table, looter, context }));
                    log_1.default.ge();
                    if (entry.unique) {
                        choices[choice] = 0;
                    }
                }
            }
            else {
                log_1.default.v(`Pool ${this.description} | Got null result`);
            }
        }
        // Then we process all the results
        this.processEntryResultsSync(overallIntermediate, { rng, table, looter, context, result });
        log_1.default.ge();
        return result;
    }
    async processEntryResults(entryResults, { rng, table, looter, context, result = new results_1.default() }) {
        const results = [];
        for (const entryResult of entryResults) {
            results.push(this.processEntryResult(entryResult, { rng, table, looter, context, result }));
        }
        return Promise.all(results);
    }
    processEntryResultsSync(entryResults, { rng, table, looter, context, result = new results_1.default() }) {
        for (const entryResult of entryResults) {
            this.processEntryResultSync(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    async processEntryResult(looted, { rng, table, looter, context, result = new results_1.default() }) {
        for (const fn of this.functions) {
            await table.applyFunction(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = await table.applyCondition(cond, { rng, looted, looter, context, result });
            log_1.default.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                log_1.default.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        log_1.default.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new result_1.default({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
    processEntryResultSync(looted, { rng, table, looter, context, result = new results_1.default() }) {
        for (const fn of this.functions) {
            table.applyFunctionSync(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = table.applyConditionSync(cond, { rng, looted, looter, context, result });
            log_1.default.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                log_1.default.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        log_1.default.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new result_1.default({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
}
exports["default"] = LootPool;


/***/ }),

/***/ "./src/table/pool/entry.ts":
/*!*********************************!*\
  !*** ./src/table/pool/entry.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const log_1 = __webpack_require__(/*! ./../../log */ "./src/log.ts");
const table_1 = __webpack_require__(/*! ./../../table */ "./src/table.ts");
const result_1 = __webpack_require__(/*! ./entry/result */ "./src/table/pool/entry/result.ts");
const results_1 = __webpack_require__(/*! ./entry/results */ "./src/table/pool/entry/results.ts");
class LootTableEntry {
    id;
    stackable = true;
    unique = false;
    name;
    weight = 1;
    item;
    qty = 1;
    functions;
    conditions;
    /**
     * @param definition The loot table entry definition
     */
    constructor({ id, stackable = true, unique = false, name, weight = 1, item, functions = [], conditions = [], qty = 1, } = {}) {
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
    get description() {
        return this.describe();
    }
    describe() {
        if (this.name) {
            return `${this.name} [${this.id}]`;
        }
        return `[${this.id}]`;
    }
    getItem() {
        return this.item ?? this.id;
    }
    deepCloneObject(ob) {
        // Simplest way to deep clone a simple object.
        // Anything more complex will have to implement a "clone" function.
        return JSON.parse(JSON.stringify(ob));
    }
    cloneItem() {
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
        }
        else {
            return this.item;
        }
    }
    isTable() {
        return this.getItem() instanceof table_1.default;
    }
    resultDefinition(rng) {
        const def = {
            id: this.id,
            stackable: this.stackable,
            name: this.name,
            item: this.cloneItem(),
            qty: rng.chancy(this.qty)
        };
        return def;
    }
    generateBaseResults(rng) {
        const def = this.resultDefinition(rng);
        return new results_1.default([new result_1.default(def)]);
    }
    async roll({ rng, table, looter, context, result = new results_1.default(), }) {
        if (this.isTable()) {
            return await this.rollTable({ rng, table, looter, context, result });
        }
        else {
            return await this.rollItem({ rng, table, looter, context, result });
        }
    }
    async rollItem({ rng, table, looter, context, result = new results_1.default() }) {
        log_1.default.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        await this.processEntryResults(this.generateBaseResults(rng), { rng, table, looter, context, result });
        return result;
    }
    async rollTable({ rng, table, looter, context, result = new results_1.default() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = await this.getItem().borrow(table).roll({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        await this.processEntryResults(entryResults, { rng, table, looter, context, result });
        return result;
    }
    async processEntryResults(entryResults, { rng, table, looter, context, result = new results_1.default() }) {
        for (const entryResult of entryResults) {
            await this.processEntryResult(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    async processEntryResult(entryResult, { rng, table, looter, context, result = new results_1.default() }) {
        for (const fn of this.functions) {
            await table.applyFunction(fn, { rng, looted: entryResult, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            add = add && await table.applyCondition(cond, { rng, looted: entryResult, looter, context, result });
            if (!add) {
                log_1.default.d(`Entry: ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        log_1.default.d(`Entry: ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && entryResult.qty > 0) {
            if (entryResult.stackable) {
                result.push(entryResult);
            }
            else {
                for (let i = 0; i < entryResult.qty; i++) {
                    result.push(new result_1.default({ ...entryResult, ...{ qty: 1 } }));
                }
            }
        }
    }
    rollSync({ rng, table, looter, context, result = new results_1.default(), }) {
        if (this.isTable()) {
            return this.rollTableSync({ rng, table, looter, context, result });
        }
        else {
            return this.rollItemSync({ rng, table, looter, context, result });
        }
    }
    rollItemSync({ rng, table, looter, context, result = new results_1.default() }) {
        log_1.default.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        this.processEntryResultsSync(this.generateBaseResults(rng), { rng, table, looter, context, result });
        return result;
    }
    rollTableSync({ rng, table, looter, context, result = new results_1.default() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = this.getItem().borrow(table).rollSync({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        this.processEntryResultsSync(entryResults, { rng, table, looter, context, result });
        return result;
    }
    processEntryResultsSync(entryResults, { rng, table, looter, context, result = new results_1.default() }) {
        for (const entryResult of entryResults) {
            this.processEntryResultSync(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    processEntryResultSync(looted, { rng, table, looter, context, result = new results_1.default() }) {
        for (const fn of this.functions) {
            table.applyFunctionSync(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            add = add && table.applyConditionSync(cond, { rng, looted, looter, context, result });
            if (!add) {
                log_1.default.d(`Entry: ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        log_1.default.d(`Entry: ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable || looted.qty === 1) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new result_1.default({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
}
exports["default"] = LootTableEntry;


/***/ }),

/***/ "./src/table/pool/entry/result.ts":
/*!****************************************!*\
  !*** ./src/table/pool/entry/result.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class LootTableEntryResult {
    id;
    stackable = true;
    name;
    item;
    qty;
    constructor({ id, stackable = true, name, item, qty } = {}) {
        this.id = id;
        this.name = name;
        this.item = item;
        this.qty = qty;
        this.stackable = stackable;
    }
    get description() {
        return this.describe();
    }
    describe() {
        if (this.name) {
            return `${this.name} [${this.id}]`;
        }
        return `[${this.id}]`;
    }
    getQty() {
        return this.qty;
    }
    setQty(n) {
        this.qty = n;
    }
    addQty(n) {
        this.qty = this.qty + n;
    }
}
exports["default"] = LootTableEntryResult;


/***/ }),

/***/ "./src/table/pool/entry/results.ts":
/*!*****************************************!*\
  !*** ./src/table/pool/entry/results.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class LootTableEntryResults extends Array {
    constructor(documents) {
        if (documents instanceof Array)
            super(...documents);
        else if (documents)
            super(documents);
        else
            super();
        Object.setPrototypeOf(this, Object.create(LootTableEntryResults.prototype));
    }
    merge(other) {
        for (const entry of other) {
            this.push(entry);
        }
        return this;
    }
    merged(other) {
        return new LootTableEntryResults([...this, ...other]);
    }
    entrySignature(entry) {
        const entryWithoutQty = {};
        for (const [k, v] of Object.entries(entry)) {
            if (k !== 'id') {
                entryWithoutQty[k] = v;
            }
        }
        return JSON.stringify(entry);
    }
    collapsed() {
        const map = {};
        const other = [];
        for (const ob of this) {
            if (ob.stackable) {
                const sig = this.entrySignature(ob);
                if (!map[sig]) {
                    map[sig] = ob;
                }
                else {
                    map[sig].addQty(ob.qty);
                }
            }
            else {
                other.push(ob);
            }
        }
        return new LootTableEntryResults([...other, ...Object.values(map)]);
    }
}
exports["default"] = LootTableEntryResults;


/***/ }),

/***/ "./src/ultraloot.ts":
/*!**************************!*\
  !*** ./src/ultraloot.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UltraLoot = exports.RecursiveTableError = void 0;
const log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
const table_1 = __webpack_require__(/*! ./table */ "./src/table.ts");
const pool_1 = __webpack_require__(/*! ./table/pool */ "./src/table/pool.ts");
const entry_1 = __webpack_require__(/*! ./table/pool/entry */ "./src/table/pool/entry.ts");
const rng_1 = __webpack_require__(/*! ./rng */ "./src/rng.ts");
const package_json_1 = __webpack_require__(/*! ./../package.json */ "./package.json");
const defaultFunctions = __webpack_require__(/*! ./default/functions */ "./src/default/functions.ts");
const defaultConditions = __webpack_require__(/*! ./default/conditions */ "./src/default/conditions.ts");
// Set fs properly if we are in node environment
let fs;
let isNode = false;
if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
        if (typeof process.versions.node !== 'undefined') {
            fs = __webpack_require__(/*! fs */ "fs");
            isNode = true;
        }
    }
}
const VERSION_KEY = '__version__';
class RecursiveTableError extends Error {
}
exports.RecursiveTableError = RecursiveTableError;
/**
 * @todo detect recursively required tables
 * @example
 * import {UltraLoot} from "ultraloot";
 *
 * const ultralootDefaultRng = new UltraLoot();           // default RNG
 * const ultralootCustomRng = new UltraLoot("UL7R4L007"); // seeding the built in RNG
 * const ultralootCustomRng = new UltraLoot(rngSource);   // using a custom RNG
 */
class UltraLoot {
    /**
     * Default RNG source when none is given
     */
    defaultRng;
    /**
     * RNG source given by the end user
     */
    rng;
    /**
     * RNG Constructor for making new RNGs
     */
    rngConstructor;
    /**
     * Global functions that can be used by loot table entries.
     *
     * The keys in the object are the function identifier used in the table entries
     */
    functions = {};
    /**
     * Global conditions that can be used by loot table pools and entries.
     *
     * The keys in the object are the function identifier used in the table entries/pools
     */
    conditions = {};
    /**
     * Whether to throw errors when functions are missing, otherwise just does console.error
     */
    throwOnMissingFunctions = true;
    /**
     * Whether to throw errors when conditions are missing, otherwise just does console.error
     */
    throwOnMissingConditions = true;
    constructor(rng) {
        log_1.default.d('UltraLoot initialising');
        if (rng) {
            this.rng = this.makeRng(rng);
        }
    }
    registerDefaults() {
        this.registerDefaultFunctions();
        this.registerDefaultConditions();
        return this;
    }
    registerDefaultFunctions() {
        for (const [key, fn] of Object.entries(defaultFunctions)) {
            this.registerFunction(key, fn);
        }
        return this;
    }
    registerDefaultConditions() {
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
    instance(rng) {
        return new UltraLoot(rng);
    }
    setRng(rng) {
        if (!this.isRng(rng)) {
            throw new Error('rng given does not confirm to RngInterface');
        }
        this.rng = rng;
    }
    getRng() {
        return this.rng ?? this.getDefaultRng();
    }
    getDefaultRng() {
        return this.defaultRng ?? (this.defaultRng = this.makeRng());
    }
    setRngConstructor(rngConstructor) {
        this.rngConstructor = rngConstructor;
    }
    getRngConstructor() {
        return this.rngConstructor ?? Object.getPrototypeOf(this.rng).constructor;
    }
    isRng(rng) {
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
    makeRng(rng) {
        if (this.isRng(rng)) {
            return rng;
        }
        const RngConstructor = this.rngConstructor ?? rng_1.default;
        return new RngConstructor(rng);
    }
    registerFunction(name, fn) {
        this.functions[name] = fn;
    }
    registerCondition(name, fn) {
        this.conditions[name] = fn;
    }
    hasFunction(name) {
        return typeof this.functions[name] !== 'undefined';
    }
    hasCondition(name) {
        return typeof this.conditions[name] !== 'undefined';
    }
    noThrowOnMissingFunctionsOrConditions() {
        this.throwOnMissingFunctions = false;
        this.throwOnMissingConditions = false;
        return this;
    }
    throwOnMissingFunctionsOrConditions() {
        this.throwOnMissingFunctions = true;
        this.throwOnMissingConditions = true;
        return this;
    }
    functionCheck(fn) {
        log_1.default.d(`UL | Applying function ${fn.function}`);
        if (typeof this.functions[fn.function] === 'undefined') {
            const err = `Function ${fn.function} has not been defined. Did you forget to register the function with this loot table? UltraLoot.registerFunction(name, function).`;
            if (this.throwOnMissingFunctions) {
                throw new Error(err);
            }
            else {
                console.error(err);
            }
            return false;
        }
        else {
            return true;
        }
    }
    conditionCheck(cond) {
        log_1.default.d(`UL | Applying condition ${cond.function}`);
        if (typeof this.conditions[cond.function] === 'undefined') {
            const err = `Condition ${cond.function} has not been defined. Did you forget to register the function with this loot table? UltraLoot.registerCondition(name, condition_function).`;
            if (this.throwOnMissingConditions) {
                throw new Error(err);
            }
            else {
                console.error(err);
            }
            return false;
        }
        else {
            return true;
        }
    }
    applyFunctionSync(functionDefinition, { rng, looted, looter, context, result }) {
        if (this.functionCheck(functionDefinition)) {
            return this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.arguments });
        }
    }
    applyConditionSync(conditionDefinition, { rng, looted, looter, context, result }) {
        if (this.conditionCheck(conditionDefinition)) {
            const conditionCallResult = this.conditions[conditionDefinition.function]({ rng, looted, looter, context, result, args: conditionDefinition.arguments });
            if (conditionCallResult instanceof Promise) {
                throw new Error('Cannot return promise from sync condition call');
            }
            return conditionCallResult;
        }
    }
    async applyFunction(functionDefinition, { rng, looted, looter, context, result }) {
        if (this.functionCheck(functionDefinition)) {
            return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.arguments });
        }
    }
    async applyCondition(conditionDefinition, { rng, looted, looter, context, result }) {
        if (this.conditionCheck(conditionDefinition)) {
            return await this.conditions[conditionDefinition.function]({ rng, looted, looter, context, result, args: conditionDefinition.arguments });
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
    createTable(def) {
        if (def instanceof table_1.default || this.isLootTableDefinition(def)) {
            if (def instanceof table_1.default) {
                log_1.default.vv('Creating table from LootTable');
            }
            else {
                log_1.default.vv('Creating table from LootTableDefinition');
            }
            def.ul = this;
            if (def.rng) {
                def.rng = def.rng ?? this.makeRng(def.rng);
            }
            else {
                def.rng = this.getRng();
            }
            const lt = new table_1.default(def);
            lt.ultraloot = this;
            return lt;
        }
        else if (this.isEasyLootTableDefinition(def)) {
            log_1.default.vv('Creating table from LootTableEasyDefinition');
            if (def.rng) {
                def.rng = def.rng ?? this.makeRng(def.rng);
            }
            else {
                def.rng = this.getRng();
            }
            const lt = new table_1.default(this.transformEasyToProperLootTableDefinition(def));
            lt.ultraloot = this;
            return lt;
        }
        else {
            throw new Error('Cannot create loot table from these params');
        }
    }
    /**
     * Create a loot pool for use in a loot table
     */
    createPool(def) {
        if (this.isEasyLootTablePoolDefinition(def)) {
            log_1.default.vv('Creating pool from LootTablePoolEasyDefinition');
            return new pool_1.default(this.transformEasyToProperLootTablePoolDefinition(def));
        }
        else {
            log_1.default.vv('Creating pool from LootTablePoolDefinition');
            return new pool_1.default(def);
        }
    }
    /**
     * Create an entry for a loot pool, either with object definition or from a loot table
     */
    createEntry(def) {
        if (def instanceof table_1.default) {
            return new entry_1.default({
                id: def.id,
                name: def.name,
                item: def,
                qty: 1,
            });
        }
        else {
            return new entry_1.default(def);
        }
    }
    /**
     * Used for Typescript type guarding and parameter checking
     */
    isLootTableDefinition(def) {
        if (def instanceof table_1.default ||
            def instanceof pool_1.default ||
            def instanceof entry_1.default) {
            return false;
        }
        if (def.pools) {
            for (const pool of def.pools) {
                if (!(pool instanceof pool_1.default)) {
                    return false;
                }
            }
        }
        return typeof def === 'object';
    }
    /**
     * Used for Typescript type guarding and parameter checking
     */
    isEasyLootTableDefinition(def) {
        if (def instanceof table_1.default ||
            def instanceof pool_1.default ||
            def instanceof entry_1.default) {
            return false;
        }
        if (def.pools) {
            for (const pool of def.pools) {
                if (pool instanceof pool_1.default) {
                    return false;
                }
            }
        }
        return typeof def === 'object';
    }
    /**
     * Used for Typescript type guarding and parameter checking
     */
    isEasyLootTablePoolDefinition(def) {
        if (def instanceof table_1.default ||
            def instanceof pool_1.default ||
            def instanceof entry_1.default) {
            return false;
        }
        if (def.entries) {
            for (const entry of def.entries) {
                if (entry instanceof entry_1.default) {
                    return false;
                }
            }
        }
        return typeof def === 'object';
    }
    transformEasyToProperLootTableDefinition(def) {
        const result = {
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
    transformEasyToProperLootTablePoolDefinition(def) {
        const result = {
            name: def.name,
            id: def.id,
            rolls: def.rolls,
            nulls: def.nulls,
            template: def.template,
            conditions: def.conditions,
            functions: def.functions,
            entries: def.entries
        };
        return result;
    }
    pathJoin(parts, sep = '/') {
        return parts.join(sep).replace(new RegExp(sep + '{1,}', 'g'), sep);
    }
    finishWith(str, ending) {
        if (str.endsWith(ending)) {
            return str;
        }
        return str + ending;
    }
    finishWithExtension(str, extension) {
        if (str.endsWith(extension)) {
            return str;
        }
        const last = str.split('/').pop().split('\\').pop();
        const pos = last.includes('.') ? last.lastIndexOf('.') : last.length;
        const fileRoot = str.substr(0, (str.length - last.length) + pos);
        const output = `${fileRoot}.${extension.replace('.', '')}`;
        return output;
    }
    getExtension(str) {
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
    serialize(table, { includeRng = false, key, had = new Set() } = {}) {
        const result = {};
        const clone = {
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
            const poolClone = {
                name: pool.name,
                id: pool.id,
                rolls: pool.rolls,
                nulls: pool.nulls,
                conditions: pool.conditions,
                functions: pool.functions,
                entries: [],
            };
            for (const entry of (pool.entries ?? [])) {
                const entryClone = {
                    name: entry.name,
                    id: entry.id,
                };
                if (entry instanceof table_1.default) {
                    entryClone.item = entry;
                }
                else {
                    entryClone.stackable = entry.stackable;
                    entryClone.weight = entry.weight;
                    entryClone.item = entry.item;
                    entryClone.qty = entry.qty;
                    entryClone.conditions = entry.conditions;
                    entryClone.functions = entry.functions;
                }
                if (entryClone.item instanceof table_1.default) {
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
            [VERSION_KEY]: package_json_1.version,
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
    toJson(table, { includeRng = false } = {}) {
        return JSON.stringify(this.serialize(table, { includeRng }));
    }
    /**
     * @todo Implement this
     */
    async saveTable(table, { path = '', defaultExtension } = {}) {
        throw new Error('Not yet implemented.');
    }
    /**
     * Load serialized tables from a file.
     *
     * This is just a wrapper around unserializing json contents of a file.
     *    */
    async loadTables(filename, { path = '', defaultExtension } = {}) {
        defaultExtension = defaultExtension ?? this.getExtension(path) ?? '.json';
        const fullPath = this.finishWith(this.pathJoin([path, filename]), defaultExtension);
        if (isNode) {
            if (fullPath.startsWith('http') || fullPath.startsWith('file://')) {
                return this.loadTablesFromUrl(fullPath, { path });
            }
            else {
                return this.loadTablesFromFile(fullPath, { path });
            }
        }
        else {
            return this.loadTablesFromUrl(fullPath, { path });
        }
    }
    /**
     * Loads serialized tables from a local file
     */
    async loadTablesFromFile(filename, { path = '', defaultExtension } = {}) {
        defaultExtension = defaultExtension ?? this.getExtension(path) ?? '.json';
        log_1.default.d(`Reading tables from ${filename}`);
        let contents;
        const ext = this.getExtension(filename);
        if (ext === '.js') {
            const cb = await fs.promises.readFile(`${filename}`, 'utf8');
            // eslint-disable-next-line no-eval
            contents = eval(cb);
        }
        else {
            contents = await fs.promises.readFile(filename, 'utf8')
                .then((d) => JSON.parse(d))
                .catch((e) => {
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
    async loadTablesFromUrl(url, { path = '', defaultExtension } = {}) {
        defaultExtension = defaultExtension ?? this.getExtension(url) ?? '.json';
        log_1.default.d(`Reading tables from ${url}`);
        return fetch(url).then(data => data.text()).then(txt => {
            try {
                return JSON.parse(txt);
            }
            catch (e) {
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
    async loadTable(filename, { path = '', defaultExtension } = {}) {
        const ext = defaultExtension ?? this.getExtension(filename) ?? '.json';
        const fullPath = this.finishWithExtension(this.pathJoin([path, filename]), ext);
        log_1.default.d('Load Table', {
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
            }
            else {
                return this.loadTableFromFile(filename, { path, defaultExtension });
            }
        }
        else {
            return this.loadTableFromUrl(fullPath, { path, defaultExtension });
        }
    }
    /**
     * Loads a table from a local file
     */
    async loadTableFromFile(filename, { path = '', defaultExtension } = {}) {
        defaultExtension = defaultExtension ?? this.getExtension(filename) ?? '.json';
        const extension = this.getExtension(filename);
        const pj = this.pathJoin([path, filename]);
        if (!extension) {
            // If the file exists without extension, try and read it as json
            if (fs.existsSync(pj) && fs.statSync(pj).isFile()) {
                const contents = await fs.promises.readFile(pj, 'utf8')
                    .then((d) => JSON.parse(d))
                    .catch((e) => {
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
        if (extension === '.js' ||
            extension === '.mjs' ||
            extension === '.cjs') {
            // unfortunately, typescript mangles import statements, so the only
            // way we can do this is using eval...
            const cb = await fs.promises.readFile(`${pj}`, 'utf8');
            // eslint-disable-next-line no-eval
            contents = eval(cb);
        }
        else if (extension === '.json' || defaultExtension === '') {
            contents = await fs.promises.readFile(pj, 'utf8')
                .then((d) => JSON.parse(d))
                .catch((e) => {
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
    async loadTableFromUrl(url, { path = '', defaultExtension } = {}) {
        defaultExtension = defaultExtension ?? this.getExtension(url) ?? '.json';
        return fetch(url).then(data => data.text()).then(txt => {
            try {
                return JSON.parse(txt);
            }
            catch (e) {
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
    async resolveTable(table, { path = '', defaultExtension } = {}) {
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
    unserialize(tables) {
        const result = {};
        // When unserializing, we loop through multiple times because there is
        // inheretence - so we need to unserialize things in the right order.
        // To avoid building complex inheritance chains, we just loop through
        // up to 100 times, so things can be nested up to 100 times, restarting
        // when we hit an unserialized nested requirement.
        let i = 100;
        // @TODO Detect recursive requirements better.
        /* eslint-disable no-labels */
        while (Object.values(tables.tables).length > 0 && i-- > 0) {
            getBack: for (const [id, table] of Object.entries(tables.tables)) {
                const rng = table.rng ?? null;
                delete table.rng;
                log_1.default.v(`Unserializing table ${id}`);
                for (const pool of (table.pools ?? [])) {
                    for (const entry of (pool.entries ?? [])) {
                        if (entry.type === 'table') {
                            if (typeof result[entry.item] === 'undefined') {
                                if (typeof tables.tables[entry.item] === 'undefined') {
                                    throw new Error(`Table ${entry.item} not present in serialized data`);
                                }
                                // We do the following to unserialize things in the correct order.
                                log_1.default.v(`We didn't have ${entry.item} in our results`);
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
exports.UltraLoot = UltraLoot;
exports["default"] = UltraLoot;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.depend = exports.dotSet = exports.dotGet = void 0;
/**
 * Simple dot getter function. If property is undefined, returns default value
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotGet(ob, 'a.b.c'); // 'foo'
 * dotGet(ob, 'a.z.c'); // undefined
 * dotGet(ob, 'a.z.c', 'bar'); // 'bar'
 */
const dotGet = (ob, path, defaultValue) => {
    const result = path.split('.').reduce((o, i) => ((typeof o !== 'undefined') ? o[i] : o), ob);
    return (typeof result === 'undefined' ? defaultValue : result);
};
exports.dotGet = dotGet;
/**
 * Simple dot setter
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotSet(ob, 'a.b.c', 'bar'); // ob.a.b.c === 'bar';
 * dotSet(ob, 'a.b.d', 'baz'); // ob.a.b.d === 'baz';
 */
const dotSet = (ob, path, value) => {
    const keys = path.split('.');
    let parent = ob;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in parent)) {
            parent[key] = {};
        }
        parent = parent[key];
    }
    parent[keys[keys.length - 1]] = value;
};
exports.dotSet = dotSet;
/**
 * returns true or false depending on property of ob
 * @example
 * depend(false); // false
 * depend(false, null, true); // true
 * depend({foo: false}, 'foo'); // false
 * depend({foo: false}, 'foo', null, true); // true
 * depend({foo: true}, 'foo'); // true
 * depend({foo: true}, 'foo', null, true); // false
 */
const depend = (ob, { property, tobe, min, max, inverse = false, strict = true } = {}) => {
    inverse = !!inverse;
    if (!ob) {
        return inverse;
    }
    let val = ob;
    if (typeof property === 'string') {
        val = (0, exports.dotGet)(ob, property);
    }
    if (typeof tobe !== 'undefined') {
        if (strict) {
            val = (val === tobe);
        }
        else {
            // eslint-disable-next-line eqeqeq
            val = (val == tobe);
        }
        return inverse ? !val : !!val;
    }
    if ((typeof min !== 'undefined' ||
        typeof max !== 'undefined') &&
        strict &&
        typeof val !== 'number') {
        return false;
    }
    if (typeof val !== 'undefined' &&
        val !== null) {
        if (typeof min !== 'undefined' && parseFloat(val) < min) {
            return inverse;
        }
        if (typeof max !== 'undefined' && parseFloat(val) > max) {
            return inverse;
        }
        if (typeof min !== 'undefined' || typeof max !== 'undefined') {
            return !inverse;
        }
    }
    return inverse ? !val : !!val;
};
exports.depend = depend;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"ultraloot","version":"0.0.1","description":"","main":"dist/ultraloot.js","module":"dist/index.js","scripts":{"watch":"webpack --config webpack.dev.config.js --watch","dev":"webpack --config webpack.dev.config.js","build":"webpack --config webpack.production.config.js && npx typedoc","ci":"npm t && npm run test-build","test-build":"npm run build && node test-build.js && node test-build-common.cjs && node test-build-module.mjs","test":"jest --coverage","test-watch":"jest --coverage --watchAll"},"files":["dist"],"keywords":[],"author":"Harry Mustoe-Playfair","license":"MIT","devDependencies":{"@babel/core":"^7.25.2","@babel/preset-env":"^7.25.4","@types/jest":"^29.5.13","autoprefixer":"^10.4.20","babel-loader":"^9.2.1","eslint":"^9.11.1","html-loader":"^5.1.0","jest":"^29.7.0","jsdoc":"^4.0.3","neostandard":"^0.11.6","terser-webpack-plugin":"^5.3.10","ts-jest":"^29.2.5","ts-loader":"^9.5.1","typedoc":"^0.26.7","typedoc-plugin-rename-defaults":"^0.7.1","typescript":"^5.6.2","val-loader":"^6.0.0","webpack":"^5.95.0","webpack-cli":"^5.1.4"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7OztBQ1RBLHdFQUVvQjtBQWlCcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0ksTUFBTSxhQUFhLEdBQTJCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUN6RSxPQUFPLGtCQUFNLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUZXLHFCQUFhLGlCQUV4QjtBQWlCRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0ksTUFBTSxZQUFZLEdBQTBCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUN0RSxPQUFPLGtCQUFNLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUZXLG9CQUFZLGdCQUV2Qjs7Ozs7Ozs7Ozs7Ozs7QUMxR0Ysd0VBR29CO0FBaUJwQjs7Ozs7Ozs7O0dBU0c7QUFDSSxNQUFNLGFBQWEsR0FBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNoRixrQkFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsa0JBQU0sRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNILENBQUMsQ0FBQztBQUZXLHFCQUFhLGlCQUV4QjtBQWlCRjs7Ozs7Ozs7O0dBU0c7QUFDSSxNQUFNLGNBQWMsR0FBNEIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNuRixrQkFBTSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsa0JBQU0sRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdILENBQUMsQ0FBQztBQUZXLHNCQUFjLGtCQUV6QjtBQWVGOzs7Ozs7Ozs7OztHQVdHO0FBQ0ksTUFBTSxpQkFBaUIsR0FBK0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtJQUNyRixNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztJQUNuQyxJQUFJLFFBQVEsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbEMsa0JBQU0sRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBTFcseUJBQWlCLHFCQUs1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GRixvRkFBNEI7QUFDNUIsd0VBQXNCO0FBQ3RCLGdHQUFrQztBQUNsQyw0RUFBd0I7QUFDeEIsNEZBQWdDO0FBQ2hDLHNGQUE2QjtBQUM3QixrR0FBbUM7QUFDbkMsZ0hBQTBDO0FBQzFDLGtIQUEyQztBQUUzQyxpRkFBd0M7QUFDeEMsNkRBQXVDO0FBQTlCLGtHQUFPLFFBQU87QUFDdkIsNkZBQThEO0FBQXJELHFIQUFPLFFBQWtCO0FBQ2xDLG1FQUErQztBQUF0QywwR0FBTyxRQUFhO0FBQzdCLHFGQUE4RDtBQUFyRCxtSEFBTyxRQUFvQjtBQUNwQyw0RUFBd0Q7QUFBL0MsNkdBQU8sUUFBaUI7QUFDakMseUZBQStEO0FBQXRELCtHQUFPLFFBQWtCO0FBQ2xDLHdHQUE0RTtBQUFuRSxzSEFBTyxRQUF3QjtBQUN4QywyR0FBOEU7QUFBckUsd0hBQU8sUUFBeUI7QUFFekMsMkRBQTJEO0FBQzNELGtFQUFrRTtBQUNsRSx5REFBeUQ7QUFDekQscUJBQWUscUJBQVMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3JCekIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLElBQUksSUFBaUMsRUFBRSxDQUFDO0lBQ3RDLEtBQUssR0FBRyxDQUFDLEtBQVUsQ0FBQztBQUN0QixDQUFDO0FBRUQ7OztHQUdHO0FBRUg7O0dBRUc7QUFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUUxQixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBUyxFQUFRLEVBQUUsR0FBRSxDQUFDLENBQUM7QUFDNUMsSUFBSSxDQUFDLEdBQUc7SUFDTixLQUFLLEVBQUUsUUFBUTtJQUNmLENBQUMsRUFBRSxRQUFRO0lBQ1gsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLFFBQVE7SUFDWixHQUFHLEVBQUUsUUFBUTtJQUNiLEdBQUcsRUFBRSxRQUFRO0lBQ2IsRUFBRSxFQUFFLFFBQVE7SUFDWixDQUFDLEVBQUUsUUFBUTtJQUNYLENBQUMsRUFBRSxRQUFRO0lBQ1gsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsUUFBUTtJQUNaLENBQUMsRUFBRSxRQUFRO0lBQ1gsRUFBRSxFQUFFLFFBQVE7SUFDWixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLEtBQUssRUFBRSxRQUFRO0lBQ2YsUUFBUSxFQUFFLFFBQVE7SUFDbEIsY0FBYyxFQUFFLFFBQVE7SUFDeEIsR0FBRyxFQUFFLFFBQVE7SUFDYixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBQ0YsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUMsR0FBRztRQUNGLEdBQUcsQ0FBQztRQUNKLEdBQUc7WUFDRCxLQUFLLEVBQUUsVUFBVSxFQUFjO2dCQUM3QixJQUFJLEtBQUssRUFBRSxDQUFDO29CQUNWLEVBQUUsRUFBRSxDQUFDO2dCQUNQLENBQUM7WUFDSCxDQUFDO1lBQ0QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ2hCLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUNwQixFQUFFLEVBQUUsT0FBTyxDQUFDLGNBQWM7WUFDMUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7WUFDdEMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1NBQ25CO0tBQ0YsQ0FBQztJQUNGLElBQUksT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLEdBQUc7WUFDRixHQUFHLENBQUM7WUFDSixHQUFHO2dCQUNELENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRztnQkFDZCxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2hCLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDakIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNqQixHQUFHLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3JCLEdBQUcsRUFBRSxPQUFPLENBQUMsY0FBYztnQkFDM0IsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNqQixDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2YsRUFBRSxFQUFFLE9BQU8sQ0FBQyxPQUFPO2dCQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzthQUN6QjtTQUNGLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUM7QUFFRCxxQkFBZSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDM0ZqQixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSwrQkFBK0IsR0FBRyxJQUFJLENBQUM7QUEwRTdDLE1BQU0sTUFBTSxHQUFZLGlEQUFpRCxDQUFDO0FBQzFFLE1BQU0sWUFBWSxHQUFZLHVDQUF1QyxDQUFDO0FBQ3RFLE1BQU0sZ0JBQWdCLEdBQTRCLEVBQUUsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBbUMsRUFBRSxDQUFDO0FBaUJyRCxNQUFzQixXQUFXO0lBQy9CLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDbEIsWUFBYSxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFtQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRVMsT0FBTyxDQUFFLElBQVk7UUFDN0IsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLElBQUksQ0FBRSxJQUFXO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFFLFVBQTBCO1FBQ25ELE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSxXQUFXLENBQUUsSUFBWTtRQUM5QixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxNQUFNLE9BQU8sR0FBa0IsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQXFELElBQVU7UUFDdEYsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU0sT0FBTyxDQUFFLEdBQVk7UUFDMUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFDeEMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLHFCQUFxQixDQUFFLEdBQVk7UUFDeEMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVTLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLE1BQU0sQ0FBRSxPQUFnQixDQUFDLEVBQUUsS0FBYyxDQUFDLEVBQUUsT0FBZ0IsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sTUFBTSxDQUFFLENBQVUsRUFBRSxXQUFvQixDQUFDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQkFBK0I7SUFDeEIsUUFBUSxDQUFFLElBQWEsRUFBRSxFQUFXO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE9BQU8sQ0FBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUM7UUFDeEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDckQsQ0FBQztJQUVELG9CQUFvQjtJQUNiLE1BQU0sQ0FBRSxTQUFrQixFQUFFLEVBQUUsU0FBbUIsS0FBSztRQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckQsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0QsT0FBTyxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCxPQUFPLENBQUUsTUFBYyxDQUFDO1FBQzdCLE1BQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQztRQUMxQixNQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztRQUNsRixNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxXQUFXLENBQUUsT0FBZ0IsQ0FBQyxFQUFFLEtBQWMsQ0FBQyxFQUFFLE9BQWdCLENBQUM7UUFDdkUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sS0FBSyxDQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsRUFBVSxFQUFFLE1BQWMsQ0FBQyxFQUFFLE1BQWMsQ0FBQztRQUN0RixJQUFJLE1BQU0sR0FBRyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLE1BQU0sMkJBQTJCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEYsSUFBSSxNQUFNLEdBQUcsR0FBRztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLCtDQUErQztRQUMvQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLFNBQVMsQ0FBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLEVBQVU7UUFDeEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzRixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxpQ0FBaUM7UUFDdEMsT0FBTywrQkFBK0IsQ0FBQztJQUN6QyxDQUFDO0lBRUQsa0NBQWtDO0lBQzNCLE1BQU0sQ0FBRSxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsS0FBa0IsRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDO1FBQ2xGLElBQUksS0FBSyxHQUFHLGNBQWMsSUFBSSxJQUFJLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQztRQUNoSSxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNCLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQjtRQUM5QyxJQUFJLEtBQUssR0FBRyxjQUFjLEVBQUUsQ0FBQztZQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7WUFDOUYsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNiLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQzthQUFNLENBQUM7WUFDTixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDVCxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUUsQ0FBQztnQkFDN0QsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDYixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEIsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZixHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNkLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxLQUFLLElBQUksY0FBYyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDeEgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsc0ZBQXNGO1FBQ3RGLHFGQUFxRjtRQUNyRix3RkFBd0Y7UUFDeEYsMEZBQTBGO1FBQzFGLHdFQUF3RTtRQUN4RSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQy9CLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUUsQ0FBQztZQUMvQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELHNEQUFzRDtJQUMvQyxTQUFTLENBQUUsT0FBZ0IsQ0FBQyxFQUFFLFNBQWtCLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtRQUMxRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RSx3REFBd0Q7UUFDeEQsT0FBTyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRU0sU0FBUyxDQUFFLEtBQWM7UUFDOUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDekIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTSxDQUFFLEtBQWM7UUFDM0IsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1IsS0FBSyxnQkFBZ0I7b0JBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FDakIsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQ2QsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQ2QsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQ2hCLENBQUM7b0JBQ0YsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQ2hCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUNkLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUNkLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUNoQixDQUFDO1lBQ04sQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBRSxLQUFjO1FBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO29CQUN0Qyx5REFBeUQ7b0JBQ3pELHFDQUFxQztvQkFDckMsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3hCLENBQUM7WUFDSCxDQUFDO1lBQ0QsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDO29CQUM3QyxNQUFNO2dCQUNSLEtBQUssZ0JBQWdCO29CQUNuQixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDO29CQUM3QyxNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN0QixNQUFNO2dCQUNSO29CQUNFLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBRSxLQUFjO1FBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO29CQUN0Qyx5REFBeUQ7b0JBQ3pELHFDQUFxQztvQkFDckMsS0FBSyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3hCLENBQUM7WUFDSCxDQUFDO1lBQ0QsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssUUFBUTtvQkFDWCxPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDO29CQUM3QyxNQUFNO2dCQUNSLEtBQUssZ0JBQWdCO29CQUNuQixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDO29CQUM3QyxNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixPQUFPLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN0QixNQUFNO2dCQUNSO29CQUNFLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFFLElBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLGNBQWMsQ0FBRSxJQUEwRDtRQUMvRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLE9BQU8sR0FBc0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUksSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzFCLEtBQUssSUFBSSxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUNELEtBQUssSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRXRDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxJQUFJLEtBQUssQ0FBQztnQkFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsOENBQThDO1FBQzlDLDRDQUE0QztRQUM1QyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFUyxNQUFNLENBQUMsYUFBYSxDQUFFLElBQWlELENBQUMsRUFBRSxJQUFZLENBQUMsRUFBRSxPQUFlLENBQUM7UUFDakgsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3BFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sYUFBYSxDQUFFLElBQWlELENBQUMsRUFBRSxJQUFZLENBQUMsRUFBRSxPQUFlLENBQUM7UUFDdkcsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBRSxNQUFlO1FBQzVDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ3BCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRzt3QkFDbEIsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2pDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdkMsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztpQkFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDcEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHO3dCQUNsQixDQUFDLEVBQUUsQ0FBQzt3QkFDSixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3ZDLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUUsSUFBaUQsQ0FBQyxFQUFFLElBQVksQ0FBQyxFQUFFLE9BQWUsQ0FBQztRQUN4RyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBRSxJQUFpRCxDQUFDLEVBQUUsSUFBWSxDQUFDLEVBQUUsT0FBZSxDQUFDO1FBQ3hHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRU0sSUFBSSxDQUFFLElBQWlELENBQUMsRUFBRSxJQUFZLENBQUMsRUFBRSxPQUFlLENBQUM7UUFDOUYsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDWixPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUNELElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7WUFDcEIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxlQUFlLENBQUUsTUFBZTtRQUNyQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxPQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLEtBQUssQ0FBRSxNQUFlLEVBQUUsS0FBYyxFQUFFLEtBQWM7UUFDM0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDeEIsTUFBTSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN4QixNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDNUMsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxHQUFHLENBQUUsR0FBWSxFQUFFLElBQWEsRUFBRSxHQUFZLEVBQUUsR0FBWTtRQUNqRSxNQUFNLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdkYsQ0FBQztDQUNGO0FBL2RELGtDQStkQztBQUVELE1BQXFCLEdBQUksU0FBUSxXQUFXO0lBQzFDLEtBQUssQ0FBUztJQUNkLEtBQUssQ0FBUztJQUNkLElBQUksR0FBVyxDQUFDLENBQUM7SUFDakIsWUFBYSxJQUFZO1FBQ3ZCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFVO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUk7WUFDMUIsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSTtZQUNyQixJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUUsVUFBMEI7UUFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsR0FBRyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUMxQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSxJQUFJLENBQUUsQ0FBUztRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVMsT0FBTztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9ELE1BQU0sSUFBSSxVQUFVLENBQUM7UUFDckIsT0FBTyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQS9DRCx5QkErQ0M7Ozs7Ozs7Ozs7Ozs7QUMvbUJELGtFQUlrQjtBQUVsQjs7O0dBR0c7QUFDSCxNQUFxQixHQUFJLFNBQVEsaUJBQVc7SUFDbkMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNULFFBQVEsR0FBYSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BHLFlBQWEsSUFBWSxFQUFFLE9BQWtCO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUUsT0FBTztRQUNsQixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU0sVUFBVSxDQUFFLENBQVU7UUFDM0IsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLGFBQWEsQ0FBRSxDQUFVO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNLENBQUUsS0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN2RSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUyxPQUFPO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRjtBQXpERCx5QkF5REM7Ozs7Ozs7Ozs7Ozs7QUNuRUQsK0RBQXdCO0FBRXhCLDhFQUFpRjtBQUdqRiw2R0FBK0Q7QUFDL0QsK0RBQTZEO0FBK0Q3RCxNQUFxQixTQUFTO0lBQzVCLElBQUksQ0FBVztJQUNmLEVBQUUsQ0FBVztJQUViOzs7O09BSUc7SUFDSCxFQUFFLENBQVc7SUFFYixFQUFFLENBQWM7SUFDaEIsR0FBRyxDQUFlO0lBQ2xCLEtBQUssR0FBMkIsRUFBRSxDQUFDO0lBQ25DLFNBQVMsR0FBK0MsRUFBRSxDQUFDO0lBQzNELFVBQVUsR0FBZ0QsRUFBRSxDQUFDO0lBRTdEOzs7Ozs7T0FNRztJQUNILFFBQVEsR0FBbUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVyQzs7T0FFRztJQUNILFlBQWEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQTJCLEVBQUU7UUFDM0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBRyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLGdCQUFnQixDQUFFLElBQVksRUFBRSxFQUE4QjtRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsc0RBQXNEO0lBQ3RELGlCQUFpQixDQUFFLElBQVksRUFBRSxFQUErQjtRQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUUsRUFBRTtRQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBRSxFQUFFO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTSxDQUFFLEtBQWdCO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVEsQ0FBRSxLQUFnQjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUUsR0FBa0I7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUyxVQUFVLENBQUUsRUFDcEIsR0FBRyxFQUNILE1BQU0sRUFDTixPQUFPLEVBQ1AsQ0FBQyxHQUFHLENBQUMsRUFDK0I7UUFDcEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxhQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsb0JBQW9CLEtBQUssdUJBQXVCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzdILE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxRQUFRLENBQUUsRUFDUixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBQ3BDLEdBQUcsRUFDSCxDQUFDLEdBQUcsQ0FBQyxLQUNrQixFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkUsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLEtBQUs7Z0JBQ1IsSUFBSTtnQkFDSixHQUFHLEVBQUUsUUFBUTtnQkFDYixNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsTUFBTTthQUNQLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxhQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUUsRUFDVixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBQ3BDLEdBQUcsRUFDSCxDQUFDLEdBQUcsQ0FBQyxLQUNrQixFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNsQixDQUFDLEVBQUUsS0FBSztnQkFDUixJQUFJO2dCQUNKLEdBQUcsRUFBRSxRQUFRO2dCQUNiLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2FBQ1AsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELGFBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNULE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQUUsRUFDWixJQUFJLEVBQ0osTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQUNwQyxHQUFHLEVBQ0gsQ0FBQyxHQUFHLENBQUMsRUFDbUI7UUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFFLEVBQ2QsSUFBSSxFQUNKLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxHQUFHLElBQUksaUJBQXFCLEVBQUUsRUFDcEMsR0FBRyxFQUNILENBQUMsR0FBRyxDQUFDLEVBQ21CO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVcsQ0FBRSxFQUF1QjtRQUNsQyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDckUsT0FBTyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQUVELFlBQVksQ0FBRSxJQUEwQjtRQUN0QyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDeEUsT0FBTyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELFVBQVUsQ0FBRSxHQUEwRDtRQUNwRSxNQUFNLElBQUksR0FBRyxJQUFJLGNBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLENBQUUsR0FBMEU7UUFDakYsSUFBSSxDQUFDLEdBQUcsWUFBWSxjQUFhLENBQUMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUUsQ0FBQztvQkFDL0IsV0FBVyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxRQUFRLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsTUFBTSxRQUFRLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsTUFBTSxRQUFRLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxLQUFLLFlBQVksU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO29CQUNsRCxJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLE1BQU0sQ0FBQztvQkFDWCxJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUUsQ0FBQzt3QkFDL0IsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDWCxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNoQixDQUFDO3lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7d0JBQzNCLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzt3QkFDM0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQztvQkFDRCx1QkFBdUI7b0JBQ3ZCLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUNyQyxLQUFLLE1BQU0sT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDO3dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDOzRCQUNYLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzs0QkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTTs0QkFDL0IsR0FBRyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs0QkFDaEQsR0FBRyxFQUFFLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRzt5QkFDNUIsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ1gsS0FBSzt3QkFDTCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXO3dCQUNsQyxHQUFHLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0QsR0FBRyxFQUFFLFFBQVEsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ3pDLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBRSxrQkFBc0MsRUFBRSxFQUMzRCxHQUFHLEVBQ0gsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQU9QO1FBQ0MsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdkUsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO29CQUM3QyxPQUFPLE1BQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRyxDQUFDO1lBQ0gsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFlBQVksa0JBQWtCLENBQUMsUUFBUSw4SEFBOEgsQ0FBQztZQUNsTCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUM1RCxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDMUcsQ0FBQztnQkFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQkFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDekksQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFFLG1CQUF3QyxFQUFFLEVBQzlELEdBQUcsRUFDSCxNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBT1A7UUFDQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXLEVBQUUsQ0FBQztZQUN6RSxLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7b0JBQy9DLE9BQU8sTUFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQ3RHLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsYUFBYSxtQkFBbUIsQ0FBQyxRQUFRLHlJQUF5SSxDQUFDO1lBQy9MLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQzlELE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RyxDQUFDO2dCQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO29CQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzVJLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBRSxrQkFBc0MsRUFBRSxFQUN6RCxHQUFHLEVBQ0gsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQU9QO1FBQ0MsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdkUsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO29CQUM3QyxPQUFPLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxDQUFDO1lBQ0gsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFlBQVksa0JBQWtCLENBQUMsUUFBUSw4SEFBOEgsQ0FBQztZQUNsTCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUM1RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQkFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ25JLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsa0JBQWtCLENBQUUsbUJBQXdDLEVBQUUsRUFDNUQsR0FBRyxFQUNILE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFPUDtRQUNDLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ3pFLEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztvQkFDL0MsT0FBTyxRQUFRLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDcEcsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxhQUFhLG1CQUFtQixDQUFDLFFBQVEseUlBQXlJLENBQUM7WUFDL0wsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztvQkFDOUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzFHLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pKLElBQUksbUJBQW1CLFlBQVksT0FBTyxFQUFFLENBQUM7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDRCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQTljRCwrQkE4Y0M7Ozs7Ozs7Ozs7Ozs7QUNuaEJELHdFQUFrRDtBQUlsRDs7R0FFRztBQUNILE1BQXFCLGdCQUFnQjtJQUM1QixNQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUVyQyxZQUFhLFNBQTRCLEVBQUU7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUyxDQUFFLE1BQTRDO1FBQ3JELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzFCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRLENBQUUsSUFBeUIsRUFBRSxLQUEwQjtRQUM3RCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLGVBQVMsRUFBRSxDQUFDO1lBQzNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksZUFBUyxFQUFFLENBQUM7WUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQzthQUFNLElBQUksSUFBSSxZQUFZLGVBQVMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsUUFBUSxDQUFFLElBQVk7UUFDcEIsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBdkNELHNDQXVDQzs7Ozs7Ozs7Ozs7OztBQzlDRCxrRUFBMkI7QUFDM0IscUZBQTRIO0FBQzVILG9HQUF1RDtBQUN2RCx1R0FBeUQ7QUFDekQsd0VBQWtEO0FBQ2xELGtFQUFnRTtBQWFoRSxNQUFxQixRQUFRO0lBQzNCLElBQUksQ0FBUztJQUNiLEVBQUUsQ0FBUztJQUNYLFVBQVUsR0FBK0IsRUFBRSxDQUFDO0lBQzVDLFNBQVMsR0FBOEIsRUFBRSxDQUFDO0lBQzFDLEtBQUssR0FBVyxDQUFDLENBQUM7SUFDbEIsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUNsQixPQUFPLEdBQXNDLEVBQUUsQ0FBQztJQUNoRCxRQUFRLEdBQXNDLEVBQUUsQ0FBQztJQUVqRCxNQUFNLENBQUMsT0FBTyxHQUFHLDhDQUE4QyxDQUFDO0lBRWhFOztPQUVHO0lBQ0gsWUFBYSxFQUNYLElBQUksRUFDSixFQUFFLEVBQ0YsVUFBVSxHQUFHLEVBQUUsRUFDZixTQUFTLEdBQUcsRUFBRSxFQUNkLEtBQUssR0FBRyxDQUFDLEVBQ1QsS0FBSyxHQUFHLENBQUMsRUFDVCxPQUFPLEdBQUcsRUFBRSxFQUNaLFFBQVEsTUFDb0IsRUFBRTtRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxhQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXLENBQUUsR0FBNkI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUFFLEtBQTRELEVBQUUsR0FBMEM7UUFDaEgsSUFBSSxLQUFLLFlBQVksZUFBUyxFQUFFLENBQUM7WUFDL0IsS0FBSyxHQUFHLElBQUksZUFBYyxDQUFDO2dCQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUNkLEdBQUc7b0JBQ0QsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNaLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksS0FBSyxZQUFZLGVBQWMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWSxDQUFFLEVBQUUsR0FBRyxFQUEwQjtRQUMzQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxhQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsbUJBQW1CLFFBQVEsdUJBQXVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqSCxzRUFBc0U7UUFDdEUsTUFBTSxPQUFPLEdBQTRCLEVBQUUsQ0FBQztRQUU1QywyQ0FBMkM7UUFDM0MsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksZUFBUyxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBRSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQU9yQztRQUNDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGlCQUFxQixFQUFFLENBQUM7UUFFeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLDRDQUE0QztZQUM1QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNDLGtEQUFrRDtZQUNsRCxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLElBQUksS0FBSyxZQUFZLGVBQVMsRUFBRSxDQUFDO29CQUMvQixnRUFBZ0U7b0JBQ2hFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEUsQ0FBQztxQkFBTSxJQUFJLEtBQUssWUFBWSxlQUFjLEVBQUUsQ0FBQztvQkFDM0MsMENBQTBDO29CQUMxQyxhQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsNkJBQTZCLENBQUMsQ0FBQztvQkFDN0QsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDN0UsYUFBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNULElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sYUFBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLG9CQUFvQixDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNILENBQUM7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3RixhQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxDQUFFLEVBQ1IsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0MsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLG1CQUFtQixHQUFHLElBQUksaUJBQXFCLEVBQUUsQ0FBQztRQUV4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsNENBQTRDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0Msa0RBQWtEO1lBQ2xELElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLFlBQVksZUFBUyxFQUFFLENBQUM7b0JBQy9CLGdFQUFnRTtvQkFDaEUsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztxQkFBTSxJQUFJLEtBQUssWUFBWSxlQUFjLEVBQUUsQ0FBQztvQkFDM0MsMENBQTBDO29CQUMxQyxhQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsNkJBQTZCLENBQUMsQ0FBQztvQkFDN0QsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzNFLGFBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDVCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDakIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLGFBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDSCxDQUFDO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzNGLGFBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNULE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsbUJBQW1CLENBQUUsWUFBb0MsRUFDN0QsRUFDRSxHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxHQUFHLElBQUksaUJBQXFCLEVBQUUsRUFPckM7UUFDRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHVCQUF1QixDQUFFLFlBQW9DLEVBQzNELEVBQ0UsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0QsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUUsTUFBNkIsRUFBRSxFQUN2RCxHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxHQUFHLElBQUksaUJBQXFCLEVBQUUsRUFPckM7UUFDQyxLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25DLE1BQU0sZUFBZSxHQUFHLE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuRyxhQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsd0JBQXdCLElBQUksQ0FBQyxRQUFRLGlCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2SCxHQUFHLEdBQUcsR0FBRyxJQUFJLGVBQWUsQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsYUFBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLGdCQUFnQixJQUFJLENBQUMsUUFBUSxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUM5RixNQUFNO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxhQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcseUNBQXlDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDMUIsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBb0IsQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxzQkFBc0IsQ0FBRSxNQUE2QixFQUFFLEVBQ3JELEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQU9yQztRQUNDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkMsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLGFBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVyx3QkFBd0IsSUFBSSxDQUFDLFFBQVEsaUJBQWlCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZILEdBQUcsR0FBRyxHQUFHLElBQUksZUFBZSxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxhQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVcsZ0JBQWdCLElBQUksQ0FBQyxRQUFRLGlDQUFpQyxDQUFDLENBQUM7Z0JBQzlGLE1BQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUNELGFBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVyx5Q0FBeUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUYsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFvQixDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzs7QUF0VEgsOEJBdVRDOzs7Ozs7Ozs7Ozs7O0FDelVELHFFQUE4QjtBQUM5QiwyRUFBc0M7QUFFdEMsK0ZBQWtEO0FBQ2xELGtHQUFvRDtBQXVCcEQsTUFBcUIsY0FBYztJQUNqQyxFQUFFLENBQW1CO0lBQ3JCLFNBQVMsR0FBYSxJQUFJLENBQUM7SUFDM0IsTUFBTSxHQUFhLEtBQUssQ0FBQztJQUN6QixJQUFJLENBQVU7SUFDZCxNQUFNLEdBQVcsQ0FBQyxDQUFDO0lBQ25CLElBQUksQ0FBTztJQUNYLEdBQUcsR0FBWSxDQUFDLENBQUM7SUFDakIsU0FBUyxDQUE0QjtJQUNyQyxVQUFVLENBQTZCO0lBRXZDOztPQUVHO0lBQ0gsWUFBYSxFQUNYLEVBQUUsRUFDRixTQUFTLEdBQUcsSUFBSSxFQUNoQixNQUFNLEdBQUcsS0FBSyxFQUNkLElBQUksRUFDSixNQUFNLEdBQUcsQ0FBQyxFQUNWLElBQUksRUFDSixTQUFTLEdBQUcsRUFBRSxFQUNkLFVBQVUsR0FBRyxFQUFFLEVBQ2YsR0FBRyxHQUFHLENBQUMsTUFDc0IsRUFBRTtRQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlLENBQUUsRUFBVTtRQUN6Qiw4Q0FBOEM7UUFDOUMsbUVBQW1FO1FBQ25FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDO1lBRUQseURBQXlEO1lBQ3pELGtFQUFrRTtZQUNsRSw2Q0FBNkM7WUFDN0MsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxlQUFTLENBQUM7SUFDN0MsQ0FBQztJQUVELGdCQUFnQixDQUFFLEdBQWlCO1FBQ2pDLE1BQU0sR0FBRyxHQUFHO1lBQ1YsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDMUIsQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELG1CQUFtQixDQUFFLEdBQWlCO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksaUJBQXFCLENBQUMsQ0FBQyxJQUFJLGdCQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBRSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxHQU9yQztRQUNDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDbkIsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFFLEVBQ2QsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0MsYUFBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxXQUFXLHVCQUF1QixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBRSxFQUNmLEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQU9yQztRQUNDLHlGQUF5RjtRQUN6RixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDaEgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUFFLFlBQW9DLEVBQzdELEVBQ0UsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0QsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBRSxXQUFrQyxFQUFFLEVBQzVELEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQU9yQztRQUNDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25DLEdBQUcsR0FBRyxHQUFHLElBQUksTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNyRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsYUFBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxXQUFXLGdCQUFnQixJQUFJLENBQUMsUUFBUSxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUNoRyxNQUFNO1lBQ1IsQ0FBQztRQUNILENBQUM7UUFDRCxhQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcseUNBQXlDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hHLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDL0IsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0IsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBb0IsQ0FBQyxFQUFFLEdBQUcsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRLENBQUUsRUFDUixHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxHQUFHLElBQUksaUJBQXFCLEVBQUUsR0FPckM7UUFDQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztJQUNILENBQUM7SUFFRCxZQUFZLENBQUUsRUFDWixHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxHQUFHLElBQUksaUJBQXFCLEVBQUUsRUFPckM7UUFDQyxhQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsdUJBQXVCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNyRyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsYUFBYSxDQUFFLEVBQ2IsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0MseUZBQXlGO1FBQ3pGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEYsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHVCQUF1QixDQUFFLFlBQW9DLEVBQzNELEVBQ0UsR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sR0FBRyxJQUFJLGlCQUFxQixFQUFFLEVBT3JDO1FBQ0QsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxzQkFBc0IsQ0FBRSxNQUE2QixFQUFFLEVBQ3JELEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEdBQUcsSUFBSSxpQkFBcUIsRUFBRSxFQU9yQztRQUNDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkMsR0FBRyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNULGFBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsV0FBVyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEsaUNBQWlDLENBQUMsQ0FBQztnQkFDaEcsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsYUFBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxXQUFXLHlDQUF5QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQW9CLENBQUMsRUFBRSxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFsVUQsb0NBa1VDOzs7Ozs7Ozs7Ozs7O0FDN1ZELE1BQXFCLG9CQUFvQjtJQUN2QyxFQUFFLENBQW1CO0lBQ3JCLFNBQVMsR0FBWSxJQUFJLENBQUM7SUFDMUIsSUFBSSxDQUFVO0lBQ2QsSUFBSSxDQUFPO0lBQ1gsR0FBRyxDQUFVO0lBQ2IsWUFBYSxFQUNYLEVBQUUsRUFDRixTQUFTLEdBQUcsSUFBSSxFQUNoQixJQUFJLEVBQ0osSUFBSSxFQUNKLEdBQUcsS0FPRCxFQUFFO1FBQ0osSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLENBQUUsQ0FBUztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBRSxDQUFTO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFoREQsMENBZ0RDOzs7Ozs7Ozs7Ozs7O0FDOUNELE1BQXFCLHFCQUFzQixTQUFRLEtBQTJCO0lBQzVFLFlBQWEsU0FBZ0Q7UUFDM0QsSUFBSSxTQUFTLFlBQVksS0FBSztZQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2FBQy9DLElBQUksU0FBUztZQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFDaEMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELEtBQUssQ0FBRSxLQUE0QjtRQUNqQyxLQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBRSxLQUE0QjtRQUNsQyxPQUFPLElBQUkscUJBQXFCLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVTLGNBQWMsQ0FBRSxLQUEyQjtRQUNuRCxNQUFNLGVBQWUsR0FBd0IsRUFBRSxDQUFDO1FBQ2hELEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ2YsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sR0FBRyxHQUF5QyxFQUFFLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQTJCLEVBQUUsQ0FBQztRQUN6QyxLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLElBQUkscUJBQXFCLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRjtBQTlDRCwyQ0E4Q0M7Ozs7Ozs7Ozs7Ozs7O0FDaERELCtEQUF3QjtBQUN4QixxRUFBNkg7QUFDN0gsOEVBQWlGO0FBQ2pGLDJGQUFrSTtBQUdsSSwrREFBbUY7QUFDbkYsc0ZBQStEO0FBQy9ELHNHQUF3RDtBQUN4RCx5R0FBMEQ7QUFFMUQsZ0RBQWdEO0FBQ2hELElBQUksRUFBUSxDQUFDO0FBQ2IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ25CLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7SUFDaEMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDekMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2pELEVBQUUsR0FBRyxtQkFBTyxDQUFDLGNBQUksQ0FBQyxDQUFDO1lBQ25CLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBbUVsQyxNQUFhLG1CQUFvQixTQUFRLEtBQUs7Q0FBRztBQUFqRCxrREFBaUQ7QUFTakQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFhLFNBQVM7SUFDcEI7O09BRUc7SUFDTyxVQUFVLENBQWU7SUFFbkM7O09BRUc7SUFDTyxHQUFHLENBQWdCO0lBRTdCOztPQUVHO0lBQ08sY0FBYyxDQUFrQjtJQUUxQzs7OztPQUlHO0lBQ08sU0FBUyxHQUErQyxFQUFFLENBQUM7SUFFckU7Ozs7T0FJRztJQUNPLFVBQVUsR0FBZ0QsRUFBRSxDQUFDO0lBRXZFOztPQUVHO0lBQ0ksdUJBQXVCLEdBQVksSUFBSSxDQUFDO0lBRS9DOztPQUVHO0lBQ0ksd0JBQXdCLEdBQVksSUFBSSxDQUFDO0lBRWhELFlBQWEsR0FBeUI7UUFDcEMsYUFBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sd0JBQXdCO1FBQzdCLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSx5QkFBeUI7UUFDOUIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUUsR0FBeUI7UUFDeEMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTSxDQUFFLEdBQWlCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVNLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0saUJBQWlCLENBQUUsY0FBOEI7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQzVFLENBQUM7SUFFTSxLQUFLLENBQUUsR0FBUztRQUNyQixJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQy9CLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsTUFBTSxlQUFlLEdBQUc7WUFDdEIsYUFBYTtZQUNiLFNBQVM7WUFDVCx1QkFBdUI7WUFDdkIsU0FBUztZQUNULE1BQU07WUFDTixZQUFZO1lBQ1osUUFBUTtZQUNSLFFBQVE7WUFDUixVQUFVO1lBQ1YsU0FBUztZQUNULFFBQVE7WUFDUixTQUFTO1lBQ1QsYUFBYTtZQUNiLFFBQVE7WUFDUixXQUFXO1lBQ1gsUUFBUTtZQUNSLGdCQUFnQjtZQUNoQixNQUFNO1lBQ04saUJBQWlCO1lBQ2pCLE9BQU87WUFDUCxLQUFLO1lBQ0wsV0FBVztTQUNaLENBQUM7UUFDRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNsQyxVQUFVLEdBQUcsVUFBVSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxPQUFPLENBQUUsR0FBeUI7UUFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDcEIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxjQUFjLEdBQW9CLElBQUksQ0FBQyxjQUFjLElBQUksYUFBRyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLGdCQUFnQixDQUFFLElBQVksRUFBRSxFQUE4QjtRQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0saUJBQWlCLENBQUUsSUFBWSxFQUFFLEVBQStCO1FBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSxXQUFXLENBQUUsSUFBWTtRQUM5QixPQUFPLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLENBQUM7SUFDckQsQ0FBQztJQUVNLFlBQVksQ0FBRSxJQUFZO1FBQy9CLE9BQU8sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsQ0FBQztJQUN0RCxDQUFDO0lBRU0scUNBQXFDO1FBQzFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSxtQ0FBbUM7UUFDeEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLGFBQWEsQ0FBRSxFQUFzQjtRQUMxQyxhQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdkQsTUFBTSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUMsUUFBUSxrSUFBa0ksQ0FBQztZQUN0SyxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGNBQWMsQ0FBRSxJQUF5QjtRQUM5QyxhQUFHLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDMUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxJQUFJLENBQUMsUUFBUSw2SUFBNkksQ0FBQztZQUNwTCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLGlCQUFpQixDQUFFLGtCQUFzQyxFQUFFLEVBQ2hFLEdBQUcsRUFDSCxNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBT1A7UUFDQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDbkksQ0FBQztJQUNILENBQUM7SUFFTSxrQkFBa0IsQ0FBRSxtQkFBd0MsRUFBRSxFQUNuRSxHQUFHLEVBQ0gsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQU9QO1FBQ0MsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUM3QyxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3pKLElBQUksbUJBQW1CLFlBQVksT0FBTyxFQUFFLENBQUM7Z0JBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNwRSxDQUFDO1lBQ0QsT0FBTyxtQkFBbUIsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUUsa0JBQXNDLEVBQUUsRUFDbEUsR0FBRyxFQUNILE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFPUDtRQUNDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDM0MsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3pJLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBRSxtQkFBd0MsRUFBRSxFQUNyRSxHQUFHLEVBQ0gsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQU9QO1FBQ0MsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztZQUM3QyxPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDNUksQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNJLFdBQVcsQ0FBRSxHQUE4RDtRQUNoRixJQUFJLEdBQUcsWUFBWSxlQUFTLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDaEUsSUFBSSxHQUFHLFlBQVksZUFBUyxFQUFFLENBQUM7Z0JBQzdCLGFBQUcsQ0FBQyxFQUFFLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUMxQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sYUFBRyxDQUFDLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUNELE1BQU0sRUFBRSxHQUFHLElBQUksZUFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDL0MsYUFBRyxDQUFDLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBQ3RELElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNaLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUNELE1BQU0sRUFBRSxHQUFHLElBQUksZUFBUyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdFLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDaEUsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVUsQ0FBRSxHQUEwRDtRQUMzRSxJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzVDLGFBQUcsQ0FBQyxFQUFFLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUksY0FBYSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7YUFBTSxDQUFDO1lBQ04sYUFBRyxDQUFDLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxjQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVcsQ0FBRSxHQUF5QztRQUMzRCxJQUFJLEdBQUcsWUFBWSxlQUFTLEVBQUUsQ0FBQztZQUM3QixPQUFPLElBQUksZUFBYyxDQUFDO2dCQUN4QixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxDQUFDO2FBQ1AsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksZUFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxxQkFBcUIsQ0FBRSxHQUFRO1FBQ3ZDLElBQ0UsR0FBRyxZQUFZLGVBQVM7WUFDeEIsR0FBRyxZQUFZLGNBQWE7WUFDNUIsR0FBRyxZQUFZLGVBQWMsRUFDN0IsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxjQUFhLENBQUMsRUFBRSxDQUFDO29CQUNyQyxPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyx5QkFBeUIsQ0FBRSxHQUFRO1FBQzNDLElBQ0UsR0FBRyxZQUFZLGVBQVM7WUFDeEIsR0FBRyxZQUFZLGNBQWE7WUFDNUIsR0FBRyxZQUFZLGVBQWMsRUFDN0IsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdCLElBQUksSUFBSSxZQUFZLGNBQWEsRUFBRSxDQUFDO29CQUNsQyxPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyw2QkFBNkIsQ0FBRSxHQUFRO1FBQy9DLElBQ0UsR0FBRyxZQUFZLGVBQVM7WUFDeEIsR0FBRyxZQUFZLGNBQWE7WUFDNUIsR0FBRyxZQUFZLGVBQWMsRUFDN0IsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLEtBQUssTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQyxJQUFJLEtBQUssWUFBWSxlQUFjLEVBQUUsQ0FBQztvQkFDcEMsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQUVTLHdDQUF3QyxDQUFFLEdBQTRCO1FBQzlFLE1BQU0sTUFBTSxHQUF3QjtZQUNsQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNqQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsNENBQTRDLENBQUUsR0FBZ0M7UUFDdEYsTUFBTSxNQUFNLEdBQTRCO1lBQ3RDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNWLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO1lBQ3RCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTtZQUMxQixTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7WUFDeEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsUUFBUSxDQUFFLEtBQWUsRUFBRSxNQUFjLEdBQUc7UUFDcEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFUyxVQUFVLENBQUUsR0FBVyxFQUFFLE1BQWM7UUFDL0MsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxtQkFBbUIsQ0FBRSxHQUFXLEVBQUUsU0FBaUI7UUFDM0QsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDNUIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyRSxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sTUFBTSxHQUFHLEdBQUcsUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDM0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLFlBQVksQ0FBRSxHQUFXO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzRUc7SUFDSSxTQUFTLENBQUUsS0FBZ0IsRUFBRSxFQUFFLFVBQVUsR0FBRyxL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WyJ3ZWJwYWNrOi8vdWx0cmFsb290L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvZGVmYXVsdC9jb25kaXRpb25zLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy9kZWZhdWx0L2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL2xvZy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvcm5nLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy9ybmcvcHJlZGljdGFibGUudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3RhYmxlLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9tYW5hZ2VyLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sL2VudHJ5LnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdC50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvcG9vbC9lbnRyeS9yZXN1bHRzLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy91bHRyYWxvb3QudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly91bHRyYWxvb3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdWx0cmFsb290L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdWx0cmFsb290L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly91bHRyYWxvb3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlVsdHJhTG9vdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJVbHRyYUxvb3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgTG9vdFRhYmxlQ29uZGl0aW9uU2lnbmF0dXJlIH0gZnJvbSAnLi8uLi90YWJsZSc7XHJcbmltcG9ydCB7XHJcbiAgZGVwZW5kXHJcbn0gZnJvbSAnLi8uLi91dGlscyc7XHJcblxyXG50eXBlIERlcGVuZENvbnRleHRTaWduYXR1cmUgPSAoe1xyXG4gIGNvbnRleHQsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgY29udGV4dDogYW55LFxyXG4gIGFyZ3M6IHtcclxuICAgIHByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgbWluPzogbnVtYmVyLFxyXG4gICAgbWF4PzogbnVtYmVyLFxyXG4gICAgdG9iZT86IGFueSxcclxuICAgIGludmVyc2U/OiBib29sZWFuLFxyXG4gICAgc3RyaWN0PzogYm9vbGVhblxyXG4gIH1cclxufSkgPT4gYm9vbGVhbjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHZhbHVlIHNldCBpbiBsb290ZXJcclxuICogQHBhcmFtIGFyZ3NcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgY29udGV4dCA9IHsgYTogeyBiOiAnZm9vJywgYzogdHJ1ZSwgZDogZmFsc2UgfSB9O1xyXG4gKiBkZXBlbmRDb250ZXh0KHsgY29udGV4dCwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYicgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRDb250ZXh0KHsgY29udGV4dCwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYicsIHRvYmU6ICdmb28nIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kQ29udGV4dCh7IGNvbnRleHQsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmMnLCB0b2JlOiAnZm9vJyB9IH0pOyAvLyBmYWxzZVxyXG4gKiBkZXBlbmRDb250ZXh0KHsgY29udGV4dCwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYycgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRDb250ZXh0KHsgY29udGV4dCwgYXJnczogeyBwcm9wZXJ0eTogJ2EuZCcgfSB9KTsgLy8gZmFsc2VcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gVXNlIGluIGEganNvbiBmaWxlOlxyXG4gKiB7XHJcbiAqICAgXCJwb29sc1wiOiBbXHJcbiAqICAgICB7XHJcbiAqICAgICAgIFwiY29uZGl0aW9uc1wiOiBbXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgXCJmdW5jdGlvblwiOiBcImRlcGVuZENvbnRleHRcIixcclxuICogICAgICAgICAgIFwiYXJnc1wiOiB7XHJcbiAqICAgICAgICAgICAgIFwicHJvcGVydHlcIjogXCJwaHlzaWNhbC53ZXRcIlxyXG4gKiAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICogICAgICAgXSxcclxuICogICAgICAgXCJlbnRyaWVzXCI6IFtcclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICBcImlkXCI6IFwic29nZ3lfbmV3c3BhcGVyXCJcclxuICogICAgICAgICB9XHJcbiAqICAgICAgIF1cclxuICogICAgIH1cclxuICogICBdXHJcbiAqIH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBkZXBlbmRDb250ZXh0OiBEZXBlbmRDb250ZXh0U2lnbmF0dXJlID0gKHsgY29udGV4dCwgYXJncyB9KSA9PiB7XHJcbiAgcmV0dXJuIGRlcGVuZChjb250ZXh0LCBhcmdzKTtcclxufTtcclxuXHJcbnR5cGUgRGVwZW5kTG9vdGVyU2lnbmF0dXJlID0gKHtcclxuICBsb290ZXIsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgbG9vdGVyOiBhbnksXHJcbiAgYXJnczoge1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBtaW4/OiBudW1iZXIsXHJcbiAgICBtYXg/OiBudW1iZXIsXHJcbiAgICB0b2JlPzogYW55LFxyXG4gICAgaW52ZXJzZT86IGJvb2xlYW4sXHJcbiAgICBzdHJpY3Q/OiBib29sZWFuXHJcbiAgfVxyXG59KSA9PiBib29sZWFuO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gdmFsdWUgc2V0IGluIGxvb3RlclxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBsb290ZXIgPSB7IGE6IHsgYjogJ2ZvbycsIGM6IHRydWUsIGQ6IGZhbHNlIH0gfTtcclxuICogZGVwZW5kTG9vdGVyKHsgbG9vdGVyLCBhcmdzOiB7IHByb3BlcnR5OiAnYS5iJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZExvb3Rlcih7IGxvb3RlciwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYicsIHRvYmU6ICdmb28nIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kTG9vdGVyKHsgbG9vdGVyLCBhcmdzOiB7IHByb3BlcnR5OiAnYS5jJywgdG9iZTogJ2ZvbycgfSB9KTsgLy8gZmFsc2VcclxuICogZGVwZW5kTG9vdGVyKHsgbG9vdGVyLCBhcmdzOiB7IHByb3BlcnR5OiAnYS5jJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZExvb3Rlcih7IGxvb3RlciwgYXJnczogeyBwcm9wZXJ0eTogJ2EuZCcgfSB9KTsgLy8gZmFsc2VcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gVXNlIGluIGEganNvbiBmaWxlOlxyXG4gKiB7XHJcbiAqICAgXCJwb29sc1wiOiBbXHJcbiAqICAgICB7XHJcbiAqICAgICAgIFwiY29uZGl0aW9uc1wiOiBbXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgXCJmdW5jdGlvblwiOiBcImRlcGVuZExvb3RlclwiLFxyXG4gKiAgICAgICAgICAgXCJhcmdzXCI6IHtcclxuICogICAgICAgICAgICAgXCJwcm9wZXJ0eVwiOiBcInN0YXR1cy5zaWNrbmVzc1wiLFxyXG4gKiAgICAgICAgICAgICBcIm1pblwiOiAwLjVcclxuICogICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqICAgICAgIF0sXHJcbiAqICAgICAgIFwiZW50cmllc1wiOiBbXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgXCJpZFwiOiBcInNpY2tuZXNzX2hlYWxpbmdfcGFja1wiXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgICBdXHJcbiAqICAgICB9XHJcbiAqICAgXVxyXG4gKiB9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVwZW5kTG9vdGVyOiBEZXBlbmRMb290ZXJTaWduYXR1cmUgPSAoeyBsb290ZXIsIGFyZ3MgfSkgPT4ge1xyXG4gIHJldHVybiBkZXBlbmQobG9vdGVyLCBhcmdzKTtcclxufTtcclxuIiwiaW1wb3J0IHsgTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUgfSBmcm9tICcuLy4uL3RhYmxlJztcclxuaW1wb3J0IHsgUm5nSW50ZXJmYWNlIH0gZnJvbSAnLi8uLi9ybmcnO1xyXG5pbXBvcnQge1xyXG4gIGRvdFNldCxcclxuICBkb3RHZXRcclxufSBmcm9tICcuLy4uL3V0aWxzJztcclxuXHJcbnR5cGUgSW5oZXJpdExvb3RlclNpZ25hdHVyZSA9ICh7XHJcbiAgbG9vdGVkLFxyXG4gIGxvb3RlcixcclxuICBhcmdzXHJcbn06IHtcclxuICBsb290ZWQ6IGFueSxcclxuICBsb290ZXI6IGFueSxcclxuICBhcmdzOiB7XHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGxvb3RlclByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgbG9vdGVkUHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBkZWZhdWx0PzogYW55LFxyXG4gIH1cclxufSkgPT4gdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBJbmhlcml0cyBzb21lIHByb3BlcnR5IGZyb20gbG9vdGVyIHRvIGxvb3RlZFxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbmhlcml0TG9vdGVyKHtsb290ZWQsIGxvb3Rlciwge1xyXG4gKiAgIGxvb3RlclByb3BlcnR5OiAnZXF1aXBwZWQuY29sb3InLFxyXG4gKiAgIGxvb3RlZFByb3BlcnR5OiAnaXRlbS5jb2xvcidcclxuICogICBkZWZhdWx0OiAncmVkJyxcclxuICogfX0pXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5oZXJpdExvb3RlcjogSW5oZXJpdExvb3RlclNpZ25hdHVyZSA9ICh7IGxvb3RlZCwgbG9vdGVyLCBhcmdzIH0pID0+IHtcclxuICBkb3RTZXQobG9vdGVkLCBhcmdzLnByb3BlcnR5ID8/IGFyZ3MubG9vdGVkUHJvcGVydHksIGRvdEdldChsb290ZXIsIGFyZ3MucHJvcGVydHkgPz8gYXJncy5sb290ZXJQcm9wZXJ0eSwgYXJncy5kZWZhdWx0KSk7XHJcbn07XHJcblxyXG50eXBlIEluaGVyaXRDb250ZXh0U2lnbmF0dXJlID0gKHtcclxuICBsb290ZWQsXHJcbiAgY29udGV4dCxcclxuICBhcmdzXHJcbn06IHtcclxuICBsb290ZWQ6IGFueSxcclxuICBjb250ZXh0OiBhbnksXHJcbiAgYXJnczoge1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBjb250ZXh0UHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBsb290ZWRQcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGRlZmF1bHQ/OiBhbnksXHJcbiAgfVxyXG59KSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEluaGVyaXRzIHNvbWUgcHJvcGVydHkgZnJvbSBjb250ZXh0IHRvIGxvb3RlZFxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbmhlcml0Q29udGV4dCh7bG9vdGVkLCBsb290ZXIsIHtcclxuICogICBjb250ZXh0UHJvcGVydHk6ICdkeWVkLmNvbG9yJyxcclxuICogICBsb290ZWRQcm9wZXJ0eTogJ2l0ZW0uY29sb3InXHJcbiAqICAgZGVmYXVsdDogJ2Jyb3duJyxcclxuICogfX0pXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5oZXJpdENvbnRleHQ6IEluaGVyaXRDb250ZXh0U2lnbmF0dXJlID0gKHsgbG9vdGVkLCBjb250ZXh0LCBhcmdzIH0pID0+IHtcclxuICBkb3RTZXQobG9vdGVkLCBhcmdzLnByb3BlcnR5ID8/IGFyZ3MubG9vdGVkUHJvcGVydHksIGRvdEdldChjb250ZXh0LCBhcmdzLnByb3BlcnR5ID8/IGFyZ3MuY29udGV4dFByb3BlcnR5LCBhcmdzLmRlZmF1bHQpKTtcclxufTtcclxuXHJcbnR5cGUgU2V0VG9SYW5kb21DaG9pY2VTaWduYXR1cmUgPSAoe1xyXG4gIHJuZyxcclxuICBsb290ZWQsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgbG9vdGVkOiBhbnksXHJcbiAgYXJnczoge1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBjaG9pY2VzPzogQXJyYXk8YW55PiB8IFJlY29yZDxhbnksIG51bWJlcj4gfCBNYXA8YW55LCBudW1iZXI+XHJcbiAgfVxyXG59KSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYSBwcm9wZXJ0eSBvZiBsb290ZWQgdG8gc29tZSByYW5kb20gY2hvaWNlIGZyb20gY2hvaWNlcyBsaXN0XHJcbiAqXHJcbiAqIENob2ljZXMgY2FuIGJlIGEgc2ltcGxlIGFycmF5LCBvciBhIG1hcCBvZiBhbnl0aGluZyA9PiB3ZWlnaHQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcmdzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHNldFRvUmFuZG9tQ2hvaWNlKHtybmcsIGxvb3RlZCwge1xyXG4gKiAgIHByb3BlcnR5OiAnaXRlbS5jb2xvcicsXHJcbiAqICAgY2hvaWNlczogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddXHJcbiAqIH19KTsgLy8gbG9vdGVkLml0ZW0uY29sb3Igd2lsbCBiZSBvbmUgb2YgcmVkLCBncmVlbiBvciBibHVlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldFRvUmFuZG9tQ2hvaWNlOiBTZXRUb1JhbmRvbUNob2ljZVNpZ25hdHVyZSA9ICh7IHJuZywgbG9vdGVkLCBhcmdzIH0pID0+IHtcclxuICBjb25zdCB7IHByb3BlcnR5LCBjaG9pY2VzIH0gPSBhcmdzO1xyXG4gIGlmIChwcm9wZXJ0eSAmJiBsb290ZWQgJiYgY2hvaWNlcykge1xyXG4gICAgZG90U2V0KGxvb3RlZCwgcHJvcGVydHksIHJuZy53ZWlnaHRlZENob2ljZShjaG9pY2VzKSk7XHJcbiAgfVxyXG59O1xyXG4iLCJleHBvcnQgKiBmcm9tICcuL3VsdHJhbG9vdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vcm5nJztcclxuZXhwb3J0ICogZnJvbSAnLi9ybmcvcHJlZGljdGFibGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RhYmxlJztcclxuZXhwb3J0ICogZnJvbSAnLi90YWJsZS9tYW5hZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi90YWJsZS9wb29sJztcclxuZXhwb3J0ICogZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5JztcclxuZXhwb3J0ICogZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHRzJztcclxuXHJcbmltcG9ydCB7IFVsdHJhTG9vdCB9IGZyb20gJy4vdWx0cmFsb290JztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSbmcgfSBmcm9tICcuL3JuZyc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHJlZGljdGFibGVSbmcgfSBmcm9tICcuL3JuZy9wcmVkaWN0YWJsZSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlIH0gZnJvbSAnLi90YWJsZSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlTWFuYWdlciB9IGZyb20gJy4vdGFibGUvbWFuYWdlcic7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlUG9vbCB9IGZyb20gJy4vdGFibGUvcG9vbCc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlRW50cnkgfSBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnknO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZUVudHJ5UmVzdWx0IH0gZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlRW50cnlSZXN1bHRzIH0gZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdHMnO1xyXG5cclxuLy8gVGhpcyBwcm92aWRlcyBhbiBlYXN5IHdheSBvZiB1c2luZyB1bHRyYWxvb3QgaW4gYnJvd3Nlci5cclxuLy8gSXQgY2FuIGJlIGluc3RhbnRpYXRlZCBieSBuZXcgVWx0cmFMb290KCkgYW5kIHN1Ym1vZHVsZXMgY2FuIGJlXHJcbi8vIGluc3RhbnRpYXRlZCBieSBuZXcgVWx0cmFMb290Lkxvb3RUYWJsZSgpIGFuZCB3aGF0bm90LlxyXG5leHBvcnQgZGVmYXVsdCBVbHRyYUxvb3Q7XHJcbiIsImRlY2xhcmUgbGV0IFBST0RVQ1RJT046IGJvb2xlYW47XHJcblxyXG5sZXQgZGVidWcgPSBmYWxzZTtcclxuaWYgKHR5cGVvZiBQUk9EVUNUSU9OICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGRlYnVnID0gIVBST0RVQ1RJT047XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2dnaW5nIGZ1bmN0aW9ucyB0aGF0IGRpc2FwcGVhcnMgaW4gcHJvZHVjdGlvbixcclxuICogYW5kIHN0aWxsIGdpdmUgYWNjdXJhdGUgbGluZSBudW1iZXJzIGluIGRldi5cclxuICovXHJcblxyXG4vKipcclxuICogVHJpZ2dlciB2ZXJib3NlIGxvZ3NcclxuICovXHJcbmRlYnVnID0gZmFsc2U7XHJcbmNvbnN0IHZlcmJvc2UgPSB0cnVlO1xyXG5jb25zdCB1bHRyYXZlcmJvc2UgPSB0cnVlO1xyXG5cclxuY29uc3Qgdm9pZEZ1bmMgPSAoLi4uYXJnczogYW55KTogdm9pZCA9PiB7fTtcclxubGV0IHIgPSB7XHJcbiAgZGVidWc6IHZvaWRGdW5jLFxyXG4gIHY6IHZvaWRGdW5jLFxyXG4gIHZ2OiB2b2lkRnVuYyxcclxuICB2aTogdm9pZEZ1bmMsXHJcbiAgdmU6IHZvaWRGdW5jLFxyXG4gIHZnOiB2b2lkRnVuYyxcclxuICB2Z2U6IHZvaWRGdW5jLFxyXG4gIHZnYzogdm9pZEZ1bmMsXHJcbiAgdnQ6IHZvaWRGdW5jLFxyXG4gIGQ6IHZvaWRGdW5jLFxyXG4gIGc6IHZvaWRGdW5jLFxyXG4gIGdlOiB2b2lkRnVuYyxcclxuICBnYzogdm9pZEZ1bmMsXHJcbiAgdDogdm9pZEZ1bmMsXHJcbiAgdGU6IHZvaWRGdW5jLFxyXG4gIHRpbWU6IHZvaWRGdW5jLFxyXG4gIHRpbWVFbmQ6IHZvaWRGdW5jLFxyXG4gIGdyb3VwOiB2b2lkRnVuYyxcclxuICBncm91cEVuZDogdm9pZEZ1bmMsXHJcbiAgZ3JvdXBDb2xsYXBzZWQ6IHZvaWRGdW5jLFxyXG4gIGxvZzogdm9pZEZ1bmMsXHJcbiAgZXJyb3I6IHZvaWRGdW5jLFxyXG4gIHRhYmxlOiB2b2lkRnVuYyxcclxuICBpbmZvOiB2b2lkRnVuYyxcclxufTtcclxuaWYgKGRlYnVnKSB7XHJcbiAgciA9IHtcclxuICAgIC4uLnIsXHJcbiAgICAuLi57XHJcbiAgICAgIGRlYnVnOiBmdW5jdGlvbiAoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGVidWcpIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkOiBjb25zb2xlLmxvZyxcclxuICAgICAgZzogY29uc29sZS5ncm91cCxcclxuICAgICAgZ2U6IGNvbnNvbGUuZ3JvdXBFbmQsXHJcbiAgICAgIGdjOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxyXG4gICAgICBncm91cDogY29uc29sZS5ncm91cCxcclxuICAgICAgZ3JvdXBFbmQ6IGNvbnNvbGUuZ3JvdXBFbmQsXHJcbiAgICAgIGdyb3VwQ29sbGFwc2VkOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxyXG4gICAgICBsb2c6IGNvbnNvbGUubG9nLFxyXG4gICAgICBlcnJvcjogY29uc29sZS5lcnJvcixcclxuICAgICAgdGFibGU6IGNvbnNvbGUudGFibGUsXHJcbiAgICAgIGluZm86IGNvbnNvbGUuaW5mb1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaWYgKHZlcmJvc2UpIHtcclxuICAgIHIgPSB7XHJcbiAgICAgIC4uLnIsXHJcbiAgICAgIC4uLntcclxuICAgICAgICB2OiBjb25zb2xlLmxvZyxcclxuICAgICAgICB2aTogY29uc29sZS5pbmZvLFxyXG4gICAgICAgIHZlOiBjb25zb2xlLmVycm9yLFxyXG4gICAgICAgIHZnOiBjb25zb2xlLmdyb3VwLFxyXG4gICAgICAgIHZnZTogY29uc29sZS5ncm91cEVuZCxcclxuICAgICAgICB2Z2M6IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQsXHJcbiAgICAgICAgdnQ6IGNvbnNvbGUudGFibGUsXHJcbiAgICAgICAgdDogY29uc29sZS50aW1lLFxyXG4gICAgICAgIHRlOiBjb25zb2xlLnRpbWVFbmQsXHJcbiAgICAgICAgdGltZTogY29uc29sZS50aW1lLFxyXG4gICAgICAgIHRpbWVFbmQ6IGNvbnNvbGUudGltZUVuZCxcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKHVsdHJhdmVyYm9zZSkge1xyXG4gICAgci52diA9IGNvbnNvbGUubG9nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcjtcclxuIiwiY29uc3QgTUFYX1JFQ1VSU0lPTlMgPSAxMDA7XHJcbmNvbnN0IFRIUk9XX09OX01BWF9SRUNVUlNJT05TX1JFQUNIRUQgPSB0cnVlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSYW5kb21JbnRlcmZhY2Uge1xyXG4gIHJhbmRvbSgpIDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpY2VJbnRlcmZhY2Uge1xyXG4gIG46IG51bWJlcjtcclxuICBkOiBudW1iZXI7XHJcbiAgcGx1czogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZVxyXG4gKiBAcHJvcCBtZWFuICAgVXNlZCBmb3IgXCJub3JtYWxcIiB0eXBlIGNoYW5jeSByZXN1bHRzIHRvIGRldGVybWluZSB0aGUgbWVhblxyXG4gKiBAcHJvcCBzdGRkZXYgVXNlZCBmb3IgXCJub3JtYWxcIiB0eXBlIGNoYW5jeSByZXN1bHRzIHRvIGRldGVybWluZSB0aGUgc3RkZGV2XHJcbiAqIEBwcm9wIG1pbiAgICBUaGUgbWluaW11bSBwb3NzaWJsZSByZXN1bHRcclxuICogQHByb3AgbWF4ICAgIFRoZSBtYXhpbXVtIHBvc3NpYmxlIHJlc3VsdFxyXG4gKiBAcHJvcCB0eXBlICAgVGhlIHR5cGUgb2YgcmVzdWx0LCBjYW4gYmUgXCJub3JtYWxcIiwgXCJub3JtYWxfaW50XCIsIFwiaW50ZWdlclwiIG9yIFwicmFuZG9tXCJcclxuICogQHByb3AgcG93ZXIgIFRoZSBwb3dlciBmYWN0b3IgdG8gcGFzcyB0byB0aGUgcmFuZG9tIGZ1bmN0aW9uIC0gYmFzaWNhbGx5IHNrZXdzIHJlc3VsdHMgb25lIHdheSBvciB0aGUgb3RoZXJcclxuICogQHByb3Agc2tldyAgIFNrZXcgdG8gdXNlIHdoZW4gdXNpbmcgYSBcIm5vcm1hbFwiIG9yIFwibm9ybWFsX2ludFwiIGRpc3RyaWJ1dGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuY3lJbnRlcmZhY2Uge1xyXG4gIG1lYW4/OiBudW1iZXI7XHJcbiAgc3RkZGV2PzogbnVtYmVyO1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbiAgdHlwZT86IHN0cmluZztcclxuICBza2V3PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDaGFuY3kgPSBDaGFuY3lJbnRlcmZhY2UgfCBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG5leHBvcnQgdHlwZSBTZWVkID0gc3RyaW5nIHwgbnVtYmVyO1xyXG5cclxuZXhwb3J0IHR5cGUgTWF0aEZ1bmMgPSAnZmxvb3InIHwgJ2NlaWwnIHwgJ3JvdW5kJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm5nSW50ZXJmYWNlIHtcclxuICBwcmVkaWN0YWJsZShzZWVkPzogU2VlZCkgOiBSbmdJbnRlcmZhY2U7XHJcbiAgaGFzaFN0cihzdHIgOiBzdHJpbmcpIDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIGNvbnZlcnRTdHJpbmdUb051bWJlcihzdHIgOiBzdHJpbmcpIDogbnVtYmVyO1xyXG4gIGdldFNlZWQoKSA6IG51bWJlcjtcclxuICBzYW1lQXMob3RoZXI6IFJuZ0ludGVyZmFjZSkgOiBib29sZWFuO1xyXG4gIHNlZWQoc2VlZCA6IFNlZWQpIDogdGhpcztcclxuICBwZXJjZW50YWdlKCkgOiBudW1iZXI7XHJcbiAgcmFuZG9tKGZyb20/IDogbnVtYmVyLCB0bz8gOiBudW1iZXIsIHNrZXc/IDogbnVtYmVyKSA6IG51bWJlcjtcclxuICBjaGFuY2UobiA6IG51bWJlciwgY2hhbmNlSW4/IDogbnVtYmVyKSA6IGJvb2xlYW47XHJcbiAgY2hhbmNlVG8oZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIpIDogYm9vbGVhbjtcclxuICByYW5kSW50KGZyb20/IDogbnVtYmVyLCB0bz8gOiBudW1iZXIsIHNrZXc/IDogbnVtYmVyKSA6IG51bWJlcjtcclxuICB1bmlxaWQocHJlZml4Pzogc3RyaW5nLCByYW5kb20/OiBib29sZWFuKSA6IHN0cmluZztcclxuICB1bmlxc3RyKGxlbj86IG51bWJlcikgOiBzdHJpbmc7XHJcbiAgcmFuZEJldHdlZW4oZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIsIHNrZXcgOiBudW1iZXIpIDogbnVtYmVyO1xyXG4gIG5vcm1hbChhcmdzPzogTm9ybWFsQXJncykgOiBudW1iZXI7XHJcbiAgY2hhbmN5SW50KGlucHV0IDogQ2hhbmN5LCBmbiA/OiBNYXRoRnVuYykgOiBudW1iZXI7XHJcbiAgY2hhbmN5KGlucHV0IDogQ2hhbmN5KSA6IG51bWJlcjtcclxuICBjaG9pY2UoZGF0YSA6IEFycmF5PGFueT4pIDogYW55O1xyXG4gIHdlaWdodGVkQ2hvaWNlKGRhdGEgOiBSZWNvcmQ8YW55LCBudW1iZXI+IHwgQXJyYXk8YW55PiB8IE1hcDxhbnksIG51bWJlcj4pIDogYW55O1xyXG4gIGRpY2UobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIsIGQ/IDogbnVtYmVyLCBwbHVzPyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgcGFyc2VEaWNlU3RyaW5nKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlO1xyXG4gIGNsYW1wKG51bWJlciA6IG51bWJlciwgbG93ZXIgOiBudW1iZXIsIHVwcGVyIDogbnVtYmVyKSA6IG51bWJlcjtcclxuICBiaW4odmFsIDogbnVtYmVyLCBiaW5zIDogbnVtYmVyLCBtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgc2VyaWFsaXplKCkgOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm5nQ29uc3RydWN0b3Ige1xyXG4gIG5ldyAoc2VlZD86U2VlZCk6IFJuZ0ludGVyZmFjZTtcclxuICB1bnNlcmlhbGl6ZShybmc6IGFueSk6IFJuZ0ludGVyZmFjZTtcclxuICBjaGFuY3lNaW4oaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyO1xyXG4gIGNoYW5jeU1heChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXI7XHJcbiAgcGFyc2VEaWNlU3RyaW5nKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlO1xyXG4gIGRpY2VNaW4obiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIsIGQ/IDogbnVtYmVyLCBwbHVzPyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgZGljZU1heChuIDogc3RyaW5nIHwgRGljZUludGVyZmFjZSB8IG51bWJlciwgZD8gOiBudW1iZXIsIHBsdXM/IDogbnVtYmVyKSA6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgZGljZVJlIDogUmVnRXhwID0gL14gKihbMC05XSspICpbZERdICooWzAtOV0rKSAqKFsrLV0/ICpbMC05XSopICokLztcclxuY29uc3QgZGljZVJlTm9Jbml0IDogUmVnRXhwID0gL14gKltkRF0gKihbMC05XSspICooWystXT8gKlswLTldKikgKiQvO1xyXG5jb25zdCBzdHJUb051bWJlckNhY2hlIDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG5jb25zdCBkaWNlQ2FjaGUgOiBSZWNvcmQ8c3RyaW5nLCBEaWNlSW50ZXJmYWNlPiA9IHt9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkUm5nIHtcclxuICBtYXNrOiBudW1iZXIsXHJcbiAgc2VlZDogbnVtYmVyLFxyXG4gIG1fejogbnVtYmVyLFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOb3JtYWxBcmdzID0ge1xyXG4gIG1lYW4/OiBudW1iZXIsXHJcbiAgc3RkZGV2PzogbnVtYmVyLFxyXG4gIG1heD86IG51bWJlcixcclxuICBtaW4/OiBudW1iZXIsXHJcbiAgc2tldz86IG51bWJlcixcclxuICBza2V3dHlwZT86IHN0cmluZyxcclxufTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSbmdBYnN0cmFjdCBpbXBsZW1lbnRzIFJuZ0ludGVyZmFjZSB7XHJcbiAgI3NlZWQ6IG51bWJlciA9IDA7XHJcbiAgY29uc3RydWN0b3IgKHNlZWQ/IDogU2VlZCkge1xyXG4gICAgdGhpcy5zZXRTZWVkKHNlZWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNlZWQgKCkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2FtZUFzIChvdGhlciA6IFJuZ0Fic3RyYWN0KSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlZWQgPT09IG90aGVyLiNzZWVkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldFNlZWQgKHNlZWQ/IDogU2VlZCkgOiB0aGlzIHtcclxuICAgIGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VlZCAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodHlwZW9mIHNlZWQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgc2VlZCA9IHRoaXMuY29udmVydFN0cmluZ1RvTnVtYmVyKHNlZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuI3NlZWQgPSBzZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0U2VlZChNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VlZCAoc2VlZD86IFNlZWQpOiB0aGlzIHtcclxuICAgIHRoaXMuc2V0U2VlZChzZWVkKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlcmlhbGl6ZSAoKSA6IGFueSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWVkOiB0aGlzLiNzZWVkLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdW5zZXJpYWxpemUgKHNlcmlhbGl6ZWQgOiBTZXJpYWxpemVkUm5nKSA6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICBjb25zdCB7IGNvbnN0cnVjdG9yIH0gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XHJcbiAgICBjb25zdCBybmcgPSBuZXcgY29uc3RydWN0b3Ioc2VyaWFsaXplZC5zZWVkKTtcclxuICAgIHJuZy5zZXRTZWVkKHNlcmlhbGl6ZWQuc2VlZCk7XHJcbiAgICByZXR1cm4gcm5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZWRpY3RhYmxlIChzZWVkPyA6IFNlZWQpIDogUm5nSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIGNvbnN0IG5ld1NlbGYgOiBSbmdJbnRlcmZhY2UgPSBuZXcgY29uc3RydWN0b3Ioc2VlZCk7XHJcbiAgICByZXR1cm4gbmV3U2VsZjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcHJlZGljdGFibGU8VCBleHRlbmRzIFJuZ0Fic3RyYWN0Pih0aGlzOiBuZXcgKHNlZWQ6IFNlZWQpID0+IFQsIHNlZWQ6IFNlZWQpOiBUIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyhzZWVkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNoU3RyIChzdHIgOiBzdHJpbmcpIDogbnVtYmVyIHtcclxuICAgIGxldCBoYXNoID0gMDtcclxuICAgIGxldCBpO1xyXG4gICAgbGV0IGNocjtcclxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSByZXR1cm4gaGFzaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2hyID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcclxuICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnZlcnRTdHJpbmdUb051bWJlciAoc3RyIDogc3RyaW5nKSA6IG51bWJlciB7XHJcbiAgICBpZiAoc3RyVG9OdW1iZXJDYWNoZVtzdHJdKSB7XHJcbiAgICAgIHJldHVybiBzdHJUb051bWJlckNhY2hlW3N0cl07XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW0gPSB0aGlzLmhhc2hTdHIoc3RyKTtcclxuICAgIHN0clRvTnVtYmVyQ2FjaGVbc3RyXSA9IG51bTtcclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3JhbmRvbSAoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBlcmNlbnRhZ2UgKCkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucmFuZEJldHdlZW4oMCwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByYW5kb20gKGZyb20gOiBudW1iZXIgPSAwLCB0byA6IG51bWJlciA9IDEsIHNrZXcgOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5yYW5kQmV0d2Vlbihmcm9tLCB0bywgc2tldyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmNlIChuIDogbnVtYmVyLCBjaGFuY2VJbiA6IG51bWJlciA9IDEpIDogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBjaGFuY2UgPSBuIC8gY2hhbmNlSW47XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZG9tKCkgPD0gY2hhbmNlO1xyXG4gIH1cclxuXHJcbiAgLy8gNTAwIHRvIDEgY2hhbmNlLCBmb3IgZXhhbXBsZVxyXG4gIHB1YmxpYyBjaGFuY2VUbyAoZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIpIDogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZG9tKCkgPD0gKGZyb20gLyAoZnJvbSArIHRvKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmFuZEludCAoZnJvbSA9IDAsIHRvID0gMSwgc2tldyA9IDApIDogbnVtYmVyIHtcclxuICAgIFtmcm9tLCB0b10gPSBbTWF0aC5taW4oZnJvbSwgdG8pLCBNYXRoLm1heChmcm9tLCB0byldO1xyXG4gICAgbGV0IHJhbmQgPSB0aGlzLl9yYW5kb20oKTtcclxuICAgIGlmIChza2V3IDwgMCkge1xyXG4gICAgICByYW5kID0gMSAtIChNYXRoLnBvdyhyYW5kLCBNYXRoLnBvdygyLCBza2V3KSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZCA9IE1hdGgucG93KHJhbmQsIE1hdGgucG93KDIsIC1za2V3KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5kICogKCh0byArIDEpIC0gZnJvbSkpICsgZnJvbTtcclxuICB9XHJcblxyXG4gIC8vIE5vdCBkZXRlcm1pbmlzdGljXHJcbiAgcHVibGljIHVuaXFpZCAocHJlZml4IDogc3RyaW5nID0gJycsIHJhbmRvbSA6IGJvb2xlYW4gPSBmYWxzZSkgOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2VjID0gRGF0ZS5ub3coKSAqIDEwMDAgKyBNYXRoLnJhbmRvbSgpICogMTAwMDtcclxuICAgIGNvbnN0IGlkID0gc2VjLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9cXC4vZywgJycpLnBhZEVuZCgxNCwgJzAnKTtcclxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtpZH0ke3JhbmRvbSA/IGAuJHtNYXRoLnRydW5jKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApfWAgOiAnJ31gO1xyXG4gIH1cclxuXHJcbiAgLy8gRGV0ZXJtaW5pc3RpY1xyXG4gIHB1YmxpYyB1bmlxc3RyIChsZW46IG51bWJlciA9IDYpIDogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN0ciA6IHN0cmluZ1tdID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OSc7XHJcbiAgICBjb25zdCBhbGVuID0gNjE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHN0ci5wdXNoKGFscGhhYmV0W3RoaXMucmFuZEludCgwLCBhbGVuKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByYW5kQmV0d2VlbiAoZnJvbSA6IG51bWJlciA9IDAsIHRvIDogbnVtYmVyID0gMSwgc2tldyA6IG51bWJlciA9IDApOiBudW1iZXIge1xyXG4gICAgW2Zyb20sIHRvXSA9IFtNYXRoLm1pbihmcm9tLCB0byksIE1hdGgubWF4KGZyb20sIHRvKV07XHJcbiAgICBsZXQgcmFuZCA9IHRoaXMuX3JhbmRvbSgpO1xyXG4gICAgaWYgKHNrZXcgPCAwKSB7XHJcbiAgICAgIHJhbmQgPSAxIC0gKE1hdGgucG93KHJhbmQsIE1hdGgucG93KDIsIHNrZXcpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYW5kID0gTWF0aC5wb3cocmFuZCwgTWF0aC5wb3coMiwgLXNrZXcpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnNjYWxlTm9ybShyYW5kLCBmcm9tLCB0byk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2NhbGUgKG51bWJlcjogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxKTogbnVtYmVyIHtcclxuICAgIGlmIChudW1iZXIgPiBtYXgpIHRocm93IG5ldyBFcnJvcihgTnVtYmVyICR7bnVtYmVyfSBpcyBncmVhdGVyIHRoYW4gbWF4IG9mICR7bWF4fWApO1xyXG4gICAgaWYgKG51bWJlciA8IG1pbikgdGhyb3cgbmV3IEVycm9yKGBOdW1iZXIgJHtudW1iZXJ9IGlzIGxlc3MgdGhhbiBtaW4gb2YgJHttaW59YCk7XHJcbiAgICAvLyBGaXJzdCB3ZSBzY2FsZSB0aGUgbnVtYmVyIGluIHRoZSByYW5nZSBbMC0xKVxyXG4gICAgbnVtYmVyID0gKG51bWJlciAtIG1pbikgLyAobWF4IC0gbWluKTtcclxuICAgIHJldHVybiB0aGlzLnNjYWxlTm9ybShudW1iZXIsIGZyb20sIHRvKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY2FsZU5vcm0gKG51bWJlcjogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKG51bWJlciA+IDEgfHwgbnVtYmVyIDwgMCkgdGhyb3cgbmV3IEVycm9yKGBOdW1iZXIgbXVzdCBiZSA8IDEgYW5kID4gMCwgZ290ICR7bnVtYmVyfWApO1xyXG4gICAgcmV0dXJuIChudW1iZXIgKiAodG8gLSBmcm9tKSkgKyBmcm9tO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3VsZFRocm93T25NYXhSZWN1cnNpb25zUmVhY2hlZCAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gVEhST1dfT05fTUFYX1JFQ1VSU0lPTlNfUkVBQ0hFRDtcclxuICB9XHJcblxyXG4gIC8vIEdhdXNzaWFuIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcclxuICBwdWJsaWMgbm9ybWFsICh7IG1lYW4sIHN0ZGRldiA9IDEsIG1heCwgbWluLCBza2V3ID0gMCB9IDogTm9ybWFsQXJncyA9IHt9LCBkZXB0aCA9IDApOiBudW1iZXIge1xyXG4gICAgaWYgKGRlcHRoID4gTUFYX1JFQ1VSU0lPTlMgJiYgdGhpcy5zaG91bGRUaHJvd09uTWF4UmVjdXJzaW9uc1JlYWNoZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01heCByZWN1cnNpdmUgY2FsbHMgdG8gcm5nIG5vcm1hbCBmdW5jdGlvbi4gVGhpcyBtaWdodCBiZSBhcyBhIHJlc3VsdCBvZiB1c2luZyBwcmVkaWN0YWJsZSByYW5kb20gbnVtYmVycz8nKTtcclxuICAgIH1cclxuICAgIGxldCBudW0gPSB0aGlzLmJveE11bGxlcigpO1xyXG4gICAgbnVtID0gbnVtIC8gMTAuMCArIDAuNTsgLy8gVHJhbnNsYXRlIHRvIDAgLT4gMVxyXG4gICAgaWYgKGRlcHRoID4gTUFYX1JFQ1VSU0lPTlMpIHtcclxuICAgICAgbnVtID0gTWF0aC5taW4oTWF0aC5tYXgobnVtLCAwKSwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobnVtID4gMSB8fCBudW0gPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKHsgbWVhbiwgc3RkZGV2LCBtYXgsIG1pbiwgc2tldyB9LCBkZXB0aCArIDEpOyAvLyByZXNhbXBsZSBiZXR3ZWVuIDAgYW5kIDFcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChza2V3IDwgMCkge1xyXG4gICAgICBudW0gPSAxIC0gKE1hdGgucG93KG51bSwgTWF0aC5wb3coMiwgc2tldykpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG51bSA9IE1hdGgucG93KG51bSwgTWF0aC5wb3coMiwgLXNrZXcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG1lYW4gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG1lYW4gPSAwO1xyXG4gICAgICBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBudW0gKj0gbWF4IC0gbWluO1xyXG4gICAgICAgIG51bSArPSBtaW47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtID0gbnVtICogMTA7XHJcbiAgICAgICAgbnVtID0gbnVtIC0gNTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbnVtID0gbnVtICogMTA7XHJcbiAgICAgIG51bSA9IG51bSAtIDU7XHJcbiAgICAgIG51bSA9IG51bSAqIHN0ZGRldiArIG1lYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlcHRoIDw9IE1BWF9SRUNVUlNJT05TICYmICgodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgbnVtID4gbWF4KSB8fCAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbnVtIDwgbWluKSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKHsgbWVhbiwgc3RkZGV2LCBtYXgsIG1pbiwgc2tldyB9LCBkZXB0aCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBhYm92ZSB0aGUgbWF4IHJlY3Vyc2lvbiBsaW1pdCwgd2UganVzdCBjbGFtcCB0aGUgbnVtYmVyLi4uXHJcbiAgICAvLyB0aGlzIGNhbiBoYXBwZW4gaW4gZXh0cmVtZSBjYXNlcyB3aGVyZSBwYXJhbWV0ZXJzIGFyZSB2ZXJ5IG1hcmdpbmFsLCBidXQgd2UgZG8gbm90XHJcbiAgICAvLyB3YW50IHRvIHJldHVybiBhbnkgb3V0IG9mIGJvdW5kcyBudW1iZXJzIGluIHRoZSBjYXNlIHRoYXQgbWF4IGFuZCBtaW4gYXJlIGdpdmVuLCBldmVuXHJcbiAgICAvLyBpZiB0aGV5IGFyZSBub3Qgc3RyaWN0bHkgbm9ybWFsbHkgZGlzdHJpYnV0ZWQgLSBpLmUuIHRoZXJlIHdpbGwgYmUgYSB2ZXJ5IG1hcmdpbmFsIGJpYXNcclxuICAgIC8vIHRvIHRoZSBib3VuZHMgbnVtYmVycyBpbiBjZXJ0YWluIGNhc2VzLCBidXQgaXQncyBsYXJnZWx5IGEgbm9uLWlzc3VlLlxyXG4gICAgaWYgKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG51bSA9IE1hdGgubWluKG51bSwgbWF4KTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBudW0gPSBNYXRoLm1heChudW0sIG1pbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuXHJcbiAgLy8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXHJcbiAgcHVibGljIGJveE11bGxlciAobWVhbiA6IG51bWJlciA9IDAsIHN0ZGRldiA6IG51bWJlciA9IDEpIDogbnVtYmVyIHtcclxuICAgIGNvbnN0IHUgPSAxIC0gdGhpcy5fcmFuZG9tKCk7IC8vIENvbnZlcnRpbmcgWzAsMSkgdG8gKDAsMV1cclxuICAgIGNvbnN0IHYgPSB0aGlzLl9yYW5kb20oKTtcclxuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKHUpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB2KTtcclxuICAgIC8vIFRyYW5zZm9ybSB0byB0aGUgZGVzaXJlZCBtZWFuIGFuZCBzdGFuZGFyZCBkZXZpYXRpb246XHJcbiAgICByZXR1cm4geiAqIHN0ZGRldiArIG1lYW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmN5SW50IChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaW5wdXQudHlwZSA9ICdpbnRlZ2VyJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoYW5jeShpbnB1dCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmN5IChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGljZShpbnB1dCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICdub3JtYWwnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKGlucHV0KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbF9pbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubm9ybWFsKGlucHV0KSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRJbnQoXHJcbiAgICAgICAgICAgIGlucHV0Lm1pbiA/PyAwLFxyXG4gICAgICAgICAgICBpbnB1dC5tYXggPz8gMSxcclxuICAgICAgICAgICAgaW5wdXQuc2tldyA/PyAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRvbShcclxuICAgICAgICAgICAgaW5wdXQubWluID8/IDAsXHJcbiAgICAgICAgICAgIGlucHV0Lm1heCA/PyAxLFxyXG4gICAgICAgICAgICBpbnB1dC5za2V3ID8/IDBcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCBnaXZlbiB0byBjaGFuY3knKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY2hhbmN5TWluIChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGljZU1pbihpbnB1dCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC5za2V3ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgLy8gUmVndWxhciByYW5kb20gbnVtYmVycyBhcmUgZXZlbmx5IGRpc3RyaWJ1dGVkLCBzbyBza2V3XHJcbiAgICAgICAgICAvLyBvbmx5IG1ha2VzIHNlbnNlIG9uIG5vcm1hbCBudW1iZXJzXHJcbiAgICAgICAgICBpbnB1dC50eXBlID0gJ25vcm1hbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoaW5wdXQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbCc6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWluID8/IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbF9pbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5taW4gPz8gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWluID8/IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1pbiA/PyAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYW5jeU1heCAoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpY2VNYXgoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuc2tldyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIC8vIFJlZ3VsYXIgcmFuZG9tIG51bWJlcnMgYXJlIGV2ZW5seSBkaXN0cmlidXRlZCwgc28gc2tld1xyXG4gICAgICAgICAgLy8gb25seSBtYWtlcyBzZW5zZSBvbiBub3JtYWwgbnVtYmVyc1xyXG4gICAgICAgICAgaW5wdXQudHlwZSA9ICdub3JtYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICdub3JtYWwnOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1heCA/PyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdub3JtYWxfaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWF4ID8/IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1heCA/PyAxO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5tYXggPz8gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNob2ljZSAoZGF0YSA6IEFycmF5PGFueT4pIDogYW55IHtcclxuICAgIHJldHVybiB0aGlzLndlaWdodGVkQ2hvaWNlKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGF0YSBmb3JtYXQ6XHJcbiAgICoge1xyXG4gICAqICAgY2hvaWNlMTogMSxcclxuICAgKiAgIGNob2ljZTI6IDIsXHJcbiAgICogICBjaG9pY2UzOiAzLFxyXG4gICAqIH1cclxuICAgKi9cclxuICBwdWJsaWMgd2VpZ2h0ZWRDaG9pY2UgKGRhdGEgOiBSZWNvcmQ8YW55LCBudW1iZXI+IHwgQXJyYXk8YW55PiB8IE1hcDxhbnksIG51bWJlcj4pIDogYW55IHtcclxuICAgIGxldCB0b3RhbCA9IDA7IGxldCBpZDtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICBjb25zdCBjaGFuY2VzIDogTWFwPGFueSwgbnVtYmVyPiA9IG5ldyBNYXAoKTtcclxuICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgY2hhbmNlcy5zZXQoYSwgMSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHRlZENob2ljZShjaGFuY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE1hcCkge1xyXG4gICAgICBkYXRhLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICB0b3RhbCArPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGlkIGluIGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YVtpZF0gPCAwKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JhYmlsaXR5IGNhbm5vdCBiZSBuZWdhdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b3RhbCArPSBkYXRhW2lkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgcmFuZG9tID0gdGhpcy5fcmFuZG9tKCkgKiB0b3RhbDtcclxuXHJcbiAgICBsZXQgcGFydCA9IDA7XHJcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE1hcCkge1xyXG4gICAgICBmb3IgKGNvbnN0IFtpZCwgdmFsdWVdIG9mIGRhdGEpIHtcclxuICAgICAgICBwYXJ0ICs9IHZhbHVlO1xyXG4gICAgICAgIGlmIChyYW5kb20gPCBwYXJ0KSB7XHJcbiAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGlkIGluIGRhdGEpIHtcclxuICAgICAgICBwYXJ0ICs9IGRhdGFbaWRdO1xyXG4gICAgICAgIGlmIChyYW5kb20gPCBwYXJ0KSB7XHJcbiAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgYnkgc29tZSBmbG9hdGluZy1wb2ludCBhbm5veWFuY2Ugd2UgaGF2ZVxyXG4gICAgLy8gcmFuZG9tID49IHRvdGFsLCBqdXN0IHJldHVybiB0aGUgbGFzdCBpZC5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzdGF0aWMgcGFyc2VEaWNlQXJncyAobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIgfCBudW1iZXJbXSA9IDEsIGQ6IG51bWJlciA9IDYsIHBsdXM6IG51bWJlciA9IDApIDogRGljZUludGVyZmFjZSB7XHJcbiAgICBpZiAobiA9PT0gbnVsbCB8fCB0eXBlb2YgbiA9PT0gJ3VuZGVmaW5lZCcgfHwgYXJndW1lbnRzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGljZSBleHBlY3RzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBuID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJzZURpY2VTdHJpbmcobik7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG4gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG4pKSB7XHJcbiAgICAgICAgW24sIGQsIHBsdXNdID0gbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0gbi5kO1xyXG4gICAgICAgIHBsdXMgPSBuLnBsdXM7XHJcbiAgICAgICAgbiA9IG4ubjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgbiwgZCwgcGx1cyB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBhcnNlRGljZUFyZ3MgKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgY29uc3QgeyBjb25zdHJ1Y3RvciB9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xyXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnBhcnNlRGljZUFyZ3MobilcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcGFyc2VEaWNlU3RyaW5nIChzdHJpbmcgOiBzdHJpbmcpIDogRGljZUludGVyZmFjZSB7XHJcbiAgICAvLyBkaWNlIHN0cmluZyBsaWtlIDVkMTArMVxyXG4gICAgaWYgKCFkaWNlQ2FjaGVbc3RyaW5nXSkge1xyXG4gICAgICBpZiAoZGljZVJlLnRlc3Qoc3RyaW5nKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRpY2VSZS5leGVjKHN0cmluZy5yZXBsYWNlKC8gKy9nLCAnJykpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgIGRpY2VDYWNoZVtzdHJpbmddID0ge1xyXG4gICAgICAgICAgICBuOiAocGFyc2VJbnQocmVzdWx0WzFdKSAvIDEgfHwgMSksXHJcbiAgICAgICAgICAgIGQ6IChwYXJzZUludChyZXN1bHRbMl0pIC8gMSB8fCAxKSxcclxuICAgICAgICAgICAgcGx1czogKHBhcnNlRmxvYXQocmVzdWx0WzNdKSAvIDEgfHwgMCksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkaWNlUmVOb0luaXQudGVzdChzdHJpbmcpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZGljZVJlTm9Jbml0LmV4ZWMoc3RyaW5nLnJlcGxhY2UoLyArL2csICcnKSk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgZGljZUNhY2hlW3N0cmluZ10gPSB7XHJcbiAgICAgICAgICAgIG46IDEsXHJcbiAgICAgICAgICAgIGQ6IChwYXJzZUludChyZXN1bHRbMV0pIC8gMSB8fCAxKSxcclxuICAgICAgICAgICAgcGx1czogKHBhcnNlRmxvYXQocmVzdWx0WzJdKSAvIDEgfHwgMCksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpY2VDYWNoZVtzdHJpbmddO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBkaWNlTWF4IChuIDogc3RyaW5nIHwgRGljZUludGVyZmFjZSB8IG51bWJlciB8IG51bWJlcltdID0gMSwgZDogbnVtYmVyID0gNiwgcGx1czogbnVtYmVyID0gMCkgOiBudW1iZXIge1xyXG4gICAgKHsgbiwgZCwgcGx1cyB9ID0gdGhpcy5wYXJzZURpY2VBcmdzKG4sIGQsIHBsdXMpKTtcclxuICAgIHJldHVybiAobiAqIGQpICsgcGx1cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGljZU1pbiAobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIgfCBudW1iZXJbXSA9IDEsIGQ6IG51bWJlciA9IDYsIHBsdXM6IG51bWJlciA9IDApIDogbnVtYmVyIHtcclxuICAgICh7IG4sIGQsIHBsdXMgfSA9IHRoaXMucGFyc2VEaWNlQXJncyhuLCBkLCBwbHVzKSk7XHJcbiAgICByZXR1cm4gbiArIHBsdXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGljZSAobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIgfCBudW1iZXJbXSA9IDEsIGQ6IG51bWJlciA9IDYsIHBsdXM6IG51bWJlciA9IDApIDogbnVtYmVyIHtcclxuICAgICh7IG4sIGQsIHBsdXMgfSA9IHRoaXMucGFyc2VEaWNlQXJncyhuLCBkLCBwbHVzKSk7XHJcbiAgICBpZiAodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XHJcbiAgICAgIGxldCBudmFsID0gTWF0aC5tYXgobiwgMSk7XHJcbiAgICAgIGNvbnN0IGR2YWwgPSBNYXRoLm1heChkLCAxKTtcclxuICAgICAgaWYgKGQgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gcGx1cyArIDE7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHN1bSA9IHBsdXMgfHwgMDtcclxuICAgICAgd2hpbGUgKG52YWwgPiAwKSB7XHJcbiAgICAgICAgc3VtICs9IHRoaXMucmFuZEludCgxLCBkdmFsKTtcclxuICAgICAgICBudmFsLS07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZ2l2ZW4gdG8gZGljZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBhcnNlRGljZVN0cmluZyAoc3RyaW5nIDogc3RyaW5nKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgY29uc3QgeyBjb25zdHJ1Y3RvciB9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xyXG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnBhcnNlRGljZVN0cmluZyhzdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsYW1wIChudW1iZXIgOiBudW1iZXIsIGxvd2VyIDogbnVtYmVyLCB1cHBlciA6IG51bWJlcikgOiBudW1iZXIge1xyXG4gICAgaWYgKHVwcGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbnVtYmVyID0gbnVtYmVyIDw9IHVwcGVyID8gbnVtYmVyIDogdXBwZXI7XHJcbiAgICB9XHJcbiAgICBpZiAobG93ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBudW1iZXIgPSBudW1iZXIgPj0gbG93ZXIgPyBudW1iZXIgOiBsb3dlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYmluICh2YWwgOiBudW1iZXIsIGJpbnMgOiBudW1iZXIsIG1pbiA6IG51bWJlciwgbWF4IDogbnVtYmVyKSA6IG51bWJlciB7XHJcbiAgICBjb25zdCBzcHJlYWQgPSBtYXggLSBtaW47XHJcbiAgICByZXR1cm4gKE1hdGgucm91bmQoKCh2YWwgLSBtaW4pIC8gc3ByZWFkKSAqIChiaW5zIC0gMSkpIC8gKGJpbnMgLSAxKSAqIHNwcmVhZCkgKyBtaW47XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSbmcgZXh0ZW5kcyBSbmdBYnN0cmFjdCBpbXBsZW1lbnRzIFJuZ0ludGVyZmFjZSB7XHJcbiAgI21hc2s6IG51bWJlcjtcclxuICAjc2VlZDogbnVtYmVyO1xyXG4gICNtX3o6IG51bWJlciA9IDA7XHJcbiAgY29uc3RydWN0b3IgKHNlZWQ/IDogU2VlZCkge1xyXG4gICAgc3VwZXIoc2VlZCk7XHJcbiAgICB0aGlzLiNtYXNrID0gMHhmZmZmZmZmZjtcclxuICAgIHRoaXMuI21feiA9IDk4NzY1NDMyMTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXJpYWxpemUgKCk6IGFueSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtYXNrOiB0aGlzLiNtYXNrLFxyXG4gICAgICBzZWVkOiB0aGlzLmdldFNlZWQoKSxcclxuICAgICAgbV96OiB0aGlzLiNtX3osXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhbWVBcyAob3RoZXI6IFJuZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcyA9IG90aGVyLnNlcmlhbGl6ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlZWQgPT09IHMuc2VlZCAmJlxyXG4gICAgICB0aGlzLiNtYXNrID09PSBzLm1hc2sgJiZcclxuICAgICAgdGhpcy4jbV96ID09PSBzLm1fejtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdW5zZXJpYWxpemUgKHNlcmlhbGl6ZWQgOiBTZXJpYWxpemVkUm5nKTogUm5nIHtcclxuICAgIGNvbnN0IHJuZyA9IG5ldyB0aGlzKCk7XHJcbiAgICBybmcuc2V0U2VlZChzZXJpYWxpemVkLnNlZWQpO1xyXG4gICAgcm5nLiNtYXNrID0gc2VyaWFsaXplZC5tYXNrO1xyXG4gICAgcm5nLiNzZWVkID0gc2VyaWFsaXplZC5zZWVkO1xyXG4gICAgcm5nLiNtX3ogPSBzZXJpYWxpemVkLm1fejtcclxuICAgIHJldHVybiBybmc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VlZCAoaT8gOiBTZWVkKTogdGhpcyB7XHJcbiAgICBzdXBlci5zZWVkKGkpO1xyXG4gICAgdGhpcy4jbV96ID0gOTg3NjU0MzIxO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3JhbmRvbSAoKTogbnVtYmVyIHtcclxuICAgIHRoaXMuI21feiA9ICgzNjk2OSAqICh0aGlzLiNtX3ogJiA2NTUzNSkgKyAodGhpcy4jbV96ID4+IDE2KSkgJiB0aGlzLiNtYXNrO1xyXG4gICAgdGhpcy5zZXRTZWVkKCgxODAwMCAqICh0aGlzLmdldFNlZWQoKSAmIDY1NTM1KSArICh0aGlzLmdldFNlZWQoKSA+PiAxNikpICYgdGhpcy4jbWFzayk7XHJcbiAgICBsZXQgcmVzdWx0ID0gKCh0aGlzLiNtX3ogPDwgMTYpICsgdGhpcy5nZXRTZWVkKCkpICYgdGhpcy4jbWFzaztcclxuICAgIHJlc3VsdCAvPSA0Mjk0OTY3Mjk2O1xyXG4gICAgcmV0dXJuIHJlc3VsdCArIDAuNTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBSbmdBYnN0cmFjdCxcclxuICBSbmdJbnRlcmZhY2UsXHJcbiAgU2VlZFxyXG59IGZyb20gJy4vLi4vcm5nJztcclxuXHJcbi8qKlxyXG4gKiBBbiBSbmcgdHlwZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGdpdmUgcHJlZGljdGFibGUgcmVzdWx0c1xyXG4gKiBmb3IgdGVzdGluZyBwdXJwb3NlcywgYW5kIGdpdmluZyBrbm93biByZXN1bHRzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm5nIGV4dGVuZHMgUm5nQWJzdHJhY3QgaW1wbGVtZW50cyBSbmdJbnRlcmZhY2Uge1xyXG4gIHB1YmxpYyBjb3VudGVyID0gMDtcclxuICBwcm90ZWN0ZWQgX3Jlc3VsdHM6IG51bWJlcltdID0gWzAsIDAuMSwgMC4yLCAwLjMsIDAuNCwgMC41LCAwLjYsIDAuNywgMC44LCAwLjksIDEgLSBOdW1iZXIuRVBTSUxPTl07XHJcbiAgY29uc3RydWN0b3IgKHNlZWQ/IDogU2VlZCwgcmVzdWx0cz86IG51bWJlcltdKSB7XHJcbiAgICBzdXBlcihzZWVkKTtcclxuICAgIGlmIChyZXN1bHRzKSB7XHJcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgcmVzdWx0cyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0cztcclxuICB9XHJcblxyXG4gIHNldCByZXN1bHRzIChyZXN1bHRzKSB7XHJcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcHJvdmlkZSBzb21lIGZha2UgcmVzdWx0cy4nKTtcclxuICAgIH1cclxuICAgIGZvciAoY29uc3QgciBvZiByZXN1bHRzKSB7XHJcbiAgICAgIGlmIChyIDwgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVzdWx0cyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLCBnb3QgJyR7cn0nYCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHIgPj0gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVzdWx0cyBtdXN0IGJlIGxlc3MgdGhhbiAxLCBnb3QgJyR7cn0nYCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX3Jlc3VsdHMgPSByZXN1bHRzO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV2ZW5TcHJlYWQgKG4gOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHAgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKG4gLSAxKTsgaSsrKSB7XHJcbiAgICAgIHAucHVzaChpIC8gKG4gLSAxKSk7XHJcbiAgICB9XHJcbiAgICBwLnB1c2goMSAtIE51bWJlci5FUFNJTE9OKTtcclxuICAgIHJldHVybiBwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEV2ZW5TcHJlYWQgKG4gOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZXZlblNwcmVhZChuKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhbWVBcyAob3RoZXIgOiBSbmcpIDogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLnNvcnQoKS5qb2luKCcsJykgPT09IG90aGVyLnJlc3VsdHMuc29ydCgpLmpvaW4oJywnKSAmJlxyXG4gICAgdGhpcy5jb3VudGVyID09PSBvdGhlci5jb3VudGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0ICgpIHtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfcmFuZG9tICgpIDogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3VsdHNbdGhpcy5jb3VudGVyKysgJSB0aGlzLnJlc3VsdHMubGVuZ3RoXTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XHJcbmltcG9ydCB7IFVsdHJhTG9vdCwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uIH0gZnJvbSAnLi91bHRyYWxvb3QnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZVBvb2wsIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIH0gZnJvbSAnLi90YWJsZS9wb29sJztcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uLCBDb25kaXRpb25EZWZpbml0aW9uIH0gZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHQnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHRzIGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHRzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBSTkcsIFJuZ0ludGVyZmFjZSwgQ2hhbmN5IH0gZnJvbSAnLi9ybmcnO1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCB1c2VkIHdoZW4gY3JlYXRpbmcgYSBsb290IHRhYmxlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRGVmaW5pdGlvbiA9IHtcclxuICBuYW1lID86IHN0cmluZyxcclxuICBpZCA/OiBzdHJpbmcsXHJcbiAgZm4gPzogc3RyaW5nLFxyXG4gIHJuZyA/OiBSbmdJbnRlcmZhY2UsXHJcbiAgcG9vbHMgPzogQXJyYXk8TG9vdFRhYmxlUG9vbD4sXHJcbiAgdWwgPzogVWx0cmFMb290LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUgPSAoe1xyXG4gIHJuZyxcclxuICBsb290ZWQsXHJcbiAgbG9vdGVyLFxyXG4gIGNvbnRleHQsXHJcbiAgcmVzdWx0LFxyXG4gIGFyZ3NcclxufToge1xyXG4gIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gIGxvb3RlZDogYW55LFxyXG4gIGxvb3RlcjogYW55LFxyXG4gIGNvbnRleHQ6IGFueSxcclxuICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxyXG59KSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlQ29uZGl0aW9uU2lnbmF0dXJlID0gKHtcclxuICBybmcsXHJcbiAgbG9vdGVkLFxyXG4gIGxvb3RlcixcclxuICBjb250ZXh0LFxyXG4gIHJlc3VsdCxcclxuICBhcmdzXHJcbn06IHtcclxuICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICBsb290ZWQ6IGFueSxcclxuICBsb290ZXI6IGFueSxcclxuICBjb250ZXh0OiBhbnksXHJcbiAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgYXJnczogUmVjb3JkPHN0cmluZywgYW55PixcclxufSkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUm9sbEludGVyZmFjZSB7XHJcbiAgbG9vdGVyPzogYW55LFxyXG4gIGNvbnRleHQ/OiBhbnksXHJcbiAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gIHJuZz86IFJuZ0ludGVyZmFjZSxcclxuICBuPzogQ2hhbmN5LFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUG9vbFJvbGxJbnRlcmZhY2Uge1xyXG4gIHBvb2w6IExvb3RUYWJsZVBvb2wsXHJcbiAgbG9vdGVyPzogYW55LFxyXG4gIGNvbnRleHQ/OiBhbnksXHJcbiAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gIHJuZz86IFJuZ0ludGVyZmFjZSxcclxuICBuPzogQ2hhbmN5LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGUge1xyXG4gIG5hbWUgPzogc3RyaW5nO1xyXG4gIGlkID86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRmlsZW5hbWUgdGhhdCBzaG91bGQgYmUgdXNlZCB0byByZXByZXNlbnQgdGhpcyB0YWJsZVxyXG4gICAqIHdoZW4gaXQgaXMgc2F2ZWQgYXMgSlNPTi4gVGhpcyBzaG91bGQgaW5jbHVkZSByZWxhdGl2ZVxyXG4gICAqIHBhdGgvZm9sZGVyIG5hbWVzXHJcbiAgICovXHJcbiAgZm4gPzogc3RyaW5nO1xyXG5cclxuICB1bCA/OiBVbHRyYUxvb3Q7XHJcbiAgcm5nOiBSbmdJbnRlcmZhY2U7XHJcbiAgcG9vbHMgPzogQXJyYXk8TG9vdFRhYmxlUG9vbD4gPSBbXTtcclxuICBmdW5jdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlPiA9IHt9O1xyXG4gIGNvbmRpdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZT4gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwYXJlbnQncyBmdW5jdGlvbnMgc2hvdWxkIGJlIGF2YWlsYWJsZSB0byBhbiBFbnRyeSB0YWJsZSB3aGVuIHJvbGxpbmcuXHJcbiAgICogRm9yIHRoaXMgY2FzZSwgd2UgaGF2ZSB0byBcImJvcnJvd1wiIHRoZSBwYXJlbnQgdGFibGUgdG8gYWxsb3cgZnVuY3Rpb25zL1xyXG4gICAqIGNvbmRpdGlvbnMgdG8gYmUgdXNlZCBmcm9tIHRoZXJlIGlmIG5lZWRlZC5cclxuICAgKlxyXG4gICAqIFRoaXMgaXMgYSBzZXQsIHNvIHdlIGRvbid0IGVuZCB1cCB3aXRoIHRoZSBzYW1lIHRhYmxlIGluIHRoZXJlIG11bHRpcGxlIHRpbWVzLlxyXG4gICAqL1xyXG4gIGJvcnJvd2VkOiBTZXQ8TG9vdFRhYmxlPiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGxvb3QgdGFibGUgZGVmaW5pdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yICh7IG5hbWUsIHJuZywgaWQsIHBvb2xzID0gW10sIGZuLCB1bCB9IDogTG9vdFRhYmxlRGVmaW5pdGlvbiA9IHt9KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5wb29scyA9IHBvb2xzO1xyXG4gICAgdGhpcy5mbiA9IGZuO1xyXG4gICAgdGhpcy51bCA9IHVsO1xyXG4gICAgdGhpcy5ybmcgPSBybmcgPz8gKHVsID8gdWwuZ2V0Um5nKCkgOiBuZXcgUk5HKCkpO1xyXG4gICAgdGhpcy5pZCA9IGlkID8/IHRoaXMucm5nLnVuaXFzdHIoNik7XHJcbiAgfVxyXG5cclxuICAvLyBSZWdpc3RlciBhIGZ1bmN0aW9uIGZvciB1c2UgaW4gbG9vdCBwb29sc1xyXG4gIHJlZ2lzdGVyRnVuY3Rpb24gKG5hbWU6IHN0cmluZywgZm46IExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlKSB7XHJcbiAgICB0aGlzLmZ1bmN0aW9uc1tuYW1lXSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVnaXN0ZXIgYSBjb25kaXRpb24gZnVuY3Rpb24gZm9yIHVzZSBpbiBsb290IHBvb2xzXHJcbiAgcmVnaXN0ZXJDb25kaXRpb24gKG5hbWU6IHN0cmluZywgZm46IExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5jb25kaXRpb25zW25hbWVdID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RyaW5nIHRvIGJlIHVzZWQgYXMgYSBmaWxlbmFtZSBmb3IgdGhpcyB0YWJsZS5cclxuICAgKi9cclxuICBnZXQgZmlsZW5hbWUgKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuZm4gPz8gdGhpcy5pZCA/PyB0aGlzLm5hbWUgPz8gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldCBmaWxlbmFtZSAoZm4pIHtcclxuICAgIHRoaXMuZm4gPSBmbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVsdHJhbG9vdCBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIGdldCB1bHRyYWxvb3QgKCkgOiBVbHRyYUxvb3QgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMudWw7XHJcbiAgfVxyXG5cclxuICBzZXQgdWx0cmFsb290ICh1bCkge1xyXG4gICAgdGhpcy51bCA9IHVsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBib3Jyb3cgKHRhYmxlOiBMb290VGFibGUpIHtcclxuICAgIHRoaXMuYm9ycm93ZWQuYWRkKHRhYmxlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdW5ib3Jyb3cgKHRhYmxlOiBMb290VGFibGUpIHtcclxuICAgIHRoaXMuYm9ycm93ZWQuZGVsZXRlKHRhYmxlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9vbHMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9vbHM7XHJcbiAgfVxyXG5cclxuICBzZXRSbmcgKHJuZyA6IFJuZ0ludGVyZmFjZSkge1xyXG4gICAgdGhpcy5ybmcgPSBybmc7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByb2xsQmFzaWNzICh7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgbiA9IDFcclxuICB9IDogT21pdDxUYWJsZVJvbGxJbnRlcmZhY2UsICdyZXN1bHQnPikgOiBbUm5nSW50ZXJmYWNlLCBudW1iZXJdIHtcclxuICAgIGNvbnN0IHJuZ1RvVXNlID0gcm5nID8/IHRoaXMucm5nO1xyXG4gICAgY29uc3Qgcm9sbHMgPSBybmdUb1VzZS5jaGFuY3kobik7XHJcbiAgICBsb2cuZ2MoYFRhYmxlOiAke3RoaXMuZGVzY3JpcHRpb259IHwgUm9sbGluZyB0YWJsZSAke3JvbGxzfSB0aW1lcyAoZnJvbSBjaGFuY3koJHtKU09OLnN0cmluZ2lmeShuKX0pKWAsIHsgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgcmV0dXJuIFtybmdUb1VzZSwgcm9sbHNdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbCBmb3IgbG9vdCBvbiB0aGlzIHRhYmxlXHJcbiAgICpcclxuICAgKiBUaGUgbG9vdGVyIHdpbGwgZ2VuZXJhbGx5IGJlIHRoZSBwbGF5ZXJcclxuICAgKiBUaGUgY29udGV4dCB3aWxsIGVpdGhlciBiZSBhIGNvbnRhaW5lciBvciBhICdtb25zdGVyJywgYnV0IG1pZ2h0IGJlIHNvbWV0aGluZyBlbHNlICh3aGVyZSB0aGUgbG9vdCBpcyBjb21pbmcgZnJvbSlcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb2xsRGVmaW5pdGlvblxyXG4gICAqL1xyXG4gIHJvbGxTeW5jICh7XHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVSb2xsSW50ZXJmYWNlID0ge30pIDogTG9vdFRhYmxlRW50cnlSZXN1bHRzIHtcclxuICAgIGNvbnN0IFtybmdUb1VzZSwgcm9sbHNdID0gdGhpcy5yb2xsQmFzaWNzKHsgcm5nLCBuLCBsb290ZXIsIGNvbnRleHQgfSk7XHJcbiAgICBmb3IgKGNvbnN0IHBvb2wgb2YgdGhpcy5wb29scykge1xyXG4gICAgICB0aGlzLnJvbGxQb29sU3luYyh7XHJcbiAgICAgICAgbjogcm9sbHMsXHJcbiAgICAgICAgcG9vbCxcclxuICAgICAgICBybmc6IHJuZ1RvVXNlLFxyXG4gICAgICAgIGxvb3RlcixcclxuICAgICAgICBjb250ZXh0LFxyXG4gICAgICAgIHJlc3VsdFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGwgZm9yIGxvb3Qgb24gdGhpcyB0YWJsZVxyXG4gICAqXHJcbiAgICogVGhlIGxvb3RlciB3aWxsIGdlbmVyYWxseSBiZSB0aGUgcGxheWVyXHJcbiAgICogVGhlIGNvbnRleHQgd2lsbCBlaXRoZXIgYmUgYSBjb250YWluZXIgb3IgYSAnbW9uc3RlcicsIGJ1dCBtaWdodCBiZSBzb21ldGhpbmcgZWxzZSAod2hlcmUgdGhlIGxvb3QgaXMgY29taW5nIGZyb20pXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICBhc3luYyByb2xsICh7XHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVSb2xsSW50ZXJmYWNlID0ge30pIDogUHJvbWlzZTxMb290VGFibGVFbnRyeVJlc3VsdHM+IHtcclxuICAgIGNvbnN0IFtybmdUb1VzZSwgcm9sbHNdID0gdGhpcy5yb2xsQmFzaWNzKHsgcm5nLCBuLCBsb290ZXIsIGNvbnRleHQgfSk7XHJcbiAgICBsZXQgaSA9IDE7XHJcbiAgICBmb3IgKGNvbnN0IHBvb2wgb2YgdGhpcy5wb29scykge1xyXG4gICAgICBhd2FpdCB0aGlzLnJvbGxQb29sKHtcclxuICAgICAgICBuOiByb2xscyxcclxuICAgICAgICBwb29sLFxyXG4gICAgICAgIHJuZzogcm5nVG9Vc2UsXHJcbiAgICAgICAgbG9vdGVyLFxyXG4gICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgcmVzdWx0XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9nLmdlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbCBmb3IgbG9vdCBvbiBhIHBvb2xcclxuICAgKlxyXG4gICAqIFRoZSBsb290ZXIgd2lsbCBnZW5lcmFsbHkgYmUgdGhlIHBsYXllclxyXG4gICAqIFRoZSBjb250ZXh0IHdpbGwgZWl0aGVyIGJlIGEgY29udGFpbmVyIG9yIGEgJ21vbnN0ZXInLCBidXQgbWlnaHQgYmUgc29tZXRoaW5nIGVsc2UgKHdoZXJlIHRoZSBsb290IGlzIGNvbWluZyBmcm9tKVxyXG4gICAqIEBwYXJhbSByb2xsRGVmaW5pdGlvblxyXG4gICAqL1xyXG4gIHJvbGxQb29sU3luYyAoe1xyXG4gICAgcG9vbCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCksXHJcbiAgICBybmcsXHJcbiAgICBuID0gMVxyXG4gIH0gOiBUYWJsZVBvb2xSb2xsSW50ZXJmYWNlKSA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyB7XHJcbiAgICBjb25zdCBybmdUb1VzZSA9IHJuZyA/PyB0aGlzLnJuZztcclxuICAgIGNvbnN0IHJvbGxzID0gcm5nVG9Vc2UuY2hhbmN5KG4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb2xsczsgaSsrKSB7XHJcbiAgICAgIHBvb2wucm9sbFN5bmMoeyBybmcsIHRhYmxlOiB0aGlzLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsIGZvciBsb290IG9uIGEgcG9vbFxyXG4gICAqXHJcbiAgICogVGhlIGxvb3RlciB3aWxsIGdlbmVyYWxseSBiZSB0aGUgcGxheWVyXHJcbiAgICogVGhlIGNvbnRleHQgd2lsbCBlaXRoZXIgYmUgYSBjb250YWluZXIgb3IgYSAnbW9uc3RlcicsIGJ1dCBtaWdodCBiZSBzb21ldGhpbmcgZWxzZSAod2hlcmUgdGhlIGxvb3QgaXMgY29taW5nIGZyb20pXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICBhc3luYyByb2xsUG9vbCAoe1xyXG4gICAgcG9vbCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCksXHJcbiAgICBybmcsXHJcbiAgICBuID0gMVxyXG4gIH0gOiBUYWJsZVBvb2xSb2xsSW50ZXJmYWNlKSA6IFByb21pc2U8TG9vdFRhYmxlRW50cnlSZXN1bHRzPiB7XHJcbiAgICBjb25zdCBybmdUb1VzZSA9IHJuZyA/PyB0aGlzLnJuZztcclxuICAgIGNvbnN0IHJvbGxzID0gcm5nVG9Vc2UuY2hhbmN5KG4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb2xsczsgaSsrKSB7XHJcbiAgICAgIGF3YWl0IHBvb2wucm9sbCh7IHJuZywgdGFibGU6IHRoaXMsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGhhc0Z1bmN0aW9uIChmbiA6IEZ1bmN0aW9uRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGFzU2VsZiA9ICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZm4uZnVuY3Rpb25dICE9PSAndW5kZWZpbmVkJyk7XHJcbiAgICByZXR1cm4gaGFzU2VsZiB8fCBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyB8fCBjdXIuaGFzRnVuY3Rpb24oZm4pLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBoYXNDb25kaXRpb24gKGNvbmQgOiBDb25kaXRpb25EZWZpbml0aW9uKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBoYXNTZWxmID0gKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZC5mdW5jdGlvbl0gIT09ICd1bmRlZmluZWQnKTtcclxuICAgIHJldHVybiBoYXNTZWxmIHx8IEFycmF5LmZyb20odGhpcy5ib3Jyb3dlZCkucmVkdWNlKChhY2MsIGN1cikgPT4gYWNjIHx8IGN1ci5oYXNDb25kaXRpb24oY29uZCksIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVBvb2wgKGRlZjogTG9vdFRhYmxlUG9vbERlZmluaXRpb24gfCBMb290VGFibGVQb29sRWFzeURlZmluaXRpb24pOiBMb290VGFibGVQb29sIHtcclxuICAgIGNvbnN0IHBvb2wgPSBuZXcgTG9vdFRhYmxlUG9vbChkZWYpO1xyXG4gICAgdGhpcy5wb29scy5wdXNoKHBvb2wpO1xyXG4gICAgcmV0dXJuIHBvb2w7XHJcbiAgfVxyXG5cclxuICBhZGRQb29sIChkZWY6IExvb3RUYWJsZVBvb2wgfCBMb290VGFibGVQb29sRWFzeURlZmluaXRpb24gfCBMb290VGFibGVQb29sRGVmaW5pdGlvbikgOiB0aGlzIHtcclxuICAgIGlmICgoZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlUG9vbCkpIHtcclxuICAgICAgdGhpcy5wb29scy5wdXNoKGRlZik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNyZWF0ZVBvb2woZGVmKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG90ZW50aWFsRHJvcHMgKCkge1xyXG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mIHRoaXMucG9vbHMpIHtcclxuICAgICAgbGV0IHRvdGFsV2VpZ2h0ID0gMDtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBwb29sLmdldEVudHJpZXMoKSkge1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgICAgdG90YWxXZWlnaHQgKz0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdG90YWxXZWlnaHQgKz0gKGVudHJ5LndlaWdodCA/PyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgcm9sbHNNYXggPSBSTkcuY2hhbmN5TWF4KHBvb2wucm9sbHMpO1xyXG4gICAgICBjb25zdCByb2xsc01pbiA9IFJORy5jaGFuY3lNaW4ocG9vbC5yb2xscyk7XHJcbiAgICAgIGNvbnN0IG51bGxzTWluID0gUk5HLmNoYW5jeU1pbihwb29sLm51bGxzKTtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBwb29sLmdldEVudHJpZXMoKSkge1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fCBlbnRyeS5pc1RhYmxlKCkpIHtcclxuICAgICAgICAgIGxldCB0YWJsZTtcclxuICAgICAgICAgIGxldCB3ZWlnaHQ7XHJcbiAgICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgICAgd2VpZ2h0ID0gMTtcclxuICAgICAgICAgICAgdGFibGUgPSBlbnRyeTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNUYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIHdlaWdodCA9IGVudHJ5LndlaWdodCA/PyAxO1xyXG4gICAgICAgICAgICB0YWJsZSA9IGVudHJ5LmdldEl0ZW0oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIG1lcmdlIHRoZSByZXN1bHRzLi4uXHJcbiAgICAgICAgICBjb25zdCBwZCA9IHRhYmxlLmdldFBvdGVudGlhbERyb3BzKCk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHN1YkRyb3Agb2YgcGQpIHtcclxuICAgICAgICAgICAgZW50cmllcy5wdXNoKHtcclxuICAgICAgICAgICAgICBlbnRyeTogc3ViRHJvcC5lbnRyeSxcclxuICAgICAgICAgICAgICB3ZWlnaHQ6IHN1YkRyb3Aud2VpZ2h0IC8gd2VpZ2h0LFxyXG4gICAgICAgICAgICAgIG1pbjogbnVsbHNNaW4gPiAwID8gMCA6IChyb2xsc01pbiAqIHN1YkRyb3AubWluKSxcclxuICAgICAgICAgICAgICBtYXg6IHJvbGxzTWF4ICogc3ViRHJvcC5tYXgsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbnRyaWVzLnB1c2goe1xyXG4gICAgICAgICAgICBlbnRyeSxcclxuICAgICAgICAgICAgd2VpZ2h0OiBlbnRyeS53ZWlnaHQgLyB0b3RhbFdlaWdodCxcclxuICAgICAgICAgICAgbWluOiBudWxsc01pbiA+IDAgPyAwIDogKHJvbGxzTWluICogUk5HLmNoYW5jeU1pbihlbnRyeS5xdHkpKSxcclxuICAgICAgICAgICAgbWF4OiByb2xsc01heCAqIFJORy5jaGFuY3lNYXgoZW50cnkucXR5KSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJpZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZnVuY3Rpb25EZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBhc3luYyBhcHBseUZ1bmN0aW9uIChmdW5jdGlvbkRlZmluaXRpb246IEZ1bmN0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBmb3IgKGNvbnN0IHN1YnRhYmxlIG9mIEFycmF5LmZyb20odGhpcy5ib3Jyb3dlZCkpIHtcclxuICAgICAgICBpZiAoc3VidGFibGUuaGFzRnVuY3Rpb24oZnVuY3Rpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHN1YnRhYmxlLmFwcGx5RnVuY3Rpb24oZnVuY3Rpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZXJyID0gYEZ1bmN0aW9uICR7ZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9ufSBoYXMgbm90IGJlZW4gZGVmaW5lZC4gRGlkIHlvdSBmb3JnZXQgdG8gcmVnaXN0ZXIgdGhlIGZ1bmN0aW9uIHdpdGggdGhpcyBsb290IHRhYmxlPyB0YWJsZS5yZWdpc3RlckZ1bmN0aW9uKG5hbWUsIGZ1bmN0aW9uKS5gO1xyXG4gICAgICBpZiAodGhpcy51bHRyYWxvb3QpIHtcclxuICAgICAgICBpZiAodGhpcy51bHRyYWxvb3QuaGFzRnVuY3Rpb24oZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudWx0cmFsb290LmFwcGx5RnVuY3Rpb24oZnVuY3Rpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290LnRocm93T25NaXNzaW5nRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBmdW5jdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbmRpdGlvbkRlZmluaXRpb25cclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIGFzeW5jIGFwcGx5Q29uZGl0aW9uIChjb25kaXRpb25EZWZpbml0aW9uOiBDb25kaXRpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0NvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHN1YnRhYmxlLmFwcGx5Q29uZGl0aW9uKGNvbmRpdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBlcnIgPSBgQ29uZGl0aW9uICR7Y29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gdGFibGUucmVnaXN0ZXJDb25kaXRpb24obmFtZSwgY29uZGl0aW9uX2Z1bmN0aW9uKS5gO1xyXG4gICAgICBpZiAodGhpcy51bHRyYWxvb3QpIHtcclxuICAgICAgICBpZiAodGhpcy51bHRyYWxvb3QuaGFzQ29uZGl0aW9uKGNvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy51bHRyYWxvb3QuYXBwbHlDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jb25kaXRpb25zW2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBjb25kaXRpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBmdW5jdGlvbkRlZmluaXRpb25cclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIGFwcGx5RnVuY3Rpb25TeW5jIChmdW5jdGlvbkRlZmluaXRpb246IEZ1bmN0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IHZvaWQge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBmb3IgKGNvbnN0IHN1YnRhYmxlIG9mIEFycmF5LmZyb20odGhpcy5ib3Jyb3dlZCkpIHtcclxuICAgICAgICBpZiAoc3VidGFibGUuaGFzRnVuY3Rpb24oZnVuY3Rpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHN1YnRhYmxlLmFwcGx5RnVuY3Rpb25TeW5jKGZ1bmN0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVyciA9IGBGdW5jdGlvbiAke2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gdGFibGUucmVnaXN0ZXJGdW5jdGlvbihuYW1lLCBmdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnVsdHJhbG9vdC5hcHBseUZ1bmN0aW9uU3luYyhmdW5jdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51bHRyYWxvb3QudGhyb3dPbk1pc3NpbmdGdW5jdGlvbnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb25zW2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGZ1bmN0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gY29uZGl0aW9uRGVmaW5pdGlvblxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgYXBwbHlDb25kaXRpb25TeW5jIChjb25kaXRpb25EZWZpbml0aW9uOiBDb25kaXRpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KTogYm9vbGVhbiB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0NvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHN1YnRhYmxlLmFwcGx5Q29uZGl0aW9uU3luYyhjb25kaXRpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZXJyID0gYENvbmRpdGlvbiAke2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IHRhYmxlLnJlZ2lzdGVyQ29uZGl0aW9uKG5hbWUsIGNvbmRpdGlvbl9mdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0NvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMudWx0cmFsb290LmFwcGx5Q29uZGl0aW9uU3luYyhjb25kaXRpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290LnRocm93T25NaXNzaW5nQ29uZGl0aW9ucykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGNvbmRpdGlvbkNhbGxSZXN1bHQgPSB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGNvbmRpdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgaWYgKGNvbmRpdGlvbkNhbGxSZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJldHVybiBwcm9taXNlIGZyb20gc3luYyBjb25kaXRpb24gY2FsbCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbmRpdGlvbkNhbGxSZXN1bHQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlIH0gZnJvbSAnLi8uLi90YWJsZSc7XHJcblxyXG5leHBvcnQgdHlwZSBMb290VGFibGVFbnRyaWVzID0gUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPjtcclxuXHJcbi8qKlxyXG4gKiBFeGFtcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgbG9vdCB0YWJsZSBtYW5hZ2VyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFRhYmxlTWFuYWdlciB7XHJcbiAgcHVibGljIHRhYmxlczogTG9vdFRhYmxlRW50cmllcyA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvciAodGFibGVzIDogTG9vdFRhYmxlRW50cmllcyA9IHt9KSB7XHJcbiAgICB0aGlzLmFkZFRhYmxlcyh0YWJsZXMpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFibGVzICh0YWJsZXMgOiBMb290VGFibGVFbnRyaWVzIHwgQXJyYXk8TG9vdFRhYmxlPikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFibGVzKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IHRhYmxlIG9mIHRhYmxlcykge1xyXG4gICAgICAgIHRoaXMuYWRkVGFibGUodGFibGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHRhYmxlXSBvZiBPYmplY3QuZW50cmllcyh0YWJsZXMpKSB7XHJcbiAgICAgICAgdGhpcy5hZGRUYWJsZShrZXksIHRhYmxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRUYWJsZSAobmFtZSA6IExvb3RUYWJsZSB8IHN0cmluZywgdGFibGU/OiBMb290VGFibGUgfCBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHRhYmxlICE9PSAndW5kZWZpbmVkJyAmJiB0YWJsZSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICB0aGlzLnRhYmxlc1tuYW1lXSA9IHRhYmxlO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFibGUgPT09ICdzdHJpbmcnICYmIG5hbWUgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgdGhpcy50YWJsZXNbdGFibGVdID0gbmFtZTtcclxuICAgIH0gZWxzZSBpZiAobmFtZSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICB0aGlzLnRhYmxlc1tuYW1lLmlkXSA9IG5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGFkZGluZyB0YWJsZSAtIG5vIGxvb3QgdGFibGUgZ2l2ZW4/Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldFRhYmxlIChuYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy50YWJsZXNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFibGUgbm90IHlldCByZWdpc3RlcmVkLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudGFibGVzW25hbWVdO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgbG9nIGZyb20gJy4vLi4vbG9nJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVFbnRyeSwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBDb25kaXRpb25EZWZpbml0aW9uLCBGdW5jdGlvbkRlZmluaXRpb24gfSBmcm9tICcuL3Bvb2wvZW50cnknO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdHMgZnJvbSAnLi9wb29sL2VudHJ5L3Jlc3VsdHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSB9IGZyb20gJy4vLi4vdGFibGUnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFJORywgUm5nSW50ZXJmYWNlLCBDaGFuY3kgfSBmcm9tICcuLy4uL3JuZyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPixcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIHJvbGxzPzogQ2hhbmN5LFxyXG4gIG51bGxzPzogQ2hhbmN5LFxyXG4gIGVudHJpZXM/OiBBcnJheTxMb290VGFibGVFbnRyeSB8IExvb3RUYWJsZSB8IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbj4sXHJcbiAgdGVtcGxhdGU/OiBQYXJ0aWFsPExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbj5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFBvb2wge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIGNvbmRpdGlvbnM6IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+ID0gW107XHJcbiAgZnVuY3Rpb25zOiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+ID0gW107XHJcbiAgcm9sbHM6IENoYW5jeSA9IDE7XHJcbiAgbnVsbHM6IENoYW5jeSA9IDA7XHJcbiAgZW50cmllczogQXJyYXk8TG9vdFRhYmxlRW50cnkgfCBMb290VGFibGU+ID0gW107XHJcbiAgdGVtcGxhdGU6IFBhcnRpYWw8TG9vdFRhYmxlRW50cnlEZWZpbml0aW9uPiA9IHt9O1xyXG5cclxuICBzdGF0aWMgTlVMTEtFWSA9ICdfX05VTExfX2ZkMmE5OWQyLTI2YzAtNDQ1NC1hMjg0LTM0NTc4Yjk0ZTBmNic7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIHBvb2wgZGVmaW5pdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yICh7XHJcbiAgICBuYW1lLFxyXG4gICAgaWQsXHJcbiAgICBjb25kaXRpb25zID0gW10sXHJcbiAgICBmdW5jdGlvbnMgPSBbXSxcclxuICAgIHJvbGxzID0gMSxcclxuICAgIG51bGxzID0gMCxcclxuICAgIGVudHJpZXMgPSBbXSxcclxuICAgIHRlbXBsYXRlLFxyXG4gIH0gOiBMb290VGFibGVQb29sRGVmaW5pdGlvbiA9IHt9KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucyA/PyBbXTtcclxuICAgIHRoaXMuZnVuY3Rpb25zID0gZnVuY3Rpb25zID8/IFtdO1xyXG4gICAgdGhpcy5yb2xscyA9IHJvbGxzO1xyXG4gICAgdGhpcy5udWxscyA9IG51bGxzO1xyXG4gICAgdGhpcy5pZCA9IGlkID8/IChuZXcgUk5HKCkpLnVuaXFzdHIoNik7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBpZiAoZW50cmllcykge1xyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcclxuICAgICAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbnRyeSAoZGVmOiBMb290VGFibGVFbnRyeURlZmluaXRpb24pIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gbmV3IExvb3RUYWJsZUVudHJ5KHsgLi4uKHRoaXMudGVtcGxhdGUgPz8ge30pLCAuLi5kZWYgfSk7XHJcbiAgICB0aGlzLmVudHJpZXMucHVzaChlbnRyeSk7XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfVxyXG5cclxuICBhZGRFbnRyeSAoZW50cnk6IExvb3RUYWJsZUVudHJ5IHwgTG9vdFRhYmxlIHwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBkZWY/OiBPbWl0PExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiwgJ2lkJz4pIDogdGhpcyB7XHJcbiAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgZW50cnkgPSBuZXcgTG9vdFRhYmxlRW50cnkoe1xyXG4gICAgICAgIC4uLih0aGlzLnRlbXBsYXRlID8/IHt9KSxcclxuICAgICAgICAuLi4oZGVmID8/IHt9KSxcclxuICAgICAgICAuLi57XHJcbiAgICAgICAgICBpZDogZW50cnkuaWQsXHJcbiAgICAgICAgICBpdGVtOiBlbnRyeSxcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgdGhpcy5lbnRyaWVzLnB1c2goZW50cnkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVFbnRyeShlbnRyeSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldEVudHJpZXMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW50cmllcztcclxuICB9XHJcblxyXG4gIHJvbGxQcmVhbWJsZSAoeyBybmcgfSA6IHsgcm5nOiBSbmdJbnRlcmZhY2UgfSkgOiBbbnVtYmVyLCBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+XSB7XHJcbiAgICBjb25zdCBudW1Sb2xscyA9IHJuZy5jaGFuY3lJbnQodGhpcy5yb2xscyk7XHJcblxyXG4gICAgbG9nLmdjKGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIHBvb2wgJHtudW1Sb2xsc30gdGltZXMgKGZyb20gY2hhbmN5KCR7SlNPTi5zdHJpbmdpZnkodGhpcy5yb2xscyl9KSlgKTtcclxuXHJcbiAgICAvLyBXZSBzdG9yZSBhIGxpc3Qgb2Yga2V5L3ZhbHVlIGNob2ljZXMgd2l0aCB0aGVpciB3ZWlnaHRzIGluIGFuIGFycmF5XHJcbiAgICBjb25zdCBjaG9pY2VzIDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG5cclxuICAgIC8vIEEgc3BlY2lhbCBOVUxMIGtleSB0byB0cmFjayBudWxsIHJlc3VsdHNcclxuICAgIGlmIChybmcuY2hhbmN5KHRoaXMubnVsbHMpID4gMCkge1xyXG4gICAgICBjaG9pY2VzW0xvb3RQb29sLk5VTExLRVldID0gcm5nLmNoYW5jeSh0aGlzLm51bGxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXAgdGhlIHdlaWdodHMgdG8gcG9zaXRpb25zIGluIGVudHJpZXMuXHJcbiAgICB0aGlzLmVudHJpZXMuZm9yRWFjaCgoYSwgaSkgPT4ge1xyXG4gICAgICBpZiAoYSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgIGNob2ljZXNbaV0gPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZXNbaV0gPSBybmcuY2hhbmN5KGEud2VpZ2h0ID8/IDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbbnVtUm9sbHMsIGNob2ljZXNdO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcm9sbCAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBjb25zdCBbbnVtUm9sbHMsIGNob2ljZXNdID0gdGhpcy5yb2xsUHJlYW1ibGUoeyBybmcgfSk7XHJcbiAgICBjb25zdCBvdmVyYWxsSW50ZXJtZWRpYXRlID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUm9sbHM7IGkrKykge1xyXG4gICAgICAvLyBUaGlzIGlzIG91ciBjaG9pY2UgZnJvbSB0aGUgY2hvaWNlcyB0YWJsZVxyXG4gICAgICBjb25zdCBjaG9pY2UgPSBybmcud2VpZ2h0ZWRDaG9pY2UoY2hvaWNlcyk7XHJcblxyXG4gICAgICAvLyBUaGVuLCB1bmxlc3MgaXQgaXMgdGhlIG51bGwga2V5LCB3ZSBleHRyYWN0IGl0IVxyXG4gICAgICBpZiAoY2hvaWNlICE9PSBMb290UG9vbC5OVUxMS0VZKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbY2hvaWNlXTtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIC8vIElmIHRoZSBlbnRyeSBpcyBhIGxvb3QgdGFibGUsIHZvaWxhIC0gd2UgY2FuIHJvbGwgaXQgZGlyZWN0bHlcclxuICAgICAgICAgIG92ZXJhbGxJbnRlcm1lZGlhdGUubWVyZ2UoYXdhaXQgZW50cnkucm9sbCh7IGxvb3RlciwgY29udGV4dCwgcm5nIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgY2FuIHJvbGwgdGhlIGVudHJ5IGl0c2VsZlxyXG4gICAgICAgICAgbG9nLmcoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgTG9vdCBUYWJsZSBFbnRyeWApO1xyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShhd2FpdCBlbnRyeS5yb2xsKHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0IH0pKTtcclxuICAgICAgICAgIGxvZy5nZSgpO1xyXG4gICAgICAgICAgaWYgKGVudHJ5LnVuaXF1ZSkge1xyXG4gICAgICAgICAgICBjaG9pY2VzW2Nob2ljZV0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgR290IG51bGwgcmVzdWx0YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVuIHdlIHByb2Nlc3MgYWxsIHRoZSByZXN1bHRzXHJcbiAgICBhd2FpdCB0aGlzLnByb2Nlc3NFbnRyeVJlc3VsdHMob3ZlcmFsbEludGVybWVkaWF0ZSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHJvbGxTeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGNvbnN0IFtudW1Sb2xscywgY2hvaWNlc10gPSB0aGlzLnJvbGxQcmVhbWJsZSh7IHJuZyB9KTtcclxuICAgIGNvbnN0IG92ZXJhbGxJbnRlcm1lZGlhdGUgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb2xsczsgaSsrKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgb3VyIGNob2ljZSBmcm9tIHRoZSBjaG9pY2VzIHRhYmxlXHJcbiAgICAgIGNvbnN0IGNob2ljZSA9IHJuZy53ZWlnaHRlZENob2ljZShjaG9pY2VzKTtcclxuXHJcbiAgICAgIC8vIFRoZW4sIHVubGVzcyBpdCBpcyB0aGUgbnVsbCBrZXksIHdlIGV4dHJhY3QgaXQhXHJcbiAgICAgIGlmIChjaG9pY2UgIT09IExvb3RQb29sLk5VTExLRVkpIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tjaG9pY2VdO1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgICAgLy8gSWYgdGhlIGVudHJ5IGlzIGEgbG9vdCB0YWJsZSwgdm9pbGEgLSB3ZSBjYW4gcm9sbCBpdCBkaXJlY3RseVxyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShlbnRyeS5yb2xsU3luYyh7IGxvb3RlciwgY29udGV4dCwgcm5nIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgY2FuIHJvbGwgdGhlIGVudHJ5IGl0c2VsZlxyXG4gICAgICAgICAgbG9nLmcoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgTG9vdCBUYWJsZSBFbnRyeWApO1xyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShlbnRyeS5yb2xsU3luYyh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCB9KSk7XHJcbiAgICAgICAgICBsb2cuZ2UoKTtcclxuICAgICAgICAgIGlmIChlbnRyeS51bmlxdWUpIHtcclxuICAgICAgICAgICAgY2hvaWNlc1tjaG9pY2VdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEdvdCBudWxsIHJlc3VsdGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlbiB3ZSBwcm9jZXNzIGFsbCB0aGUgcmVzdWx0c1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyhvdmVyYWxsSW50ZXJtZWRpYXRlLCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgbG9nLmdlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcHJvY2Vzc0VudHJ5UmVzdWx0cyAoZW50cnlSZXN1bHRzIDogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gICAge1xyXG4gICAgICBybmcsXHJcbiAgICAgIHRhYmxlLFxyXG4gICAgICBsb290ZXIsXHJcbiAgICAgIGNvbnRleHQsXHJcbiAgICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gICAgfSA6IHtcclxuICAgICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICAgIGxvb3RlcjogYW55LFxyXG4gICAgICBjb250ZXh0OiBhbnksXHJcbiAgICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgICB9KSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGVudHJ5UmVzdWx0IG9mIGVudHJ5UmVzdWx0cykge1xyXG4gICAgICByZXN1bHRzLnB1c2godGhpcy5wcm9jZXNzRW50cnlSZXN1bHQoZW50cnlSZXN1bHQsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMgKGVudHJ5UmVzdWx0cyA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICAgIHtcclxuICAgICAgcm5nLFxyXG4gICAgICB0YWJsZSxcclxuICAgICAgbG9vdGVyLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICAgIH0gOiB7XHJcbiAgICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgICBsb290ZXI6IGFueSxcclxuICAgICAgY29udGV4dDogYW55LFxyXG4gICAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gICAgfSkge1xyXG4gICAgZm9yIChjb25zdCBlbnRyeVJlc3VsdCBvZiBlbnRyeVJlc3VsdHMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRTeW5jKGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIGFzeW5jIHByb2Nlc3NFbnRyeVJlc3VsdCAobG9vdGVkIDogTG9vdFRhYmxlRW50cnlSZXN1bHQsIHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLmZ1bmN0aW9ucykge1xyXG4gICAgICBhd2FpdCB0YWJsZS5hcHBseUZ1bmN0aW9uKGZuLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25SZXN1bHQgPSBhd2FpdCB0YWJsZS5hcHBseUNvbmRpdGlvbihjb25kLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFRlc3RpbmcgZnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgcmVzdWx0ZWQgaW4gJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb25SZXN1bHQpfWApO1xyXG4gICAgICBhZGQgPSBhZGQgJiYgY29uZGl0aW9uUmVzdWx0O1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBGdW5jdGlvbiBcIiR7Y29uZC5mdW5jdGlvbn1cIiBzdG9wcGVkIHRoaXMgZnJvbSBiZWluZyBhZGRlZGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobG9vdGVkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3RlZC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4ubG9vdGVkLCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdFN5bmMgKGxvb3RlZCA6IExvb3RUYWJsZUVudHJ5UmVzdWx0LCB7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgdGFibGUuYXBwbHlGdW5jdGlvblN5bmMoZm4sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGFkZCA9IHRydWU7XHJcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2YgdGhpcy5jb25kaXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvblJlc3VsdCA9IHRhYmxlLmFwcGx5Q29uZGl0aW9uU3luYyhjb25kLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFRlc3RpbmcgZnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgcmVzdWx0ZWQgaW4gJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb25SZXN1bHQpfWApO1xyXG4gICAgICBhZGQgPSBhZGQgJiYgY29uZGl0aW9uUmVzdWx0O1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBGdW5jdGlvbiBcIiR7Y29uZC5mdW5jdGlvbn1cIiBzdG9wcGVkIHRoaXMgZnJvbSBiZWluZyBhZGRlZGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobG9vdGVkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3RlZC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4ubG9vdGVkLCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvZyBmcm9tICcuLy4uLy4uL2xvZyc7XHJcbmltcG9ydCBMb290VGFibGUgZnJvbSAnLi8uLi8uLi90YWJsZSc7XHJcbmltcG9ydCB7IFJuZ0ludGVyZmFjZSwgQ2hhbmN5IH0gZnJvbSAnLi8uLi8uLi9ybmcnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi9lbnRyeS9yZXN1bHQnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHRzIGZyb20gJy4vZW50cnkvcmVzdWx0cyc7XHJcblxyXG5leHBvcnQgdHlwZSBMb290VGFibGVFbnRyeURlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IG51bWJlciB8IHN0cmluZyxcclxuICBzdGFja2FibGU/OiBib29sZWFuLFxyXG4gIHVuaXF1ZT86IGJvb2xlYW4sXHJcbiAgd2VpZ2h0PzogbnVtYmVyLFxyXG4gIGl0ZW0/OiBhbnksXHJcbiAgcXR5PzogQ2hhbmN5LFxyXG4gIGZ1bmN0aW9ucz86IEFycmF5PEZ1bmN0aW9uRGVmaW5pdGlvbj4sXHJcbiAgY29uZGl0aW9ucz86IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZ1bmN0aW9uRGVmaW5pdGlvbiB7XHJcbiAgZnVuY3Rpb246IHN0cmluZyxcclxuICBhcmd1bWVudHM/OiBBcnJheTxhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PlxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uRGVmaW5pdGlvbiB7XHJcbiAgZnVuY3Rpb246IHN0cmluZyxcclxuICBhcmd1bWVudHM/OiBBcnJheTxhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGVFbnRyeSB7XHJcbiAgaWQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgc3RhY2thYmxlPzogYm9vbGVhbiA9IHRydWU7XHJcbiAgdW5pcXVlPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgd2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgcXR5PzogQ2hhbmN5ID0gMTtcclxuICBmdW5jdGlvbnM6IEFycmF5PEZ1bmN0aW9uRGVmaW5pdGlvbj47XHJcbiAgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIGVudHJ5IGRlZmluaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoe1xyXG4gICAgaWQsXHJcbiAgICBzdGFja2FibGUgPSB0cnVlLFxyXG4gICAgdW5pcXVlID0gZmFsc2UsXHJcbiAgICBuYW1lLFxyXG4gICAgd2VpZ2h0ID0gMSxcclxuICAgIGl0ZW0sXHJcbiAgICBmdW5jdGlvbnMgPSBbXSxcclxuICAgIGNvbmRpdGlvbnMgPSBbXSxcclxuICAgIHF0eSA9IDEsXHJcbiAgfSA6IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiA9IHt9KSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zdGFja2FibGUgPSBzdGFja2FibGU7XHJcbiAgICB0aGlzLnVuaXF1ZSA9IHVuaXF1ZTtcclxuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xyXG4gICAgdGhpcy5pdGVtID0gaXRlbTtcclxuICAgIHRoaXMucXR5ID0gcXR5O1xyXG4gICAgdGhpcy5mdW5jdGlvbnMgPSBmdW5jdGlvbnMgPz8gW107XHJcbiAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zID8/IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtICgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW0gPz8gdGhpcy5pZDtcclxuICB9XHJcblxyXG4gIGRlZXBDbG9uZU9iamVjdCAob2I6IG9iamVjdCkge1xyXG4gICAgLy8gU2ltcGxlc3Qgd2F5IHRvIGRlZXAgY2xvbmUgYSBzaW1wbGUgb2JqZWN0LlxyXG4gICAgLy8gQW55dGhpbmcgbW9yZSBjb21wbGV4IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgYSBcImNsb25lXCIgZnVuY3Rpb24uXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYikpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmVJdGVtICgpIHtcclxuICAgIGlmICh0aGlzLml0ZW0gPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuaXRlbSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLml0ZW0uY2xvbmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLmNsb25lKHRoaXMuaXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhlcmUgd2UgaGF2ZSB0byBkbyBhIGRlZXAgY2xvbmUsIGJlY2F1c2UgaWYgd2Ugb25seSBkb1xyXG4gICAgICAvLyBhIHNoYWxsb3cgY2xvbmUsIGFueSBuZXN0ZWQgcHJvcGVydGllcyB3aWxsIGJlIHBlcnNpc3RlZCBhY3Jvc3NcclxuICAgICAgLy8gcm9sbHMsIHdoaWNoIGlzIHByb2JhYmx5IG5vdCB3aGF0IHdlIHdhbnQuXHJcbiAgICAgIHJldHVybiB0aGlzLmRlZXBDbG9uZU9iamVjdCh0aGlzLml0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVGFibGUgKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbSgpIGluc3RhbmNlb2YgTG9vdFRhYmxlO1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0RGVmaW5pdGlvbiAocm5nOiBSbmdJbnRlcmZhY2UpIHtcclxuICAgIGNvbnN0IGRlZiA9IHtcclxuICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgIHN0YWNrYWJsZTogdGhpcy5zdGFja2FibGUsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgaXRlbTogdGhpcy5jbG9uZUl0ZW0oKSxcclxuICAgICAgcXR5OiBybmcuY2hhbmN5KHRoaXMucXR5KVxyXG4gICAgfTtcclxuICAgIHJldHVybiBkZWY7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUJhc2VSZXN1bHRzIChybmc6IFJuZ0ludGVyZmFjZSkge1xyXG4gICAgY29uc3QgZGVmID0gdGhpcy5yZXN1bHREZWZpbml0aW9uKHJuZyk7XHJcbiAgICByZXR1cm4gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cyhbbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KGRlZildKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGwgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICB9IDoge1xyXG4gICAgcm5nPzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkgOiBQcm9taXNlPExvb3RUYWJsZUVudHJ5UmVzdWx0cz4ge1xyXG4gICAgaWYgKHRoaXMuaXNUYWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJvbGxUYWJsZSh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucm9sbEl0ZW0oeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGxJdGVtICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgSXRlbSBmb3IgJHt0aGlzLmlkfWAsIHsgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzKHRoaXMuZ2VuZXJhdGVCYXNlUmVzdWx0cyhybmcpLCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGxUYWJsZSAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICAvLyBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIFRhYmxlIGZvciAke3RoaXMuaWR9YCwge2xvb3RlciwgY29udGV4dH0pO1xyXG4gICAgY29uc3QgZW50cnlSZXN1bHRzID0gYXdhaXQgdGhpcy5nZXRJdGVtKCkuYm9ycm93KHRhYmxlKS5yb2xsKHsgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQ6IFtdLCBybmcsIG46IHRoaXMucXR5IH0pO1xyXG4gICAgdGhpcy5nZXRJdGVtKCkudW5ib3Jyb3codGFibGUpO1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzKGVudHJ5UmVzdWx0cywgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwcm9jZXNzRW50cnlSZXN1bHRzIChlbnRyeVJlc3VsdHMgOiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgICB7XHJcbiAgICAgIHJuZyxcclxuICAgICAgdGFibGUsXHJcbiAgICAgIGxvb3RlcixcclxuICAgICAgY29udGV4dCxcclxuICAgICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgICB9IDoge1xyXG4gICAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgICAgbG9vdGVyOiBhbnksXHJcbiAgICAgIGNvbnRleHQ6IGFueSxcclxuICAgICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICAgIH0pIHtcclxuICAgIGZvciAoY29uc3QgZW50cnlSZXN1bHQgb2YgZW50cnlSZXN1bHRzKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0KGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIGFzeW5jIHByb2Nlc3NFbnRyeVJlc3VsdCAoZW50cnlSZXN1bHQgOiBMb290VGFibGVFbnRyeVJlc3VsdCwge1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgIGF3YWl0IHRhYmxlLmFwcGx5RnVuY3Rpb24oZm4sIHsgcm5nLCBsb290ZWQ6IGVudHJ5UmVzdWx0LCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBhZGQgPSBhZGQgJiYgYXdhaXQgdGFibGUuYXBwbHlDb25kaXRpb24oY29uZCwgeyBybmcsIGxvb3RlZDogZW50cnlSZXN1bHQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEZ1bmN0aW9uIFwiJHtjb25kLmZ1bmN0aW9ufVwiIHN0b3BwZWQgdGhpcyBmcm9tIGJlaW5nIGFkZGVkYCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEFmdGVyIGFwcGx5aW5nIGNvbmRpdGlvbnMsIGFkZCB3YXMgJHtKU09OLnN0cmluZ2lmeShhZGQpfWApO1xyXG4gICAgaWYgKGFkZCAmJiBlbnRyeVJlc3VsdC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChlbnRyeVJlc3VsdC5zdGFja2FibGUpIHtcclxuICAgICAgICByZXN1bHQucHVzaChlbnRyeVJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeVJlc3VsdC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4uZW50cnlSZXN1bHQsIC4uLnsgcXR5OiAxIH0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9sbFN5bmMgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICB9IDoge1xyXG4gICAgcm5nPzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkgOiBMb290VGFibGVFbnRyeVJlc3VsdHMge1xyXG4gICAgaWYgKHRoaXMuaXNUYWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvbGxUYWJsZVN5bmMoeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvbGxJdGVtU3luYyh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9sbEl0ZW1TeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgSXRlbSBmb3IgJHt0aGlzLmlkfWAsIHsgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyh0aGlzLmdlbmVyYXRlQmFzZVJlc3VsdHMocm5nKSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICByb2xsVGFibGVTeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIC8vIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgVGFibGUgZm9yICR7dGhpcy5pZH1gLCB7bG9vdGVyLCBjb250ZXh0fSk7XHJcbiAgICBjb25zdCBlbnRyeVJlc3VsdHMgPSB0aGlzLmdldEl0ZW0oKS5ib3Jyb3codGFibGUpLnJvbGxTeW5jKHsgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQ6IFtdLCBybmcsIG46IHRoaXMucXR5IH0pO1xyXG4gICAgdGhpcy5nZXRJdGVtKCkudW5ib3Jyb3codGFibGUpO1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyhlbnRyeVJlc3VsdHMsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMgKGVudHJ5UmVzdWx0cyA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICAgIHtcclxuICAgICAgcm5nLFxyXG4gICAgICB0YWJsZSxcclxuICAgICAgbG9vdGVyLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICAgIH0gOiB7XHJcbiAgICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgICBsb290ZXI6IGFueSxcclxuICAgICAgY29udGV4dDogYW55LFxyXG4gICAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gICAgfSkge1xyXG4gICAgZm9yIChjb25zdCBlbnRyeVJlc3VsdCBvZiBlbnRyeVJlc3VsdHMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRTeW5jKGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdFN5bmMgKGxvb3RlZCA6IExvb3RUYWJsZUVudHJ5UmVzdWx0LCB7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgdGFibGUuYXBwbHlGdW5jdGlvblN5bmMoZm4sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGFkZCA9IHRydWU7XHJcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2YgdGhpcy5jb25kaXRpb25zKSB7XHJcbiAgICAgIGFkZCA9IGFkZCAmJiB0YWJsZS5hcHBseUNvbmRpdGlvblN5bmMoY29uZCwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgIGlmICghYWRkKSB7XHJcbiAgICAgICAgbG9nLmQoYEVudHJ5OiAke3RoaXMuZGVzY3JpcHRpb259IHwgRnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgc3RvcHBlZCB0aGlzIGZyb20gYmVpbmcgYWRkZWRgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9nLmQoYEVudHJ5OiAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlIHx8IGxvb3RlZC5xdHkgPT09IDEpIHtcclxuICAgICAgICByZXN1bHQucHVzaChsb290ZWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vdGVkLnF0eTsgaSsrKSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHQoeyAuLi5sb290ZWQsIC4uLnsgcXR5OiAxIH0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGVFbnRyeVJlc3VsdCB7XHJcbiAgaWQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgc3RhY2thYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgcXR5PzogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yICh7XHJcbiAgICBpZCxcclxuICAgIHN0YWNrYWJsZSA9IHRydWUsXHJcbiAgICBuYW1lLFxyXG4gICAgaXRlbSxcclxuICAgIHF0eVxyXG4gIH06IHtcclxuICAgIGlkPzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgc3RhY2thYmxlPzogYm9vbGVhbixcclxuICAgIG5hbWU/OiBzdHJpbmcsXHJcbiAgICBpdGVtPzogYW55LFxyXG4gICAgcXR5PzogbnVtYmVyLFxyXG4gIH0gPSB7fSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnF0eSA9IHF0eTtcclxuICAgIHRoaXMuc3RhY2thYmxlID0gc3RhY2thYmxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBnZXRRdHkgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucXR5O1xyXG4gIH1cclxuXHJcbiAgc2V0UXR5IChuOiBudW1iZXIpIHtcclxuICAgIHRoaXMucXR5ID0gbjtcclxuICB9XHJcblxyXG4gIGFkZFF0eSAobjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnF0eSA9IHRoaXMucXR5ICsgbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0IGZyb20gJy4vcmVzdWx0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3RUYWJsZUVudHJ5UmVzdWx0cyBleHRlbmRzIEFycmF5PExvb3RUYWJsZUVudHJ5UmVzdWx0PiB7XHJcbiAgY29uc3RydWN0b3IgKGRvY3VtZW50cz86IEFycmF5PExvb3RUYWJsZUVudHJ5UmVzdWx0PiB8IG51bWJlcikge1xyXG4gICAgaWYgKGRvY3VtZW50cyBpbnN0YW5jZW9mIEFycmF5KSBzdXBlciguLi5kb2N1bWVudHMpO1xyXG4gICAgZWxzZSBpZiAoZG9jdW1lbnRzKSBzdXBlcihkb2N1bWVudHMpO1xyXG4gICAgZWxzZSBzdXBlcigpO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIE9iamVjdC5jcmVhdGUoTG9vdFRhYmxlRW50cnlSZXN1bHRzLnByb3RvdHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2UgKG90aGVyOiBMb290VGFibGVFbnRyeVJlc3VsdHMpIHtcclxuICAgIGZvciAoY29uc3QgZW50cnkgb2Ygb3RoZXIpIHtcclxuICAgICAgdGhpcy5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VkIChvdGhlcjogTG9vdFRhYmxlRW50cnlSZXN1bHRzKSB7XHJcbiAgICByZXR1cm4gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cyhbLi4udGhpcywgLi4ub3RoZXJdKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBlbnRyeVNpZ25hdHVyZSAoZW50cnk6IExvb3RUYWJsZUVudHJ5UmVzdWx0KSB7XHJcbiAgICBjb25zdCBlbnRyeVdpdGhvdXRRdHk6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKGVudHJ5KSkge1xyXG4gICAgICBpZiAoayAhPT0gJ2lkJykge1xyXG4gICAgICAgIGVudHJ5V2l0aG91dFF0eVtrXSA9IHY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbnRyeSk7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZWQgKCkge1xyXG4gICAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVFbnRyeVJlc3VsdD4gPSB7fTtcclxuICAgIGNvbnN0IG90aGVyOiBMb290VGFibGVFbnRyeVJlc3VsdFtdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IG9iIG9mIHRoaXMpIHtcclxuICAgICAgaWYgKG9iLnN0YWNrYWJsZSkge1xyXG4gICAgICAgIGNvbnN0IHNpZyA9IHRoaXMuZW50cnlTaWduYXR1cmUob2IpO1xyXG4gICAgICAgIGlmICghbWFwW3NpZ10pIHtcclxuICAgICAgICAgIG1hcFtzaWddID0gb2I7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hcFtzaWddLmFkZFF0eShvYi5xdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvdGhlci5wdXNoKG9iKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoWy4uLm90aGVyLCAuLi5PYmplY3QudmFsdWVzKG1hcCldKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlLCBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZSwgTG9vdFRhYmxlQ29uZGl0aW9uU2lnbmF0dXJlLCBMb290VGFibGVEZWZpbml0aW9uIH0gZnJvbSAnLi90YWJsZSc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlUG9vbCwgTG9vdFRhYmxlUG9vbERlZmluaXRpb24gfSBmcm9tICcuL3RhYmxlL3Bvb2wnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZUVudHJ5LCBMb290VGFibGVFbnRyeURlZmluaXRpb24sIEZ1bmN0aW9uRGVmaW5pdGlvbiwgQ29uZGl0aW9uRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeSc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdCBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0cyBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0cyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgUk5HLCBTZWVkLCBSbmdJbnRlcmZhY2UsIFJuZ0NvbnN0cnVjdG9yLCBDaGFuY3kgfSBmcm9tICcuL3JuZyc7XHJcbmltcG9ydCB7IHZlcnNpb24gYXMgQ1VSUkVOVF9WRVJTSU9OIH0gZnJvbSAnLi8uLi9wYWNrYWdlLmpzb24nO1xyXG5pbXBvcnQgKiBhcyBkZWZhdWx0RnVuY3Rpb25zIGZyb20gJy4vZGVmYXVsdC9mdW5jdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBkZWZhdWx0Q29uZGl0aW9ucyBmcm9tICcuL2RlZmF1bHQvY29uZGl0aW9ucyc7XHJcblxyXG4vLyBTZXQgZnMgcHJvcGVybHkgaWYgd2UgYXJlIGluIG5vZGUgZW52aXJvbm1lbnRcclxubGV0IGZzIDogYW55O1xyXG5sZXQgaXNOb2RlID0gZmFsc2U7XHJcbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcpIHtcclxuICBpZiAodHlwZW9mIHByb2Nlc3MudmVyc2lvbnMgPT09ICdvYmplY3QnKSB7XHJcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZnMgPSByZXF1aXJlKCdmcycpO1xyXG4gICAgICBpc05vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgVkVSU0lPTl9LRVkgPSAnX192ZXJzaW9uX18nO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgZm9yIGVhc2lseSBjcmVhdGluZyBsb290IHRhYmxlcyB1c2luZyBhIGpzb24gbGlrZVxyXG4gKiBvYmplY3QgaW5zdGVhZCBvZiBhbGwgdGhlIHNwZWNpZmljIGxvb3QgdGFibGUgb2JqZWN0c1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRWFzeURlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBybmc/OiBzdHJpbmcgfCBudW1iZXIgfCBSbmdJbnRlcmZhY2UsXHJcbiAgcG9vbHM/OiBBcnJheTxMb290VGFibGVQb29sIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uPixcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGZvciBlYXNpbHkgY3JlYXRpbmcgbG9vdCB0YWJsZSBwb29scyB1c2luZyBhIGpzb24gbGlrZVxyXG4gKiBvYmplY3QgaW5zdGVhZCBvZiBhbGwgdGhlIHNwZWNpZmljIGxvb3QgdGFibGUgb2JqZWN0c1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uID0ge1xyXG4gIG5hbWU/OiBzdHJpbmcsXHJcbiAgaWQ/OiBzdHJpbmcsXHJcbiAgY29uZGl0aW9ucz86IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+LFxyXG4gIGZ1bmN0aW9ucz86IEFycmF5PEZ1bmN0aW9uRGVmaW5pdGlvbj4sXHJcbiAgdGVtcGxhdGU/OiBMb290VGFibGVFbnRyeURlZmluaXRpb24sXHJcbiAgcm9sbHM/OiBDaGFuY3ksXHJcbiAgbnVsbHM/OiBDaGFuY3ksXHJcbiAgZW50cmllcz86IEFycmF5PExvb3RUYWJsZUVudHJ5IHwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uIHwgTG9vdFRhYmxlPixcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRlZmluZXMgaG93IGEgTG9vdFRhYmxlIGlzIHN0b3JlZCBpbiBKU09OIGZpbGVzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBMb290VGFibGVKc29uRGVmaW5pdGlvbiA9IHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGZuPzogc3RyaW5nLFxyXG4gIHJuZz86IHN0cmluZyB8IG51bWJlciB8IFJuZ0ludGVyZmFjZSxcclxuICBwb29scz86IEFycmF5PExvb3RUYWJsZVBvb2xKc29uRGVmaW5pdGlvbj4sXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBkZWZpbmVzIGhvdyBhIExvb3RUYWJsZVBvb2wgaXMgc3RvcmVkIGluIEpTT04gZmlsZXNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZVBvb2xKc29uRGVmaW5pdGlvbiA9IHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPixcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIHJvbGxzPzogQ2hhbmN5LFxyXG4gIG51bGxzPzogQ2hhbmN5LFxyXG4gIGVudHJpZXM6IEFycmF5PExvb3RUYWJsZUVudHJ5SnNvbkRlZmluaXRpb24+LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGVmaW5lcyBob3cgYSBMb290VGFibGVFbnRyeSBpcyBzdG9yZWQgaW4gSlNPTiBmaWxlc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRW50cnlKc29uRGVmaW5pdGlvbiA9IHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgdHlwZT86IHN0cmluZyxcclxuICBzdGFja2FibGU/OiBib29sZWFuLFxyXG4gIHdlaWdodD86IG51bWJlcixcclxuICBpdGVtPzogYW55LFxyXG4gIHF0eT86IENoYW5jeSxcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPlxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3Vyc2l2ZVRhYmxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkVGFibGVzIHtcclxuICBbVkVSU0lPTl9LRVldOiBzdHJpbmcsXHJcbiAgdGFibGVzOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVKc29uRGVmaW5pdGlvbj5cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTG9hZFNhdmVBcmdzID0geyBkZWZhdWx0RXh0ZW5zaW9uPzogc3RyaW5nLCBwYXRoPzogc3RyaW5nIH07XHJcblxyXG4vKipcclxuICogQHRvZG8gZGV0ZWN0IHJlY3Vyc2l2ZWx5IHJlcXVpcmVkIHRhYmxlc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbXBvcnQge1VsdHJhTG9vdH0gZnJvbSBcInVsdHJhbG9vdFwiO1xyXG4gKlxyXG4gKiBjb25zdCB1bHRyYWxvb3REZWZhdWx0Um5nID0gbmV3IFVsdHJhTG9vdCgpOyAgICAgICAgICAgLy8gZGVmYXVsdCBSTkdcclxuICogY29uc3QgdWx0cmFsb290Q3VzdG9tUm5nID0gbmV3IFVsdHJhTG9vdChcIlVMN1I0TDAwN1wiKTsgLy8gc2VlZGluZyB0aGUgYnVpbHQgaW4gUk5HXHJcbiAqIGNvbnN0IHVsdHJhbG9vdEN1c3RvbVJuZyA9IG5ldyBVbHRyYUxvb3Qocm5nU291cmNlKTsgICAvLyB1c2luZyBhIGN1c3RvbSBSTkdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVbHRyYUxvb3Qge1xyXG4gIC8qKlxyXG4gICAqIERlZmF1bHQgUk5HIHNvdXJjZSB3aGVuIG5vbmUgaXMgZ2l2ZW5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZGVmYXVsdFJuZzogUm5nSW50ZXJmYWNlO1xyXG5cclxuICAvKipcclxuICAgKiBSTkcgc291cmNlIGdpdmVuIGJ5IHRoZSBlbmQgdXNlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBybmc/OiBSbmdJbnRlcmZhY2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJORyBDb25zdHJ1Y3RvciBmb3IgbWFraW5nIG5ldyBSTkdzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHJuZ0NvbnN0cnVjdG9yPzogUm5nQ29uc3RydWN0b3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdsb2JhbCBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSBsb290IHRhYmxlIGVudHJpZXMuXHJcbiAgICpcclxuICAgKiBUaGUga2V5cyBpbiB0aGUgb2JqZWN0IGFyZSB0aGUgZnVuY3Rpb24gaWRlbnRpZmllciB1c2VkIGluIHRoZSB0YWJsZSBlbnRyaWVzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGZ1bmN0aW9uczogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmU+ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEdsb2JhbCBjb25kaXRpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgbG9vdCB0YWJsZSBwb29scyBhbmQgZW50cmllcy5cclxuICAgKlxyXG4gICAqIFRoZSBrZXlzIGluIHRoZSBvYmplY3QgYXJlIHRoZSBmdW5jdGlvbiBpZGVudGlmaWVyIHVzZWQgaW4gdGhlIHRhYmxlIGVudHJpZXMvcG9vbHNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY29uZGl0aW9uczogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlQ29uZGl0aW9uU2lnbmF0dXJlPiA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIHRocm93IGVycm9ycyB3aGVuIGZ1bmN0aW9ucyBhcmUgbWlzc2luZywgb3RoZXJ3aXNlIGp1c3QgZG9lcyBjb25zb2xlLmVycm9yXHJcbiAgICovXHJcbiAgcHVibGljIHRocm93T25NaXNzaW5nRnVuY3Rpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byB0aHJvdyBlcnJvcnMgd2hlbiBjb25kaXRpb25zIGFyZSBtaXNzaW5nLCBvdGhlcndpc2UganVzdCBkb2VzIGNvbnNvbGUuZXJyb3JcclxuICAgKi9cclxuICBwdWJsaWMgdGhyb3dPbk1pc3NpbmdDb25kaXRpb25zOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IgKHJuZz86IFNlZWQgfCBSbmdJbnRlcmZhY2UpIHtcclxuICAgIGxvZy5kKCdVbHRyYUxvb3QgaW5pdGlhbGlzaW5nJyk7XHJcbiAgICBpZiAocm5nKSB7XHJcbiAgICAgIHRoaXMucm5nID0gdGhpcy5tYWtlUm5nKHJuZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJEZWZhdWx0cyAoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdEZ1bmN0aW9ucygpO1xyXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHRDb25kaXRpb25zKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckRlZmF1bHRGdW5jdGlvbnMgKCkge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCBmbl0gb2YgT2JqZWN0LmVudHJpZXMoZGVmYXVsdEZ1bmN0aW9ucykpIHtcclxuICAgICAgdGhpcy5yZWdpc3RlckZ1bmN0aW9uKGtleSwgZm4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJEZWZhdWx0Q29uZGl0aW9ucyAoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIGZuXSBvZiBPYmplY3QuZW50cmllcyhkZWZhdWx0Q29uZGl0aW9ucykpIHtcclxuICAgICAgdGhpcy5yZWdpc3RlckNvbmRpdGlvbihrZXksIGZuKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXMgd2UgZG9udCBleHBvc2UgdGhlIGNsYXNzIGFzIGRlZmF1bHQsIGluIGJyb3dzZXIgaXQgd291bGQgYmUgbmljZVxyXG4gICAqIGlmIHRoZXJlIHdhcyBhIHdheSB0byBjcmVhdGUgbmV3IGluc3RhbmNlcy4gVGhpcyBjYW4gYmUgZG9uZSB1c2luZ1xyXG4gICAqIHRoaXMgZnVuY3Rpb24uXHJcbiAgICovXHJcbiAgcHVibGljIGluc3RhbmNlIChybmc/OiBTZWVkIHwgUm5nSW50ZXJmYWNlKTogVWx0cmFMb290IHtcclxuICAgIHJldHVybiBuZXcgVWx0cmFMb290KHJuZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0Um5nIChybmc6IFJuZ0ludGVyZmFjZSk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzUm5nKHJuZykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdybmcgZ2l2ZW4gZG9lcyBub3QgY29uZmlybSB0byBSbmdJbnRlcmZhY2UnKTtcclxuICAgIH1cclxuICAgIHRoaXMucm5nID0gcm5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFJuZyAoKTogUm5nSW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0aGlzLnJuZyA/PyB0aGlzLmdldERlZmF1bHRSbmcoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREZWZhdWx0Um5nICgpOiBSbmdJbnRlcmZhY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJuZyA/PyAodGhpcy5kZWZhdWx0Um5nID0gdGhpcy5tYWtlUm5nKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFJuZ0NvbnN0cnVjdG9yIChybmdDb25zdHJ1Y3RvcjogUm5nQ29uc3RydWN0b3IpOiB2b2lkIHtcclxuICAgIHRoaXMucm5nQ29uc3RydWN0b3IgPSBybmdDb25zdHJ1Y3RvcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSbmdDb25zdHJ1Y3RvciAoKTogUm5nQ29uc3RydWN0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMucm5nQ29uc3RydWN0b3IgPz8gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMucm5nKS5jb25zdHJ1Y3RvcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1JuZyAocm5nPzogYW55KTogcm5nIGlzIFJuZ0ludGVyZmFjZSB7XHJcbiAgICBpZiAodHlwZW9mIHJuZyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBybmcgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5lZWRlZEZ1bmN0aW9ucyA9IFtcclxuICAgICAgJ3ByZWRpY3RhYmxlJyxcclxuICAgICAgJ2hhc2hTdHInLFxyXG4gICAgICAnY29udmVydFN0cmluZ1RvTnVtYmVyJyxcclxuICAgICAgJ2dldFNlZWQnLFxyXG4gICAgICAnc2VlZCcsXHJcbiAgICAgICdwZXJjZW50YWdlJyxcclxuICAgICAgJ3JhbmRvbScsXHJcbiAgICAgICdjaGFuY2UnLFxyXG4gICAgICAnY2hhbmNlVG8nLFxyXG4gICAgICAncmFuZEludCcsXHJcbiAgICAgICd1bmlxaWQnLFxyXG4gICAgICAndW5pcXN0cicsXHJcbiAgICAgICdyYW5kQmV0d2VlbicsXHJcbiAgICAgICdub3JtYWwnLFxyXG4gICAgICAnY2hhbmN5SW50JyxcclxuICAgICAgJ2NoYW5jeScsXHJcbiAgICAgICd3ZWlnaHRlZENob2ljZScsXHJcbiAgICAgICdkaWNlJyxcclxuICAgICAgJ3BhcnNlRGljZVN0cmluZycsXHJcbiAgICAgICdjbGFtcCcsXHJcbiAgICAgICdiaW4nLFxyXG4gICAgICAnc2VyaWFsaXplJyxcclxuICAgIF07XHJcbiAgICBsZXQgaGFzQWxsS2V5cyA9IHRydWU7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuZWVkZWRGdW5jdGlvbnMpIHtcclxuICAgICAgaGFzQWxsS2V5cyA9IGhhc0FsbEtleXMgJiYgKHR5cGVvZiBybmdba2V5XSA9PT0gJ2Z1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzQWxsS2V5cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtYWtlUm5nIChybmc/OiBTZWVkIHwgUm5nSW50ZXJmYWNlKTogUm5nSW50ZXJmYWNlIHtcclxuICAgIGlmICh0aGlzLmlzUm5nKHJuZykpIHtcclxuICAgICAgcmV0dXJuIHJuZztcclxuICAgIH1cclxuICAgIGNvbnN0IFJuZ0NvbnN0cnVjdG9yIDogUm5nQ29uc3RydWN0b3IgPSB0aGlzLnJuZ0NvbnN0cnVjdG9yID8/IFJORztcclxuICAgIHJldHVybiBuZXcgUm5nQ29uc3RydWN0b3Iocm5nKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIGZuOiBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5mdW5jdGlvbnNbbmFtZV0gPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckNvbmRpdGlvbiAobmFtZTogc3RyaW5nLCBmbjogTG9vdFRhYmxlQ29uZGl0aW9uU2lnbmF0dXJlKSB7XHJcbiAgICB0aGlzLmNvbmRpdGlvbnNbbmFtZV0gPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNGdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuZnVuY3Rpb25zW25hbWVdICE9PSAndW5kZWZpbmVkJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNDb25kaXRpb24gKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbbmFtZV0gIT09ICd1bmRlZmluZWQnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5vVGhyb3dPbk1pc3NpbmdGdW5jdGlvbnNPckNvbmRpdGlvbnMgKCkge1xyXG4gICAgdGhpcy50aHJvd09uTWlzc2luZ0Z1bmN0aW9ucyA9IGZhbHNlO1xyXG4gICAgdGhpcy50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMgPSBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRocm93T25NaXNzaW5nRnVuY3Rpb25zT3JDb25kaXRpb25zICgpIHtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdGdW5jdGlvbnMgPSB0cnVlO1xyXG4gICAgdGhpcy50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZnVuY3Rpb25DaGVjayAoZm46IEZ1bmN0aW9uRGVmaW5pdGlvbikge1xyXG4gICAgbG9nLmQoYFVMIHwgQXBwbHlpbmcgZnVuY3Rpb24gJHtmbi5mdW5jdGlvbn1gKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZm4uZnVuY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBlcnIgPSBgRnVuY3Rpb24gJHtmbi5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gVWx0cmFMb290LnJlZ2lzdGVyRnVuY3Rpb24obmFtZSwgZnVuY3Rpb24pLmA7XHJcbiAgICAgIGlmICh0aGlzLnRocm93T25NaXNzaW5nRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbmRpdGlvbkNoZWNrIChjb25kOiBDb25kaXRpb25EZWZpbml0aW9uKSB7XHJcbiAgICBsb2cuZChgVUwgfCBBcHBseWluZyBjb25kaXRpb24gJHtjb25kLmZ1bmN0aW9ufWApO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZC5mdW5jdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGVyciA9IGBDb25kaXRpb24gJHtjb25kLmZ1bmN0aW9ufSBoYXMgbm90IGJlZW4gZGVmaW5lZC4gRGlkIHlvdSBmb3JnZXQgdG8gcmVnaXN0ZXIgdGhlIGZ1bmN0aW9uIHdpdGggdGhpcyBsb290IHRhYmxlPyBVbHRyYUxvb3QucmVnaXN0ZXJDb25kaXRpb24obmFtZSwgY29uZGl0aW9uX2Z1bmN0aW9uKS5gO1xyXG4gICAgICBpZiAodGhpcy50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlGdW5jdGlvblN5bmMgKGZ1bmN0aW9uRGVmaW5pdGlvbjogRnVuY3Rpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBpZiAodGhpcy5mdW5jdGlvbkNoZWNrKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZnVuY3Rpb25zW2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGZ1bmN0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlDb25kaXRpb25TeW5jIChjb25kaXRpb25EZWZpbml0aW9uOiBDb25kaXRpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBpZiAodGhpcy5jb25kaXRpb25DaGVjayhjb25kaXRpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25DYWxsUmVzdWx0ID0gdGhpcy5jb25kaXRpb25zW2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBjb25kaXRpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgICAgaWYgKGNvbmRpdGlvbkNhbGxSZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmV0dXJuIHByb21pc2UgZnJvbSBzeW5jIGNvbmRpdGlvbiBjYWxsJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNvbmRpdGlvbkNhbGxSZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYXBwbHlGdW5jdGlvbiAoZnVuY3Rpb25EZWZpbml0aW9uOiBGdW5jdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGlmICh0aGlzLmZ1bmN0aW9uQ2hlY2soZnVuY3Rpb25EZWZpbml0aW9uKSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogZnVuY3Rpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhcHBseUNvbmRpdGlvbiAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uQ2hlY2soY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogY29uZGl0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBsb290IHRhYmxlLCB3aXRoIHRoaXMgdWx0cmFsb290IGluc3RhbmNlXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqXHJcbiAgICogY29uc3QgdWwgPSBuZXcgVWx0cmFMb290KCdVTDdSNEwwMDcnKTtcclxuICAgKiBjb25zdCB0YWJsZSA9IHVsLmNyZWF0ZVRhYmxlKHtuYW1lOiAnRm9vZCd9KTtcclxuICAgKlxyXG4gICAqIHRhYmxlLmFkZFBvb2woW1xyXG4gICAqICAge1xyXG4gICAqICAgICByb2xsczogMSxcclxuICAgKiAgICAgbmFtZTogJ0Nha2VzJ1xyXG4gICAqICAgICBlbnRyaWVzOiBbXHJcbiAgICogICAgICAge2lkOiAnY2hvY29sYXRlX2Nha2UnfSxcclxuICAgKiAgICAgICB7aWQ6ICdmcnVpdF9jYWtlJ30sXHJcbiAgICogICAgICAge2lkOiAnc3Rhcl9jYWtlJ31cclxuICAgKiAgICAgXVxyXG4gICAqICAgfVxyXG4gICAqIF0pO1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVUYWJsZSAoZGVmOiBMb290VGFibGUgfCBMb290VGFibGVEZWZpbml0aW9uIHwgTG9vdFRhYmxlRWFzeURlZmluaXRpb24pOiBMb290VGFibGUge1xyXG4gICAgaWYgKGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fCB0aGlzLmlzTG9vdFRhYmxlRGVmaW5pdGlvbihkZWYpKSB7XHJcbiAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICBsb2cudnYoJ0NyZWF0aW5nIHRhYmxlIGZyb20gTG9vdFRhYmxlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nLnZ2KCdDcmVhdGluZyB0YWJsZSBmcm9tIExvb3RUYWJsZURlZmluaXRpb24nKTtcclxuICAgICAgfVxyXG4gICAgICBkZWYudWwgPSB0aGlzO1xyXG4gICAgICBpZiAoZGVmLnJuZykge1xyXG4gICAgICAgIGRlZi5ybmcgPSBkZWYucm5nID8/IHRoaXMubWFrZVJuZyhkZWYucm5nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWYucm5nID0gdGhpcy5nZXRSbmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBsdCA9IG5ldyBMb290VGFibGUoZGVmKTtcclxuICAgICAgbHQudWx0cmFsb290ID0gdGhpcztcclxuICAgICAgcmV0dXJuIGx0O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRWFzeUxvb3RUYWJsZURlZmluaXRpb24oZGVmKSkge1xyXG4gICAgICBsb2cudnYoJ0NyZWF0aW5nIHRhYmxlIGZyb20gTG9vdFRhYmxlRWFzeURlZmluaXRpb24nKTtcclxuICAgICAgaWYgKGRlZi5ybmcpIHtcclxuICAgICAgICBkZWYucm5nID0gZGVmLnJuZyA/PyB0aGlzLm1ha2VSbmcoZGVmLnJuZyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVmLnJuZyA9IHRoaXMuZ2V0Um5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbHQgPSBuZXcgTG9vdFRhYmxlKHRoaXMudHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlRGVmaW5pdGlvbihkZWYpKTtcclxuICAgICAgbHQudWx0cmFsb290ID0gdGhpcztcclxuICAgICAgcmV0dXJuIGx0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIGxvb3QgdGFibGUgZnJvbSB0aGVzZSBwYXJhbXMnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGxvb3QgcG9vbCBmb3IgdXNlIGluIGEgbG9vdCB0YWJsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVQb29sIChkZWY6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlUG9vbCB7XHJcbiAgICBpZiAodGhpcy5pc0Vhc3lMb290VGFibGVQb29sRGVmaW5pdGlvbihkZWYpKSB7XHJcbiAgICAgIGxvZy52dignQ3JlYXRpbmcgcG9vbCBmcm9tIExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbicpO1xyXG4gICAgICByZXR1cm4gbmV3IExvb3RUYWJsZVBvb2wodGhpcy50cmFuc2Zvcm1FYXN5VG9Qcm9wZXJMb290VGFibGVQb29sRGVmaW5pdGlvbihkZWYpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvZy52dignQ3JlYXRpbmcgcG9vbCBmcm9tIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uJyk7XHJcbiAgICAgIHJldHVybiBuZXcgTG9vdFRhYmxlUG9vbChkZWYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuIGVudHJ5IGZvciBhIGxvb3QgcG9vbCwgZWl0aGVyIHdpdGggb2JqZWN0IGRlZmluaXRpb24gb3IgZnJvbSBhIGxvb3QgdGFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlRW50cnkgKGRlZjogTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uIHwgTG9vdFRhYmxlKTogTG9vdFRhYmxlRW50cnkge1xyXG4gICAgaWYgKGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICByZXR1cm4gbmV3IExvb3RUYWJsZUVudHJ5KHtcclxuICAgICAgICBpZDogZGVmLmlkLFxyXG4gICAgICAgIG5hbWU6IGRlZi5uYW1lLFxyXG4gICAgICAgIGl0ZW06IGRlZixcclxuICAgICAgICBxdHk6IDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeShkZWYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCBmb3IgVHlwZXNjcmlwdCB0eXBlIGd1YXJkaW5nIGFuZCBwYXJhbWV0ZXIgY2hlY2tpbmdcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgaXNMb290VGFibGVEZWZpbml0aW9uIChkZWY6IGFueSk6IGRlZiBpcyBMb290VGFibGVEZWZpbml0aW9uIHtcclxuICAgIGlmIChcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wgfHxcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVmLnBvb2xzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgcG9vbCBvZiBkZWYucG9vbHMpIHtcclxuICAgICAgICBpZiAoIShwb29sIGluc3RhbmNlb2YgTG9vdFRhYmxlUG9vbCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2YgZGVmID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIFR5cGVzY3JpcHQgdHlwZSBndWFyZGluZyBhbmQgcGFyYW1ldGVyIGNoZWNraW5nXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGlzRWFzeUxvb3RUYWJsZURlZmluaXRpb24gKGRlZjogYW55KTogZGVmIGlzIExvb3RUYWJsZUVhc3lEZWZpbml0aW9uIHtcclxuICAgIGlmIChcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wgfHxcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVmLnBvb2xzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgcG9vbCBvZiBkZWYucG9vbHMpIHtcclxuICAgICAgICBpZiAocG9vbCBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2YgZGVmID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIFR5cGVzY3JpcHQgdHlwZSBndWFyZGluZyBhbmQgcGFyYW1ldGVyIGNoZWNraW5nXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGlzRWFzeUxvb3RUYWJsZVBvb2xEZWZpbml0aW9uIChkZWY6IGFueSk6IGRlZiBpcyBMb290VGFibGVQb29sRWFzeURlZmluaXRpb24ge1xyXG4gICAgaWYgKFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGUgfHxcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlUG9vbCB8fFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGVFbnRyeVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkZWYuZW50cmllcykge1xyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRlZi5lbnRyaWVzKSB7XHJcbiAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2YgZGVmID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB0cmFuc2Zvcm1FYXN5VG9Qcm9wZXJMb290VGFibGVEZWZpbml0aW9uIChkZWY6IExvb3RUYWJsZUVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlRGVmaW5pdGlvbiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvb3RUYWJsZURlZmluaXRpb24gPSB7XHJcbiAgICAgIHJuZzogdGhpcy5tYWtlUm5nKGRlZi5ybmcgPz8gdGhpcy5nZXRSbmcoKSksXHJcbiAgICAgIG5hbWU6IGRlZi5uYW1lLFxyXG4gICAgICBpZDogZGVmLmlkLFxyXG4gICAgICBwb29sczogW10sXHJcbiAgICB9O1xyXG4gICAgaWYgKGRlZi5wb29scykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgZGVmLnBvb2xzKSB7XHJcbiAgICAgICAgcmVzdWx0LnBvb2xzLnB1c2godGhpcy5jcmVhdGVQb29sKHBvb2wpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnVsID0gdGhpcztcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlUG9vbERlZmluaXRpb24gKGRlZjogTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlUG9vbERlZmluaXRpb24ge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb290VGFibGVQb29sRGVmaW5pdGlvbiA9IHtcclxuICAgICAgbmFtZTogZGVmLm5hbWUsXHJcbiAgICAgIGlkOiBkZWYuaWQsXHJcbiAgICAgIHJvbGxzOiBkZWYucm9sbHMsXHJcbiAgICAgIG51bGxzOiBkZWYubnVsbHMsXHJcbiAgICAgIHRlbXBsYXRlOiBkZWYudGVtcGxhdGUsXHJcbiAgICAgIGNvbmRpdGlvbnM6IGRlZi5jb25kaXRpb25zLFxyXG4gICAgICBmdW5jdGlvbnM6IGRlZi5mdW5jdGlvbnMsXHJcbiAgICAgIGVudHJpZXM6IGRlZi5lbnRyaWVzXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXRoSm9pbiAocGFydHM6IHN0cmluZ1tdLCBzZXA6IHN0cmluZyA9ICcvJykgOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oc2VwKS5yZXBsYWNlKG5ldyBSZWdFeHAoc2VwICsgJ3sxLH0nLCAnZycpLCBzZXApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZpbmlzaFdpdGggKHN0cjogc3RyaW5nLCBlbmRpbmc6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgaWYgKHN0ci5lbmRzV2l0aChlbmRpbmcpKSB7XHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyICsgZW5kaW5nO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZpbmlzaFdpdGhFeHRlbnNpb24gKHN0cjogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgaWYgKHN0ci5lbmRzV2l0aChleHRlbnNpb24pKSB7XHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXN0ID0gc3RyLnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICAgIGNvbnN0IHBvcyA9IGxhc3QuaW5jbHVkZXMoJy4nKSA/IGxhc3QubGFzdEluZGV4T2YoJy4nKSA6IGxhc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgZmlsZVJvb3QgPSBzdHIuc3Vic3RyKDAsIChzdHIubGVuZ3RoIC0gbGFzdC5sZW5ndGgpICsgcG9zKTtcclxuICAgIGNvbnN0IG91dHB1dCA9IGAke2ZpbGVSb290fS4ke2V4dGVuc2lvbi5yZXBsYWNlKCcuJywgJycpfWA7XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldEV4dGVuc2lvbiAoc3RyOiBzdHJpbmcpIDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB7XHJcbiAgICBjb25zdCBsYXN0ID0gc3RyLnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICAgIGlmICghbGFzdC5pbmNsdWRlcygnLicpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcG9zID0gbGFzdC5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgcmV0dXJuIGxhc3Quc3Vic3RyKHBvcywgbGFzdC5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VyaWFsaXplcyBhIExvb3RUYWJsZSByZWFkeSBmb3IgY29udmVydGluZyB0byB0ZXh0LCBlLmcuIEpTT05cclxuICAgKlxyXG4gICAqIFJldHVybnMgYSBrZXkgdmFsdWUgb2JqZWN0LCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIGxvb3QgdGFibGUgZmlsZW5hbWVzL2lkc1xyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCB1bHRyYWxvb3Quc2VyaWFsaXplKHRhYmxlKTtcclxuICAgKlxyXG4gICAqIHJlc3VsdCA9IHtcclxuICAgKiAgIGtpdGNoZW5fY3VwYm9hcmQ6IHtcclxuICAgKiAgICAgZm46ICdraXRjaGVuX2N1cGJvYXJkJyxcclxuICAgKiAgICAgcG9vbHM6IFtcclxuICAgKiAgICAgICB7XHJcbiAgICogICAgICAgICBlbnRyaWVzOiBbXHJcbiAgICogICAgICAgICAgIHtcclxuICAgKiAgICAgICAgICAgICB0eXBlOiAndGFibGUnLFxyXG4gICAqICAgICAgICAgICAgIGl0ZW06ICd2ZWdldGFibGVzJ1xyXG4gICAqICAgICAgICAgICB9LFxyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcclxuICAgKiAgICAgICAgICAgICBpdGVtOiAnZnJ1aXQnXHJcbiAgICogICAgICAgICAgIH1cclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH0sXHJcbiAgICogICBmcnVpdF9ib3dsOiB7XHJcbiAgICogICAgIGZuOiAnZnJ1aXRfYm93bCcsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcclxuICAgKiAgICAgICAgICAgICBpdGVtOiAnZnJ1aXQnXHJcbiAgICogICAgICAgICAgIH1cclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH0sXHJcbiAgICogICB2ZWdldGFibGVzOiB7XHJcbiAgICogICAgIGZuOiAndmVnZXRhYmxlcycsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgaWQ6ICdjYXJyb3QnXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICAgIHtcclxuICAgKiAgICAgICAgICAgICBpZDogJ2NhYmJhZ2UnXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICBdXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICBdXHJcbiAgICogICB9LFxyXG4gICAqICAgZnJ1aXQ6IHtcclxuICAgKiAgICAgZm46ICdmcnVpdCcsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgaWQ6ICdhcHBsZSdcclxuICAgKiAgICAgICAgICAgfSxcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIGlkOiAncGVhcidcclxuICAgKiAgICAgICAgICAgfSxcclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH1cclxuICAgKiB9XHJcbiAgICovXHJcbiAgcHVibGljIHNlcmlhbGl6ZSAodGFibGU6IExvb3RUYWJsZSwgeyBpbmNsdWRlUm5nID0gZmFsc2UsIGtleSwgaGFkID0gbmV3IFNldCgpIH06IHsgaW5jbHVkZVJuZz86IGJvb2xlYW4sIGtleT86IHN0cmluZywgaGFkPzogU2V0PGFueT4gfSA9IHt9KTogU2VyaWFsaXplZFRhYmxlcyB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUpzb25EZWZpbml0aW9uPiA9IHt9O1xyXG4gICAgY29uc3QgY2xvbmU6IExvb3RUYWJsZUpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICBuYW1lOiB0YWJsZS5uYW1lLFxyXG4gICAgICBpZDogdGFibGUuaWQsXHJcbiAgICAgIGZuOiB0YWJsZS5mbixcclxuICAgICAgcG9vbHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGtleVRvVXNlID0gdGFibGUuZmlsZW5hbWUgPz8gdGhpcy5nZXRSbmcoKS51bmlxc3RyKDYpO1xyXG4gICAgaGFkLmFkZCh0YWJsZSk7XHJcblxyXG4gICAgaWYgKGluY2x1ZGVSbmcpIHtcclxuICAgICAgY2xvbmUucm5nID0gdGFibGUucm5nPy5zZXJpYWxpemUoKSA/PyBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgcG9vbCBvZiAodGFibGUucG9vbHMgPz8gW10pKSB7XHJcbiAgICAgIGNvbnN0IHBvb2xDbG9uZTogTG9vdFRhYmxlUG9vbEpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICAgIG5hbWU6IHBvb2wubmFtZSxcclxuICAgICAgICBpZDogcG9vbC5pZCxcclxuICAgICAgICByb2xsczogcG9vbC5yb2xscyxcclxuICAgICAgICBudWxsczogcG9vbC5udWxscyxcclxuICAgICAgICBjb25kaXRpb25zOiBwb29sLmNvbmRpdGlvbnMsXHJcbiAgICAgICAgZnVuY3Rpb25zOiBwb29sLmZ1bmN0aW9ucyxcclxuICAgICAgICBlbnRyaWVzOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgKHBvb2wuZW50cmllcyA/PyBbXSkpIHtcclxuICAgICAgICBjb25zdCBlbnRyeUNsb25lOiBMb290VGFibGVFbnRyeUpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcclxuICAgICAgICAgIGlkOiBlbnRyeS5pZCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbSA9IGVudHJ5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLnN0YWNrYWJsZSA9IGVudHJ5LnN0YWNrYWJsZTtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUud2VpZ2h0ID0gZW50cnkud2VpZ2h0O1xyXG4gICAgICAgICAgZW50cnlDbG9uZS5pdGVtID0gZW50cnkuaXRlbTtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUucXR5ID0gZW50cnkucXR5O1xyXG4gICAgICAgICAgZW50cnlDbG9uZS5jb25kaXRpb25zID0gZW50cnkuY29uZGl0aW9ucztcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuZnVuY3Rpb25zID0gZW50cnkuZnVuY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVudHJ5Q2xvbmUuaXRlbSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgICAgY29uc3Qgc3ViS2V5VG9Vc2UgPSBlbnRyeUNsb25lLml0ZW0uZmlsZW5hbWUgPz8gdGhpcy5nZXRSbmcoKS51bmlxc3RyKDYpO1xyXG4gICAgICAgICAgaWYgKGhhZC5oYXMoZW50cnlDbG9uZS5pdGVtKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVjdXJzaXZlVGFibGVFcnJvcignUmVjdXJzaXZlIHJlcXVpcmVtZW50IGRldGVjdGVkIC0gY2Fubm90IHNlcmlhbGl6ZSByZWN1cnNpdmVseSByZXF1aXJlZCB0YWJsZXMuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFtzdWJLZXlUb1VzZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbS5maWxlbmFtZSA9IHN1YktleVRvVXNlO1xyXG4gICAgICAgICAgICBjb25zdCByID0gKHRoaXMuc2VyaWFsaXplKGVudHJ5Q2xvbmUuaXRlbSwgeyBpbmNsdWRlUm5nLCBrZXk6IHN1YktleVRvVXNlLCBoYWQgfSkpO1xyXG4gICAgICAgICAgICByZXN1bHRbc3ViS2V5VG9Vc2VdID0gci50YWJsZXNbc3ViS2V5VG9Vc2VdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZW50cnlDbG9uZS50eXBlID0gJ3RhYmxlJztcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbSA9IHN1YktleVRvVXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb29sQ2xvbmUuZW50cmllcy5wdXNoKGVudHJ5Q2xvbmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGNsb25lLnBvb2xzLnB1c2gocG9vbENsb25lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHRba2V5VG9Vc2VdID0gY2xvbmU7XHJcbiAgICBjb25zdCBmaW5hbCA9IHtcclxuICAgICAgW1ZFUlNJT05fS0VZXTogQ1VSUkVOVF9WRVJTSU9OLFxyXG4gICAgICB0YWJsZXM6IHJlc3VsdFxyXG4gICAgfTtcclxuICAgIHJldHVybiBmaW5hbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgYSBMb290VGFibGUgdG8gSlNPTlxyXG4gICAqIEBwYXJhbSAge0xvb3RUYWJsZX0gICAgICAgdGFibGUgICAgICAgICAgICAgICBUaGUgdGFibGUgdG8gc2VyaWFsaXplXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgIE9wdGlvbnNcclxuICAgKiBAcGFyYW0gIHtib29sZWFufSAgICAgICAgIG9wdGlvbnMuaW5jbHVkZVJuZyAgV2hldGhlciB0byBpbmNsdWRlIHRoZSBSTkcgc2VlZCBpbiB0aGUgc2VyaWFsaXplZCB0YWJsZXNcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgVGhlIHJlc3VsdGluZyBMb290VGFibGUgcmVwcmVzZW50YXRpb24gaW4gYSBKU09OIHN0cmluZ1xyXG4gICAqL1xyXG4gIHRvSnNvbiAodGFibGU6IExvb3RUYWJsZSwgeyBpbmNsdWRlUm5nID0gZmFsc2UgfTogeyBpbmNsdWRlUm5nPzogYm9vbGVhbiB9ID0ge30pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VyaWFsaXplKHRhYmxlLCB7IGluY2x1ZGVSbmcgfSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHRvZG8gSW1wbGVtZW50IHRoaXNcclxuICAgKi9cclxuICBhc3luYyBzYXZlVGFibGUgKHRhYmxlOiBMb290VGFibGUsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBzZXJpYWxpemVkIHRhYmxlcyBmcm9tIGEgZmlsZS5cclxuICAgKlxyXG4gICAqIFRoaXMgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIHVuc2VyaWFsaXppbmcganNvbiBjb250ZW50cyBvZiBhIGZpbGUuXHJcbiAgICogICAgKi9cclxuICBhc3luYyBsb2FkVGFibGVzIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHBhdGgpID8/ICcuanNvbic7XHJcbiAgICBjb25zdCBmdWxsUGF0aCA9IHRoaXMuZmluaXNoV2l0aCh0aGlzLnBhdGhKb2luKFtwYXRoLCBmaWxlbmFtZV0pLCBkZWZhdWx0RXh0ZW5zaW9uKTtcclxuICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgaWYgKGZ1bGxQYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSB8fCBmdWxsUGF0aC5zdGFydHNXaXRoKCdmaWxlOi8vJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVzRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRUYWJsZXNGcm9tRmlsZShmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVzRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgc2VyaWFsaXplZCB0YWJsZXMgZnJvbSBhIGxvY2FsIGZpbGVcclxuICAgKi9cclxuICBhc3luYyBsb2FkVGFibGVzRnJvbUZpbGUgKGZpbGVuYW1lOiBzdHJpbmcsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPj4ge1xyXG4gICAgZGVmYXVsdEV4dGVuc2lvbiA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24ocGF0aCkgPz8gJy5qc29uJztcclxuICAgIGxvZy5kKGBSZWFkaW5nIHRhYmxlcyBmcm9tICR7ZmlsZW5hbWV9YCk7XHJcbiAgICBsZXQgY29udGVudHM7XHJcbiAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbihmaWxlbmFtZSk7XHJcbiAgICBpZiAoZXh0ID09PSAnLmpzJykge1xyXG4gICAgICBjb25zdCBjYiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGAke2ZpbGVuYW1lfWAsICd1dGY4Jyk7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1ldmFsXHJcbiAgICAgIGNvbnRlbnRzID0gZXZhbChjYik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb250ZW50cyA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCAndXRmOCcpXHJcbiAgICAgICAgLnRoZW4oKGQ6c3RyaW5nKSA9PiBKU09OLnBhcnNlKGQpKVxyXG4gICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7ZmlsZW5hbWV9XCIuICR7ZS5tZXNzYWdlfWA7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudW5zZXJpYWxpemUoY29udGVudHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBzZXJpYWxpemVkIHRhYmxlcyBmcm9tIGEgdXJsXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlc0Zyb21VcmwgKHVybDogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHVybCkgPz8gJy5qc29uJztcclxuICAgIGxvZy5kKGBSZWFkaW5nIHRhYmxlcyBmcm9tICR7dXJsfWApO1xyXG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihkYXRhID0+IGRhdGEudGV4dCgpKS50aGVuKHR4dCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgfSBjYXRjaCAoZSA6IGFueSkge1xyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7dXJsfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfSkudGhlbih0YWJsZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy51bnNlcmlhbGl6ZSh0YWJsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkIGEgdGFibGUgZnJvbSBhIGZpbGUuXHJcbiAgICpcclxuICAgKiBUaGUgZmlsZSBjYW4gYmUgbG9jYWwgb3IgYSB1cmwuIElmIHJ1bm5pbmcgaW4gYnJvd3NlciwgaXQncyBhbHdheXMgdHJlYXRlZCBhc1xyXG4gICAqIGEgVVJMLiBXaGVuIHJ1biBpbiBub2RlLCBpdCB3aWxsIG9ubHkgdHJlYXQgaXQgYXMgYSBVUkwgaWYgaXQncyBwcmVmaXhlZCB3aXRoXHJcbiAgICogaHR0cC5cclxuICAgKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gZXhwZWN0cyBhIHNpbmdsZSB0YWJsZSB0byBiZSBsb2NhdGVkIGluIHRoZSBmaWxlLCBhcyB0aGUgYmFzZSBvYmplY3QuXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGNvbnN0IGV4dCA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24oZmlsZW5hbWUpID8/ICcuanNvbic7XHJcbiAgICBjb25zdCBmdWxsUGF0aCA9IHRoaXMuZmluaXNoV2l0aEV4dGVuc2lvbih0aGlzLnBhdGhKb2luKFtwYXRoLCBmaWxlbmFtZV0pLCBleHQpO1xyXG4gICAgbG9nLmQoJ0xvYWQgVGFibGUnLCB7XHJcbiAgICAgIGZpbGVuYW1lV2l0aFBhdGg6IHRoaXMucGF0aEpvaW4oW3BhdGgsIGZpbGVuYW1lXSksXHJcbiAgICAgIGZpbGVuYW1lLFxyXG4gICAgICBkZWZhdWx0RXh0ZW5zaW9uLFxyXG4gICAgICBleHQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGZ1bGxQYXRoXHJcbiAgICB9KTtcclxuICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgaWYgKGZ1bGxQYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSB8fCBmdWxsUGF0aC5zdGFydHNXaXRoKCdmaWxlOi8vJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVGcm9tVXJsKGZ1bGxQYXRoLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbUZpbGUoZmlsZW5hbWUsIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSB0YWJsZSBmcm9tIGEgbG9jYWwgZmlsZVxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRUYWJsZUZyb21GaWxlIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lKSA/PyAnLmpzb24nO1xyXG5cclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lKTtcclxuICAgIGNvbnN0IHBqID0gdGhpcy5wYXRoSm9pbihbcGF0aCwgZmlsZW5hbWVdKTtcclxuICAgIGlmICghZXh0ZW5zaW9uKSB7XHJcbiAgICAgIC8vIElmIHRoZSBmaWxlIGV4aXN0cyB3aXRob3V0IGV4dGVuc2lvbiwgdHJ5IGFuZCByZWFkIGl0IGFzIGpzb25cclxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGopICYmIGZzLnN0YXRTeW5jKHBqKS5pc0ZpbGUoKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUocGosICd1dGY4JylcclxuICAgICAgICAgIC50aGVuKChkOnN0cmluZykgPT4gSlNPTi5wYXJzZShkKSlcclxuICAgICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke2ZpbGVuYW1lfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVUYWJsZShjb250ZW50cywgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUcnkgYW5kIGR5bmFtaWNhbGx5IGZpbmQgdGhlIGZpbGVuYW1lLlxyXG4gICAgICBjb25zdCBleHRlbnNpb25zID0gbmV3IFNldChbXHJcbiAgICAgICAgZGVmYXVsdEV4dGVuc2lvbixcclxuICAgICAgICAnLmpzb24nLFxyXG4gICAgICAgICcuanMnLFxyXG4gICAgICAgICcuY2pzJyxcclxuICAgICAgICAnLm1qcydcclxuICAgICAgXSk7XHJcbiAgICAgIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcclxuICAgICAgICBjb25zdCBmbldpdGhFeHQgPSB0aGlzLmZpbmlzaFdpdGhFeHRlbnNpb24ocGosIGV4dGVuc2lvbik7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZm5XaXRoRXh0KSAmJiBmcy5zdGF0U3luYyhmbldpdGhFeHQpLmlzRmlsZSgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVGcm9tRmlsZSh0aGlzLmZpbmlzaFdpdGhFeHRlbnNpb24oZmlsZW5hbWUsIGV4dGVuc2lvbiksIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGopKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgZmlsZSBcIiR7ZmlsZW5hbWV9XCIgaW4gcGF0aCBcIiR7cGF0aH1cImApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250ZW50cztcclxuICAgIGlmIChcclxuICAgICAgZXh0ZW5zaW9uID09PSAnLmpzJyB8fFxyXG4gICAgICBleHRlbnNpb24gPT09ICcubWpzJyB8fFxyXG4gICAgICBleHRlbnNpb24gPT09ICcuY2pzJ1xyXG4gICAgKSB7XHJcbiAgICAgIC8vIHVuZm9ydHVuYXRlbHksIHR5cGVzY3JpcHQgbWFuZ2xlcyBpbXBvcnQgc3RhdGVtZW50cywgc28gdGhlIG9ubHlcclxuICAgICAgLy8gd2F5IHdlIGNhbiBkbyB0aGlzIGlzIHVzaW5nIGV2YWwuLi5cclxuICAgICAgY29uc3QgY2IgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShgJHtwan1gLCAndXRmOCcpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXZhbFxyXG4gICAgICBjb250ZW50cyA9IGV2YWwoY2IpO1xyXG4gICAgfSBlbHNlIGlmIChleHRlbnNpb24gPT09ICcuanNvbicgfHwgZGVmYXVsdEV4dGVuc2lvbiA9PT0gJycpIHtcclxuICAgICAgY29udGVudHMgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShwaiwgJ3V0ZjgnKVxyXG4gICAgICAgIC50aGVuKChkOnN0cmluZykgPT4gSlNPTi5wYXJzZShkKSlcclxuICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xyXG4gICAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke2ZpbGVuYW1lfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJlc29sdmVUYWJsZShjb250ZW50cywgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSB0YWJsZSBmcm9tIGEgdXJsXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlRnJvbVVybCAodXJsOiBzdHJpbmcsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8TG9vdFRhYmxlIHwgbnVsbD4ge1xyXG4gICAgZGVmYXVsdEV4dGVuc2lvbiA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24odXJsKSA/PyAnLmpzb24nO1xyXG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihkYXRhID0+IGRhdGEudGV4dCgpKS50aGVuKHR4dCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgfSBjYXRjaCAoZSA6IGFueSkge1xyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7dXJsfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfSkudGhlbih0YWJsZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlVGFibGUodGFibGVzLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFR1cm5zIGEgSlNPTiByZXByZXNlbnRhdGlvbiBpbnRvIGEgTG9vdFRhYmxlLCBhbmQgZG9lcyB0aGVcclxuICAgKiBzYW1lIGZvciBhbGwgbmVzdGVkIHRhYmxlcyBpbnNpZGUgcG9vbHMgcmVjdXJzaXZlbHkuXHJcbiAgICovXHJcbiAgYXN5bmMgcmVzb2x2ZVRhYmxlICh0YWJsZTogTG9vdFRhYmxlSnNvbkRlZmluaXRpb24sIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8TG9vdFRhYmxlIHwgbnVsbD4ge1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mICh0YWJsZS5wb29scyA/PyBbXSkpIHtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiAocG9vbC5lbnRyaWVzID8/IFtdKSkge1xyXG4gICAgICAgIGlmIChlbnRyeS50eXBlID09PSAndGFibGUnKSB7XHJcbiAgICAgICAgICBlbnRyeS5pdGVtID0gYXdhaXQgdGhpcy5sb2FkVGFibGUoZW50cnkuaXRlbSwgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgZW50cnkudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgbG9vdFRhYmxlID0gdGhpcy5jcmVhdGVUYWJsZSh0YWJsZSk7XHJcbiAgICByZXR1cm4gbG9vdFRhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zZXJpYWxpemVzIHRhYmxlcyBzZXJpYWxpemVkIHdpdGggdGhlIFwic2VyaWFsaXplXCIgZnVuY3Rpb25cclxuICAgKiBAcGFyYW0gIHtSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVKc29uRGVmaW5pdGlvbj59IHRhYmxlcyBSZWNvcmQgb2YgdGFibGVzIHNlcmlhbGl6ZWQgdXNpbmcgdGhlIFwic2VyaWFsaXplXCIgZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+fSAgICAgICAgICAgICBBIGtleS92YWx1ZSBwYWlyaW5nIG9mIHRhYmxlc1xyXG4gICAqL1xyXG4gIHVuc2VyaWFsaXplICh0YWJsZXM6IFNlcmlhbGl6ZWRUYWJsZXMpOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGU+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPiA9IHt9O1xyXG5cclxuICAgIC8vIFdoZW4gdW5zZXJpYWxpemluZywgd2UgbG9vcCB0aHJvdWdoIG11bHRpcGxlIHRpbWVzIGJlY2F1c2UgdGhlcmUgaXNcclxuICAgIC8vIGluaGVyZXRlbmNlIC0gc28gd2UgbmVlZCB0byB1bnNlcmlhbGl6ZSB0aGluZ3MgaW4gdGhlIHJpZ2h0IG9yZGVyLlxyXG4gICAgLy8gVG8gYXZvaWQgYnVpbGRpbmcgY29tcGxleCBpbmhlcml0YW5jZSBjaGFpbnMsIHdlIGp1c3QgbG9vcCB0aHJvdWdoXHJcbiAgICAvLyB1cCB0byAxMDAgdGltZXMsIHNvIHRoaW5ncyBjYW4gYmUgbmVzdGVkIHVwIHRvIDEwMCB0aW1lcywgcmVzdGFydGluZ1xyXG4gICAgLy8gd2hlbiB3ZSBoaXQgYW4gdW5zZXJpYWxpemVkIG5lc3RlZCByZXF1aXJlbWVudC5cclxuICAgIGxldCBpID0gMTAwO1xyXG5cclxuICAgIC8vIEBUT0RPIERldGVjdCByZWN1cnNpdmUgcmVxdWlyZW1lbnRzIGJldHRlci5cclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sYWJlbHMgKi9cclxuICAgIHdoaWxlIChPYmplY3QudmFsdWVzKHRhYmxlcy50YWJsZXMpLmxlbmd0aCA+IDAgJiYgaS0tID4gMCkge1xyXG4gICAgICBnZXRCYWNrOlxyXG4gICAgICBmb3IgKGNvbnN0IFtpZCwgdGFibGVdIG9mIE9iamVjdC5lbnRyaWVzKHRhYmxlcy50YWJsZXMpKSB7XHJcbiAgICAgICAgY29uc3Qgcm5nID0gdGFibGUucm5nID8/IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRhYmxlLnJuZztcclxuICAgICAgICBsb2cudihgVW5zZXJpYWxpemluZyB0YWJsZSAke2lkfWApO1xyXG4gICAgICAgIGZvciAoY29uc3QgcG9vbCBvZiAodGFibGUucG9vbHMgPz8gW10pKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIChwb29sLmVudHJpZXMgPz8gW10pKSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeS50eXBlID09PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbZW50cnkuaXRlbV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhYmxlcy50YWJsZXNbZW50cnkuaXRlbV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgJHtlbnRyeS5pdGVtfSBub3QgcHJlc2VudCBpbiBzZXJpYWxpemVkIGRhdGFgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFdlIGRvIHRoZSBmb2xsb3dpbmcgdG8gdW5zZXJpYWxpemUgdGhpbmdzIGluIHRoZSBjb3JyZWN0IG9yZGVyLlxyXG4gICAgICAgICAgICAgICAgbG9nLnYoYFdlIGRpZG4ndCBoYXZlICR7ZW50cnkuaXRlbX0gaW4gb3VyIHJlc3VsdHNgKTtcclxuICAgICAgICAgICAgICAgIC8vIFdlaXJkbHksIGphdmFzY3JpcHQgaGFzIG5vIHdheSB0byBicmVhayBvdXQgb2YgbmVzdGVkIGxvb3BzIGV4Y2VwdCB1c2luZyBsYWJlbHM/XHJcbiAgICAgICAgICAgICAgICAvLyBhbnl3YXkuLi50aGlzIGlzIHVudXN1YWwsIGJ1dCBoZXkgaG9cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGdldEJhY2s7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVudHJ5Lml0ZW0gPSByZXN1bHRbZW50cnkuaXRlbV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVsZXRlIGVudHJ5LnR5cGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdFtpZF0gPSB0aGlzLmNyZWF0ZVRhYmxlKHRhYmxlKTtcclxuICAgICAgICBpZiAocm5nKSB7XHJcbiAgICAgICAgICByZXN1bHRbaWRdLnNldFJuZyh0aGlzLmdldFJuZ0NvbnN0cnVjdG9yKCkudW5zZXJpYWxpemUocm5nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0YWJsZXMudGFibGVzW2lkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXhpbXVtIG5lc3RlZCBzZXJpYWxpemVkIHRhYmxlIGxpbWl0IHJlYWNoZWQgKGNvdWxkIGJlIGEgcmVjdXJzaXZlIHJlcXVpcmVtZW50IHNvbWV3aGVyZSBjYXVzaW5nIGFuIGlzc3VlPyknKTtcclxuICAgIH1cclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbGFiZWxzICovXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVWx0cmFMb290O1xyXG4iLCIvKipcclxuICogU2ltcGxlIGRvdCBnZXR0ZXIgZnVuY3Rpb24uIElmIHByb3BlcnR5IGlzIHVuZGVmaW5lZCwgcmV0dXJucyBkZWZhdWx0IHZhbHVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IG9iID0geyBhOiB7IGI6IHsgYzogJ2ZvbycgfSB9IH07XHJcbiAqIGRvdEdldChvYiwgJ2EuYi5jJyk7IC8vICdmb28nXHJcbiAqIGRvdEdldChvYiwgJ2Euei5jJyk7IC8vIHVuZGVmaW5lZFxyXG4gKiBkb3RHZXQob2IsICdhLnouYycsICdiYXInKTsgLy8gJ2JhcidcclxuICovXHJcbmV4cG9ydCBjb25zdCBkb3RHZXQgPSAob2I6IFJlY29yZDxzdHJpbmcsIGFueT4sIHBhdGg6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55KSA9PiB7XHJcbiAgY29uc3QgcmVzdWx0ID0gcGF0aC5zcGxpdCgnLicpLnJlZHVjZSgobywgaSkgPT4gKCh0eXBlb2YgbyAhPT0gJ3VuZGVmaW5lZCcpID8gb1tpXSA6IG8pLCBvYik7XHJcbiAgcmV0dXJuICh0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2ltcGxlIGRvdCBzZXR0ZXJcclxuICogQGV4YW1wbGVcclxuICogY29uc3Qgb2IgPSB7IGE6IHsgYjogeyBjOiAnZm9vJyB9IH0gfTtcclxuICogZG90U2V0KG9iLCAnYS5iLmMnLCAnYmFyJyk7IC8vIG9iLmEuYi5jID09PSAnYmFyJztcclxuICogZG90U2V0KG9iLCAnYS5iLmQnLCAnYmF6Jyk7IC8vIG9iLmEuYi5kID09PSAnYmF6JztcclxuICovXHJcbmV4cG9ydCBjb25zdCBkb3RTZXQgPSAob2I6IGFueSwgcGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgY29uc3Qga2V5cyA9IHBhdGguc3BsaXQoJy4nKTtcclxuICBsZXQgcGFyZW50ID0gb2I7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcclxuICAgIGlmICghKGtleSBpbiBwYXJlbnQpKSB7XHJcbiAgICAgIHBhcmVudFtrZXldID0ge307XHJcbiAgICB9XHJcbiAgICBwYXJlbnQgPSBwYXJlbnRba2V5XTtcclxuICB9XHJcbiAgcGFyZW50W2tleXNba2V5cy5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHByb3BlcnR5IG9mIG9iXHJcbiAqIEBleGFtcGxlXHJcbiAqIGRlcGVuZChmYWxzZSk7IC8vIGZhbHNlXHJcbiAqIGRlcGVuZChmYWxzZSwgbnVsbCwgdHJ1ZSk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IGZhbHNlfSwgJ2ZvbycpOyAvLyBmYWxzZVxyXG4gKiBkZXBlbmQoe2ZvbzogZmFsc2V9LCAnZm9vJywgbnVsbCwgdHJ1ZSk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IHRydWV9LCAnZm9vJyk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IHRydWV9LCAnZm9vJywgbnVsbCwgdHJ1ZSk7IC8vIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVwZW5kID0gKG9iOiBhbnksIHsgcHJvcGVydHksIHRvYmUsIG1pbiwgbWF4LCBpbnZlcnNlID0gZmFsc2UsIHN0cmljdCA9IHRydWUgfSA6IHsgcHJvcGVydHk/OiBzdHJpbmcsIG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyLCB0b2JlPzogYW55LCBpbnZlcnNlPzogYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICBpbnZlcnNlID0gISFpbnZlcnNlO1xyXG4gIGlmICghb2IpIHtcclxuICAgIHJldHVybiBpbnZlcnNlO1xyXG4gIH1cclxuICBsZXQgdmFsID0gb2I7XHJcbiAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHZhbCA9IGRvdEdldChvYiwgcHJvcGVydHkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB0b2JlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgaWYgKHN0cmljdCkge1xyXG4gICAgICB2YWwgPSAodmFsID09PSB0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcclxuICAgICAgdmFsID0gKHZhbCA9PSB0b2JlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnZlcnNlID8gIXZhbCA6ICEhdmFsO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgKFxyXG4gICAgICB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgKSAmJlxyXG4gICAgc3RyaWN0ICYmXHJcbiAgICB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJ1xyXG4gICkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgIHZhbCAhPT0gbnVsbFxyXG4gICkge1xyXG4gICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHBhcnNlRmxvYXQodmFsKSA8IG1pbikge1xyXG4gICAgICByZXR1cm4gaW52ZXJzZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJyAmJiBwYXJzZUZsb2F0KHZhbCkgPiBtYXgpIHtcclxuICAgICAgcmV0dXJuIGludmVyc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuICFpbnZlcnNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGludmVyc2UgPyAhdmFsIDogISF2YWw7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==