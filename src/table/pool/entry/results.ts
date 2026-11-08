import LootTableEntryResult from './result';

export default class LootTableEntryResults<Item = any> extends Array<LootTableEntryResult<Item>> {
  constructor (documents?: Array<LootTableEntryResult<Item>> | number) {
    if (documents instanceof Array) super(...documents);
    else if (documents) super(documents);
    else super();
  }

  merge (other: LootTableEntryResults<Item>) {
    for (const entry of other) {
      this.push(entry);
    }
    return this;
  }

  merged (other: LootTableEntryResults<Item>) {
    return new LootTableEntryResults<Item>([...this, ...other]);
  }

  protected entrySignature (entry: LootTableEntryResult<Item>) {
    const entryWithoutQty: Record<string, any> = {};
    for (const [k, v] of Object.entries(entry)) {
      if (k !== 'qty') {
        entryWithoutQty[k] = v;
      }
    }
    return JSON.stringify(entryWithoutQty);
  }

  collapsed () {
    const map: Record<string, LootTableEntryResult<Item>> = {};
    const other: LootTableEntryResult<Item>[] = [];
    for (const ob of this) {
      if (ob.stackable) {
        const sig = this.entrySignature(ob);
        if (typeof map[sig] === 'undefined') {
          map[sig] = Object.assign(Object.create(Object.getPrototypeOf(ob)), ob);
        } else {
          map[sig].addQty(ob.qty);
        }
      } else {
        other.push(Object.assign(Object.create(Object.getPrototypeOf(ob)), ob));
      }
    }
    return new LootTableEntryResults<Item>([...other, ...Object.values(map)]);
  }
}
