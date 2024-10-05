import UltraLoot from './../src/ultraloot';

const ul = new UltraLoot();
ul.registerDefaultConditions();
ul.registerDefaultFunctions();

ul.registerFunction('staleLevel', ({ rng, looted, args }) => {
  if (typeof looted.item !== 'undefined' && typeof looted.item.perishable !== 'undefined') {
    looted.item.perishable.condition = rng.chancy({ ...{ min: 0, max: 1, type: 'normal' }, ...args });
  }
});

ul.registerFunction('randomColor', ({ rng, looted, args = {} }) => {
  if (typeof looted.item !== 'undefined' && typeof looted.item.colorable !== 'undefined') {
    const choices : Array<any> = args.choices ?? ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    looted.item.colorable.color = rng.weightedChoice(choices);
  }
});

function pick (o : Record<string, any>, ...props : string[]) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}

const player = {
  level: 15
};

const tablePromises = [];

tablePromises.push(ul.loadTable('js_test.js', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('armor_box', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('clothing_store', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('kitchen_cupboard', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('mining', { path: 'examples/tables' }));
tablePromises.push(ul.loadTable('mining/gems', { path: 'examples/tables' }));

Promise.all(tablePromises).then(([
  jsTest,
  armorBox,
  clothingStore,
  kitchenCupboard,
  mining,
  gems
]) => {
  const numRolls = 1;
  console.log(`jsTest results with a level ${player.level} player`, jsTest.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));

  console.log(`Kitchen Cupboard results with a level ${player.level} player`, kitchenCupboard.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));

  console.log('Armor Box results with a level 10 player', armorBox.rollSync({ n: numRolls, looter: { level: 10 } }).map(a => a.id));
  console.log(`Armor Box results with a level ${player.level} player`, armorBox.rollSync({ n: numRolls, looter: player }).map(a => a.id));

  console.log(`Clothing store results with a level ${player.level} player`, clothingStore.rollSync({ n: numRolls, looter: player }).map(a => pick(a, 'id', 'item')));
});
