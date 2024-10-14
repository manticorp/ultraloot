import Controller from './../common/controller.js';
import Vector from './../common/vector.js';
import Lootbox from './lootbox.js';
import Player from './player.js';
import Item from './item.js';

export default class Game {
  player;
  app;
  controller;

  ul;
  tables = {};
  lootboxes = [];
  tickable = [];
  lootable = [];

  counters = {
    gold: 0,
    diamond: 0,
    ruby: 0,
    sapphire: 0,
  };

  constructor (app) {
    this.app = app;
  }

  async init () {
    // Wait for the Renderer to be available
    await this.app.init({ background: '#1099bb', width: document.body.clientWidth, height: document.body.clientHeight * 0.75 });

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.getElementById('app').appendChild(this.app.canvas);

    this.controller = new Controller();
    this.ul = new UltraLoot();

    await this.loadAssets();
    await this.initPlayer();
    await this.initLootTables();
    await this.initLootBoxes();
    await this.initCounters();
  }

  async loadAssets () {
    await PIXI.Assets.load('lootbox_game/Chest.png');
    await PIXI.Assets.load('lootbox_game/ZombieToast.png');
  }

  async initPlayer () {
    this.player = new Player({
      app: this.app,
    });
    await this.player.init();
    this.player.position.x = this.app.screen.width / 2;
    this.player.position.y = this.app.screen.height / 2;

    this.tickable.push(this.player);
  }

  async initLootTables () {
    this.tables.gold = this.ul.createTable({
      pools: [
        {
          rolls: {
            min: 1,
            max: 5
          },
          entries: [
            {
              id: 'gold',
              item: {
                color: '#fd0',
                shape: 'circle'
              },
              qty: 1,
              stackable: true
            }
          ]
        }
      ]
    });
    this.tables.gems = this.ul.createTable({
      pools: [
        {
          rolls: 2,
          nulls: 31,
          entries: [
            {
              id: 'diamond',
              item: {
                color: '#9ef',
                shape: 'gem'
              },
              weight: 1,
              stackable: false
            },
            {
              id: 'ruby',
              item: {
                color: '#d10',
                shape: 'gem'
              },
              weight: 10,
              stackable: false
            },
            {
              id: 'sapphire',
              item: {
                color: '#229',
                shape: 'gem'
              },
              weight: 20,
              stackable: false
            }
          ]
        }
      ]
    });

    this.tables.lootbox = this.ul.createTable({
      pools: [
        {
          rolls: 10,
          nulls: 3,
          entries: [
            this.tables.gold,
            this.tables.gems,
          ]
        }
      ]
    });
  }

  async addLootBox (n = 1) {
    let i = 0;
    const had = new Set();
    for (const lb of this.lootboxes) {
      had.add(`${lb.position.x},${lb.position.y}`);
    }
    const target = this.lootboxes.length + n;
    while (had.size < target && i++ < 100) {
      const grid = 64;
      const cellsx = Math.floor(this.app.screen.width / grid) - 2;
      const cellsy = Math.floor(this.app.screen.height / grid) - 2;
      const cellx = 1 + Math.floor(Math.random() * cellsx);
      const celly = 1 + Math.floor(Math.random() * cellsy);
      const x = cellx * grid;
      const y = celly * grid;
      const key = `${x},${y}`;
      if (!had.has(key)) {
        const lb = new Lootbox({ app: this.app, table: this.tables.lootbox });
        await lb.init();
        lb.position.x = x;
        lb.position.y = y;
        this.lootboxes.push(lb);
        this.tickable.push(lb);
        had.add(key);
      }
    }
  }

  async initLootBoxes () {
    return this.addLootBox(10);
  }

  counterTextContent () {
    const score = this.counters.gold + this.counters.ruby * 2 + this.counters.sapphire * 5 + this.counters.diamond * 20;
    return `Score: ${score}, Gold: ${this.counters.gold}, Rubies: ${this.counters.ruby}, Sapphires: ${this.counters.sapphire}, Diamonds: ${this.counters.diamond}`;
  }

  async initCounters () {
    const style = new PIXI.TextStyle({
      fontFamily: 'Aptos, Helvetica, sans-serif',
      fontSize: 14,
      fontWeight: 'bold',
      fill: 0xffffff
    });
    this.counterText = new PIXI.Text({ text: this.counterTextContent(), style });

    this.counterText.x = 0;
    this.counterText.y = 0;

    this.app.stage.addChild(this.counterText);
  }

  // Test For Hit
  // A basic AABB check between two different squares
  testForAABB (object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  // Calculates the results of a collision, allowing us to give an impulse that
  // shoves objects apart
  collisionResponse (object1, object2) {
    const vCollision = new Vector(object2.x - object1.x, object2.y - object1.y);

    const distance = Math.sqrt(
      (object2.x - object1.x) * (object2.x - object1.x) + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new Vector(vCollision.x / distance, vCollision.y / distance);

    const vRelativeVelocity = new Vector(
      object1.acceleration.x - object2.acceleration.x,
      object1.acceleration.y - object2.acceleration.y
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

    // Strength of the impulse push between two objects
    const impulsePower = 5;
    const impulse = (impulsePower * speed) / (object1.mass + object2.mass);

    return new Vector(impulse * vCollisionNorm.x, impulse * vCollisionNorm.y);
  }

  async createItem (def) {
    return (new Item({ app: this.app, id: def.id, ...def.item })).init();
  }

  kill (thing) {
    if (!thing.dead) {
      this.app.stage.removeChild(thing.sprite);
      thing.dead = true;
    }
  }

  async killOver (thing, time1 = 1000, time2) {
    if (time1 && time2) {
      thing.dieIn(time1, time2);
    } else {
      thing.dieOver(time1);
    }
    return new Promise((resolve) => {
      setTimeout(resolve, time1 + time2);
    });
  }

  spawnLoot (lootbox, loot) {
    const mag = 2;
    for (const looted of loot) {
      this.createItem(looted).then(item => {
        item.qty = looted.qty ?? 1;
        item.position = lootbox.position.clone();
        item.impulse = new Vector((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
        this.tickable.push(item);
        this.lootable.push(item);
        this.killOver(item, 5000, 1000);
      });
    }
  }

  loop () {
    const mag = 0.06;

    for (const lootbox of this.lootboxes) {
      // console.log(`Distance from player ${this.player.position.toString()} to lootbox ${lootbox.position.toString()} is ${this.player.position.distanceTo(lootbox.position)}`);
      if (
        this.player.position.distanceTo(lootbox.position) < 64 &&
        !lootbox.isBeingLooted()
      ) {
        lootbox.highlight = true;
      } else {
        lootbox.highlight = false;
      }
    }

    if (this.controller.keys.left.pressed) {
      this.player.acceleration.x = -mag;
    }
    if (this.controller.keys.right.pressed) {
      this.player.acceleration.x = mag;
    }
    if (this.controller.keys.up.pressed) {
      this.player.acceleration.y = -mag;
    }
    if (this.controller.keys.down.pressed) {
      this.player.acceleration.y = mag;
    }
    if (this.controller.keys.space.pressed) {
      for (const lootbox of this.lootboxes) {
        // console.log(`Distance from player ${this.player.position.toString()} to lootbox ${lootbox.position.toString()} is ${this.player.position.distanceTo(lootbox.position)}`);
        if (
          this.player.position.distanceTo(lootbox.position) < 64 &&
          !lootbox.isBeingLooted()
        ) {
          lootbox.loot().then(results => {
            this.spawnLoot(lootbox, results);
            this.killOver(lootbox, 100, 1000).then(() => {
              this.addLootBox();
              this.lootboxes.splice(this.lootboxes.indexOf(lootbox), 1);
            });
          });
        }
      }
    }

    const newPlayerPos = this.player.nextPosition;
    for (const lootbox of this.lootboxes) {
      // If the two squares are colliding
      if (!lootbox.dying && !lootbox.dead && this.testForAABB(newPlayerPos, lootbox)) {
        // Calculate the changes in acceleration that should be made between
        // each square as a result of the collision
        const collisionPush = this.collisionResponse(newPlayerPos, lootbox);

        // Set the changes in acceleration for both squares
        this.player.acceleration.x = -(collisionPush.x * lootbox.mass);
        this.player.acceleration.y = -(collisionPush.y * lootbox.mass);
      }
    }
    const newLootables = [];
    for (const i in this.lootable) {
      const lootable = this.lootable[i];
      // If the two squares are colliding
      if (this.testForAABB(newPlayerPos, lootable)) {
        this.counters[lootable.id] += lootable.qty;
        this.kill(lootable);
      } else {
        newLootables.push(lootable);
      }
    }
    this.lootable = newLootables;

    for (const tickable of this.tickable) {
      tickable.tick();
    }
    this.counterText.text = this.counterTextContent();
  }
}
