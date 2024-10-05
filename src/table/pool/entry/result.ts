export default class LootTableEntryResult {
  id?: number | string;
  stackable: boolean = true;
  name?: string;
  item?: any;
  qty?: number;
  constructor ({
    id,
    stackable = true,
    name,
    item,
    qty
  }: {
    id?: number | string,
    stackable?: boolean,
    name?: string,
    item?: any,
    qty?: number,
  } = {}) {
    this.id = id;
    this.name = name;
    this.item = item;
    this.qty = qty;
    this.stackable = stackable;
  }

  get description () {
    return this.describe();
  }

  describe () {
    if (this.name) {
      return `${this.name} [${this.id}]`;
    }
    return `[${this.id}]`;
  }

  getQty () {
    return this.qty;
  }

  setQty (n: number) {
    this.qty = n;
  }

  addQty (n: number) {
    this.qty = this.qty + n;
  }
}
