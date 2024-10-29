/**
 * @category Number Validator
 */
export declare class NumberValidationError extends Error {
}
/**
 * @category Number Validator
 */
export declare class ArrayNumberValidator {
    #private;
    /**
     * Descriptive name for this validation
     */
    name: string;
    constructor(numbers: number[], name?: string);
    get numbers(): number[];
    set numbers(numbers: number[]);
    /**
     * Specify the numbers to validate
     */
    all(numbers: number[]): this;
    /**
     * Specify the numbers to validate
     */
    validate(numbers: number | number[]): this | NumberValidator;
    /**
     * Pass a string decribing the varname to this to make the error messages
     * make more sense in your context.
     *
     * @example
     *
     * const potatoes = [0, 1];
     * validate(potatoes).varname('potatoes').gt(2); // "Expected every component of potatoes to be > 2, got 0"
     */
    varname(name: string): this;
    /**
     * Get the sum of our numbers
     */
    sum(): number;
    /**
     * Validates whether the total of all of our numbers is close to sum, with a maximum difference of diff
     * @param sum The sum
     * @param diff The maximum difference
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not sum close to the correct amount
     */
    sumcloseto(sum: number, diff?: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is equal (===) to sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to the correct amount
     */
    sumto(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is < sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to < sum
     */
    sumtolt(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is > sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to > sum
     */
    sumtogt(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is <= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to <= sum
     */
    sumtolteq(sum: number, msg?: string): this;
    /**
     * Validates whether the total of all of our numbers is >= sum
     * @param sum The sum
     * @param msg Error message
     * @throws {@link NumberValidationError} If they do not total to >= sum
     */
    sumtogteq(sum: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all integers
     */
    int(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all positive
     */
    positive(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all negative
     */
    negative(msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all between from and to
     */
    between(from: number, to: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all between or equal to from and to
     */
    betweenEq(from: number, to: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all > n
     */
    gt(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all >= n
     */
    gteq(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all < n
     */
    lt(n: number, msg?: string): this;
    /**
     * @throws {@link NumberValidationError} if numbers are not all <= n
     */
    lteq(n: number, msg?: string): this;
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
export declare class NumberValidator {
    #private;
    /**
     * The name of the variable being validated - shows up in error messages.
     */
    name: string;
    constructor(number?: number, name?: string);
    get number(): number | undefined;
    set number(number: number | undefined);
    /**
     * Returns an ArrayNumberValidator for all the numbers
     */
    all(numbers: number[], name?: string): ArrayNumberValidator;
    assertNumber(num?: number): num is number;
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
    varname(name: string): this;
    /**
     * Specify the number to be validated
     */
    validate(number: number | number[]): ArrayNumberValidator | this;
    /**
     * Asserts that the number is an integer
     * @throws {@link NumberValidationError} if ths number is not an integer
     */
    int(msg?: string): this;
    /**
     * Asserts that the number is > 0
     * @throws {@link NumberValidationError} if the number is not positive
     */
    positive(msg?: string): this;
    /**
     * Asserts that the number is < 0
     * @throws {@link NumberValidationError} if the number is not negative
     */
    negative(msg?: string): this;
    /**
     * Asserts that the from < number < to
     * @throws {@link NumberValidationError} if it is outside or equal to those bounds
     */
    between(from: number, to: number, msg?: string): this;
    /**
     * Asserts that the from <= number <= to
     * @throws {@link NumberValidationError} if it is outside those bounds
     */
    betweenEq(from: number, to: number, msg?: string): this;
    /**
     * Asserts that number > n
     * @throws {@link NumberValidationError} if it is less than or equal to n
     */
    gt(n: number, msg?: string): this;
    /**
     * Asserts that number >= n
     * @throws {@link NumberValidationError} if it is less than n
     */
    gteq(n: number, msg?: string): this;
    /**
     * Asserts that number < n
     * @throws {@link NumberValidationError} if it is greater than or equal to n
     */
    lt(n: number, msg?: string): this;
    /**
     * Asserts that number <= n
     * @throws {@link NumberValidationError} if it is greater than n
     */
    lteq(n: number, msg?: string): this;
}
/**
 * Validates a number or an array of numbers, with a fluent interface.
 *
 * If passed an array, it will return an ArrayNumberValidator
 *
 * If passed anything else, it will return a NumberValidator
 *
 * You can pass the things in as a one key object, and it will automatically
 * set the name for you.
 *
 * @category Number Validator
 *
 * @example
 * // Validate single numbers
 * validate(2).gt(1).lt(3); // doesn't throw
 * validate(3).gt(1).lt(3); // throws
 *
 * @example
 * // Validate in the object fashion so it automatically sets the name
 * let myVar = 5;
 * validate({ myVar }).gt(10); // throws `Expected myVar to be greater than 10, got 5`
 *
 * @example
 * // Also used with arrays of numbers
 * validate([1, 2, 3]).lt(10); // doesn't throw
 * validate([1, 2, 3]).sumto(6); // doesn't throw
 * validate([1, 2, 3, 4]).sumtolt(9); // throws
 *
 * @example
 * // All single number validations
 * validate(1).int();
 * validate(1).positive();
 * validate(-1).negative();
 * validate(1).between(0, 2);
 * validate(1).betweenEq(1, 2);
 * validate(1).gt(0);
 * validate(1).gteq(1);
 * validate(1).lt(2);
 * validate(1).lteq(1);
 *
 * @example
 * // All array of numbers validations
 * validate([1, 2, 3]).sumcloseto(6);
 * validate([1, 2, 3.0001]).sumcloseto(6, 0.001);
 * validate([1, 2, 3]).sumto(6);
 * validate([1, 2, 3]).sumtolt(7);
 * validate([1, 2, 3]).sumtogt(5);
 * validate([1, 2, 3]).sumtolteq(6);
 * validate([1, 2, 3]).sumtogteq(1);
 * validate([1, 2, 3]).int();
 * validate([1, 2, 3]).positive();
 * validate([-1, -2, -4]).negative();
 * validate([1, 2, 3]).between(0, 4);
 * validate([1, 2, 3]).betweenEq(1, 3);
 * validate([1, 2, 3]).gt(0);
 * validate([1, 2, 3]).gteq(1);
 * validate([1, 2, 3]).lt(4);
 * validate([1, 2, 3]).lteq(3);
 *
 * @see {@link NumberValidator}
 * @see {@link ArrayNumberValidator}
 * @param {number | number[]} number [description]
 */
declare function validate(number?: Record<string, number>): NumberValidator;
declare function validate(number?: Record<string, number[]>): ArrayNumberValidator;
declare function validate(number?: number): NumberValidator;
declare function validate(number?: number[]): ArrayNumberValidator;
export default validate;
