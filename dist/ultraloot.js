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
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMiOlsid2VicGFjazovL3VsdHJhbG9vdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL2RlZmF1bHQvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvZGVmYXVsdC9mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy9sb2cudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3JuZy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvcm5nL3ByZWRpY3RhYmxlLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvbWFuYWdlci50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvcG9vbC50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvcG9vbC9lbnRyeS50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvcG9vbC9lbnRyeS9yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0cy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdWx0cmFsb290LnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vdWx0cmFsb290L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VsdHJhbG9vdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3VsdHJhbG9vdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdWx0cmFsb290L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVbHRyYUxvb3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVWx0cmFMb290XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSB9IGZyb20gJy4vLi4vdGFibGUnO1xyXG5pbXBvcnQge1xyXG4gIGRlcGVuZFxyXG59IGZyb20gJy4vLi4vdXRpbHMnO1xyXG5cclxudHlwZSBEZXBlbmRDb250ZXh0U2lnbmF0dXJlID0gKHtcclxuICBjb250ZXh0LFxyXG4gIGFyZ3NcclxufToge1xyXG4gIGNvbnRleHQ6IGFueSxcclxuICBhcmdzOiB7XHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIG1pbj86IG51bWJlcixcclxuICAgIG1heD86IG51bWJlcixcclxuICAgIHRvYmU/OiBhbnksXHJcbiAgICBpbnZlcnNlPzogYm9vbGVhbixcclxuICAgIHN0cmljdD86IGJvb2xlYW5cclxuICB9XHJcbn0pID0+IGJvb2xlYW47XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiB2YWx1ZSBzZXQgaW4gbG9vdGVyXHJcbiAqIEBwYXJhbSBhcmdzXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IGNvbnRleHQgPSB7IGE6IHsgYjogJ2ZvbycsIGM6IHRydWUsIGQ6IGZhbHNlIH0gfTtcclxuICogZGVwZW5kQ29udGV4dCh7IGNvbnRleHQsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmInIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kQ29udGV4dCh7IGNvbnRleHQsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmInLCB0b2JlOiAnZm9vJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZENvbnRleHQoeyBjb250ZXh0LCBhcmdzOiB7IHByb3BlcnR5OiAnYS5jJywgdG9iZTogJ2ZvbycgfSB9KTsgLy8gZmFsc2VcclxuICogZGVwZW5kQ29udGV4dCh7IGNvbnRleHQsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmMnIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kQ29udGV4dCh7IGNvbnRleHQsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmQnIH0gfSk7IC8vIGZhbHNlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFVzZSBpbiBhIGpzb24gZmlsZTpcclxuICoge1xyXG4gKiAgIFwicG9vbHNcIjogW1xyXG4gKiAgICAge1xyXG4gKiAgICAgICBcImNvbmRpdGlvbnNcIjogW1xyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgIFwiZnVuY3Rpb25cIjogXCJkZXBlbmRDb250ZXh0XCIsXHJcbiAqICAgICAgICAgICBcImFyZ3NcIjoge1xyXG4gKiAgICAgICAgICAgICBcInByb3BlcnR5XCI6IFwicGh5c2ljYWwud2V0XCJcclxuICogICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqICAgICAgIF0sXHJcbiAqICAgICAgIFwiZW50cmllc1wiOiBbXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgXCJpZFwiOiBcInNvZ2d5X25ld3NwYXBlclwiXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgICBdXHJcbiAqICAgICB9XHJcbiAqICAgXVxyXG4gKiB9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVwZW5kQ29udGV4dDogRGVwZW5kQ29udGV4dFNpZ25hdHVyZSA9ICh7IGNvbnRleHQsIGFyZ3MgfSkgPT4ge1xyXG4gIHJldHVybiBkZXBlbmQoY29udGV4dCwgYXJncyk7XHJcbn07XHJcblxyXG50eXBlIERlcGVuZExvb3RlclNpZ25hdHVyZSA9ICh7XHJcbiAgbG9vdGVyLFxyXG4gIGFyZ3NcclxufToge1xyXG4gIGxvb3RlcjogYW55LFxyXG4gIGFyZ3M6IHtcclxuICAgIHByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgbWluPzogbnVtYmVyLFxyXG4gICAgbWF4PzogbnVtYmVyLFxyXG4gICAgdG9iZT86IGFueSxcclxuICAgIGludmVyc2U/OiBib29sZWFuLFxyXG4gICAgc3RyaWN0PzogYm9vbGVhblxyXG4gIH1cclxufSkgPT4gYm9vbGVhbjtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHZhbHVlIHNldCBpbiBsb290ZXJcclxuICogQHBhcmFtIGFyZ3NcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgbG9vdGVyID0geyBhOiB7IGI6ICdmb28nLCBjOiB0cnVlLCBkOiBmYWxzZSB9IH07XHJcbiAqIGRlcGVuZExvb3Rlcih7IGxvb3RlciwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYicgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRMb290ZXIoeyBsb290ZXIsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmInLCB0b2JlOiAnZm9vJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZExvb3Rlcih7IGxvb3RlciwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYycsIHRvYmU6ICdmb28nIH0gfSk7IC8vIGZhbHNlXHJcbiAqIGRlcGVuZExvb3Rlcih7IGxvb3RlciwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYycgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRMb290ZXIoeyBsb290ZXIsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmQnIH0gfSk7IC8vIGZhbHNlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFVzZSBpbiBhIGpzb24gZmlsZTpcclxuICoge1xyXG4gKiAgIFwicG9vbHNcIjogW1xyXG4gKiAgICAge1xyXG4gKiAgICAgICBcImNvbmRpdGlvbnNcIjogW1xyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgIFwiZnVuY3Rpb25cIjogXCJkZXBlbmRMb290ZXJcIixcclxuICogICAgICAgICAgIFwiYXJnc1wiOiB7XHJcbiAqICAgICAgICAgICAgIFwicHJvcGVydHlcIjogXCJzdGF0dXMuc2lja25lc3NcIixcclxuICogICAgICAgICAgICAgXCJtaW5cIjogMC41XHJcbiAqICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgICBdLFxyXG4gKiAgICAgICBcImVudHJpZXNcIjogW1xyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgIFwiaWRcIjogXCJzaWNrbmVzc19oZWFsaW5nX3BhY2tcIlxyXG4gKiAgICAgICAgIH1cclxuICogICAgICAgXVxyXG4gKiAgICAgfVxyXG4gKiAgIF1cclxuICogfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlcGVuZExvb3RlcjogRGVwZW5kTG9vdGVyU2lnbmF0dXJlID0gKHsgbG9vdGVyLCBhcmdzIH0pID0+IHtcclxuICByZXR1cm4gZGVwZW5kKGxvb3RlciwgYXJncyk7XHJcbn07XHJcbiIsImltcG9ydCB7IExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlIH0gZnJvbSAnLi8uLi90YWJsZSc7XHJcbmltcG9ydCB7IFJuZ0ludGVyZmFjZSB9IGZyb20gJy4vLi4vcm5nJztcclxuaW1wb3J0IHtcclxuICBkb3RTZXQsXHJcbiAgZG90R2V0XHJcbn0gZnJvbSAnLi8uLi91dGlscyc7XHJcblxyXG50eXBlIEluaGVyaXRMb290ZXJTaWduYXR1cmUgPSAoe1xyXG4gIGxvb3RlZCxcclxuICBsb290ZXIsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgbG9vdGVkOiBhbnksXHJcbiAgbG9vdGVyOiBhbnksXHJcbiAgYXJnczoge1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBsb290ZXJQcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGxvb3RlZFByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgZGVmYXVsdD86IGFueSxcclxuICB9XHJcbn0pID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogSW5oZXJpdHMgc29tZSBwcm9wZXJ0eSBmcm9tIGxvb3RlciB0byBsb290ZWRcclxuICogQHBhcmFtIGFyZ3NcclxuICogQGV4YW1wbGVcclxuICogaW5oZXJpdExvb3Rlcih7bG9vdGVkLCBsb290ZXIsIHtcclxuICogICBsb290ZXJQcm9wZXJ0eTogJ2VxdWlwcGVkLmNvbG9yJyxcclxuICogICBsb290ZWRQcm9wZXJ0eTogJ2l0ZW0uY29sb3InXHJcbiAqICAgZGVmYXVsdDogJ3JlZCcsXHJcbiAqIH19KVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaGVyaXRMb290ZXI6IEluaGVyaXRMb290ZXJTaWduYXR1cmUgPSAoeyBsb290ZWQsIGxvb3RlciwgYXJncyB9KSA9PiB7XHJcbiAgZG90U2V0KGxvb3RlZCwgYXJncy5wcm9wZXJ0eSA/PyBhcmdzLmxvb3RlZFByb3BlcnR5LCBkb3RHZXQobG9vdGVyLCBhcmdzLnByb3BlcnR5ID8/IGFyZ3MubG9vdGVyUHJvcGVydHksIGFyZ3MuZGVmYXVsdCkpO1xyXG59O1xyXG5cclxudHlwZSBJbmhlcml0Q29udGV4dFNpZ25hdHVyZSA9ICh7XHJcbiAgbG9vdGVkLFxyXG4gIGNvbnRleHQsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgbG9vdGVkOiBhbnksXHJcbiAgY29udGV4dDogYW55LFxyXG4gIGFyZ3M6IHtcclxuICAgIHByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgY29udGV4dFByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgbG9vdGVkUHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBkZWZhdWx0PzogYW55LFxyXG4gIH1cclxufSkgPT4gdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBJbmhlcml0cyBzb21lIHByb3BlcnR5IGZyb20gY29udGV4dCB0byBsb290ZWRcclxuICogQHBhcmFtIGFyZ3NcclxuICogQGV4YW1wbGVcclxuICogaW5oZXJpdENvbnRleHQoe2xvb3RlZCwgbG9vdGVyLCB7XHJcbiAqICAgY29udGV4dFByb3BlcnR5OiAnZHllZC5jb2xvcicsXHJcbiAqICAgbG9vdGVkUHJvcGVydHk6ICdpdGVtLmNvbG9yJ1xyXG4gKiAgIGRlZmF1bHQ6ICdicm93bicsXHJcbiAqIH19KVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaGVyaXRDb250ZXh0OiBJbmhlcml0Q29udGV4dFNpZ25hdHVyZSA9ICh7IGxvb3RlZCwgY29udGV4dCwgYXJncyB9KSA9PiB7XHJcbiAgZG90U2V0KGxvb3RlZCwgYXJncy5wcm9wZXJ0eSA/PyBhcmdzLmxvb3RlZFByb3BlcnR5LCBkb3RHZXQoY29udGV4dCwgYXJncy5wcm9wZXJ0eSA/PyBhcmdzLmNvbnRleHRQcm9wZXJ0eSwgYXJncy5kZWZhdWx0KSk7XHJcbn07XHJcblxyXG50eXBlIFNldFRvUmFuZG9tQ2hvaWNlU2lnbmF0dXJlID0gKHtcclxuICBybmcsXHJcbiAgbG9vdGVkLFxyXG4gIGFyZ3NcclxufToge1xyXG4gIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gIGxvb3RlZDogYW55LFxyXG4gIGFyZ3M6IHtcclxuICAgIHByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgY2hvaWNlcz86IEFycmF5PGFueT4gfCBSZWNvcmQ8YW55LCBudW1iZXI+IHwgTWFwPGFueSwgbnVtYmVyPlxyXG4gIH1cclxufSkgPT4gdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgcHJvcGVydHkgb2YgbG9vdGVkIHRvIHNvbWUgcmFuZG9tIGNob2ljZSBmcm9tIGNob2ljZXMgbGlzdFxyXG4gKlxyXG4gKiBDaG9pY2VzIGNhbiBiZSBhIHNpbXBsZSBhcnJheSwgb3IgYSBtYXAgb2YgYW55dGhpbmcgPT4gd2VpZ2h0LlxyXG4gKlxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBzZXRUb1JhbmRvbUNob2ljZSh7cm5nLCBsb290ZWQsIHtcclxuICogICBwcm9wZXJ0eTogJ2l0ZW0uY29sb3InLFxyXG4gKiAgIGNob2ljZXM6IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXVxyXG4gKiB9fSk7IC8vIGxvb3RlZC5pdGVtLmNvbG9yIHdpbGwgYmUgb25lIG9mIHJlZCwgZ3JlZW4gb3IgYmx1ZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRUb1JhbmRvbUNob2ljZTogU2V0VG9SYW5kb21DaG9pY2VTaWduYXR1cmUgPSAoeyBybmcsIGxvb3RlZCwgYXJncyB9KSA9PiB7XHJcbiAgY29uc3QgeyBwcm9wZXJ0eSwgY2hvaWNlcyB9ID0gYXJncztcclxuICBpZiAocHJvcGVydHkgJiYgbG9vdGVkICYmIGNob2ljZXMpIHtcclxuICAgIGRvdFNldChsb290ZWQsIHByb3BlcnR5LCBybmcud2VpZ2h0ZWRDaG9pY2UoY2hvaWNlcykpO1xyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0ICogZnJvbSAnLi91bHRyYWxvb3QnO1xyXG5leHBvcnQgKiBmcm9tICcuL3JuZyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vcm5nL3ByZWRpY3RhYmxlJztcclxuZXhwb3J0ICogZnJvbSAnLi90YWJsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvbWFuYWdlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvcG9vbCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0cyc7XHJcblxyXG5pbXBvcnQgeyBVbHRyYUxvb3QgfSBmcm9tICcuL3VsdHJhbG9vdCc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUm5nIH0gZnJvbSAnLi9ybmcnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFByZWRpY3RhYmxlUm5nIH0gZnJvbSAnLi9ybmcvcHJlZGljdGFibGUnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSB9IGZyb20gJy4vdGFibGUnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZU1hbmFnZXIgfSBmcm9tICcuL3RhYmxlL21hbmFnZXInO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZVBvb2wgfSBmcm9tICcuL3RhYmxlL3Bvb2wnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZUVudHJ5IH0gZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5JztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVFbnRyeVJlc3VsdCB9IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHQnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZUVudHJ5UmVzdWx0cyB9IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeS9yZXN1bHRzJztcclxuXHJcbi8vIFRoaXMgcHJvdmlkZXMgYW4gZWFzeSB3YXkgb2YgdXNpbmcgdWx0cmFsb290IGluIGJyb3dzZXIuXHJcbi8vIEl0IGNhbiBiZSBpbnN0YW50aWF0ZWQgYnkgbmV3IFVsdHJhTG9vdCgpIGFuZCBzdWJtb2R1bGVzIGNhbiBiZVxyXG4vLyBpbnN0YW50aWF0ZWQgYnkgbmV3IFVsdHJhTG9vdC5Mb290VGFibGUoKSBhbmQgd2hhdG5vdC5cclxuZXhwb3J0IGRlZmF1bHQgVWx0cmFMb290O1xyXG4iLCJkZWNsYXJlIGxldCBQUk9EVUNUSU9OOiBib29sZWFuO1xyXG5cclxubGV0IGRlYnVnID0gZmFsc2U7XHJcbmlmICh0eXBlb2YgUFJPRFVDVElPTiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBkZWJ1ZyA9ICFQUk9EVUNUSU9OO1xyXG59XHJcblxyXG4vKipcclxuICogTG9nZ2luZyBmdW5jdGlvbnMgdGhhdCBkaXNhcHBlYXJzIGluIHByb2R1Y3Rpb24sXHJcbiAqIGFuZCBzdGlsbCBnaXZlIGFjY3VyYXRlIGxpbmUgbnVtYmVycyBpbiBkZXYuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgdmVyYm9zZSBsb2dzXHJcbiAqL1xyXG5kZWJ1ZyA9IGZhbHNlO1xyXG5jb25zdCB2ZXJib3NlID0gdHJ1ZTtcclxuY29uc3QgdWx0cmF2ZXJib3NlID0gdHJ1ZTtcclxuXHJcbmNvbnN0IHZvaWRGdW5jID0gKC4uLmFyZ3M6IGFueSk6IHZvaWQgPT4ge307XHJcbmxldCByID0ge1xyXG4gIGRlYnVnOiB2b2lkRnVuYyxcclxuICB2OiB2b2lkRnVuYyxcclxuICB2djogdm9pZEZ1bmMsXHJcbiAgdmk6IHZvaWRGdW5jLFxyXG4gIHZlOiB2b2lkRnVuYyxcclxuICB2Zzogdm9pZEZ1bmMsXHJcbiAgdmdlOiB2b2lkRnVuYyxcclxuICB2Z2M6IHZvaWRGdW5jLFxyXG4gIHZ0OiB2b2lkRnVuYyxcclxuICBkOiB2b2lkRnVuYyxcclxuICBnOiB2b2lkRnVuYyxcclxuICBnZTogdm9pZEZ1bmMsXHJcbiAgZ2M6IHZvaWRGdW5jLFxyXG4gIHQ6IHZvaWRGdW5jLFxyXG4gIHRlOiB2b2lkRnVuYyxcclxuICB0aW1lOiB2b2lkRnVuYyxcclxuICB0aW1lRW5kOiB2b2lkRnVuYyxcclxuICBncm91cDogdm9pZEZ1bmMsXHJcbiAgZ3JvdXBFbmQ6IHZvaWRGdW5jLFxyXG4gIGdyb3VwQ29sbGFwc2VkOiB2b2lkRnVuYyxcclxuICBsb2c6IHZvaWRGdW5jLFxyXG4gIGVycm9yOiB2b2lkRnVuYyxcclxuICB0YWJsZTogdm9pZEZ1bmMsXHJcbiAgaW5mbzogdm9pZEZ1bmMsXHJcbn07XHJcbmlmIChkZWJ1Zykge1xyXG4gIHIgPSB7XHJcbiAgICAuLi5yLFxyXG4gICAgLi4ue1xyXG4gICAgICBkZWJ1ZzogZnVuY3Rpb24gKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGRlYnVnKSB7XHJcbiAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZDogY29uc29sZS5sb2csXHJcbiAgICAgIGc6IGNvbnNvbGUuZ3JvdXAsXHJcbiAgICAgIGdlOiBjb25zb2xlLmdyb3VwRW5kLFxyXG4gICAgICBnYzogY29uc29sZS5ncm91cENvbGxhcHNlZCxcclxuICAgICAgZ3JvdXA6IGNvbnNvbGUuZ3JvdXAsXHJcbiAgICAgIGdyb3VwRW5kOiBjb25zb2xlLmdyb3VwRW5kLFxyXG4gICAgICBncm91cENvbGxhcHNlZDogY29uc29sZS5ncm91cENvbGxhcHNlZCxcclxuICAgICAgbG9nOiBjb25zb2xlLmxvZyxcclxuICAgICAgZXJyb3I6IGNvbnNvbGUuZXJyb3IsXHJcbiAgICAgIHRhYmxlOiBjb25zb2xlLnRhYmxlLFxyXG4gICAgICBpbmZvOiBjb25zb2xlLmluZm9cclxuICAgIH1cclxuICB9O1xyXG4gIGlmICh2ZXJib3NlKSB7XHJcbiAgICByID0ge1xyXG4gICAgICAuLi5yLFxyXG4gICAgICAuLi57XHJcbiAgICAgICAgdjogY29uc29sZS5sb2csXHJcbiAgICAgICAgdmk6IGNvbnNvbGUuaW5mbyxcclxuICAgICAgICB2ZTogY29uc29sZS5lcnJvcixcclxuICAgICAgICB2ZzogY29uc29sZS5ncm91cCxcclxuICAgICAgICB2Z2U6IGNvbnNvbGUuZ3JvdXBFbmQsXHJcbiAgICAgICAgdmdjOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxyXG4gICAgICAgIHZ0OiBjb25zb2xlLnRhYmxlLFxyXG4gICAgICAgIHQ6IGNvbnNvbGUudGltZSxcclxuICAgICAgICB0ZTogY29uc29sZS50aW1lRW5kLFxyXG4gICAgICAgIHRpbWU6IGNvbnNvbGUudGltZSxcclxuICAgICAgICB0aW1lRW5kOiBjb25zb2xlLnRpbWVFbmQsXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIGlmICh1bHRyYXZlcmJvc2UpIHtcclxuICAgIHIudnYgPSBjb25zb2xlLmxvZztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHI7XHJcbiIsImNvbnN0IE1BWF9SRUNVUlNJT05TID0gMTAwO1xyXG5jb25zdCBUSFJPV19PTl9NQVhfUkVDVVJTSU9OU19SRUFDSEVEID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmFuZG9tSW50ZXJmYWNlIHtcclxuICByYW5kb20oKSA6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaWNlSW50ZXJmYWNlIHtcclxuICBuOiBudW1iZXI7XHJcbiAgZDogbnVtYmVyO1xyXG4gIHBsdXM6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2VcclxuICogQHByb3AgbWVhbiAgIFVzZWQgZm9yIFwibm9ybWFsXCIgdHlwZSBjaGFuY3kgcmVzdWx0cyB0byBkZXRlcm1pbmUgdGhlIG1lYW5cclxuICogQHByb3Agc3RkZGV2IFVzZWQgZm9yIFwibm9ybWFsXCIgdHlwZSBjaGFuY3kgcmVzdWx0cyB0byBkZXRlcm1pbmUgdGhlIHN0ZGRldlxyXG4gKiBAcHJvcCBtaW4gICAgVGhlIG1pbmltdW0gcG9zc2libGUgcmVzdWx0XHJcbiAqIEBwcm9wIG1heCAgICBUaGUgbWF4aW11bSBwb3NzaWJsZSByZXN1bHRcclxuICogQHByb3AgdHlwZSAgIFRoZSB0eXBlIG9mIHJlc3VsdCwgY2FuIGJlIFwibm9ybWFsXCIsIFwibm9ybWFsX2ludFwiLCBcImludGVnZXJcIiBvciBcInJhbmRvbVwiXHJcbiAqIEBwcm9wIHBvd2VyICBUaGUgcG93ZXIgZmFjdG9yIHRvIHBhc3MgdG8gdGhlIHJhbmRvbSBmdW5jdGlvbiAtIGJhc2ljYWxseSBza2V3cyByZXN1bHRzIG9uZSB3YXkgb3IgdGhlIG90aGVyXHJcbiAqIEBwcm9wIHNrZXcgICBTa2V3IHRvIHVzZSB3aGVuIHVzaW5nIGEgXCJub3JtYWxcIiBvciBcIm5vcm1hbF9pbnRcIiBkaXN0cmlidXRpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmN5SW50ZXJmYWNlIHtcclxuICBtZWFuPzogbnVtYmVyO1xyXG4gIHN0ZGRldj86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG4gIHR5cGU/OiBzdHJpbmc7XHJcbiAgc2tldz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQ2hhbmN5ID0gQ2hhbmN5SW50ZXJmYWNlIHwgc3RyaW5nIHwgbnVtYmVyO1xyXG5cclxuZXhwb3J0IHR5cGUgU2VlZCA9IHN0cmluZyB8IG51bWJlcjtcclxuXHJcbmV4cG9ydCB0eXBlIE1hdGhGdW5jID0gJ2Zsb29yJyB8ICdjZWlsJyB8ICdyb3VuZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJuZ0ludGVyZmFjZSB7XHJcbiAgcHJlZGljdGFibGUoc2VlZD86IFNlZWQpIDogUm5nSW50ZXJmYWNlO1xyXG4gIGhhc2hTdHIoc3RyIDogc3RyaW5nKSA6IHN0cmluZyB8IG51bWJlcjtcclxuICBjb252ZXJ0U3RyaW5nVG9OdW1iZXIoc3RyIDogc3RyaW5nKSA6IG51bWJlcjtcclxuICBnZXRTZWVkKCkgOiBudW1iZXI7XHJcbiAgc2FtZUFzKG90aGVyOiBSbmdJbnRlcmZhY2UpIDogYm9vbGVhbjtcclxuICBzZWVkKHNlZWQgOiBTZWVkKSA6IHRoaXM7XHJcbiAgcGVyY2VudGFnZSgpIDogbnVtYmVyO1xyXG4gIHJhbmRvbShmcm9tPyA6IG51bWJlciwgdG8/IDogbnVtYmVyLCBza2V3PyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgY2hhbmNlKG4gOiBudW1iZXIsIGNoYW5jZUluPyA6IG51bWJlcikgOiBib29sZWFuO1xyXG4gIGNoYW5jZVRvKGZyb20gOiBudW1iZXIsIHRvIDogbnVtYmVyKSA6IGJvb2xlYW47XHJcbiAgcmFuZEludChmcm9tPyA6IG51bWJlciwgdG8/IDogbnVtYmVyLCBza2V3PyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgdW5pcWlkKHByZWZpeD86IHN0cmluZywgcmFuZG9tPzogYm9vbGVhbikgOiBzdHJpbmc7XHJcbiAgdW5pcXN0cihsZW4/OiBudW1iZXIpIDogc3RyaW5nO1xyXG4gIHJhbmRCZXR3ZWVuKGZyb20gOiBudW1iZXIsIHRvIDogbnVtYmVyLCBza2V3IDogbnVtYmVyKSA6IG51bWJlcjtcclxuICBub3JtYWwoYXJncz86IE5vcm1hbEFyZ3MpIDogbnVtYmVyO1xyXG4gIGNoYW5jeUludChpbnB1dCA6IENoYW5jeSwgZm4gPzogTWF0aEZ1bmMpIDogbnVtYmVyO1xyXG4gIGNoYW5jeShpbnB1dCA6IENoYW5jeSkgOiBudW1iZXI7XHJcbiAgY2hvaWNlKGRhdGEgOiBBcnJheTxhbnk+KSA6IGFueTtcclxuICB3ZWlnaHRlZENob2ljZShkYXRhIDogUmVjb3JkPGFueSwgbnVtYmVyPiB8IEFycmF5PGFueT4gfCBNYXA8YW55LCBudW1iZXI+KSA6IGFueTtcclxuICBkaWNlKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyLCBkPyA6IG51bWJlciwgcGx1cz8gOiBudW1iZXIpIDogbnVtYmVyO1xyXG4gIHBhcnNlRGljZVN0cmluZyhzdHJpbmcgOiBzdHJpbmcpIDogRGljZUludGVyZmFjZTtcclxuICBjbGFtcChudW1iZXIgOiBudW1iZXIsIGxvd2VyIDogbnVtYmVyLCB1cHBlciA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgYmluKHZhbCA6IG51bWJlciwgYmlucyA6IG51bWJlciwgbWluIDogbnVtYmVyLCBtYXggOiBudW1iZXIpIDogbnVtYmVyO1xyXG4gIHNlcmlhbGl6ZSgpIDogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJuZ0NvbnN0cnVjdG9yIHtcclxuICBuZXcgKHNlZWQ/OlNlZWQpOiBSbmdJbnRlcmZhY2U7XHJcbiAgdW5zZXJpYWxpemUocm5nOiBhbnkpOiBSbmdJbnRlcmZhY2U7XHJcbiAgY2hhbmN5TWluKGlucHV0IDogQ2hhbmN5KSA6IG51bWJlcjtcclxuICBjaGFuY3lNYXgoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyO1xyXG4gIHBhcnNlRGljZVN0cmluZyhzdHJpbmcgOiBzdHJpbmcpIDogRGljZUludGVyZmFjZTtcclxuICBkaWNlTWluKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyLCBkPyA6IG51bWJlciwgcGx1cz8gOiBudW1iZXIpIDogbnVtYmVyO1xyXG4gIGRpY2VNYXgobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIsIGQ/IDogbnVtYmVyLCBwbHVzPyA6IG51bWJlcikgOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IGRpY2VSZSA6IFJlZ0V4cCA9IC9eICooWzAtOV0rKSAqW2REXSAqKFswLTldKykgKihbKy1dPyAqWzAtOV0qKSAqJC87XHJcbmNvbnN0IGRpY2VSZU5vSW5pdCA6IFJlZ0V4cCA9IC9eICpbZERdICooWzAtOV0rKSAqKFsrLV0/ICpbMC05XSopICokLztcclxuY29uc3Qgc3RyVG9OdW1iZXJDYWNoZSA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcclxuY29uc3QgZGljZUNhY2hlIDogUmVjb3JkPHN0cmluZywgRGljZUludGVyZmFjZT4gPSB7fTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZFJuZyB7XHJcbiAgbWFzazogbnVtYmVyLFxyXG4gIHNlZWQ6IG51bWJlcixcclxuICBtX3o6IG51bWJlcixcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTm9ybWFsQXJncyA9IHtcclxuICBtZWFuPzogbnVtYmVyLFxyXG4gIHN0ZGRldj86IG51bWJlcixcclxuICBtYXg/OiBudW1iZXIsXHJcbiAgbWluPzogbnVtYmVyLFxyXG4gIHNrZXc/OiBudW1iZXIsXHJcbiAgc2tld3R5cGU/OiBzdHJpbmcsXHJcbn07XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUm5nQWJzdHJhY3QgaW1wbGVtZW50cyBSbmdJbnRlcmZhY2Uge1xyXG4gICNzZWVkOiBudW1iZXIgPSAwO1xyXG4gIGNvbnN0cnVjdG9yIChzZWVkPyA6IFNlZWQpIHtcclxuICAgIHRoaXMuc2V0U2VlZChzZWVkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTZWVkICgpIDogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLiNzZWVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhbWVBcyAob3RoZXIgOiBSbmdBYnN0cmFjdCkgOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLiNzZWVkID09PSBvdGhlci4jc2VlZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRTZWVkIChzZWVkPyA6IFNlZWQpIDogdGhpcyB7XHJcbiAgICBpZiAodHlwZW9mIHNlZWQgIT09ICd1bmRlZmluZWQnICYmIHNlZWQgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHR5cGVvZiBzZWVkID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHNlZWQgPSB0aGlzLmNvbnZlcnRTdHJpbmdUb051bWJlcihzZWVkKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiNzZWVkID0gc2VlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNldFNlZWQoTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlZWQgKHNlZWQ/OiBTZWVkKTogdGhpcyB7XHJcbiAgICB0aGlzLnNldFNlZWQoc2VlZCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXJpYWxpemUgKCkgOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2VlZDogdGhpcy4jc2VlZCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVuc2VyaWFsaXplIChzZXJpYWxpemVkIDogU2VyaWFsaXplZFJuZykgOiBSbmdJbnRlcmZhY2Uge1xyXG4gICAgY29uc3QgeyBjb25zdHJ1Y3RvciB9ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xyXG4gICAgY29uc3Qgcm5nID0gbmV3IGNvbnN0cnVjdG9yKHNlcmlhbGl6ZWQuc2VlZCk7XHJcbiAgICBybmcuc2V0U2VlZChzZXJpYWxpemVkLnNlZWQpO1xyXG4gICAgcmV0dXJuIHJuZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVkaWN0YWJsZSAoc2VlZD8gOiBTZWVkKSA6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICBjb25zdCB7IGNvbnN0cnVjdG9yIH0gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XHJcbiAgICBjb25zdCBuZXdTZWxmIDogUm5nSW50ZXJmYWNlID0gbmV3IGNvbnN0cnVjdG9yKHNlZWQpO1xyXG4gICAgcmV0dXJuIG5ld1NlbGY7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHByZWRpY3RhYmxlPFQgZXh0ZW5kcyBSbmdBYnN0cmFjdD4odGhpczogbmV3IChzZWVkOiBTZWVkKSA9PiBULCBzZWVkOiBTZWVkKTogVCB7XHJcbiAgICByZXR1cm4gbmV3IHRoaXMoc2VlZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzaFN0ciAoc3RyIDogc3RyaW5nKSA6IG51bWJlciB7XHJcbiAgICBsZXQgaGFzaCA9IDA7XHJcbiAgICBsZXQgaTtcclxuICAgIGxldCBjaHI7XHJcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGhhc2g7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNociA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaHI7XHJcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb252ZXJ0U3RyaW5nVG9OdW1iZXIgKHN0ciA6IHN0cmluZykgOiBudW1iZXIge1xyXG4gICAgaWYgKHN0clRvTnVtYmVyQ2FjaGVbc3RyXSkge1xyXG4gICAgICByZXR1cm4gc3RyVG9OdW1iZXJDYWNoZVtzdHJdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbnVtID0gdGhpcy5oYXNoU3RyKHN0cik7XHJcbiAgICBzdHJUb051bWJlckNhY2hlW3N0cl0gPSBudW07XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9yYW5kb20gKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwZXJjZW50YWdlICgpIDogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnJhbmRCZXR3ZWVuKDAsIDEwMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmFuZG9tIChmcm9tIDogbnVtYmVyID0gMCwgdG8gOiBudW1iZXIgPSAxLCBza2V3IDogbnVtYmVyID0gMCkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucmFuZEJldHdlZW4oZnJvbSwgdG8sIHNrZXcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5jZSAobiA6IG51bWJlciwgY2hhbmNlSW4gOiBudW1iZXIgPSAxKSA6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgY2hhbmNlID0gbiAvIGNoYW5jZUluO1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhbmRvbSgpIDw9IGNoYW5jZTtcclxuICB9XHJcblxyXG4gIC8vIDUwMCB0byAxIGNoYW5jZSwgZm9yIGV4YW1wbGVcclxuICBwdWJsaWMgY2hhbmNlVG8gKGZyb20gOiBudW1iZXIsIHRvIDogbnVtYmVyKSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhbmRvbSgpIDw9IChmcm9tIC8gKGZyb20gKyB0bykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJhbmRJbnQgKGZyb20gPSAwLCB0byA9IDEsIHNrZXcgPSAwKSA6IG51bWJlciB7XHJcbiAgICBbZnJvbSwgdG9dID0gW01hdGgubWluKGZyb20sIHRvKSwgTWF0aC5tYXgoZnJvbSwgdG8pXTtcclxuICAgIGxldCByYW5kID0gdGhpcy5fcmFuZG9tKCk7XHJcbiAgICBpZiAoc2tldyA8IDApIHtcclxuICAgICAgcmFuZCA9IDEgLSAoTWF0aC5wb3cocmFuZCwgTWF0aC5wb3coMiwgc2tldykpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJhbmQgPSBNYXRoLnBvdyhyYW5kLCBNYXRoLnBvdygyLCAtc2tldykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZCAqICgodG8gKyAxKSAtIGZyb20pKSArIGZyb207XHJcbiAgfVxyXG5cclxuICAvLyBOb3QgZGV0ZXJtaW5pc3RpY1xyXG4gIHB1YmxpYyB1bmlxaWQgKHByZWZpeCA6IHN0cmluZyA9ICcnLCByYW5kb20gOiBib29sZWFuID0gZmFsc2UpIDogc3RyaW5nIHtcclxuICAgIGNvbnN0IHNlYyA9IERhdGUubm93KCkgKiAxMDAwICsgTWF0aC5yYW5kb20oKSAqIDEwMDA7XHJcbiAgICBjb25zdCBpZCA9IHNlYy50b1N0cmluZygxNikucmVwbGFjZSgvXFwuL2csICcnKS5wYWRFbmQoMTQsICcwJyk7XHJcbiAgICByZXR1cm4gYCR7cHJlZml4fSR7aWR9JHtyYW5kb20gPyBgLiR7TWF0aC50cnVuYyhNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKX1gIDogJyd9YDtcclxuICB9XHJcblxyXG4gIC8vIERldGVybWluaXN0aWNcclxuICBwdWJsaWMgdW5pcXN0ciAobGVuOiBudW1iZXIgPSA2KSA6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzdHIgOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODknO1xyXG4gICAgY29uc3QgYWxlbiA9IDYxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBzdHIucHVzaChhbHBoYWJldFt0aGlzLnJhbmRJbnQoMCwgYWxlbildKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHIuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmFuZEJldHdlZW4gKGZyb20gOiBudW1iZXIgPSAwLCB0byA6IG51bWJlciA9IDEsIHNrZXcgOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcclxuICAgIFtmcm9tLCB0b10gPSBbTWF0aC5taW4oZnJvbSwgdG8pLCBNYXRoLm1heChmcm9tLCB0byldO1xyXG4gICAgbGV0IHJhbmQgPSB0aGlzLl9yYW5kb20oKTtcclxuICAgIGlmIChza2V3IDwgMCkge1xyXG4gICAgICByYW5kID0gMSAtIChNYXRoLnBvdyhyYW5kLCBNYXRoLnBvdygyLCBza2V3KSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZCA9IE1hdGgucG93KHJhbmQsIE1hdGgucG93KDIsIC1za2V3KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5zY2FsZU5vcm0ocmFuZCwgZnJvbSwgdG8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjYWxlIChudW1iZXI6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBtaW46IG51bWJlciA9IDAsIG1heDogbnVtYmVyID0gMSk6IG51bWJlciB7XHJcbiAgICBpZiAobnVtYmVyID4gbWF4KSB0aHJvdyBuZXcgRXJyb3IoYE51bWJlciAke251bWJlcn0gaXMgZ3JlYXRlciB0aGFuIG1heCBvZiAke21heH1gKTtcclxuICAgIGlmIChudW1iZXIgPCBtaW4pIHRocm93IG5ldyBFcnJvcihgTnVtYmVyICR7bnVtYmVyfSBpcyBsZXNzIHRoYW4gbWluIG9mICR7bWlufWApO1xyXG4gICAgLy8gRmlyc3Qgd2Ugc2NhbGUgdGhlIG51bWJlciBpbiB0aGUgcmFuZ2UgWzAtMSlcclxuICAgIG51bWJlciA9IChudW1iZXIgLSBtaW4pIC8gKG1heCAtIG1pbik7XHJcbiAgICByZXR1cm4gdGhpcy5zY2FsZU5vcm0obnVtYmVyLCBmcm9tLCB0byk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2NhbGVOb3JtIChudW1iZXI6IG51bWJlciwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmIChudW1iZXIgPiAxIHx8IG51bWJlciA8IDApIHRocm93IG5ldyBFcnJvcihgTnVtYmVyIG11c3QgYmUgPCAxIGFuZCA+IDAsIGdvdCAke251bWJlcn1gKTtcclxuICAgIHJldHVybiAobnVtYmVyICogKHRvIC0gZnJvbSkpICsgZnJvbTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG91bGRUaHJvd09uTWF4UmVjdXJzaW9uc1JlYWNoZWQgKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFRIUk9XX09OX01BWF9SRUNVUlNJT05TX1JFQUNIRUQ7XHJcbiAgfVxyXG5cclxuICAvLyBHYXVzc2lhbiBudW1iZXIgYmV0d2VlbiAwIGFuZCAxXHJcbiAgcHVibGljIG5vcm1hbCAoeyBtZWFuLCBzdGRkZXYgPSAxLCBtYXgsIG1pbiwgc2tldyA9IDAgfSA6IE5vcm1hbEFyZ3MgPSB7fSwgZGVwdGggPSAwKTogbnVtYmVyIHtcclxuICAgIGlmIChkZXB0aCA+IE1BWF9SRUNVUlNJT05TICYmIHRoaXMuc2hvdWxkVGhyb3dPbk1heFJlY3Vyc2lvbnNSZWFjaGVkKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXggcmVjdXJzaXZlIGNhbGxzIHRvIHJuZyBub3JtYWwgZnVuY3Rpb24uIFRoaXMgbWlnaHQgYmUgYXMgYSByZXN1bHQgb2YgdXNpbmcgcHJlZGljdGFibGUgcmFuZG9tIG51bWJlcnM/Jyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbnVtID0gdGhpcy5ib3hNdWxsZXIoKTtcclxuICAgIG51bSA9IG51bSAvIDEwLjAgKyAwLjU7IC8vIFRyYW5zbGF0ZSB0byAwIC0+IDFcclxuICAgIGlmIChkZXB0aCA+IE1BWF9SRUNVUlNJT05TKSB7XHJcbiAgICAgIG51bSA9IE1hdGgubWluKE1hdGgubWF4KG51bSwgMCksIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG51bSA+IDEgfHwgbnVtIDwgMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbCh7IG1lYW4sIHN0ZGRldiwgbWF4LCBtaW4sIHNrZXcgfSwgZGVwdGggKyAxKTsgLy8gcmVzYW1wbGUgYmV0d2VlbiAwIGFuZCAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2tldyA8IDApIHtcclxuICAgICAgbnVtID0gMSAtIChNYXRoLnBvdyhudW0sIE1hdGgucG93KDIsIHNrZXcpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBudW0gPSBNYXRoLnBvdyhudW0sIE1hdGgucG93KDIsIC1za2V3KSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBtZWFuID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBtZWFuID0gMDtcclxuICAgICAgaWYgKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgbnVtICo9IG1heCAtIG1pbjtcclxuICAgICAgICBudW0gKz0gbWluO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bSA9IG51bSAqIDEwO1xyXG4gICAgICAgIG51bSA9IG51bSAtIDU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG51bSA9IG51bSAqIDEwO1xyXG4gICAgICBudW0gPSBudW0gLSA1O1xyXG4gICAgICBudW0gPSBudW0gKiBzdGRkZXYgKyBtZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXB0aCA8PSBNQVhfUkVDVVJTSU9OUyAmJiAoKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnICYmIG51bSA+IG1heCkgfHwgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIG51bSA8IG1pbikpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vcm1hbCh7IG1lYW4sIHN0ZGRldiwgbWF4LCBtaW4sIHNrZXcgfSwgZGVwdGggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbiB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgYWJvdmUgdGhlIG1heCByZWN1cnNpb24gbGltaXQsIHdlIGp1c3QgY2xhbXAgdGhlIG51bWJlci4uLlxyXG4gICAgLy8gdGhpcyBjYW4gaGFwcGVuIGluIGV4dHJlbWUgY2FzZXMgd2hlcmUgcGFyYW1ldGVycyBhcmUgdmVyeSBtYXJnaW5hbCwgYnV0IHdlIGRvIG5vdFxyXG4gICAgLy8gd2FudCB0byByZXR1cm4gYW55IG91dCBvZiBib3VuZHMgbnVtYmVycyBpbiB0aGUgY2FzZSB0aGF0IG1heCBhbmQgbWluIGFyZSBnaXZlbiwgZXZlblxyXG4gICAgLy8gaWYgdGhleSBhcmUgbm90IHN0cmljdGx5IG5vcm1hbGx5IGRpc3RyaWJ1dGVkIC0gaS5lLiB0aGVyZSB3aWxsIGJlIGEgdmVyeSBtYXJnaW5hbCBiaWFzXHJcbiAgICAvLyB0byB0aGUgYm91bmRzIG51bWJlcnMgaW4gY2VydGFpbiBjYXNlcywgYnV0IGl0J3MgbGFyZ2VseSBhIG5vbi1pc3N1ZS5cclxuICAgIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBudW0gPSBNYXRoLm1pbihudW0sIG1heCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgbnVtID0gTWF0aC5tYXgobnVtLCBtaW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bTtcclxuICB9XHJcblxyXG4gIC8vIFN0YW5kYXJkIE5vcm1hbCB2YXJpYXRlIHVzaW5nIEJveC1NdWxsZXIgdHJhbnNmb3JtLlxyXG4gIHB1YmxpYyBib3hNdWxsZXIgKG1lYW4gOiBudW1iZXIgPSAwLCBzdGRkZXYgOiBudW1iZXIgPSAxKSA6IG51bWJlciB7XHJcbiAgICBjb25zdCB1ID0gMSAtIHRoaXMuX3JhbmRvbSgpOyAvLyBDb252ZXJ0aW5nIFswLDEpIHRvICgwLDFdXHJcbiAgICBjb25zdCB2ID0gdGhpcy5fcmFuZG9tKCk7XHJcbiAgICBjb25zdCB6ID0gTWF0aC5zcXJ0KC0yLjAgKiBNYXRoLmxvZyh1KSkgKiBNYXRoLmNvcygyLjAgKiBNYXRoLlBJICogdik7XHJcbiAgICAvLyBUcmFuc2Zvcm0gdG8gdGhlIGRlc2lyZWQgbWVhbiBhbmQgc3RhbmRhcmQgZGV2aWF0aW9uOlxyXG4gICAgcmV0dXJuIHogKiBzdGRkZXYgKyBtZWFuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5jeUludCAoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGlucHV0KTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlucHV0LnR5cGUgPSAnaW50ZWdlcic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGFuY3koaW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5jeSAoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpY2UoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgc3dpdGNoIChpbnB1dC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbm9ybWFsJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbChpbnB1dCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdub3JtYWxfaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm5vcm1hbChpbnB1dCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yYW5kSW50KFxyXG4gICAgICAgICAgICBpbnB1dC5taW4gPz8gMCxcclxuICAgICAgICAgICAgaW5wdXQubWF4ID8/IDEsXHJcbiAgICAgICAgICAgIGlucHV0LnNrZXcgPz8gMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yYW5kb20oXHJcbiAgICAgICAgICAgIGlucHV0Lm1pbiA/PyAwLFxyXG4gICAgICAgICAgICBpbnB1dC5tYXggPz8gMSxcclxuICAgICAgICAgICAgaW5wdXQuc2tldyA/PyAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5wdXQgZ2l2ZW4gdG8gY2hhbmN5Jyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYW5jeU1pbiAoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpY2VNaW4oaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuc2tldyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIC8vIFJlZ3VsYXIgcmFuZG9tIG51bWJlcnMgYXJlIGV2ZW5seSBkaXN0cmlidXRlZCwgc28gc2tld1xyXG4gICAgICAgICAgLy8gb25seSBtYWtlcyBzZW5zZSBvbiBub3JtYWwgbnVtYmVyc1xyXG4gICAgICAgICAgaW5wdXQudHlwZSA9ICdub3JtYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICdub3JtYWwnOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1pbiA/PyBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdub3JtYWxfaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWluID8/IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1pbiA/PyAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5taW4gPz8gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjaGFuY3lNYXggKGlucHV0IDogQ2hhbmN5KSA6IG51bWJlciB7XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5kaWNlTWF4KGlucHV0KTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0LnNrZXcgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBSZWd1bGFyIHJhbmRvbSBudW1iZXJzIGFyZSBldmVubHkgZGlzdHJpYnV0ZWQsIHNvIHNrZXdcclxuICAgICAgICAgIC8vIG9ubHkgbWFrZXMgc2Vuc2Ugb24gbm9ybWFsIG51bWJlcnNcclxuICAgICAgICAgIGlucHV0LnR5cGUgPSAnbm9ybWFsJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChpbnB1dC50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbm9ybWFsJzpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5tYXggPz8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbm9ybWFsX2ludGVnZXInOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1heCA/PyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5tYXggPz8gMTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWF4ID8/IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaG9pY2UgKGRhdGEgOiBBcnJheTxhbnk+KSA6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWlnaHRlZENob2ljZShkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRhdGEgZm9ybWF0OlxyXG4gICAqIHtcclxuICAgKiAgIGNob2ljZTE6IDEsXHJcbiAgICogICBjaG9pY2UyOiAyLFxyXG4gICAqICAgY2hvaWNlMzogMyxcclxuICAgKiB9XHJcbiAgICovXHJcbiAgcHVibGljIHdlaWdodGVkQ2hvaWNlIChkYXRhIDogUmVjb3JkPGFueSwgbnVtYmVyPiB8IEFycmF5PGFueT4gfCBNYXA8YW55LCBudW1iZXI+KSA6IGFueSB7XHJcbiAgICBsZXQgdG90YWwgPSAwOyBsZXQgaWQ7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgY29uc3QgY2hhbmNlcyA6IE1hcDxhbnksIG51bWJlcj4gPSBuZXcgTWFwKCk7XHJcbiAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgIGNoYW5jZXMuc2V0KGEsIDEpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0ZWRDaG9pY2UoY2hhbmNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgdG90YWwgKz0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGFbaWRdIDwgMCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9iYWJpbGl0eSBjYW5ub3QgYmUgbmVnYXRpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG90YWwgKz0gZGF0YVtpZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHJhbmRvbSA9IHRoaXMuX3JhbmRvbSgpICogdG90YWw7XHJcblxyXG4gICAgbGV0IHBhcnQgPSAwO1xyXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgZm9yIChjb25zdCBbaWQsIHZhbHVlXSBvZiBkYXRhKSB7XHJcbiAgICAgICAgcGFydCArPSB2YWx1ZTtcclxuICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xyXG4gICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgcGFydCArPSBkYXRhW2lkXTtcclxuICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xyXG4gICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGJ5IHNvbWUgZmxvYXRpbmctcG9pbnQgYW5ub3lhbmNlIHdlIGhhdmVcclxuICAgIC8vIHJhbmRvbSA+PSB0b3RhbCwganVzdCByZXR1cm4gdGhlIGxhc3QgaWQuXHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc3RhdGljIHBhcnNlRGljZUFyZ3MgKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgaWYgKG4gPT09IG51bGwgfHwgdHlwZW9mIG4gPT09ICd1bmRlZmluZWQnIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpY2UgZXhwZWN0cyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VEaWNlU3RyaW5nKG4pO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBuID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuKSkge1xyXG4gICAgICAgIFtuLCBkLCBwbHVzXSA9IG47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IG4uZDtcclxuICAgICAgICBwbHVzID0gbi5wbHVzO1xyXG4gICAgICAgIG4gPSBuLm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IG4sIGQsIHBsdXMgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZURpY2VBcmdzIChuIDogc3RyaW5nIHwgRGljZUludGVyZmFjZSB8IG51bWJlciB8IG51bWJlcltdID0gMSwgZDogbnVtYmVyID0gNiwgcGx1czogbnVtYmVyID0gMCkgOiBEaWNlSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wYXJzZURpY2VBcmdzKG4pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHBhcnNlRGljZVN0cmluZyAoc3RyaW5nIDogc3RyaW5nKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgLy8gZGljZSBzdHJpbmcgbGlrZSA1ZDEwKzFcclxuICAgIGlmICghZGljZUNhY2hlW3N0cmluZ10pIHtcclxuICAgICAgaWYgKGRpY2VSZS50ZXN0KHN0cmluZykpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkaWNlUmUuZXhlYyhzdHJpbmcucmVwbGFjZSgvICsvZywgJycpKTtcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBkaWNlQ2FjaGVbc3RyaW5nXSA9IHtcclxuICAgICAgICAgICAgbjogKHBhcnNlSW50KHJlc3VsdFsxXSkgLyAxIHx8IDEpLFxyXG4gICAgICAgICAgICBkOiAocGFyc2VJbnQocmVzdWx0WzJdKSAvIDEgfHwgMSksXHJcbiAgICAgICAgICAgIHBsdXM6IChwYXJzZUZsb2F0KHJlc3VsdFszXSkgLyAxIHx8IDApLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZGljZVJlTm9Jbml0LnRlc3Qoc3RyaW5nKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRpY2VSZU5vSW5pdC5leGVjKHN0cmluZy5yZXBsYWNlKC8gKy9nLCAnJykpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgIGRpY2VDYWNoZVtzdHJpbmddID0ge1xyXG4gICAgICAgICAgICBuOiAxLFxyXG4gICAgICAgICAgICBkOiAocGFyc2VJbnQocmVzdWx0WzFdKSAvIDEgfHwgMSksXHJcbiAgICAgICAgICAgIHBsdXM6IChwYXJzZUZsb2F0KHJlc3VsdFsyXSkgLyAxIHx8IDApLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaWNlQ2FjaGVbc3RyaW5nXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGljZU1heCAobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIgfCBudW1iZXJbXSA9IDEsIGQ6IG51bWJlciA9IDYsIHBsdXM6IG51bWJlciA9IDApIDogbnVtYmVyIHtcclxuICAgICh7IG4sIGQsIHBsdXMgfSA9IHRoaXMucGFyc2VEaWNlQXJncyhuLCBkLCBwbHVzKSk7XHJcbiAgICByZXR1cm4gKG4gKiBkKSArIHBsdXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGRpY2VNaW4gKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICAoeyBuLCBkLCBwbHVzIH0gPSB0aGlzLnBhcnNlRGljZUFyZ3MobiwgZCwgcGx1cykpO1xyXG4gICAgcmV0dXJuIG4gKyBwbHVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpY2UgKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICAoeyBuLCBkLCBwbHVzIH0gPSB0aGlzLnBhcnNlRGljZUFyZ3MobiwgZCwgcGx1cykpO1xyXG4gICAgaWYgKHR5cGVvZiBuID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgbnZhbCA9IE1hdGgubWF4KG4sIDEpO1xyXG4gICAgICBjb25zdCBkdmFsID0gTWF0aC5tYXgoZCwgMSk7XHJcbiAgICAgIGlmIChkID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHBsdXMgKyAxO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzdW0gPSBwbHVzIHx8IDA7XHJcbiAgICAgIHdoaWxlIChudmFsID4gMCkge1xyXG4gICAgICAgIHN1bSArPSB0aGlzLnJhbmRJbnQoMSwgZHZhbCk7XHJcbiAgICAgICAgbnZhbC0tO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGdpdmVuIHRvIGRpY2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZURpY2VTdHJpbmcgKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wYXJzZURpY2VTdHJpbmcoc3RyaW5nKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGFtcCAobnVtYmVyIDogbnVtYmVyLCBsb3dlciA6IG51bWJlciwgdXBwZXIgOiBudW1iZXIpIDogbnVtYmVyIHtcclxuICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG51bWJlciA9IG51bWJlciA8PSB1cHBlciA/IG51bWJlciA6IHVwcGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbnVtYmVyID0gbnVtYmVyID49IGxvd2VyID8gbnVtYmVyIDogbG93ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJpbiAodmFsIDogbnVtYmVyLCBiaW5zIDogbnVtYmVyLCBtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBudW1iZXIge1xyXG4gICAgY29uc3Qgc3ByZWFkID0gbWF4IC0gbWluO1xyXG4gICAgcmV0dXJuIChNYXRoLnJvdW5kKCgodmFsIC0gbWluKSAvIHNwcmVhZCkgKiAoYmlucyAtIDEpKSAvIChiaW5zIC0gMSkgKiBzcHJlYWQpICsgbWluO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm5nIGV4dGVuZHMgUm5nQWJzdHJhY3QgaW1wbGVtZW50cyBSbmdJbnRlcmZhY2Uge1xyXG4gICNtYXNrOiBudW1iZXI7XHJcbiAgI3NlZWQ6IG51bWJlcjtcclxuICAjbV96OiBudW1iZXIgPSAwO1xyXG4gIGNvbnN0cnVjdG9yIChzZWVkPyA6IFNlZWQpIHtcclxuICAgIHN1cGVyKHNlZWQpO1xyXG4gICAgdGhpcy4jbWFzayA9IDB4ZmZmZmZmZmY7XHJcbiAgICB0aGlzLiNtX3ogPSA5ODc2NTQzMjE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VyaWFsaXplICgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFzazogdGhpcy4jbWFzayxcclxuICAgICAgc2VlZDogdGhpcy5nZXRTZWVkKCksXHJcbiAgICAgIG1fejogdGhpcy4jbV96LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYW1lQXMgKG90aGVyOiBSbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHMgPSBvdGhlci5zZXJpYWxpemUoKTtcclxuICAgIHJldHVybiB0aGlzLiNzZWVkID09PSBzLnNlZWQgJiZcclxuICAgICAgdGhpcy4jbWFzayA9PT0gcy5tYXNrICYmXHJcbiAgICAgIHRoaXMuI21feiA9PT0gcy5tX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVuc2VyaWFsaXplIChzZXJpYWxpemVkIDogU2VyaWFsaXplZFJuZyk6IFJuZyB7XHJcbiAgICBjb25zdCBybmcgPSBuZXcgdGhpcygpO1xyXG4gICAgcm5nLnNldFNlZWQoc2VyaWFsaXplZC5zZWVkKTtcclxuICAgIHJuZy4jbWFzayA9IHNlcmlhbGl6ZWQubWFzaztcclxuICAgIHJuZy4jc2VlZCA9IHNlcmlhbGl6ZWQuc2VlZDtcclxuICAgIHJuZy4jbV96ID0gc2VyaWFsaXplZC5tX3o7XHJcbiAgICByZXR1cm4gcm5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlZWQgKGk/IDogU2VlZCk6IHRoaXMge1xyXG4gICAgc3VwZXIuc2VlZChpKTtcclxuICAgIHRoaXMuI21feiA9IDk4NzY1NDMyMTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9yYW5kb20gKCk6IG51bWJlciB7XHJcbiAgICB0aGlzLiNtX3ogPSAoMzY5NjkgKiAodGhpcy4jbV96ICYgNjU1MzUpICsgKHRoaXMuI21feiA+PiAxNikpICYgdGhpcy4jbWFzaztcclxuICAgIHRoaXMuc2V0U2VlZCgoMTgwMDAgKiAodGhpcy5nZXRTZWVkKCkgJiA2NTUzNSkgKyAodGhpcy5nZXRTZWVkKCkgPj4gMTYpKSAmIHRoaXMuI21hc2spO1xyXG4gICAgbGV0IHJlc3VsdCA9ICgodGhpcy4jbV96IDw8IDE2KSArIHRoaXMuZ2V0U2VlZCgpKSAmIHRoaXMuI21hc2s7XHJcbiAgICByZXN1bHQgLz0gNDI5NDk2NzI5NjtcclxuICAgIHJldHVybiByZXN1bHQgKyAwLjU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgUm5nQWJzdHJhY3QsXHJcbiAgUm5nSW50ZXJmYWNlLFxyXG4gIFNlZWRcclxufSBmcm9tICcuLy4uL3JuZyc7XHJcblxyXG4vKipcclxuICogQW4gUm5nIHR5cGUgdGhhdCBjYW4gYmUgdXNlZCB0byBnaXZlIHByZWRpY3RhYmxlIHJlc3VsdHNcclxuICogZm9yIHRlc3RpbmcgcHVycG9zZXMsIGFuZCBnaXZpbmcga25vd24gcmVzdWx0cy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJuZyBleHRlbmRzIFJuZ0Fic3RyYWN0IGltcGxlbWVudHMgUm5nSW50ZXJmYWNlIHtcclxuICBwdWJsaWMgY291bnRlciA9IDA7XHJcbiAgcHJvdGVjdGVkIF9yZXN1bHRzOiBudW1iZXJbXSA9IFswLCAwLjEsIDAuMiwgMC4zLCAwLjQsIDAuNSwgMC42LCAwLjcsIDAuOCwgMC45LCAxIC0gTnVtYmVyLkVQU0lMT05dO1xyXG4gIGNvbnN0cnVjdG9yIChzZWVkPyA6IFNlZWQsIHJlc3VsdHM/OiBudW1iZXJbXSkge1xyXG4gICAgc3VwZXIoc2VlZCk7XHJcbiAgICBpZiAocmVzdWx0cykge1xyXG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHJlc3VsdHMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBzZXQgcmVzdWx0cyAocmVzdWx0cykge1xyXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHByb3ZpZGUgc29tZSBmYWtlIHJlc3VsdHMuJyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0cykge1xyXG4gICAgICBpZiAociA8IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlc3VsdHMgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMCwgZ290ICcke3J9J2ApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyID49IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlc3VsdHMgbXVzdCBiZSBsZXNzIHRoYW4gMSwgZ290ICcke3J9J2ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yZXN1bHRzID0gcmVzdWx0cztcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBldmVuU3ByZWFkIChuIDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IChuIC0gMSk7IGkrKykge1xyXG4gICAgICBwLnB1c2goaSAvIChuIC0gMSkpO1xyXG4gICAgfVxyXG4gICAgcC5wdXNoKDEgLSBOdW1iZXIuRVBTSUxPTik7XHJcbiAgICByZXR1cm4gcDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRFdmVuU3ByZWFkIChuIDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmV2ZW5TcHJlYWQobik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYW1lQXMgKG90aGVyIDogUm5nKSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5zb3J0KCkuam9pbignLCcpID09PSBvdGhlci5yZXN1bHRzLnNvcnQoKS5qb2luKCcsJykgJiZcclxuICAgIHRoaXMuY291bnRlciA9PT0gb3RoZXIuY291bnRlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCAoKSB7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3JhbmRvbSAoKSA6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzW3RoaXMuY291bnRlcisrICUgdGhpcy5yZXN1bHRzLmxlbmd0aF07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xyXG5pbXBvcnQgeyBVbHRyYUxvb3QsIExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbiB9IGZyb20gJy4vdWx0cmFsb290JztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVQb29sLCBMb290VGFibGVQb29sRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUvcG9vbCc7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbiwgQ29uZGl0aW9uRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeSc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdCBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0cyBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0cyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgUk5HLCBSbmdJbnRlcmZhY2UsIENoYW5jeSB9IGZyb20gJy4vcm5nJztcclxuXHJcbi8qKlxyXG4gKiBPYmplY3QgdXNlZCB3aGVuIGNyZWF0aW5nIGEgbG9vdCB0YWJsZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZURlZmluaXRpb24gPSB7XHJcbiAgbmFtZSA/OiBzdHJpbmcsXHJcbiAgaWQgPzogc3RyaW5nLFxyXG4gIGZuID86IHN0cmluZyxcclxuICBybmcgPzogUm5nSW50ZXJmYWNlLFxyXG4gIHBvb2xzID86IEFycmF5PExvb3RUYWJsZVBvb2w+LFxyXG4gIHVsID86IFVsdHJhTG9vdCxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlID0gKHtcclxuICBybmcsXHJcbiAgbG9vdGVkLFxyXG4gIGxvb3RlcixcclxuICBjb250ZXh0LFxyXG4gIHJlc3VsdCxcclxuICBhcmdzXHJcbn06IHtcclxuICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICBsb290ZWQ6IGFueSxcclxuICBsb290ZXI6IGFueSxcclxuICBjb250ZXh0OiBhbnksXHJcbiAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgYXJnczogUmVjb3JkPHN0cmluZywgYW55PixcclxufSkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSA9ICh7XHJcbiAgcm5nLFxyXG4gIGxvb3RlZCxcclxuICBsb290ZXIsXHJcbiAgY29udGV4dCxcclxuICByZXN1bHQsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgbG9vdGVkOiBhbnksXHJcbiAgbG9vdGVyOiBhbnksXHJcbiAgY29udGV4dDogYW55LFxyXG4gIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gIGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbn0pID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVJvbGxJbnRlcmZhY2Uge1xyXG4gIGxvb3Rlcj86IGFueSxcclxuICBjb250ZXh0PzogYW55LFxyXG4gIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICBybmc/OiBSbmdJbnRlcmZhY2UsXHJcbiAgbj86IENoYW5jeSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVBvb2xSb2xsSW50ZXJmYWNlIHtcclxuICBwb29sOiBMb290VGFibGVQb29sLFxyXG4gIGxvb3Rlcj86IGFueSxcclxuICBjb250ZXh0PzogYW55LFxyXG4gIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICBybmc/OiBSbmdJbnRlcmZhY2UsXHJcbiAgbj86IENoYW5jeSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFRhYmxlIHtcclxuICBuYW1lID86IHN0cmluZztcclxuICBpZCA/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbGVuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVwcmVzZW50IHRoaXMgdGFibGVcclxuICAgKiB3aGVuIGl0IGlzIHNhdmVkIGFzIEpTT04uIFRoaXMgc2hvdWxkIGluY2x1ZGUgcmVsYXRpdmVcclxuICAgKiBwYXRoL2ZvbGRlciBuYW1lc1xyXG4gICAqL1xyXG4gIGZuID86IHN0cmluZztcclxuXHJcbiAgdWwgPzogVWx0cmFMb290O1xyXG4gIHJuZzogUm5nSW50ZXJmYWNlO1xyXG4gIHBvb2xzID86IEFycmF5PExvb3RUYWJsZVBvb2w+ID0gW107XHJcbiAgZnVuY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZT4gPSB7fTtcclxuICBjb25kaXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVDb25kaXRpb25TaWduYXR1cmU+ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcGFyZW50J3MgZnVuY3Rpb25zIHNob3VsZCBiZSBhdmFpbGFibGUgdG8gYW4gRW50cnkgdGFibGUgd2hlbiByb2xsaW5nLlxyXG4gICAqIEZvciB0aGlzIGNhc2UsIHdlIGhhdmUgdG8gXCJib3Jyb3dcIiB0aGUgcGFyZW50IHRhYmxlIHRvIGFsbG93IGZ1bmN0aW9ucy9cclxuICAgKiBjb25kaXRpb25zIHRvIGJlIHVzZWQgZnJvbSB0aGVyZSBpZiBuZWVkZWQuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGEgc2V0LCBzbyB3ZSBkb24ndCBlbmQgdXAgd2l0aCB0aGUgc2FtZSB0YWJsZSBpbiB0aGVyZSBtdWx0aXBsZSB0aW1lcy5cclxuICAgKi9cclxuICBib3Jyb3dlZDogU2V0PExvb3RUYWJsZT4gPSBuZXcgU2V0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIGRlZmluaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoeyBuYW1lLCBybmcsIGlkLCBwb29scyA9IFtdLCBmbiwgdWwgfSA6IExvb3RUYWJsZURlZmluaXRpb24gPSB7fSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucG9vbHMgPSBwb29scztcclxuICAgIHRoaXMuZm4gPSBmbjtcclxuICAgIHRoaXMudWwgPSB1bDtcclxuICAgIHRoaXMucm5nID0gcm5nID8/ICh1bCA/IHVsLmdldFJuZygpIDogbmV3IFJORygpKTtcclxuICAgIHRoaXMuaWQgPSBpZCA/PyB0aGlzLnJuZy51bmlxc3RyKDYpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVnaXN0ZXIgYSBmdW5jdGlvbiBmb3IgdXNlIGluIGxvb3QgcG9vbHNcclxuICByZWdpc3RlckZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIGZuOiBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5mdW5jdGlvbnNbbmFtZV0gPSBmbjtcclxuICB9XHJcblxyXG4gIC8vIFJlZ2lzdGVyIGEgY29uZGl0aW9uIGZ1bmN0aW9uIGZvciB1c2UgaW4gbG9vdCBwb29sc1xyXG4gIHJlZ2lzdGVyQ29uZGl0aW9uIChuYW1lOiBzdHJpbmcsIGZuOiBMb290VGFibGVDb25kaXRpb25TaWduYXR1cmUpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uc1tuYW1lXSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cmluZyB0byBiZSB1c2VkIGFzIGEgZmlsZW5hbWUgZm9yIHRoaXMgdGFibGUuXHJcbiAgICovXHJcbiAgZ2V0IGZpbGVuYW1lICgpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmZuID8/IHRoaXMuaWQgPz8gdGhpcy5uYW1lID8/IG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXQgZmlsZW5hbWUgKGZuKSB7XHJcbiAgICB0aGlzLmZuID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1bHRyYWxvb3QgaW5zdGFuY2VcclxuICAgKi9cclxuICBnZXQgdWx0cmFsb290ICgpIDogVWx0cmFMb290IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnVsO1xyXG4gIH1cclxuXHJcbiAgc2V0IHVsdHJhbG9vdCAodWwpIHtcclxuICAgIHRoaXMudWwgPSB1bDtcclxuICB9XHJcblxyXG4gIGdldCBkZXNjcmlwdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpYmUgKCkge1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHt0aGlzLmlkfV1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBbJHt0aGlzLmlkfV1gO1xyXG4gIH1cclxuXHJcbiAgYm9ycm93ICh0YWJsZTogTG9vdFRhYmxlKSB7XHJcbiAgICB0aGlzLmJvcnJvd2VkLmFkZCh0YWJsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVuYm9ycm93ICh0YWJsZTogTG9vdFRhYmxlKSB7XHJcbiAgICB0aGlzLmJvcnJvd2VkLmRlbGV0ZSh0YWJsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldFBvb2xzICgpIHtcclxuICAgIHJldHVybiB0aGlzLnBvb2xzO1xyXG4gIH1cclxuXHJcbiAgc2V0Um5nIChybmcgOiBSbmdJbnRlcmZhY2UpIHtcclxuICAgIHRoaXMucm5nID0gcm5nO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcm9sbEJhc2ljcyAoe1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIG4gPSAxXHJcbiAgfSA6IE9taXQ8VGFibGVSb2xsSW50ZXJmYWNlLCAncmVzdWx0Jz4pIDogW1JuZ0ludGVyZmFjZSwgbnVtYmVyXSB7XHJcbiAgICBjb25zdCBybmdUb1VzZSA9IHJuZyA/PyB0aGlzLnJuZztcclxuICAgIGNvbnN0IHJvbGxzID0gcm5nVG9Vc2UuY2hhbmN5KG4pO1xyXG4gICAgbG9nLmdjKGBUYWJsZTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgdGFibGUgJHtyb2xsc30gdGltZXMgKGZyb20gY2hhbmN5KCR7SlNPTi5zdHJpbmdpZnkobil9KSlgLCB7IGxvb3RlciwgY29udGV4dCB9KTtcclxuICAgIHJldHVybiBbcm5nVG9Vc2UsIHJvbGxzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGwgZm9yIGxvb3Qgb24gdGhpcyB0YWJsZVxyXG4gICAqXHJcbiAgICogVGhlIGxvb3RlciB3aWxsIGdlbmVyYWxseSBiZSB0aGUgcGxheWVyXHJcbiAgICogVGhlIGNvbnRleHQgd2lsbCBlaXRoZXIgYmUgYSBjb250YWluZXIgb3IgYSAnbW9uc3RlcicsIGJ1dCBtaWdodCBiZSBzb21ldGhpbmcgZWxzZSAod2hlcmUgdGhlIGxvb3QgaXMgY29taW5nIGZyb20pXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICByb2xsU3luYyAoe1xyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICAgIHJuZyxcclxuICAgIG4gPSAxXHJcbiAgfSA6IFRhYmxlUm9sbEludGVyZmFjZSA9IHt9KSA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyB7XHJcbiAgICBjb25zdCBbcm5nVG9Vc2UsIHJvbGxzXSA9IHRoaXMucm9sbEJhc2ljcyh7IHJuZywgbiwgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mIHRoaXMucG9vbHMpIHtcclxuICAgICAgdGhpcy5yb2xsUG9vbFN5bmMoe1xyXG4gICAgICAgIG46IHJvbGxzLFxyXG4gICAgICAgIHBvb2wsXHJcbiAgICAgICAgcm5nOiBybmdUb1VzZSxcclxuICAgICAgICBsb290ZXIsXHJcbiAgICAgICAgY29udGV4dCxcclxuICAgICAgICByZXN1bHRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2cuZ2UoKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsIGZvciBsb290IG9uIHRoaXMgdGFibGVcclxuICAgKlxyXG4gICAqIFRoZSBsb290ZXIgd2lsbCBnZW5lcmFsbHkgYmUgdGhlIHBsYXllclxyXG4gICAqIFRoZSBjb250ZXh0IHdpbGwgZWl0aGVyIGJlIGEgY29udGFpbmVyIG9yIGEgJ21vbnN0ZXInLCBidXQgbWlnaHQgYmUgc29tZXRoaW5nIGVsc2UgKHdoZXJlIHRoZSBsb290IGlzIGNvbWluZyBmcm9tKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvbGxEZWZpbml0aW9uXHJcbiAgICovXHJcbiAgYXN5bmMgcm9sbCAoe1xyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICAgIHJuZyxcclxuICAgIG4gPSAxXHJcbiAgfSA6IFRhYmxlUm9sbEludGVyZmFjZSA9IHt9KSA6IFByb21pc2U8TG9vdFRhYmxlRW50cnlSZXN1bHRzPiB7XHJcbiAgICBjb25zdCBbcm5nVG9Vc2UsIHJvbGxzXSA9IHRoaXMucm9sbEJhc2ljcyh7IHJuZywgbiwgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgbGV0IGkgPSAxO1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mIHRoaXMucG9vbHMpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yb2xsUG9vbCh7XHJcbiAgICAgICAgbjogcm9sbHMsXHJcbiAgICAgICAgcG9vbCxcclxuICAgICAgICBybmc6IHJuZ1RvVXNlLFxyXG4gICAgICAgIGxvb3RlcixcclxuICAgICAgICBjb250ZXh0LFxyXG4gICAgICAgIHJlc3VsdFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGwgZm9yIGxvb3Qgb24gYSBwb29sXHJcbiAgICpcclxuICAgKiBUaGUgbG9vdGVyIHdpbGwgZ2VuZXJhbGx5IGJlIHRoZSBwbGF5ZXJcclxuICAgKiBUaGUgY29udGV4dCB3aWxsIGVpdGhlciBiZSBhIGNvbnRhaW5lciBvciBhICdtb25zdGVyJywgYnV0IG1pZ2h0IGJlIHNvbWV0aGluZyBlbHNlICh3aGVyZSB0aGUgbG9vdCBpcyBjb21pbmcgZnJvbSlcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICByb2xsUG9vbFN5bmMgKHtcclxuICAgIHBvb2wsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVQb29sUm9sbEludGVyZmFjZSkgOiBMb290VGFibGVFbnRyeVJlc3VsdHMge1xyXG4gICAgY29uc3Qgcm5nVG9Vc2UgPSBybmcgPz8gdGhpcy5ybmc7XHJcbiAgICBjb25zdCByb2xscyA9IHJuZ1RvVXNlLmNoYW5jeShuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9sbHM7IGkrKykge1xyXG4gICAgICBwb29sLnJvbGxTeW5jKHsgcm5nLCB0YWJsZTogdGhpcywgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbCBmb3IgbG9vdCBvbiBhIHBvb2xcclxuICAgKlxyXG4gICAqIFRoZSBsb290ZXIgd2lsbCBnZW5lcmFsbHkgYmUgdGhlIHBsYXllclxyXG4gICAqIFRoZSBjb250ZXh0IHdpbGwgZWl0aGVyIGJlIGEgY29udGFpbmVyIG9yIGEgJ21vbnN0ZXInLCBidXQgbWlnaHQgYmUgc29tZXRoaW5nIGVsc2UgKHdoZXJlIHRoZSBsb290IGlzIGNvbWluZyBmcm9tKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvbGxEZWZpbml0aW9uXHJcbiAgICovXHJcbiAgYXN5bmMgcm9sbFBvb2wgKHtcclxuICAgIHBvb2wsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVQb29sUm9sbEludGVyZmFjZSkgOiBQcm9taXNlPExvb3RUYWJsZUVudHJ5UmVzdWx0cz4ge1xyXG4gICAgY29uc3Qgcm5nVG9Vc2UgPSBybmcgPz8gdGhpcy5ybmc7XHJcbiAgICBjb25zdCByb2xscyA9IHJuZ1RvVXNlLmNoYW5jeShuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9sbHM7IGkrKykge1xyXG4gICAgICBhd2FpdCBwb29sLnJvbGwoeyBybmcsIHRhYmxlOiB0aGlzLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBoYXNGdW5jdGlvbiAoZm4gOiBGdW5jdGlvbkRlZmluaXRpb24pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGhhc1NlbGYgPSAodHlwZW9mIHRoaXMuZnVuY3Rpb25zW2ZuLmZ1bmN0aW9uXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG4gICAgcmV0dXJuIGhhc1NlbGYgfHwgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKS5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgfHwgY3VyLmhhc0Z1bmN0aW9uKGZuKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29uZGl0aW9uIChjb25kIDogQ29uZGl0aW9uRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGFzU2VsZiA9ICh0eXBlb2YgdGhpcy5jb25kaXRpb25zW2NvbmQuZnVuY3Rpb25dICE9PSAndW5kZWZpbmVkJyk7XHJcbiAgICByZXR1cm4gaGFzU2VsZiB8fCBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyB8fCBjdXIuaGFzQ29uZGl0aW9uKGNvbmQpLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQb29sIChkZWY6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlUG9vbCB7XHJcbiAgICBjb25zdCBwb29sID0gbmV3IExvb3RUYWJsZVBvb2woZGVmKTtcclxuICAgIHRoaXMucG9vbHMucHVzaChwb29sKTtcclxuICAgIHJldHVybiBwb29sO1xyXG4gIH1cclxuXHJcbiAgYWRkUG9vbCAoZGVmOiBMb290VGFibGVQb29sIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uIHwgTG9vdFRhYmxlUG9vbERlZmluaXRpb24pIDogdGhpcyB7XHJcbiAgICBpZiAoKGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wpKSB7XHJcbiAgICAgIHRoaXMucG9vbHMucHVzaChkZWYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVQb29sKGRlZik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldFBvdGVudGlhbERyb3BzICgpIHtcclxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgcG9vbCBvZiB0aGlzLnBvb2xzKSB7XHJcbiAgICAgIGxldCB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcG9vbC5nZXRFbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IChlbnRyeS53ZWlnaHQgPz8gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJvbGxzTWF4ID0gUk5HLmNoYW5jeU1heChwb29sLnJvbGxzKTtcclxuICAgICAgY29uc3Qgcm9sbHNNaW4gPSBSTkcuY2hhbmN5TWluKHBvb2wucm9sbHMpO1xyXG4gICAgICBjb25zdCBudWxsc01pbiA9IFJORy5jaGFuY3lNaW4ocG9vbC5udWxscyk7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcG9vbC5nZXRFbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUgfHwgZW50cnkuaXNUYWJsZSgpKSB7XHJcbiAgICAgICAgICBsZXQgdGFibGU7XHJcbiAgICAgICAgICBsZXQgd2VpZ2h0O1xyXG4gICAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgICAgIHdlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHRhYmxlID0gZW50cnk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzVGFibGUoKSkge1xyXG4gICAgICAgICAgICB3ZWlnaHQgPSBlbnRyeS53ZWlnaHQgPz8gMTtcclxuICAgICAgICAgICAgdGFibGUgPSBlbnRyeS5nZXRJdGVtKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBtZXJnZSB0aGUgcmVzdWx0cy4uLlxyXG4gICAgICAgICAgY29uc3QgcGQgPSB0YWJsZS5nZXRQb3RlbnRpYWxEcm9wcygpO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBzdWJEcm9wIG9mIHBkKSB7XHJcbiAgICAgICAgICAgIGVudHJpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgZW50cnk6IHN1YkRyb3AuZW50cnksXHJcbiAgICAgICAgICAgICAgd2VpZ2h0OiBzdWJEcm9wLndlaWdodCAvIHdlaWdodCxcclxuICAgICAgICAgICAgICBtaW46IG51bGxzTWluID4gMCA/IDAgOiAocm9sbHNNaW4gKiBzdWJEcm9wLm1pbiksXHJcbiAgICAgICAgICAgICAgbWF4OiByb2xsc01heCAqIHN1YkRyb3AubWF4LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZW50cmllcy5wdXNoKHtcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIHdlaWdodDogZW50cnkud2VpZ2h0IC8gdG90YWxXZWlnaHQsXHJcbiAgICAgICAgICAgIG1pbjogbnVsbHNNaW4gPiAwID8gMCA6IChyb2xsc01pbiAqIFJORy5jaGFuY3lNaW4oZW50cnkucXR5KSksXHJcbiAgICAgICAgICAgIG1heDogcm9sbHNNYXggKiBSTkcuY2hhbmN5TWF4KGVudHJ5LnF0eSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyaWVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGZ1bmN0aW9uRGVmaW5pdGlvblxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgYXN5bmMgYXBwbHlGdW5jdGlvbiAoZnVuY3Rpb25EZWZpbml0aW9uOiBGdW5jdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBzdWJ0YWJsZS5hcHBseUZ1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVyciA9IGBGdW5jdGlvbiAke2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gdGFibGUucmVnaXN0ZXJGdW5jdGlvbihuYW1lLCBmdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnVsdHJhbG9vdC5hcHBseUZ1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC50aHJvd09uTWlzc2luZ0Z1bmN0aW9ucykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogZnVuY3Rpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBjb25kaXRpb25EZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBhc3luYyBhcHBseUNvbmRpdGlvbiAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc3VidGFibGUgb2YgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKSkge1xyXG4gICAgICAgIGlmIChzdWJ0YWJsZS5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBzdWJ0YWJsZS5hcHBseUNvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZXJyID0gYENvbmRpdGlvbiAke2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IHRhYmxlLnJlZ2lzdGVyQ29uZGl0aW9uKG5hbWUsIGNvbmRpdGlvbl9mdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0NvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudWx0cmFsb290LmFwcGx5Q29uZGl0aW9uKGNvbmRpdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51bHRyYWxvb3QudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogY29uZGl0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZnVuY3Rpb25EZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBhcHBseUZ1bmN0aW9uU3luYyAoZnVuY3Rpb25EZWZpbml0aW9uOiBGdW5jdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pOiB2b2lkIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBzdWJ0YWJsZS5hcHBseUZ1bmN0aW9uU3luYyhmdW5jdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBlcnIgPSBgRnVuY3Rpb24gJHtmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IHRhYmxlLnJlZ2lzdGVyRnVuY3Rpb24obmFtZSwgZnVuY3Rpb24pLmA7XHJcbiAgICAgIGlmICh0aGlzLnVsdHJhbG9vdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC5oYXNGdW5jdGlvbihmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy51bHRyYWxvb3QuYXBwbHlGdW5jdGlvblN5bmMoZnVuY3Rpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290LnRocm93T25NaXNzaW5nRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBmdW5jdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbmRpdGlvbkRlZmluaXRpb25cclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIGFwcGx5Q29uZGl0aW9uU3luYyAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc3VidGFibGUgb2YgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKSkge1xyXG4gICAgICAgIGlmIChzdWJ0YWJsZS5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBzdWJ0YWJsZS5hcHBseUNvbmRpdGlvblN5bmMoY29uZGl0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVyciA9IGBDb25kaXRpb24gJHtjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9ufSBoYXMgbm90IGJlZW4gZGVmaW5lZC4gRGlkIHlvdSBmb3JnZXQgdG8gcmVnaXN0ZXIgdGhlIGZ1bmN0aW9uIHdpdGggdGhpcyBsb290IHRhYmxlPyB0YWJsZS5yZWdpc3RlckNvbmRpdGlvbihuYW1lLCBjb25kaXRpb25fZnVuY3Rpb24pLmA7XHJcbiAgICAgIGlmICh0aGlzLnVsdHJhbG9vdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnVsdHJhbG9vdC5hcHBseUNvbmRpdGlvblN5bmMoY29uZGl0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb25kaXRpb25DYWxsUmVzdWx0ID0gdGhpcy5jb25kaXRpb25zW2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBjb25kaXRpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgIGlmIChjb25kaXRpb25DYWxsUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXR1cm4gcHJvbWlzZSBmcm9tIHN5bmMgY29uZGl0aW9uIGNhbGwnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25kaXRpb25DYWxsUmVzdWx0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSB9IGZyb20gJy4vLi4vdGFibGUnO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRW50cmllcyA9IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT47XHJcblxyXG4vKipcclxuICogRXhhbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGxvb3QgdGFibGUgbWFuYWdlci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3RUYWJsZU1hbmFnZXIge1xyXG4gIHB1YmxpYyB0YWJsZXM6IExvb3RUYWJsZUVudHJpZXMgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IgKHRhYmxlcyA6IExvb3RUYWJsZUVudHJpZXMgPSB7fSkge1xyXG4gICAgdGhpcy5hZGRUYWJsZXModGFibGVzKTtcclxuICB9XHJcblxyXG4gIGFkZFRhYmxlcyAodGFibGVzIDogTG9vdFRhYmxlRW50cmllcyB8IEFycmF5PExvb3RUYWJsZT4pIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhYmxlcykpIHtcclxuICAgICAgZm9yIChjb25zdCB0YWJsZSBvZiB0YWJsZXMpIHtcclxuICAgICAgICB0aGlzLmFkZFRhYmxlKHRhYmxlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChjb25zdCBba2V5LCB0YWJsZV0gb2YgT2JqZWN0LmVudHJpZXModGFibGVzKSkge1xyXG4gICAgICAgIHRoaXMuYWRkVGFibGUoa2V5LCB0YWJsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFibGUgKG5hbWUgOiBMb290VGFibGUgfCBzdHJpbmcsIHRhYmxlPzogTG9vdFRhYmxlIHwgc3RyaW5nKSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB0YWJsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFibGUgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgdGhpcy50YWJsZXNbbmFtZV0gPSB0YWJsZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhYmxlID09PSAnc3RyaW5nJyAmJiBuYW1lIGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgIHRoaXMudGFibGVzW3RhYmxlXSA9IG5hbWU7XHJcbiAgICB9IGVsc2UgaWYgKG5hbWUgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgdGhpcy50YWJsZXNbbmFtZS5pZF0gPSBuYW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhZGRpbmcgdGFibGUgLSBubyBsb290IHRhYmxlIGdpdmVuPycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRUYWJsZSAobmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMudGFibGVzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlIG5vdCB5ZXQgcmVnaXN0ZXJlZC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnRhYmxlc1tuYW1lXTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvZyBmcm9tICcuLy4uL2xvZyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgTG9vdFRhYmxlRW50cnksIExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiwgQ29uZGl0aW9uRGVmaW5pdGlvbiwgRnVuY3Rpb25EZWZpbml0aW9uIH0gZnJvbSAnLi9wb29sL2VudHJ5JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0IGZyb20gJy4vcG9vbC9lbnRyeS9yZXN1bHQnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHRzIGZyb20gJy4vcG9vbC9lbnRyeS9yZXN1bHRzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGUgfSBmcm9tICcuLy4uL3RhYmxlJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBSTkcsIFJuZ0ludGVyZmFjZSwgQ2hhbmN5IH0gZnJvbSAnLi8uLi9ybmcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb290VGFibGVQb29sRGVmaW5pdGlvbiB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBjb25kaXRpb25zPzogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj4sXHJcbiAgZnVuY3Rpb25zPzogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPixcclxuICByb2xscz86IENoYW5jeSxcclxuICBudWxscz86IENoYW5jeSxcclxuICBlbnRyaWVzPzogQXJyYXk8TG9vdFRhYmxlRW50cnkgfCBMb290VGFibGUgfCBMb290VGFibGVFbnRyeURlZmluaXRpb24+LFxyXG4gIHRlbXBsYXRlPzogUGFydGlhbDxMb290VGFibGVFbnRyeURlZmluaXRpb24+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3RQb29sIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjb25kaXRpb25zOiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPiA9IFtdO1xyXG4gIGZ1bmN0aW9uczogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPiA9IFtdO1xyXG4gIHJvbGxzOiBDaGFuY3kgPSAxO1xyXG4gIG51bGxzOiBDaGFuY3kgPSAwO1xyXG4gIGVudHJpZXM6IEFycmF5PExvb3RUYWJsZUVudHJ5IHwgTG9vdFRhYmxlPiA9IFtdO1xyXG4gIHRlbXBsYXRlOiBQYXJ0aWFsPExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbj4gPSB7fTtcclxuXHJcbiAgc3RhdGljIE5VTExLRVkgPSAnX19OVUxMX19mZDJhOTlkMi0yNmMwLTQ0NTQtYTI4NC0zNDU3OGI5NGUwZjYnO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgbG9vdCB0YWJsZSBwb29sIGRlZmluaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoe1xyXG4gICAgbmFtZSxcclxuICAgIGlkLFxyXG4gICAgY29uZGl0aW9ucyA9IFtdLFxyXG4gICAgZnVuY3Rpb25zID0gW10sXHJcbiAgICByb2xscyA9IDEsXHJcbiAgICBudWxscyA9IDAsXHJcbiAgICBlbnRyaWVzID0gW10sXHJcbiAgICB0ZW1wbGF0ZSxcclxuICB9IDogTG9vdFRhYmxlUG9vbERlZmluaXRpb24gPSB7fSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuY29uZGl0aW9ucyA9IGNvbmRpdGlvbnMgPz8gW107XHJcbiAgICB0aGlzLmZ1bmN0aW9ucyA9IGZ1bmN0aW9ucyA/PyBbXTtcclxuICAgIHRoaXMucm9sbHMgPSByb2xscztcclxuICAgIHRoaXMubnVsbHMgPSBudWxscztcclxuICAgIHRoaXMuaWQgPSBpZCA/PyAobmV3IFJORygpKS51bmlxc3RyKDYpO1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgaWYgKGVudHJpZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XHJcbiAgICAgICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBkZXNjcmlwdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpYmUgKCkge1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHt0aGlzLmlkfV1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBbJHt0aGlzLmlkfV1gO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRW50cnkgKGRlZjogTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IG5ldyBMb290VGFibGVFbnRyeSh7IC4uLih0aGlzLnRlbXBsYXRlID8/IHt9KSwgLi4uZGVmIH0pO1xyXG4gICAgdGhpcy5lbnRyaWVzLnB1c2goZW50cnkpO1xyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG4gIH1cclxuXHJcbiAgYWRkRW50cnkgKGVudHJ5OiBMb290VGFibGVFbnRyeSB8IExvb3RUYWJsZSB8IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiwgZGVmPzogT21pdDxMb290VGFibGVFbnRyeURlZmluaXRpb24sICdpZCc+KSA6IHRoaXMge1xyXG4gICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgIGVudHJ5ID0gbmV3IExvb3RUYWJsZUVudHJ5KHtcclxuICAgICAgICAuLi4odGhpcy50ZW1wbGF0ZSA/PyB7fSksXHJcbiAgICAgICAgLi4uKGRlZiA/PyB7fSksXHJcbiAgICAgICAgLi4ue1xyXG4gICAgICAgICAgaWQ6IGVudHJ5LmlkLFxyXG4gICAgICAgICAgaXRlbTogZW50cnksXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5KSB7XHJcbiAgICAgIHRoaXMuZW50cmllcy5wdXNoKGVudHJ5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlRW50cnkoZW50cnkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBnZXRFbnRyaWVzICgpIHtcclxuICAgIHJldHVybiB0aGlzLmVudHJpZXM7XHJcbiAgfVxyXG5cclxuICByb2xsUHJlYW1ibGUgKHsgcm5nIH0gOiB7IHJuZzogUm5nSW50ZXJmYWNlIH0pIDogW251bWJlciwgUmVjb3JkPHN0cmluZywgbnVtYmVyPl0ge1xyXG4gICAgY29uc3QgbnVtUm9sbHMgPSBybmcuY2hhbmN5SW50KHRoaXMucm9sbHMpO1xyXG5cclxuICAgIGxvZy5nYyhgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgUm9sbGluZyBwb29sICR7bnVtUm9sbHN9IHRpbWVzIChmcm9tIGNoYW5jeSgke0pTT04uc3RyaW5naWZ5KHRoaXMucm9sbHMpfSkpYCk7XHJcblxyXG4gICAgLy8gV2Ugc3RvcmUgYSBsaXN0IG9mIGtleS92YWx1ZSBjaG9pY2VzIHdpdGggdGhlaXIgd2VpZ2h0cyBpbiBhbiBhcnJheVxyXG4gICAgY29uc3QgY2hvaWNlcyA6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcclxuXHJcbiAgICAvLyBBIHNwZWNpYWwgTlVMTCBrZXkgdG8gdHJhY2sgbnVsbCByZXN1bHRzXHJcbiAgICBpZiAocm5nLmNoYW5jeSh0aGlzLm51bGxzKSA+IDApIHtcclxuICAgICAgY2hvaWNlc1tMb290UG9vbC5OVUxMS0VZXSA9IHJuZy5jaGFuY3kodGhpcy5udWxscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFwIHRoZSB3ZWlnaHRzIHRvIHBvc2l0aW9ucyBpbiBlbnRyaWVzLlxyXG4gICAgdGhpcy5lbnRyaWVzLmZvckVhY2goKGEsIGkpID0+IHtcclxuICAgICAgaWYgKGEgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICBjaG9pY2VzW2ldID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9pY2VzW2ldID0gcm5nLmNoYW5jeShhLndlaWdodCA/PyAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gW251bVJvbGxzLCBjaG9pY2VzXTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGwgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgY29uc3QgW251bVJvbGxzLCBjaG9pY2VzXSA9IHRoaXMucm9sbFByZWFtYmxlKHsgcm5nIH0pO1xyXG4gICAgY29uc3Qgb3ZlcmFsbEludGVybWVkaWF0ZSA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJvbGxzOyBpKyspIHtcclxuICAgICAgLy8gVGhpcyBpcyBvdXIgY2hvaWNlIGZyb20gdGhlIGNob2ljZXMgdGFibGVcclxuICAgICAgY29uc3QgY2hvaWNlID0gcm5nLndlaWdodGVkQ2hvaWNlKGNob2ljZXMpO1xyXG5cclxuICAgICAgLy8gVGhlbiwgdW5sZXNzIGl0IGlzIHRoZSBudWxsIGtleSwgd2UgZXh0cmFjdCBpdCFcclxuICAgICAgaWYgKGNob2ljZSAhPT0gTG9vdFBvb2wuTlVMTEtFWSkge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2Nob2ljZV07XHJcbiAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgICAvLyBJZiB0aGUgZW50cnkgaXMgYSBsb290IHRhYmxlLCB2b2lsYSAtIHdlIGNhbiByb2xsIGl0IGRpcmVjdGx5XHJcbiAgICAgICAgICBvdmVyYWxsSW50ZXJtZWRpYXRlLm1lcmdlKGF3YWl0IGVudHJ5LnJvbGwoeyBsb290ZXIsIGNvbnRleHQsIHJuZyB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5KSB7XHJcbiAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGNhbiByb2xsIHRoZSBlbnRyeSBpdHNlbGZcclxuICAgICAgICAgIGxvZy5nKGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIExvb3QgVGFibGUgRW50cnlgKTtcclxuICAgICAgICAgIG92ZXJhbGxJbnRlcm1lZGlhdGUubWVyZ2UoYXdhaXQgZW50cnkucm9sbCh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCB9KSk7XHJcbiAgICAgICAgICBsb2cuZ2UoKTtcclxuICAgICAgICAgIGlmIChlbnRyeS51bmlxdWUpIHtcclxuICAgICAgICAgICAgY2hvaWNlc1tjaG9pY2VdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEdvdCBudWxsIHJlc3VsdGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlbiB3ZSBwcm9jZXNzIGFsbCB0aGUgcmVzdWx0c1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzKG92ZXJhbGxJbnRlcm1lZGlhdGUsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICBsb2cuZ2UoKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICByb2xsU3luYyAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBjb25zdCBbbnVtUm9sbHMsIGNob2ljZXNdID0gdGhpcy5yb2xsUHJlYW1ibGUoeyBybmcgfSk7XHJcbiAgICBjb25zdCBvdmVyYWxsSW50ZXJtZWRpYXRlID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUm9sbHM7IGkrKykge1xyXG4gICAgICAvLyBUaGlzIGlzIG91ciBjaG9pY2UgZnJvbSB0aGUgY2hvaWNlcyB0YWJsZVxyXG4gICAgICBjb25zdCBjaG9pY2UgPSBybmcud2VpZ2h0ZWRDaG9pY2UoY2hvaWNlcyk7XHJcblxyXG4gICAgICAvLyBUaGVuLCB1bmxlc3MgaXQgaXMgdGhlIG51bGwga2V5LCB3ZSBleHRyYWN0IGl0IVxyXG4gICAgICBpZiAoY2hvaWNlICE9PSBMb290UG9vbC5OVUxMS0VZKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbY2hvaWNlXTtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIC8vIElmIHRoZSBlbnRyeSBpcyBhIGxvb3QgdGFibGUsIHZvaWxhIC0gd2UgY2FuIHJvbGwgaXQgZGlyZWN0bHlcclxuICAgICAgICAgIG92ZXJhbGxJbnRlcm1lZGlhdGUubWVyZ2UoZW50cnkucm9sbFN5bmMoeyBsb290ZXIsIGNvbnRleHQsIHJuZyB9KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5KSB7XHJcbiAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGNhbiByb2xsIHRoZSBlbnRyeSBpdHNlbGZcclxuICAgICAgICAgIGxvZy5nKGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIExvb3QgVGFibGUgRW50cnlgKTtcclxuICAgICAgICAgIG92ZXJhbGxJbnRlcm1lZGlhdGUubWVyZ2UoZW50cnkucm9sbFN5bmMoeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQgfSkpO1xyXG4gICAgICAgICAgbG9nLmdlKCk7XHJcbiAgICAgICAgICBpZiAoZW50cnkudW5pcXVlKSB7XHJcbiAgICAgICAgICAgIGNob2ljZXNbY2hvaWNlXSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBHb3QgbnVsbCByZXN1bHRgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZW4gd2UgcHJvY2VzcyBhbGwgdGhlIHJlc3VsdHNcclxuICAgIHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMob3ZlcmFsbEludGVybWVkaWF0ZSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHByb2Nlc3NFbnRyeVJlc3VsdHMgKGVudHJ5UmVzdWx0cyA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICAgIHtcclxuICAgICAgcm5nLFxyXG4gICAgICB0YWJsZSxcclxuICAgICAgbG9vdGVyLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICAgIH0gOiB7XHJcbiAgICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgICBsb290ZXI6IGFueSxcclxuICAgICAgY29udGV4dDogYW55LFxyXG4gICAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gICAgfSkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBlbnRyeVJlc3VsdCBvZiBlbnRyeVJlc3VsdHMpIHtcclxuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0KGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKTtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdHNTeW5jIChlbnRyeVJlc3VsdHMgOiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgICB7XHJcbiAgICAgIHJuZyxcclxuICAgICAgdGFibGUsXHJcbiAgICAgIGxvb3RlcixcclxuICAgICAgY29udGV4dCxcclxuICAgICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgICB9IDoge1xyXG4gICAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgICAgbG9vdGVyOiBhbnksXHJcbiAgICAgIGNvbnRleHQ6IGFueSxcclxuICAgICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICAgIH0pIHtcclxuICAgIGZvciAoY29uc3QgZW50cnlSZXN1bHQgb2YgZW50cnlSZXN1bHRzKSB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0U3luYyhlbnRyeVJlc3VsdCwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeVJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwcm9jZXNzRW50cnlSZXN1bHQgKGxvb3RlZCA6IExvb3RUYWJsZUVudHJ5UmVzdWx0LCB7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgYXdhaXQgdGFibGUuYXBwbHlGdW5jdGlvbihmbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgYWRkID0gdHJ1ZTtcclxuICAgIGZvciAoY29uc3QgY29uZCBvZiB0aGlzLmNvbmRpdGlvbnMpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uUmVzdWx0ID0gYXdhaXQgdGFibGUuYXBwbHlDb25kaXRpb24oY29uZCwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBUZXN0aW5nIGZ1bmN0aW9uIFwiJHtjb25kLmZ1bmN0aW9ufVwiIHJlc3VsdGVkIGluICR7SlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uUmVzdWx0KX1gKTtcclxuICAgICAgYWRkID0gYWRkICYmIGNvbmRpdGlvblJlc3VsdDtcclxuICAgICAgaWYgKCFhZGQpIHtcclxuICAgICAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgRnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgc3RvcHBlZCB0aGlzIGZyb20gYmVpbmcgYWRkZWRgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEFmdGVyIGFwcGx5aW5nIGNvbmRpdGlvbnMsIGFkZCB3YXMgJHtKU09OLnN0cmluZ2lmeShhZGQpfWApO1xyXG4gICAgaWYgKGFkZCAmJiBsb290ZWQucXR5ID4gMCkge1xyXG4gICAgICBpZiAobG9vdGVkLnN0YWNrYWJsZSkge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGxvb3RlZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb290ZWQucXR5OyBpKyspIHtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBMb290VGFibGVFbnRyeVJlc3VsdCh7IC4uLmxvb3RlZCwgLi4ueyBxdHk6IDEgfSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzRW50cnlSZXN1bHRTeW5jIChsb290ZWQgOiBMb290VGFibGVFbnRyeVJlc3VsdCwge1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgIHRhYmxlLmFwcGx5RnVuY3Rpb25TeW5jKGZuLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25SZXN1bHQgPSB0YWJsZS5hcHBseUNvbmRpdGlvblN5bmMoY29uZCwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBUZXN0aW5nIGZ1bmN0aW9uIFwiJHtjb25kLmZ1bmN0aW9ufVwiIHJlc3VsdGVkIGluICR7SlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uUmVzdWx0KX1gKTtcclxuICAgICAgYWRkID0gYWRkICYmIGNvbmRpdGlvblJlc3VsdDtcclxuICAgICAgaWYgKCFhZGQpIHtcclxuICAgICAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgRnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgc3RvcHBlZCB0aGlzIGZyb20gYmVpbmcgYWRkZWRgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEFmdGVyIGFwcGx5aW5nIGNvbmRpdGlvbnMsIGFkZCB3YXMgJHtKU09OLnN0cmluZ2lmeShhZGQpfWApO1xyXG4gICAgaWYgKGFkZCAmJiBsb290ZWQucXR5ID4gMCkge1xyXG4gICAgICBpZiAobG9vdGVkLnN0YWNrYWJsZSkge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGxvb3RlZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb290ZWQucXR5OyBpKyspIHtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBMb290VGFibGVFbnRyeVJlc3VsdCh7IC4uLmxvb3RlZCwgLi4ueyBxdHk6IDEgfSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBsb2cgZnJvbSAnLi8uLi8uLi9sb2cnO1xyXG5pbXBvcnQgTG9vdFRhYmxlIGZyb20gJy4vLi4vLi4vdGFibGUnO1xyXG5pbXBvcnQgeyBSbmdJbnRlcmZhY2UsIENoYW5jeSB9IGZyb20gJy4vLi4vLi4vcm5nJztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0IGZyb20gJy4vZW50cnkvcmVzdWx0JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0cyBmcm9tICcuL2VudHJ5L3Jlc3VsdHMnO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uID0ge1xyXG4gIG5hbWU/OiBzdHJpbmcsXHJcbiAgaWQ/OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgc3RhY2thYmxlPzogYm9vbGVhbixcclxuICB1bmlxdWU/OiBib29sZWFuLFxyXG4gIHdlaWdodD86IG51bWJlcixcclxuICBpdGVtPzogYW55LFxyXG4gIHF0eT86IENoYW5jeSxcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPlxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGdW5jdGlvbkRlZmluaXRpb24ge1xyXG4gIGZ1bmN0aW9uOiBzdHJpbmcsXHJcbiAgYXJndW1lbnRzPzogQXJyYXk8YW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmRpdGlvbkRlZmluaXRpb24ge1xyXG4gIGZ1bmN0aW9uOiBzdHJpbmcsXHJcbiAgYXJndW1lbnRzPzogQXJyYXk8YW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFRhYmxlRW50cnkge1xyXG4gIGlkPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHN0YWNrYWJsZT86IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHVuaXF1ZT86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIHdlaWdodDogbnVtYmVyID0gMTtcclxuICBpdGVtPzogYW55O1xyXG4gIHF0eT86IENoYW5jeSA9IDE7XHJcbiAgZnVuY3Rpb25zOiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+O1xyXG4gIGNvbmRpdGlvbnM6IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgbG9vdCB0YWJsZSBlbnRyeSBkZWZpbml0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IgKHtcclxuICAgIGlkLFxyXG4gICAgc3RhY2thYmxlID0gdHJ1ZSxcclxuICAgIHVuaXF1ZSA9IGZhbHNlLFxyXG4gICAgbmFtZSxcclxuICAgIHdlaWdodCA9IDEsXHJcbiAgICBpdGVtLFxyXG4gICAgZnVuY3Rpb25zID0gW10sXHJcbiAgICBjb25kaXRpb25zID0gW10sXHJcbiAgICBxdHkgPSAxLFxyXG4gIH0gOiBMb290VGFibGVFbnRyeURlZmluaXRpb24gPSB7fSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuc3RhY2thYmxlID0gc3RhY2thYmxlO1xyXG4gICAgdGhpcy51bmlxdWUgPSB1bmlxdWU7XHJcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcclxuICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnF0eSA9IHF0eTtcclxuICAgIHRoaXMuZnVuY3Rpb25zID0gZnVuY3Rpb25zID8/IFtdO1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucyA/PyBbXTtcclxuICB9XHJcblxyXG4gIGdldCBkZXNjcmlwdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpYmUgKCkge1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHt0aGlzLmlkfV1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBbJHt0aGlzLmlkfV1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtID8/IHRoaXMuaWQ7XHJcbiAgfVxyXG5cclxuICBkZWVwQ2xvbmVPYmplY3QgKG9iOiBvYmplY3QpIHtcclxuICAgIC8vIFNpbXBsZXN0IHdheSB0byBkZWVwIGNsb25lIGEgc2ltcGxlIG9iamVjdC5cclxuICAgIC8vIEFueXRoaW5nIG1vcmUgY29tcGxleCB3aWxsIGhhdmUgdG8gaW1wbGVtZW50IGEgXCJjbG9uZVwiIGZ1bmN0aW9uLlxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2IpKTtcclxuICB9XHJcblxyXG4gIGNsb25lSXRlbSAoKSB7XHJcbiAgICBpZiAodGhpcy5pdGVtID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLml0ZW0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5pdGVtLmNsb25lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS5jbG9uZSh0aGlzLml0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIZXJlIHdlIGhhdmUgdG8gZG8gYSBkZWVwIGNsb25lLCBiZWNhdXNlIGlmIHdlIG9ubHkgZG9cclxuICAgICAgLy8gYSBzaGFsbG93IGNsb25lLCBhbnkgbmVzdGVkIHByb3BlcnRpZXMgd2lsbCBiZSBwZXJzaXN0ZWQgYWNyb3NzXHJcbiAgICAgIC8vIHJvbGxzLCB3aGljaCBpcyBwcm9iYWJseSBub3Qgd2hhdCB3ZSB3YW50LlxyXG4gICAgICByZXR1cm4gdGhpcy5kZWVwQ2xvbmVPYmplY3QodGhpcy5pdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLml0ZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1RhYmxlICgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdldEl0ZW0oKSBpbnN0YW5jZW9mIExvb3RUYWJsZTtcclxuICB9XHJcblxyXG4gIHJlc3VsdERlZmluaXRpb24gKHJuZzogUm5nSW50ZXJmYWNlKSB7XHJcbiAgICBjb25zdCBkZWYgPSB7XHJcbiAgICAgIGlkOiB0aGlzLmlkLFxyXG4gICAgICBzdGFja2FibGU6IHRoaXMuc3RhY2thYmxlLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIGl0ZW06IHRoaXMuY2xvbmVJdGVtKCksXHJcbiAgICAgIHF0eTogcm5nLmNoYW5jeSh0aGlzLnF0eSlcclxuICAgIH07XHJcbiAgICByZXR1cm4gZGVmO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVCYXNlUmVzdWx0cyAocm5nOiBSbmdJbnRlcmZhY2UpIHtcclxuICAgIGNvbnN0IGRlZiA9IHRoaXMucmVzdWx0RGVmaW5pdGlvbihybmcpO1xyXG4gICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoW25ldyBMb290VGFibGVFbnRyeVJlc3VsdChkZWYpXSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyByb2xsICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCksXHJcbiAgfSA6IHtcclxuICAgIHJuZz86IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIDogUHJvbWlzZTxMb290VGFibGVFbnRyeVJlc3VsdHM+IHtcclxuICAgIGlmICh0aGlzLmlzVGFibGUoKSkge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5yb2xsVGFibGUoeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJvbGxJdGVtKHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyByb2xsSXRlbSAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIEl0ZW0gZm9yICR7dGhpcy5pZH1gLCB7IGxvb3RlciwgY29udGV4dCB9KTtcclxuICAgIGF3YWl0IHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0cyh0aGlzLmdlbmVyYXRlQmFzZVJlc3VsdHMocm5nKSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByb2xsVGFibGUgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgLy8gbG9nLmQoYEVudHJ5OiAke3RoaXMuZGVzY3JpcHRpb259IHwgUm9sbGluZyBUYWJsZSBmb3IgJHt0aGlzLmlkfWAsIHtsb290ZXIsIGNvbnRleHR9KTtcclxuICAgIGNvbnN0IGVudHJ5UmVzdWx0cyA9IGF3YWl0IHRoaXMuZ2V0SXRlbSgpLmJvcnJvdyh0YWJsZSkucm9sbCh7IGxvb3RlciwgY29udGV4dCwgcmVzdWx0OiBbXSwgcm5nLCBuOiB0aGlzLnF0eSB9KTtcclxuICAgIHRoaXMuZ2V0SXRlbSgpLnVuYm9ycm93KHRhYmxlKTtcclxuICAgIGF3YWl0IHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0cyhlbnRyeVJlc3VsdHMsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcHJvY2Vzc0VudHJ5UmVzdWx0cyAoZW50cnlSZXN1bHRzIDogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gICAge1xyXG4gICAgICBybmcsXHJcbiAgICAgIHRhYmxlLFxyXG4gICAgICBsb290ZXIsXHJcbiAgICAgIGNvbnRleHQsXHJcbiAgICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gICAgfSA6IHtcclxuICAgICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICAgIGxvb3RlcjogYW55LFxyXG4gICAgICBjb250ZXh0OiBhbnksXHJcbiAgICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgICB9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGVudHJ5UmVzdWx0IG9mIGVudHJ5UmVzdWx0cykge1xyXG4gICAgICBhd2FpdCB0aGlzLnByb2Nlc3NFbnRyeVJlc3VsdChlbnRyeVJlc3VsdCwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeVJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwcm9jZXNzRW50cnlSZXN1bHQgKGVudHJ5UmVzdWx0IDogTG9vdFRhYmxlRW50cnlSZXN1bHQsIHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLmZ1bmN0aW9ucykge1xyXG4gICAgICBhd2FpdCB0YWJsZS5hcHBseUZ1bmN0aW9uKGZuLCB7IHJuZywgbG9vdGVkOiBlbnRyeVJlc3VsdCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9XHJcbiAgICBsZXQgYWRkID0gdHJ1ZTtcclxuICAgIGZvciAoY29uc3QgY29uZCBvZiB0aGlzLmNvbmRpdGlvbnMpIHtcclxuICAgICAgYWRkID0gYWRkICYmIGF3YWl0IHRhYmxlLmFwcGx5Q29uZGl0aW9uKGNvbmQsIHsgcm5nLCBsb290ZWQ6IGVudHJ5UmVzdWx0LCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgaWYgKCFhZGQpIHtcclxuICAgICAgICBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBGdW5jdGlvbiBcIiR7Y29uZC5mdW5jdGlvbn1cIiBzdG9wcGVkIHRoaXMgZnJvbSBiZWluZyBhZGRlZGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBBZnRlciBhcHBseWluZyBjb25kaXRpb25zLCBhZGQgd2FzICR7SlNPTi5zdHJpbmdpZnkoYWRkKX1gKTtcclxuICAgIGlmIChhZGQgJiYgZW50cnlSZXN1bHQucXR5ID4gMCkge1xyXG4gICAgICBpZiAoZW50cnlSZXN1bHQuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goZW50cnlSZXN1bHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cnlSZXN1bHQucXR5OyBpKyspIHtcclxuICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBMb290VGFibGVFbnRyeVJlc3VsdCh7IC4uLmVudHJ5UmVzdWx0LCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvbGxTeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCksXHJcbiAgfSA6IHtcclxuICAgIHJuZz86IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIDogTG9vdFRhYmxlRW50cnlSZXN1bHRzIHtcclxuICAgIGlmICh0aGlzLmlzVGFibGUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb2xsVGFibGVTeW5jKHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb2xsSXRlbVN5bmMoeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvbGxJdGVtU3luYyAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIEl0ZW0gZm9yICR7dGhpcy5pZH1gLCB7IGxvb3RlciwgY29udGV4dCB9KTtcclxuICAgIHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmModGhpcy5nZW5lcmF0ZUJhc2VSZXN1bHRzKHJuZyksIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcm9sbFRhYmxlU3luYyAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICAvLyBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIFRhYmxlIGZvciAke3RoaXMuaWR9YCwge2xvb3RlciwgY29udGV4dH0pO1xyXG4gICAgY29uc3QgZW50cnlSZXN1bHRzID0gdGhpcy5nZXRJdGVtKCkuYm9ycm93KHRhYmxlKS5yb2xsU3luYyh7IGxvb3RlciwgY29udGV4dCwgcmVzdWx0OiBbXSwgcm5nLCBuOiB0aGlzLnF0eSB9KTtcclxuICAgIHRoaXMuZ2V0SXRlbSgpLnVuYm9ycm93KHRhYmxlKTtcclxuICAgIHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMoZW50cnlSZXN1bHRzLCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdHNTeW5jIChlbnRyeVJlc3VsdHMgOiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgICB7XHJcbiAgICAgIHJuZyxcclxuICAgICAgdGFibGUsXHJcbiAgICAgIGxvb3RlcixcclxuICAgICAgY29udGV4dCxcclxuICAgICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgICB9IDoge1xyXG4gICAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgICAgbG9vdGVyOiBhbnksXHJcbiAgICAgIGNvbnRleHQ6IGFueSxcclxuICAgICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICAgIH0pIHtcclxuICAgIGZvciAoY29uc3QgZW50cnlSZXN1bHQgb2YgZW50cnlSZXN1bHRzKSB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0U3luYyhlbnRyeVJlc3VsdCwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeVJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzRW50cnlSZXN1bHRTeW5jIChsb290ZWQgOiBMb290VGFibGVFbnRyeVJlc3VsdCwge1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgIHRhYmxlLmFwcGx5RnVuY3Rpb25TeW5jKGZuLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBhZGQgPSBhZGQgJiYgdGFibGUuYXBwbHlDb25kaXRpb25TeW5jKGNvbmQsIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEZ1bmN0aW9uIFwiJHtjb25kLmZ1bmN0aW9ufVwiIHN0b3BwZWQgdGhpcyBmcm9tIGJlaW5nIGFkZGVkYCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEFmdGVyIGFwcGx5aW5nIGNvbmRpdGlvbnMsIGFkZCB3YXMgJHtKU09OLnN0cmluZ2lmeShhZGQpfWApO1xyXG4gICAgaWYgKGFkZCAmJiBsb290ZWQucXR5ID4gMCkge1xyXG4gICAgICBpZiAobG9vdGVkLnN0YWNrYWJsZSB8fCBsb290ZWQucXR5ID09PSAxKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobG9vdGVkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3RlZC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4ubG9vdGVkLCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFRhYmxlRW50cnlSZXN1bHQge1xyXG4gIGlkPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHN0YWNrYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBpdGVtPzogYW55O1xyXG4gIHF0eT86IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvciAoe1xyXG4gICAgaWQsXHJcbiAgICBzdGFja2FibGUgPSB0cnVlLFxyXG4gICAgbmFtZSxcclxuICAgIGl0ZW0sXHJcbiAgICBxdHlcclxuICB9OiB7XHJcbiAgICBpZD86IG51bWJlciB8IHN0cmluZyxcclxuICAgIHN0YWNrYWJsZT86IGJvb2xlYW4sXHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAgaXRlbT86IGFueSxcclxuICAgIHF0eT86IG51bWJlcixcclxuICB9ID0ge30pIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgdGhpcy5xdHkgPSBxdHk7XHJcbiAgICB0aGlzLnN0YWNrYWJsZSA9IHN0YWNrYWJsZTtcclxuICB9XHJcblxyXG4gIGdldCBkZXNjcmlwdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpYmUgKCkge1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHt0aGlzLmlkfV1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBbJHt0aGlzLmlkfV1gO1xyXG4gIH1cclxuXHJcbiAgZ2V0UXR5ICgpIHtcclxuICAgIHJldHVybiB0aGlzLnF0eTtcclxuICB9XHJcblxyXG4gIHNldFF0eSAobjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnF0eSA9IG47XHJcbiAgfVxyXG5cclxuICBhZGRRdHkgKG46IG51bWJlcikge1xyXG4gICAgdGhpcy5xdHkgPSB0aGlzLnF0eSArIG47XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdCBmcm9tICcuL3Jlc3VsdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGVFbnRyeVJlc3VsdHMgZXh0ZW5kcyBBcnJheTxMb290VGFibGVFbnRyeVJlc3VsdD4ge1xyXG4gIGNvbnN0cnVjdG9yIChkb2N1bWVudHM/OiBBcnJheTxMb290VGFibGVFbnRyeVJlc3VsdD4gfCBudW1iZXIpIHtcclxuICAgIGlmIChkb2N1bWVudHMgaW5zdGFuY2VvZiBBcnJheSkgc3VwZXIoLi4uZG9jdW1lbnRzKTtcclxuICAgIGVsc2UgaWYgKGRvY3VtZW50cykgc3VwZXIoZG9jdW1lbnRzKTtcclxuICAgIGVsc2Ugc3VwZXIoKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBPYmplY3QuY3JlYXRlKExvb3RUYWJsZUVudHJ5UmVzdWx0cy5wcm90b3R5cGUpKTtcclxuICB9XHJcblxyXG4gIG1lcmdlIChvdGhlcjogTG9vdFRhYmxlRW50cnlSZXN1bHRzKSB7XHJcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIG90aGVyKSB7XHJcbiAgICAgIHRoaXMucHVzaChlbnRyeSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIG1lcmdlZCAob3RoZXI6IExvb3RUYWJsZUVudHJ5UmVzdWx0cykge1xyXG4gICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoWy4uLnRoaXMsIC4uLm90aGVyXSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZW50cnlTaWduYXR1cmUgKGVudHJ5OiBMb290VGFibGVFbnRyeVJlc3VsdCkge1xyXG4gICAgY29uc3QgZW50cnlXaXRob3V0UXR5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBPYmplY3QuZW50cmllcyhlbnRyeSkpIHtcclxuICAgICAgaWYgKGsgIT09ICdpZCcpIHtcclxuICAgICAgICBlbnRyeVdpdGhvdXRRdHlba10gPSB2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZW50cnkpO1xyXG4gIH1cclxuXHJcbiAgY29sbGFwc2VkICgpIHtcclxuICAgIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlRW50cnlSZXN1bHQ+ID0ge307XHJcbiAgICBjb25zdCBvdGhlcjogTG9vdFRhYmxlRW50cnlSZXN1bHRbXSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBvYiBvZiB0aGlzKSB7XHJcbiAgICAgIGlmIChvYi5zdGFja2FibGUpIHtcclxuICAgICAgICBjb25zdCBzaWcgPSB0aGlzLmVudHJ5U2lnbmF0dXJlKG9iKTtcclxuICAgICAgICBpZiAoIW1hcFtzaWddKSB7XHJcbiAgICAgICAgICBtYXBbc2lnXSA9IG9iO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXBbc2lnXS5hZGRRdHkob2IucXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3RoZXIucHVzaChvYik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKFsuLi5vdGhlciwgLi4uT2JqZWN0LnZhbHVlcyhtYXApXSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSwgTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUsIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSwgTG9vdFRhYmxlRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZVBvb2wsIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIH0gZnJvbSAnLi90YWJsZS9wb29sJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVFbnRyeSwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBGdW5jdGlvbkRlZmluaXRpb24sIENvbmRpdGlvbkRlZmluaXRpb24gfSBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnknO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdHMgZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFJORywgU2VlZCwgUm5nSW50ZXJmYWNlLCBSbmdDb25zdHJ1Y3RvciwgQ2hhbmN5IH0gZnJvbSAnLi9ybmcnO1xyXG5pbXBvcnQgeyB2ZXJzaW9uIGFzIENVUlJFTlRfVkVSU0lPTiB9IGZyb20gJy4vLi4vcGFja2FnZS5qc29uJztcclxuaW1wb3J0ICogYXMgZGVmYXVsdEZ1bmN0aW9ucyBmcm9tICcuL2RlZmF1bHQvZnVuY3Rpb25zJztcclxuaW1wb3J0ICogYXMgZGVmYXVsdENvbmRpdGlvbnMgZnJvbSAnLi9kZWZhdWx0L2NvbmRpdGlvbnMnO1xyXG5cclxuLy8gU2V0IGZzIHByb3Blcmx5IGlmIHdlIGFyZSBpbiBub2RlIGVudmlyb25tZW50XHJcbmxldCBmcyA6IGFueTtcclxubGV0IGlzTm9kZSA9IGZhbHNlO1xyXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnKSB7XHJcbiAgaWYgKHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zID09PSAnb2JqZWN0Jykge1xyXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICAgICAgaXNOb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IFZFUlNJT05fS0VZID0gJ19fdmVyc2lvbl9fJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGZvciBlYXNpbHkgY3JlYXRpbmcgbG9vdCB0YWJsZXMgdXNpbmcgYSBqc29uIGxpa2VcclxuICogb2JqZWN0IGluc3RlYWQgb2YgYWxsIHRoZSBzcGVjaWZpYyBsb290IHRhYmxlIG9iamVjdHNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUVhc3lEZWZpbml0aW9uID0ge1xyXG4gIG5hbWU/OiBzdHJpbmcsXHJcbiAgaWQ/OiBzdHJpbmcsXHJcbiAgcm5nPzogc3RyaW5nIHwgbnVtYmVyIHwgUm5nSW50ZXJmYWNlLFxyXG4gIHBvb2xzPzogQXJyYXk8TG9vdFRhYmxlUG9vbCB8IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbj4sXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBmb3IgZWFzaWx5IGNyZWF0aW5nIGxvb3QgdGFibGUgcG9vbHMgdXNpbmcgYSBqc29uIGxpa2VcclxuICogb2JqZWN0IGluc3RlYWQgb2YgYWxsIHRoZSBzcGVjaWZpYyBsb290IHRhYmxlIG9iamVjdHNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbiA9IHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPixcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIHRlbXBsYXRlPzogTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLFxyXG4gIHJvbGxzPzogQ2hhbmN5LFxyXG4gIG51bGxzPzogQ2hhbmN5LFxyXG4gIGVudHJpZXM/OiBBcnJheTxMb290VGFibGVFbnRyeSB8IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiB8IExvb3RUYWJsZT4sXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBkZWZpbmVzIGhvdyBhIExvb3RUYWJsZSBpcyBzdG9yZWQgaW4gSlNPTiBmaWxlc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlSnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBmbj86IHN0cmluZyxcclxuICBybmc/OiBzdHJpbmcgfCBudW1iZXIgfCBSbmdJbnRlcmZhY2UsXHJcbiAgcG9vbHM/OiBBcnJheTxMb290VGFibGVQb29sSnNvbkRlZmluaXRpb24+LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGVmaW5lcyBob3cgYSBMb290VGFibGVQb29sIGlzIHN0b3JlZCBpbiBKU09OIGZpbGVzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBMb290VGFibGVQb29sSnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBjb25kaXRpb25zPzogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj4sXHJcbiAgZnVuY3Rpb25zPzogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPixcclxuICByb2xscz86IENoYW5jeSxcclxuICBudWxscz86IENoYW5jeSxcclxuICBlbnRyaWVzOiBBcnJheTxMb290VGFibGVFbnRyeUpzb25EZWZpbml0aW9uPixcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRlZmluZXMgaG93IGEgTG9vdFRhYmxlRW50cnkgaXMgc3RvcmVkIGluIEpTT04gZmlsZXNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUVudHJ5SnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gIHR5cGU/OiBzdHJpbmcsXHJcbiAgc3RhY2thYmxlPzogYm9vbGVhbixcclxuICB3ZWlnaHQ/OiBudW1iZXIsXHJcbiAgaXRlbT86IGFueSxcclxuICBxdHk/OiBDaGFuY3ksXHJcbiAgZnVuY3Rpb25zPzogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPixcclxuICBjb25kaXRpb25zPzogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj5cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVUYWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZFRhYmxlcyB7XHJcbiAgW1ZFUlNJT05fS0VZXTogc3RyaW5nLFxyXG4gIHRhYmxlczogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlSnNvbkRlZmluaXRpb24+XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIExvYWRTYXZlQXJncyA9IHsgZGVmYXVsdEV4dGVuc2lvbj86IHN0cmluZywgcGF0aD86IHN0cmluZyB9O1xyXG5cclxuLyoqXHJcbiAqIEB0b2RvIGRldGVjdCByZWN1cnNpdmVseSByZXF1aXJlZCB0YWJsZXNcclxuICogQGV4YW1wbGVcclxuICogaW1wb3J0IHtVbHRyYUxvb3R9IGZyb20gXCJ1bHRyYWxvb3RcIjtcclxuICpcclxuICogY29uc3QgdWx0cmFsb290RGVmYXVsdFJuZyA9IG5ldyBVbHRyYUxvb3QoKTsgICAgICAgICAgIC8vIGRlZmF1bHQgUk5HXHJcbiAqIGNvbnN0IHVsdHJhbG9vdEN1c3RvbVJuZyA9IG5ldyBVbHRyYUxvb3QoXCJVTDdSNEwwMDdcIik7IC8vIHNlZWRpbmcgdGhlIGJ1aWx0IGluIFJOR1xyXG4gKiBjb25zdCB1bHRyYWxvb3RDdXN0b21SbmcgPSBuZXcgVWx0cmFMb290KHJuZ1NvdXJjZSk7ICAgLy8gdXNpbmcgYSBjdXN0b20gUk5HXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVWx0cmFMb290IHtcclxuICAvKipcclxuICAgKiBEZWZhdWx0IFJORyBzb3VyY2Ugd2hlbiBub25lIGlzIGdpdmVuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRlZmF1bHRSbmc6IFJuZ0ludGVyZmFjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUk5HIHNvdXJjZSBnaXZlbiBieSB0aGUgZW5kIHVzZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcm5nPzogUm5nSW50ZXJmYWNlO1xyXG5cclxuICAvKipcclxuICAgKiBSTkcgQ29uc3RydWN0b3IgZm9yIG1ha2luZyBuZXcgUk5Hc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBybmdDb25zdHJ1Y3Rvcj86IFJuZ0NvbnN0cnVjdG9yO1xyXG5cclxuICAvKipcclxuICAgKiBHbG9iYWwgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgbG9vdCB0YWJsZSBlbnRyaWVzLlxyXG4gICAqXHJcbiAgICogVGhlIGtleXMgaW4gdGhlIG9iamVjdCBhcmUgdGhlIGZ1bmN0aW9uIGlkZW50aWZpZXIgdXNlZCBpbiB0aGUgdGFibGUgZW50cmllc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmdW5jdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlPiA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBHbG9iYWwgY29uZGl0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IGxvb3QgdGFibGUgcG9vbHMgYW5kIGVudHJpZXMuXHJcbiAgICpcclxuICAgKiBUaGUga2V5cyBpbiB0aGUgb2JqZWN0IGFyZSB0aGUgZnVuY3Rpb24gaWRlbnRpZmllciB1c2VkIGluIHRoZSB0YWJsZSBlbnRyaWVzL3Bvb2xzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGNvbmRpdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZT4gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byB0aHJvdyBlcnJvcnMgd2hlbiBmdW5jdGlvbnMgYXJlIG1pc3NpbmcsIG90aGVyd2lzZSBqdXN0IGRvZXMgY29uc29sZS5lcnJvclxyXG4gICAqL1xyXG4gIHB1YmxpYyB0aHJvd09uTWlzc2luZ0Z1bmN0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gdGhyb3cgZXJyb3JzIHdoZW4gY29uZGl0aW9ucyBhcmUgbWlzc2luZywgb3RoZXJ3aXNlIGp1c3QgZG9lcyBjb25zb2xlLmVycm9yXHJcbiAgICovXHJcbiAgcHVibGljIHRocm93T25NaXNzaW5nQ29uZGl0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yIChybmc/OiBTZWVkIHwgUm5nSW50ZXJmYWNlKSB7XHJcbiAgICBsb2cuZCgnVWx0cmFMb290IGluaXRpYWxpc2luZycpO1xyXG4gICAgaWYgKHJuZykge1xyXG4gICAgICB0aGlzLnJuZyA9IHRoaXMubWFrZVJuZyhybmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyRGVmYXVsdHMgKCkge1xyXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHRGdW5jdGlvbnMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0Q29uZGl0aW9ucygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJEZWZhdWx0RnVuY3Rpb25zICgpIHtcclxuICAgIGZvciAoY29uc3QgW2tleSwgZm5dIG9mIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRGdW5jdGlvbnMpKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJGdW5jdGlvbihrZXksIGZuKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyRGVmYXVsdENvbmRpdGlvbnMgKCkge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCBmbl0gb2YgT2JqZWN0LmVudHJpZXMoZGVmYXVsdENvbmRpdGlvbnMpKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb25kaXRpb24oa2V5LCBmbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFzIHdlIGRvbnQgZXhwb3NlIHRoZSBjbGFzcyBhcyBkZWZhdWx0LCBpbiBicm93c2VyIGl0IHdvdWxkIGJlIG5pY2VcclxuICAgKiBpZiB0aGVyZSB3YXMgYSB3YXkgdG8gY3JlYXRlIG5ldyBpbnN0YW5jZXMuIFRoaXMgY2FuIGJlIGRvbmUgdXNpbmdcclxuICAgKiB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbnN0YW5jZSAocm5nPzogU2VlZCB8IFJuZ0ludGVyZmFjZSk6IFVsdHJhTG9vdCB7XHJcbiAgICByZXR1cm4gbmV3IFVsdHJhTG9vdChybmcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFJuZyAocm5nOiBSbmdJbnRlcmZhY2UpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1JuZyhybmcpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcigncm5nIGdpdmVuIGRvZXMgbm90IGNvbmZpcm0gdG8gUm5nSW50ZXJmYWNlJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJuZyA9IHJuZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSbmcgKCk6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5ybmcgPz8gdGhpcy5nZXREZWZhdWx0Um5nKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGVmYXVsdFJuZyAoKTogUm5nSW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0aGlzLmRlZmF1bHRSbmcgPz8gKHRoaXMuZGVmYXVsdFJuZyA9IHRoaXMubWFrZVJuZygpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRSbmdDb25zdHJ1Y3RvciAocm5nQ29uc3RydWN0b3I6IFJuZ0NvbnN0cnVjdG9yKTogdm9pZCB7XHJcbiAgICB0aGlzLnJuZ0NvbnN0cnVjdG9yID0gcm5nQ29uc3RydWN0b3I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Um5nQ29uc3RydWN0b3IgKCk6IFJuZ0NvbnN0cnVjdG9yIHtcclxuICAgIHJldHVybiB0aGlzLnJuZ0NvbnN0cnVjdG9yID8/IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLnJuZykuY29uc3RydWN0b3I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNSbmcgKHJuZz86IGFueSk6IHJuZyBpcyBSbmdJbnRlcmZhY2Uge1xyXG4gICAgaWYgKHR5cGVvZiBybmcgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygcm5nICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZWVkZWRGdW5jdGlvbnMgPSBbXHJcbiAgICAgICdwcmVkaWN0YWJsZScsXHJcbiAgICAgICdoYXNoU3RyJyxcclxuICAgICAgJ2NvbnZlcnRTdHJpbmdUb051bWJlcicsXHJcbiAgICAgICdnZXRTZWVkJyxcclxuICAgICAgJ3NlZWQnLFxyXG4gICAgICAncGVyY2VudGFnZScsXHJcbiAgICAgICdyYW5kb20nLFxyXG4gICAgICAnY2hhbmNlJyxcclxuICAgICAgJ2NoYW5jZVRvJyxcclxuICAgICAgJ3JhbmRJbnQnLFxyXG4gICAgICAndW5pcWlkJyxcclxuICAgICAgJ3VuaXFzdHInLFxyXG4gICAgICAncmFuZEJldHdlZW4nLFxyXG4gICAgICAnbm9ybWFsJyxcclxuICAgICAgJ2NoYW5jeUludCcsXHJcbiAgICAgICdjaGFuY3knLFxyXG4gICAgICAnd2VpZ2h0ZWRDaG9pY2UnLFxyXG4gICAgICAnZGljZScsXHJcbiAgICAgICdwYXJzZURpY2VTdHJpbmcnLFxyXG4gICAgICAnY2xhbXAnLFxyXG4gICAgICAnYmluJyxcclxuICAgICAgJ3NlcmlhbGl6ZScsXHJcbiAgICBdO1xyXG4gICAgbGV0IGhhc0FsbEtleXMgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgbmVlZGVkRnVuY3Rpb25zKSB7XHJcbiAgICAgIGhhc0FsbEtleXMgPSBoYXNBbGxLZXlzICYmICh0eXBlb2Ygcm5nW2tleV0gPT09ICdmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc0FsbEtleXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbWFrZVJuZyAocm5nPzogU2VlZCB8IFJuZ0ludGVyZmFjZSk6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICBpZiAodGhpcy5pc1JuZyhybmcpKSB7XHJcbiAgICAgIHJldHVybiBybmc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBSbmdDb25zdHJ1Y3RvciA6IFJuZ0NvbnN0cnVjdG9yID0gdGhpcy5ybmdDb25zdHJ1Y3RvciA/PyBSTkc7XHJcbiAgICByZXR1cm4gbmV3IFJuZ0NvbnN0cnVjdG9yKHJuZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJGdW5jdGlvbiAobmFtZTogc3RyaW5nLCBmbjogTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUpIHtcclxuICAgIHRoaXMuZnVuY3Rpb25zW25hbWVdID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJDb25kaXRpb24gKG5hbWU6IHN0cmluZywgZm46IExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5jb25kaXRpb25zW25hbWVdID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzRnVuY3Rpb24gKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLmZ1bmN0aW9uc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzQ29uZGl0aW9uIChuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5jb25kaXRpb25zW25hbWVdICE9PSAndW5kZWZpbmVkJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBub1Rocm93T25NaXNzaW5nRnVuY3Rpb25zT3JDb25kaXRpb25zICgpIHtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdGdW5jdGlvbnMgPSBmYWxzZTtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0aHJvd09uTWlzc2luZ0Z1bmN0aW9uc09yQ29uZGl0aW9ucyAoKSB7XHJcbiAgICB0aGlzLnRocm93T25NaXNzaW5nRnVuY3Rpb25zID0gdHJ1ZTtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zID0gdHJ1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZ1bmN0aW9uQ2hlY2sgKGZuOiBGdW5jdGlvbkRlZmluaXRpb24pIHtcclxuICAgIGxvZy5kKGBVTCB8IEFwcGx5aW5nIGZ1bmN0aW9uICR7Zm4uZnVuY3Rpb259YCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZnVuY3Rpb25zW2ZuLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgZXJyID0gYEZ1bmN0aW9uICR7Zm4uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IFVsdHJhTG9vdC5yZWdpc3RlckZ1bmN0aW9uKG5hbWUsIGZ1bmN0aW9uKS5gO1xyXG4gICAgICBpZiAodGhpcy50aHJvd09uTWlzc2luZ0Z1bmN0aW9ucykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25kaXRpb25DaGVjayAoY29uZDogQ29uZGl0aW9uRGVmaW5pdGlvbikge1xyXG4gICAgbG9nLmQoYFVMIHwgQXBwbHlpbmcgY29uZGl0aW9uICR7Y29uZC5mdW5jdGlvbn1gKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5jb25kaXRpb25zW2NvbmQuZnVuY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBlcnIgPSBgQ29uZGl0aW9uICR7Y29uZC5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gVWx0cmFMb290LnJlZ2lzdGVyQ29uZGl0aW9uKG5hbWUsIGNvbmRpdGlvbl9mdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5RnVuY3Rpb25TeW5jIChmdW5jdGlvbkRlZmluaXRpb246IEZ1bmN0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgaWYgKHRoaXMuZnVuY3Rpb25DaGVjayhmdW5jdGlvbkRlZmluaXRpb24pKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBmdW5jdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5Q29uZGl0aW9uU3luYyAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uQ2hlY2soY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uQ2FsbFJlc3VsdCA9IHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogY29uZGl0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICAgIGlmIChjb25kaXRpb25DYWxsUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJldHVybiBwcm9taXNlIGZyb20gc3luYyBjb25kaXRpb24gY2FsbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb25kaXRpb25DYWxsUmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFwcGx5RnVuY3Rpb24gKGZ1bmN0aW9uRGVmaW5pdGlvbjogRnVuY3Rpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBpZiAodGhpcy5mdW5jdGlvbkNoZWNrKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZnVuY3Rpb25zW2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGZ1bmN0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYXBwbHlDb25kaXRpb24gKGNvbmRpdGlvbkRlZmluaXRpb246IENvbmRpdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGlmICh0aGlzLmNvbmRpdGlvbkNoZWNrKGNvbmRpdGlvbkRlZmluaXRpb24pKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGNvbmRpdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbG9vdCB0YWJsZSwgd2l0aCB0aGlzIHVsdHJhbG9vdCBpbnN0YW5jZVxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKlxyXG4gICAqIGNvbnN0IHVsID0gbmV3IFVsdHJhTG9vdCgnVUw3UjRMMDA3Jyk7XHJcbiAgICogY29uc3QgdGFibGUgPSB1bC5jcmVhdGVUYWJsZSh7bmFtZTogJ0Zvb2QnfSk7XHJcbiAgICpcclxuICAgKiB0YWJsZS5hZGRQb29sKFtcclxuICAgKiAgIHtcclxuICAgKiAgICAgcm9sbHM6IDEsXHJcbiAgICogICAgIG5hbWU6ICdDYWtlcydcclxuICAgKiAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgIHtpZDogJ2Nob2NvbGF0ZV9jYWtlJ30sXHJcbiAgICogICAgICAge2lkOiAnZnJ1aXRfY2FrZSd9LFxyXG4gICAqICAgICAgIHtpZDogJ3N0YXJfY2FrZSd9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH1cclxuICAgKiBdKTtcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlVGFibGUgKGRlZjogTG9vdFRhYmxlIHwgTG9vdFRhYmxlRGVmaW5pdGlvbiB8IExvb3RUYWJsZUVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlIHtcclxuICAgIGlmIChkZWYgaW5zdGFuY2VvZiBMb290VGFibGUgfHwgdGhpcy5pc0xvb3RUYWJsZURlZmluaXRpb24oZGVmKSkge1xyXG4gICAgICBpZiAoZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgbG9nLnZ2KCdDcmVhdGluZyB0YWJsZSBmcm9tIExvb3RUYWJsZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvZy52dignQ3JlYXRpbmcgdGFibGUgZnJvbSBMb290VGFibGVEZWZpbml0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgICAgZGVmLnVsID0gdGhpcztcclxuICAgICAgaWYgKGRlZi5ybmcpIHtcclxuICAgICAgICBkZWYucm5nID0gZGVmLnJuZyA/PyB0aGlzLm1ha2VSbmcoZGVmLnJuZyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVmLnJuZyA9IHRoaXMuZ2V0Um5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbHQgPSBuZXcgTG9vdFRhYmxlKGRlZik7XHJcbiAgICAgIGx0LnVsdHJhbG9vdCA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBsdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0Vhc3lMb290VGFibGVEZWZpbml0aW9uKGRlZikpIHtcclxuICAgICAgbG9nLnZ2KCdDcmVhdGluZyB0YWJsZSBmcm9tIExvb3RUYWJsZUVhc3lEZWZpbml0aW9uJyk7XHJcbiAgICAgIGlmIChkZWYucm5nKSB7XHJcbiAgICAgICAgZGVmLnJuZyA9IGRlZi5ybmcgPz8gdGhpcy5tYWtlUm5nKGRlZi5ybmcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZi5ybmcgPSB0aGlzLmdldFJuZygpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGx0ID0gbmV3IExvb3RUYWJsZSh0aGlzLnRyYW5zZm9ybUVhc3lUb1Byb3Blckxvb3RUYWJsZURlZmluaXRpb24oZGVmKSk7XHJcbiAgICAgIGx0LnVsdHJhbG9vdCA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBsb290IHRhYmxlIGZyb20gdGhlc2UgcGFyYW1zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBsb290IHBvb2wgZm9yIHVzZSBpbiBhIGxvb3QgdGFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlUG9vbCAoZGVmOiBMb290VGFibGVQb29sRGVmaW5pdGlvbiB8IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZVBvb2wge1xyXG4gICAgaWYgKHRoaXMuaXNFYXN5TG9vdFRhYmxlUG9vbERlZmluaXRpb24oZGVmKSkge1xyXG4gICAgICBsb2cudnYoJ0NyZWF0aW5nIHBvb2wgZnJvbSBMb290VGFibGVQb29sRWFzeURlZmluaXRpb24nKTtcclxuICAgICAgcmV0dXJuIG5ldyBMb290VGFibGVQb29sKHRoaXMudHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlUG9vbERlZmluaXRpb24oZGVmKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2cudnYoJ0NyZWF0aW5nIHBvb2wgZnJvbSBMb290VGFibGVQb29sRGVmaW5pdGlvbicpO1xyXG4gICAgICByZXR1cm4gbmV3IExvb3RUYWJsZVBvb2woZGVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBlbnRyeSBmb3IgYSBsb290IHBvb2wsIGVpdGhlciB3aXRoIG9iamVjdCBkZWZpbml0aW9uIG9yIGZyb20gYSBsb290IHRhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZUVudHJ5IChkZWY6IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiB8IExvb3RUYWJsZSk6IExvb3RUYWJsZUVudHJ5IHtcclxuICAgIGlmIChkZWYgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeSh7XHJcbiAgICAgICAgaWQ6IGRlZi5pZCxcclxuICAgICAgICBuYW1lOiBkZWYubmFtZSxcclxuICAgICAgICBpdGVtOiBkZWYsXHJcbiAgICAgICAgcXR5OiAxLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgTG9vdFRhYmxlRW50cnkoZGVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIFR5cGVzY3JpcHQgdHlwZSBndWFyZGluZyBhbmQgcGFyYW1ldGVyIGNoZWNraW5nXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGlzTG9vdFRhYmxlRGVmaW5pdGlvbiAoZGVmOiBhbnkpOiBkZWYgaXMgTG9vdFRhYmxlRGVmaW5pdGlvbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGVQb29sIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZi5wb29scykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgZGVmLnBvb2xzKSB7XHJcbiAgICAgICAgaWYgKCEocG9vbCBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIGZvciBUeXBlc2NyaXB0IHR5cGUgZ3VhcmRpbmcgYW5kIHBhcmFtZXRlciBjaGVja2luZ1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBpc0Vhc3lMb290VGFibGVEZWZpbml0aW9uIChkZWY6IGFueSk6IGRlZiBpcyBMb290VGFibGVFYXN5RGVmaW5pdGlvbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGVQb29sIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZi5wb29scykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgZGVmLnBvb2xzKSB7XHJcbiAgICAgICAgaWYgKHBvb2wgaW5zdGFuY2VvZiBMb290VGFibGVQb29sKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIGZvciBUeXBlc2NyaXB0IHR5cGUgZ3VhcmRpbmcgYW5kIHBhcmFtZXRlciBjaGVja2luZ1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBpc0Vhc3lMb290VGFibGVQb29sRGVmaW5pdGlvbiAoZGVmOiBhbnkpOiBkZWYgaXMgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uIHtcclxuICAgIGlmIChcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wgfHxcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVmLmVudHJpZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBkZWYuZW50cmllcykge1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlRGVmaW5pdGlvbiAoZGVmOiBMb290VGFibGVFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZURlZmluaXRpb24ge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb290VGFibGVEZWZpbml0aW9uID0ge1xyXG4gICAgICBybmc6IHRoaXMubWFrZVJuZyhkZWYucm5nID8/IHRoaXMuZ2V0Um5nKCkpLFxyXG4gICAgICBuYW1lOiBkZWYubmFtZSxcclxuICAgICAgaWQ6IGRlZi5pZCxcclxuICAgICAgcG9vbHM6IFtdLFxyXG4gICAgfTtcclxuICAgIGlmIChkZWYucG9vbHMpIHtcclxuICAgICAgZm9yIChjb25zdCBwb29sIG9mIGRlZi5wb29scykge1xyXG4gICAgICAgIHJlc3VsdC5wb29scy5wdXNoKHRoaXMuY3JlYXRlUG9vbChwb29sKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC51bCA9IHRoaXM7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRyYW5zZm9ybUVhc3lUb1Byb3Blckxvb3RUYWJsZVBvb2xEZWZpbml0aW9uIChkZWY6IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9vdFRhYmxlUG9vbERlZmluaXRpb24gPSB7XHJcbiAgICAgIG5hbWU6IGRlZi5uYW1lLFxyXG4gICAgICBpZDogZGVmLmlkLFxyXG4gICAgICByb2xsczogZGVmLnJvbGxzLFxyXG4gICAgICBudWxsczogZGVmLm51bGxzLFxyXG4gICAgICB0ZW1wbGF0ZTogZGVmLnRlbXBsYXRlLFxyXG4gICAgICBjb25kaXRpb25zOiBkZWYuY29uZGl0aW9ucyxcclxuICAgICAgZnVuY3Rpb25zOiBkZWYuZnVuY3Rpb25zLFxyXG4gICAgICBlbnRyaWVzOiBkZWYuZW50cmllc1xyXG4gICAgfTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcGF0aEpvaW4gKHBhcnRzOiBzdHJpbmdbXSwgc2VwOiBzdHJpbmcgPSAnLycpIDogc3RyaW5nIHtcclxuICAgIHJldHVybiBwYXJ0cy5qb2luKHNlcCkucmVwbGFjZShuZXcgUmVnRXhwKHNlcCArICd7MSx9JywgJ2cnKSwgc2VwKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBmaW5pc2hXaXRoIChzdHI6IHN0cmluZywgZW5kaW5nOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgIGlmIChzdHIuZW5kc1dpdGgoZW5kaW5nKSkge1xyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ciArIGVuZGluZztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBmaW5pc2hXaXRoRXh0ZW5zaW9uIChzdHI6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpIDogc3RyaW5nIHtcclxuICAgIGlmIChzdHIuZW5kc1dpdGgoZXh0ZW5zaW9uKSkge1xyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGFzdCA9IHN0ci5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCdcXFxcJykucG9wKCk7XHJcbiAgICBjb25zdCBwb3MgPSBsYXN0LmluY2x1ZGVzKCcuJykgPyBsYXN0Lmxhc3RJbmRleE9mKCcuJykgOiBsYXN0Lmxlbmd0aDtcclxuICAgIGNvbnN0IGZpbGVSb290ID0gc3RyLnN1YnN0cigwLCAoc3RyLmxlbmd0aCAtIGxhc3QubGVuZ3RoKSArIHBvcyk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBgJHtmaWxlUm9vdH0uJHtleHRlbnNpb24ucmVwbGFjZSgnLicsICcnKX1gO1xyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRFeHRlbnNpb24gKHN0cjogc3RyaW5nKSA6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQge1xyXG4gICAgY29uc3QgbGFzdCA9IHN0ci5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCdcXFxcJykucG9wKCk7XHJcbiAgICBpZiAoIWxhc3QuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHBvcyA9IGxhc3QubGFzdEluZGV4T2YoJy4nKTtcclxuICAgIHJldHVybiBsYXN0LnN1YnN0cihwb3MsIGxhc3QubGVuZ3RoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlcmlhbGl6ZXMgYSBMb290VGFibGUgcmVhZHkgZm9yIGNvbnZlcnRpbmcgdG8gdGV4dCwgZS5nLiBKU09OXHJcbiAgICpcclxuICAgKiBSZXR1cm5zIGEga2V5IHZhbHVlIG9iamVjdCwgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBsb290IHRhYmxlIGZpbGVuYW1lcy9pZHNcclxuICAgKlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgdWx0cmFsb290LnNlcmlhbGl6ZSh0YWJsZSk7XHJcbiAgICpcclxuICAgKiByZXN1bHQgPSB7XHJcbiAgICogICBraXRjaGVuX2N1cGJvYXJkOiB7XHJcbiAgICogICAgIGZuOiAna2l0Y2hlbl9jdXBib2FyZCcsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcclxuICAgKiAgICAgICAgICAgICBpdGVtOiAndmVnZXRhYmxlcydcclxuICAgKiAgICAgICAgICAgfSxcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXHJcbiAgICogICAgICAgICAgICAgaXRlbTogJ2ZydWl0J1xyXG4gICAqICAgICAgICAgICB9XHJcbiAgICogICAgICAgICBdXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICBdXHJcbiAgICogICB9LFxyXG4gICAqICAgZnJ1aXRfYm93bDoge1xyXG4gICAqICAgICBmbjogJ2ZydWl0X2Jvd2wnLFxyXG4gICAqICAgICBwb29sczogW1xyXG4gICAqICAgICAgIHtcclxuICAgKiAgICAgICAgIGVudHJpZXM6IFtcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXHJcbiAgICogICAgICAgICAgICAgaXRlbTogJ2ZydWl0J1xyXG4gICAqICAgICAgICAgICB9XHJcbiAgICogICAgICAgICBdXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICBdXHJcbiAgICogICB9LFxyXG4gICAqICAgdmVnZXRhYmxlczoge1xyXG4gICAqICAgICBmbjogJ3ZlZ2V0YWJsZXMnLFxyXG4gICAqICAgICBwb29sczogW1xyXG4gICAqICAgICAgIHtcclxuICAgKiAgICAgICAgIGVudHJpZXM6IFtcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIGlkOiAnY2Fycm90J1xyXG4gICAqICAgICAgICAgICB9LFxyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgaWQ6ICdjYWJiYWdlJ1xyXG4gICAqICAgICAgICAgICB9LFxyXG4gICAqICAgICAgICAgXVxyXG4gICAqICAgICAgIH1cclxuICAgKiAgICAgXVxyXG4gICAqICAgfSxcclxuICAgKiAgIGZydWl0OiB7XHJcbiAgICogICAgIGZuOiAnZnJ1aXQnLFxyXG4gICAqICAgICBwb29sczogW1xyXG4gICAqICAgICAgIHtcclxuICAgKiAgICAgICAgIGVudHJpZXM6IFtcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIGlkOiAnYXBwbGUnXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICAgIHtcclxuICAgKiAgICAgICAgICAgICBpZDogJ3BlYXInXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICBdXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICBdXHJcbiAgICogICB9XHJcbiAgICogfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXJpYWxpemUgKHRhYmxlOiBMb290VGFibGUsIHsgaW5jbHVkZVJuZyA9IGZhbHNlLCBrZXksIGhhZCA9IG5ldyBTZXQoKSB9OiB7IGluY2x1ZGVSbmc/OiBib29sZWFuLCBrZXk/OiBzdHJpbmcsIGhhZD86IFNldDxhbnk+IH0gPSB7fSk6IFNlcmlhbGl6ZWRUYWJsZXMge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVKc29uRGVmaW5pdGlvbj4gPSB7fTtcclxuICAgIGNvbnN0IGNsb25lOiBMb290VGFibGVKc29uRGVmaW5pdGlvbiA9IHtcclxuICAgICAgbmFtZTogdGFibGUubmFtZSxcclxuICAgICAgaWQ6IHRhYmxlLmlkLFxyXG4gICAgICBmbjogdGFibGUuZm4sXHJcbiAgICAgIHBvb2xzOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBrZXlUb1VzZSA9IHRhYmxlLmZpbGVuYW1lID8/IHRoaXMuZ2V0Um5nKCkudW5pcXN0cig2KTtcclxuICAgIGhhZC5hZGQodGFibGUpO1xyXG5cclxuICAgIGlmIChpbmNsdWRlUm5nKSB7XHJcbiAgICAgIGNsb25lLnJuZyA9IHRhYmxlLnJuZz8uc2VyaWFsaXplKCkgPz8gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IHBvb2wgb2YgKHRhYmxlLnBvb2xzID8/IFtdKSkge1xyXG4gICAgICBjb25zdCBwb29sQ2xvbmU6IExvb3RUYWJsZVBvb2xKc29uRGVmaW5pdGlvbiA9IHtcclxuICAgICAgICBuYW1lOiBwb29sLm5hbWUsXHJcbiAgICAgICAgaWQ6IHBvb2wuaWQsXHJcbiAgICAgICAgcm9sbHM6IHBvb2wucm9sbHMsXHJcbiAgICAgICAgbnVsbHM6IHBvb2wubnVsbHMsXHJcbiAgICAgICAgY29uZGl0aW9uczogcG9vbC5jb25kaXRpb25zLFxyXG4gICAgICAgIGZ1bmN0aW9uczogcG9vbC5mdW5jdGlvbnMsXHJcbiAgICAgICAgZW50cmllczogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIChwb29sLmVudHJpZXMgPz8gW10pKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnlDbG9uZTogTG9vdFRhYmxlRW50cnlKc29uRGVmaW5pdGlvbiA9IHtcclxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXHJcbiAgICAgICAgICBpZDogZW50cnkuaWQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLml0ZW0gPSBlbnRyeTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZW50cnlDbG9uZS5zdGFja2FibGUgPSBlbnRyeS5zdGFja2FibGU7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLndlaWdodCA9IGVudHJ5LndlaWdodDtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbSA9IGVudHJ5Lml0ZW07XHJcbiAgICAgICAgICBlbnRyeUNsb25lLnF0eSA9IGVudHJ5LnF0eTtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuY29uZGl0aW9ucyA9IGVudHJ5LmNvbmRpdGlvbnM7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLmZ1bmN0aW9ucyA9IGVudHJ5LmZ1bmN0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbnRyeUNsb25lLml0ZW0gaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIGNvbnN0IHN1YktleVRvVXNlID0gZW50cnlDbG9uZS5pdGVtLmZpbGVuYW1lID8/IHRoaXMuZ2V0Um5nKCkudW5pcXN0cig2KTtcclxuICAgICAgICAgIGlmIChoYWQuaGFzKGVudHJ5Q2xvbmUuaXRlbSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlY3Vyc2l2ZVRhYmxlRXJyb3IoJ1JlY3Vyc2l2ZSByZXF1aXJlbWVudCBkZXRlY3RlZCAtIGNhbm5vdCBzZXJpYWxpemUgcmVjdXJzaXZlbHkgcmVxdWlyZWQgdGFibGVzLicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbc3ViS2V5VG9Vc2VdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBlbnRyeUNsb25lLml0ZW0uZmlsZW5hbWUgPSBzdWJLZXlUb1VzZTtcclxuICAgICAgICAgICAgY29uc3QgciA9ICh0aGlzLnNlcmlhbGl6ZShlbnRyeUNsb25lLml0ZW0sIHsgaW5jbHVkZVJuZywga2V5OiBzdWJLZXlUb1VzZSwgaGFkIH0pKTtcclxuICAgICAgICAgICAgcmVzdWx0W3N1YktleVRvVXNlXSA9IHIudGFibGVzW3N1YktleVRvVXNlXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVudHJ5Q2xvbmUudHlwZSA9ICd0YWJsZSc7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLml0ZW0gPSBzdWJLZXlUb1VzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9vbENsb25lLmVudHJpZXMucHVzaChlbnRyeUNsb25lKTtcclxuICAgICAgfVxyXG4gICAgICBjbG9uZS5wb29scy5wdXNoKHBvb2xDbG9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0W2tleVRvVXNlXSA9IGNsb25lO1xyXG4gICAgY29uc3QgZmluYWwgPSB7XHJcbiAgICAgIFtWRVJTSU9OX0tFWV06IENVUlJFTlRfVkVSU0lPTixcclxuICAgICAgdGFibGVzOiByZXN1bHRcclxuICAgIH07XHJcbiAgICByZXR1cm4gZmluYWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0IGEgTG9vdFRhYmxlIHRvIEpTT05cclxuICAgKiBAcGFyYW0gIHtMb290VGFibGV9ICAgICAgIHRhYmxlICAgICAgICAgICAgICAgVGhlIHRhYmxlIHRvIHNlcmlhbGl6ZVxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICBPcHRpb25zXHJcbiAgICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICBvcHRpb25zLmluY2x1ZGVSbmcgIFdoZXRoZXIgdG8gaW5jbHVkZSB0aGUgUk5HIHNlZWQgaW4gdGhlIHNlcmlhbGl6ZWQgdGFibGVzXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgIFRoZSByZXN1bHRpbmcgTG9vdFRhYmxlIHJlcHJlc2VudGF0aW9uIGluIGEgSlNPTiBzdHJpbmdcclxuICAgKi9cclxuICB0b0pzb24gKHRhYmxlOiBMb290VGFibGUsIHsgaW5jbHVkZVJuZyA9IGZhbHNlIH06IHsgaW5jbHVkZVJuZz86IGJvb2xlYW4gfSA9IHt9KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnNlcmlhbGl6ZSh0YWJsZSwgeyBpbmNsdWRlUm5nIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEB0b2RvIEltcGxlbWVudCB0aGlzXHJcbiAgICovXHJcbiAgYXN5bmMgc2F2ZVRhYmxlICh0YWJsZTogTG9vdFRhYmxlLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IHlldCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgc2VyaWFsaXplZCB0YWJsZXMgZnJvbSBhIGZpbGUuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGp1c3QgYSB3cmFwcGVyIGFyb3VuZCB1bnNlcmlhbGl6aW5nIGpzb24gY29udGVudHMgb2YgYSBmaWxlLlxyXG4gICAqICAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlcyAoZmlsZW5hbWU6IHN0cmluZywgeyBwYXRoID0gJycsIGRlZmF1bHRFeHRlbnNpb24gfSA6IExvYWRTYXZlQXJncyA9IHt9KTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBMb290VGFibGU+PiB7XHJcbiAgICBkZWZhdWx0RXh0ZW5zaW9uID0gZGVmYXVsdEV4dGVuc2lvbiA/PyB0aGlzLmdldEV4dGVuc2lvbihwYXRoKSA/PyAnLmpzb24nO1xyXG4gICAgY29uc3QgZnVsbFBhdGggPSB0aGlzLmZpbmlzaFdpdGgodGhpcy5wYXRoSm9pbihbcGF0aCwgZmlsZW5hbWVdKSwgZGVmYXVsdEV4dGVuc2lvbik7XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgIGlmIChmdWxsUGF0aC5zdGFydHNXaXRoKCdodHRwJykgfHwgZnVsbFBhdGguc3RhcnRzV2l0aCgnZmlsZTovLycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlc0Zyb21VcmwoZnVsbFBhdGgsIHsgcGF0aCB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVzRnJvbUZpbGUoZnVsbFBhdGgsIHsgcGF0aCB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlc0Zyb21VcmwoZnVsbFBhdGgsIHsgcGF0aCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWRzIHNlcmlhbGl6ZWQgdGFibGVzIGZyb20gYSBsb2NhbCBmaWxlXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlc0Zyb21GaWxlIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHBhdGgpID8/ICcuanNvbic7XHJcbiAgICBsb2cuZChgUmVhZGluZyB0YWJsZXMgZnJvbSAke2ZpbGVuYW1lfWApO1xyXG4gICAgbGV0IGNvbnRlbnRzO1xyXG4gICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oZmlsZW5hbWUpO1xyXG4gICAgaWYgKGV4dCA9PT0gJy5qcycpIHtcclxuICAgICAgY29uc3QgY2IgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShgJHtmaWxlbmFtZX1gLCAndXRmOCcpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXZhbFxyXG4gICAgICBjb250ZW50cyA9IGV2YWwoY2IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGVudHMgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlbmFtZSwgJ3V0ZjgnKVxyXG4gICAgICAgIC50aGVuKChkOnN0cmluZykgPT4gSlNPTi5wYXJzZShkKSlcclxuICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xyXG4gICAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke2ZpbGVuYW1lfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnVuc2VyaWFsaXplKGNvbnRlbnRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgc2VyaWFsaXplZCB0YWJsZXMgZnJvbSBhIHVybFxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRUYWJsZXNGcm9tVXJsICh1cmw6IHN0cmluZywgeyBwYXRoID0gJycsIGRlZmF1bHRFeHRlbnNpb24gfSA6IExvYWRTYXZlQXJncyA9IHt9KTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBMb290VGFibGU+PiB7XHJcbiAgICBkZWZhdWx0RXh0ZW5zaW9uID0gZGVmYXVsdEV4dGVuc2lvbiA/PyB0aGlzLmdldEV4dGVuc2lvbih1cmwpID8/ICcuanNvbic7XHJcbiAgICBsb2cuZChgUmVhZGluZyB0YWJsZXMgZnJvbSAke3VybH1gKTtcclxuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4oZGF0YSA9PiBkYXRhLnRleHQoKSkudGhlbih0eHQgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHR4dCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUgOiBhbnkpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke3VybH1cIi4gJHtlLm1lc3NhZ2V9YDtcclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4odGFibGVzID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMudW5zZXJpYWxpemUodGFibGVzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBhIHRhYmxlIGZyb20gYSBmaWxlLlxyXG4gICAqXHJcbiAgICogVGhlIGZpbGUgY2FuIGJlIGxvY2FsIG9yIGEgdXJsLiBJZiBydW5uaW5nIGluIGJyb3dzZXIsIGl0J3MgYWx3YXlzIHRyZWF0ZWQgYXNcclxuICAgKiBhIFVSTC4gV2hlbiBydW4gaW4gbm9kZSwgaXQgd2lsbCBvbmx5IHRyZWF0IGl0IGFzIGEgVVJMIGlmIGl0J3MgcHJlZml4ZWQgd2l0aFxyXG4gICAqIGh0dHAuXHJcbiAgICpcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGV4cGVjdHMgYSBzaW5nbGUgdGFibGUgdG8gYmUgbG9jYXRlZCBpbiB0aGUgZmlsZSwgYXMgdGhlIGJhc2Ugb2JqZWN0LlxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRUYWJsZSAoZmlsZW5hbWU6IHN0cmluZywgeyBwYXRoID0gJycsIGRlZmF1bHRFeHRlbnNpb24gfSA6IExvYWRTYXZlQXJncyA9IHt9KTogUHJvbWlzZTxMb290VGFibGUgfCBudWxsPiB7XHJcbiAgICBjb25zdCBleHQgPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lKSA/PyAnLmpzb24nO1xyXG4gICAgY29uc3QgZnVsbFBhdGggPSB0aGlzLmZpbmlzaFdpdGhFeHRlbnNpb24odGhpcy5wYXRoSm9pbihbcGF0aCwgZmlsZW5hbWVdKSwgZXh0KTtcclxuICAgIGxvZy5kKCdMb2FkIFRhYmxlJywge1xyXG4gICAgICBmaWxlbmFtZVdpdGhQYXRoOiB0aGlzLnBhdGhKb2luKFtwYXRoLCBmaWxlbmFtZV0pLFxyXG4gICAgICBmaWxlbmFtZSxcclxuICAgICAgZGVmYXVsdEV4dGVuc2lvbixcclxuICAgICAgZXh0LFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBmdWxsUGF0aFxyXG4gICAgfSk7XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgIGlmIChmdWxsUGF0aC5zdGFydHNXaXRoKCdodHRwJykgfHwgZnVsbFBhdGguc3RhcnRzV2l0aCgnZmlsZTovLycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRUYWJsZUZyb21GaWxlKGZpbGVuYW1lLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvYWRUYWJsZUZyb21VcmwoZnVsbFBhdGgsIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWRzIGEgdGFibGUgZnJvbSBhIGxvY2FsIGZpbGVcclxuICAgKi9cclxuICBhc3luYyBsb2FkVGFibGVGcm9tRmlsZSAoZmlsZW5hbWU6IHN0cmluZywgeyBwYXRoID0gJycsIGRlZmF1bHRFeHRlbnNpb24gfSA6IExvYWRTYXZlQXJncyA9IHt9KTogUHJvbWlzZTxMb290VGFibGUgfCBudWxsPiB7XHJcbiAgICBkZWZhdWx0RXh0ZW5zaW9uID0gZGVmYXVsdEV4dGVuc2lvbiA/PyB0aGlzLmdldEV4dGVuc2lvbihmaWxlbmFtZSkgPz8gJy5qc29uJztcclxuXHJcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbihmaWxlbmFtZSk7XHJcbiAgICBjb25zdCBwaiA9IHRoaXMucGF0aEpvaW4oW3BhdGgsIGZpbGVuYW1lXSk7XHJcbiAgICBpZiAoIWV4dGVuc2lvbikge1xyXG4gICAgICAvLyBJZiB0aGUgZmlsZSBleGlzdHMgd2l0aG91dCBleHRlbnNpb24sIHRyeSBhbmQgcmVhZCBpdCBhcyBqc29uXHJcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBqKSAmJiBmcy5zdGF0U3luYyhwaikuaXNGaWxlKCkpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50cyA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHBqLCAndXRmOCcpXHJcbiAgICAgICAgICAudGhlbigoZDpzdHJpbmcpID0+IEpTT04ucGFyc2UoZCkpXHJcbiAgICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgZS5tZXNzYWdlID0gYFRoZXJlIHdhcyBhbiBlcnJvciBsb2FkaW5nIGZpbGU6IFwiJHtmaWxlbmFtZX1cIi4gJHtlLm1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlVGFibGUoY29udGVudHMsIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVHJ5IGFuZCBkeW5hbWljYWxseSBmaW5kIHRoZSBmaWxlbmFtZS5cclxuICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IG5ldyBTZXQoW1xyXG4gICAgICAgIGRlZmF1bHRFeHRlbnNpb24sXHJcbiAgICAgICAgJy5qc29uJyxcclxuICAgICAgICAnLmpzJyxcclxuICAgICAgICAnLmNqcycsXHJcbiAgICAgICAgJy5tanMnXHJcbiAgICAgIF0pO1xyXG4gICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XHJcbiAgICAgICAgY29uc3QgZm5XaXRoRXh0ID0gdGhpcy5maW5pc2hXaXRoRXh0ZW5zaW9uKHBqLCBleHRlbnNpb24pO1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZuV2l0aEV4dCkgJiYgZnMuc3RhdFN5bmMoZm5XaXRoRXh0KS5pc0ZpbGUoKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbUZpbGUodGhpcy5maW5pc2hXaXRoRXh0ZW5zaW9uKGZpbGVuYW1lLCBleHRlbnNpb24pLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHBqKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGZpbGUgXCIke2ZpbGVuYW1lfVwiIGluIHBhdGggXCIke3BhdGh9XCJgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udGVudHM7XHJcbiAgICBpZiAoXHJcbiAgICAgIGV4dGVuc2lvbiA9PT0gJy5qcycgfHxcclxuICAgICAgZXh0ZW5zaW9uID09PSAnLm1qcycgfHxcclxuICAgICAgZXh0ZW5zaW9uID09PSAnLmNqcydcclxuICAgICkge1xyXG4gICAgICAvLyB1bmZvcnR1bmF0ZWx5LCB0eXBlc2NyaXB0IG1hbmdsZXMgaW1wb3J0IHN0YXRlbWVudHMsIHNvIHRoZSBvbmx5XHJcbiAgICAgIC8vIHdheSB3ZSBjYW4gZG8gdGhpcyBpcyB1c2luZyBldmFsLi4uXHJcbiAgICAgIGNvbnN0IGNiID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoYCR7cGp9YCwgJ3V0ZjgnKTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV2YWxcclxuICAgICAgY29udGVudHMgPSBldmFsKGNiKTtcclxuICAgIH0gZWxzZSBpZiAoZXh0ZW5zaW9uID09PSAnLmpzb24nIHx8IGRlZmF1bHRFeHRlbnNpb24gPT09ICcnKSB7XHJcbiAgICAgIGNvbnRlbnRzID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUocGosICd1dGY4JylcclxuICAgICAgICAudGhlbigoZDpzdHJpbmcpID0+IEpTT04ucGFyc2UoZCkpXHJcbiAgICAgICAgLmNhdGNoKChlOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgICAgZS5tZXNzYWdlID0gYFRoZXJlIHdhcyBhbiBlcnJvciBsb2FkaW5nIGZpbGU6IFwiJHtmaWxlbmFtZX1cIi4gJHtlLm1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlVGFibGUoY29udGVudHMsIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWRzIGEgdGFibGUgZnJvbSBhIHVybFxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRUYWJsZUZyb21VcmwgKHVybDogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHVybCkgPz8gJy5qc29uJztcclxuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4oZGF0YSA9PiBkYXRhLnRleHQoKSkudGhlbih0eHQgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHR4dCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUgOiBhbnkpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke3VybH1cIi4gJHtlLm1lc3NhZ2V9YDtcclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4odGFibGVzID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZVRhYmxlKHRhYmxlcywgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUdXJucyBhIEpTT04gcmVwcmVzZW50YXRpb24gaW50byBhIExvb3RUYWJsZSwgYW5kIGRvZXMgdGhlXHJcbiAgICogc2FtZSBmb3IgYWxsIG5lc3RlZCB0YWJsZXMgaW5zaWRlIHBvb2xzIHJlY3Vyc2l2ZWx5LlxyXG4gICAqL1xyXG4gIGFzeW5jIHJlc29sdmVUYWJsZSAodGFibGU6IExvb3RUYWJsZUpzb25EZWZpbml0aW9uLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGZvciAoY29uc3QgcG9vbCBvZiAodGFibGUucG9vbHMgPz8gW10pKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgKHBvb2wuZW50cmllcyA/PyBbXSkpIHtcclxuICAgICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgZW50cnkuaXRlbSA9IGF3YWl0IHRoaXMubG9hZFRhYmxlKGVudHJ5Lml0ZW0sIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIGVudHJ5LnR5cGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGxvb3RUYWJsZSA9IHRoaXMuY3JlYXRlVGFibGUodGFibGUpO1xyXG4gICAgcmV0dXJuIGxvb3RUYWJsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc2VyaWFsaXplcyB0YWJsZXMgc2VyaWFsaXplZCB3aXRoIHRoZSBcInNlcmlhbGl6ZVwiIGZ1bmN0aW9uXHJcbiAgICogQHBhcmFtICB7UmVjb3JkPHN0cmluZywgTG9vdFRhYmxlSnNvbkRlZmluaXRpb24+fSB0YWJsZXMgUmVjb3JkIG9mIHRhYmxlcyBzZXJpYWxpemVkIHVzaW5nIHRoZSBcInNlcmlhbGl6ZVwiIGZ1bmN0aW9uXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBMb290VGFibGU+Pn0gICAgICAgICAgICAgQSBrZXkvdmFsdWUgcGFpcmluZyBvZiB0YWJsZXNcclxuICAgKi9cclxuICB1bnNlcmlhbGl6ZSAodGFibGVzOiBTZXJpYWxpemVkVGFibGVzKTogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4gPSB7fTtcclxuXHJcbiAgICAvLyBXaGVuIHVuc2VyaWFsaXppbmcsIHdlIGxvb3AgdGhyb3VnaCBtdWx0aXBsZSB0aW1lcyBiZWNhdXNlIHRoZXJlIGlzXHJcbiAgICAvLyBpbmhlcmV0ZW5jZSAtIHNvIHdlIG5lZWQgdG8gdW5zZXJpYWxpemUgdGhpbmdzIGluIHRoZSByaWdodCBvcmRlci5cclxuICAgIC8vIFRvIGF2b2lkIGJ1aWxkaW5nIGNvbXBsZXggaW5oZXJpdGFuY2UgY2hhaW5zLCB3ZSBqdXN0IGxvb3AgdGhyb3VnaFxyXG4gICAgLy8gdXAgdG8gMTAwIHRpbWVzLCBzbyB0aGluZ3MgY2FuIGJlIG5lc3RlZCB1cCB0byAxMDAgdGltZXMsIHJlc3RhcnRpbmdcclxuICAgIC8vIHdoZW4gd2UgaGl0IGFuIHVuc2VyaWFsaXplZCBuZXN0ZWQgcmVxdWlyZW1lbnQuXHJcbiAgICBsZXQgaSA9IDEwMDtcclxuXHJcbiAgICAvLyBAVE9ETyBEZXRlY3QgcmVjdXJzaXZlIHJlcXVpcmVtZW50cyBiZXR0ZXIuXHJcblxyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbGFiZWxzICovXHJcbiAgICB3aGlsZSAoT2JqZWN0LnZhbHVlcyh0YWJsZXMudGFibGVzKS5sZW5ndGggPiAwICYmIGktLSA+IDApIHtcclxuICAgICAgZ2V0QmFjazpcclxuICAgICAgZm9yIChjb25zdCBbaWQsIHRhYmxlXSBvZiBPYmplY3QuZW50cmllcyh0YWJsZXMudGFibGVzKSkge1xyXG4gICAgICAgIGNvbnN0IHJuZyA9IHRhYmxlLnJuZyA/PyBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSB0YWJsZS5ybmc7XHJcbiAgICAgICAgbG9nLnYoYFVuc2VyaWFsaXppbmcgdGFibGUgJHtpZH1gKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgKHRhYmxlLnBvb2xzID8/IFtdKSkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiAocG9vbC5lbnRyaWVzID8/IFtdKSkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0W2VudHJ5Lml0ZW1dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YWJsZXMudGFibGVzW2VudHJ5Lml0ZW1dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhYmxlICR7ZW50cnkuaXRlbX0gbm90IHByZXNlbnQgaW4gc2VyaWFsaXplZCBkYXRhYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBkbyB0aGUgZm9sbG93aW5nIHRvIHVuc2VyaWFsaXplIHRoaW5ncyBpbiB0aGUgY29ycmVjdCBvcmRlci5cclxuICAgICAgICAgICAgICAgIGxvZy52KGBXZSBkaWRuJ3QgaGF2ZSAke2VudHJ5Lml0ZW19IGluIG91ciByZXN1bHRzYCk7XHJcbiAgICAgICAgICAgICAgICAvLyBXZWlyZGx5LCBqYXZhc2NyaXB0IGhhcyBubyB3YXkgdG8gYnJlYWsgb3V0IG9mIG5lc3RlZCBsb29wcyBleGNlcHQgdXNpbmcgbGFiZWxzP1xyXG4gICAgICAgICAgICAgICAgLy8gYW55d2F5Li4udGhpcyBpcyB1bnVzdWFsLCBidXQgaGV5IGhvXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBnZXRCYWNrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbnRyeS5pdGVtID0gcmVzdWx0W2VudHJ5Lml0ZW1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlbnRyeS50eXBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRbaWRdID0gdGhpcy5jcmVhdGVUYWJsZSh0YWJsZSk7XHJcbiAgICAgICAgaWYgKHJuZykge1xyXG4gICAgICAgICAgcmVzdWx0W2lkXS5zZXRSbmcodGhpcy5nZXRSbmdDb25zdHJ1Y3RvcigpLnVuc2VyaWFsaXplKHJuZykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgdGFibGVzLnRhYmxlc1tpZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF4aW11bSBuZXN0ZWQgc2VyaWFsaXplZCB0YWJsZSBsaW1pdCByZWFjaGVkIChjb3VsZCBiZSBhIHJlY3Vyc2l2ZSByZXF1aXJlbWVudCBzb21ld2hlcmUgY2F1c2luZyBhbiBpc3N1ZT8pJyk7XHJcbiAgICB9XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWxhYmVscyAqL1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVsdHJhTG9vdDtcclxuIiwiLyoqXHJcbiAqIFNpbXBsZSBkb3QgZ2V0dGVyIGZ1bmN0aW9uLiBJZiBwcm9wZXJ0eSBpcyB1bmRlZmluZWQsIHJldHVybnMgZGVmYXVsdCB2YWx1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBvYiA9IHsgYTogeyBiOiB7IGM6ICdmb28nIH0gfSB9O1xyXG4gKiBkb3RHZXQob2IsICdhLmIuYycpOyAvLyAnZm9vJ1xyXG4gKiBkb3RHZXQob2IsICdhLnouYycpOyAvLyB1bmRlZmluZWRcclxuICogZG90R2V0KG9iLCAnYS56LmMnLCAnYmFyJyk7IC8vICdiYXInXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZG90R2V0ID0gKG9iOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBwYXRoOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSkgPT4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+ICgodHlwZW9mIG8gIT09ICd1bmRlZmluZWQnKSA/IG9baV0gOiBvKSwgb2IpO1xyXG4gIHJldHVybiAodHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNpbXBsZSBkb3Qgc2V0dGVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IG9iID0geyBhOiB7IGI6IHsgYzogJ2ZvbycgfSB9IH07XHJcbiAqIGRvdFNldChvYiwgJ2EuYi5jJywgJ2JhcicpOyAvLyBvYi5hLmIuYyA9PT0gJ2Jhcic7XHJcbiAqIGRvdFNldChvYiwgJ2EuYi5kJywgJ2JheicpOyAvLyBvYi5hLmIuZCA9PT0gJ2Jheic7XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZG90U2V0ID0gKG9iOiBhbnksIHBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkgPT4ge1xyXG4gIGNvbnN0IGtleXMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgbGV0IHBhcmVudCA9IG9iO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XHJcbiAgICBpZiAoIShrZXkgaW4gcGFyZW50KSkge1xyXG4gICAgICBwYXJlbnRba2V5XSA9IHt9O1xyXG4gICAgfVxyXG4gICAgcGFyZW50ID0gcGFyZW50W2tleV07XHJcbiAgfVxyXG4gIHBhcmVudFtrZXlzW2tleXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogcmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiBwcm9wZXJ0eSBvZiBvYlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBkZXBlbmQoZmFsc2UpOyAvLyBmYWxzZVxyXG4gKiBkZXBlbmQoZmFsc2UsIG51bGwsIHRydWUpOyAvLyB0cnVlXHJcbiAqIGRlcGVuZCh7Zm9vOiBmYWxzZX0sICdmb28nKTsgLy8gZmFsc2VcclxuICogZGVwZW5kKHtmb286IGZhbHNlfSwgJ2ZvbycsIG51bGwsIHRydWUpOyAvLyB0cnVlXHJcbiAqIGRlcGVuZCh7Zm9vOiB0cnVlfSwgJ2ZvbycpOyAvLyB0cnVlXHJcbiAqIGRlcGVuZCh7Zm9vOiB0cnVlfSwgJ2ZvbycsIG51bGwsIHRydWUpOyAvLyBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlcGVuZCA9IChvYjogYW55LCB7IHByb3BlcnR5LCB0b2JlLCBtaW4sIG1heCwgaW52ZXJzZSA9IGZhbHNlLCBzdHJpY3QgPSB0cnVlIH0gOiB7IHByb3BlcnR5Pzogc3RyaW5nLCBtaW4/OiBudW1iZXIsIG1heD86IG51bWJlciwgdG9iZT86IGFueSwgaW52ZXJzZT86IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4gfSA9IHt9KSA9PiB7XHJcbiAgaW52ZXJzZSA9ICEhaW52ZXJzZTtcclxuICBpZiAoIW9iKSB7XHJcbiAgICByZXR1cm4gaW52ZXJzZTtcclxuICB9XHJcbiAgbGV0IHZhbCA9IG9iO1xyXG4gIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YWwgPSBkb3RHZXQob2IsIHByb3BlcnR5KTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgdG9iZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGlmIChzdHJpY3QpIHtcclxuICAgICAgdmFsID0gKHZhbCA9PT0gdG9iZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXHJcbiAgICAgIHZhbCA9ICh2YWwgPT0gdG9iZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW52ZXJzZSA/ICF2YWwgOiAhIXZhbDtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIChcclxuICAgICAgdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICkgJiZcclxuICAgIHN0cmljdCAmJlxyXG4gICAgdHlwZW9mIHZhbCAhPT0gJ251bWJlcidcclxuICApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICB2YWwgIT09IG51bGxcclxuICApIHtcclxuICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyAmJiBwYXJzZUZsb2F0KHZhbCkgPCBtaW4pIHtcclxuICAgICAgcmV0dXJuIGludmVyc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyc2VGbG9hdCh2YWwpID4gbWF4KSB7XHJcbiAgICAgIHJldHVybiBpbnZlcnNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiAhaW52ZXJzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBpbnZlcnNlID8gIXZhbCA6ICEhdmFsO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=