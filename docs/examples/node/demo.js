import pkg from './../../dist/index.js';

const { UltraLoot, LootTable, LootTablePool, LootTableEntry } = pkg;

const ul = new UltraLoot();
ul.registerDefaultFunctions();
ul.registerDefaultConditions();

ul.registerFunction('staleLevel', ({ rng, looted, args }) => {
  if (typeof looted.item !== 'undefined' && typeof looted.item.perishable !== 'undefined') {
    looted.item.perishable.condition = rng.chancy({ ...{ min: 0, max: 1, type: 'normal' }, ...args });
  }
});

ul.registerFunction('randomColor', ({ rng, looted, args = {} }) => {
  if (typeof looted.item !== 'undefined' && typeof looted.item.colorable !== 'undefined') {
    const choices = args.choices ?? ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    looted.item.colorable.color = rng.weightedChoice(choices);
  }
});

function pick (o, ...props) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}

const player = {
  level: 15
};

const tablePromises = [];
const path = 'examples/tables';

const genericTable = new LootTable({
  ul,
  pools: [
    new LootTablePool({
      entries: [
        new LootTableEntry({
          id: 'test'
        })
      ]
    })
  ]
});

tablePromises.push(ul.loadTable('armor_box', { path }));
tablePromises.push(ul.loadTable('clothing_store', { path }));
tablePromises.push(ul.loadTable('kitchen_cupboard', { path }));

Promise.all(tablePromises).then(([
  armorBox,
  clothingStore,
  kitchenCupboard,
]) => {
  const numRolls = 1;
  console.log(`Kitchen Cupboard results with a level ${player.level} player`, kitchenCupboard.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));

  console.log('Armor Box results with a level 10 player', armorBox.rollSync({ n: numRolls, looter: { level: 10 } }).map(a => a.id));
  console.log(`Armor Box results with a level ${player.level} player`, armorBox.rollSync({ n: numRolls, looter: player }).map(a => a.id));

  console.log(`Clothing store results with a level ${player.level} player`, clothingStore.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));

  console.log(`genericTable store results with num rolls ${numRolls}`, genericTable.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));
});
