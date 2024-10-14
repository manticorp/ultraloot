import LootTableEntryResult from './result';
export default class LootTableEntryResults extends Array<LootTableEntryResult> {
    constructor(documents?: Array<LootTableEntryResult> | number);
    merge(other: LootTableEntryResults): this;
    merged(other: LootTableEntryResults): LootTableEntryResults;
    protected entrySignature(entry: LootTableEntryResult): string;
    collapsed(): LootTableEntryResults;
}
