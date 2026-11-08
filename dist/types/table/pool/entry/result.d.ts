export default class LootTableEntryResult<Item = any> {
    id?: number | string;
    stackable: boolean;
    name?: string;
    item?: Item;
    qty: number;
    constructor({ id, stackable, name, item, qty }?: {
        id?: number | string;
        stackable?: boolean;
        name?: string;
        item?: Item;
        qty?: number;
    });
    get description(): string;
    describe(): string;
    getQty(): number;
    setQty(n: number): void;
    addQty(n: number): void;
}
