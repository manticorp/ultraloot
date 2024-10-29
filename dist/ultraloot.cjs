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
    if (args) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .depend */ .fE)(context, args);
    }
    return true;
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
    if (args) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .depend */ .fE)(looter, args);
    }
    return true;
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
    args = args ?? {};
    args.lootedProperty = args.lootedProperty ?? args.property;
    args.looterProperty = args.looterProperty ?? args.property;
    if (args.looterProperty && args.lootedProperty) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotSet */ ._c)(looted, args.lootedProperty, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotGet */ .m0)(looter, args.looterProperty, args.default));
    }
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
    args = args ?? {};
    args.lootedProperty = args.lootedProperty ?? args.property;
    args.contextProperty = args.contextProperty ?? args.property;
    if (args.contextProperty && args.lootedProperty) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotSet */ ._c)(looted, args.lootedProperty, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .dotGet */ .m0)(context, args.contextProperty, args.default));
    }
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
    args = args ?? {};
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

/***/ 623:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Bh: () => (/* binding */ ArrayNumberValidator),
/* harmony export */   Ol: () => (/* binding */ NumberValidator),
/* harmony export */   X: () => (/* binding */ NumberValidationError)
/* harmony export */ });
/**
 * @category Number Validator
 */
const assert = (truthy, msg = 'Assertion failed') => {
    if (!truthy) {
        throw new NumberValidationError(msg);
    }
};
/**
 * @category Number Validator
 */
class NumberValidationError extends Error {
}
/**
 * @category Number Validator
 */
class ArrayNumberValidator {
    /**
     * The numbers to be validated
     */
    #numbers = [];
    /**
     * Descriptive name for this validation
     */
    name = 'numbers';
    constructor(numbers, name = 'numbers') {
        this.numbers = numbers;
        this.name = name;
    }
    get numbers() {
        return this.#numbers;
    }
    set numbers(numbers) {
        for (const number of numbers) {
            assert(typeof number === 'number', `Non-number passed to validator ${number}`);
        }
        this.#numbers = numbers;
    }
    /**
     * Specify the numbers to validate
     */
    all(numbers) {
        this.numbers = numbers;
        return this;
    }
    /**
     * Specify the numbers to validate
     */
    validate(numbers) {
        if (!Array.isArray(numbers)) {
            return new NumberValidator(numbers);
        }
        return this.all(numbers);
    }
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potatoes = [0, 1];
     * validate(potatoes).varname('potatoes').gt(2); // "Expected every component of potatoes to be > 2, got 0"
     */
    varname(name) {
        this.name = name;
        return this;
    }
    /**
     * Get the sum of our numbers
     */
    sum() {
        return this.numbers.reduce((a, b) => a + b, 0);
    }
    /**
     * Validates whether the total of all of our numbers is close to sum, with a maximum difference of diff
     * @param sum The sum
     * @param diff The maximum difference
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not sum close to the correct amount
     */
    sumcloseto(sum, diff = 0.0001, msg) {
        assert(Math.abs(this.sum() - sum) < diff, msg ?? `Expected sum of ${this.name} to be within ${diff} of ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is equal (===) to sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to the correct amount
     */
    sumto(sum, msg) {
        assert(this.sum() === sum, msg ?? `Expected sum of ${this.name} to be equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is < sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to < sum
     */
    sumtolt(sum, msg) {
        assert(this.sum() < sum, msg ?? `Expected sum of ${this.name} to be less than ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is > sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to > sum
     */
    sumtogt(sum, msg) {
        assert(this.sum() > sum, msg ?? `Expected sum of ${this.name} to be greater than ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is <= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to <= sum
     */
    sumtolteq(sum, msg) {
        assert(this.sum() <= sum, msg ?? `Expected sum of ${this.name} to be less than or equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * Validates whether the total of all of our numbers is >= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to >= sum
     */
    sumtogteq(sum, msg) {
        assert(this.sum() >= sum, msg ?? `Expected sum of ${this.name} to be greater than or equal to ${sum}, got ${this.sum()}`);
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all integers
     */
    int(msg) {
        this.numbers.forEach(a => validate(a).int(msg ?? `Expected every component of ${this.name} to be an integer, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all positive
     */
    positive(msg) {
        this.numbers.forEach(a => validate(a).positive(msg ?? `Expected every component of ${this.name} to be postiive, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all negative
     */
    negative(msg) {
        this.numbers.forEach(a => validate(a).negative(msg ?? `Expected every component of ${this.name} to be negative, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all between from and to
     */
    between(from, to, msg) {
        this.numbers.forEach(a => validate(a).between(from, to, msg ?? `Expected every component of ${this.name} to be between ${from} and ${to}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all between or equal to from and to
     */
    betweenEq(from, to, msg) {
        this.numbers.forEach(a => validate(a).betweenEq(from, to, msg ?? `Expected every component of ${this.name} to be between or equal to ${from} and ${to}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all > n
     */
    gt(n, msg) {
        this.numbers.forEach(a => validate(a).gt(n, msg ?? `Expected every component of ${this.name} to be > ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all >= n
     */
    gteq(n, msg) {
        this.numbers.forEach(a => validate(a).gteq(n, msg ?? `Expected every component of ${this.name} to be >= ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all < n
     */
    lt(n, msg) {
        this.numbers.forEach(a => validate(a).lt(n, msg ?? `Expected every component of ${this.name} to be < ${n}, got ${a}`));
        return this;
    }
    /**
     * @throws {@link NumberValidationError} if numbers are not all <= n
     */
    lteq(n, msg) {
        this.numbers.forEach(a => validate(a).lteq(n, msg ?? `Expected every component of ${this.name} to be <= ${n}, got ${a}`));
        return this;
    }
}
/**
 * Validate numbers in a fluent fashion.
 *
 * Each validator method accepts a message as the last parameter
 * for customising the error message.
 *
 * @category Number Validator
 *
 * @example
 * const n = new NumberValidator();
 * n.validate(0).gt(1); // NumberValidationError
 *
 * @example
 * const n = new NumberValidator();
 * const probability = -0.1;
 * n.validate(probability).gteq(0, 'Probabilities should always be >= 0'); // NumberValidationError('Probabilities should always be >= 0').
 */
class NumberValidator {
    /**
     * The number being tested.
     */
    #number;
    /**
     * The name of the variable being validated - shows up in error messages.
     */
    name = 'number';
    constructor(number = 0, name = 'number') {
        this.number = number;
        this.name = name;
    }
    get number() {
        return this.#number;
    }
    set number(number) {
        assert(typeof number === 'number', `Non-number passed to validator ${number}`);
        this.#number = number;
    }
    /**
     * Returns an ArrayNumberValidator for all the numbers
     */
    all(numbers, name) {
        return new ArrayNumberValidator(numbers, name ?? this.name);
    }
    assertNumber(num) {
        assert(typeof this.number !== 'undefined', 'No number passed to validator.');
        return true;
    }
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potato = 1;
     * validate(potato).varname('potato').gt(2); // "Expected potato to be greater than 2, got 1"
     * @param {string} name [description]
     */
    varname(name) {
        this.name = name;
        return this;
    }
    /**
     * Specify the number to be validated
     */
    validate(number) {
        if (Array.isArray(number)) {
            return this.all(number);
        }
        this.number = number;
        return this;
    }
    /**
     * Asserts that the number is an integer
     * @throws {@link NumberValidationError} if ths number is not an integer
     */
    int(msg) {
        if (this.assertNumber(this.number))
            assert(Number.isInteger(this.number), msg ?? `Expected ${this.name} to be an integer, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that the number is > 0
     * @throws {@link NumberValidationError} if the number is not positive
     */
    positive(msg) {
        return this.gt(0, msg ?? `Expected ${this.name} to be positive, got ${this.number}`);
    }
    /**
     * Asserts that the number is < 0
     * @throws {@link NumberValidationError} if the number is not negative
     */
    negative(msg) {
        return this.lt(0, msg ?? `Expected ${this.name} to be negative, got ${this.number}`);
    }
    /**
     * Asserts that the from < number < to
     * @throws {@link NumberValidationError} if it is outside or equal to those bounds
     */
    between(from, to, msg) {
        if (this.assertNumber(this.number))
            assert(this.number > from && this.number < to, msg ?? `Expected ${this.name} to be between ${from} and ${to}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that the from <= number <= to
     * @throws {@link NumberValidationError} if it is outside those bounds
     */
    betweenEq(from, to, msg) {
        if (this.assertNumber(this.number))
            assert(this.number >= from && this.number <= to, msg ?? `Expected ${this.name} to be between or equal to ${from} and ${to}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number > n
     * @throws {@link NumberValidationError} if it is less than or equal to n
     */
    gt(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number > n, msg ?? `Expected ${this.name} to be greater than ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number >= n
     * @throws {@link NumberValidationError} if it is less than n
     */
    gteq(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number >= n, msg ?? `Expected ${this.name} to be greater than or equal to ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number < n
     * @throws {@link NumberValidationError} if it is greater than or equal to n
     */
    lt(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number < n, msg ?? `Expected ${this.name} to be less than ${n}, got ${this.number}`);
        return this;
    }
    /**
     * Asserts that number <= n
     * @throws {@link NumberValidationError} if it is greater than n
     */
    lteq(n, msg) {
        if (this.assertNumber(this.number))
            assert(this.number <= n, msg ?? `Expected ${this.name} to be less than or equal to ${n}, got ${this.number}`);
        return this;
    }
}
function validate(number) {
    if (Array.isArray(number)) {
        return new ArrayNumberValidator(number);
    }
    else if (typeof number === 'object') {
        const entries = Object.entries(number);
        if (entries.length === 0) {
            throw new Error('Empty object provided');
        }
        const [name, value] = entries[0];
        return validate(value).varname(name);
    }
    else {
        return new NumberValidator(number);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);


/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  YG: () => (/* binding */ MaxRecursionsError),
  Qs: () => (/* binding */ NonRandomRandomError),
  Up: () => (/* binding */ RngAbstract),
  Ay: () => (/* binding */ src_rng)
});

// EXTERNAL MODULE: ./src/number.ts
var src_number = __webpack_require__(623);
;// ./src/rng/pool.ts

/**
 * @category Pool
 */
class PoolEmptyError extends Error {
}
/**
 * @category Pool
 */
class PoolNotEnoughElementsError extends Error {
}
/**
 * Allows for randomly drawing from a pool of entries without replacement
 * @category Pool
 */
class Pool {
    rng;
    #entries = [];
    constructor(entries = [], rng) {
        this.entries = entries;
        if (rng) {
            this.rng = rng;
        }
        else {
            this.rng = new src_rng();
        }
    }
    copyArray(arr) {
        return Array.from(arr);
    }
    setEntries(entries) {
        this.entries = entries;
        return this;
    }
    getEntries() {
        return this.#entries;
    }
    set entries(entries) {
        this.#entries = this.copyArray(entries);
    }
    get entries() {
        return this.#entries;
    }
    get length() {
        return this.#entries.length;
    }
    setRng(rng) {
        this.rng = rng;
        return this;
    }
    getRng() {
        return this.rng;
    }
    add(entry) {
        this.#entries.push(entry);
    }
    empty() {
        this.#entries = [];
        return this;
    }
    isEmpty() {
        return this.length <= 0;
    }
    /**
     * Draw an element from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     */
    draw() {
        if (this.length === 0) {
            throw new PoolEmptyError('No more elements left to draw from in pool.');
        }
        if (this.length === 1) {
            return this.#entries.splice(0, 1)[0];
        }
        const idx = this.rng.randInt(0, this.#entries.length - 1);
        return this.#entries.splice(idx, 1)[0];
    }
    /**
     * Draw n elements from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     * @throws {@link PoolNotEnoughElementsError} if the pool does not have enough elements to draw n values
     */
    drawMany(n) {
        if (n < 0) {
            throw new Error('Cannot draw < 0 elements from pool');
        }
        if (this.length === 0 && n > 0) {
            throw new PoolEmptyError('No more elements left to draw from in pool.');
        }
        if (this.length < n) {
            throw new PoolNotEnoughElementsError(`Tried to draw ${n} elements from pool with only ${this.length} entries.`);
        }
        const result = [];
        for (let i = 0; i < n; i++) {
            const idx = this.rng.randInt(0, this.#entries.length - 1);
            result.push(this.#entries.splice(idx, 1)[0]);
        }
        return result;
    }
}

;// ./src/rng/queue.ts
class Dequeue {
    size;
    elements = [];
    constructor(length = 1) {
        if (Array.isArray(length)) {
            this.elements = length;
            this.size = this.elements.length;
        }
        else {
            this.size = length;
        }
    }
    get length() {
        return this.elements.length;
    }
    push(el) {
        this.elements.push(el);
        if (this.elements.length > this.size) {
            return this.pop();
        }
    }
    pop() {
        return this.elements.pop();
    }
    full() {
        return this.length >= this.size;
    }
    empty() {
        this.elements = [];
    }
    get(i) {
        return this.elements[i];
    }
    allSame() {
        if (this.length > 0) {
            return this.elements.every(a => a === this.elements[0]);
        }
        return true;
    }
}
class NumberQueue extends (/* unused pure expression or super */ null && (Dequeue)) {
    sum() {
        return this.elements.reduce((a, b) => a + b, 0);
    }
    avg() {
        return this.sum() / this.length;
    }
}
class LoopDetectedError extends Error {
}
class NonRandomDetector extends Dequeue {
    minsequencelength = 2;
    errormessage = 'Loop detected in input data. Randomness source not random?';
    constructor(length = 1, minsequencelength = 2) {
        super(length);
        if (this.size > 10000) {
            throw new Error('Cannot detect loops for more than 10000 elements');
        }
        this.minsequencelength = minsequencelength;
    }
    push(el) {
        this.detectLoop();
        this.elements.push(el);
        if (this.elements.length > this.size) {
            return this.pop();
        }
    }
    detectLoop(msg) {
        if (this.full()) {
            if (this.allSame()) {
                this.loopDetected(msg);
            }
            if (this.hasRepeatingSequence(this.elements, this.minsequencelength)) {
                this.loopDetected(msg);
            }
        }
    }
    loopDetected(msg) {
        throw new LoopDetectedError(msg ?? this.errormessage);
    }
    /**
     * Checks if there is a repeating sequence longer than a specified length in an array of numbers.
     *
     * @param {number[]} arr - The array of numbers.
     * @param {number} n - The minimum length of the repeating sequence.
     * @returns {boolean} True if a repeating sequence longer than length n is found, otherwise false.
     */
    hasRepeatingSequence(arr, n) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                let k = 0;
                while (j + k < arr.length && arr[i + k] === arr[j + k]) {
                    k++;
                    if (k > n) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

;// ./src/rng.ts



/**
 * Safeguard against huge loops. If loops unintentionally grow beyond this
 * arbitrary limit, bail out..
 */
const LOOP_MAX = 10000000;
/**
 * Safeguard against too much recursion - if a function recurses more than this,
 * we know we have a problem.
 *
 * Max recursion limit is around ~1000 anyway, so would get picked up by interpreter.
 */
const MAX_RECURSIONS = 500;
const THROW_ON_MAX_RECURSIONS_REACHED = true;
const PREDICTABLE_SEED = 5789938451;
const SAMERANDOM_MAX = 10;
const diceRe = /^ *([+-]? *[0-9_]*) *[dD] *([0-9_]+) *([+-]? *[0-9_.]*) *$/;
const strToNumberCache = {};
const diceCache = {};
class MaxRecursionsError extends Error {
}
class NonRandomRandomError extends Error {
}
function sum(numbersFirstArg, ...numbers) {
    if (Array.isArray(numbersFirstArg)) {
        return numbersFirstArg.reduce((a, b) => a + b, 0);
    }
    return numbers.reduce((a, b) => a + b, 0);
}
function isNumeric(input) {
    return (typeof input === 'number') || (!isNaN(parseFloat(input)) && isFinite(input));
}
/**
 * This abstract class implements most concrete implementations of
 * functions, as the only underlying changes are likely to be to the
 * uniform random number generation, and how that is handled.
 *
 * All the typedoc documentation for this has been sharded out to RngInterface
 * in a separate file.
 */
class RngAbstract {
    #seed = 0;
    #monotonic = 0;
    #lastuniqid = 0;
    #randFunc;
    #shouldThrowOnMaxRecursionsReached;
    #distributions = [
        'normal',
        'gaussian',
        'boxMuller',
        'irwinHall',
        'bates',
        'batesgaussian',
        'bernoulli',
        'exponential',
        'pareto',
        'poisson',
        'hypergeometric',
        'rademacher',
        'binomial',
        'betaBinomial',
        'beta',
        'gamma',
        'studentsT',
        'wignerSemicircle',
        'kumaraswamy',
        'hermite',
        'chiSquared',
        'rayleigh',
        'logNormal',
        'cauchy',
        'laplace',
        'logistic',
    ];
    constructor(seed) {
        this.setSeed(seed);
    }
    getSeed() {
        return this.#seed;
    }
    sameAs(other) {
        if (other instanceof RngAbstract) {
            return this.#seed === other.#seed && this.#randFunc === other.#randFunc;
        }
        return false;
    }
    randomSource(source) {
        this.#randFunc = source;
        return this;
    }
    getRandomSource() {
        return this.#randFunc;
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
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized) {
        const { constructor } = Object.getPrototypeOf(this);
        const rng = new constructor(serialized.seed);
        rng.setSeed(serialized.seed);
        return rng;
    }
    predictable(seed) {
        const { constructor } = Object.getPrototypeOf(this);
        const newSelf = new constructor(seed ?? PREDICTABLE_SEED);
        return newSelf;
    }
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable(seed) {
        return new this(seed ?? PREDICTABLE_SEED);
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
        if (typeof this.#randFunc === 'function') {
            return this.#randFunc();
        }
        return this._next();
    }
    percentage() {
        return this.randBetween(0, 100);
    }
    probability() {
        return this.randBetween(0, 1);
    }
    random(from = 0, to = 1, skew = 0) {
        return this.randBetween(from, to, skew);
    }
    chance(n, chanceIn = 1) {
        (0,src_number/* default */.Ay)({ chanceIn }).positive();
        (0,src_number/* default */.Ay)({ n }).positive();
        const chance = n / chanceIn;
        return this._random() <= chance;
    }
    // 500 to 1 chance, for example
    chanceTo(from, to) {
        return this.chance(from, from + to);
    }
    randInt(from = 0, to = 1, skew = 0) {
        (0,src_number/* default */.Ay)({ from }).int();
        (0,src_number/* default */.Ay)({ to }).int();
        if (from === to) {
            return from;
        }
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
    uniqid(prefix = '') {
        const now = Date.now() * 1000;
        if (this.#lastuniqid === now) {
            this.#monotonic++;
        }
        else {
            this.#monotonic = Math.round(this._random() * 100);
        }
        const sec = now + this.#monotonic;
        const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
        this.#lastuniqid = now;
        return `${prefix}${id}`;
    }
    randomString(len = 6) {
        (0,src_number/* default */.Ay)({ len }).gt(0);
        const str = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const alen = 61;
        for (let i = 0; i < len; i++) {
            str.push(alphabet[this.randInt(0, alen)]);
        }
        return str.join('');
    }
    randBetween(from = 0, to, skew = 0) {
        if (typeof to === 'undefined') {
            to = from + 1;
        }
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
        (0,src_number/* default */.Ay)({ number }).lteq(max);
        (0,src_number/* default */.Ay)({ number }).gteq(min);
        // First we scale the number in the range [0-1)
        number = (number - min) / (max - min);
        return this.scaleNorm(number, from, to);
    }
    scaleNorm(number, from, to) {
        (0,src_number/* default */.Ay)({ number }).betweenEq(0, 1);
        return (number * (to - from)) + from;
    }
    shouldThrowOnMaxRecursionsReached(val) {
        if (typeof val === 'boolean') {
            this.#shouldThrowOnMaxRecursionsReached = val;
            return this;
        }
        if (typeof this.#shouldThrowOnMaxRecursionsReached !== 'undefined') {
            return this.#shouldThrowOnMaxRecursionsReached;
        }
        return THROW_ON_MAX_RECURSIONS_REACHED;
    }
    /**
     * Generates a normally distributed number, but with a special clamping and skewing procedure
     * that is sometimes useful.
     *
     * Note that the results of this aren't strictly gaussian normal when min/max are present,
     * but for our puposes they should suffice.
     *
     * Otherwise, without min and max and skew, the results are gaussian normal.
     *
     * @example
     *
     * rng.normal({ min: 0, max: 1, stddev: 0.1 });
     * rng.normal({ mean: 0.5, stddev: 0.5 });
     *
     * @see [Normal Distribution - Wikipedia](https://en.wikipedia.org/wiki/Normal_distribution)
     * @group Random Number Generation
     * @param [options]
     * @param [options.mean] - The mean value of the distribution
     * @param [options.stddev] - Must be > 0 if present
     * @param [options.skew] - The skew to apply. -ve = left, +ve = right
     * @param [options.min] - Minimum value allowed for the output
     * @param [options.max] - Maximum value allowed for the output
     * @param [depth] - used internally to track the recursion depth
     * @return A normally distributed number
     * @throws {@link NumberValidationError} If the input parameters are not valid.
     * @throws {@link MaxRecursionsError} If the function recurses too many times in trying to generate in bounds numbers
     */
    normal({ mean, stddev, max, min, skew = 0 } = {}, depth = 0) {
        if (typeof min === 'undefined' && typeof max === 'undefined') {
            return this.gaussian({ mean, stddev, skew });
        }
        if (depth > MAX_RECURSIONS && this.shouldThrowOnMaxRecursionsReached()) {
            throw new MaxRecursionsError(`Max recursive calls to rng normal function. This might be as a result of using predictable random numbers, or inappropriate arguments? Args: ${JSON.stringify({ mean, stddev, max, min, skew })}`);
        }
        let num = this.bates(7);
        if (skew < 0) {
            num = 1 - (Math.pow(num, Math.pow(2, skew)));
        }
        else {
            num = Math.pow(num, Math.pow(2, -skew));
        }
        if (typeof mean === 'undefined' &&
            typeof stddev === 'undefined' &&
            typeof max !== 'undefined' &&
            typeof min !== 'undefined') {
            // This is a simple scaling of the bates distribution.
            return this.scaleNorm(num, min, max);
        }
        num = (num * 10) - 5;
        if (typeof mean === 'undefined') {
            mean = 0;
            if (typeof max !== 'undefined' && typeof min !== 'undefined') {
                mean = (max + min) / 2;
                if (typeof stddev === 'undefined') {
                    stddev = Math.abs(max - min) / 10;
                }
            }
            if (typeof stddev === 'undefined') {
                stddev = 0.1;
            }
            num = num * stddev + mean;
        }
        else {
            if (typeof stddev === 'undefined') {
                if (typeof max !== 'undefined' && typeof min !== 'undefined') {
                    stddev = Math.abs(max - min) / 10;
                }
                else {
                    stddev = 0.1;
                }
            }
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
    gaussian({ mean = 0, stddev = 1, skew = 0 } = {}) {
        (0,src_number/* default */.Ay)({ stddev }).positive();
        if (skew === 0) {
            return this.boxMuller({ mean, stddev });
        }
        let num = this.boxMuller({ mean: 0, stddev: 1 });
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (skew < 0) {
            num = 1 - (Math.pow(num, Math.pow(2, skew)));
        }
        else {
            num = Math.pow(num, Math.pow(2, -skew));
        }
        num = num * 10;
        num = num - 5;
        num = num * stddev + mean;
        return num;
    }
    boxMuller(mean = 0, stddev = 1) {
        if (typeof mean === 'object') {
            ({ mean = 0, stddev = 1 } = mean);
        }
        (0,src_number/* default */.Ay)({ stddev }).gteq(0);
        const u = 1 - this._random(); // Converting [0,1) to (0,1]
        const v = this._random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Transform to the desired mean and standard deviation:
        return z * stddev + mean;
    }
    irwinHall(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        (0,src_number/* default */.Ay)({ n }).int().positive();
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += this._random();
        }
        return sum;
    }
    bates(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        (0,src_number/* default */.Ay)({ n }).int().positive();
        return this.irwinHall({ n }) / n;
    }
    batesgaussian(n = 6) {
        if (typeof n === 'object') {
            ({ n = 6 } = n);
        }
        (0,src_number/* default */.Ay)({ n }).int().gt(1);
        return (this.irwinHall({ n }) / Math.sqrt(n)) - ((1 / Math.sqrt(1 / n)) / 2);
    }
    bernoulli(p = 0.5) {
        if (typeof p === 'object') {
            ({ p = 0.5 } = p);
        }
        (0,src_number/* default */.Ay)({ p }).lteq(1).gteq(0);
        return this._random() < p ? 1 : 0;
    }
    exponential(rate = 1) {
        if (typeof rate === 'object') {
            ({ rate = 1 } = rate);
        }
        (0,src_number/* default */.Ay)({ rate }).gt(0);
        return -Math.log(1 - this._random()) / rate;
    }
    pareto({ shape = 0.5, scale = 1, location = 0 } = {}) {
        (0,src_number/* default */.Ay)({ shape }).gteq(0);
        (0,src_number/* default */.Ay)({ scale }).positive();
        const u = this._random();
        if (shape !== 0) {
            return location + (scale / shape) * (Math.pow(u, -shape) - 1);
        }
        else {
            return location - scale * Math.log(u);
        }
    }
    poisson(lambda = 1) {
        if (typeof lambda === 'object') {
            ({ lambda = 1 } = lambda);
        }
        (0,src_number/* default */.Ay)({ lambda }).positive();
        const L = Math.exp(-lambda);
        let k = 0;
        let p = 1;
        let i = 0;
        const nq = new NonRandomDetector(SAMERANDOM_MAX, 2);
        do {
            k++;
            const r = this._random();
            nq.push(r);
            p *= r;
            nq.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the poisson distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${r}`);
        } while (p > L && i++ < LOOP_MAX);
        if ((i + 1) >= LOOP_MAX) {
            throw new Error('LOOP_MAX reached in poisson - bailing out - possible parameter error, or using non-random source?');
        }
        return k - 1;
    }
    hypergeometric({ N = 50, K = 10, n = 5, k } = {}) {
        (0,src_number/* default */.Ay)({ N }).int().positive();
        (0,src_number/* default */.Ay)({ K }).int().positive().lteq(N);
        (0,src_number/* default */.Ay)({ n }).int().positive().lteq(N);
        if (typeof k === 'undefined') {
            k = this.randInt(0, Math.min(K, n));
        }
        (0,src_number/* default */.Ay)({ k }).int().betweenEq(0, Math.min(K, n));
        function logFactorial(x) {
            let res = 0;
            for (let i = 2; i <= x; i++) {
                res += Math.log(i);
            }
            return res;
        }
        function logCombination(a, b) {
            return logFactorial(a) - logFactorial(b) - logFactorial(a - b);
        }
        const logProb = logCombination(K, k) + logCombination(N - K, n - k) - logCombination(N, n);
        return Math.exp(logProb);
    }
    rademacher() {
        return this._random() < 0.5 ? -1 : 1;
    }
    binomial({ n = 1, p = 0.5 } = {}) {
        (0,src_number/* default */.Ay)({ n }).int().positive();
        (0,src_number/* default */.Ay)({ p }).betweenEq(0, 1);
        let successes = 0;
        for (let i = 0; i < n; i++) {
            if (this._random() < p) {
                successes++;
            }
        }
        return successes;
    }
    betaBinomial({ alpha = 1, beta = 1, n = 1 } = {}) {
        (0,src_number/* default */.Ay)({ alpha }).positive();
        (0,src_number/* default */.Ay)({ beta }).positive();
        (0,src_number/* default */.Ay)({ n }).int().positive();
        const bd = (alpha, beta) => {
            let x = this._random();
            let y = this._random();
            x = Math.pow(x, 1 / alpha);
            y = Math.pow(y, 1 / beta);
            return x / (x + y);
        };
        const p = bd(alpha, beta);
        let k = 0;
        for (let i = 0; i < n; i++) {
            if (this._random() < p) {
                k++;
            }
        }
        return k;
    }
    beta({ alpha = 0.5, beta = 0.5 } = {}) {
        (0,src_number/* default */.Ay)({ alpha }).positive();
        (0,src_number/* default */.Ay)({ beta }).positive();
        const gamma = (alpha) => {
            let x = 0;
            for (let i = 0; i < alpha; i++) {
                const r = this._random();
                x += -Math.log(r);
                if ((i + 1) >= LOOP_MAX) {
                    throw new Error('LOOP_MAX reached in beta - bailing out - possible parameter error, or using non-random source?');
                }
            }
            return x;
        };
        const x = gamma(alpha);
        const y = gamma(beta);
        return x / (x + y);
    }
    gamma({ shape = 1, rate, scale } = {}) {
        (0,src_number/* default */.Ay)({ shape }).positive();
        if (typeof scale !== 'undefined' && typeof rate !== 'undefined' && rate !== 1 / scale) {
            throw new Error('Cannot supply rate and scale');
        }
        if (typeof scale !== 'undefined') {
            (0,src_number/* default */.Ay)({ scale }).positive();
            rate = 1 / scale;
        }
        if (typeof rate === 'undefined') {
            rate = 1;
        }
        if (rate) {
            (0,src_number/* default */.Ay)({ rate }).positive();
        }
        let flg;
        let x2;
        let v0;
        let v1;
        let x;
        let u;
        let v = 1;
        const d = shape - 1 / 3;
        const c = 1.0 / Math.sqrt(9.0 * d);
        let i = 0;
        flg = true;
        const nq1 = new NonRandomDetector(SAMERANDOM_MAX);
        while (flg && i++ < LOOP_MAX) {
            let j = 0;
            const nq2 = new NonRandomDetector(SAMERANDOM_MAX);
            do {
                x = this.normal();
                nq2.push(x);
                nq2.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul ofthe looped way of generating.`);
                v = 1.0 + (c * x);
            } while (v <= 0.0 && j++ < LOOP_MAX);
            if ((j + 1) >= LOOP_MAX) {
                throw new Error(`LOOP_MAX reached inside gamma inner loop - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
            }
            v *= Math.pow(v, 2);
            x2 = Math.pow(x, 2);
            v0 = 1.0 - (0.331 * x2 * x2);
            v1 = (0.5 * x2) + (d * (1.0 - v + Math.log(v)));
            u = this._random();
            nq1.push(u);
            nq1.detectLoop(`Loop detected in randomly generated numbers over the last ${SAMERANDOM_MAX} generations. This is incompatible with the gamma distribution. Try either using a spread of non-random numbers or fine tune the number to not fall foul of the looped way of generating. Last random number was ${u}`);
            if (u < v0 || Math.log(u) < v1) {
                flg = false;
            }
        }
        if ((i + 1) >= LOOP_MAX) {
            throw new Error(`LOOP_MAX reached inside gamma - bailing out - possible parameter error, or using non-random source? had shape = ${shape}, rate = ${rate}, scale = ${scale}`);
        }
        return rate * d * v;
    }
    studentsT(nu = 1) {
        if (typeof nu === 'object') {
            ({ nu = 1 } = nu);
        }
        (0,src_number/* default */.Ay)({ nu }).positive();
        const normal = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        const chiSquared = this.gamma({ shape: nu / 2, rate: 2 });
        return normal / Math.sqrt(chiSquared / nu);
    }
    wignerSemicircle(R = 1) {
        if (typeof R === 'object') {
            ({ R = 1 } = R);
        }
        (0,src_number/* default */.Ay)({ R }).gt(0);
        const theta = this._random() * 2 * Math.PI;
        return R * Math.cos(theta);
    }
    kumaraswamy({ alpha = 0.5, beta = 0.5 } = {}) {
        (0,src_number/* default */.Ay)({ alpha }).gt(0);
        (0,src_number/* default */.Ay)({ beta }).gt(0);
        const u = this._random();
        return Math.pow(1 - Math.pow(1 - u, 1 / beta), 1 / alpha);
    }
    hermite({ lambda1 = 1, lambda2 = 2 } = {}) {
        (0,src_number/* default */.Ay)({ lambda1 }).gt(0);
        (0,src_number/* default */.Ay)({ lambda2 }).gt(0);
        const x1 = this.poisson({ lambda: lambda1 });
        const x2 = this.poisson({ lambda: lambda2 });
        return x1 + x2;
    }
    chiSquared(k = 1) {
        if (typeof k === 'object') {
            ({ k = 1 } = k);
        }
        (0,src_number/* default */.Ay)({ k }).positive().int();
        let sum = 0;
        for (let i = 0; i < k; i++) {
            const z = Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
            sum += z * z;
        }
        return sum;
    }
    rayleigh(scale = 1) {
        if (typeof scale === 'object') {
            ({ scale = 1 } = scale);
        }
        (0,src_number/* default */.Ay)({ scale }).gt(0);
        return scale * Math.sqrt(-2 * Math.log(this._random()));
    }
    logNormal({ mean = 0, stddev = 1 } = {}) {
        (0,src_number/* default */.Ay)({ stddev }).gt(0);
        const normal = mean + stddev * Math.sqrt(-2.0 * Math.log(this._random())) * Math.cos(2.0 * Math.PI * this._random());
        return Math.exp(normal);
    }
    cauchy({ median = 0, scale = 1 } = {}) {
        (0,src_number/* default */.Ay)({ scale }).gt(0);
        const u = this._random();
        return median + scale * Math.tan(Math.PI * (u - 0.5));
    }
    laplace({ mean = 0, scale = 1 } = {}) {
        (0,src_number/* default */.Ay)({ scale }).gt(0);
        const u = this._random() - 0.5;
        return mean - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
    }
    logistic({ mean = 0, scale = 1 } = {}) {
        (0,src_number/* default */.Ay)({ scale }).gt(0);
        const u = this._random();
        return mean + scale * Math.log(u / (1 - u));
    }
    /**
     * Returns the support of the given distribution.
     *
     * @see [Wikipedia - Support (mathematics)](https://en.wikipedia.org/wiki/Support_(mathematics)#In_probability_and_measure_theory)
     */
    support(distribution) {
        const map = {
            random: '[min, max)',
            integer: '[min, max]',
            normal: '(-INF, INF)',
            boxMuller: '(-INF, INF)',
            gaussian: '(-INF, INF)',
            irwinHall: '[0, n]',
            bates: '[0, 1]',
            batesgaussian: '(-INF, INF)',
            bernoulli: '{0, 1}',
            exponential: '[0, INF)',
            pareto: '[scale, INF)',
            poisson: '{1, 2, 3 ...}',
            hypergeometric: '{max(0, n+K-N), ..., min(n, K)}',
            rademacher: '{-1, 1}',
            binomial: '{0, 1, 2, ..., n}',
            betaBinomial: '{0, 1, 2, ..., n}',
            beta: '(0, 1)',
            gamma: '(0, INF)',
            studentsT: '(-INF, INF)',
            wignerSemicircle: '[-R; +R]',
            kumaraswamy: '(0, 1)',
            hermite: '{0, 1, 2, 3, ...}',
            chiSquared: '[0, INF)',
            rayleigh: '[0, INF)',
            logNormal: '(0, INF)',
            cauchy: '(-INF, +INF)',
            laplace: '(-INF, +INF)',
            logistic: '(-INF, +INF)',
        };
        return map[distribution];
    }
    chancyInt(input) {
        if (typeof input === 'number') {
            return Math.round(input);
        }
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyInt');
                }
            }
            let choice = this.choice(input);
            if (typeof choice !== 'number') {
                choice = parseFloat(choice);
            }
            return Math.round(choice);
        }
        if (typeof input === 'object') {
            const type = input.type ?? 'random';
            if (type === 'random') {
                input.type = 'integer';
            }
            else if (type === 'normal') {
                input.type = 'normal_integer';
            }
        }
        return Math.round(this.chancy(input));
    }
    chancy(input, depth = 0) {
        if (depth >= MAX_RECURSIONS) {
            if (this.shouldThrowOnMaxRecursionsReached()) {
                throw new MaxRecursionsError('Max recursions reached in chancy. Usually a case of badly chosen min/max values.');
            }
            else {
                return 0;
            }
        }
        if (Array.isArray(input)) {
            return this.choice(input);
        }
        if (typeof input === 'string') {
            return this.dice(input);
        }
        if (typeof input === 'object') {
            input.type = input.type ?? 'random';
            if (input.type === 'random' ||
                input.type === 'int' ||
                input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'random':
                    return this.random(input.min, input.max, input.skew);
                case 'int':
                case 'integer':
                    return this.randInt(input.min, input.max, input.skew);
                case 'normal_integer':
                case 'normal_int':
                    return Math.floor(this.normal(input));
                case 'dice':
                    return this.chancyMinMax(this.dice(input.dice ?? input), input, depth);
                case 'rademacher':
                    return this.chancyMinMax(this.rademacher(), input, depth);
                case 'normal':
                case 'gaussian':
                case 'boxMuller':
                case 'irwinHall':
                case 'bates':
                case 'batesgaussian':
                case 'bernoulli':
                case 'exponential':
                case 'pareto':
                case 'poisson':
                case 'hypergeometric':
                case 'binomial':
                case 'betaBinomial':
                case 'beta':
                case 'gamma':
                case 'studentsT':
                case 'wignerSemicircle':
                case 'kumaraswamy':
                case 'hermite':
                case 'chiSquared':
                case 'rayleigh':
                case 'logNormal':
                case 'cauchy':
                case 'laplace':
                case 'logistic':
                    return this.chancyMinMax(this[input.type](input), input, depth);
            }
            throw new Error(`Invalid input type given to chancy: "${input.type}".`);
        }
        if (typeof input === 'number') {
            return input;
        }
        throw new Error('Invalid input given to chancy');
    }
    chancyMinMax(result, input, depth = 0) {
        const { min, max } = input;
        if ((depth + 1) >= MAX_RECURSIONS && !this.shouldThrowOnMaxRecursionsReached()) {
            if (typeof min !== 'undefined') {
                result = Math.max(min, result);
            }
            if (typeof max !== 'undefined') {
                result = Math.min(max, result);
            }
            // always returns something in bounds.
            return result;
        }
        if (typeof min !== 'undefined' && result < min) {
            return this.chancy(input, depth + 1);
        }
        if (typeof max !== 'undefined' && result > max) {
            return this.chancy(input, depth + 1);
        }
        return result;
    }
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    chancyMin(input) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.chancyMin(input);
    }
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    chancyMax(input) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.chancyMax(input);
    }
    /**
     * {@inheritDoc RngInterface.chancyMin}
     * @group Result Prediction
     */
    static chancyMin(input) {
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyMin array input');
                }
            }
            return Math.min(...input);
        }
        if (typeof input === 'string') {
            return this.diceMin(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            input.type = input.type ?? 'random';
            if (input.type === 'random' || input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'dice':
                    return this.diceMin(input.dice);
                case 'normal':
                    return input.min ?? Number.NEGATIVE_INFINITY;
                case 'normal_integer':
                    return input.min ?? Number.NEGATIVE_INFINITY;
                case 'integer':
                    return input.min ?? 0;
                case 'random':
                    return input.min ?? 0;
                case 'boxMuller':
                    return Number.NEGATIVE_INFINITY;
                case 'gaussian':
                    return Number.NEGATIVE_INFINITY;
                case 'irwinHall':
                    return 0;
                case 'bates':
                    return 0;
                case 'batesgaussian':
                    return Number.NEGATIVE_INFINITY;
                case 'bernoulli':
                    return 0;
                case 'exponential':
                    return 0;
                case 'pareto':
                    return input.scale ?? 1;
                case 'poisson':
                    return 1;
                case 'hypergeometric':
                    // eslint-disable-next-line no-case-declarations
                    const { N = 50, K = 10, n = 5 } = input;
                    return Math.max(0, (n + K - N));
                case 'rademacher':
                    return -1;
                case 'binomial':
                    return 0;
                case 'betaBinomial':
                    return 0;
                case 'beta':
                    return Number.EPSILON;
                case 'gamma':
                    return Number.EPSILON;
                case 'studentsT':
                    return Number.NEGATIVE_INFINITY;
                case 'wignerSemicircle':
                    return -1 * (input.R ?? 10);
                case 'kumaraswamy':
                    return Number.EPSILON;
                case 'hermite':
                    return 0;
                case 'chiSquared':
                    return 0;
                case 'rayleigh':
                    return 0;
                case 'logNormal':
                    return Number.EPSILON;
                case 'cauchy':
                    return Number.NEGATIVE_INFINITY;
                case 'laplace':
                    return Number.NEGATIVE_INFINITY;
                case 'logistic':
                    return Number.NEGATIVE_INFINITY;
            }
            throw new Error(`Invalid input type ${input.type}.`);
        }
        throw new Error('Invalid input supplied to chancyMin');
    }
    /**
     * {@inheritDoc RngInterface.chancyMax}
     * @group Result Prediction
     */
    static chancyMax(input) {
        if (Array.isArray(input)) {
            for (const el of input) {
                if (!isNumeric(el)) {
                    throw new Error('Cannot pass non-numbers to chancyMax array input');
                }
            }
            return Math.max(...input);
        }
        if (typeof input === 'string') {
            return this.diceMax(input);
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'object') {
            input.type = input.type ?? 'random';
            if (input.type === 'random' || input.type === 'integer') {
                if (typeof input.min !== 'undefined' && typeof input.max === 'undefined') {
                    input.max = Number.MAX_SAFE_INTEGER;
                }
            }
            switch (input.type) {
                case 'dice':
                    return this.diceMax(input.dice);
                case 'normal':
                    return input.max ?? Number.POSITIVE_INFINITY;
                case 'normal_integer':
                    return input.max ?? Number.POSITIVE_INFINITY;
                case 'integer':
                    return input.max ?? 1;
                case 'random':
                    return input.max ?? 1;
                case 'boxMuller':
                    return Number.POSITIVE_INFINITY;
                case 'gaussian':
                    return Number.POSITIVE_INFINITY;
                case 'irwinHall':
                    return (input.n ?? 6);
                case 'bates':
                    return 1;
                case 'batesgaussian':
                    return Number.POSITIVE_INFINITY;
                case 'bernoulli':
                    return 1;
                case 'exponential':
                    return Number.POSITIVE_INFINITY;
                case 'pareto':
                    return Number.POSITIVE_INFINITY;
                case 'poisson':
                    return Number.MAX_SAFE_INTEGER;
                case 'hypergeometric':
                    // eslint-disable-next-line no-case-declarations
                    const { K = 10, n = 5 } = input;
                    return Math.min(n, K);
                case 'rademacher':
                    return 1;
                case 'binomial':
                    return (input.n ?? 1);
                case 'betaBinomial':
                    return (input.n ?? 1);
                case 'beta':
                    return 1;
                case 'gamma':
                    return Number.POSITIVE_INFINITY;
                case 'studentsT':
                    return Number.POSITIVE_INFINITY;
                case 'wignerSemicircle':
                    return (input.R ?? 10);
                case 'kumaraswamy':
                    return 1;
                case 'hermite':
                    return Number.MAX_SAFE_INTEGER;
                case 'chiSquared':
                    return Number.POSITIVE_INFINITY;
                case 'rayleigh':
                    return Number.POSITIVE_INFINITY;
                case 'logNormal':
                    return Number.POSITIVE_INFINITY;
                case 'cauchy':
                    return Number.POSITIVE_INFINITY;
                case 'laplace':
                    return Number.POSITIVE_INFINITY;
                case 'logistic':
                    return Number.POSITIVE_INFINITY;
            }
            throw new Error(`Invalid input type ${input.type}.`);
        }
        throw new Error('Invalid input supplied to chancyMax');
    }
    choice(data) {
        return this.weightedChoice(data);
    }
    weights(data) {
        const chances = new Map();
        data.forEach(function (a) {
            let init = 0;
            if (chances.has(a)) {
                init = chances.get(a);
            }
            chances.set(a, init + 1);
        });
        return chances;
    }
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
            const chances = this.weights(data);
            const result = this.weightedChoice(chances);
            chances.clear();
            return result;
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
    pool(entries) {
        return new Pool(entries, this);
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
                if (typeof n.n === 'undefined' &&
                    typeof n.d === 'undefined' &&
                    typeof n.plus === 'undefined') {
                    throw new Error('Invalid input given to dice related function - dice object must have at least one of n, d or plus properties.');
                }
                ({ n = 1, d = 6, plus = 0 } = n);
            }
        }
        (0,src_number/* default */.Ay)({ n }).int(`Expected n to be an integer, got ${n}`);
        (0,src_number/* default */.Ay)({ d }).int(`Expected d to be an integer, got ${d}`);
        return { n, d, plus };
    }
    parseDiceArgs(n = 1, d = 6, plus = 0) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceArgs(n);
    }
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    static parseDiceString(string) {
        // dice string like 5d10+1
        if (!diceCache[string]) {
            const trimmed = string.replace(/ +/g, '');
            if (/^[+-]*[\d.]+$/.test(trimmed)) {
                return { n: 0, d: 0, plus: parseFloat(trimmed) };
            }
            if (diceRe.test(string)) {
                const result = diceRe.exec(trimmed);
                if (result !== null) {
                    diceCache[string] = {
                        n: parseInt(result[1]),
                        d: parseInt(result[2]),
                        plus: parseFloat(result[3]),
                    };
                    if (Number.isNaN(diceCache[string].n)) {
                        diceCache[string].n = 1;
                    }
                    if (Number.isNaN(diceCache[string].d)) {
                        diceCache[string].d = 6;
                    }
                    if (Number.isNaN(diceCache[string].plus)) {
                        diceCache[string].plus = 0;
                    }
                }
            }
            if (typeof diceCache[string] === 'undefined') {
                throw new Error(`Could not parse dice string ${string}`);
            }
        }
        return diceCache[string];
    }
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    diceMax(n, d, plus) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.diceMax(n, d, plus);
    }
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    diceMin(n, d, plus) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.diceMin(n, d, plus);
    }
    /**
     * {@inheritDoc RngInterface.diceMax}
     * @group Result Prediction
     */
    static diceMax(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return (n * d) + plus;
    }
    /**
     * {@inheritDoc RngInterface.diceMin}
     * @group Result Prediction
     */
    static diceMin(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        return n + plus;
    }
    diceExpanded(n = 1, d = 6, plus = 0) {
        ({ n, d, plus } = this.parseDiceArgs(n, d, plus));
        if (typeof n === 'number') {
            let nval = n;
            const dval = Math.max(d, 0);
            if (d === 1) {
                return { dice: Array(n).fill(d), plus, total: (n * d + plus) };
            }
            if (n === 0 || d === 0) {
                return { dice: [], plus, total: plus };
            }
            const multiplier = nval < 0 ? -1 : 1;
            nval *= multiplier;
            const results = { dice: [], plus, total: plus };
            while (nval > 0) {
                results.dice.push(multiplier * this.randInt(1, dval));
                nval--;
            }
            results.total = sum(results.dice) + plus;
            return results;
        }
        throw new Error('Invalid arguments given to dice');
    }
    dice(n, d, plus) {
        return this.diceExpanded(n, d, plus).total;
    }
    /**
     * {@inheritDoc RngInterface.parseDiceString}
     * @group Utilities
     */
    parseDiceString(string) {
        const { constructor } = Object.getPrototypeOf(this);
        return constructor.parseDiceString(string);
    }
    clamp(number, lower, upper) {
        if (typeof upper !== 'undefined') {
            number = number <= upper ? number : upper;
        }
        if (typeof lower !== 'undefined') {
            number = number >= lower ? number : lower;
        }
        return number;
    }
    bin(val, bins, min, max) {
        (0,src_number/* default */.Ay)({ val }).gt(min).lt(max);
        const spread = max - min;
        return (Math.round(((val - min) / spread) * (bins - 1)) / (bins - 1) * spread) + min;
    }
}
/**
 * @category Main Class
 */
class Rng extends RngAbstract {
    #mask;
    #seed = 0;
    #randFunc;
    #m_z = 0;
    constructor(seed) {
        super(seed);
        this.#mask = 0xffffffff;
        this.#m_z = 987654321;
    }
    /**
     * {@inheritDoc RngInterface.predictable}
     * @group Seeding
     */
    static predictable(seed) {
        return new this(seed ?? PREDICTABLE_SEED);
    }
    serialize() {
        return {
            mask: this.getMask(),
            seed: this.getSeed(),
            m_z: this.getMz(),
        };
    }
    sameAs(other) {
        if (other instanceof Rng) {
            return this.getRandomSource() === other.getRandomSource() &&
                this.getSeed() === other.getSeed() &&
                this.getMask() === other.getMask() &&
                this.getMz() === other.getMz();
        }
        return false;
    }
    /** @hidden */
    getMask() {
        return this.#mask;
    }
    /** @hidden */
    getMz() {
        return this.#m_z;
    }
    /** @hidden */
    setMask(mask) {
        this.#mask = mask;
    }
    /** @hidden */
    setMz(mz) {
        this.#m_z = mz;
    }
    /**
     * {@inheritDoc RngConstructor.unserialize}
     * @group Serialization
     */
    static unserialize(serialized) {
        const rng = new this();
        rng.setSeed(serialized.seed);
        rng.setMask(serialized.mask);
        rng.setMz(serialized.m_z);
        return rng;
    }
    seed(i) {
        super.seed(i);
        this.#m_z = 987654321;
        return this;
    }
    _next() {
        this.#m_z = (36969 * (this.#m_z & 65535) + (this.#m_z >> 16)) & this.#mask;
        this.setSeed((18000 * (this.getSeed() & 65535) + (this.getSeed() >> 16)) & this.#mask);
        let result = ((this.#m_z << 16) + this.getSeed()) & this.#mask;
        result /= 4294967296;
        return result + 0.5;
    }
}
/* harmony default export */ const src_rng = (Rng);


/***/ }),

/***/ 784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LootTable)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _table_pool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(425);
/* harmony import */ var _table_pool_entry_results__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(219);
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(673);




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
        this.rng = rng ?? (ul ? ul.getRng() : new _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay());
        this.id = id ?? this.rng.randomString(6);
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
        return this.fn ?? this.id ?? this.name;
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
            pool.rollSync({ rng: rngToUse, table: this, looter, context, result });
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
            await pool.roll({ rng: rngToUse, table: this, looter, context, result });
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
            const rollsMax = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.chancyMax(pool.rolls);
            const rollsMin = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.chancyMin(pool.rolls);
            const nullsMin = _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.chancyMin(pool.nulls);
            for (const entry of pool.getEntries()) {
                if (entry instanceof LootTable || entry.isTable()) {
                    let table;
                    let weight = 1;
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
                        min: nullsMin > 0 ? 0 : (rollsMin * _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.chancyMin(entry.qty)),
                        max: rollsMax * _rng__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.chancyMax(entry.qty),
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
            return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.args });
        }
    }
    /**
     * @param conditionDefinition
     * @param context
     */
    async applyCondition(conditionDefinition, { rng, looter, context, result }) {
        if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
            for (const subtable of Array.from(this.borrowed)) {
                if (subtable.hasCondition(conditionDefinition)) {
                    return await subtable.applyCondition(conditionDefinition, { rng, looter, context, result });
                }
            }
            const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
            if (this.ultraloot) {
                if (this.ultraloot.hasCondition(conditionDefinition.function)) {
                    return await this.ultraloot.applyCondition(conditionDefinition, { rng, looter, context, result });
                }
                if (this.ultraloot.throwOnMissingConditions) {
                    throw new Error(err);
                }
                else {
                    console.error(`CR: ${err}`);
                    return true;
                }
            }
            else {
                console.error(`CR: ${err}`);
                return true;
            }
        }
        return await this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: conditionDefinition.args });
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
            return this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: functionDefinition.args });
        }
    }
    /**
     * @param conditionDefinition
     * @param context
     */
    applyConditionSync(conditionDefinition, { rng, looter, context, result }) {
        if (typeof this.conditions[conditionDefinition.function] === 'undefined') {
            for (const subtable of Array.from(this.borrowed)) {
                if (subtable.hasCondition(conditionDefinition)) {
                    return subtable.applyConditionSync(conditionDefinition, { rng, looter, context, result });
                }
            }
            const err = `Condition ${conditionDefinition.function} has not been defined. Did you forget to register the function with this loot table? table.registerCondition(name, condition_function).`;
            if (this.ultraloot) {
                if (this.ultraloot.hasCondition(conditionDefinition.function)) {
                    return this.ultraloot.applyConditionSync(conditionDefinition, { rng, looter, context, result });
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
        const conditionCallResult = this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: conditionDefinition.args });
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
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(673);






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
    constructor({ name, id, conditions = [], functions = [], rolls = 1, nulls = 0, entries = [], template = {}, } = {}) {
        this.name = name;
        this.conditions = conditions ?? [];
        this.functions = functions ?? [];
        this.rolls = rolls;
        this.nulls = nulls;
        this.id = id ?? (new _rng__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay()).randomString(6);
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
    async roll({ rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
        const numRolls = rng.chancyInt(this.rolls);
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.gc(`Pool ${this.description} | Rolling pool ${numRolls} times (from chancy(${JSON.stringify(this.rolls)}))`);
        // We store a list of key/value choices with their weights in an array
        const choices = {};
        // A special NULL key to track null results
        if (rng.chancy(this.nulls) > 0) {
            choices[LootPool.NULLKEY] = rng.chancy(this.nulls);
        }
        // map the weights to positions in entries.
        for (const idx in this.entries) {
            const entry = this.entries[idx];
            if (entry instanceof _table__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A) {
                choices[idx] = 1;
            }
            else {
                const r = await entry.applyConditions({ rng, table, looter, context, result });
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv(`Pool ${this.description} | Result of calling await a.applyConditions was ${JSON.stringify(r)}`);
                if (r) {
                    choices[idx] = rng.chancy(entry.weight ?? 1);
                }
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv(`Pool ${this.description} | Choices:`, choices);
        const overallIntermediate = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = await table.applyCondition(cond, { rng, looter, context, result });
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add) {
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
        }
        else {
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Skipping because of conditions`);
        }
        // Then we process all the results
        await this.processEntryResults(overallIntermediate, { rng, table, looter, context, result });
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.ge();
        return result;
    }
    rollSync({ rng, table, looter, context, result = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A() }) {
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
                if (a.applyConditionsSync({ rng, table, looter, context, result })) {
                    choices[i] = rng.chancy(a.weight ?? 1);
                }
            }
        });
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.vv(`Pool ${this.description} | Choices:`, choices);
        const overallIntermediate = new _pool_entry_results__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A();
        let add = true;
        for (const cond of this.conditions) {
            const conditionResult = table.applyConditionSync(cond, { rng, looter, context, result });
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Testing function "${cond.function}" resulted in ${JSON.stringify(conditionResult)}`);
            add = add && conditionResult;
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Function "${cond.function}" stopped this from being added`);
                break;
            }
        }
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | After applying conditions, add was ${JSON.stringify(add)}`);
        if (add) {
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
        }
        else {
            _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.v(`Pool ${this.description} | Skipping because of conditions`);
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
        if (looted.qty > 0) {
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
        if (looted.qty > 0) {
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
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(673);
/* harmony import */ var _entry_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(668);
/* harmony import */ var _entry_results__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(219);





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
    rng;
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
    getRng(rng) {
        return rng ?? this.rng ?? (this.rng = new _rng__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay());
    }
    setRng(rng) {
        this.rng = rng;
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
        return new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A([new _entry_result__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A(def)]);
    }
    async applyConditions({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(), }) {
        let add = true;
        for (const cond of this.conditions) {
            add = add && await table.applyCondition(cond, { rng: this.getRng(rng), looter, context, result });
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Condition "${cond.function}" stopped this from being added`);
                break;
            }
        }
        return add;
    }
    async roll({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(), }) {
        if (this.isTable()) {
            return await this.rollTable({ rng: this.getRng(rng), table, looter, context, result });
        }
        else {
            return await this.rollItem({ rng: this.getRng(rng), table, looter, context, result });
        }
    }
    async rollItem({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        await this.processEntryResults(this.generateBaseResults(this.getRng(rng)), { rng: this.getRng(rng), table, looter, context, result });
        return result;
    }
    async rollTable({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = await this.getItem().borrow(table).roll({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        await this.processEntryResults(entryResults, { rng: this.getRng(rng), table, looter, context, result });
        return result;
    }
    async processEntryResults(entryResults, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        for (const entryResult of entryResults) {
            await this.processEntryResult(entryResult, { rng: this.getRng(rng), table, looter, context, result });
        }
        return entryResults;
    }
    async processEntryResult(entryResult, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            await table.applyFunction(fn, { rng: this.getRng(rng), looted: entryResult, looter, context, result });
        }
        if (entryResult.qty > 0) {
            if (entryResult.stackable) {
                result.push(entryResult);
            }
            else {
                for (let i = 0; i < entryResult.qty; i++) {
                    result.push(new _entry_result__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({ ...entryResult, ...{ qty: 1 } }));
                }
            }
        }
    }
    applyConditionsSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(), }) {
        let add = true;
        for (const cond of this.conditions) {
            add = add && table.applyConditionSync(cond, { rng: this.getRng(rng), looter, context, result });
            if (!add) {
                _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Condition "${cond.function}" stopped this from being added`);
                break;
            }
        }
        return add;
    }
    rollSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A(), }) {
        if (this.isTable()) {
            return this.rollTableSync({ rng: this.getRng(rng), table, looter, context, result });
        }
        else {
            return this.rollItemSync({ rng: this.getRng(rng), table, looter, context, result });
        }
    }
    rollItemSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        _log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.d(`Entry: ${this.description} | Rolling Item for ${this.id}`, { looter, context });
        this.processEntryResultsSync(this.generateBaseResults(this.getRng(rng)), { rng: this.getRng(rng), table, looter, context, result });
        return result;
    }
    rollTableSync({ rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        // log.d(`Entry: ${this.description} | Rolling Table for ${this.id}`, {looter, context});
        const entryResults = this.getItem().borrow(table).rollSync({ looter, context, result: [], rng, n: this.qty });
        this.getItem().unborrow(table);
        this.processEntryResultsSync(entryResults, { rng: this.getRng(rng), table, looter, context, result });
        return result;
    }
    processEntryResultsSync(entryResults, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        for (const entryResult of entryResults) {
            this.processEntryResultSync(entryResult, { rng: this.getRng(rng), table, looter, context, result });
        }
        return entryResults;
    }
    processEntryResultSync(looted, { rng, table, looter, context, result = new _entry_results__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A() }) {
        for (const fn of this.functions) {
            table.applyFunctionSync(fn, { rng: this.getRng(rng), looted, looter, context, result });
        }
        if (looted.qty > 0) {
            if (looted.stackable || looted.qty === 1) {
                result.push(looted);
            }
            else {
                for (let i = 0; i < looted.qty; i++) {
                    result.push(new _entry_result__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A({ ...looted, ...{ qty: 1 } }));
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
    qty = 1;
    constructor({ id, stackable = true, name, item, qty = 1 } = {}) {
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
/* harmony export */   Bc: () => (/* binding */ RecursiveTableError),
/* harmony export */   tZ: () => (/* binding */ UltraLoot)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(334);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(784);
/* harmony import */ var _table_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(425);
/* harmony import */ var _table_pool_entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50);
/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(673);
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
    static version = _package_json__WEBPACK_IMPORTED_MODULE_5__/* .version */ .rE;
    version = _package_json__WEBPACK_IMPORTED_MODULE_5__/* .version */ .rE;
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
    makeRng(rng) {
        if (this.isRng(rng)) {
            return rng;
        }
        const RngConstructor = this.rngConstructor ?? _rng__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay;
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
            return this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.args ?? {}, functionDefinition.arguments ?? {}) });
        }
    }
    applyConditionSync(conditionDefinition, { rng, looter, context, result }) {
        if (this.conditionCheck(conditionDefinition)) {
            const conditionCallResult = this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: Object.assign({}, conditionDefinition.args ?? {}, conditionDefinition.arguments ?? {}) });
            if (conditionCallResult instanceof Promise) {
                throw new Error('Cannot return promise from sync condition call');
            }
            return conditionCallResult;
        }
        return true;
    }
    async applyFunction(functionDefinition, { rng, looted, looter, context, result }) {
        if (this.functionCheck(functionDefinition)) {
            return await this.functions[functionDefinition.function]({ rng, looted, looter, context, result, args: Object.assign({}, functionDefinition.args ?? {}, functionDefinition.arguments ?? {}) });
        }
    }
    async applyCondition(conditionDefinition, { rng, looter, context, result }) {
        if (this.conditionCheck(conditionDefinition)) {
            return await this.conditions[conditionDefinition.function]({ rng, looter, context, result, args: Object.assign({}, conditionDefinition.args ?? {}, conditionDefinition.arguments ?? {}) });
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
        result.pools = [];
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
        if (str.length === 0) {
            return extension;
        }
        const lastPart = str.split('/').pop();
        const last = lastPart.split('\\').pop();
        const pos = last.includes('.') ? last.lastIndexOf('.') : last.length;
        const fileRoot = str.substring(0, (str.length - last.length) + pos);
        const output = `${fileRoot}.${extension.replace('.', '')}`;
        return output;
    }
    getExtension(str) {
        if (str.length === 0) {
            return null;
        }
        const lastPart = str.split('/').pop();
        const last = lastPart.split('\\').pop();
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
    serialize(table, { includeRng = false, key, had = new Set() } = {}) {
        const result = {};
        const clone = {
            name: table.name,
            id: table.id,
            fn: table.fn,
            pools: []
        };
        clone.pools = [];
        const keyToUse = table.filename ?? this.getRng().randomString(6);
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
                    const subKeyToUse = entryClone.item.filename ?? this.getRng().randomString(6);
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
        if (!(key in parent) || parent[key] == null) {
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

module.exports = {"rE":"0.3.0"};

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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ArrayNumberValidator: () => (/* reexport */ number/* ArrayNumberValidator */.Bh),
  LootTable: () => (/* reexport */ src_table/* default */.A),
  LootTableEntry: () => (/* reexport */ entry/* default */.A),
  LootTableEntryResult: () => (/* reexport */ result/* default */.A),
  LootTableEntryResults: () => (/* reexport */ results/* default */.A),
  LootTableManager: () => (/* reexport */ LootTableManager),
  LootTablePool: () => (/* reexport */ pool/* default */.A),
  MaxRecursionsError: () => (/* reexport */ rng/* MaxRecursionsError */.YG),
  NonRandomRandomError: () => (/* reexport */ rng/* NonRandomRandomError */.Qs),
  NumberValidationError: () => (/* reexport */ number/* NumberValidationError */.X),
  NumberValidator: () => (/* reexport */ number/* NumberValidator */.Ol),
  PredictableRng: () => (/* reexport */ PredictableRng),
  RecursiveTableError: () => (/* reexport */ ultraloot/* RecursiveTableError */.Bc),
  Rng: () => (/* reexport */ rng/* default */.Ay),
  RngAbstract: () => (/* reexport */ rng/* RngAbstract */.Up),
  UltraLoot: () => (/* reexport */ ultraloot/* UltraLoot */.tZ),
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: ./src/ultraloot.ts
var ultraloot = __webpack_require__(224);
// EXTERNAL MODULE: ./src/number.ts
var number = __webpack_require__(623);
// EXTERNAL MODULE: ./src/rng.ts + 2 modules
var rng = __webpack_require__(673);
;// ./src/rng/predictable.ts

/**
 *
 * An Rng type that can be used to give predictable results
 * for testing purposes, and giving known results.
 *
 * You can set an array of results that will be returned from called to _next()
 *
 * Note: To avoid unexpected results when using this in place of regular Rng, it is
 * only allowed to make the results spread from [0, 1)
 *
 * The numbers are returned and cycled, so once you reach the end of the list, it will
 * just keep on going.
 *
 * @category Other Rngs
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0];
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 * prng.random(); // 0.0
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0, 0.5];
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 * prng.random(); // 0.0
 * prng.random(); // 0.5
 *
 * @example
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.0
 *
 * @example
 * // The setEvenSpread and evenSpread methods can be used to generate
 * // n numbers between [0, 1) with even gaps between
 * const prng = new PredictableRng();
 * prng.results = [0.0, 0.1, 0.2, 0.3, 0.4];
 * prng.setEvenSpread(11);
 * prng.random(); // 0.0
 * prng.random(); // 0.1
 * prng.random(); // 0.2
 * prng.random(); // 0.3
 * prng.random(); // 0.4
 * prng.random(); // 0.5
 * prng.random(); // 0.6
 * prng.random(); // 0.7
 * prng.random(); // 0.8
 * prng.random(); // 0.9
 * prng.random(); // 0.9999999...
 * prng.random(); // 0.0
 */
class PredictableRng extends rng/* RngAbstract */.Up {
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
        if (other instanceof PredictableRng) {
            return this.results.join(',') === other.results.join(',') &&
                this.counter === other.counter &&
                this.getRandomSource() === other.getRandomSource();
        }
        return false;
    }
    reset() {
        this.counter = 0;
        return this;
    }
    _next() {
        return this.results[this.counter++ % this.results.length];
    }
}

// EXTERNAL MODULE: ./src/table.ts
var src_table = __webpack_require__(784);
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
        if (typeof name === 'string' && typeof table !== 'undefined' && table instanceof src_table/* default */.A) {
            this.tables[name] = table;
        }
        else if (typeof table === 'string' && name instanceof src_table/* default */.A) {
            this.tables[table] = name;
        }
        else if (name instanceof src_table/* default */.A) {
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
// EXTERNAL MODULE: ./src/table/pool/entry/result.ts
var result = __webpack_require__(668);
;// ./src/index.ts





















// This provides an easy way of using ultraloot in browser.
// It can be instantiated by new UltraLoot() and submodules can be
// instantiated by new UltraLoot.LootTable() and whatnot.
/* harmony default export */ const src = (ultraloot/* UltraLoot */.tZ);

/******/ 	return __webpack_exports__;
/******/ })()
;
});