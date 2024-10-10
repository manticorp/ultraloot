/******/ (() => { // webpackBootstrap
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
        log_1.default.vv(`Pool ${this.description} | Choices:`, choices);
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
                console.log(sig, typeof map[sig]);
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

module.exports = /*#__PURE__*/JSON.parse('{"name":"ultraloot","version":"0.0.1","description":"","main":"dist/ultraloot.js","module":"dist/index.js","scripts":{"watch":"webpack --mode development --config webpack.dev.config.js --watch","dev":"webpack --mode development --config webpack.dev.config.js","build":"webpack --mode production --config webpack.production.config.js && npx typedoc","ci":"npm t && npm run test-build","test-build":"npm run build && node test-build.js && node test-build-common.cjs && node test-build-module.mjs","test":"jest --coverage","test-watch":"jest --coverage --watchAll"},"files":["dist"],"keywords":[],"author":"Harry Mustoe-Playfair","license":"MIT","devDependencies":{"@babel/core":"^7.25.2","@babel/preset-env":"^7.25.4","@types/jest":"^29.5.13","autoprefixer":"^10.4.20","babel-loader":"^9.2.1","eslint":"^9.11.1","html-loader":"^5.1.0","jest":"^29.7.0","jsdoc":"^4.0.3","neostandard":"^0.11.6","terser-webpack-plugin":"^5.3.10","ts-jest":"^29.2.5","ts-loader":"^9.5.1","typedoc":"^0.26.7","typedoc-plugin-rename-defaults":"^0.7.1","typescript":"^5.6.2","val-loader":"^6.0.0","webpack":"^5.95.0","webpack-cli":"^5.1.4"}}');

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./other/demo.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ultraloot_1 = __webpack_require__(/*! ./../src/ultraloot */ "./src/ultraloot.ts");
const ul = new ultraloot_1.default();
ul.registerDefaultConditions();
ul.registerDefaultFunctions();
ul.registerFunction('staleLevel', ({ rng, looted, args }) => {
    if (typeof looted.item !== 'undefined' && typeof looted.item.perishable !== 'undefined') {
        looted.item.perishable.condition = rng.chancy({ ...{ min: 0, max: 1, type: 'normal' }, ...args });
    }
});
ul.registerFunction('randomColor', ({ rng, looted, args = {} }) => {
    if (typeof looted.item !== 'undefined' && typeof looted.item.colorable !== 'undefined') {
        const choices = args.choices ?? ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        looted.item.colorable.color = rng.weightedChoice(choices);
    }
});
function pick(o, ...props) {
    return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}
const player = {
    level: 15
};
const tablePromises = [];
tablePromises.push(ul.loadTable('js_test.js', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('armor_box', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('clothing_store', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('kitchen_cupboard', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('mining', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('mining/gems', { path: 'examples/tables' }));
Promise.all(tablePromises).then(([jsTest, armorBox, clothingStore, kitchenCupboard, mining, gems]) => {
    const numRolls = 1;
    console.log(`jsTest results with a level ${player.level} player`, jsTest.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));
    console.log(`Kitchen Cupboard results with a level ${player.level} player`, kitchenCupboard.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));
    console.log('Armor Box results with a level 10 player', armorBox.rollSync({ n: numRolls, looter: { level: 10 } }).map(a => a.id));
    console.log(`Armor Box results with a level ${player.level} player`, armorBox.rollSync({ n: numRolls, looter: player }).map(a => a.id));
    console.log(`Clothing store results with a level ${player.level} player`, clothingStore.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2SyxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsTUFBTSxDQUFDLEtBQUssU0FBUyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhJLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckssQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvZGVmYXVsdC9jb25kaXRpb25zLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy9kZWZhdWx0L2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvbG9nLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy9ybmcudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3RhYmxlLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sL2VudHJ5LnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdC50cyIsIndlYnBhY2s6Ly91bHRyYWxvb3QvLi9zcmMvdGFibGUvcG9vbC9lbnRyeS9yZXN1bHRzLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC8uL3NyYy91bHRyYWxvb3QudHMiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3VsdHJhbG9vdC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly91bHRyYWxvb3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdWx0cmFsb290Ly4vb3RoZXIvZGVtby50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb290VGFibGVDb25kaXRpb25TaWduYXR1cmUgfSBmcm9tICcuLy4uL3RhYmxlJztcclxuaW1wb3J0IHtcclxuICBkZXBlbmRcclxufSBmcm9tICcuLy4uL3V0aWxzJztcclxuXHJcbnR5cGUgRGVwZW5kQ29udGV4dFNpZ25hdHVyZSA9ICh7XHJcbiAgY29udGV4dCxcclxuICBhcmdzXHJcbn06IHtcclxuICBjb250ZXh0OiBhbnksXHJcbiAgYXJnczoge1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBtaW4/OiBudW1iZXIsXHJcbiAgICBtYXg/OiBudW1iZXIsXHJcbiAgICB0b2JlPzogYW55LFxyXG4gICAgaW52ZXJzZT86IGJvb2xlYW4sXHJcbiAgICBzdHJpY3Q/OiBib29sZWFuXHJcbiAgfVxyXG59KSA9PiBib29sZWFuO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gdmFsdWUgc2V0IGluIGxvb3RlclxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBjb250ZXh0ID0geyBhOiB7IGI6ICdmb28nLCBjOiB0cnVlLCBkOiBmYWxzZSB9IH07XHJcbiAqIGRlcGVuZENvbnRleHQoeyBjb250ZXh0LCBhcmdzOiB7IHByb3BlcnR5OiAnYS5iJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZENvbnRleHQoeyBjb250ZXh0LCBhcmdzOiB7IHByb3BlcnR5OiAnYS5iJywgdG9iZTogJ2ZvbycgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRDb250ZXh0KHsgY29udGV4dCwgYXJnczogeyBwcm9wZXJ0eTogJ2EuYycsIHRvYmU6ICdmb28nIH0gfSk7IC8vIGZhbHNlXHJcbiAqIGRlcGVuZENvbnRleHQoeyBjb250ZXh0LCBhcmdzOiB7IHByb3BlcnR5OiAnYS5jJyB9IH0pOyAvLyB0cnVlXHJcbiAqIGRlcGVuZENvbnRleHQoeyBjb250ZXh0LCBhcmdzOiB7IHByb3BlcnR5OiAnYS5kJyB9IH0pOyAvLyBmYWxzZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBVc2UgaW4gYSBqc29uIGZpbGU6XHJcbiAqIHtcclxuICogICBcInBvb2xzXCI6IFtcclxuICogICAgIHtcclxuICogICAgICAgXCJjb25kaXRpb25zXCI6IFtcclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiZGVwZW5kQ29udGV4dFwiLFxyXG4gKiAgICAgICAgICAgXCJhcmdzXCI6IHtcclxuICogICAgICAgICAgICAgXCJwcm9wZXJ0eVwiOiBcInBoeXNpY2FsLndldFwiXHJcbiAqICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgICBdLFxyXG4gKiAgICAgICBcImVudHJpZXNcIjogW1xyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgIFwiaWRcIjogXCJzb2dneV9uZXdzcGFwZXJcIlxyXG4gKiAgICAgICAgIH1cclxuICogICAgICAgXVxyXG4gKiAgICAgfVxyXG4gKiAgIF1cclxuICogfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlcGVuZENvbnRleHQ6IERlcGVuZENvbnRleHRTaWduYXR1cmUgPSAoeyBjb250ZXh0LCBhcmdzIH0pID0+IHtcclxuICByZXR1cm4gZGVwZW5kKGNvbnRleHQsIGFyZ3MpO1xyXG59O1xyXG5cclxudHlwZSBEZXBlbmRMb290ZXJTaWduYXR1cmUgPSAoe1xyXG4gIGxvb3RlcixcclxuICBhcmdzXHJcbn06IHtcclxuICBsb290ZXI6IGFueSxcclxuICBhcmdzOiB7XHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIG1pbj86IG51bWJlcixcclxuICAgIG1heD86IG51bWJlcixcclxuICAgIHRvYmU/OiBhbnksXHJcbiAgICBpbnZlcnNlPzogYm9vbGVhbixcclxuICAgIHN0cmljdD86IGJvb2xlYW5cclxuICB9XHJcbn0pID0+IGJvb2xlYW47XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvbiB2YWx1ZSBzZXQgaW4gbG9vdGVyXHJcbiAqIEBwYXJhbSBhcmdzXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IGxvb3RlciA9IHsgYTogeyBiOiAnZm9vJywgYzogdHJ1ZSwgZDogZmFsc2UgfSB9O1xyXG4gKiBkZXBlbmRMb290ZXIoeyBsb290ZXIsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmInIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kTG9vdGVyKHsgbG9vdGVyLCBhcmdzOiB7IHByb3BlcnR5OiAnYS5iJywgdG9iZTogJ2ZvbycgfSB9KTsgLy8gdHJ1ZVxyXG4gKiBkZXBlbmRMb290ZXIoeyBsb290ZXIsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmMnLCB0b2JlOiAnZm9vJyB9IH0pOyAvLyBmYWxzZVxyXG4gKiBkZXBlbmRMb290ZXIoeyBsb290ZXIsIGFyZ3M6IHsgcHJvcGVydHk6ICdhLmMnIH0gfSk7IC8vIHRydWVcclxuICogZGVwZW5kTG9vdGVyKHsgbG9vdGVyLCBhcmdzOiB7IHByb3BlcnR5OiAnYS5kJyB9IH0pOyAvLyBmYWxzZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBVc2UgaW4gYSBqc29uIGZpbGU6XHJcbiAqIHtcclxuICogICBcInBvb2xzXCI6IFtcclxuICogICAgIHtcclxuICogICAgICAgXCJjb25kaXRpb25zXCI6IFtcclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiZGVwZW5kTG9vdGVyXCIsXHJcbiAqICAgICAgICAgICBcImFyZ3NcIjoge1xyXG4gKiAgICAgICAgICAgICBcInByb3BlcnR5XCI6IFwic3RhdHVzLnNpY2tuZXNzXCIsXHJcbiAqICAgICAgICAgICAgIFwibWluXCI6IDAuNVxyXG4gKiAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICogICAgICAgXSxcclxuICogICAgICAgXCJlbnRyaWVzXCI6IFtcclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICBcImlkXCI6IFwic2lja25lc3NfaGVhbGluZ19wYWNrXCJcclxuICogICAgICAgICB9XHJcbiAqICAgICAgIF1cclxuICogICAgIH1cclxuICogICBdXHJcbiAqIH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBkZXBlbmRMb290ZXI6IERlcGVuZExvb3RlclNpZ25hdHVyZSA9ICh7IGxvb3RlciwgYXJncyB9KSA9PiB7XHJcbiAgcmV0dXJuIGRlcGVuZChsb290ZXIsIGFyZ3MpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZSB9IGZyb20gJy4vLi4vdGFibGUnO1xyXG5pbXBvcnQgeyBSbmdJbnRlcmZhY2UgfSBmcm9tICcuLy4uL3JuZyc7XHJcbmltcG9ydCB7XHJcbiAgZG90U2V0LFxyXG4gIGRvdEdldFxyXG59IGZyb20gJy4vLi4vdXRpbHMnO1xyXG5cclxudHlwZSBJbmhlcml0TG9vdGVyU2lnbmF0dXJlID0gKHtcclxuICBsb290ZWQsXHJcbiAgbG9vdGVyLFxyXG4gIGFyZ3NcclxufToge1xyXG4gIGxvb3RlZDogYW55LFxyXG4gIGxvb3RlcjogYW55LFxyXG4gIGFyZ3M6IHtcclxuICAgIHByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgbG9vdGVyUHJvcGVydHk/OiBzdHJpbmcsXHJcbiAgICBsb290ZWRQcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGRlZmF1bHQ/OiBhbnksXHJcbiAgfVxyXG59KSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEluaGVyaXRzIHNvbWUgcHJvcGVydHkgZnJvbSBsb290ZXIgdG8gbG9vdGVkXHJcbiAqIEBwYXJhbSBhcmdzXHJcbiAqIEBleGFtcGxlXHJcbiAqIGluaGVyaXRMb290ZXIoe2xvb3RlZCwgbG9vdGVyLCB7XHJcbiAqICAgbG9vdGVyUHJvcGVydHk6ICdlcXVpcHBlZC5jb2xvcicsXHJcbiAqICAgbG9vdGVkUHJvcGVydHk6ICdpdGVtLmNvbG9yJ1xyXG4gKiAgIGRlZmF1bHQ6ICdyZWQnLFxyXG4gKiB9fSlcclxuICovXHJcbmV4cG9ydCBjb25zdCBpbmhlcml0TG9vdGVyOiBJbmhlcml0TG9vdGVyU2lnbmF0dXJlID0gKHsgbG9vdGVkLCBsb290ZXIsIGFyZ3MgfSkgPT4ge1xyXG4gIGRvdFNldChsb290ZWQsIGFyZ3MucHJvcGVydHkgPz8gYXJncy5sb290ZWRQcm9wZXJ0eSwgZG90R2V0KGxvb3RlciwgYXJncy5wcm9wZXJ0eSA/PyBhcmdzLmxvb3RlclByb3BlcnR5LCBhcmdzLmRlZmF1bHQpKTtcclxufTtcclxuXHJcbnR5cGUgSW5oZXJpdENvbnRleHRTaWduYXR1cmUgPSAoe1xyXG4gIGxvb3RlZCxcclxuICBjb250ZXh0LFxyXG4gIGFyZ3NcclxufToge1xyXG4gIGxvb3RlZDogYW55LFxyXG4gIGNvbnRleHQ6IGFueSxcclxuICBhcmdzOiB7XHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGNvbnRleHRQcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGxvb3RlZFByb3BlcnR5Pzogc3RyaW5nLFxyXG4gICAgZGVmYXVsdD86IGFueSxcclxuICB9XHJcbn0pID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogSW5oZXJpdHMgc29tZSBwcm9wZXJ0eSBmcm9tIGNvbnRleHQgdG8gbG9vdGVkXHJcbiAqIEBwYXJhbSBhcmdzXHJcbiAqIEBleGFtcGxlXHJcbiAqIGluaGVyaXRDb250ZXh0KHtsb290ZWQsIGxvb3Rlciwge1xyXG4gKiAgIGNvbnRleHRQcm9wZXJ0eTogJ2R5ZWQuY29sb3InLFxyXG4gKiAgIGxvb3RlZFByb3BlcnR5OiAnaXRlbS5jb2xvcidcclxuICogICBkZWZhdWx0OiAnYnJvd24nLFxyXG4gKiB9fSlcclxuICovXHJcbmV4cG9ydCBjb25zdCBpbmhlcml0Q29udGV4dDogSW5oZXJpdENvbnRleHRTaWduYXR1cmUgPSAoeyBsb290ZWQsIGNvbnRleHQsIGFyZ3MgfSkgPT4ge1xyXG4gIGRvdFNldChsb290ZWQsIGFyZ3MucHJvcGVydHkgPz8gYXJncy5sb290ZWRQcm9wZXJ0eSwgZG90R2V0KGNvbnRleHQsIGFyZ3MucHJvcGVydHkgPz8gYXJncy5jb250ZXh0UHJvcGVydHksIGFyZ3MuZGVmYXVsdCkpO1xyXG59O1xyXG5cclxudHlwZSBTZXRUb1JhbmRvbUNob2ljZVNpZ25hdHVyZSA9ICh7XHJcbiAgcm5nLFxyXG4gIGxvb3RlZCxcclxuICBhcmdzXHJcbn06IHtcclxuICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICBsb290ZWQ6IGFueSxcclxuICBhcmdzOiB7XHJcbiAgICBwcm9wZXJ0eT86IHN0cmluZyxcclxuICAgIGNob2ljZXM/OiBBcnJheTxhbnk+IHwgUmVjb3JkPGFueSwgbnVtYmVyPiB8IE1hcDxhbnksIG51bWJlcj5cclxuICB9XHJcbn0pID0+IHZvaWQ7XHJcblxyXG4vKipcclxuICogU2V0cyBhIHByb3BlcnR5IG9mIGxvb3RlZCB0byBzb21lIHJhbmRvbSBjaG9pY2UgZnJvbSBjaG9pY2VzIGxpc3RcclxuICpcclxuICogQ2hvaWNlcyBjYW4gYmUgYSBzaW1wbGUgYXJyYXksIG9yIGEgbWFwIG9mIGFueXRoaW5nID0+IHdlaWdodC5cclxuICpcclxuICogQHBhcmFtIGFyZ3NcclxuICogQGV4YW1wbGVcclxuICogc2V0VG9SYW5kb21DaG9pY2Uoe3JuZywgbG9vdGVkLCB7XHJcbiAqICAgcHJvcGVydHk6ICdpdGVtLmNvbG9yJyxcclxuICogICBjaG9pY2VzOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ11cclxuICogfX0pOyAvLyBsb290ZWQuaXRlbS5jb2xvciB3aWxsIGJlIG9uZSBvZiByZWQsIGdyZWVuIG9yIGJsdWUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0VG9SYW5kb21DaG9pY2U6IFNldFRvUmFuZG9tQ2hvaWNlU2lnbmF0dXJlID0gKHsgcm5nLCBsb290ZWQsIGFyZ3MgfSkgPT4ge1xyXG4gIGNvbnN0IHsgcHJvcGVydHksIGNob2ljZXMgfSA9IGFyZ3M7XHJcbiAgaWYgKHByb3BlcnR5ICYmIGxvb3RlZCAmJiBjaG9pY2VzKSB7XHJcbiAgICBkb3RTZXQobG9vdGVkLCBwcm9wZXJ0eSwgcm5nLndlaWdodGVkQ2hvaWNlKGNob2ljZXMpKTtcclxuICB9XHJcbn07XHJcbiIsImRlY2xhcmUgbGV0IFBST0RVQ1RJT046IGJvb2xlYW47XHJcblxyXG5sZXQgZGVidWcgPSBmYWxzZTtcclxuaWYgKHR5cGVvZiBQUk9EVUNUSU9OICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGRlYnVnID0gIVBST0RVQ1RJT047XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2dnaW5nIGZ1bmN0aW9ucyB0aGF0IGRpc2FwcGVhcnMgaW4gcHJvZHVjdGlvbixcclxuICogYW5kIHN0aWxsIGdpdmUgYWNjdXJhdGUgbGluZSBudW1iZXJzIGluIGRldi5cclxuICovXHJcblxyXG4vKipcclxuICogVHJpZ2dlciB2ZXJib3NlIGxvZ3NcclxuICovXHJcbi8vIGRlYnVnID0gZmFsc2U7XHJcbmNvbnN0IHZlcmJvc2UgPSB0cnVlO1xyXG5jb25zdCB1bHRyYXZlcmJvc2UgPSB0cnVlO1xyXG5cclxuY29uc3Qgdm9pZEZ1bmMgPSAoLi4uYXJnczogYW55KTogdm9pZCA9PiB7fTtcclxubGV0IHIgPSB7XHJcbiAgZGVidWc6IHZvaWRGdW5jLFxyXG4gIHY6IHZvaWRGdW5jLFxyXG4gIHZ2OiB2b2lkRnVuYyxcclxuICB2aTogdm9pZEZ1bmMsXHJcbiAgdmU6IHZvaWRGdW5jLFxyXG4gIHZnOiB2b2lkRnVuYyxcclxuICB2Z2U6IHZvaWRGdW5jLFxyXG4gIHZnYzogdm9pZEZ1bmMsXHJcbiAgdnQ6IHZvaWRGdW5jLFxyXG4gIGQ6IHZvaWRGdW5jLFxyXG4gIGc6IHZvaWRGdW5jLFxyXG4gIGdlOiB2b2lkRnVuYyxcclxuICBnYzogdm9pZEZ1bmMsXHJcbiAgdDogdm9pZEZ1bmMsXHJcbiAgdGU6IHZvaWRGdW5jLFxyXG4gIHRpbWU6IHZvaWRGdW5jLFxyXG4gIHRpbWVFbmQ6IHZvaWRGdW5jLFxyXG4gIGdyb3VwOiB2b2lkRnVuYyxcclxuICBncm91cEVuZDogdm9pZEZ1bmMsXHJcbiAgZ3JvdXBDb2xsYXBzZWQ6IHZvaWRGdW5jLFxyXG4gIGxvZzogdm9pZEZ1bmMsXHJcbiAgZXJyb3I6IHZvaWRGdW5jLFxyXG4gIHRhYmxlOiB2b2lkRnVuYyxcclxuICBpbmZvOiB2b2lkRnVuYyxcclxufTtcclxuaWYgKGRlYnVnKSB7XHJcbiAgciA9IHtcclxuICAgIC4uLnIsXHJcbiAgICAuLi57XHJcbiAgICAgIGRlYnVnOiBmdW5jdGlvbiAoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGVidWcpIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkOiBjb25zb2xlLmxvZyxcclxuICAgICAgZzogY29uc29sZS5ncm91cCxcclxuICAgICAgZ2U6IGNvbnNvbGUuZ3JvdXBFbmQsXHJcbiAgICAgIGdjOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxyXG4gICAgICBncm91cDogY29uc29sZS5ncm91cCxcclxuICAgICAgZ3JvdXBFbmQ6IGNvbnNvbGUuZ3JvdXBFbmQsXHJcbiAgICAgIGdyb3VwQ29sbGFwc2VkOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxyXG4gICAgICBsb2c6IGNvbnNvbGUubG9nLFxyXG4gICAgICBlcnJvcjogY29uc29sZS5lcnJvcixcclxuICAgICAgdGFibGU6IGNvbnNvbGUudGFibGUsXHJcbiAgICAgIGluZm86IGNvbnNvbGUuaW5mb1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaWYgKHZlcmJvc2UpIHtcclxuICAgIHIgPSB7XHJcbiAgICAgIC4uLnIsXHJcbiAgICAgIC4uLntcclxuICAgICAgICB2OiBjb25zb2xlLmxvZyxcclxuICAgICAgICB2aTogY29uc29sZS5pbmZvLFxyXG4gICAgICAgIHZlOiBjb25zb2xlLmVycm9yLFxyXG4gICAgICAgIHZnOiBjb25zb2xlLmdyb3VwLFxyXG4gICAgICAgIHZnZTogY29uc29sZS5ncm91cEVuZCxcclxuICAgICAgICB2Z2M6IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQsXHJcbiAgICAgICAgdnQ6IGNvbnNvbGUudGFibGUsXHJcbiAgICAgICAgdDogY29uc29sZS50aW1lLFxyXG4gICAgICAgIHRlOiBjb25zb2xlLnRpbWVFbmQsXHJcbiAgICAgICAgdGltZTogY29uc29sZS50aW1lLFxyXG4gICAgICAgIHRpbWVFbmQ6IGNvbnNvbGUudGltZUVuZCxcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKHVsdHJhdmVyYm9zZSkge1xyXG4gICAgci52diA9IGNvbnNvbGUubG9nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcjtcclxuIiwiY29uc3QgTUFYX1JFQ1VSU0lPTlMgPSAxMDA7XHJcbmNvbnN0IFRIUk9XX09OX01BWF9SRUNVUlNJT05TX1JFQUNIRUQgPSB0cnVlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSYW5kb21JbnRlcmZhY2Uge1xyXG4gIHJhbmRvbSgpIDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpY2VJbnRlcmZhY2Uge1xyXG4gIG46IG51bWJlcjtcclxuICBkOiBudW1iZXI7XHJcbiAgcGx1czogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZVxyXG4gKiBAcHJvcCBtZWFuICAgVXNlZCBmb3IgXCJub3JtYWxcIiB0eXBlIGNoYW5jeSByZXN1bHRzIHRvIGRldGVybWluZSB0aGUgbWVhblxyXG4gKiBAcHJvcCBzdGRkZXYgVXNlZCBmb3IgXCJub3JtYWxcIiB0eXBlIGNoYW5jeSByZXN1bHRzIHRvIGRldGVybWluZSB0aGUgc3RkZGV2XHJcbiAqIEBwcm9wIG1pbiAgICBUaGUgbWluaW11bSBwb3NzaWJsZSByZXN1bHRcclxuICogQHByb3AgbWF4ICAgIFRoZSBtYXhpbXVtIHBvc3NpYmxlIHJlc3VsdFxyXG4gKiBAcHJvcCB0eXBlICAgVGhlIHR5cGUgb2YgcmVzdWx0LCBjYW4gYmUgXCJub3JtYWxcIiwgXCJub3JtYWxfaW50XCIsIFwiaW50ZWdlclwiIG9yIFwicmFuZG9tXCJcclxuICogQHByb3AgcG93ZXIgIFRoZSBwb3dlciBmYWN0b3IgdG8gcGFzcyB0byB0aGUgcmFuZG9tIGZ1bmN0aW9uIC0gYmFzaWNhbGx5IHNrZXdzIHJlc3VsdHMgb25lIHdheSBvciB0aGUgb3RoZXJcclxuICogQHByb3Agc2tldyAgIFNrZXcgdG8gdXNlIHdoZW4gdXNpbmcgYSBcIm5vcm1hbFwiIG9yIFwibm9ybWFsX2ludFwiIGRpc3RyaWJ1dGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuY3lJbnRlcmZhY2Uge1xyXG4gIG1lYW4/OiBudW1iZXI7XHJcbiAgc3RkZGV2PzogbnVtYmVyO1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbiAgdHlwZT86IHN0cmluZztcclxuICBza2V3PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDaGFuY3kgPSBDaGFuY3lJbnRlcmZhY2UgfCBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG5leHBvcnQgdHlwZSBTZWVkID0gc3RyaW5nIHwgbnVtYmVyO1xyXG5cclxuZXhwb3J0IHR5cGUgTWF0aEZ1bmMgPSAnZmxvb3InIHwgJ2NlaWwnIHwgJ3JvdW5kJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm5nSW50ZXJmYWNlIHtcclxuICBwcmVkaWN0YWJsZShzZWVkPzogU2VlZCkgOiBSbmdJbnRlcmZhY2U7XHJcbiAgaGFzaFN0cihzdHIgOiBzdHJpbmcpIDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIGNvbnZlcnRTdHJpbmdUb051bWJlcihzdHIgOiBzdHJpbmcpIDogbnVtYmVyO1xyXG4gIGdldFNlZWQoKSA6IG51bWJlcjtcclxuICBzYW1lQXMob3RoZXI6IFJuZ0ludGVyZmFjZSkgOiBib29sZWFuO1xyXG4gIHNlZWQoc2VlZCA6IFNlZWQpIDogdGhpcztcclxuICBwZXJjZW50YWdlKCkgOiBudW1iZXI7XHJcbiAgcmFuZG9tKGZyb20/IDogbnVtYmVyLCB0bz8gOiBudW1iZXIsIHNrZXc/IDogbnVtYmVyKSA6IG51bWJlcjtcclxuICBjaGFuY2UobiA6IG51bWJlciwgY2hhbmNlSW4/IDogbnVtYmVyKSA6IGJvb2xlYW47XHJcbiAgY2hhbmNlVG8oZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIpIDogYm9vbGVhbjtcclxuICByYW5kSW50KGZyb20/IDogbnVtYmVyLCB0bz8gOiBudW1iZXIsIHNrZXc/IDogbnVtYmVyKSA6IG51bWJlcjtcclxuICB1bmlxaWQocHJlZml4Pzogc3RyaW5nLCByYW5kb20/OiBib29sZWFuKSA6IHN0cmluZztcclxuICB1bmlxc3RyKGxlbj86IG51bWJlcikgOiBzdHJpbmc7XHJcbiAgcmFuZEJldHdlZW4oZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIsIHNrZXcgOiBudW1iZXIpIDogbnVtYmVyO1xyXG4gIG5vcm1hbChhcmdzPzogTm9ybWFsQXJncykgOiBudW1iZXI7XHJcbiAgY2hhbmN5SW50KGlucHV0IDogQ2hhbmN5LCBmbiA/OiBNYXRoRnVuYykgOiBudW1iZXI7XHJcbiAgY2hhbmN5KGlucHV0IDogQ2hhbmN5KSA6IG51bWJlcjtcclxuICBjaG9pY2UoZGF0YSA6IEFycmF5PGFueT4pIDogYW55O1xyXG4gIHdlaWdodGVkQ2hvaWNlKGRhdGEgOiBSZWNvcmQ8YW55LCBudW1iZXI+IHwgQXJyYXk8YW55PiB8IE1hcDxhbnksIG51bWJlcj4pIDogYW55O1xyXG4gIGRpY2UobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIsIGQ/IDogbnVtYmVyLCBwbHVzPyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgcGFyc2VEaWNlU3RyaW5nKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlO1xyXG4gIGNsYW1wKG51bWJlciA6IG51bWJlciwgbG93ZXIgOiBudW1iZXIsIHVwcGVyIDogbnVtYmVyKSA6IG51bWJlcjtcclxuICBiaW4odmFsIDogbnVtYmVyLCBiaW5zIDogbnVtYmVyLCBtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgc2VyaWFsaXplKCkgOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm5nQ29uc3RydWN0b3Ige1xyXG4gIG5ldyAoc2VlZD86U2VlZCk6IFJuZ0ludGVyZmFjZTtcclxuICB1bnNlcmlhbGl6ZShybmc6IGFueSk6IFJuZ0ludGVyZmFjZTtcclxuICBjaGFuY3lNaW4oaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyO1xyXG4gIGNoYW5jeU1heChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXI7XHJcbiAgcGFyc2VEaWNlU3RyaW5nKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlO1xyXG4gIGRpY2VNaW4obiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIsIGQ/IDogbnVtYmVyLCBwbHVzPyA6IG51bWJlcikgOiBudW1iZXI7XHJcbiAgZGljZU1heChuIDogc3RyaW5nIHwgRGljZUludGVyZmFjZSB8IG51bWJlciwgZD8gOiBudW1iZXIsIHBsdXM/IDogbnVtYmVyKSA6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgZGljZVJlIDogUmVnRXhwID0gL14gKihbMC05XSspICpbZERdICooWzAtOV0rKSAqKFsrLV0/ICpbMC05XSopICokLztcclxuY29uc3QgZGljZVJlTm9Jbml0IDogUmVnRXhwID0gL14gKltkRF0gKihbMC05XSspICooWystXT8gKlswLTldKikgKiQvO1xyXG5jb25zdCBzdHJUb051bWJlckNhY2hlIDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG5jb25zdCBkaWNlQ2FjaGUgOiBSZWNvcmQ8c3RyaW5nLCBEaWNlSW50ZXJmYWNlPiA9IHt9O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkUm5nIHtcclxuICBtYXNrOiBudW1iZXIsXHJcbiAgc2VlZDogbnVtYmVyLFxyXG4gIG1fejogbnVtYmVyLFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBOb3JtYWxBcmdzID0ge1xyXG4gIG1lYW4/OiBudW1iZXIsXHJcbiAgc3RkZGV2PzogbnVtYmVyLFxyXG4gIG1heD86IG51bWJlcixcclxuICBtaW4/OiBudW1iZXIsXHJcbiAgc2tldz86IG51bWJlcixcclxuICBza2V3dHlwZT86IHN0cmluZyxcclxufTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSbmdBYnN0cmFjdCBpbXBsZW1lbnRzIFJuZ0ludGVyZmFjZSB7XHJcbiAgI3NlZWQ6IG51bWJlciA9IDA7XHJcbiAgY29uc3RydWN0b3IgKHNlZWQ/IDogU2VlZCkge1xyXG4gICAgdGhpcy5zZXRTZWVkKHNlZWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNlZWQgKCkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2FtZUFzIChvdGhlciA6IFJuZ0Fic3RyYWN0KSA6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlZWQgPT09IG90aGVyLiNzZWVkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldFNlZWQgKHNlZWQ/IDogU2VlZCkgOiB0aGlzIHtcclxuICAgIGlmICh0eXBlb2Ygc2VlZCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VlZCAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodHlwZW9mIHNlZWQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgc2VlZCA9IHRoaXMuY29udmVydFN0cmluZ1RvTnVtYmVyKHNlZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuI3NlZWQgPSBzZWVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0U2VlZChNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VlZCAoc2VlZD86IFNlZWQpOiB0aGlzIHtcclxuICAgIHRoaXMuc2V0U2VlZChzZWVkKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlcmlhbGl6ZSAoKSA6IGFueSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWVkOiB0aGlzLiNzZWVkLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdW5zZXJpYWxpemUgKHNlcmlhbGl6ZWQgOiBTZXJpYWxpemVkUm5nKSA6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICBjb25zdCB7IGNvbnN0cnVjdG9yIH0gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XHJcbiAgICBjb25zdCBybmcgPSBuZXcgY29uc3RydWN0b3Ioc2VyaWFsaXplZC5zZWVkKTtcclxuICAgIHJuZy5zZXRTZWVkKHNlcmlhbGl6ZWQuc2VlZCk7XHJcbiAgICByZXR1cm4gcm5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZWRpY3RhYmxlIChzZWVkPyA6IFNlZWQpIDogUm5nSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIGNvbnN0IG5ld1NlbGYgOiBSbmdJbnRlcmZhY2UgPSBuZXcgY29uc3RydWN0b3Ioc2VlZCk7XHJcbiAgICByZXR1cm4gbmV3U2VsZjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcHJlZGljdGFibGU8VCBleHRlbmRzIFJuZ0Fic3RyYWN0Pih0aGlzOiBuZXcgKHNlZWQ6IFNlZWQpID0+IFQsIHNlZWQ6IFNlZWQpOiBUIHtcclxuICAgIHJldHVybiBuZXcgdGhpcyhzZWVkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNoU3RyIChzdHIgOiBzdHJpbmcpIDogbnVtYmVyIHtcclxuICAgIGxldCBoYXNoID0gMDtcclxuICAgIGxldCBpO1xyXG4gICAgbGV0IGNocjtcclxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSByZXR1cm4gaGFzaDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2hyID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcclxuICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnZlcnRTdHJpbmdUb051bWJlciAoc3RyIDogc3RyaW5nKSA6IG51bWJlciB7XHJcbiAgICBpZiAoc3RyVG9OdW1iZXJDYWNoZVtzdHJdKSB7XHJcbiAgICAgIHJldHVybiBzdHJUb051bWJlckNhY2hlW3N0cl07XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW0gPSB0aGlzLmhhc2hTdHIoc3RyKTtcclxuICAgIHN0clRvTnVtYmVyQ2FjaGVbc3RyXSA9IG51bTtcclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3JhbmRvbSAoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBlcmNlbnRhZ2UgKCkgOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucmFuZEJldHdlZW4oMCwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByYW5kb20gKGZyb20gOiBudW1iZXIgPSAwLCB0byA6IG51bWJlciA9IDEsIHNrZXcgOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5yYW5kQmV0d2Vlbihmcm9tLCB0bywgc2tldyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmNlIChuIDogbnVtYmVyLCBjaGFuY2VJbiA6IG51bWJlciA9IDEpIDogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBjaGFuY2UgPSBuIC8gY2hhbmNlSW47XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZG9tKCkgPD0gY2hhbmNlO1xyXG4gIH1cclxuXHJcbiAgLy8gNTAwIHRvIDEgY2hhbmNlLCBmb3IgZXhhbXBsZVxyXG4gIHB1YmxpYyBjaGFuY2VUbyAoZnJvbSA6IG51bWJlciwgdG8gOiBudW1iZXIpIDogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZG9tKCkgPD0gKGZyb20gLyAoZnJvbSArIHRvKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmFuZEludCAoZnJvbSA9IDAsIHRvID0gMSwgc2tldyA9IDApIDogbnVtYmVyIHtcclxuICAgIFtmcm9tLCB0b10gPSBbTWF0aC5taW4oZnJvbSwgdG8pLCBNYXRoLm1heChmcm9tLCB0byldO1xyXG4gICAgbGV0IHJhbmQgPSB0aGlzLl9yYW5kb20oKTtcclxuICAgIGlmIChza2V3IDwgMCkge1xyXG4gICAgICByYW5kID0gMSAtIChNYXRoLnBvdyhyYW5kLCBNYXRoLnBvdygyLCBza2V3KSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZCA9IE1hdGgucG93KHJhbmQsIE1hdGgucG93KDIsIC1za2V3KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5kICogKCh0byArIDEpIC0gZnJvbSkpICsgZnJvbTtcclxuICB9XHJcblxyXG4gIC8vIE5vdCBkZXRlcm1pbmlzdGljXHJcbiAgcHVibGljIHVuaXFpZCAocHJlZml4IDogc3RyaW5nID0gJycsIHJhbmRvbSA6IGJvb2xlYW4gPSBmYWxzZSkgOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2VjID0gRGF0ZS5ub3coKSAqIDEwMDAgKyBNYXRoLnJhbmRvbSgpICogMTAwMDtcclxuICAgIGNvbnN0IGlkID0gc2VjLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9cXC4vZywgJycpLnBhZEVuZCgxNCwgJzAnKTtcclxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtpZH0ke3JhbmRvbSA/IGAuJHtNYXRoLnRydW5jKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApfWAgOiAnJ31gO1xyXG4gIH1cclxuXHJcbiAgLy8gRGV0ZXJtaW5pc3RpY1xyXG4gIHB1YmxpYyB1bmlxc3RyIChsZW46IG51bWJlciA9IDYpIDogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN0ciA6IHN0cmluZ1tdID0gW107XHJcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OSc7XHJcbiAgICBjb25zdCBhbGVuID0gNjE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHN0ci5wdXNoKGFscGhhYmV0W3RoaXMucmFuZEludCgwLCBhbGVuKV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByYW5kQmV0d2VlbiAoZnJvbSA6IG51bWJlciA9IDAsIHRvIDogbnVtYmVyID0gMSwgc2tldyA6IG51bWJlciA9IDApOiBudW1iZXIge1xyXG4gICAgW2Zyb20sIHRvXSA9IFtNYXRoLm1pbihmcm9tLCB0byksIE1hdGgubWF4KGZyb20sIHRvKV07XHJcbiAgICBsZXQgcmFuZCA9IHRoaXMuX3JhbmRvbSgpO1xyXG4gICAgaWYgKHNrZXcgPCAwKSB7XHJcbiAgICAgIHJhbmQgPSAxIC0gKE1hdGgucG93KHJhbmQsIE1hdGgucG93KDIsIHNrZXcpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYW5kID0gTWF0aC5wb3cocmFuZCwgTWF0aC5wb3coMiwgLXNrZXcpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnNjYWxlTm9ybShyYW5kLCBmcm9tLCB0byk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2NhbGUgKG51bWJlcjogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxKTogbnVtYmVyIHtcclxuICAgIGlmIChudW1iZXIgPiBtYXgpIHRocm93IG5ldyBFcnJvcihgTnVtYmVyICR7bnVtYmVyfSBpcyBncmVhdGVyIHRoYW4gbWF4IG9mICR7bWF4fWApO1xyXG4gICAgaWYgKG51bWJlciA8IG1pbikgdGhyb3cgbmV3IEVycm9yKGBOdW1iZXIgJHtudW1iZXJ9IGlzIGxlc3MgdGhhbiBtaW4gb2YgJHttaW59YCk7XHJcbiAgICAvLyBGaXJzdCB3ZSBzY2FsZSB0aGUgbnVtYmVyIGluIHRoZSByYW5nZSBbMC0xKVxyXG4gICAgbnVtYmVyID0gKG51bWJlciAtIG1pbikgLyAobWF4IC0gbWluKTtcclxuICAgIHJldHVybiB0aGlzLnNjYWxlTm9ybShudW1iZXIsIGZyb20sIHRvKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY2FsZU5vcm0gKG51bWJlcjogbnVtYmVyLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKG51bWJlciA+IDEgfHwgbnVtYmVyIDwgMCkgdGhyb3cgbmV3IEVycm9yKGBOdW1iZXIgbXVzdCBiZSA8IDEgYW5kID4gMCwgZ290ICR7bnVtYmVyfWApO1xyXG4gICAgcmV0dXJuIChudW1iZXIgKiAodG8gLSBmcm9tKSkgKyBmcm9tO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3VsZFRocm93T25NYXhSZWN1cnNpb25zUmVhY2hlZCAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gVEhST1dfT05fTUFYX1JFQ1VSU0lPTlNfUkVBQ0hFRDtcclxuICB9XHJcblxyXG4gIC8vIEdhdXNzaWFuIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcclxuICBwdWJsaWMgbm9ybWFsICh7IG1lYW4sIHN0ZGRldiA9IDEsIG1heCwgbWluLCBza2V3ID0gMCB9IDogTm9ybWFsQXJncyA9IHt9LCBkZXB0aCA9IDApOiBudW1iZXIge1xyXG4gICAgaWYgKGRlcHRoID4gTUFYX1JFQ1VSU0lPTlMgJiYgdGhpcy5zaG91bGRUaHJvd09uTWF4UmVjdXJzaW9uc1JlYWNoZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01heCByZWN1cnNpdmUgY2FsbHMgdG8gcm5nIG5vcm1hbCBmdW5jdGlvbi4gVGhpcyBtaWdodCBiZSBhcyBhIHJlc3VsdCBvZiB1c2luZyBwcmVkaWN0YWJsZSByYW5kb20gbnVtYmVycz8nKTtcclxuICAgIH1cclxuICAgIGxldCBudW0gPSB0aGlzLmJveE11bGxlcigpO1xyXG4gICAgbnVtID0gbnVtIC8gMTAuMCArIDAuNTsgLy8gVHJhbnNsYXRlIHRvIDAgLT4gMVxyXG4gICAgaWYgKGRlcHRoID4gTUFYX1JFQ1VSU0lPTlMpIHtcclxuICAgICAgbnVtID0gTWF0aC5taW4oTWF0aC5tYXgobnVtLCAwKSwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobnVtID4gMSB8fCBudW0gPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKHsgbWVhbiwgc3RkZGV2LCBtYXgsIG1pbiwgc2tldyB9LCBkZXB0aCArIDEpOyAvLyByZXNhbXBsZSBiZXR3ZWVuIDAgYW5kIDFcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChza2V3IDwgMCkge1xyXG4gICAgICBudW0gPSAxIC0gKE1hdGgucG93KG51bSwgTWF0aC5wb3coMiwgc2tldykpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG51bSA9IE1hdGgucG93KG51bSwgTWF0aC5wb3coMiwgLXNrZXcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG1lYW4gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG1lYW4gPSAwO1xyXG4gICAgICBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBudW0gKj0gbWF4IC0gbWluO1xyXG4gICAgICAgIG51bSArPSBtaW47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtID0gbnVtICogMTA7XHJcbiAgICAgICAgbnVtID0gbnVtIC0gNTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbnVtID0gbnVtICogMTA7XHJcbiAgICAgIG51bSA9IG51bSAtIDU7XHJcbiAgICAgIG51bSA9IG51bSAqIHN0ZGRldiArIG1lYW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlcHRoIDw9IE1BWF9SRUNVUlNJT05TICYmICgodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgbnVtID4gbWF4KSB8fCAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbnVtIDwgbWluKSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKHsgbWVhbiwgc3RkZGV2LCBtYXgsIG1pbiwgc2tldyB9LCBkZXB0aCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBhYm92ZSB0aGUgbWF4IHJlY3Vyc2lvbiBsaW1pdCwgd2UganVzdCBjbGFtcCB0aGUgbnVtYmVyLi4uXHJcbiAgICAvLyB0aGlzIGNhbiBoYXBwZW4gaW4gZXh0cmVtZSBjYXNlcyB3aGVyZSBwYXJhbWV0ZXJzIGFyZSB2ZXJ5IG1hcmdpbmFsLCBidXQgd2UgZG8gbm90XHJcbiAgICAvLyB3YW50IHRvIHJldHVybiBhbnkgb3V0IG9mIGJvdW5kcyBudW1iZXJzIGluIHRoZSBjYXNlIHRoYXQgbWF4IGFuZCBtaW4gYXJlIGdpdmVuLCBldmVuXHJcbiAgICAvLyBpZiB0aGV5IGFyZSBub3Qgc3RyaWN0bHkgbm9ybWFsbHkgZGlzdHJpYnV0ZWQgLSBpLmUuIHRoZXJlIHdpbGwgYmUgYSB2ZXJ5IG1hcmdpbmFsIGJpYXNcclxuICAgIC8vIHRvIHRoZSBib3VuZHMgbnVtYmVycyBpbiBjZXJ0YWluIGNhc2VzLCBidXQgaXQncyBsYXJnZWx5IGEgbm9uLWlzc3VlLlxyXG4gICAgaWYgKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG51bSA9IE1hdGgubWluKG51bSwgbWF4KTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBudW0gPSBNYXRoLm1heChudW0sIG1pbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuXHJcbiAgLy8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXHJcbiAgcHVibGljIGJveE11bGxlciAobWVhbiA6IG51bWJlciA9IDAsIHN0ZGRldiA6IG51bWJlciA9IDEpIDogbnVtYmVyIHtcclxuICAgIGNvbnN0IHUgPSAxIC0gdGhpcy5fcmFuZG9tKCk7IC8vIENvbnZlcnRpbmcgWzAsMSkgdG8gKDAsMV1cclxuICAgIGNvbnN0IHYgPSB0aGlzLl9yYW5kb20oKTtcclxuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKHUpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB2KTtcclxuICAgIC8vIFRyYW5zZm9ybSB0byB0aGUgZGVzaXJlZCBtZWFuIGFuZCBzdGFuZGFyZCBkZXZpYXRpb246XHJcbiAgICByZXR1cm4geiAqIHN0ZGRldiArIG1lYW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmN5SW50IChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaW5wdXQudHlwZSA9ICdpbnRlZ2VyJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNoYW5jeShpbnB1dCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmN5IChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGljZShpbnB1dCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICdub3JtYWwnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsKGlucHV0KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbF9pbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMubm9ybWFsKGlucHV0KSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRJbnQoXHJcbiAgICAgICAgICAgIGlucHV0Lm1pbiA/PyAwLFxyXG4gICAgICAgICAgICBpbnB1dC5tYXggPz8gMSxcclxuICAgICAgICAgICAgaW5wdXQuc2tldyA/PyAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRvbShcclxuICAgICAgICAgICAgaW5wdXQubWluID8/IDAsXHJcbiAgICAgICAgICAgIGlucHV0Lm1heCA/PyAxLFxyXG4gICAgICAgICAgICBpbnB1dC5za2V3ID8/IDBcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBpbnB1dDtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCBnaXZlbiB0byBjaGFuY3knKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY2hhbmN5TWluIChpbnB1dCA6IENoYW5jeSkgOiBudW1iZXIge1xyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGljZU1pbihpbnB1dCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC5za2V3ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgLy8gUmVndWxhciByYW5kb20gbnVtYmVycyBhcmUgZXZlbmx5IGRpc3RyaWJ1dGVkLCBzbyBza2V3XHJcbiAgICAgICAgICAvLyBvbmx5IG1ha2VzIHNlbnNlIG9uIG5vcm1hbCBudW1iZXJzXHJcbiAgICAgICAgICBpbnB1dC50eXBlID0gJ25vcm1hbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHN3aXRjaCAoaW5wdXQudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbCc6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWluID8/IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ25vcm1hbF9pbnRlZ2VyJzpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5taW4gPz8gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWluID8/IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1pbiA/PyAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYW5jeU1heCAoaW5wdXQgOiBDaGFuY3kpIDogbnVtYmVyIHtcclxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRpY2VNYXgoaW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQuc2tldyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIC8vIFJlZ3VsYXIgcmFuZG9tIG51bWJlcnMgYXJlIGV2ZW5seSBkaXN0cmlidXRlZCwgc28gc2tld1xyXG4gICAgICAgICAgLy8gb25seSBtYWtlcyBzZW5zZSBvbiBub3JtYWwgbnVtYmVyc1xyXG4gICAgICAgICAgaW5wdXQudHlwZSA9ICdub3JtYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcclxuICAgICAgICBjYXNlICdub3JtYWwnOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1heCA/PyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdub3JtYWxfaW50ZWdlcic6XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXQubWF4ID8/IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgcmV0dXJuIGlucHV0Lm1heCA/PyAxO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiBpbnB1dC5tYXggPz8gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNob2ljZSAoZGF0YSA6IEFycmF5PGFueT4pIDogYW55IHtcclxuICAgIHJldHVybiB0aGlzLndlaWdodGVkQ2hvaWNlKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGF0YSBmb3JtYXQ6XHJcbiAgICoge1xyXG4gICAqICAgY2hvaWNlMTogMSxcclxuICAgKiAgIGNob2ljZTI6IDIsXHJcbiAgICogICBjaG9pY2UzOiAzLFxyXG4gICAqIH1cclxuICAgKi9cclxuICBwdWJsaWMgd2VpZ2h0ZWRDaG9pY2UgKGRhdGEgOiBSZWNvcmQ8YW55LCBudW1iZXI+IHwgQXJyYXk8YW55PiB8IE1hcDxhbnksIG51bWJlcj4pIDogYW55IHtcclxuICAgIGxldCB0b3RhbCA9IDA7IGxldCBpZDtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAvLyBTb21lIHNob3J0Y3V0c1xyXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gZGF0YVswXTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjaGFuY2VzIDogTWFwPGFueSwgbnVtYmVyPiA9IG5ldyBNYXAoKTtcclxuICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgY2hhbmNlcy5zZXQoYSwgMSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHRlZENob2ljZShjaGFuY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE1hcCkge1xyXG4gICAgICAvLyBTb21lIHNob3J0Y3V0c1xyXG4gICAgICBpZiAoZGF0YS5zaXplID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRhdGEuc2l6ZSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhLmtleXMoKS5uZXh0KCkudmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgdG90YWwgKz0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU29tZSBzaG9ydGN1dHNcclxuICAgICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5rZXlzKGRhdGEpO1xyXG4gICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHs7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGVudHJpZXNbMF07XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGFbaWRdIDwgMCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9iYWJpbGl0eSBjYW5ub3QgYmUgbmVnYXRpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG90YWwgKz0gZGF0YVtpZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHJhbmRvbSA9IHRoaXMuX3JhbmRvbSgpICogdG90YWw7XHJcblxyXG4gICAgbGV0IHBhcnQgPSAwO1xyXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgICAgZm9yIChjb25zdCBbaWQsIHZhbHVlXSBvZiBkYXRhKSB7XHJcbiAgICAgICAgcGFydCArPSB2YWx1ZTtcclxuICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xyXG4gICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XHJcbiAgICAgICAgcGFydCArPSBkYXRhW2lkXTtcclxuICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xyXG4gICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGJ5IHNvbWUgZmxvYXRpbmctcG9pbnQgYW5ub3lhbmNlIHdlIGhhdmVcclxuICAgIC8vIHJhbmRvbSA+PSB0b3RhbCwganVzdCByZXR1cm4gdGhlIGxhc3QgaWQuXHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc3RhdGljIHBhcnNlRGljZUFyZ3MgKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgaWYgKG4gPT09IG51bGwgfHwgdHlwZW9mIG4gPT09ICd1bmRlZmluZWQnIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpY2UgZXhwZWN0cyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VEaWNlU3RyaW5nKG4pO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBuID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuKSkge1xyXG4gICAgICAgIFtuLCBkLCBwbHVzXSA9IG47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IG4uZDtcclxuICAgICAgICBwbHVzID0gbi5wbHVzO1xyXG4gICAgICAgIG4gPSBuLm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IG4sIGQsIHBsdXMgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZURpY2VBcmdzIChuIDogc3RyaW5nIHwgRGljZUludGVyZmFjZSB8IG51bWJlciB8IG51bWJlcltdID0gMSwgZDogbnVtYmVyID0gNiwgcGx1czogbnVtYmVyID0gMCkgOiBEaWNlSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wYXJzZURpY2VBcmdzKG4pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHBhcnNlRGljZVN0cmluZyAoc3RyaW5nIDogc3RyaW5nKSA6IERpY2VJbnRlcmZhY2Uge1xyXG4gICAgLy8gZGljZSBzdHJpbmcgbGlrZSA1ZDEwKzFcclxuICAgIGlmICghZGljZUNhY2hlW3N0cmluZ10pIHtcclxuICAgICAgaWYgKGRpY2VSZS50ZXN0KHN0cmluZykpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkaWNlUmUuZXhlYyhzdHJpbmcucmVwbGFjZSgvICsvZywgJycpKTtcclxuICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBkaWNlQ2FjaGVbc3RyaW5nXSA9IHtcclxuICAgICAgICAgICAgbjogKHBhcnNlSW50KHJlc3VsdFsxXSkgLyAxIHx8IDEpLFxyXG4gICAgICAgICAgICBkOiAocGFyc2VJbnQocmVzdWx0WzJdKSAvIDEgfHwgMSksXHJcbiAgICAgICAgICAgIHBsdXM6IChwYXJzZUZsb2F0KHJlc3VsdFszXSkgLyAxIHx8IDApLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZGljZVJlTm9Jbml0LnRlc3Qoc3RyaW5nKSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRpY2VSZU5vSW5pdC5leGVjKHN0cmluZy5yZXBsYWNlKC8gKy9nLCAnJykpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgIGRpY2VDYWNoZVtzdHJpbmddID0ge1xyXG4gICAgICAgICAgICBuOiAxLFxyXG4gICAgICAgICAgICBkOiAocGFyc2VJbnQocmVzdWx0WzFdKSAvIDEgfHwgMSksXHJcbiAgICAgICAgICAgIHBsdXM6IChwYXJzZUZsb2F0KHJlc3VsdFsyXSkgLyAxIHx8IDApLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaWNlQ2FjaGVbc3RyaW5nXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGljZU1heCAobiA6IHN0cmluZyB8IERpY2VJbnRlcmZhY2UgfCBudW1iZXIgfCBudW1iZXJbXSA9IDEsIGQ6IG51bWJlciA9IDYsIHBsdXM6IG51bWJlciA9IDApIDogbnVtYmVyIHtcclxuICAgICh7IG4sIGQsIHBsdXMgfSA9IHRoaXMucGFyc2VEaWNlQXJncyhuLCBkLCBwbHVzKSk7XHJcbiAgICByZXR1cm4gKG4gKiBkKSArIHBsdXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGRpY2VNaW4gKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICAoeyBuLCBkLCBwbHVzIH0gPSB0aGlzLnBhcnNlRGljZUFyZ3MobiwgZCwgcGx1cykpO1xyXG4gICAgcmV0dXJuIG4gKyBwbHVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpY2UgKG4gOiBzdHJpbmcgfCBEaWNlSW50ZXJmYWNlIHwgbnVtYmVyIHwgbnVtYmVyW10gPSAxLCBkOiBudW1iZXIgPSA2LCBwbHVzOiBudW1iZXIgPSAwKSA6IG51bWJlciB7XHJcbiAgICAoeyBuLCBkLCBwbHVzIH0gPSB0aGlzLnBhcnNlRGljZUFyZ3MobiwgZCwgcGx1cykpO1xyXG4gICAgaWYgKHR5cGVvZiBuID09PSAnbnVtYmVyJykge1xyXG4gICAgICBsZXQgbnZhbCA9IE1hdGgubWF4KG4sIDEpO1xyXG4gICAgICBjb25zdCBkdmFsID0gTWF0aC5tYXgoZCwgMSk7XHJcbiAgICAgIGlmIChkID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHBsdXMgKyAxO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzdW0gPSBwbHVzIHx8IDA7XHJcbiAgICAgIHdoaWxlIChudmFsID4gMCkge1xyXG4gICAgICAgIHN1bSArPSB0aGlzLnJhbmRJbnQoMSwgZHZhbCk7XHJcbiAgICAgICAgbnZhbC0tO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGdpdmVuIHRvIGRpY2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZURpY2VTdHJpbmcgKHN0cmluZyA6IHN0cmluZykgOiBEaWNlSW50ZXJmYWNlIHtcclxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcclxuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wYXJzZURpY2VTdHJpbmcoc3RyaW5nKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGFtcCAobnVtYmVyIDogbnVtYmVyLCBsb3dlciA6IG51bWJlciwgdXBwZXIgOiBudW1iZXIpIDogbnVtYmVyIHtcclxuICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG51bWJlciA9IG51bWJlciA8PSB1cHBlciA/IG51bWJlciA6IHVwcGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbnVtYmVyID0gbnVtYmVyID49IGxvd2VyID8gbnVtYmVyIDogbG93ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJpbiAodmFsIDogbnVtYmVyLCBiaW5zIDogbnVtYmVyLCBtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBudW1iZXIge1xyXG4gICAgY29uc3Qgc3ByZWFkID0gbWF4IC0gbWluO1xyXG4gICAgcmV0dXJuIChNYXRoLnJvdW5kKCgodmFsIC0gbWluKSAvIHNwcmVhZCkgKiAoYmlucyAtIDEpKSAvIChiaW5zIC0gMSkgKiBzcHJlYWQpICsgbWluO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm5nIGV4dGVuZHMgUm5nQWJzdHJhY3QgaW1wbGVtZW50cyBSbmdJbnRlcmZhY2Uge1xyXG4gICNtYXNrOiBudW1iZXI7XHJcbiAgI3NlZWQ6IG51bWJlcjtcclxuICAjbV96OiBudW1iZXIgPSAwO1xyXG4gIGNvbnN0cnVjdG9yIChzZWVkPyA6IFNlZWQpIHtcclxuICAgIHN1cGVyKHNlZWQpO1xyXG4gICAgdGhpcy4jbWFzayA9IDB4ZmZmZmZmZmY7XHJcbiAgICB0aGlzLiNtX3ogPSA5ODc2NTQzMjE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VyaWFsaXplICgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFzazogdGhpcy4jbWFzayxcclxuICAgICAgc2VlZDogdGhpcy5nZXRTZWVkKCksXHJcbiAgICAgIG1fejogdGhpcy4jbV96LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYW1lQXMgKG90aGVyOiBSbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHMgPSBvdGhlci5zZXJpYWxpemUoKTtcclxuICAgIHJldHVybiB0aGlzLiNzZWVkID09PSBzLnNlZWQgJiZcclxuICAgICAgdGhpcy4jbWFzayA9PT0gcy5tYXNrICYmXHJcbiAgICAgIHRoaXMuI21feiA9PT0gcy5tX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVuc2VyaWFsaXplIChzZXJpYWxpemVkIDogU2VyaWFsaXplZFJuZyk6IFJuZyB7XHJcbiAgICBjb25zdCBybmcgPSBuZXcgdGhpcygpO1xyXG4gICAgcm5nLnNldFNlZWQoc2VyaWFsaXplZC5zZWVkKTtcclxuICAgIHJuZy4jbWFzayA9IHNlcmlhbGl6ZWQubWFzaztcclxuICAgIHJuZy4jc2VlZCA9IHNlcmlhbGl6ZWQuc2VlZDtcclxuICAgIHJuZy4jbV96ID0gc2VyaWFsaXplZC5tX3o7XHJcbiAgICByZXR1cm4gcm5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlZWQgKGk/IDogU2VlZCk6IHRoaXMge1xyXG4gICAgc3VwZXIuc2VlZChpKTtcclxuICAgIHRoaXMuI21feiA9IDk4NzY1NDMyMTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9yYW5kb20gKCk6IG51bWJlciB7XHJcbiAgICB0aGlzLiNtX3ogPSAoMzY5NjkgKiAodGhpcy4jbV96ICYgNjU1MzUpICsgKHRoaXMuI21feiA+PiAxNikpICYgdGhpcy4jbWFzaztcclxuICAgIHRoaXMuc2V0U2VlZCgoMTgwMDAgKiAodGhpcy5nZXRTZWVkKCkgJiA2NTUzNSkgKyAodGhpcy5nZXRTZWVkKCkgPj4gMTYpKSAmIHRoaXMuI21hc2spO1xyXG4gICAgbGV0IHJlc3VsdCA9ICgodGhpcy4jbV96IDw8IDE2KSArIHRoaXMuZ2V0U2VlZCgpKSAmIHRoaXMuI21hc2s7XHJcbiAgICByZXN1bHQgLz0gNDI5NDk2NzI5NjtcclxuICAgIHJldHVybiByZXN1bHQgKyAwLjU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xyXG5pbXBvcnQgeyBVbHRyYUxvb3QsIExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbiB9IGZyb20gJy4vdWx0cmFsb290JztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVQb29sLCBMb290VGFibGVQb29sRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUvcG9vbCc7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbiwgQ29uZGl0aW9uRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUvcG9vbC9lbnRyeSc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdCBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0JztcclxuaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0cyBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnkvcmVzdWx0cyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgUk5HLCBSbmdJbnRlcmZhY2UsIENoYW5jeSB9IGZyb20gJy4vcm5nJztcclxuXHJcbi8qKlxyXG4gKiBPYmplY3QgdXNlZCB3aGVuIGNyZWF0aW5nIGEgbG9vdCB0YWJsZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZURlZmluaXRpb24gPSB7XHJcbiAgbmFtZSA/OiBzdHJpbmcsXHJcbiAgaWQgPzogc3RyaW5nLFxyXG4gIGZuID86IHN0cmluZyxcclxuICBybmcgPzogUm5nSW50ZXJmYWNlLFxyXG4gIHBvb2xzID86IEFycmF5PExvb3RUYWJsZVBvb2w+LFxyXG4gIHVsID86IFVsdHJhTG9vdCxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlID0gKHtcclxuICBybmcsXHJcbiAgbG9vdGVkLFxyXG4gIGxvb3RlcixcclxuICBjb250ZXh0LFxyXG4gIHJlc3VsdCxcclxuICBhcmdzXHJcbn06IHtcclxuICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICBsb290ZWQ6IGFueSxcclxuICBsb290ZXI6IGFueSxcclxuICBjb250ZXh0OiBhbnksXHJcbiAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgYXJnczogUmVjb3JkPHN0cmluZywgYW55PixcclxufSkgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSA9ICh7XHJcbiAgcm5nLFxyXG4gIGxvb3RlZCxcclxuICBsb290ZXIsXHJcbiAgY29udGV4dCxcclxuICByZXN1bHQsXHJcbiAgYXJnc1xyXG59OiB7XHJcbiAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgbG9vdGVkOiBhbnksXHJcbiAgbG9vdGVyOiBhbnksXHJcbiAgY29udGV4dDogYW55LFxyXG4gIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gIGFyZ3M6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbn0pID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVJvbGxJbnRlcmZhY2Uge1xyXG4gIGxvb3Rlcj86IGFueSxcclxuICBjb250ZXh0PzogYW55LFxyXG4gIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICBybmc/OiBSbmdJbnRlcmZhY2UsXHJcbiAgbj86IENoYW5jeSxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVBvb2xSb2xsSW50ZXJmYWNlIHtcclxuICBwb29sOiBMb290VGFibGVQb29sLFxyXG4gIGxvb3Rlcj86IGFueSxcclxuICBjb250ZXh0PzogYW55LFxyXG4gIHJlc3VsdD86IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICBybmc/OiBSbmdJbnRlcmZhY2UsXHJcbiAgbj86IENoYW5jeSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFRhYmxlIHtcclxuICBuYW1lID86IHN0cmluZztcclxuICBpZCA/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbGVuYW1lIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gcmVwcmVzZW50IHRoaXMgdGFibGVcclxuICAgKiB3aGVuIGl0IGlzIHNhdmVkIGFzIEpTT04uIFRoaXMgc2hvdWxkIGluY2x1ZGUgcmVsYXRpdmVcclxuICAgKiBwYXRoL2ZvbGRlciBuYW1lc1xyXG4gICAqL1xyXG4gIGZuID86IHN0cmluZztcclxuXHJcbiAgdWwgPzogVWx0cmFMb290O1xyXG4gIHJuZzogUm5nSW50ZXJmYWNlO1xyXG4gIHBvb2xzID86IEFycmF5PExvb3RUYWJsZVBvb2w+ID0gW107XHJcbiAgZnVuY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZT4gPSB7fTtcclxuICBjb25kaXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVDb25kaXRpb25TaWduYXR1cmU+ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcGFyZW50J3MgZnVuY3Rpb25zIHNob3VsZCBiZSBhdmFpbGFibGUgdG8gYW4gRW50cnkgdGFibGUgd2hlbiByb2xsaW5nLlxyXG4gICAqIEZvciB0aGlzIGNhc2UsIHdlIGhhdmUgdG8gXCJib3Jyb3dcIiB0aGUgcGFyZW50IHRhYmxlIHRvIGFsbG93IGZ1bmN0aW9ucy9cclxuICAgKiBjb25kaXRpb25zIHRvIGJlIHVzZWQgZnJvbSB0aGVyZSBpZiBuZWVkZWQuXHJcbiAgICpcclxuICAgKiBUaGlzIGlzIGEgc2V0LCBzbyB3ZSBkb24ndCBlbmQgdXAgd2l0aCB0aGUgc2FtZSB0YWJsZSBpbiB0aGVyZSBtdWx0aXBsZSB0aW1lcy5cclxuICAgKi9cclxuICBib3Jyb3dlZDogU2V0PExvb3RUYWJsZT4gPSBuZXcgU2V0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIGRlZmluaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoeyBuYW1lLCBybmcsIGlkLCBwb29scyA9IFtdLCBmbiwgdWwgfSA6IExvb3RUYWJsZURlZmluaXRpb24gPSB7fSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMucG9vbHMgPSBwb29scztcclxuICAgIHRoaXMuZm4gPSBmbjtcclxuICAgIHRoaXMudWwgPSB1bDtcclxuICAgIHRoaXMucm5nID0gcm5nID8/ICh1bCA/IHVsLmdldFJuZygpIDogbmV3IFJORygpKTtcclxuICAgIHRoaXMuaWQgPSBpZCA/PyB0aGlzLnJuZy51bmlxc3RyKDYpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVnaXN0ZXIgYSBmdW5jdGlvbiBmb3IgdXNlIGluIGxvb3QgcG9vbHNcclxuICByZWdpc3RlckZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIGZuOiBMb290VGFibGVGdW5jdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5mdW5jdGlvbnNbbmFtZV0gPSBmbjtcclxuICB9XHJcblxyXG4gIC8vIFJlZ2lzdGVyIGEgY29uZGl0aW9uIGZ1bmN0aW9uIGZvciB1c2UgaW4gbG9vdCBwb29sc1xyXG4gIHJlZ2lzdGVyQ29uZGl0aW9uIChuYW1lOiBzdHJpbmcsIGZuOiBMb290VGFibGVDb25kaXRpb25TaWduYXR1cmUpIHtcclxuICAgIHRoaXMuY29uZGl0aW9uc1tuYW1lXSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cmluZyB0byBiZSB1c2VkIGFzIGEgZmlsZW5hbWUgZm9yIHRoaXMgdGFibGUuXHJcbiAgICovXHJcbiAgZ2V0IGZpbGVuYW1lICgpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmZuID8/IHRoaXMuaWQgPz8gdGhpcy5uYW1lID8/IG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXQgZmlsZW5hbWUgKGZuKSB7XHJcbiAgICB0aGlzLmZuID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1bHRyYWxvb3QgaW5zdGFuY2VcclxuICAgKi9cclxuICBnZXQgdWx0cmFsb290ICgpIDogVWx0cmFMb290IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnVsO1xyXG4gIH1cclxuXHJcbiAgc2V0IHVsdHJhbG9vdCAodWwpIHtcclxuICAgIHRoaXMudWwgPSB1bDtcclxuICB9XHJcblxyXG4gIGdldCBkZXNjcmlwdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpYmUgKCkge1xyXG4gICAgaWYgKHRoaXMubmFtZSkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHt0aGlzLmlkfV1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBbJHt0aGlzLmlkfV1gO1xyXG4gIH1cclxuXHJcbiAgYm9ycm93ICh0YWJsZTogTG9vdFRhYmxlKSB7XHJcbiAgICB0aGlzLmJvcnJvd2VkLmFkZCh0YWJsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHVuYm9ycm93ICh0YWJsZTogTG9vdFRhYmxlKSB7XHJcbiAgICB0aGlzLmJvcnJvd2VkLmRlbGV0ZSh0YWJsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldFBvb2xzICgpIHtcclxuICAgIHJldHVybiB0aGlzLnBvb2xzO1xyXG4gIH1cclxuXHJcbiAgc2V0Um5nIChybmcgOiBSbmdJbnRlcmZhY2UpIHtcclxuICAgIHRoaXMucm5nID0gcm5nO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcm9sbEJhc2ljcyAoe1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIG4gPSAxXHJcbiAgfSA6IE9taXQ8VGFibGVSb2xsSW50ZXJmYWNlLCAncmVzdWx0Jz4pIDogW1JuZ0ludGVyZmFjZSwgbnVtYmVyXSB7XHJcbiAgICBjb25zdCBybmdUb1VzZSA9IHJuZyA/PyB0aGlzLnJuZztcclxuICAgIGNvbnN0IHJvbGxzID0gcm5nVG9Vc2UuY2hhbmN5KG4pO1xyXG4gICAgbG9nLmdjKGBUYWJsZTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgdGFibGUgJHtyb2xsc30gdGltZXMgKGZyb20gY2hhbmN5KCR7SlNPTi5zdHJpbmdpZnkobil9KSlgLCB7IGxvb3RlciwgY29udGV4dCB9KTtcclxuICAgIHJldHVybiBbcm5nVG9Vc2UsIHJvbGxzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGwgZm9yIGxvb3Qgb24gdGhpcyB0YWJsZVxyXG4gICAqXHJcbiAgICogVGhlIGxvb3RlciB3aWxsIGdlbmVyYWxseSBiZSB0aGUgcGxheWVyXHJcbiAgICogVGhlIGNvbnRleHQgd2lsbCBlaXRoZXIgYmUgYSBjb250YWluZXIgb3IgYSAnbW9uc3RlcicsIGJ1dCBtaWdodCBiZSBzb21ldGhpbmcgZWxzZSAod2hlcmUgdGhlIGxvb3QgaXMgY29taW5nIGZyb20pXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICByb2xsU3luYyAoe1xyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICAgIHJuZyxcclxuICAgIG4gPSAxXHJcbiAgfSA6IFRhYmxlUm9sbEludGVyZmFjZSA9IHt9KSA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyB7XHJcbiAgICBjb25zdCBbcm5nVG9Vc2UsIHJvbGxzXSA9IHRoaXMucm9sbEJhc2ljcyh7IHJuZywgbiwgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mIHRoaXMucG9vbHMpIHtcclxuICAgICAgdGhpcy5yb2xsUG9vbFN5bmMoe1xyXG4gICAgICAgIG46IHJvbGxzLFxyXG4gICAgICAgIHBvb2wsXHJcbiAgICAgICAgcm5nOiBybmdUb1VzZSxcclxuICAgICAgICBsb290ZXIsXHJcbiAgICAgICAgY29udGV4dCxcclxuICAgICAgICByZXN1bHRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2cuZ2UoKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsIGZvciBsb290IG9uIHRoaXMgdGFibGVcclxuICAgKlxyXG4gICAqIFRoZSBsb290ZXIgd2lsbCBnZW5lcmFsbHkgYmUgdGhlIHBsYXllclxyXG4gICAqIFRoZSBjb250ZXh0IHdpbGwgZWl0aGVyIGJlIGEgY29udGFpbmVyIG9yIGEgJ21vbnN0ZXInLCBidXQgbWlnaHQgYmUgc29tZXRoaW5nIGVsc2UgKHdoZXJlIHRoZSBsb290IGlzIGNvbWluZyBmcm9tKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvbGxEZWZpbml0aW9uXHJcbiAgICovXHJcbiAgYXN5bmMgcm9sbCAoe1xyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICAgIHJuZyxcclxuICAgIG4gPSAxXHJcbiAgfSA6IFRhYmxlUm9sbEludGVyZmFjZSA9IHt9KSA6IFByb21pc2U8TG9vdFRhYmxlRW50cnlSZXN1bHRzPiB7XHJcbiAgICBjb25zdCBbcm5nVG9Vc2UsIHJvbGxzXSA9IHRoaXMucm9sbEJhc2ljcyh7IHJuZywgbiwgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgbGV0IGkgPSAxO1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mIHRoaXMucG9vbHMpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yb2xsUG9vbCh7XHJcbiAgICAgICAgbjogcm9sbHMsXHJcbiAgICAgICAgcG9vbCxcclxuICAgICAgICBybmc6IHJuZ1RvVXNlLFxyXG4gICAgICAgIGxvb3RlcixcclxuICAgICAgICBjb250ZXh0LFxyXG4gICAgICAgIHJlc3VsdFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGwgZm9yIGxvb3Qgb24gYSBwb29sXHJcbiAgICpcclxuICAgKiBUaGUgbG9vdGVyIHdpbGwgZ2VuZXJhbGx5IGJlIHRoZSBwbGF5ZXJcclxuICAgKiBUaGUgY29udGV4dCB3aWxsIGVpdGhlciBiZSBhIGNvbnRhaW5lciBvciBhICdtb25zdGVyJywgYnV0IG1pZ2h0IGJlIHNvbWV0aGluZyBlbHNlICh3aGVyZSB0aGUgbG9vdCBpcyBjb21pbmcgZnJvbSlcclxuICAgKiBAcGFyYW0gcm9sbERlZmluaXRpb25cclxuICAgKi9cclxuICByb2xsUG9vbFN5bmMgKHtcclxuICAgIHBvb2wsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVQb29sUm9sbEludGVyZmFjZSkgOiBMb290VGFibGVFbnRyeVJlc3VsdHMge1xyXG4gICAgY29uc3Qgcm5nVG9Vc2UgPSBybmcgPz8gdGhpcy5ybmc7XHJcbiAgICBjb25zdCByb2xscyA9IHJuZ1RvVXNlLmNoYW5jeShuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9sbHM7IGkrKykge1xyXG4gICAgICBwb29sLnJvbGxTeW5jKHsgcm5nLCB0YWJsZTogdGhpcywgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbCBmb3IgbG9vdCBvbiBhIHBvb2xcclxuICAgKlxyXG4gICAqIFRoZSBsb290ZXIgd2lsbCBnZW5lcmFsbHkgYmUgdGhlIHBsYXllclxyXG4gICAqIFRoZSBjb250ZXh0IHdpbGwgZWl0aGVyIGJlIGEgY29udGFpbmVyIG9yIGEgJ21vbnN0ZXInLCBidXQgbWlnaHQgYmUgc29tZXRoaW5nIGVsc2UgKHdoZXJlIHRoZSBsb290IGlzIGNvbWluZyBmcm9tKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvbGxEZWZpbml0aW9uXHJcbiAgICovXHJcbiAgYXN5bmMgcm9sbFBvb2wgKHtcclxuICAgIHBvb2wsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpLFxyXG4gICAgcm5nLFxyXG4gICAgbiA9IDFcclxuICB9IDogVGFibGVQb29sUm9sbEludGVyZmFjZSkgOiBQcm9taXNlPExvb3RUYWJsZUVudHJ5UmVzdWx0cz4ge1xyXG4gICAgY29uc3Qgcm5nVG9Vc2UgPSBybmcgPz8gdGhpcy5ybmc7XHJcbiAgICBjb25zdCByb2xscyA9IHJuZ1RvVXNlLmNoYW5jeShuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9sbHM7IGkrKykge1xyXG4gICAgICBhd2FpdCBwb29sLnJvbGwoeyBybmcsIHRhYmxlOiB0aGlzLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBoYXNGdW5jdGlvbiAoZm4gOiBGdW5jdGlvbkRlZmluaXRpb24pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGhhc1NlbGYgPSAodHlwZW9mIHRoaXMuZnVuY3Rpb25zW2ZuLmZ1bmN0aW9uXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG4gICAgcmV0dXJuIGhhc1NlbGYgfHwgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKS5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgfHwgY3VyLmhhc0Z1bmN0aW9uKGZuKSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29uZGl0aW9uIChjb25kIDogQ29uZGl0aW9uRGVmaW5pdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaGFzU2VsZiA9ICh0eXBlb2YgdGhpcy5jb25kaXRpb25zW2NvbmQuZnVuY3Rpb25dICE9PSAndW5kZWZpbmVkJyk7XHJcbiAgICByZXR1cm4gaGFzU2VsZiB8fCBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyB8fCBjdXIuaGFzQ29uZGl0aW9uKGNvbmQpLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQb29sIChkZWY6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlUG9vbCB7XHJcbiAgICBjb25zdCBwb29sID0gbmV3IExvb3RUYWJsZVBvb2woZGVmKTtcclxuICAgIHRoaXMucG9vbHMucHVzaChwb29sKTtcclxuICAgIHJldHVybiBwb29sO1xyXG4gIH1cclxuXHJcbiAgYWRkUG9vbCAoZGVmOiBMb290VGFibGVQb29sIHwgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uIHwgTG9vdFRhYmxlUG9vbERlZmluaXRpb24pIDogdGhpcyB7XHJcbiAgICBpZiAoKGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wpKSB7XHJcbiAgICAgIHRoaXMucG9vbHMucHVzaChkZWYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVQb29sKGRlZik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldFBvdGVudGlhbERyb3BzICgpIHtcclxuICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgcG9vbCBvZiB0aGlzLnBvb2xzKSB7XHJcbiAgICAgIGxldCB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcG9vbC5nZXRFbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IChlbnRyeS53ZWlnaHQgPz8gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJvbGxzTWF4ID0gUk5HLmNoYW5jeU1heChwb29sLnJvbGxzKTtcclxuICAgICAgY29uc3Qgcm9sbHNNaW4gPSBSTkcuY2hhbmN5TWluKHBvb2wucm9sbHMpO1xyXG4gICAgICBjb25zdCBudWxsc01pbiA9IFJORy5jaGFuY3lNaW4ocG9vbC5udWxscyk7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcG9vbC5nZXRFbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUgfHwgZW50cnkuaXNUYWJsZSgpKSB7XHJcbiAgICAgICAgICBsZXQgdGFibGU7XHJcbiAgICAgICAgICBsZXQgd2VpZ2h0O1xyXG4gICAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgICAgIHdlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHRhYmxlID0gZW50cnk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzVGFibGUoKSkge1xyXG4gICAgICAgICAgICB3ZWlnaHQgPSBlbnRyeS53ZWlnaHQgPz8gMTtcclxuICAgICAgICAgICAgdGFibGUgPSBlbnRyeS5nZXRJdGVtKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBtZXJnZSB0aGUgcmVzdWx0cy4uLlxyXG4gICAgICAgICAgY29uc3QgcGQgPSB0YWJsZS5nZXRQb3RlbnRpYWxEcm9wcygpO1xyXG4gICAgICAgICAgZm9yIChjb25zdCBzdWJEcm9wIG9mIHBkKSB7XHJcbiAgICAgICAgICAgIGVudHJpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgZW50cnk6IHN1YkRyb3AuZW50cnksXHJcbiAgICAgICAgICAgICAgd2VpZ2h0OiBzdWJEcm9wLndlaWdodCAvIHdlaWdodCxcclxuICAgICAgICAgICAgICBtaW46IG51bGxzTWluID4gMCA/IDAgOiAocm9sbHNNaW4gKiBzdWJEcm9wLm1pbiksXHJcbiAgICAgICAgICAgICAgbWF4OiByb2xsc01heCAqIHN1YkRyb3AubWF4LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZW50cmllcy5wdXNoKHtcclxuICAgICAgICAgICAgZW50cnksXHJcbiAgICAgICAgICAgIHdlaWdodDogZW50cnkud2VpZ2h0IC8gdG90YWxXZWlnaHQsXHJcbiAgICAgICAgICAgIG1pbjogbnVsbHNNaW4gPiAwID8gMCA6IChyb2xsc01pbiAqIFJORy5jaGFuY3lNaW4oZW50cnkucXR5KSksXHJcbiAgICAgICAgICAgIG1heDogcm9sbHNNYXggKiBSTkcuY2hhbmN5TWF4KGVudHJ5LnF0eSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyaWVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGZ1bmN0aW9uRGVmaW5pdGlvblxyXG4gICAqIEBwYXJhbSBjb250ZXh0XHJcbiAgICovXHJcbiAgYXN5bmMgYXBwbHlGdW5jdGlvbiAoZnVuY3Rpb25EZWZpbml0aW9uOiBGdW5jdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBzdWJ0YWJsZS5hcHBseUZ1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVyciA9IGBGdW5jdGlvbiAke2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gdGFibGUucmVnaXN0ZXJGdW5jdGlvbihuYW1lLCBmdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnVsdHJhbG9vdC5hcHBseUZ1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC50aHJvd09uTWlzc2luZ0Z1bmN0aW9ucykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogZnVuY3Rpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBjb25kaXRpb25EZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBhc3luYyBhcHBseUNvbmRpdGlvbiAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc3VidGFibGUgb2YgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKSkge1xyXG4gICAgICAgIGlmIChzdWJ0YWJsZS5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBhd2FpdCBzdWJ0YWJsZS5hcHBseUNvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZXJyID0gYENvbmRpdGlvbiAke2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IHRhYmxlLnJlZ2lzdGVyQ29uZGl0aW9uKG5hbWUsIGNvbmRpdGlvbl9mdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudWx0cmFsb290KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290Lmhhc0NvbmRpdGlvbihjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudWx0cmFsb290LmFwcGx5Q29uZGl0aW9uKGNvbmRpdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51bHRyYWxvb3QudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogY29uZGl0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZnVuY3Rpb25EZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbnRleHRcclxuICAgKi9cclxuICBhcHBseUZ1bmN0aW9uU3luYyAoZnVuY3Rpb25EZWZpbml0aW9uOiBGdW5jdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pOiB2b2lkIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5mdW5jdGlvbnNbZnVuY3Rpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBzdWJ0YWJsZSBvZiBBcnJheS5mcm9tKHRoaXMuYm9ycm93ZWQpKSB7XHJcbiAgICAgICAgaWYgKHN1YnRhYmxlLmhhc0Z1bmN0aW9uKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBzdWJ0YWJsZS5hcHBseUZ1bmN0aW9uU3luYyhmdW5jdGlvbkRlZmluaXRpb24sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBlcnIgPSBgRnVuY3Rpb24gJHtmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IHRhYmxlLnJlZ2lzdGVyRnVuY3Rpb24obmFtZSwgZnVuY3Rpb24pLmA7XHJcbiAgICAgIGlmICh0aGlzLnVsdHJhbG9vdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC5oYXNGdW5jdGlvbihmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy51bHRyYWxvb3QuYXBwbHlGdW5jdGlvblN5bmMoZnVuY3Rpb25EZWZpbml0aW9uLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudWx0cmFsb290LnRocm93T25NaXNzaW5nRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBmdW5jdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbmRpdGlvbkRlZmluaXRpb25cclxuICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAqL1xyXG4gIGFwcGx5Q29uZGl0aW9uU3luYyAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZvciAoY29uc3Qgc3VidGFibGUgb2YgQXJyYXkuZnJvbSh0aGlzLmJvcnJvd2VkKSkge1xyXG4gICAgICAgIGlmIChzdWJ0YWJsZS5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiBzdWJ0YWJsZS5hcHBseUNvbmRpdGlvblN5bmMoY29uZGl0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGVyciA9IGBDb25kaXRpb24gJHtjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9ufSBoYXMgbm90IGJlZW4gZGVmaW5lZC4gRGlkIHlvdSBmb3JnZXQgdG8gcmVnaXN0ZXIgdGhlIGZ1bmN0aW9uIHdpdGggdGhpcyBsb290IHRhYmxlPyB0YWJsZS5yZWdpc3RlckNvbmRpdGlvbihuYW1lLCBjb25kaXRpb25fZnVuY3Rpb24pLmA7XHJcbiAgICAgIGlmICh0aGlzLnVsdHJhbG9vdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC5oYXNDb25kaXRpb24oY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbikpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnVsdHJhbG9vdC5hcHBseUNvbmRpdGlvblN5bmMoY29uZGl0aW9uRGVmaW5pdGlvbiwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVsdHJhbG9vdC50aHJvd09uTWlzc2luZ0NvbmRpdGlvbnMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb25kaXRpb25DYWxsUmVzdWx0ID0gdGhpcy5jb25kaXRpb25zW2NvbmRpdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBjb25kaXRpb25EZWZpbml0aW9uLmFyZ3VtZW50cyB9KTtcclxuICAgIGlmIChjb25kaXRpb25DYWxsUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXR1cm4gcHJvbWlzZSBmcm9tIHN5bmMgY29uZGl0aW9uIGNhbGwnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25kaXRpb25DYWxsUmVzdWx0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgbG9nIGZyb20gJy4vLi4vbG9nJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVFbnRyeSwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBDb25kaXRpb25EZWZpbml0aW9uLCBGdW5jdGlvbkRlZmluaXRpb24gfSBmcm9tICcuL3Bvb2wvZW50cnknO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdHMgZnJvbSAnLi9wb29sL2VudHJ5L3Jlc3VsdHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSB9IGZyb20gJy4vLi4vdGFibGUnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFJORywgUm5nSW50ZXJmYWNlLCBDaGFuY3kgfSBmcm9tICcuLy4uL3JuZyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPixcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIHJvbGxzPzogQ2hhbmN5LFxyXG4gIG51bGxzPzogQ2hhbmN5LFxyXG4gIGVudHJpZXM/OiBBcnJheTxMb290VGFibGVFbnRyeSB8IExvb3RUYWJsZSB8IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbj4sXHJcbiAgdGVtcGxhdGU/OiBQYXJ0aWFsPExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbj5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vdFBvb2wge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIGNvbmRpdGlvbnM6IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+ID0gW107XHJcbiAgZnVuY3Rpb25zOiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+ID0gW107XHJcbiAgcm9sbHM6IENoYW5jeSA9IDE7XHJcbiAgbnVsbHM6IENoYW5jeSA9IDA7XHJcbiAgZW50cmllczogQXJyYXk8TG9vdFRhYmxlRW50cnkgfCBMb290VGFibGU+ID0gW107XHJcbiAgdGVtcGxhdGU6IFBhcnRpYWw8TG9vdFRhYmxlRW50cnlEZWZpbml0aW9uPiA9IHt9O1xyXG5cclxuICBzdGF0aWMgTlVMTEtFWSA9ICdfX05VTExfX2ZkMmE5OWQyLTI2YzAtNDQ1NC1hMjg0LTM0NTc4Yjk0ZTBmNic7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIHBvb2wgZGVmaW5pdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yICh7XHJcbiAgICBuYW1lLFxyXG4gICAgaWQsXHJcbiAgICBjb25kaXRpb25zID0gW10sXHJcbiAgICBmdW5jdGlvbnMgPSBbXSxcclxuICAgIHJvbGxzID0gMSxcclxuICAgIG51bGxzID0gMCxcclxuICAgIGVudHJpZXMgPSBbXSxcclxuICAgIHRlbXBsYXRlLFxyXG4gIH0gOiBMb290VGFibGVQb29sRGVmaW5pdGlvbiA9IHt9KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5jb25kaXRpb25zID0gY29uZGl0aW9ucyA/PyBbXTtcclxuICAgIHRoaXMuZnVuY3Rpb25zID0gZnVuY3Rpb25zID8/IFtdO1xyXG4gICAgdGhpcy5yb2xscyA9IHJvbGxzO1xyXG4gICAgdGhpcy5udWxscyA9IG51bGxzO1xyXG4gICAgdGhpcy5pZCA9IGlkID8/IChuZXcgUk5HKCkpLnVuaXFzdHIoNik7XHJcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICBpZiAoZW50cmllcykge1xyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcclxuICAgICAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbnRyeSAoZGVmOiBMb290VGFibGVFbnRyeURlZmluaXRpb24pIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gbmV3IExvb3RUYWJsZUVudHJ5KHsgLi4uKHRoaXMudGVtcGxhdGUgPz8ge30pLCAuLi5kZWYgfSk7XHJcbiAgICB0aGlzLmVudHJpZXMucHVzaChlbnRyeSk7XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfVxyXG5cclxuICBhZGRFbnRyeSAoZW50cnk6IExvb3RUYWJsZUVudHJ5IHwgTG9vdFRhYmxlIHwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBkZWY/OiBPbWl0PExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiwgJ2lkJz4pIDogdGhpcyB7XHJcbiAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgZW50cnkgPSBuZXcgTG9vdFRhYmxlRW50cnkoe1xyXG4gICAgICAgIC4uLih0aGlzLnRlbXBsYXRlID8/IHt9KSxcclxuICAgICAgICAuLi4oZGVmID8/IHt9KSxcclxuICAgICAgICAuLi57XHJcbiAgICAgICAgICBpZDogZW50cnkuaWQsXHJcbiAgICAgICAgICBpdGVtOiBlbnRyeSxcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgdGhpcy5lbnRyaWVzLnB1c2goZW50cnkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVFbnRyeShlbnRyeSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGdldEVudHJpZXMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW50cmllcztcclxuICB9XHJcblxyXG4gIHJvbGxQcmVhbWJsZSAoeyBybmcgfSA6IHsgcm5nOiBSbmdJbnRlcmZhY2UgfSkgOiBbbnVtYmVyLCBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+XSB7XHJcbiAgICBjb25zdCBudW1Sb2xscyA9IHJuZy5jaGFuY3lJbnQodGhpcy5yb2xscyk7XHJcblxyXG4gICAgbG9nLmdjKGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIHBvb2wgJHtudW1Sb2xsc30gdGltZXMgKGZyb20gY2hhbmN5KCR7SlNPTi5zdHJpbmdpZnkodGhpcy5yb2xscyl9KSlgKTtcclxuXHJcbiAgICAvLyBXZSBzdG9yZSBhIGxpc3Qgb2Yga2V5L3ZhbHVlIGNob2ljZXMgd2l0aCB0aGVpciB3ZWlnaHRzIGluIGFuIGFycmF5XHJcbiAgICBjb25zdCBjaG9pY2VzIDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG5cclxuICAgIC8vIEEgc3BlY2lhbCBOVUxMIGtleSB0byB0cmFjayBudWxsIHJlc3VsdHNcclxuICAgIGlmIChybmcuY2hhbmN5KHRoaXMubnVsbHMpID4gMCkge1xyXG4gICAgICBjaG9pY2VzW0xvb3RQb29sLk5VTExLRVldID0gcm5nLmNoYW5jeSh0aGlzLm51bGxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXAgdGhlIHdlaWdodHMgdG8gcG9zaXRpb25zIGluIGVudHJpZXMuXHJcbiAgICB0aGlzLmVudHJpZXMuZm9yRWFjaCgoYSwgaSkgPT4ge1xyXG4gICAgICBpZiAoYSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgIGNob2ljZXNbaV0gPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZXNbaV0gPSBybmcuY2hhbmN5KGEud2VpZ2h0ID8/IDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxvZy52dihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgQ2hvaWNlczpgLCBjaG9pY2VzKTtcclxuICAgIHJldHVybiBbbnVtUm9sbHMsIGNob2ljZXNdO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcm9sbCAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBjb25zdCBbbnVtUm9sbHMsIGNob2ljZXNdID0gdGhpcy5yb2xsUHJlYW1ibGUoeyBybmcgfSk7XHJcbiAgICBjb25zdCBvdmVyYWxsSW50ZXJtZWRpYXRlID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUm9sbHM7IGkrKykge1xyXG4gICAgICAvLyBUaGlzIGlzIG91ciBjaG9pY2UgZnJvbSB0aGUgY2hvaWNlcyB0YWJsZVxyXG4gICAgICBjb25zdCBjaG9pY2UgPSBybmcud2VpZ2h0ZWRDaG9pY2UoY2hvaWNlcyk7XHJcblxyXG4gICAgICAvLyBUaGVuLCB1bmxlc3MgaXQgaXMgdGhlIG51bGwga2V5LCB3ZSBleHRyYWN0IGl0IVxyXG4gICAgICBpZiAoY2hvaWNlICE9PSBMb290UG9vbC5OVUxMS0VZKSB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNbY2hvaWNlXTtcclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIC8vIElmIHRoZSBlbnRyeSBpcyBhIGxvb3QgdGFibGUsIHZvaWxhIC0gd2UgY2FuIHJvbGwgaXQgZGlyZWN0bHlcclxuICAgICAgICAgIG92ZXJhbGxJbnRlcm1lZGlhdGUubWVyZ2UoYXdhaXQgZW50cnkucm9sbCh7IGxvb3RlciwgY29udGV4dCwgcm5nIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgY2FuIHJvbGwgdGhlIGVudHJ5IGl0c2VsZlxyXG4gICAgICAgICAgbG9nLmcoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgTG9vdCBUYWJsZSBFbnRyeWApO1xyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShhd2FpdCBlbnRyeS5yb2xsKHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0IH0pKTtcclxuICAgICAgICAgIGxvZy5nZSgpO1xyXG4gICAgICAgICAgaWYgKGVudHJ5LnVuaXF1ZSkge1xyXG4gICAgICAgICAgICBjaG9pY2VzW2Nob2ljZV0gPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgR290IG51bGwgcmVzdWx0YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGVuIHdlIHByb2Nlc3MgYWxsIHRoZSByZXN1bHRzXHJcbiAgICBhd2FpdCB0aGlzLnByb2Nlc3NFbnRyeVJlc3VsdHMob3ZlcmFsbEludGVybWVkaWF0ZSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIGxvZy5nZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHJvbGxTeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGNvbnN0IFtudW1Sb2xscywgY2hvaWNlc10gPSB0aGlzLnJvbGxQcmVhbWJsZSh7IHJuZyB9KTtcclxuICAgIGNvbnN0IG92ZXJhbGxJbnRlcm1lZGlhdGUgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb2xsczsgaSsrKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgb3VyIGNob2ljZSBmcm9tIHRoZSBjaG9pY2VzIHRhYmxlXHJcbiAgICAgIGNvbnN0IGNob2ljZSA9IHJuZy53ZWlnaHRlZENob2ljZShjaG9pY2VzKTtcclxuXHJcbiAgICAgIC8vIFRoZW4sIHVubGVzcyBpdCBpcyB0aGUgbnVsbCBrZXksIHdlIGV4dHJhY3QgaXQhXHJcbiAgICAgIGlmIChjaG9pY2UgIT09IExvb3RQb29sLk5VTExLRVkpIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tjaG9pY2VdO1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgICAgLy8gSWYgdGhlIGVudHJ5IGlzIGEgbG9vdCB0YWJsZSwgdm9pbGEgLSB3ZSBjYW4gcm9sbCBpdCBkaXJlY3RseVxyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShlbnRyeS5yb2xsU3luYyh7IGxvb3RlciwgY29udGV4dCwgcm5nIH0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnkpIHtcclxuICAgICAgICAgIC8vIE90aGVyd2lzZSwgd2UgY2FuIHJvbGwgdGhlIGVudHJ5IGl0c2VsZlxyXG4gICAgICAgICAgbG9nLmcoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgTG9vdCBUYWJsZSBFbnRyeWApO1xyXG4gICAgICAgICAgb3ZlcmFsbEludGVybWVkaWF0ZS5tZXJnZShlbnRyeS5yb2xsU3luYyh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCB9KSk7XHJcbiAgICAgICAgICBsb2cuZ2UoKTtcclxuICAgICAgICAgIGlmIChlbnRyeS51bmlxdWUpIHtcclxuICAgICAgICAgICAgY2hvaWNlc1tjaG9pY2VdID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEdvdCBudWxsIHJlc3VsdGApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlbiB3ZSBwcm9jZXNzIGFsbCB0aGUgcmVzdWx0c1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyhvdmVyYWxsSW50ZXJtZWRpYXRlLCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgbG9nLmdlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcHJvY2Vzc0VudHJ5UmVzdWx0cyAoZW50cnlSZXN1bHRzIDogTG9vdFRhYmxlRW50cnlSZXN1bHRzLFxyXG4gICAge1xyXG4gICAgICBybmcsXHJcbiAgICAgIHRhYmxlLFxyXG4gICAgICBsb290ZXIsXHJcbiAgICAgIGNvbnRleHQsXHJcbiAgICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gICAgfSA6IHtcclxuICAgICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICAgIGxvb3RlcjogYW55LFxyXG4gICAgICBjb250ZXh0OiBhbnksXHJcbiAgICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgICB9KSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGVudHJ5UmVzdWx0IG9mIGVudHJ5UmVzdWx0cykge1xyXG4gICAgICByZXN1bHRzLnB1c2godGhpcy5wcm9jZXNzRW50cnlSZXN1bHQoZW50cnlSZXN1bHQsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpO1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMgKGVudHJ5UmVzdWx0cyA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICAgIHtcclxuICAgICAgcm5nLFxyXG4gICAgICB0YWJsZSxcclxuICAgICAgbG9vdGVyLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICAgIH0gOiB7XHJcbiAgICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgICBsb290ZXI6IGFueSxcclxuICAgICAgY29udGV4dDogYW55LFxyXG4gICAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gICAgfSkge1xyXG4gICAgZm9yIChjb25zdCBlbnRyeVJlc3VsdCBvZiBlbnRyeVJlc3VsdHMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRTeW5jKGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIGFzeW5jIHByb2Nlc3NFbnRyeVJlc3VsdCAobG9vdGVkIDogTG9vdFRhYmxlRW50cnlSZXN1bHQsIHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKVxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIHRhYmxlOiBMb290VGFibGUsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLmZ1bmN0aW9ucykge1xyXG4gICAgICBhd2FpdCB0YWJsZS5hcHBseUZ1bmN0aW9uKGZuLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBjb25zdCBjb25kaXRpb25SZXN1bHQgPSBhd2FpdCB0YWJsZS5hcHBseUNvbmRpdGlvbihjb25kLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFRlc3RpbmcgZnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgcmVzdWx0ZWQgaW4gJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb25SZXN1bHQpfWApO1xyXG4gICAgICBhZGQgPSBhZGQgJiYgY29uZGl0aW9uUmVzdWx0O1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBGdW5jdGlvbiBcIiR7Y29uZC5mdW5jdGlvbn1cIiBzdG9wcGVkIHRoaXMgZnJvbSBiZWluZyBhZGRlZGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobG9vdGVkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3RlZC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4ubG9vdGVkLCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdFN5bmMgKGxvb3RlZCA6IExvb3RUYWJsZUVudHJ5UmVzdWx0LCB7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgdGFibGUuYXBwbHlGdW5jdGlvblN5bmMoZm4sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGFkZCA9IHRydWU7XHJcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2YgdGhpcy5jb25kaXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvblJlc3VsdCA9IHRhYmxlLmFwcGx5Q29uZGl0aW9uU3luYyhjb25kLCB7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgICAgbG9nLnYoYFBvb2wgJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFRlc3RpbmcgZnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgcmVzdWx0ZWQgaW4gJHtKU09OLnN0cmluZ2lmeShjb25kaXRpb25SZXN1bHQpfWApO1xyXG4gICAgICBhZGQgPSBhZGQgJiYgY29uZGl0aW9uUmVzdWx0O1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy52KGBQb29sICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBGdW5jdGlvbiBcIiR7Y29uZC5mdW5jdGlvbn1cIiBzdG9wcGVkIHRoaXMgZnJvbSBiZWluZyBhZGRlZGApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cudihgUG9vbCAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobG9vdGVkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3RlZC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4ubG9vdGVkLCAuLi57IHF0eTogMSB9IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGxvZyBmcm9tICcuLy4uLy4uL2xvZyc7XHJcbmltcG9ydCBMb290VGFibGUgZnJvbSAnLi8uLi8uLi90YWJsZSc7XHJcbmltcG9ydCB7IFJuZ0ludGVyZmFjZSwgQ2hhbmN5IH0gZnJvbSAnLi8uLi8uLi9ybmcnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi9lbnRyeS9yZXN1bHQnO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHRzIGZyb20gJy4vZW50cnkvcmVzdWx0cyc7XHJcblxyXG5leHBvcnQgdHlwZSBMb290VGFibGVFbnRyeURlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IG51bWJlciB8IHN0cmluZyxcclxuICBzdGFja2FibGU/OiBib29sZWFuLFxyXG4gIHVuaXF1ZT86IGJvb2xlYW4sXHJcbiAgd2VpZ2h0PzogbnVtYmVyLFxyXG4gIGl0ZW0/OiBhbnksXHJcbiAgcXR5PzogQ2hhbmN5LFxyXG4gIGZ1bmN0aW9ucz86IEFycmF5PEZ1bmN0aW9uRGVmaW5pdGlvbj4sXHJcbiAgY29uZGl0aW9ucz86IEFycmF5PENvbmRpdGlvbkRlZmluaXRpb24+XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZ1bmN0aW9uRGVmaW5pdGlvbiB7XHJcbiAgZnVuY3Rpb246IHN0cmluZyxcclxuICBhcmd1bWVudHM/OiBBcnJheTxhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PlxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uRGVmaW5pdGlvbiB7XHJcbiAgZnVuY3Rpb246IHN0cmluZyxcclxuICBhcmd1bWVudHM/OiBBcnJheTxhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGVFbnRyeSB7XHJcbiAgaWQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgc3RhY2thYmxlPzogYm9vbGVhbiA9IHRydWU7XHJcbiAgdW5pcXVlPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgd2VpZ2h0OiBudW1iZXIgPSAxO1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgcXR5PzogQ2hhbmN5ID0gMTtcclxuICBmdW5jdGlvbnM6IEFycmF5PEZ1bmN0aW9uRGVmaW5pdGlvbj47XHJcbiAgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBsb290IHRhYmxlIGVudHJ5IGRlZmluaXRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoe1xyXG4gICAgaWQsXHJcbiAgICBzdGFja2FibGUgPSB0cnVlLFxyXG4gICAgdW5pcXVlID0gZmFsc2UsXHJcbiAgICBuYW1lLFxyXG4gICAgd2VpZ2h0ID0gMSxcclxuICAgIGl0ZW0sXHJcbiAgICBmdW5jdGlvbnMgPSBbXSxcclxuICAgIGNvbmRpdGlvbnMgPSBbXSxcclxuICAgIHF0eSA9IDEsXHJcbiAgfSA6IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiA9IHt9KSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zdGFja2FibGUgPSBzdGFja2FibGU7XHJcbiAgICB0aGlzLnVuaXF1ZSA9IHVuaXF1ZTtcclxuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xyXG4gICAgdGhpcy5pdGVtID0gaXRlbTtcclxuICAgIHRoaXMucXR5ID0gcXR5O1xyXG4gICAgdGhpcy5mdW5jdGlvbnMgPSBmdW5jdGlvbnMgPz8gW107XHJcbiAgICB0aGlzLmNvbmRpdGlvbnMgPSBjb25kaXRpb25zID8/IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtICgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW0gPz8gdGhpcy5pZDtcclxuICB9XHJcblxyXG4gIGRlZXBDbG9uZU9iamVjdCAob2I6IG9iamVjdCkge1xyXG4gICAgLy8gU2ltcGxlc3Qgd2F5IHRvIGRlZXAgY2xvbmUgYSBzaW1wbGUgb2JqZWN0LlxyXG4gICAgLy8gQW55dGhpbmcgbW9yZSBjb21wbGV4IHdpbGwgaGF2ZSB0byBpbXBsZW1lbnQgYSBcImNsb25lXCIgZnVuY3Rpb24uXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYikpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmVJdGVtICgpIHtcclxuICAgIGlmICh0aGlzLml0ZW0gPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuaXRlbSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLml0ZW0uY2xvbmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLmNsb25lKHRoaXMuaXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhlcmUgd2UgaGF2ZSB0byBkbyBhIGRlZXAgY2xvbmUsIGJlY2F1c2UgaWYgd2Ugb25seSBkb1xyXG4gICAgICAvLyBhIHNoYWxsb3cgY2xvbmUsIGFueSBuZXN0ZWQgcHJvcGVydGllcyB3aWxsIGJlIHBlcnNpc3RlZCBhY3Jvc3NcclxuICAgICAgLy8gcm9sbHMsIHdoaWNoIGlzIHByb2JhYmx5IG5vdCB3aGF0IHdlIHdhbnQuXHJcbiAgICAgIHJldHVybiB0aGlzLmRlZXBDbG9uZU9iamVjdCh0aGlzLml0ZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVGFibGUgKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbSgpIGluc3RhbmNlb2YgTG9vdFRhYmxlO1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0RGVmaW5pdGlvbiAocm5nOiBSbmdJbnRlcmZhY2UpIHtcclxuICAgIGNvbnN0IGRlZiA9IHtcclxuICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgIHN0YWNrYWJsZTogdGhpcy5zdGFja2FibGUsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgaXRlbTogdGhpcy5jbG9uZUl0ZW0oKSxcclxuICAgICAgcXR5OiBybmcuY2hhbmN5KHRoaXMucXR5KVxyXG4gICAgfTtcclxuICAgIHJldHVybiBkZWY7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUJhc2VSZXN1bHRzIChybmc6IFJuZ0ludGVyZmFjZSkge1xyXG4gICAgY29uc3QgZGVmID0gdGhpcy5yZXN1bHREZWZpbml0aW9uKHJuZyk7XHJcbiAgICByZXR1cm4gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cyhbbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KGRlZildKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGwgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICB9IDoge1xyXG4gICAgcm5nPzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkgOiBQcm9taXNlPExvb3RUYWJsZUVudHJ5UmVzdWx0cz4ge1xyXG4gICAgaWYgKHRoaXMuaXNUYWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJvbGxUYWJsZSh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucm9sbEl0ZW0oeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGxJdGVtICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgSXRlbSBmb3IgJHt0aGlzLmlkfWAsIHsgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzKHRoaXMuZ2VuZXJhdGVCYXNlUmVzdWx0cyhybmcpLCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJvbGxUYWJsZSAoe1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICAvLyBsb2cuZChgRW50cnk6ICR7dGhpcy5kZXNjcmlwdGlvbn0gfCBSb2xsaW5nIFRhYmxlIGZvciAke3RoaXMuaWR9YCwge2xvb3RlciwgY29udGV4dH0pO1xyXG4gICAgY29uc3QgZW50cnlSZXN1bHRzID0gYXdhaXQgdGhpcy5nZXRJdGVtKCkuYm9ycm93KHRhYmxlKS5yb2xsKHsgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQ6IFtdLCBybmcsIG46IHRoaXMucXR5IH0pO1xyXG4gICAgdGhpcy5nZXRJdGVtKCkudW5ib3Jyb3codGFibGUpO1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzKGVudHJ5UmVzdWx0cywgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwcm9jZXNzRW50cnlSZXN1bHRzIChlbnRyeVJlc3VsdHMgOiBMb290VGFibGVFbnRyeVJlc3VsdHMsXHJcbiAgICB7XHJcbiAgICAgIHJuZyxcclxuICAgICAgdGFibGUsXHJcbiAgICAgIGxvb3RlcixcclxuICAgICAgY29udGV4dCxcclxuICAgICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgICB9IDoge1xyXG4gICAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgICAgbG9vdGVyOiBhbnksXHJcbiAgICAgIGNvbnRleHQ6IGFueSxcclxuICAgICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICAgIH0pIHtcclxuICAgIGZvciAoY29uc3QgZW50cnlSZXN1bHQgb2YgZW50cnlSZXN1bHRzKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucHJvY2Vzc0VudHJ5UmVzdWx0KGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIGFzeW5jIHByb2Nlc3NFbnRyeVJlc3VsdCAoZW50cnlSZXN1bHQgOiBMb290VGFibGVFbnRyeVJlc3VsdCwge1xyXG4gICAgcm5nLFxyXG4gICAgdGFibGUsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0ID0gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cygpXHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgIGF3YWl0IHRhYmxlLmFwcGx5RnVuY3Rpb24oZm4sIHsgcm5nLCBsb290ZWQ6IGVudHJ5UmVzdWx0LCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH1cclxuICAgIGxldCBhZGQgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBjb25kIG9mIHRoaXMuY29uZGl0aW9ucykge1xyXG4gICAgICBhZGQgPSBhZGQgJiYgYXdhaXQgdGFibGUuYXBwbHlDb25kaXRpb24oY29uZCwgeyBybmcsIGxvb3RlZDogZW50cnlSZXN1bHQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgICBpZiAoIWFkZCkge1xyXG4gICAgICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEZ1bmN0aW9uIFwiJHtjb25kLmZ1bmN0aW9ufVwiIHN0b3BwZWQgdGhpcyBmcm9tIGJlaW5nIGFkZGVkYCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IEFmdGVyIGFwcGx5aW5nIGNvbmRpdGlvbnMsIGFkZCB3YXMgJHtKU09OLnN0cmluZ2lmeShhZGQpfWApO1xyXG4gICAgaWYgKGFkZCAmJiBlbnRyeVJlc3VsdC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChlbnRyeVJlc3VsdC5zdGFja2FibGUpIHtcclxuICAgICAgICByZXN1bHQucHVzaChlbnRyeVJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeVJlc3VsdC5xdHk7IGkrKykge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2gobmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0KHsgLi4uZW50cnlSZXN1bHQsIC4uLnsgcXR5OiAxIH0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9sbFN5bmMgKHtcclxuICAgIHJuZyxcclxuICAgIHRhYmxlLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdCA9IG5ldyBMb290VGFibGVFbnRyeVJlc3VsdHMoKSxcclxuICB9IDoge1xyXG4gICAgcm5nPzogUm5nSW50ZXJmYWNlLFxyXG4gICAgdGFibGU6IExvb3RUYWJsZSxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0PzogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkgOiBMb290VGFibGVFbnRyeVJlc3VsdHMge1xyXG4gICAgaWYgKHRoaXMuaXNUYWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvbGxUYWJsZVN5bmMoeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvbGxJdGVtU3luYyh7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm9sbEl0ZW1TeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgSXRlbSBmb3IgJHt0aGlzLmlkfWAsIHsgbG9vdGVyLCBjb250ZXh0IH0pO1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyh0aGlzLmdlbmVyYXRlQmFzZVJlc3VsdHMocm5nKSwgeyBybmcsIHRhYmxlLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICByb2xsVGFibGVTeW5jICh7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIC8vIGxvZy5kKGBFbnRyeTogJHt0aGlzLmRlc2NyaXB0aW9ufSB8IFJvbGxpbmcgVGFibGUgZm9yICR7dGhpcy5pZH1gLCB7bG9vdGVyLCBjb250ZXh0fSk7XHJcbiAgICBjb25zdCBlbnRyeVJlc3VsdHMgPSB0aGlzLmdldEl0ZW0oKS5ib3Jyb3codGFibGUpLnJvbGxTeW5jKHsgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQ6IFtdLCBybmcsIG46IHRoaXMucXR5IH0pO1xyXG4gICAgdGhpcy5nZXRJdGVtKCkudW5ib3Jyb3codGFibGUpO1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRzU3luYyhlbnRyeVJlc3VsdHMsIHsgcm5nLCB0YWJsZSwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc0VudHJ5UmVzdWx0c1N5bmMgKGVudHJ5UmVzdWx0cyA6IExvb3RUYWJsZUVudHJ5UmVzdWx0cyxcclxuICAgIHtcclxuICAgICAgcm5nLFxyXG4gICAgICB0YWJsZSxcclxuICAgICAgbG9vdGVyLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICAgIH0gOiB7XHJcbiAgICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgICBsb290ZXI6IGFueSxcclxuICAgICAgY29udGV4dDogYW55LFxyXG4gICAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gICAgfSkge1xyXG4gICAgZm9yIChjb25zdCBlbnRyeVJlc3VsdCBvZiBlbnRyeVJlc3VsdHMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzRW50cnlSZXN1bHRTeW5jKGVudHJ5UmVzdWx0LCB7IHJuZywgdGFibGUsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5UmVzdWx0cztcclxuICB9XHJcblxyXG4gIHByb2Nlc3NFbnRyeVJlc3VsdFN5bmMgKGxvb3RlZCA6IExvb3RUYWJsZUVudHJ5UmVzdWx0LCB7XHJcbiAgICBybmcsXHJcbiAgICB0YWJsZSxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHQgPSBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKClcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICB0YWJsZTogTG9vdFRhYmxlLFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgdGFibGUuYXBwbHlGdW5jdGlvblN5bmMoZm4sIHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0IH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGFkZCA9IHRydWU7XHJcbiAgICBmb3IgKGNvbnN0IGNvbmQgb2YgdGhpcy5jb25kaXRpb25zKSB7XHJcbiAgICAgIGFkZCA9IGFkZCAmJiB0YWJsZS5hcHBseUNvbmRpdGlvblN5bmMoY29uZCwgeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQgfSk7XHJcbiAgICAgIGlmICghYWRkKSB7XHJcbiAgICAgICAgbG9nLmQoYEVudHJ5OiAke3RoaXMuZGVzY3JpcHRpb259IHwgRnVuY3Rpb24gXCIke2NvbmQuZnVuY3Rpb259XCIgc3RvcHBlZCB0aGlzIGZyb20gYmVpbmcgYWRkZWRgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9nLmQoYEVudHJ5OiAke3RoaXMuZGVzY3JpcHRpb259IHwgQWZ0ZXIgYXBwbHlpbmcgY29uZGl0aW9ucywgYWRkIHdhcyAke0pTT04uc3RyaW5naWZ5KGFkZCl9YCk7XHJcbiAgICBpZiAoYWRkICYmIGxvb3RlZC5xdHkgPiAwKSB7XHJcbiAgICAgIGlmIChsb290ZWQuc3RhY2thYmxlIHx8IGxvb3RlZC5xdHkgPT09IDEpIHtcclxuICAgICAgICByZXN1bHQucHVzaChsb290ZWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vdGVkLnF0eTsgaSsrKSB7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHQoeyAuLi5sb290ZWQsIC4uLnsgcXR5OiAxIH0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb290VGFibGVFbnRyeVJlc3VsdCB7XHJcbiAgaWQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgc3RhY2thYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgcXR5PzogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yICh7XHJcbiAgICBpZCxcclxuICAgIHN0YWNrYWJsZSA9IHRydWUsXHJcbiAgICBuYW1lLFxyXG4gICAgaXRlbSxcclxuICAgIHF0eVxyXG4gIH06IHtcclxuICAgIGlkPzogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgc3RhY2thYmxlPzogYm9vbGVhbixcclxuICAgIG5hbWU/OiBzdHJpbmcsXHJcbiAgICBpdGVtPzogYW55LFxyXG4gICAgcXR5PzogbnVtYmVyLFxyXG4gIH0gPSB7fSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnF0eSA9IHF0eTtcclxuICAgIHRoaXMuc3RhY2thYmxlID0gc3RhY2thYmxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRlc2NyaXB0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBkZXNjcmliZSAoKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3RoaXMuaWR9XWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYFske3RoaXMuaWR9XWA7XHJcbiAgfVxyXG5cclxuICBnZXRRdHkgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucXR5O1xyXG4gIH1cclxuXHJcbiAgc2V0UXR5IChuOiBudW1iZXIpIHtcclxuICAgIHRoaXMucXR5ID0gbjtcclxuICB9XHJcblxyXG4gIGFkZFF0eSAobjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnF0eSA9IHRoaXMucXR5ICsgbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IExvb3RUYWJsZUVudHJ5UmVzdWx0IGZyb20gJy4vcmVzdWx0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3RUYWJsZUVudHJ5UmVzdWx0cyBleHRlbmRzIEFycmF5PExvb3RUYWJsZUVudHJ5UmVzdWx0PiB7XHJcbiAgY29uc3RydWN0b3IgKGRvY3VtZW50cz86IEFycmF5PExvb3RUYWJsZUVudHJ5UmVzdWx0PiB8IG51bWJlcikge1xyXG4gICAgaWYgKGRvY3VtZW50cyBpbnN0YW5jZW9mIEFycmF5KSBzdXBlciguLi5kb2N1bWVudHMpO1xyXG4gICAgZWxzZSBpZiAoZG9jdW1lbnRzKSBzdXBlcihkb2N1bWVudHMpO1xyXG4gICAgZWxzZSBzdXBlcigpO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIE9iamVjdC5jcmVhdGUoTG9vdFRhYmxlRW50cnlSZXN1bHRzLnByb3RvdHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2UgKG90aGVyOiBMb290VGFibGVFbnRyeVJlc3VsdHMpIHtcclxuICAgIGZvciAoY29uc3QgZW50cnkgb2Ygb3RoZXIpIHtcclxuICAgICAgdGhpcy5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VkIChvdGhlcjogTG9vdFRhYmxlRW50cnlSZXN1bHRzKSB7XHJcbiAgICByZXR1cm4gbmV3IExvb3RUYWJsZUVudHJ5UmVzdWx0cyhbLi4udGhpcywgLi4ub3RoZXJdKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBlbnRyeVNpZ25hdHVyZSAoZW50cnk6IExvb3RUYWJsZUVudHJ5UmVzdWx0KSB7XHJcbiAgICBjb25zdCBlbnRyeVdpdGhvdXRRdHk6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKGVudHJ5KSkge1xyXG4gICAgICBpZiAoayAhPT0gJ3F0eScpIHtcclxuICAgICAgICBlbnRyeVdpdGhvdXRRdHlba10gPSB2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZW50cnlXaXRob3V0UXR5KTtcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlZCAoKSB7XHJcbiAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUVudHJ5UmVzdWx0PiA9IHt9O1xyXG4gICAgY29uc3Qgb3RoZXI6IExvb3RUYWJsZUVudHJ5UmVzdWx0W10gPSBbXTtcclxuICAgIGZvciAoY29uc3Qgb2Igb2YgdGhpcykge1xyXG4gICAgICBpZiAob2Iuc3RhY2thYmxlKSB7XHJcbiAgICAgICAgY29uc3Qgc2lnID0gdGhpcy5lbnRyeVNpZ25hdHVyZShvYik7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2lnLCB0eXBlb2YgbWFwW3NpZ10pO1xyXG4gICAgICAgIGlmICh0eXBlb2YgbWFwW3NpZ10gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBtYXBbc2lnXSA9IG9iO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXBbc2lnXS5hZGRRdHkob2IucXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3RoZXIucHVzaChvYik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgTG9vdFRhYmxlRW50cnlSZXN1bHRzKFsuLi5vdGhlciwgLi4uT2JqZWN0LnZhbHVlcyhtYXApXSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZSwgTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUsIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSwgTG9vdFRhYmxlRGVmaW5pdGlvbiB9IGZyb20gJy4vdGFibGUnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIExvb3RUYWJsZVBvb2wsIExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIH0gZnJvbSAnLi90YWJsZS9wb29sJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMb290VGFibGVFbnRyeSwgTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLCBGdW5jdGlvbkRlZmluaXRpb24sIENvbmRpdGlvbkRlZmluaXRpb24gfSBmcm9tICcuL3RhYmxlL3Bvb2wvZW50cnknO1xyXG5pbXBvcnQgTG9vdFRhYmxlRW50cnlSZXN1bHQgZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdCc7XHJcbmltcG9ydCBMb290VGFibGVFbnRyeVJlc3VsdHMgZnJvbSAnLi90YWJsZS9wb29sL2VudHJ5L3Jlc3VsdHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFJORywgU2VlZCwgUm5nSW50ZXJmYWNlLCBSbmdDb25zdHJ1Y3RvciwgQ2hhbmN5IH0gZnJvbSAnLi9ybmcnO1xyXG5pbXBvcnQgeyB2ZXJzaW9uIGFzIENVUlJFTlRfVkVSU0lPTiB9IGZyb20gJy4vLi4vcGFja2FnZS5qc29uJztcclxuaW1wb3J0ICogYXMgZGVmYXVsdEZ1bmN0aW9ucyBmcm9tICcuL2RlZmF1bHQvZnVuY3Rpb25zJztcclxuaW1wb3J0ICogYXMgZGVmYXVsdENvbmRpdGlvbnMgZnJvbSAnLi9kZWZhdWx0L2NvbmRpdGlvbnMnO1xyXG5cclxuLy8gU2V0IGZzIHByb3Blcmx5IGlmIHdlIGFyZSBpbiBub2RlIGVudmlyb25tZW50XHJcbmxldCBmcyA6IGFueTtcclxubGV0IGlzTm9kZSA9IGZhbHNlO1xyXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnKSB7XHJcbiAgaWYgKHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zID09PSAnb2JqZWN0Jykge1xyXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICAgICAgaXNOb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IFZFUlNJT05fS0VZID0gJ19fdmVyc2lvbl9fJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIGZvciBlYXNpbHkgY3JlYXRpbmcgbG9vdCB0YWJsZXMgdXNpbmcgYSBqc29uIGxpa2VcclxuICogb2JqZWN0IGluc3RlYWQgb2YgYWxsIHRoZSBzcGVjaWZpYyBsb290IHRhYmxlIG9iamVjdHNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUVhc3lEZWZpbml0aW9uID0ge1xyXG4gIG5hbWU/OiBzdHJpbmcsXHJcbiAgaWQ/OiBzdHJpbmcsXHJcbiAgcm5nPzogc3RyaW5nIHwgbnVtYmVyIHwgUm5nSW50ZXJmYWNlLFxyXG4gIHBvb2xzPzogQXJyYXk8TG9vdFRhYmxlUG9vbCB8IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbj4sXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBmb3IgZWFzaWx5IGNyZWF0aW5nIGxvb3QgdGFibGUgcG9vbHMgdXNpbmcgYSBqc29uIGxpa2VcclxuICogb2JqZWN0IGluc3RlYWQgb2YgYWxsIHRoZSBzcGVjaWZpYyBsb290IHRhYmxlIG9iamVjdHNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbiA9IHtcclxuICBuYW1lPzogc3RyaW5nLFxyXG4gIGlkPzogc3RyaW5nLFxyXG4gIGNvbmRpdGlvbnM/OiBBcnJheTxDb25kaXRpb25EZWZpbml0aW9uPixcclxuICBmdW5jdGlvbnM/OiBBcnJheTxGdW5jdGlvbkRlZmluaXRpb24+LFxyXG4gIHRlbXBsYXRlPzogTG9vdFRhYmxlRW50cnlEZWZpbml0aW9uLFxyXG4gIHJvbGxzPzogQ2hhbmN5LFxyXG4gIG51bGxzPzogQ2hhbmN5LFxyXG4gIGVudHJpZXM/OiBBcnJheTxMb290VGFibGVFbnRyeSB8IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiB8IExvb3RUYWJsZT4sXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBkZWZpbmVzIGhvdyBhIExvb3RUYWJsZSBpcyBzdG9yZWQgaW4gSlNPTiBmaWxlc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgTG9vdFRhYmxlSnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBmbj86IHN0cmluZyxcclxuICBybmc/OiBzdHJpbmcgfCBudW1iZXIgfCBSbmdJbnRlcmZhY2UsXHJcbiAgcG9vbHM/OiBBcnJheTxMb290VGFibGVQb29sSnNvbkRlZmluaXRpb24+LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZGVmaW5lcyBob3cgYSBMb290VGFibGVQb29sIGlzIHN0b3JlZCBpbiBKU09OIGZpbGVzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBMb290VGFibGVQb29sSnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZD86IHN0cmluZyxcclxuICBjb25kaXRpb25zPzogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj4sXHJcbiAgZnVuY3Rpb25zPzogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPixcclxuICByb2xscz86IENoYW5jeSxcclxuICBudWxscz86IENoYW5jeSxcclxuICBlbnRyaWVzOiBBcnJheTxMb290VGFibGVFbnRyeUpzb25EZWZpbml0aW9uPixcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRlZmluZXMgaG93IGEgTG9vdFRhYmxlRW50cnkgaXMgc3RvcmVkIGluIEpTT04gZmlsZXNcclxuICovXHJcbmV4cG9ydCB0eXBlIExvb3RUYWJsZUVudHJ5SnNvbkRlZmluaXRpb24gPSB7XHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nLFxyXG4gIHR5cGU/OiBzdHJpbmcsXHJcbiAgc3RhY2thYmxlPzogYm9vbGVhbixcclxuICB3ZWlnaHQ/OiBudW1iZXIsXHJcbiAgaXRlbT86IGFueSxcclxuICBxdHk/OiBDaGFuY3ksXHJcbiAgZnVuY3Rpb25zPzogQXJyYXk8RnVuY3Rpb25EZWZpbml0aW9uPixcclxuICBjb25kaXRpb25zPzogQXJyYXk8Q29uZGl0aW9uRGVmaW5pdGlvbj5cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVUYWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZFRhYmxlcyB7XHJcbiAgW1ZFUlNJT05fS0VZXTogc3RyaW5nLFxyXG4gIHRhYmxlczogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlSnNvbkRlZmluaXRpb24+XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIExvYWRTYXZlQXJncyA9IHsgZGVmYXVsdEV4dGVuc2lvbj86IHN0cmluZywgcGF0aD86IHN0cmluZyB9O1xyXG5cclxuLyoqXHJcbiAqIEB0b2RvIGRldGVjdCByZWN1cnNpdmVseSByZXF1aXJlZCB0YWJsZXNcclxuICogQGV4YW1wbGVcclxuICogaW1wb3J0IHtVbHRyYUxvb3R9IGZyb20gXCJ1bHRyYWxvb3RcIjtcclxuICpcclxuICogY29uc3QgdWx0cmFsb290RGVmYXVsdFJuZyA9IG5ldyBVbHRyYUxvb3QoKTsgICAgICAgICAgIC8vIGRlZmF1bHQgUk5HXHJcbiAqIGNvbnN0IHVsdHJhbG9vdEN1c3RvbVJuZyA9IG5ldyBVbHRyYUxvb3QoXCJVTDdSNEwwMDdcIik7IC8vIHNlZWRpbmcgdGhlIGJ1aWx0IGluIFJOR1xyXG4gKiBjb25zdCB1bHRyYWxvb3RDdXN0b21SbmcgPSBuZXcgVWx0cmFMb290KHJuZ1NvdXJjZSk7ICAgLy8gdXNpbmcgYSBjdXN0b20gUk5HXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVWx0cmFMb290IHtcclxuICAvKipcclxuICAgKiBEZWZhdWx0IFJORyBzb3VyY2Ugd2hlbiBub25lIGlzIGdpdmVuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGRlZmF1bHRSbmc6IFJuZ0ludGVyZmFjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUk5HIHNvdXJjZSBnaXZlbiBieSB0aGUgZW5kIHVzZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcm5nPzogUm5nSW50ZXJmYWNlO1xyXG5cclxuICAvKipcclxuICAgKiBSTkcgQ29uc3RydWN0b3IgZm9yIG1ha2luZyBuZXcgUk5Hc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBybmdDb25zdHJ1Y3Rvcj86IFJuZ0NvbnN0cnVjdG9yO1xyXG5cclxuICAvKipcclxuICAgKiBHbG9iYWwgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgYnkgbG9vdCB0YWJsZSBlbnRyaWVzLlxyXG4gICAqXHJcbiAgICogVGhlIGtleXMgaW4gdGhlIG9iamVjdCBhcmUgdGhlIGZ1bmN0aW9uIGlkZW50aWZpZXIgdXNlZCBpbiB0aGUgdGFibGUgZW50cmllc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmdW5jdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUZ1bmN0aW9uU2lnbmF0dXJlPiA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBHbG9iYWwgY29uZGl0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IGxvb3QgdGFibGUgcG9vbHMgYW5kIGVudHJpZXMuXHJcbiAgICpcclxuICAgKiBUaGUga2V5cyBpbiB0aGUgb2JqZWN0IGFyZSB0aGUgZnVuY3Rpb24gaWRlbnRpZmllciB1c2VkIGluIHRoZSB0YWJsZSBlbnRyaWVzL3Bvb2xzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGNvbmRpdGlvbnM6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZT4gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byB0aHJvdyBlcnJvcnMgd2hlbiBmdW5jdGlvbnMgYXJlIG1pc3NpbmcsIG90aGVyd2lzZSBqdXN0IGRvZXMgY29uc29sZS5lcnJvclxyXG4gICAqL1xyXG4gIHB1YmxpYyB0aHJvd09uTWlzc2luZ0Z1bmN0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gdGhyb3cgZXJyb3JzIHdoZW4gY29uZGl0aW9ucyBhcmUgbWlzc2luZywgb3RoZXJ3aXNlIGp1c3QgZG9lcyBjb25zb2xlLmVycm9yXHJcbiAgICovXHJcbiAgcHVibGljIHRocm93T25NaXNzaW5nQ29uZGl0aW9uczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yIChybmc/OiBTZWVkIHwgUm5nSW50ZXJmYWNlKSB7XHJcbiAgICBsb2cuZCgnVWx0cmFMb290IGluaXRpYWxpc2luZycpO1xyXG4gICAgaWYgKHJuZykge1xyXG4gICAgICB0aGlzLnJuZyA9IHRoaXMubWFrZVJuZyhybmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyRGVmYXVsdHMgKCkge1xyXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHRGdW5jdGlvbnMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0Q29uZGl0aW9ucygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJEZWZhdWx0RnVuY3Rpb25zICgpIHtcclxuICAgIGZvciAoY29uc3QgW2tleSwgZm5dIG9mIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRGdW5jdGlvbnMpKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJGdW5jdGlvbihrZXksIGZuKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyRGVmYXVsdENvbmRpdGlvbnMgKCkge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCBmbl0gb2YgT2JqZWN0LmVudHJpZXMoZGVmYXVsdENvbmRpdGlvbnMpKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0ZXJDb25kaXRpb24oa2V5LCBmbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFzIHdlIGRvbnQgZXhwb3NlIHRoZSBjbGFzcyBhcyBkZWZhdWx0LCBpbiBicm93c2VyIGl0IHdvdWxkIGJlIG5pY2VcclxuICAgKiBpZiB0aGVyZSB3YXMgYSB3YXkgdG8gY3JlYXRlIG5ldyBpbnN0YW5jZXMuIFRoaXMgY2FuIGJlIGRvbmUgdXNpbmdcclxuICAgKiB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbnN0YW5jZSAocm5nPzogU2VlZCB8IFJuZ0ludGVyZmFjZSk6IFVsdHJhTG9vdCB7XHJcbiAgICByZXR1cm4gbmV3IFVsdHJhTG9vdChybmcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFJuZyAocm5nOiBSbmdJbnRlcmZhY2UpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1JuZyhybmcpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcigncm5nIGdpdmVuIGRvZXMgbm90IGNvbmZpcm0gdG8gUm5nSW50ZXJmYWNlJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJuZyA9IHJuZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSbmcgKCk6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5ybmcgPz8gdGhpcy5nZXREZWZhdWx0Um5nKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGVmYXVsdFJuZyAoKTogUm5nSW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0aGlzLmRlZmF1bHRSbmcgPz8gKHRoaXMuZGVmYXVsdFJuZyA9IHRoaXMubWFrZVJuZygpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRSbmdDb25zdHJ1Y3RvciAocm5nQ29uc3RydWN0b3I6IFJuZ0NvbnN0cnVjdG9yKTogdm9pZCB7XHJcbiAgICB0aGlzLnJuZ0NvbnN0cnVjdG9yID0gcm5nQ29uc3RydWN0b3I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Um5nQ29uc3RydWN0b3IgKCk6IFJuZ0NvbnN0cnVjdG9yIHtcclxuICAgIHJldHVybiB0aGlzLnJuZ0NvbnN0cnVjdG9yID8/IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLnJuZykuY29uc3RydWN0b3I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNSbmcgKHJuZz86IGFueSk6IHJuZyBpcyBSbmdJbnRlcmZhY2Uge1xyXG4gICAgaWYgKHR5cGVvZiBybmcgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygcm5nICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZWVkZWRGdW5jdGlvbnMgPSBbXHJcbiAgICAgICdwcmVkaWN0YWJsZScsXHJcbiAgICAgICdoYXNoU3RyJyxcclxuICAgICAgJ2NvbnZlcnRTdHJpbmdUb051bWJlcicsXHJcbiAgICAgICdnZXRTZWVkJyxcclxuICAgICAgJ3NlZWQnLFxyXG4gICAgICAncGVyY2VudGFnZScsXHJcbiAgICAgICdyYW5kb20nLFxyXG4gICAgICAnY2hhbmNlJyxcclxuICAgICAgJ2NoYW5jZVRvJyxcclxuICAgICAgJ3JhbmRJbnQnLFxyXG4gICAgICAndW5pcWlkJyxcclxuICAgICAgJ3VuaXFzdHInLFxyXG4gICAgICAncmFuZEJldHdlZW4nLFxyXG4gICAgICAnbm9ybWFsJyxcclxuICAgICAgJ2NoYW5jeUludCcsXHJcbiAgICAgICdjaGFuY3knLFxyXG4gICAgICAnd2VpZ2h0ZWRDaG9pY2UnLFxyXG4gICAgICAnZGljZScsXHJcbiAgICAgICdwYXJzZURpY2VTdHJpbmcnLFxyXG4gICAgICAnY2xhbXAnLFxyXG4gICAgICAnYmluJyxcclxuICAgICAgJ3NlcmlhbGl6ZScsXHJcbiAgICBdO1xyXG4gICAgbGV0IGhhc0FsbEtleXMgPSB0cnVlO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgbmVlZGVkRnVuY3Rpb25zKSB7XHJcbiAgICAgIGhhc0FsbEtleXMgPSBoYXNBbGxLZXlzICYmICh0eXBlb2Ygcm5nW2tleV0gPT09ICdmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc0FsbEtleXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbWFrZVJuZyAocm5nPzogU2VlZCB8IFJuZ0ludGVyZmFjZSk6IFJuZ0ludGVyZmFjZSB7XHJcbiAgICBpZiAodGhpcy5pc1JuZyhybmcpKSB7XHJcbiAgICAgIHJldHVybiBybmc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBSbmdDb25zdHJ1Y3RvciA6IFJuZ0NvbnN0cnVjdG9yID0gdGhpcy5ybmdDb25zdHJ1Y3RvciA/PyBSTkc7XHJcbiAgICByZXR1cm4gbmV3IFJuZ0NvbnN0cnVjdG9yKHJuZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJGdW5jdGlvbiAobmFtZTogc3RyaW5nLCBmbjogTG9vdFRhYmxlRnVuY3Rpb25TaWduYXR1cmUpIHtcclxuICAgIHRoaXMuZnVuY3Rpb25zW25hbWVdID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJDb25kaXRpb24gKG5hbWU6IHN0cmluZywgZm46IExvb3RUYWJsZUNvbmRpdGlvblNpZ25hdHVyZSkge1xyXG4gICAgdGhpcy5jb25kaXRpb25zW25hbWVdID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzRnVuY3Rpb24gKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLmZ1bmN0aW9uc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzQ29uZGl0aW9uIChuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5jb25kaXRpb25zW25hbWVdICE9PSAndW5kZWZpbmVkJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBub1Rocm93T25NaXNzaW5nRnVuY3Rpb25zT3JDb25kaXRpb25zICgpIHtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdGdW5jdGlvbnMgPSBmYWxzZTtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0aHJvd09uTWlzc2luZ0Z1bmN0aW9uc09yQ29uZGl0aW9ucyAoKSB7XHJcbiAgICB0aGlzLnRocm93T25NaXNzaW5nRnVuY3Rpb25zID0gdHJ1ZTtcclxuICAgIHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zID0gdHJ1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZ1bmN0aW9uQ2hlY2sgKGZuOiBGdW5jdGlvbkRlZmluaXRpb24pIHtcclxuICAgIGxvZy5kKGBVTCB8IEFwcGx5aW5nIGZ1bmN0aW9uICR7Zm4uZnVuY3Rpb259YCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZnVuY3Rpb25zW2ZuLmZ1bmN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgZXJyID0gYEZ1bmN0aW9uICR7Zm4uZnVuY3Rpb259IGhhcyBub3QgYmVlbiBkZWZpbmVkLiBEaWQgeW91IGZvcmdldCB0byByZWdpc3RlciB0aGUgZnVuY3Rpb24gd2l0aCB0aGlzIGxvb3QgdGFibGU/IFVsdHJhTG9vdC5yZWdpc3RlckZ1bmN0aW9uKG5hbWUsIGZ1bmN0aW9uKS5gO1xyXG4gICAgICBpZiAodGhpcy50aHJvd09uTWlzc2luZ0Z1bmN0aW9ucykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25kaXRpb25DaGVjayAoY29uZDogQ29uZGl0aW9uRGVmaW5pdGlvbikge1xyXG4gICAgbG9nLmQoYFVMIHwgQXBwbHlpbmcgY29uZGl0aW9uICR7Y29uZC5mdW5jdGlvbn1gKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5jb25kaXRpb25zW2NvbmQuZnVuY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBlcnIgPSBgQ29uZGl0aW9uICR7Y29uZC5mdW5jdGlvbn0gaGFzIG5vdCBiZWVuIGRlZmluZWQuIERpZCB5b3UgZm9yZ2V0IHRvIHJlZ2lzdGVyIHRoZSBmdW5jdGlvbiB3aXRoIHRoaXMgbG9vdCB0YWJsZT8gVWx0cmFMb290LnJlZ2lzdGVyQ29uZGl0aW9uKG5hbWUsIGNvbmRpdGlvbl9mdW5jdGlvbikuYDtcclxuICAgICAgaWYgKHRoaXMudGhyb3dPbk1pc3NpbmdDb25kaXRpb25zKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5RnVuY3Rpb25TeW5jIChmdW5jdGlvbkRlZmluaXRpb246IEZ1bmN0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgaWYgKHRoaXMuZnVuY3Rpb25DaGVjayhmdW5jdGlvbkRlZmluaXRpb24pKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uc1tmdW5jdGlvbkRlZmluaXRpb24uZnVuY3Rpb25dKHsgcm5nLCBsb290ZWQsIGxvb3RlciwgY29udGV4dCwgcmVzdWx0LCBhcmdzOiBmdW5jdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5Q29uZGl0aW9uU3luYyAoY29uZGl0aW9uRGVmaW5pdGlvbjogQ29uZGl0aW9uRGVmaW5pdGlvbiwge1xyXG4gICAgcm5nLFxyXG4gICAgbG9vdGVkLFxyXG4gICAgbG9vdGVyLFxyXG4gICAgY29udGV4dCxcclxuICAgIHJlc3VsdFxyXG4gIH0gOiB7XHJcbiAgICBybmc6IFJuZ0ludGVyZmFjZSxcclxuICAgIGxvb3RlZDogTG9vdFRhYmxlRW50cnlSZXN1bHQsXHJcbiAgICBsb290ZXI6IGFueSxcclxuICAgIGNvbnRleHQ6IGFueSxcclxuICAgIHJlc3VsdDogTG9vdFRhYmxlRW50cnlSZXN1bHRzXHJcbiAgfSkge1xyXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uQ2hlY2soY29uZGl0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgY29uc3QgY29uZGl0aW9uQ2FsbFJlc3VsdCA9IHRoaXMuY29uZGl0aW9uc1tjb25kaXRpb25EZWZpbml0aW9uLmZ1bmN0aW9uXSh7IHJuZywgbG9vdGVkLCBsb290ZXIsIGNvbnRleHQsIHJlc3VsdCwgYXJnczogY29uZGl0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICAgIGlmIChjb25kaXRpb25DYWxsUmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJldHVybiBwcm9taXNlIGZyb20gc3luYyBjb25kaXRpb24gY2FsbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb25kaXRpb25DYWxsUmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFwcGx5RnVuY3Rpb24gKGZ1bmN0aW9uRGVmaW5pdGlvbjogRnVuY3Rpb25EZWZpbml0aW9uLCB7XHJcbiAgICBybmcsXHJcbiAgICBsb290ZWQsXHJcbiAgICBsb290ZXIsXHJcbiAgICBjb250ZXh0LFxyXG4gICAgcmVzdWx0XHJcbiAgfSA6IHtcclxuICAgIHJuZzogUm5nSW50ZXJmYWNlLFxyXG4gICAgbG9vdGVkOiBMb290VGFibGVFbnRyeVJlc3VsdCxcclxuICAgIGxvb3RlcjogYW55LFxyXG4gICAgY29udGV4dDogYW55LFxyXG4gICAgcmVzdWx0OiBMb290VGFibGVFbnRyeVJlc3VsdHNcclxuICB9KSB7XHJcbiAgICBpZiAodGhpcy5mdW5jdGlvbkNoZWNrKGZ1bmN0aW9uRGVmaW5pdGlvbikpIHtcclxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZnVuY3Rpb25zW2Z1bmN0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGZ1bmN0aW9uRGVmaW5pdGlvbi5hcmd1bWVudHMgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYXBwbHlDb25kaXRpb24gKGNvbmRpdGlvbkRlZmluaXRpb246IENvbmRpdGlvbkRlZmluaXRpb24sIHtcclxuICAgIHJuZyxcclxuICAgIGxvb3RlZCxcclxuICAgIGxvb3RlcixcclxuICAgIGNvbnRleHQsXHJcbiAgICByZXN1bHRcclxuICB9IDoge1xyXG4gICAgcm5nOiBSbmdJbnRlcmZhY2UsXHJcbiAgICBsb290ZWQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0LFxyXG4gICAgbG9vdGVyOiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnksXHJcbiAgICByZXN1bHQ6IExvb3RUYWJsZUVudHJ5UmVzdWx0c1xyXG4gIH0pIHtcclxuICAgIGlmICh0aGlzLmNvbmRpdGlvbkNoZWNrKGNvbmRpdGlvbkRlZmluaXRpb24pKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNvbmRpdGlvbnNbY29uZGl0aW9uRGVmaW5pdGlvbi5mdW5jdGlvbl0oeyBybmcsIGxvb3RlZCwgbG9vdGVyLCBjb250ZXh0LCByZXN1bHQsIGFyZ3M6IGNvbmRpdGlvbkRlZmluaXRpb24uYXJndW1lbnRzIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbG9vdCB0YWJsZSwgd2l0aCB0aGlzIHVsdHJhbG9vdCBpbnN0YW5jZVxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKlxyXG4gICAqIGNvbnN0IHVsID0gbmV3IFVsdHJhTG9vdCgnVUw3UjRMMDA3Jyk7XHJcbiAgICogY29uc3QgdGFibGUgPSB1bC5jcmVhdGVUYWJsZSh7bmFtZTogJ0Zvb2QnfSk7XHJcbiAgICpcclxuICAgKiB0YWJsZS5hZGRQb29sKFtcclxuICAgKiAgIHtcclxuICAgKiAgICAgcm9sbHM6IDEsXHJcbiAgICogICAgIG5hbWU6ICdDYWtlcydcclxuICAgKiAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgIHtpZDogJ2Nob2NvbGF0ZV9jYWtlJ30sXHJcbiAgICogICAgICAge2lkOiAnZnJ1aXRfY2FrZSd9LFxyXG4gICAqICAgICAgIHtpZDogJ3N0YXJfY2FrZSd9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH1cclxuICAgKiBdKTtcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlVGFibGUgKGRlZjogTG9vdFRhYmxlIHwgTG9vdFRhYmxlRGVmaW5pdGlvbiB8IExvb3RUYWJsZUVhc3lEZWZpbml0aW9uKTogTG9vdFRhYmxlIHtcclxuICAgIGlmIChkZWYgaW5zdGFuY2VvZiBMb290VGFibGUgfHwgdGhpcy5pc0xvb3RUYWJsZURlZmluaXRpb24oZGVmKSkge1xyXG4gICAgICBpZiAoZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlKSB7XHJcbiAgICAgICAgbG9nLnZ2KCdDcmVhdGluZyB0YWJsZSBmcm9tIExvb3RUYWJsZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvZy52dignQ3JlYXRpbmcgdGFibGUgZnJvbSBMb290VGFibGVEZWZpbml0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgICAgZGVmLnVsID0gdGhpcztcclxuICAgICAgaWYgKGRlZi5ybmcpIHtcclxuICAgICAgICBkZWYucm5nID0gZGVmLnJuZyA/PyB0aGlzLm1ha2VSbmcoZGVmLnJuZyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVmLnJuZyA9IHRoaXMuZ2V0Um5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbHQgPSBuZXcgTG9vdFRhYmxlKGRlZik7XHJcbiAgICAgIGx0LnVsdHJhbG9vdCA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBsdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0Vhc3lMb290VGFibGVEZWZpbml0aW9uKGRlZikpIHtcclxuICAgICAgbG9nLnZ2KCdDcmVhdGluZyB0YWJsZSBmcm9tIExvb3RUYWJsZUVhc3lEZWZpbml0aW9uJyk7XHJcbiAgICAgIGlmIChkZWYucm5nKSB7XHJcbiAgICAgICAgZGVmLnJuZyA9IGRlZi5ybmcgPz8gdGhpcy5tYWtlUm5nKGRlZi5ybmcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlZi5ybmcgPSB0aGlzLmdldFJuZygpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGx0ID0gbmV3IExvb3RUYWJsZSh0aGlzLnRyYW5zZm9ybUVhc3lUb1Byb3Blckxvb3RUYWJsZURlZmluaXRpb24oZGVmKSk7XHJcbiAgICAgIGx0LnVsdHJhbG9vdCA9IHRoaXM7XHJcbiAgICAgIHJldHVybiBsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBsb290IHRhYmxlIGZyb20gdGhlc2UgcGFyYW1zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBsb290IHBvb2wgZm9yIHVzZSBpbiBhIGxvb3QgdGFibGVcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlUG9vbCAoZGVmOiBMb290VGFibGVQb29sRGVmaW5pdGlvbiB8IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZVBvb2wge1xyXG4gICAgaWYgKHRoaXMuaXNFYXN5TG9vdFRhYmxlUG9vbERlZmluaXRpb24oZGVmKSkge1xyXG4gICAgICBsb2cudnYoJ0NyZWF0aW5nIHBvb2wgZnJvbSBMb290VGFibGVQb29sRWFzeURlZmluaXRpb24nKTtcclxuICAgICAgcmV0dXJuIG5ldyBMb290VGFibGVQb29sKHRoaXMudHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlUG9vbERlZmluaXRpb24oZGVmKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2cudnYoJ0NyZWF0aW5nIHBvb2wgZnJvbSBMb290VGFibGVQb29sRGVmaW5pdGlvbicpO1xyXG4gICAgICByZXR1cm4gbmV3IExvb3RUYWJsZVBvb2woZGVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBlbnRyeSBmb3IgYSBsb290IHBvb2wsIGVpdGhlciB3aXRoIG9iamVjdCBkZWZpbml0aW9uIG9yIGZyb20gYSBsb290IHRhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZUVudHJ5IChkZWY6IExvb3RUYWJsZUVudHJ5RGVmaW5pdGlvbiB8IExvb3RUYWJsZSk6IExvb3RUYWJsZUVudHJ5IHtcclxuICAgIGlmIChkZWYgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBMb290VGFibGVFbnRyeSh7XHJcbiAgICAgICAgaWQ6IGRlZi5pZCxcclxuICAgICAgICBuYW1lOiBkZWYubmFtZSxcclxuICAgICAgICBpdGVtOiBkZWYsXHJcbiAgICAgICAgcXR5OiAxLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgTG9vdFRhYmxlRW50cnkoZGVmKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIFR5cGVzY3JpcHQgdHlwZSBndWFyZGluZyBhbmQgcGFyYW1ldGVyIGNoZWNraW5nXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGlzTG9vdFRhYmxlRGVmaW5pdGlvbiAoZGVmOiBhbnkpOiBkZWYgaXMgTG9vdFRhYmxlRGVmaW5pdGlvbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGVQb29sIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZi5wb29scykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgZGVmLnBvb2xzKSB7XHJcbiAgICAgICAgaWYgKCEocG9vbCBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIGZvciBUeXBlc2NyaXB0IHR5cGUgZ3VhcmRpbmcgYW5kIHBhcmFtZXRlciBjaGVja2luZ1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBpc0Vhc3lMb290VGFibGVEZWZpbml0aW9uIChkZWY6IGFueSk6IGRlZiBpcyBMb290VGFibGVFYXN5RGVmaW5pdGlvbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZSB8fFxyXG4gICAgICBkZWYgaW5zdGFuY2VvZiBMb290VGFibGVQb29sIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5XHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZi5wb29scykge1xyXG4gICAgICBmb3IgKGNvbnN0IHBvb2wgb2YgZGVmLnBvb2xzKSB7XHJcbiAgICAgICAgaWYgKHBvb2wgaW5zdGFuY2VvZiBMb290VGFibGVQb29sKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIGZvciBUeXBlc2NyaXB0IHR5cGUgZ3VhcmRpbmcgYW5kIHBhcmFtZXRlciBjaGVja2luZ1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBpc0Vhc3lMb290VGFibGVQb29sRGVmaW5pdGlvbiAoZGVmOiBhbnkpOiBkZWYgaXMgTG9vdFRhYmxlUG9vbEVhc3lEZWZpbml0aW9uIHtcclxuICAgIGlmIChcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlIHx8XHJcbiAgICAgIGRlZiBpbnN0YW5jZW9mIExvb3RUYWJsZVBvb2wgfHxcclxuICAgICAgZGVmIGluc3RhbmNlb2YgTG9vdFRhYmxlRW50cnlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVmLmVudHJpZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBkZWYuZW50cmllcykge1xyXG4gICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIExvb3RUYWJsZUVudHJ5KSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCc7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdHJhbnNmb3JtRWFzeVRvUHJvcGVyTG9vdFRhYmxlRGVmaW5pdGlvbiAoZGVmOiBMb290VGFibGVFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZURlZmluaXRpb24ge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb290VGFibGVEZWZpbml0aW9uID0ge1xyXG4gICAgICBybmc6IHRoaXMubWFrZVJuZyhkZWYucm5nID8/IHRoaXMuZ2V0Um5nKCkpLFxyXG4gICAgICBuYW1lOiBkZWYubmFtZSxcclxuICAgICAgaWQ6IGRlZi5pZCxcclxuICAgICAgcG9vbHM6IFtdLFxyXG4gICAgfTtcclxuICAgIGlmIChkZWYucG9vbHMpIHtcclxuICAgICAgZm9yIChjb25zdCBwb29sIG9mIGRlZi5wb29scykge1xyXG4gICAgICAgIHJlc3VsdC5wb29scy5wdXNoKHRoaXMuY3JlYXRlUG9vbChwb29sKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC51bCA9IHRoaXM7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRyYW5zZm9ybUVhc3lUb1Byb3Blckxvb3RUYWJsZVBvb2xEZWZpbml0aW9uIChkZWY6IExvb3RUYWJsZVBvb2xFYXN5RGVmaW5pdGlvbik6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkRW50cmllcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgZW50cnkgb2YgKGRlZi5lbnRyaWVzID8/IFtdKSkge1xyXG4gICAgICBpZiAodGhpcy5pc0Vhc3lMb290VGFibGVEZWZpbml0aW9uKGVudHJ5KSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZW50cnkucG9vbHMgIT09ICd1bmRlZmluZWQnICYmIEFycmF5LmlzQXJyYXkoZW50cnkucG9vbHMpKSB7XHJcbiAgICAgICAgICBlbnRyeSA9IHRoaXMuY3JlYXRlVGFibGUoZW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0cmFuc2Zvcm1lZEVudHJpZXMucHVzaChlbnRyeSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQ6IExvb3RUYWJsZVBvb2xEZWZpbml0aW9uID0ge1xyXG4gICAgICBuYW1lOiBkZWYubmFtZSxcclxuICAgICAgaWQ6IGRlZi5pZCxcclxuICAgICAgcm9sbHM6IGRlZi5yb2xscyxcclxuICAgICAgbnVsbHM6IGRlZi5udWxscyxcclxuICAgICAgdGVtcGxhdGU6IGRlZi50ZW1wbGF0ZSxcclxuICAgICAgY29uZGl0aW9uczogZGVmLmNvbmRpdGlvbnMsXHJcbiAgICAgIGZ1bmN0aW9uczogZGVmLmZ1bmN0aW9ucyxcclxuICAgICAgZW50cmllczogdHJhbnNmb3JtZWRFbnRyaWVzXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXRoSm9pbiAocGFydHM6IHN0cmluZ1tdLCBzZXA6IHN0cmluZyA9ICcvJykgOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oc2VwKS5yZXBsYWNlKG5ldyBSZWdFeHAoc2VwICsgJ3sxLH0nLCAnZycpLCBzZXApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZpbmlzaFdpdGggKHN0cjogc3RyaW5nLCBlbmRpbmc6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgaWYgKHN0ci5lbmRzV2l0aChlbmRpbmcpKSB7XHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyICsgZW5kaW5nO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZpbmlzaFdpdGhFeHRlbnNpb24gKHN0cjogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgaWYgKHN0ci5lbmRzV2l0aChleHRlbnNpb24pKSB7XHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXN0ID0gc3RyLnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICAgIGNvbnN0IHBvcyA9IGxhc3QuaW5jbHVkZXMoJy4nKSA/IGxhc3QubGFzdEluZGV4T2YoJy4nKSA6IGxhc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgZmlsZVJvb3QgPSBzdHIuc3Vic3RyKDAsIChzdHIubGVuZ3RoIC0gbGFzdC5sZW5ndGgpICsgcG9zKTtcclxuICAgIGNvbnN0IG91dHB1dCA9IGAke2ZpbGVSb290fS4ke2V4dGVuc2lvbi5yZXBsYWNlKCcuJywgJycpfWA7XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldEV4dGVuc2lvbiAoc3RyOiBzdHJpbmcpIDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB7XHJcbiAgICBjb25zdCBsYXN0ID0gc3RyLnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuICAgIGlmICghbGFzdC5pbmNsdWRlcygnLicpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcG9zID0gbGFzdC5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgcmV0dXJuIGxhc3Quc3Vic3RyKHBvcywgbGFzdC5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VyaWFsaXplcyBhIExvb3RUYWJsZSByZWFkeSBmb3IgY29udmVydGluZyB0byB0ZXh0LCBlLmcuIEpTT05cclxuICAgKlxyXG4gICAqIFJldHVybnMgYSBrZXkgdmFsdWUgb2JqZWN0LCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIGxvb3QgdGFibGUgZmlsZW5hbWVzL2lkc1xyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCB1bHRyYWxvb3Quc2VyaWFsaXplKHRhYmxlKTtcclxuICAgKlxyXG4gICAqIHJlc3VsdCA9IHtcclxuICAgKiAgIGtpdGNoZW5fY3VwYm9hcmQ6IHtcclxuICAgKiAgICAgZm46ICdraXRjaGVuX2N1cGJvYXJkJyxcclxuICAgKiAgICAgcG9vbHM6IFtcclxuICAgKiAgICAgICB7XHJcbiAgICogICAgICAgICBlbnRyaWVzOiBbXHJcbiAgICogICAgICAgICAgIHtcclxuICAgKiAgICAgICAgICAgICB0eXBlOiAndGFibGUnLFxyXG4gICAqICAgICAgICAgICAgIGl0ZW06ICd2ZWdldGFibGVzJ1xyXG4gICAqICAgICAgICAgICB9LFxyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcclxuICAgKiAgICAgICAgICAgICBpdGVtOiAnZnJ1aXQnXHJcbiAgICogICAgICAgICAgIH1cclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH0sXHJcbiAgICogICBmcnVpdF9ib3dsOiB7XHJcbiAgICogICAgIGZuOiAnZnJ1aXRfYm93bCcsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcclxuICAgKiAgICAgICAgICAgICBpdGVtOiAnZnJ1aXQnXHJcbiAgICogICAgICAgICAgIH1cclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH0sXHJcbiAgICogICB2ZWdldGFibGVzOiB7XHJcbiAgICogICAgIGZuOiAndmVnZXRhYmxlcycsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgaWQ6ICdjYXJyb3QnXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICAgIHtcclxuICAgKiAgICAgICAgICAgICBpZDogJ2NhYmJhZ2UnXHJcbiAgICogICAgICAgICAgIH0sXHJcbiAgICogICAgICAgICBdXHJcbiAgICogICAgICAgfVxyXG4gICAqICAgICBdXHJcbiAgICogICB9LFxyXG4gICAqICAgZnJ1aXQ6IHtcclxuICAgKiAgICAgZm46ICdmcnVpdCcsXHJcbiAgICogICAgIHBvb2xzOiBbXHJcbiAgICogICAgICAge1xyXG4gICAqICAgICAgICAgZW50cmllczogW1xyXG4gICAqICAgICAgICAgICB7XHJcbiAgICogICAgICAgICAgICAgaWQ6ICdhcHBsZSdcclxuICAgKiAgICAgICAgICAgfSxcclxuICAgKiAgICAgICAgICAge1xyXG4gICAqICAgICAgICAgICAgIGlkOiAncGVhcidcclxuICAgKiAgICAgICAgICAgfSxcclxuICAgKiAgICAgICAgIF1cclxuICAgKiAgICAgICB9XHJcbiAgICogICAgIF1cclxuICAgKiAgIH1cclxuICAgKiB9XHJcbiAgICovXHJcbiAgcHVibGljIHNlcmlhbGl6ZSAodGFibGU6IExvb3RUYWJsZSwgeyBpbmNsdWRlUm5nID0gZmFsc2UsIGtleSwgaGFkID0gbmV3IFNldCgpIH06IHsgaW5jbHVkZVJuZz86IGJvb2xlYW4sIGtleT86IHN0cmluZywgaGFkPzogU2V0PGFueT4gfSA9IHt9KTogU2VyaWFsaXplZFRhYmxlcyB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZUpzb25EZWZpbml0aW9uPiA9IHt9O1xyXG4gICAgY29uc3QgY2xvbmU6IExvb3RUYWJsZUpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICBuYW1lOiB0YWJsZS5uYW1lLFxyXG4gICAgICBpZDogdGFibGUuaWQsXHJcbiAgICAgIGZuOiB0YWJsZS5mbixcclxuICAgICAgcG9vbHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGtleVRvVXNlID0gdGFibGUuZmlsZW5hbWUgPz8gdGhpcy5nZXRSbmcoKS51bmlxc3RyKDYpO1xyXG4gICAgaGFkLmFkZCh0YWJsZSk7XHJcblxyXG4gICAgaWYgKGluY2x1ZGVSbmcpIHtcclxuICAgICAgY2xvbmUucm5nID0gdGFibGUucm5nPy5zZXJpYWxpemUoKSA/PyBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgcG9vbCBvZiAodGFibGUucG9vbHMgPz8gW10pKSB7XHJcbiAgICAgIGNvbnN0IHBvb2xDbG9uZTogTG9vdFRhYmxlUG9vbEpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICAgIG5hbWU6IHBvb2wubmFtZSxcclxuICAgICAgICBpZDogcG9vbC5pZCxcclxuICAgICAgICByb2xsczogcG9vbC5yb2xscyxcclxuICAgICAgICBudWxsczogcG9vbC5udWxscyxcclxuICAgICAgICBjb25kaXRpb25zOiBwb29sLmNvbmRpdGlvbnMsXHJcbiAgICAgICAgZnVuY3Rpb25zOiBwb29sLmZ1bmN0aW9ucyxcclxuICAgICAgICBlbnRyaWVzOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgKHBvb2wuZW50cmllcyA/PyBbXSkpIHtcclxuICAgICAgICBjb25zdCBlbnRyeUNsb25lOiBMb290VGFibGVFbnRyeUpzb25EZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcclxuICAgICAgICAgIGlkOiBlbnRyeS5pZCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMb290VGFibGUpIHtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbSA9IGVudHJ5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbnRyeUNsb25lLnN0YWNrYWJsZSA9IGVudHJ5LnN0YWNrYWJsZTtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUud2VpZ2h0ID0gZW50cnkud2VpZ2h0O1xyXG4gICAgICAgICAgZW50cnlDbG9uZS5pdGVtID0gZW50cnkuaXRlbTtcclxuICAgICAgICAgIGVudHJ5Q2xvbmUucXR5ID0gZW50cnkucXR5O1xyXG4gICAgICAgICAgZW50cnlDbG9uZS5jb25kaXRpb25zID0gZW50cnkuY29uZGl0aW9ucztcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuZnVuY3Rpb25zID0gZW50cnkuZnVuY3Rpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVudHJ5Q2xvbmUuaXRlbSBpbnN0YW5jZW9mIExvb3RUYWJsZSkge1xyXG4gICAgICAgICAgY29uc3Qgc3ViS2V5VG9Vc2UgPSBlbnRyeUNsb25lLml0ZW0uZmlsZW5hbWUgPz8gdGhpcy5nZXRSbmcoKS51bmlxc3RyKDYpO1xyXG4gICAgICAgICAgaWYgKGhhZC5oYXMoZW50cnlDbG9uZS5pdGVtKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVjdXJzaXZlVGFibGVFcnJvcignUmVjdXJzaXZlIHJlcXVpcmVtZW50IGRldGVjdGVkIC0gY2Fubm90IHNlcmlhbGl6ZSByZWN1cnNpdmVseSByZXF1aXJlZCB0YWJsZXMuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFtzdWJLZXlUb1VzZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbS5maWxlbmFtZSA9IHN1YktleVRvVXNlO1xyXG4gICAgICAgICAgICBjb25zdCByID0gKHRoaXMuc2VyaWFsaXplKGVudHJ5Q2xvbmUuaXRlbSwgeyBpbmNsdWRlUm5nLCBrZXk6IHN1YktleVRvVXNlLCBoYWQgfSkpO1xyXG4gICAgICAgICAgICByZXN1bHRbc3ViS2V5VG9Vc2VdID0gci50YWJsZXNbc3ViS2V5VG9Vc2VdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZW50cnlDbG9uZS50eXBlID0gJ3RhYmxlJztcclxuICAgICAgICAgIGVudHJ5Q2xvbmUuaXRlbSA9IHN1YktleVRvVXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb29sQ2xvbmUuZW50cmllcy5wdXNoKGVudHJ5Q2xvbmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGNsb25lLnBvb2xzLnB1c2gocG9vbENsb25lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHRba2V5VG9Vc2VdID0gY2xvbmU7XHJcbiAgICBjb25zdCBmaW5hbCA9IHtcclxuICAgICAgW1ZFUlNJT05fS0VZXTogQ1VSUkVOVF9WRVJTSU9OLFxyXG4gICAgICB0YWJsZXM6IHJlc3VsdFxyXG4gICAgfTtcclxuICAgIHJldHVybiBmaW5hbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgYSBMb290VGFibGUgdG8gSlNPTlxyXG4gICAqIEBwYXJhbSAge0xvb3RUYWJsZX0gICAgICAgdGFibGUgICAgICAgICAgICAgICBUaGUgdGFibGUgdG8gc2VyaWFsaXplXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgIE9wdGlvbnNcclxuICAgKiBAcGFyYW0gIHtib29sZWFufSAgICAgICAgIG9wdGlvbnMuaW5jbHVkZVJuZyAgV2hldGhlciB0byBpbmNsdWRlIHRoZSBSTkcgc2VlZCBpbiB0aGUgc2VyaWFsaXplZCB0YWJsZXNcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgVGhlIHJlc3VsdGluZyBMb290VGFibGUgcmVwcmVzZW50YXRpb24gaW4gYSBKU09OIHN0cmluZ1xyXG4gICAqL1xyXG4gIHRvSnNvbiAodGFibGU6IExvb3RUYWJsZSwgeyBpbmNsdWRlUm5nID0gZmFsc2UgfTogeyBpbmNsdWRlUm5nPzogYm9vbGVhbiB9ID0ge30pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VyaWFsaXplKHRhYmxlLCB7IGluY2x1ZGVSbmcgfSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHRvZG8gSW1wbGVtZW50IHRoaXNcclxuICAgKi9cclxuICBhc3luYyBzYXZlVGFibGUgKHRhYmxlOiBMb290VGFibGUsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBzZXJpYWxpemVkIHRhYmxlcyBmcm9tIGEgZmlsZS5cclxuICAgKlxyXG4gICAqIFRoaXMgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIHVuc2VyaWFsaXppbmcganNvbiBjb250ZW50cyBvZiBhIGZpbGUuXHJcbiAgICogICAgKi9cclxuICBhc3luYyBsb2FkVGFibGVzIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHBhdGgpID8/ICcuanNvbic7XHJcbiAgICBjb25zdCBmdWxsUGF0aCA9IHRoaXMuZmluaXNoV2l0aCh0aGlzLnBhdGhKb2luKFtwYXRoLCBmaWxlbmFtZV0pLCBkZWZhdWx0RXh0ZW5zaW9uKTtcclxuICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgaWYgKGZ1bGxQYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSB8fCBmdWxsUGF0aC5zdGFydHNXaXRoKCdmaWxlOi8vJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVzRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRUYWJsZXNGcm9tRmlsZShmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVzRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgc2VyaWFsaXplZCB0YWJsZXMgZnJvbSBhIGxvY2FsIGZpbGVcclxuICAgKi9cclxuICBhc3luYyBsb2FkVGFibGVzRnJvbUZpbGUgKGZpbGVuYW1lOiBzdHJpbmcsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPj4ge1xyXG4gICAgZGVmYXVsdEV4dGVuc2lvbiA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24ocGF0aCkgPz8gJy5qc29uJztcclxuICAgIGxvZy5kKGBSZWFkaW5nIHRhYmxlcyBmcm9tICR7ZmlsZW5hbWV9YCk7XHJcbiAgICBsZXQgY29udGVudHM7XHJcbiAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbihmaWxlbmFtZSk7XHJcbiAgICBpZiAoZXh0ID09PSAnLmpzJykge1xyXG4gICAgICBjb25zdCBjYiA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGAke2ZpbGVuYW1lfWAsICd1dGY4Jyk7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1ldmFsXHJcbiAgICAgIGNvbnRlbnRzID0gZXZhbChjYik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb250ZW50cyA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGZpbGVuYW1lLCAndXRmOCcpXHJcbiAgICAgICAgLnRoZW4oKGQ6c3RyaW5nKSA9PiBKU09OLnBhcnNlKGQpKVxyXG4gICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7ZmlsZW5hbWV9XCIuICR7ZS5tZXNzYWdlfWA7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudW5zZXJpYWxpemUoY29udGVudHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBzZXJpYWxpemVkIHRhYmxlcyBmcm9tIGEgdXJsXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlc0Zyb21VcmwgKHVybDogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKHVybCkgPz8gJy5qc29uJztcclxuICAgIGxvZy5kKGBSZWFkaW5nIHRhYmxlcyBmcm9tICR7dXJsfWApO1xyXG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihkYXRhID0+IGRhdGEudGV4dCgpKS50aGVuKHR4dCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgfSBjYXRjaCAoZSA6IGFueSkge1xyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7dXJsfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfSkudGhlbih0YWJsZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy51bnNlcmlhbGl6ZSh0YWJsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkIGEgdGFibGUgZnJvbSBhIGZpbGUuXHJcbiAgICpcclxuICAgKiBUaGUgZmlsZSBjYW4gYmUgbG9jYWwgb3IgYSB1cmwuIElmIHJ1bm5pbmcgaW4gYnJvd3NlciwgaXQncyBhbHdheXMgdHJlYXRlZCBhc1xyXG4gICAqIGEgVVJMLiBXaGVuIHJ1biBpbiBub2RlLCBpdCB3aWxsIG9ubHkgdHJlYXQgaXQgYXMgYSBVUkwgaWYgaXQncyBwcmVmaXhlZCB3aXRoXHJcbiAgICogaHR0cC5cclxuICAgKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gZXhwZWN0cyBhIHNpbmdsZSB0YWJsZSB0byBiZSBsb2NhdGVkIGluIHRoZSBmaWxlLCBhcyB0aGUgYmFzZSBvYmplY3QuXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGNvbnN0IGV4dCA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24oZmlsZW5hbWUpID8/ICcuanNvbic7XHJcbiAgICBjb25zdCBmdWxsUGF0aCA9IHRoaXMuZmluaXNoV2l0aEV4dGVuc2lvbih0aGlzLnBhdGhKb2luKFtwYXRoLCBmaWxlbmFtZV0pLCBleHQpO1xyXG4gICAgbG9nLmQoJ0xvYWQgVGFibGUnLCB7XHJcbiAgICAgIGZpbGVuYW1lV2l0aFBhdGg6IHRoaXMucGF0aEpvaW4oW3BhdGgsIGZpbGVuYW1lXSksXHJcbiAgICAgIGZpbGVuYW1lLFxyXG4gICAgICBkZWZhdWx0RXh0ZW5zaW9uLFxyXG4gICAgICBleHQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGZ1bGxQYXRoXHJcbiAgICB9KTtcclxuICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgaWYgKGZ1bGxQYXRoLnN0YXJ0c1dpdGgoJ2h0dHAnKSB8fCBmdWxsUGF0aC5zdGFydHNXaXRoKCdmaWxlOi8vJykpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVGcm9tVXJsKGZ1bGxQYXRoLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbUZpbGUoZmlsZW5hbWUsIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9hZFRhYmxlRnJvbVVybChmdWxsUGF0aCwgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSB0YWJsZSBmcm9tIGEgbG9jYWwgZmlsZVxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRUYWJsZUZyb21GaWxlIChmaWxlbmFtZTogc3RyaW5nLCB7IHBhdGggPSAnJywgZGVmYXVsdEV4dGVuc2lvbiB9IDogTG9hZFNhdmVBcmdzID0ge30pOiBQcm9taXNlPExvb3RUYWJsZSB8IG51bGw+IHtcclxuICAgIGRlZmF1bHRFeHRlbnNpb24gPSBkZWZhdWx0RXh0ZW5zaW9uID8/IHRoaXMuZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lKSA/PyAnLmpzb24nO1xyXG5cclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lKTtcclxuICAgIGNvbnN0IHBqID0gdGhpcy5wYXRoSm9pbihbcGF0aCwgZmlsZW5hbWVdKTtcclxuICAgIGlmICghZXh0ZW5zaW9uKSB7XHJcbiAgICAgIC8vIElmIHRoZSBmaWxlIGV4aXN0cyB3aXRob3V0IGV4dGVuc2lvbiwgdHJ5IGFuZCByZWFkIGl0IGFzIGpzb25cclxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGopICYmIGZzLnN0YXRTeW5jKHBqKS5pc0ZpbGUoKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUocGosICd1dGY4JylcclxuICAgICAgICAgIC50aGVuKChkOnN0cmluZykgPT4gSlNPTi5wYXJzZShkKSlcclxuICAgICAgICAgIC5jYXRjaCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke2ZpbGVuYW1lfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVUYWJsZShjb250ZW50cywgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUcnkgYW5kIGR5bmFtaWNhbGx5IGZpbmQgdGhlIGZpbGVuYW1lLlxyXG4gICAgICBjb25zdCBleHRlbnNpb25zID0gbmV3IFNldChbXHJcbiAgICAgICAgZGVmYXVsdEV4dGVuc2lvbixcclxuICAgICAgICAnLmpzb24nLFxyXG4gICAgICAgICcuanMnLFxyXG4gICAgICAgICcuY2pzJyxcclxuICAgICAgICAnLm1qcydcclxuICAgICAgXSk7XHJcbiAgICAgIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIGV4dGVuc2lvbnMpIHtcclxuICAgICAgICBjb25zdCBmbldpdGhFeHQgPSB0aGlzLmZpbmlzaFdpdGhFeHRlbnNpb24ocGosIGV4dGVuc2lvbik7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZm5XaXRoRXh0KSAmJiBmcy5zdGF0U3luYyhmbldpdGhFeHQpLmlzRmlsZSgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGFibGVGcm9tRmlsZSh0aGlzLmZpbmlzaFdpdGhFeHRlbnNpb24oZmlsZW5hbWUsIGV4dGVuc2lvbiksIHsgcGF0aCwgZGVmYXVsdEV4dGVuc2lvbiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGopKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgZmlsZSBcIiR7ZmlsZW5hbWV9XCIgaW4gcGF0aCBcIiR7cGF0aH1cImApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250ZW50cztcclxuICAgIGlmIChcclxuICAgICAgZXh0ZW5zaW9uID09PSAnLmpzJyB8fFxyXG4gICAgICBleHRlbnNpb24gPT09ICcubWpzJyB8fFxyXG4gICAgICBleHRlbnNpb24gPT09ICcuY2pzJ1xyXG4gICAgKSB7XHJcbiAgICAgIC8vIHVuZm9ydHVuYXRlbHksIHR5cGVzY3JpcHQgbWFuZ2xlcyBpbXBvcnQgc3RhdGVtZW50cywgc28gdGhlIG9ubHlcclxuICAgICAgLy8gd2F5IHdlIGNhbiBkbyB0aGlzIGlzIHVzaW5nIGV2YWwuLi5cclxuICAgICAgY29uc3QgY2IgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShgJHtwan1gLCAndXRmOCcpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXZhbFxyXG4gICAgICBjb250ZW50cyA9IGV2YWwoY2IpO1xyXG4gICAgfSBlbHNlIGlmIChleHRlbnNpb24gPT09ICcuanNvbicgfHwgZGVmYXVsdEV4dGVuc2lvbiA9PT0gJycpIHtcclxuICAgICAgY29udGVudHMgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShwaiwgJ3V0ZjgnKVxyXG4gICAgICAgIC50aGVuKChkOnN0cmluZykgPT4gSlNPTi5wYXJzZShkKSlcclxuICAgICAgICAuY2F0Y2goKGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikge1xyXG4gICAgICAgICAgICBlLm1lc3NhZ2UgPSBgVGhlcmUgd2FzIGFuIGVycm9yIGxvYWRpbmcgZmlsZTogXCIke2ZpbGVuYW1lfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJlc29sdmVUYWJsZShjb250ZW50cywgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSB0YWJsZSBmcm9tIGEgdXJsXHJcbiAgICovXHJcbiAgYXN5bmMgbG9hZFRhYmxlRnJvbVVybCAodXJsOiBzdHJpbmcsIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8TG9vdFRhYmxlIHwgbnVsbD4ge1xyXG4gICAgZGVmYXVsdEV4dGVuc2lvbiA9IGRlZmF1bHRFeHRlbnNpb24gPz8gdGhpcy5nZXRFeHRlbnNpb24odXJsKSA/PyAnLmpzb24nO1xyXG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihkYXRhID0+IGRhdGEudGV4dCgpKS50aGVuKHR4dCA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgfSBjYXRjaCAoZSA6IGFueSkge1xyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgIGUubWVzc2FnZSA9IGBUaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyBmaWxlOiBcIiR7dXJsfVwiLiAke2UubWVzc2FnZX1gO1xyXG4gICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfSkudGhlbih0YWJsZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlVGFibGUodGFibGVzLCB7IHBhdGgsIGRlZmF1bHRFeHRlbnNpb24gfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFR1cm5zIGEgSlNPTiByZXByZXNlbnRhdGlvbiBpbnRvIGEgTG9vdFRhYmxlLCBhbmQgZG9lcyB0aGVcclxuICAgKiBzYW1lIGZvciBhbGwgbmVzdGVkIHRhYmxlcyBpbnNpZGUgcG9vbHMgcmVjdXJzaXZlbHkuXHJcbiAgICovXHJcbiAgYXN5bmMgcmVzb2x2ZVRhYmxlICh0YWJsZTogTG9vdFRhYmxlSnNvbkRlZmluaXRpb24sIHsgcGF0aCA9ICcnLCBkZWZhdWx0RXh0ZW5zaW9uIH0gOiBMb2FkU2F2ZUFyZ3MgPSB7fSk6IFByb21pc2U8TG9vdFRhYmxlIHwgbnVsbD4ge1xyXG4gICAgZm9yIChjb25zdCBwb29sIG9mICh0YWJsZS5wb29scyA/PyBbXSkpIHtcclxuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiAocG9vbC5lbnRyaWVzID8/IFtdKSkge1xyXG4gICAgICAgIGlmIChlbnRyeS50eXBlID09PSAndGFibGUnKSB7XHJcbiAgICAgICAgICBlbnRyeS5pdGVtID0gYXdhaXQgdGhpcy5sb2FkVGFibGUoZW50cnkuaXRlbSwgeyBwYXRoLCBkZWZhdWx0RXh0ZW5zaW9uIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgZW50cnkudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgbG9vdFRhYmxlID0gdGhpcy5jcmVhdGVUYWJsZSh0YWJsZSk7XHJcbiAgICByZXR1cm4gbG9vdFRhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zZXJpYWxpemVzIHRhYmxlcyBzZXJpYWxpemVkIHdpdGggdGhlIFwic2VyaWFsaXplXCIgZnVuY3Rpb25cclxuICAgKiBAcGFyYW0gIHtSZWNvcmQ8c3RyaW5nLCBMb290VGFibGVKc29uRGVmaW5pdGlvbj59IHRhYmxlcyBSZWNvcmQgb2YgdGFibGVzIHNlcmlhbGl6ZWQgdXNpbmcgdGhlIFwic2VyaWFsaXplXCIgZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlY29yZDxzdHJpbmcsIExvb3RUYWJsZT4+fSAgICAgICAgICAgICBBIGtleS92YWx1ZSBwYWlyaW5nIG9mIHRhYmxlc1xyXG4gICAqL1xyXG4gIHVuc2VyaWFsaXplICh0YWJsZXM6IFNlcmlhbGl6ZWRUYWJsZXMpOiBSZWNvcmQ8c3RyaW5nLCBMb290VGFibGU+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgTG9vdFRhYmxlPiA9IHt9O1xyXG5cclxuICAgIC8vIFdoZW4gdW5zZXJpYWxpemluZywgd2UgbG9vcCB0aHJvdWdoIG11bHRpcGxlIHRpbWVzIGJlY2F1c2UgdGhlcmUgaXNcclxuICAgIC8vIGluaGVyZXRlbmNlIC0gc28gd2UgbmVlZCB0byB1bnNlcmlhbGl6ZSB0aGluZ3MgaW4gdGhlIHJpZ2h0IG9yZGVyLlxyXG4gICAgLy8gVG8gYXZvaWQgYnVpbGRpbmcgY29tcGxleCBpbmhlcml0YW5jZSBjaGFpbnMsIHdlIGp1c3QgbG9vcCB0aHJvdWdoXHJcbiAgICAvLyB1cCB0byAxMDAgdGltZXMsIHNvIHRoaW5ncyBjYW4gYmUgbmVzdGVkIHVwIHRvIDEwMCB0aW1lcywgcmVzdGFydGluZ1xyXG4gICAgLy8gd2hlbiB3ZSBoaXQgYW4gdW5zZXJpYWxpemVkIG5lc3RlZCByZXF1aXJlbWVudC5cclxuICAgIGxldCBpID0gMTAwO1xyXG5cclxuICAgIC8vIEBUT0RPIERldGVjdCByZWN1cnNpdmUgcmVxdWlyZW1lbnRzIGJldHRlci5cclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sYWJlbHMgKi9cclxuICAgIHdoaWxlIChPYmplY3QudmFsdWVzKHRhYmxlcy50YWJsZXMpLmxlbmd0aCA+IDAgJiYgaS0tID4gMCkge1xyXG4gICAgICBnZXRCYWNrOlxyXG4gICAgICBmb3IgKGNvbnN0IFtpZCwgdGFibGVdIG9mIE9iamVjdC5lbnRyaWVzKHRhYmxlcy50YWJsZXMpKSB7XHJcbiAgICAgICAgY29uc3Qgcm5nID0gdGFibGUucm5nID8/IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRhYmxlLnJuZztcclxuICAgICAgICBsb2cudihgVW5zZXJpYWxpemluZyB0YWJsZSAke2lkfWApO1xyXG4gICAgICAgIGZvciAoY29uc3QgcG9vbCBvZiAodGFibGUucG9vbHMgPz8gW10pKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIChwb29sLmVudHJpZXMgPz8gW10pKSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeS50eXBlID09PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbZW50cnkuaXRlbV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhYmxlcy50YWJsZXNbZW50cnkuaXRlbV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGFibGUgJHtlbnRyeS5pdGVtfSBub3QgcHJlc2VudCBpbiBzZXJpYWxpemVkIGRhdGFgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFdlIGRvIHRoZSBmb2xsb3dpbmcgdG8gdW5zZXJpYWxpemUgdGhpbmdzIGluIHRoZSBjb3JyZWN0IG9yZGVyLlxyXG4gICAgICAgICAgICAgICAgbG9nLnYoYFdlIGRpZG4ndCBoYXZlICR7ZW50cnkuaXRlbX0gaW4gb3VyIHJlc3VsdHNgKTtcclxuICAgICAgICAgICAgICAgIC8vIFdlaXJkbHksIGphdmFzY3JpcHQgaGFzIG5vIHdheSB0byBicmVhayBvdXQgb2YgbmVzdGVkIGxvb3BzIGV4Y2VwdCB1c2luZyBsYWJlbHM/XHJcbiAgICAgICAgICAgICAgICAvLyBhbnl3YXkuLi50aGlzIGlzIHVudXN1YWwsIGJ1dCBoZXkgaG9cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGdldEJhY2s7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVudHJ5Lml0ZW0gPSByZXN1bHRbZW50cnkuaXRlbV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVsZXRlIGVudHJ5LnR5cGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdFtpZF0gPSB0aGlzLmNyZWF0ZVRhYmxlKHRhYmxlKTtcclxuICAgICAgICBpZiAocm5nKSB7XHJcbiAgICAgICAgICByZXN1bHRbaWRdLnNldFJuZyh0aGlzLmdldFJuZ0NvbnN0cnVjdG9yKCkudW5zZXJpYWxpemUocm5nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0YWJsZXMudGFibGVzW2lkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXhpbXVtIG5lc3RlZCBzZXJpYWxpemVkIHRhYmxlIGxpbWl0IHJlYWNoZWQgKGNvdWxkIGJlIGEgcmVjdXJzaXZlIHJlcXVpcmVtZW50IHNvbWV3aGVyZSBjYXVzaW5nIGFuIGlzc3VlPyknKTtcclxuICAgIH1cclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbGFiZWxzICovXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVWx0cmFMb290O1xyXG4iLCIvKipcclxuICogU2ltcGxlIGRvdCBnZXR0ZXIgZnVuY3Rpb24uIElmIHByb3BlcnR5IGlzIHVuZGVmaW5lZCwgcmV0dXJucyBkZWZhdWx0IHZhbHVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IG9iID0geyBhOiB7IGI6IHsgYzogJ2ZvbycgfSB9IH07XHJcbiAqIGRvdEdldChvYiwgJ2EuYi5jJyk7IC8vICdmb28nXHJcbiAqIGRvdEdldChvYiwgJ2Euei5jJyk7IC8vIHVuZGVmaW5lZFxyXG4gKiBkb3RHZXQob2IsICdhLnouYycsICdiYXInKTsgLy8gJ2JhcidcclxuICovXHJcbmV4cG9ydCBjb25zdCBkb3RHZXQgPSAob2I6IFJlY29yZDxzdHJpbmcsIGFueT4sIHBhdGg6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55KSA9PiB7XHJcbiAgY29uc3QgcmVzdWx0ID0gcGF0aC5zcGxpdCgnLicpLnJlZHVjZSgobywgaSkgPT4gKCh0eXBlb2YgbyAhPT0gJ3VuZGVmaW5lZCcpID8gb1tpXSA6IG8pLCBvYik7XHJcbiAgcmV0dXJuICh0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2ltcGxlIGRvdCBzZXR0ZXJcclxuICogQGV4YW1wbGVcclxuICogY29uc3Qgb2IgPSB7IGE6IHsgYjogeyBjOiAnZm9vJyB9IH0gfTtcclxuICogZG90U2V0KG9iLCAnYS5iLmMnLCAnYmFyJyk7IC8vIG9iLmEuYi5jID09PSAnYmFyJztcclxuICogZG90U2V0KG9iLCAnYS5iLmQnLCAnYmF6Jyk7IC8vIG9iLmEuYi5kID09PSAnYmF6JztcclxuICovXHJcbmV4cG9ydCBjb25zdCBkb3RTZXQgPSAob2I6IGFueSwgcGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgY29uc3Qga2V5cyA9IHBhdGguc3BsaXQoJy4nKTtcclxuICBsZXQgcGFyZW50ID0gb2I7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcclxuICAgIGlmICghKGtleSBpbiBwYXJlbnQpKSB7XHJcbiAgICAgIHBhcmVudFtrZXldID0ge307XHJcbiAgICB9XHJcbiAgICBwYXJlbnQgPSBwYXJlbnRba2V5XTtcclxuICB9XHJcbiAgcGFyZW50W2tleXNba2V5cy5sZW5ndGggLSAxXV0gPSB2YWx1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIHByb3BlcnR5IG9mIG9iXHJcbiAqIEBleGFtcGxlXHJcbiAqIGRlcGVuZChmYWxzZSk7IC8vIGZhbHNlXHJcbiAqIGRlcGVuZChmYWxzZSwgbnVsbCwgdHJ1ZSk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IGZhbHNlfSwgJ2ZvbycpOyAvLyBmYWxzZVxyXG4gKiBkZXBlbmQoe2ZvbzogZmFsc2V9LCAnZm9vJywgbnVsbCwgdHJ1ZSk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IHRydWV9LCAnZm9vJyk7IC8vIHRydWVcclxuICogZGVwZW5kKHtmb286IHRydWV9LCAnZm9vJywgbnVsbCwgdHJ1ZSk7IC8vIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVwZW5kID0gKG9iOiBhbnksIHsgcHJvcGVydHksIHRvYmUsIG1pbiwgbWF4LCBpbnZlcnNlID0gZmFsc2UsIHN0cmljdCA9IHRydWUgfSA6IHsgcHJvcGVydHk/OiBzdHJpbmcsIG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyLCB0b2JlPzogYW55LCBpbnZlcnNlPzogYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbiB9ID0ge30pID0+IHtcclxuICBpbnZlcnNlID0gISFpbnZlcnNlO1xyXG4gIGlmICghb2IpIHtcclxuICAgIHJldHVybiBpbnZlcnNlO1xyXG4gIH1cclxuICBsZXQgdmFsID0gb2I7XHJcbiAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHZhbCA9IGRvdEdldChvYiwgcHJvcGVydHkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB0b2JlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgaWYgKHN0cmljdCkge1xyXG4gICAgICB2YWwgPSAodmFsID09PSB0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcclxuICAgICAgdmFsID0gKHZhbCA9PSB0b2JlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnZlcnNlID8gIXZhbCA6ICEhdmFsO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgKFxyXG4gICAgICB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgKSAmJlxyXG4gICAgc3RyaWN0ICYmXHJcbiAgICB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJ1xyXG4gICkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKFxyXG4gICAgdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgIHZhbCAhPT0gbnVsbFxyXG4gICkge1xyXG4gICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHBhcnNlRmxvYXQodmFsKSA8IG1pbikge1xyXG4gICAgICByZXR1cm4gaW52ZXJzZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJyAmJiBwYXJzZUZsb2F0KHZhbCkgPiBtYXgpIHtcclxuICAgICAgcmV0dXJuIGludmVyc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuICFpbnZlcnNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGludmVyc2UgPyAhdmFsIDogISF2YWw7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgVWx0cmFMb290IGZyb20gJy4vLi4vc3JjL3VsdHJhbG9vdCc7XHJcblxyXG5jb25zdCB1bCA9IG5ldyBVbHRyYUxvb3QoKTtcclxudWwucmVnaXN0ZXJEZWZhdWx0Q29uZGl0aW9ucygpO1xyXG51bC5yZWdpc3RlckRlZmF1bHRGdW5jdGlvbnMoKTtcclxuXHJcbnVsLnJlZ2lzdGVyRnVuY3Rpb24oJ3N0YWxlTGV2ZWwnLCAoeyBybmcsIGxvb3RlZCwgYXJncyB9KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBsb290ZWQuaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGxvb3RlZC5pdGVtLnBlcmlzaGFibGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBsb290ZWQuaXRlbS5wZXJpc2hhYmxlLmNvbmRpdGlvbiA9IHJuZy5jaGFuY3koeyAuLi57IG1pbjogMCwgbWF4OiAxLCB0eXBlOiAnbm9ybWFsJyB9LCAuLi5hcmdzIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG51bC5yZWdpc3RlckZ1bmN0aW9uKCdyYW5kb21Db2xvcicsICh7IHJuZywgbG9vdGVkLCBhcmdzID0ge30gfSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgbG9vdGVkLml0ZW0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBsb290ZWQuaXRlbS5jb2xvcmFibGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBjb25zdCBjaG9pY2VzIDogQXJyYXk8YW55PiA9IGFyZ3MuY2hvaWNlcyA/PyBbJ3JlZCcsICdvcmFuZ2UnLCAneWVsbG93JywgJ2dyZWVuJywgJ2JsdWUnLCAnaW5kaWdvJywgJ3Zpb2xldCddO1xyXG4gICAgbG9vdGVkLml0ZW0uY29sb3JhYmxlLmNvbG9yID0gcm5nLndlaWdodGVkQ2hvaWNlKGNob2ljZXMpO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBwaWNrIChvIDogUmVjb3JkPHN0cmluZywgYW55PiwgLi4ucHJvcHMgOiBzdHJpbmdbXSkge1xyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCAuLi5wcm9wcy5tYXAocHJvcCA9PiAoeyBbcHJvcF06IG9bcHJvcF0gfSkpKTtcclxufVxyXG5cclxuY29uc3QgcGxheWVyID0ge1xyXG4gIGxldmVsOiAxNVxyXG59O1xyXG5cclxuY29uc3QgdGFibGVQcm9taXNlcyA9IFtdO1xyXG5cclxudGFibGVQcm9taXNlcy5wdXNoKHVsLmxvYWRUYWJsZSgnanNfdGVzdC5qcycsIHsgcGF0aDogJ2V4YW1wbGVzL3RhYmxlcycgfSkpO1xyXG50YWJsZVByb21pc2VzLnB1c2godWwubG9hZFRhYmxlKCdhcm1vcl9ib3gnLCB7IHBhdGg6ICdleGFtcGxlcy90YWJsZXMnIH0pKTtcclxudGFibGVQcm9taXNlcy5wdXNoKHVsLmxvYWRUYWJsZSgnY2xvdGhpbmdfc3RvcmUnLCB7IHBhdGg6ICdleGFtcGxlcy90YWJsZXMnIH0pKTtcclxudGFibGVQcm9taXNlcy5wdXNoKHVsLmxvYWRUYWJsZSgna2l0Y2hlbl9jdXBib2FyZCcsIHsgcGF0aDogJ2V4YW1wbGVzL3RhYmxlcycgfSkpO1xyXG50YWJsZVByb21pc2VzLnB1c2godWwubG9hZFRhYmxlKCdtaW5pbmcnLCB7IHBhdGg6ICdleGFtcGxlcy90YWJsZXMnIH0pKTtcclxudGFibGVQcm9taXNlcy5wdXNoKHVsLmxvYWRUYWJsZSgnbWluaW5nL2dlbXMnLCB7IHBhdGg6ICdleGFtcGxlcy90YWJsZXMnIH0pKTtcclxuXHJcblByb21pc2UuYWxsKHRhYmxlUHJvbWlzZXMpLnRoZW4oKFtcclxuICBqc1Rlc3QsXHJcbiAgYXJtb3JCb3gsXHJcbiAgY2xvdGhpbmdTdG9yZSxcclxuICBraXRjaGVuQ3VwYm9hcmQsXHJcbiAgbWluaW5nLFxyXG4gIGdlbXNcclxuXSkgPT4ge1xyXG4gIGNvbnN0IG51bVJvbGxzID0gMTtcclxuICBjb25zb2xlLmxvZyhganNUZXN0IHJlc3VsdHMgd2l0aCBhIGxldmVsICR7cGxheWVyLmxldmVsfSBwbGF5ZXJgLCBqc1Rlc3Qucm9sbFN5bmMoeyBuOiBudW1Sb2xscywgbG9vdGVyOiBwbGF5ZXIgfSkubWFwKGEgPT4gcGljayhhLCAnaWQnLCAnaXRlbScpKSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKGBLaXRjaGVuIEN1cGJvYXJkIHJlc3VsdHMgd2l0aCBhIGxldmVsICR7cGxheWVyLmxldmVsfSBwbGF5ZXJgLCBraXRjaGVuQ3VwYm9hcmQucm9sbFN5bmMoeyBuOiBudW1Sb2xscywgbG9vdGVyOiBwbGF5ZXIgfSkubWFwKGEgPT4gcGljayhhLCAnaWQnLCAnaXRlbScpKSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdBcm1vciBCb3ggcmVzdWx0cyB3aXRoIGEgbGV2ZWwgMTAgcGxheWVyJywgYXJtb3JCb3gucm9sbFN5bmMoeyBuOiBudW1Sb2xscywgbG9vdGVyOiB7IGxldmVsOiAxMCB9IH0pLm1hcChhID0+IGEuaWQpKTtcclxuICBjb25zb2xlLmxvZyhgQXJtb3IgQm94IHJlc3VsdHMgd2l0aCBhIGxldmVsICR7cGxheWVyLmxldmVsfSBwbGF5ZXJgLCBhcm1vckJveC5yb2xsU3luYyh7IG46IG51bVJvbGxzLCBsb290ZXI6IHBsYXllciB9KS5tYXAoYSA9PiBhLmlkKSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKGBDbG90aGluZyBzdG9yZSByZXN1bHRzIHdpdGggYSBsZXZlbCAke3BsYXllci5sZXZlbH0gcGxheWVyYCwgY2xvdGhpbmdTdG9yZS5yb2xsU3luYyh7IG46IG51bVJvbGxzLCBsb290ZXI6IHBsYXllciB9KS5tYXAoYSA9PiBwaWNrKGEsICdpZCcsICdpdGVtJykpKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==