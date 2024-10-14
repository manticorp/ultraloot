const ul = new UltraLoot();
ul.registerDefaults();

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Mining Demo.js');

  const stones = {
    name: 'Stones',
    pools: [
      {
        id: "stones",
        rolls: 1,
        nulls: 5,
        entries: [
          {
            id: 'stone',
            weight: 5
          }
        ]
      }
    ]
  };

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
                arguments: {
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
                arguments: {
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
                arguments: {
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
  const preciousMetalsTable = ul.createTable(pm);

  const gemFns = [
    {
      function: 'debug'
    }
  ];

  const diamond = {
    name: 'Diamond',
    id: 'diamond',
    weight: 1,
    functions: gemFns,
    conditions: [
      {
        function: 'dependLooter',
        arguments: {
          property: 'item-level',
          min: 5
        }
      }
    ]
  };

  const gems = {
    name: 'Gems',
    pools: [
      {
        rolls: 2,
        functions: gemFns,
        conditions: [
          {
            function: 'dependLooter',
            arguments: {
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
                arguments: {
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
                arguments: {
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
  const gemsTable = ul.createTable(gems);

  // Composite table
  const treasureTable = ul.createTable({
    name: 'Treasure',
    pools: [
      {
        name: 'ST',
        rolls: 5,
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

  treasureTable.registerFunction('debug', ({ rng, context, looter, looted, args }) => {
    // console.log({context, looter, looted, args});
  });

  treasureTable.registerFunction('setCountIfType', ({ rng, context, looted, args }) => {
    if (context && context.type === args[0]) {
      looted.setQty(rng.chancy(args[1]));
    }
  });

  console.log('Treasure Table', treasureTable);

  const miningResult = document.getElementById('mining-result');

  document.querySelectorAll('.mining-button').forEach(el => el.addEventListener('click', function () {
    treasureTable.roll({ looter: JSON.parse(this.dataset.looter) }).then(results => {
      miningResult.innerHTML = JSON.stringify(results.collapsed(), null, 2);
    });
  }));
});
