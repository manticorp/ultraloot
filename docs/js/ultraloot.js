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

/***/ 494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dependContext: () => (/* binding */ dependContext),
/* harmony export */   dependLooter: () => (/* binding */ dependLooter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(185);

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
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .depend */ .fE)(context, args);
};
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
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .depend */ .fE)(looter, args);
};


/***/ }),

/***/ 663:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inheritContext: () => (/* binding */ inheritContext),
/* harmony export */   inheritLooter: () => (/* binding */ inheritLooter),
/* harmony export */   setToRandomChoice: () => (/* binding */ setToRandomChoice)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(185);

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
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotSet */ ._c)(looted, args.property ?? args.lootedProperty, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotGet */ .m0)(looter, args.property ?? args.looterProperty, args.default));
};
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
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotSet */ ._c)(looted, args.property ?? args.lootedProperty, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotGet */ .m0)(context, args.property ?? args.contextProperty, args.default));
};
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
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotSet */ ._c)(looted, property, rng.weightedChoice(choices));
    }
};


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let debug = false;
if (true) {
    debug = !true;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (r);


/***/ }),

/***/ 629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Rng),
/* harmony export */   U: () => (/* binding */ RngAbstract)
/* harmony export */ });
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
            // Some shortcuts
            if (data.length === 0) {
                return null;
            }
            if (data.length === 1) {
                return data[0];
            }
            const chances = new Map();
            data.forEach(function (a) {
                chances.set(a, 1);
            });
            return this.weightedChoice(chances);
        }
        if (data instanceof Map) {
            // Some shortcuts
            if (data.size === 0) {
                return null;
            }
            if (data.size === 1) {
                return data.keys().next().value;
            }
            data.forEach((value, key) => {
                total += value;
            });
        }
        else {
            // Some shortcuts
            const entries = Object.keys(data);
            if (entries.length === 0) {
                ;
                return null;
            }
            if (entries.length === 1) {
                return entries[0];
            }
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


/***/ }),

/***/ 784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootTable)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _table_pool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(425);
/* harmony import */ var _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(219);
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(629);




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
        this.rng = rng ?? (ul ? ul.getRng() : new _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A());
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.gc(`Table: ${this.description} | Rolling table ${rolls} times (from chancy(${JSON.stringify(n)}))`, { looter, context });
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
    rollSync({ looter, context, result = new _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), rng, n = 1 } = {}) {
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
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
    async roll({ looter, context, result = new _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), rng, n = 1 } = {}) {
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
        return result;
    }
    /**
     * Roll for loot on a pool
     *
     * The looter will generally be the player
     * The context will either be a container or a 'monster', but might be something else (where the loot is coming from)
     * @param rollDefinition
     */
    rollPoolSync({ pool, looter, context, result = new _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), rng, n = 1 }) {
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
    async rollPool({ pool, looter, context, result = new _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), rng, n = 1 }) {
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
        const pool = new _table_pool__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(def);
        this.pools.push(pool);
        return pool;
    }
    addPool(def) {
        if ((def instanceof _table_pool__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)) {
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
            const rollsMax = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.chancyMax(pool.rolls);
            const rollsMin = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.chancyMin(pool.rolls);
            const nullsMin = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.chancyMin(pool.nulls);
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
                        min: nullsMin > 0 ? 0 : (rollsMin * _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.chancyMin(entry.qty)),
                        max: rollsMax * _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.chancyMax(entry.qty),
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


/***/ }),

/***/ 425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootPool)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _pool_entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);
/* harmony import */ var _pool_entry_result__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(668);
/* harmony import */ var _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(219);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(784);
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(629);






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
        this.id = id ?? (new _rng__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A()).uniqstr(6);
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
        const entry = new _pool_entry__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({ ...(this.template ?? {}), ...def });
        this.entries.push(entry);
        return entry;
    }
    addEntry(entry, def) {
        if (entry instanceof _table__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
            entry = new _pool_entry__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A({
                ...(this.template ?? {}),
                ...(def ?? {}),
                ...{
                    id: entry.id,
                    item: entry,
                }
            });
        }
        if (entry instanceof _pool_entry__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.gc(`Pool ${this.description} | Rolling pool ${numRolls} times (from chancy(${JSON.stringify(this.rolls)}))`);
        // We store a list of key/value choices with their weights in an array
        const choices = {};
        // A special NULL key to track null results
        if (rng.chancy(this.nulls) > 0) {
            choices[LootPool.NULLKEY] = rng.chancy(this.nulls);
        }
        // map the weights to positions in entries.
        this.entries.forEach((a, i) => {
            if (a instanceof _table__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
                choices[i] = 1;
            }
            else {
                choices[i] = rng.chancy(a.weight ?? 1);
            }
        });
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv(`Pool ${this.description} | Choices:`, choices);
        return [numRolls, choices];
    }
    async roll({ rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        const [numRolls, choices] = this.rollPreamble({ rng });
        const overallIntermediate = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        for (let i = 0; i < numRolls; i++) {
            // This is our choice from the choices table
            const choice = rng.weightedChoice(choices);
            // Then, unless it is the null key, we extract it!
            if (choice !== LootPool.NULLKEY) {
                const entry = this.entries[choice];
                if (entry instanceof _table__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
                    // If the entry is a loot table, voila - we can roll it directly
                    overallIntermediate.merge(await entry.roll({ looter, context, rng }));
                }
                else if (entry instanceof _pool_entry__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
                    // Otherwise, we can roll the entry itself
                    _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.g(`Pool ${this.description} | Rolling Loot Table Entry`);
                    overallIntermediate.merge(await entry.roll({ rng, table, looter, context }));
                    _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
                    if (entry.unique) {
                        choices[choice] = 0;
                    }
                }
            }
            else {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Got null result`);
            }
        }
        // Then we process all the results
        await this.processEntryResults(overallIntermediate, { rng, table, looter, context, result });
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
        return result;
    }
    rollSync({ rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        const [numRolls, choices] = this.rollPreamble({ rng });
        const overallIntermediate = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        for (let i = 0; i < numRolls; i++) {
            // This is our choice from the choices table
            const choice = rng.weightedChoice(choices);
            // Then, unless it is the null key, we extract it!
            if (choice !== LootPool.NULLKEY) {
                const entry = this.entries[choice];
                if (entry instanceof _table__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
                    // If the entry is a loot table, voila - we can roll it directly
                    overallIntermediate.merge(entry.rollSync({ looter, context, rng }));
                }
                else if (entry instanceof _pool_entry__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
                    // Otherwise, we can roll the entry itself
                    _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.g(`Pool ${this.description} | Rolling Loot Table Entry`);
                    overallIntermediate.merge(entry.rollSync({ rng, table, looter, context }));
                    _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
                    if (entry.unique) {
                        choices[choice] = 0;
                    }
                }
            }
            else {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Got null result`);
            }
        }
        // Then we process all the results
        this.processEntryResultsSync(overallIntermediate, { rng, table, looter, context, result });
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
        return result;
    }
    async processEntryResults(entryResults, { rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        const results = [];
        for (const entryResult of entryResults) {
            results.push(this.processEntryResult(entryResult, { rng, table, looter, context, result }));
        }
        return Promise.all(results);
    }
    processEntryResultsSync(entryResults, { rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const entryResult of entryResults) {
            this.processEntryResultSync(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    async processEntryResult(looted, { rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            await table.applyFunction(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = await table.applyCondition(cond, { rng, looted, looter, context, result });
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new _pool_entry_result__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
    processEntryResultSync(looted, { rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            table.applyFunctionSync(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = table.applyConditionSync(cond, { rng, looted, looter, context, result });
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new _pool_entry_result__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
}


/***/ }),

/***/ 50:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootTableEntry)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(784);
/* harmony import */ var _entry_result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(668);
/* harmony import */ var _entry_results__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(219);




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
        return this.getItem() instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A;
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
        return new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A([new _entry_result__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(def)]);
    }
    async roll({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), }) {
        if (this.isTable()) {
            return await this.rollTable({ rng, table, looter, context, result });
        }
        else {
            return await this.rollItem({ rng, table, looter, context, result });
        }
    }
    async rollItem({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        await this.processEntryResults(this.generateBaseResults(rng), { rng, table, looter, context, result });
        return result;
    }
    async rollTable({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = await this.getItem().borrow(table).roll({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        await this.processEntryResults(entryResults, { rng, table, looter, context, result });
        return result;
    }
    async processEntryResults(entryResults, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const entryResult of entryResults) {
            await this.processEntryResult(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    async processEntryResult(entryResult, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            await table.applyFunction(fn, { rng, looted: entryResult, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            add = add && await table.applyCondition(cond, { rng, looted: entryResult, looter, context, result });
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && entryResult.qty > 0) {
            if (entryResult.stackable) {
                result.push(entryResult);
            }
            else {
                for (let i = 0; i < entryResult.qty; i++) {
                    result.push(new _entry_result__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({ ...entryResult, ...{ qty: 1 } }));
                }
            }
        }
    }
    rollSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(), }) {
        if (this.isTable()) {
            return this.rollTableSync({ rng, table, looter, context, result });
        }
        else {
            return this.rollItemSync({ rng, table, looter, context, result });
        }
    }
    rollItemSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        this.processEntryResultsSync(this.generateBaseResults(rng), { rng, table, looter, context, result });
        return result;
    }
    rollTableSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = this.getItem().borrow(table).rollSync({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        this.processEntryResultsSync(entryResults, { rng, table, looter, context, result });
        return result;
    }
    processEntryResultsSync(entryResults, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const entryResult of entryResults) {
            this.processEntryResultSync(entryResult, { rng, table, looter, context, result });
        }
        return entryResults;
    }
    processEntryResultSync(looted, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            table.applyFunctionSync(fn, { rng, looted, looter, context, result });
        }
        let add = true;
        for (const cond of this.conditions) {
            add = add && table.applyConditionSync(cond, { rng, looted, looter, context, result });
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add && looted.qty > 0) {
            if (looted.stackable || looted.qty === 1) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new _entry_result__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({ ...looted, ...{ qty: 1 } }));
                }
            }
        }
    }
}


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootTableEntryResult)
/* harmony export */ });
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


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootTableEntryResults)
/* harmony export */ });
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
            if (k !== 'qty') {
                entryWithoutQty[k] = v;
            }
        }
        return JSON.stringify(entryWithoutQty);
    }
    collapsed() {
        const map = {};
        const other = [];
        for (const ob of this) {
            if (ob.stackable) {
                const sig = this.entrySignature(ob);
                if (typeof map[sig] === 'undefined') {
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


/***/ }),

/***/ 224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tZ: () => (/* binding */ UltraLoot)
/* harmony export */ });
/* unused harmony export RecursiveTableError */
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(784);
/* harmony import */ var _table_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(425);
/* harmony import */ var _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50);
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(629);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(330);
/* harmony import */ var _default_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(663);
/* harmony import */ var _default_conditions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(494);








// Set fs properly if we are in node environment
let fs;
let isNode = false;
if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
        if (typeof process.versions.node !== 'undefined') {
            fs = __webpack_require__(896);
            isNode = true;
        }
    }
}
const VERSION_KEY = '__version__';
class RecursiveTableError extends Error {
}
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d('UltraLoot initialising');
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
        for (const [key, fn] of Object.entries(_default_functions__WEBPACK_IMPORTED_MODULE_6__)) {
            this.registerFunction(key, fn);
        }
        return this;
    }
    registerDefaultConditions() {
        for (const [key, fn] of Object.entries(_default_conditions__WEBPACK_IMPORTED_MODULE_7__)) {
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
        const RngConstructor = this.rngConstructor ?? _rng__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A;
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`UL | Applying function ${fn.function}`);
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`UL | Applying condition ${cond.function}`);
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
        if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A || this.isLootTableDefinition(def)) {
            if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv('Creating table from LootTable');
            }
            else {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv('Creating table from LootTableDefinition');
            }
            def.ul = this;
            if (def.rng) {
                def.rng = def.rng ?? this.makeRng(def.rng);
            }
            else {
                def.rng = this.getRng();
            }
            const lt = new _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(def);
            lt.ultraloot = this;
            return lt;
        }
        else if (this.isEasyLootTableDefinition(def)) {
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv('Creating table from LootTableEasyDefinition');
            if (def.rng) {
                def.rng = def.rng ?? this.makeRng(def.rng);
            }
            else {
                def.rng = this.getRng();
            }
            const lt = new _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A(this.transformEasyToProperLootTableDefinition(def));
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
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv('Creating pool from LootTablePoolEasyDefinition');
            return new _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(this.transformEasyToProperLootTablePoolDefinition(def));
        }
        else {
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv('Creating pool from LootTablePoolDefinition');
            return new _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A(def);
        }
    }
    /**
     * Create an entry for a loot pool, either with object definition or from a loot table
     */
    createEntry(def) {
        if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
            return new _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A({
                id: def.id,
                name: def.name,
                item: def,
                qty: 1,
            });
        }
        else {
            return new _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(def);
        }
    }
    /**
     * Used for Typescript type guarding and parameter checking
     */
    isLootTableDefinition(def) {
        if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A ||
            def instanceof _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A ||
            def instanceof _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
            return false;
        }
        if (def.pools) {
            for (const pool of def.pools) {
                if (!(pool instanceof _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)) {
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
        if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A ||
            def instanceof _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A ||
            def instanceof _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
            return false;
        }
        if (def.pools) {
            for (const pool of def.pools) {
                if (pool instanceof _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A) {
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
        if (def instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A ||
            def instanceof _table_pool__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A ||
            def instanceof _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
            return false;
        }
        if (def.entries) {
            for (const entry of def.entries) {
                if (entry instanceof _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
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
        const transformedEntries = [];
        for (let entry of (def.entries ?? [])) {
            if (this.isEasyLootTableDefinition(entry)) {
                if (typeof entry.pools !== 'undefined' && Array.isArray(entry.pools)) {
                    entry = this.createTable(entry);
                }
            }
            transformedEntries.push(entry);
        }
        const result = {
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
                if (entry instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
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
                if (entryClone.item instanceof _table__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A) {
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
            [VERSION_KEY]: _package_json__WEBPACK_IMPORTED_MODULE_5__/* .version */ .rE,
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Reading tables from ${filename}`);
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Reading tables from ${url}`);
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
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d('Load Table', {
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
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Unserializing table ${id}`);
                for (const pool of (table.pools ?? [])) {
                    for (const entry of (pool.entries ?? [])) {
                        if (entry.type === 'table') {
                            if (typeof result[entry.item] === 'undefined') {
                                if (typeof tables.tables[entry.item] === 'undefined') {
                                    throw new Error(`Table ${entry.item} not present in serialized data`);
                                }
                                // We do the following to unserialize things in the correct order.
                                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`We didn't have ${entry.item} in our results`);
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
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (UltraLoot);


/***/ }),

/***/ 185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _c: () => (/* binding */ dotSet),
/* harmony export */   fE: () => (/* binding */ depend),
/* harmony export */   m0: () => (/* binding */ dotGet)
/* harmony export */ });
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
        val = dotGet(ob, property);
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


/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 330:
/***/ ((module) => {

module.exports = {"rE":"0.0.1"};

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// UNUSED EXPORTS: LootTable, LootTableEntry, LootTableEntryResult, LootTableEntryResults, LootTableManager, LootTablePool, PredictableRng, RecursiveTableError, Rng, RngAbstract, UltraLoot

// EXTERNAL MODULE: ./src/ultraloot.ts
var ultraloot = __webpack_require__(224);
// EXTERNAL MODULE: ./src/rng.ts
var rng = __webpack_require__(629);
;// ./src/rng/predictable.ts

/**
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 */
class Rng extends rng/* RngAbstract */.U {
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

// EXTERNAL MODULE: ./src/table.ts
var table = __webpack_require__(784);
;// ./src/table/manager.ts

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
        if (typeof name === 'string' && typeof table !== 'undefined' && table instanceof LootTable) {
            this.tables[name] = table;
        }
        else if (typeof table === 'string' && name instanceof LootTable) {
            this.tables[table] = name;
        }
        else if (name instanceof LootTable) {
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

// EXTERNAL MODULE: ./src/table/pool.ts
var pool = __webpack_require__(425);
// EXTERNAL MODULE: ./src/table/pool/entry.ts
var entry = __webpack_require__(50);
// EXTERNAL MODULE: ./src/table/pool/entry/results.ts
var results = __webpack_require__(219);
;// ./src/index.ts



















// This provides an easy way of using ultraloot in browser.
// It can be instantiated by new UltraLoot() and submodules can be
// instantiated by new UltraLoot.LootTable() and whatnot.
/* harmony default export */ const src = (ultraloot/* UltraLoot */.tZ);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});