import assert from 'assert';
import pkg from './dist/index.js';

const { UltraLoot, LootTable, LootTablePool, LootTableEntry } = pkg;

const ul = new UltraLoot();

const table = ul.createTable({
  id: 'test',
  pools: [
    {
      entries: [{
        id: 'test_entry'
      }]
    }
  ]
});
const result = table.rollSync({ n: 1 });
assert.equal(result[0].id, 'test_entry');

const table2 = new LootTable({ id: 'test' });
assert.equal(table2.id, 'test');

const genericTable = new LootTable({
  ul,
  pools: [
    new LootTablePool({
      entries: [
        new LootTableEntry({
          id: 'test_ABCDEF'
        })
      ]
    })
  ]
});

const result2 = genericTable.rollSync({ n: 1 });
assert.equal(result2[0].id, 'test_ABCDEF');
