import { RngInterface } from './interface';
/**
 * @category Pool
 */
export declare class PoolEmptyError extends Error {
}
/**
 * @category Pool
 */
export declare class PoolNotEnoughElementsError extends Error {
}
/**
 * Allows for randomly drawing from a pool of entries without replacement
 * @category Pool
 */
export default class Pool<EntryType> {
    #private;
    rng: RngInterface;
    constructor(entries?: EntryType[], rng?: RngInterface);
    private copyArray;
    setEntries(entries: EntryType[]): this;
    getEntries(): EntryType[];
    set entries(entries: EntryType[]);
    get entries(): EntryType[];
    get length(): number;
    setRng(rng: RngInterface): this;
    getRng(): RngInterface;
    add(entry: EntryType): void;
    empty(): this;
    isEmpty(): boolean;
    /**
     * Draw an element from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     */
    draw(): EntryType;
    /**
     * Draw n elements from the pool, without replacement.
     *
     * @throws {@link PoolEmptyError} if the pool is empty
     * @throws {@link PoolNotEnoughElementsError} if the pool does not have enough elements to draw n values
     */
    drawMany(n: number): EntryType[];
}
