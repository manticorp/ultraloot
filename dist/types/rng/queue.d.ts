export default class Dequeue<T> {
    size: number;
    elements: T[];
    constructor(length?: T[] | number);
    get length(): number;
    push(el: T): T | undefined;
    pop(): T | undefined;
    full(): boolean;
    empty(): void;
    get(i: number): T;
    allSame(): boolean;
}
export declare class NumberQueue extends Dequeue<number> {
    sum(): number;
    avg(): number;
}
export declare class NonRandomDetector<T> extends Dequeue<T> {
    minsequencelength: number;
    errormessage: string;
    constructor(length?: T[] | number, minsequencelength?: number);
    push(el: T): T | undefined;
    detectLoop(msg?: string): void;
    protected loopDetected(msg?: string): void;
    /**
     * Checks if there is a repeating sequence longer than a specified length in an array of numbers.
     *
     * @param {number[]} arr - The array of numbers.
     * @param {number} n - The minimum length of the repeating sequence.
     * @returns {boolean} True if a repeating sequence longer than length n is found, otherwise false.
     */
    hasRepeatingSequence(arr: T[], n: number): boolean;
}
