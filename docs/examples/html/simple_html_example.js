// First we create an ultraloot instance.
const ul = new UltraLoot();

// We want to use the built in default functions, so we enable them here
ul.registerDefaults();


// Then, once the page is loaded...
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Mining Demo.js');

  // First, we want to create our loot table structure. Our final table is
  // going to be made from 3 sub tables: Stone, Metals, and Gems

  // Our first stones table is simple, it has one entry.
  // Each time you roll, you'll get a stone. Simple.
  // This uses the defaults for a lot of values (rolls = 1, nulls = 0, weight = 1, for example).
  const stones = {
    name: 'Stones',
    pools: [
      {
        id: "stones",
        entries: [
          {
            id: 'stone',
          }
        ]
      }
    ]
  };

  // We won't create a table from this spec yet - we can just include it later when we create
  // our final table.

  // Now, our precious metals table.
  // This table will be rolled 1 or 2 times, has no nulls, and
  // different weights per metal depending on their rarity.
  // On each entry, we also have a condition, 'dependLooter' - this
  // is a default condition function shipped with UltraLoot. You can
  // specify a property of the looter, and a min/max value (or an equals/has value).
  // If the looter doesn't meet that condition, then that entry won't be condsidered
  // for rolling.
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
            conditions: [
              {
                function: 'dependLooter',
                args: {
                  property: 'item-level',
                  min: 4
                }
              }
            ],
          },
          {
            name: 'Silver',
            id: 'silver',
            weight: 2,
            conditions: [
              {
                function: 'dependLooter',
                args: {
                  property: 'item-level',
                  min: 3
                }
              }
            ],
          },
          {
            name: 'Bronze',
            id: 'bronze',
            weight: 4,
            conditions: [
              {
                function: 'dependLooter',
                args: {
                  property: 'item-level',
                  min: 2
                }
              }
            ],
          }
        ]
      }
    ],
  };

  // Now we can turn the precious metals into a table.
  // We don't have to do this, we could just use the plain object above
  // when creating a final table - this is just to demnstrate the multiple
  // ways of doing it.
  const preciousMetalsTable = ul.createTable(pm);

  // We will re-use the following function across multiple entries,
  // so it can be useful to put it out into a variable of its own.
  const gemFns = [
    {
      function: 'debug'
    }
  ];

  // We will also re-use this 'diamond' entry across multiple tools, so again
  // it is helpful to have it in its own object.
  const diamond = {
    name: 'Diamond',
    id: 'diamond',
    weight: 1,
    functions: gemFns,
    conditions: [
      {
        function: 'dependLooter',
        args: {
          property: 'item-level',
          min: 5
        }
      }
    ]
  };

  // Now, our gem table. This consists of 2 pools - one just for diamond, and then
  // one for diamonds, rubies and sapphires.
  // The first pool, 'just_diamonds', has a condition so that it will only get rolled
  // if the looter has a minimium level of 5.
  //
  // This is just to illustrate creative ways of using pools, tables and entries
  // to give the desired results.
  const gems = {
    name: 'Gems',
    pools: [
      {
        id: 'just_diamonds',
        rolls: 2,
        functions: gemFns,
        conditions: [
          {
            function: 'dependLooter',
            args: {
              property: 'item-level',
              min: 5
            }
          }
        ],
        entries: [
          diamond
        ],
      },
      {
        id: 'all_gems',
        entries: [
          diamond,
          {
            name: 'Ruby',
            id: 'ruby',
            weight: 2,
            functions: gemFns,
            conditions: [
              {
                function: 'dependLooter',
                args: {
                  property: 'item-level',
                  min: 4
                }
              }
            ]
          },
          {
            name: 'Sapphire',
            id: 'sapphire',
            weight: 40,
            functions: gemFns,
            conditions: [
              {
                function: 'dependLooter',
                args: {
                  property: 'item-level',
                  min: 2
                }
              }
            ]
          }
        ]
      }
    ],
  };
  // Now we'll create that table as well.
  const gemsTable = ul.createTable(gems);

  // Next, we create our composite table.
  // As you can see, we'll do 5 rolls on the stones table, with 5 nulls.
  // So, every roll only has a 1 in 6 chance of including stone. Sometimes,
  // you'll get all 5 returning true, so you'll have 5 stone.
  //
  // Then, we also have a precious metal and gem roll.
  const treasureTable = ul.createTable({
    name: 'Treasure',
    pools: [
      {
        name: 'ST',
        rolls: 5,
        nulls: 5,
        entries: [
          stones
        ]
      },
      {
        name: 'PM',
        rolls: 1,
        entries: [
          preciousMetalsTable
        ]
      },
      {
        name: 'GEM',
        rolls: 1,
        entries: [
          gemsTable,
        ]
      }
    ],
  });

  // We need to register our dummy function from before.
  // Note: we will register with the UltraLoot instance because we
  // want to use this function in a second table as well.
  ul.registerFunction('debug', ({ rng, context, looter, looted, args }) => {
    // console.log({context, looter, looted, args});
  });

  // Here is another example of a function registered to just this table.
  treasureTable.registerFunction('setCountIfType', ({ rng, context, looted, args }) => {
    if (context && context.type === args[0]) {
      looted.setQty(rng.chancy(args[1]));
    }
  });

  // Log our treasure table to the console - feel free to inspect and play with the result.
  console.log('Treasure Table', treasureTable);

  // Here is an example of re-using the above tables to create a "rich ore" table.
  const richOreTable = ul.createTable({
    name: 'Treasure',
    pools: [
      {
        name: 'ST',
        rolls: 5,
        nulls: 10,
        entries: [
          stones
        ]
      },
      {
        name: 'PM',
        rolls: 2,
        entries: [
          preciousMetalsTable
        ]
      },
      {
        name: 'GEM',
        rolls: 2,
        entries: [
          gemsTable,
        ]
      }
    ],
  });


  // Where we will display our results.
  const miningResult = document.getElementById('mining-result');

  // Finally, when a button is pressed we will roll on the loot table.
  document.querySelectorAll('.mining-button').forEach(el => el.addEventListener('click', function () {
    // We use data-looter on the button to pass in the looter parameter
    treasureTable.roll({ looter: JSON.parse(this.dataset.looter) }).then(results => {
      if (results.length == 0) {
        miningResult.innerHTML = 'Nothing mined!';
      } else {
        miningResult.innerHTML = JSON.stringify(results.collapsed(), null, 2);
      }
    });
  }));

  // Finally, when a button is pressed we will roll on the loot table.
  document.querySelectorAll('.rich-mining-button').forEach(el => el.addEventListener('click', function () {
    // We use data-looter on the button to pass in the looter parameter
    richOreTable.roll({ looter: JSON.parse(this.dataset.looter) }).then(results => {
      if (results.length == 0) {
        miningResult.innerHTML = 'Nothing mined!';
      } else {
        miningResult.innerHTML = JSON.stringify(results.collapsed(), null, 2);
      }
    });
  }));
});
