const ul = new UltraLoot();
ul.registerDefaults();

document.addEventListener('DOMContentLoaded', async () => {
  console.log('demo.js');

  const pm = {
    name: 'Precious Metals',
    pools: [
      {
        rolls: {
          min: 1,
          max: 2,
        },
        nulls: 0,
        entries: [
          {
            name: 'Gold',
            id: 'gold',
            weight: 1,
          },
          {
            name: 'Silver',
            id: 'silver',
            weight: 2,
          },
          {
            name: 'Bronze',
            id: 'bronze',
            weight: 4,
          }
        ]
      }
    ],
  };
  const preciousMetalsTable = ul.createTable(pm);

  const gemFns = [
    {
      function: 'setCountIfType',
      arguments: [
        'earth',
        {
          max: 5,
          min: 2,
          type: 'integer',
        }
      ]
    },
  ];

  const gems = {
    name: 'Gems',
    pools: [
      {
        rolls: 1,
        nulls: 0,
        entries: [
          {
            name: 'Diamond',
            id: 'diamond',
            stackable: false,
            weight: 1,
            functions: gemFns,
          },
          {
            name: 'Ruby',
            id: 'ruby',
            weight: 2,
            functions: gemFns,
          },
          {
            name: 'Sapphire',
            id: 'sapphire',
            weight: 40,
            functions: gemFns,
            conditions: [
              {
                function: 'dependContext',
                arguments: {
                  property: 'type',
                  tobe: 'water'
                }
              }
            ]
          }
        ]
      }
    ],
  };
  const gemsTable = ul.createTable(gems);

  // Composite table
  const treasureTable = ul.createTable({
    name: 'Treasure',
    pools: [
      {
        name: 'PM',
        rolls: 1,
        nulls: 0,
        entries: [
          preciousMetalsTable
        ]
      },
      {
        name: 'GEM',
        rolls: 10,
        nulls: 0,
        entries: [
          gemsTable,
        ]
      }
    ],
  });

  treasureTable.registerFunction('setCountIfType', ({ rng, context, looted, args }) => {
    if (context && context.type === args[0]) {
      looted.setQty(rng.chancy(args[1]));
    }
  });

  const miningButton = document.getElementById('mining-button');
  const miningResult = document.getElementById('mining-result');

  miningButton.addEventListener('click', () => {
    treasureTable.roll({context: this}).then(results => {
      miningResult.innerHTML = JSON.stringify(results.collapsed(), null, 2);
    });
  });

  // // Loading from JSON file

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

  ul.loadTable('kitchen_cupboard', { path: './../tables' }).then(kitchenCupboard => {
    kitchenCupboard.roll({ n: 100 }).then(jsonRolls => {
      console.table(jsonRolls.collapsed());
    });
  });

  const kc = await ul.loadTable('kitchen_cupboard', { path: './../tables' });
});