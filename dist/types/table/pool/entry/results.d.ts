import LootTableEntryResult from './result';
export default class LootTableEntryResults<Item = any> extends Array<LootTableEntryResult<Item>> {
    constructor(documents?: Array<LootTableEntryResult<Item>> | number);
    merge(other: LootTableEntryResults<Item>): this;
    merged(other: LootTableEntryResults<Item>): LootTableEntryResults<Item>;
    protected entrySignature(entry: LootTableEntryResult<Item>): string;
    collapsed(): LootTableEntryResults<Item>;
}
