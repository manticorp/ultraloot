export * from './ultraloot';
export * from './rng';
export * from './rng/predictable';
export * from './table';
export * from './table/manager';
export * from './table/pool';
export * from './table/pool/entry';
export * from './table/pool/entry/result';
export * from './table/pool/entry/results';

import { UltraLoot } from './ultraloot';
export { UltraLoot as UltraLoot};
export { default as Rng } from './rng';
export { default as PredictableRng } from './rng/predictable';
export { default as LootTable } from './table';
export { default as LootTableManager } from './table/manager';
export { default as LootTablePool } from './table/pool';
export { default as LootTableEntry } from './table/pool/entry';
export { default as LootTableEntryResult } from './table/pool/entry/result';
export { default as LootTableEntryResults } from './table/pool/entry/results';

// This provides an easy way of using ultraloot in browser.
// It can be instantiated by new UltraLoot() and submodules can be
// instantiated by new UltraLoot.LootTable() and whatnot.
export default UltraLoot;
