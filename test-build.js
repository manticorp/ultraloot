const assert = require('assert');
const UltraLoot = require('./dist/ultraloot.js');

const ultraloot = new UltraLoot();

const table = ultraloot.createTable({
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
