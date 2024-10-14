# UltraLoot

An easy to use, extendable, serialisable loot table module

✅ Use in browser  
✅ Use in node project

✅ Plug and play  
✅ Tables can be stored as JSON file(s)  
✅ Flexible inheritance structure - great for large games  
✅ Seedable random number generator  
✅ Testable (RNG is injectable for predictable results)  
✅ Pluggable Functions and Conditions  
✅ Looter / Container context functions - allows you to modify loot depending on who looted from where

🏎️ Fast  
📝 Written in typescript  
📈 Jest unit tests with high coverage  
📫 Sync and Async versions (async default, to allow for async conditions/functions)  
🏠 Many examples


* [Advanced Docs](https://manticorp.github.io/ultraloot)
* [Code Docs](https://manticorp.github.io/ultraloot/code/)

## Installation

Run ```npm install @manticorp/ultraloot``` or include the dist file in browser.

### Browser

Download release and include ultraloot in browser:

```html
<script src="dist/ultraloot.js"></script>
<script>
const ul = new UltraLoot();
</script>
```

### Node

```javascript
const { UltraLoot } = require('@manticorp/ultraLoot');
```

### ES Module

```javascript
import UltraLoot from '@manticorp/ultraLoot';
```

## Use cases

✅ Loot boxes  
✅ Mob drops  
✅ Random events  
✅ Mob spawning  
✅ Quest rewards  
✅ And more!

## Preface

The aim of this module is to provide a highly flexible loot table implementation that allows for inheritance and modifying results based on context (e.g. the looter, where the loot is coming from, and the other results of rolling the table).

Imagine you're building a mining game.

The loot generated depends on what tool the player was mining with. If they mine with a **stone** axe, they can only mine **stone**. If they mine with a **diamond** axe, they might get **diamonds**.

```javascript
// Prep the tables
const ul = new UltraLoot();
const miningTable = ul.loadTable('mining');

// Looters in your app
const weakLooter = new Player().equip({id: 'axe', level: 'stone'});
const strongLooter = new Player().equip({id: 'axe', level: 'diamond'});

// Do some mining/rolling
miningTable.roll({looter: weakLooter}).then(results => weakLooter.addInventory(results));
// [{id: 'stone', qty: 1}]

miningTable.roll({looter: strongLooter}).then(results => strongLooter.addInventory(results));
// [{id: 'stone', qty: 3}, {id: 'ruby', qty: 2}, {id: 'diamond', qty: 1}]
```

The way the tables are structured allows for easy inheritence and storage in JSON files as well, with a default loading mechanism already in place.


## Structure

There is a hierarchy:

* **Loot Tables** contain multiple **Pools**
* **Pools** contain multiple **Entries**
* Each **Entry** can in turn be another **Loot Table**, or a plain **Item**

Items marked **```Chancy```** have a special meaning.

Here is a full table definition for illustration, although please view type information for [LootTableEasyDefinition](https://manticorp.github.io/ultraloot/code/types/index.LootTableEasyDefinition.html) for more information:

```javascript
const tableDefinition = {
  name: 'Table Name',  // optional - for your convenience, not required
  id: 'table_id',      // optional - for your convenience, not required
  fn: 'filename',      // optional - used to let ul know what the filename for this table is -
                       //            used in un/serialization and loading/saving
  rng: RngInterface,   // optional - RNG to be used by this loot table
  ul: ul,       // optional - ul instance - only needed when creating loot tables
                       //            directly via new LootTable() and not ul.createTable().
                       //            This allows inheritance of functions and conditions
  pools: [{
    name: 'Pool Name', // optional - for your convenience, not required
    id: 'pool_id',     // optional - for your convenience, not required
    rolls: 1,          // optional - Chancy - default 1 - number of rolls this pool gets when the table is rolled once
    nulls: 0,          // optional - Chancy - default 0 - alongside entries, null result will appear with this weight.
    conditions: [      // optional - an array of conditions that should be called when this pool is rolled.
                       //            If any condition returns false, no result is returned for that pool (all rolls).
      {
        function: 'condition_name', // required - the name of the condition
        arguments: {                // optional - arguments passed to the "args" named parameter of the function.
          foo: 'bar'                //            This can be anything you like.
        }
      }
    ],
    functions: [       // optional - functions that are applied to every entry result.
      {
        function: 'function_name', // required - the name of the function
        arguments: {               // optional - arguments passed to the "args" named parameter of the function.
          foo: 'bar'               //            This can be anything you like.
        }
      }
    ],
    template: {        // optional - a template entry from which all entries will inherit. Useful for very samey pools
                       //            has the same structure as entries, below
    },
    entries: [
      {
        name: 'Entry Name', // optional - for your convenience, not required
        id: 'entry_id',     // optional - for your convenience, not required (though highly recommended)
        stackable: true,    // optional - default true - whether this item stacks (multiple results get added together) or not
        unique: false,      // optional - default false - if true, this item will only appear once when this pool is rolled
        weight: 1,          // optional - Chancy - default 1 - the relative weight of this entry compared to others
        item: {},           // optional - anything, used for your convenience. If this is a loot table, then it will be
                            //            rolled and the results merged with the parent table results.
        qty: 1,             // optional - Chancy - default 1 - the qty of this item to return
        conditions: [       // optional - an array of conditions that should be called when this entry is rolled.
                            //            If any condition returns false, no result is returned for that entry.
          {
            function: 'condition_name', // required - the name of the condition
            arguments: {                // optional - arguments passed to the "args" named parameter of the function.
              foo: 'bar'                //            This can be anything you like.
            }
          }
        ],
        functions: [        // optional - functions that are applied to every entry result.
          {
            function: 'function_name', // required - the name of the function
            arguments: {               // optional - arguments passed to the "args" named parameter of the function.
              foo: 'bar'               //            This can be anything you like.
            }
          }
        ]
      }
    ]
  }]
};
const ul = new UltraLoot();
const table = ul.createTable(tableDefinition);
```

The absolute most basic example you could possibly have is:

```javascript
const emptyTable = u.createTable({});

const tableWithOneEmptyPool = u.createTable({
  pools: [{}]
});

const tableWithOnePoolWithTwoEmptyEntries = u.createTable({
  pools: [
    {
      entries: [
        {},
        {}
      ]
    }
  ]
});
```

See [UltraLoot.createTable](https://manticorp.github.io/ultraloot/code/classes/index.UltraLoot.html#createTable) for more information.

### Chancy

Anything marked as "Chancy" is special, and can take one of the following as an argument:

* Number
* Dice string / spec
* Configuration object

```javascript
const ul = new UltraLoot();
const rng = ul.getRng();

const randomNumbers = [];

 // Returns a simluated roll of 2 x 6 sided dice and adds 1
rng.chancy('2d6 + 1');
rng.chancy({n: 2, d: 6, plus: 1});

 // Always returns 5
rng.chancy(5);

// A random float between 1 and 10
rng.chancy({min: 1, max: 10});

 // A random integer between 1 and 10
rng.chancy({min: 1, max: 10, type: 'integer'});

// A random normal number between 1 and 10
rng.chancy({min: 1, max: 10, type: 'normal'});

// A random normal number centered at 0.5
rng.chancy({mean: 0.5, type: 'normal'});

// A random normal number centered at 10 with a standard deviation of 5
rng.chancy({mean: 10, stddev: 5, type: 'normal'});

// A random normal number centered at 10 with a standard deviation of 5, skewed a bit to the left
rng.chancy({mean: 10, stddev: 5, skew: -1, type: 'normal'});

// A random normal number centered at 10 with a standard deviation of 5, skewed a bit to the right
rng.chancy({mean: 10, stddev: 5, skew: 1, type: 'normal'});

// A random normal number centered at 10 with a standard deviation of 5, rounded down to an integer (also accepts skew)
rng.chancy({mean: 10, stddev: 5, type: 'normal_integer'});
```

As you can see, it's quite flexible, and allows for many ways of specifying chances in your loot tables.

The ```rng``` object is also passed to any functions or conditions on tables, so you can use chancy stuff there as well.

[You can find more information about Chancy here.](https://manticorp.github.io/ultraloot/code/types/index.Chancy.html)

## Usage

[You can find the documentation for rolling here](https://manticorp.github.io/ultraloot/code/classes/index.LootTable.html#roll). Particularly, the [arguments to the roll function, which are passed as ab object](https://manticorp.github.io/ultraloot/code/interfaces/index.TableRollInterface.html).

Here is a simple example:

```javascript

const ul = new UltraLoot();

const definition = {
  name: 'Precious Metals',
  id: 'precious_metals',
  pools: [
    {
      rolls: 1,
      nulls: 0,
      entries: [
        {
          name:  'Gold',
          id:    'gold',
          weight: 1,
        },
        {
          name:  'Silver',
          id:    'silver',
          weight: 2,
        },
        {
          name:  'Bronze',
          id:    'bronze',
          weight: 4,
        }
      ]
    }
  ],
};
const preciousMetalsTable = ul.createTable(definition);

preciousMetalsTable.roll().then(results => {
  console.log(results.length); // 1
  console.log(results[0].id);  // most likely bronze, but maybe silver or gold  
});

```

### Simple

The first thing you'll need to do is [create an UltraLoot instance](https://manticorp.github.io/ultraloot/code/classes/index.UltraLoot.html#constructor):

```javascript
const ul = new UltraLoot();
```

If you would like, you can pass in a [seed](https://manticorp.github.io/ultraloot/code/types/index.Seed.html) for the [random number generator](https://manticorp.github.io/ultraloot/code/classes/index.Rng.html#constructor):

```javascript
const ul = new UltraLoot('my_awesome_seed');
```

This allows you to get consistent results given the same seed.

You can also pass in your own random number generator, as long as it has certain functionality. This can be seen in ```src/rng.ts``` with the interface [RngInterface](https://manticorp.github.io/ultraloot/code/interfaces/index.RngInterface.html) and [RngConstructor](https://manticorp.github.io/ultraloot/code/interfaces/index.RngConstructor.html).

```javascript
const ul = new UltraLoot(myRngImplementation);
```

Loot tables can be created with a call to [createTable](https://manticorp.github.io/ultraloot/code/classes/index.UltraLoot.html#createTable):

```javascript
const table = ul.createTable(tableDefinition);
```

Then, to roll against the loot table, you can use the ```roll``` function

```javascript

// player and monster are defined elsewhere in your application, and are
// passed to functions / conditions to allow you to apply additional contextual
// results depending on these arguments.
table.roll({
  n: 1,
  looter: player,
  context: monster
}).then(results => {
  const items = game.convertLootTableResultsToItems(result);
  game.scatterOnGround(items, monster.location);
});

// example using rollSync
const result = table.rollSync({ n : 1, looter: player, context: monster });
const items = game.convertLootTableResultsToItems(result);
game.scatterOnGround(items, monster.location);

```

### Handing Results

The [results](https://manticorp.github.io/ultraloot/code/classes/index.LootTableEntryResults.html) are given as a raw list of rolls from each pool in the table. This can, of course, consist of all the rolls of the sub table as well.

The result is a simple array of entries which mimic the entries created when the table was created:

```javascript
const result = await miningTable.roll();

result == [
  {
    id: "gold",
    stackable: true,
    name: "Gold",
    qty: 1
  },
  {
    id: "silver",
    stackable: true,
    name: "Silver",
    qty: 1
  },
  {
    id: "bronze",
    stackable: true,
    name: "Bronze",
    qty: 2
  }
];
```

Note that sometimes with multiple rolls you will get the same entry appearing multiple times. If you would like to consolidated them and add up their quantities, a handy ```collapsed``` function is available for you:

```javascript
const result = await miningTable.roll();

result == [
  {
    id: "gold",
    stackable: true,
    qty: 1
  },
  {
    id: "silver",
    stackable: false,
    qty: 1
  },
  {
    id: "gold",
    stackable: true,
    qty: 1
  },
  {
    id: "silver",
    stackable: false,
    qty: 1
  },
];

result.collapsed() == [
  {
    id: "gold",
    stackable: true,
    qty: 2
  },
  {
    id: "silver",
    stackable: false,
    qty: 1
  },
  {
    id: "silver",
    stackable: false,
    qty: 1
  },
];
```

The ```collapsed``` function collapses things based on their JSON representation (minus the qty) so if their keys aren't exactly the same they won't be collapsed together.

Note: ```collapsed``` non-stackable entries don't necessarily have a qty of 1 depending on how your tables, pools and functions are set up. The collapse function doesn't split objects with a qty > 1, it just doesn't add non stackable items together.

### Sync vs Async

By default, rolling tables is a promise based async operation - this is to allow for asynchronous conditions and functions to be used.

If **all** of your functions/conditions are not asynchonous, you can use ```rollSync``` in place of ```roll``` everywhere it is used.

If you call ```rollSync``` and a condition returns a promise, you will get an error.

### Loading from JSON files

Loot tables can be stored in JSON files. The structure is the same as when creating them programatically, except for loot table entries inheriting from other tables.

Here is an example loot table json file ```gems.json```:

```json
{
    "name": "Gems",
    "id": "gems",
    "pools": [
        {
            "entries": [
                {
                    "weight": 0.1,
                    "name": "Diamond",
                    "id": "diamond"
                },
                {
                    "weight": 1,
                    "name": "Ruby",
                    "id": "ruby"
                },
                {
                    "weight": 10,
                    "name": "Emerald",
                    "id": "emerald"
                },
                {
                    "weight": 100,
                    "name": "Sapphire",
                    "id": "sapphire"
                },
                {
                    "weight": 1000,
                    "name": "Amethyst",
                    "id": "amethyst"
                }
            ]
        }
    ]
}
```

We would load this file like this - not it is an async process:

```javascript
const ul = new UltraLoot();
table = await ul.loadTable('gems.json');
```

If you have a table with an entry that inherits from a table, then you need to provide it with a path and make sure it has the type "table". For example, lets say we have ```parent.json```:

```json
{
  "name": "My Super Loot Table",
  "pools": [
    {
      "entries": [
        {
          "type": "item",
          "id": "regular_item"
        },
        {
          "type": "table",
          "item": "path/to/sub/table"
        }
      ]
    }
  ]
}
```

The path to the sub table is relative to the path given when loading the table:

```
path
└── to
    └── sub
        └── table.json
parent.json
```

They can be located in a subfolder in your project - you will just need to provide a base path when calling ```loadTable```:

```javascript
const ul = new UltraLoot();
const parent = await ul.loadTable('parent.json', {path: 'tables'});
```

This relative path will be applied to all sub tables as well.

You can also give a default extension to be used when no extensions are given:

```javascript
const ul = new UltraLoot();
const parent = await ul.loadTable('parent', {path: 'tables', defaultExtension: '.json'});
````

Example file structure found in ```demo/tables```:

```
tables
├── clothing
│   ├── hats.json
│   ├── shirts.json
│   ├── shoes.json
│   └── trousers.json
├── food
│   ├── composite
│   │  ├── fresh.json
│   │  └── stable.json
│   ├── baked.json
│   ├── candy.json
│   ├── chocolate.json
│   ├── cooked.json
│   ├── fruit.json
│   ├── junk.json
│   ├── pantry.json
│   └── vegetables.json
├── gear
│   ├── armor.json
│   ├── footwear.json
│   ├── headgear.json
│   └── legwear.json
├── household
│   ├── bathroom.json
│   ├── bedroom.json
│   ├── kitchen.json
│   └── living_room.json
├── loot
│   ├── animal_generic.json
│   ├── skill_books.json
│   └── skill_magazines.json
├── mining
│   ├── gems.json
│   ├── metals.json
│   └── stones.json
├── monsters
│   ├── deer.json
│   ├── vampire.json
│   ├── werewolf.json
│   └── zombie.json
├── armor_box.json
├── care_package.json
├── clothing_store.json
├── clothing.json
├── food.json
├── gear.json
├── kitchen_cupboard.json
├── library_shelf.json
└── mining.json
```

Then in your lootingGame.js:

```javascript
const ul = new UltraLoot();
const tables = {};
const options = {path: 'tables', defaultExtension: '.json'};

tables.clothing     = await ul.loadTable('clothing', options);
tables.libraryShelf = await ul.loadTable('library_shelf', options);
tables.mining       = await ul.loadTable('mining', options);
tables.zombie       = await ul.loadTable('monsters/zombie', options);

// integrate into your game
const ltm = new LootTableManager();
game.setLootTableManager(ltm);
ltm.addTables(tables);

// use it to do monster drops
const monsterSpawner = game.createSpawner((entityManager) => {
  const monster = entityManager.factory.createMonster();
  monster.addComponent(Lootable);
  monster.lootable.table = 'zombie';
});

// or generic loot containers
const clothesShelf = game.createLootBox().set3dModel('assets/shelf_full.fbx').setTable('clothing');

// or anything
const block = {
  health: 10,
  loot: tables.mining,
};
const player = {
  strength: 1,
  mine: async function(block) {
    block.health -= this.strength;
    if (block.health == 0) {
      return block.loot.roll({looter: this, context: block}).then(loot => {
        game.remove(block);
        return loot;
      });
    }
  }
};
player.mine(block);
```

### Functions and Conditions

Functions can be used to apply effects or modify results on the fly.

Conditions can be used to conditionally stop an item from being added to a roll result.

To allow for storage of loot tables, functions are referenced in loot tables by a name, and registered with either the loot table itself, or UltraLoot instance.

```javascript
const ul = new UltraLoot();
const miningTable = ul.createTable({
  name: 'Mining Table',
  pools: [
    {
      entries: [
        {
          id: 'diamond',
          functions: [
            {
              function: 'chanceToBreakTool',
              arguments: {
                chance: {
                  n: 1,
                  in: 10
                }
              }
            }
          ],
          conditions: [
            {
              function: 'dependLooterPropertyNumeric',
              arguments: {
                property: 'experience.level',
                min: 20
              }
            }
          ]
        },
        {
          id: 'jellopy',
          functions: [
            {
              function: 'chanceToBreakTool',
              arguments: {
                chance: {
                  n: 1,
                  in: 100
                }
              }
            }
          ]
        }
      ]
    }
  ]
});

/**
 * Simple dot getter function
 */
const dotGet = (ob, path, defaultValue) => {
  const result = path.split('.').reduce((o, i) => ((typeof o !== 'undefined') ? o[i] : o), ob);
  return (typeof result === 'undefined' ? defaultValue : result);
};

miningTable.registerFunction('chanceToBreakTool', ({rng, looter, args}) => {
  if (typeof args.chance !== 'undefined') {
    if (rng.chance(chance.n ?? 1, chance.in ?? 1)) {
      looter.tool.broken = true;
    }
  }
});

ul.registerCondition('dependLooterPropertyNumeric', ({looter, args}) => {
  const {property, min, max} = args;
  if (typeof property !== 'undefined') {
    const prop = dotGet(looter, property);
    if (typeof prop !== 'undefined') {
      if (typeof min !== 'undefined') {
        if (prop < min) {
          return false
        }
      }
      if (typeof max !== 'undefined') {
        if (prop > max) {
          return false
        }
      }
    }
  }
});
````

Conditions should return a ```boolean``` or ```Promise<boolean>```, and functions should not return anything.

There are some handy default functions and conditions that can be registered like so:

```
const ul = new UltraLoot();
ul.registerDefaultFunctions();
ul.registerDefaultConditions();
```

The [following functions](https://manticorp.github.io/ultraloot/code/modules/default_functions.html) are available:

```
inheritLooter
inheritContext
setToRandomChoice
```

And the [following conditions](https://manticorp.github.io/ultraloot/code/modules/default_conditions.html) are available:

```
dependContext
dependLooter
```

For more information, please see the detailed code documentation which lists signatures for these functions.

### Nesting Tables

Tables can be nested by either using an existing loot table as an entry, or having an entry whose item property is a loot table.

```javascript
const childTable1 = new LootTable(definition1);
const childTable2 = new LootTable(definition2);

const parentTable = new LootTable({
  pools: [
    {
      entries: [
        {
          weight: 1,
          id: 'regular_item'
        }
        childTable1, // will have a weight of 1
        {
          weight: 10, // using this syntax allows us to specify a weight
          item: childTable2
        }
      ]
    }
  ]
})
```

## Examples

There are numerous examples in the docs/examples folder - I encourage you to explore!