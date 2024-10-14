export default class LootTableEntryResult {
    id?: number | string;
    stackable: boolean;
    name?: string;
    item?: any;
    qty?: number;
    constructor({ id, stackable, name, item, qty }?: {
        id?: number | string;
        stackable?: boolean;
        name?: string;
        item?: any;
        qty?: number;
    });
    get description(): string;
    describe(): string;
    getQty(): number;
    setQty(n: number): void;
    addQty(n: number): void;
}
