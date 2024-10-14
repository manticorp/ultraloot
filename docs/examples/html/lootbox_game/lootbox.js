import Vector from './../common/vector.js';
import utils from './../common/utils.js';
import Mover from './mover.js';
import Dies from './dies.js';

class Lootbox extends utils.aggregation(Mover, Dies) {
  position;
  health = 10;
  acceleration;
  graphic;
  sprite;
  spritesheet;
  #highlight = false;
  table;
  mass = 1000000000;
  lootingstarted = false;
  lootingtimeout = 1000;
  state = 'idle';

  constructor (def) {
    super(def);
    this.app = def.app;
    this.table = def.table;
    this.position = new Vector(def.position ?? 0);
    this.acceleration = (new Vector()).zero();
    this.width = 32;
    this.height = 32;
  }

  set highlight (val) {
    if (this.#highlight !== val) {
      this.#highlight = val;
      this.redrawHighlight();
    }
  }

  get highlight () {
    return this.#highlight;
  }

  redrawHighlight () {
    const f = `${this.state}${this.#highlight ? 'h' : ''}`;
    this.sprite.textures = this.spritesheet.animations[f];
    this.sprite.loop = false;
    this.sprite.animationSpeed = 0.25;
    this.sprite.play();
  }

  async init () {
    const base = 32;
    const atlasData = {
      frames: {
        idle1: {
          frame: { x: 0, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
        open1: {
          frame: { x: base, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
        open2: {
          frame: { x: base * 2, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
        idleh1: {
          frame: { x: base * 3, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
        openh1: {
          frame: { x: base * 4, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
        openh2: {
          frame: { x: base * 5, y: 0, w: base, h: base },
          sourceSize: { w: base, h: base },
          spriteSourceSize: { x: 0, y: 0, w: base, h: base }
        },
      },
      meta: {
        image: 'lootbox_game/Chest.png',
        format: 'RGBA8888',
        size: { w: base * 3, h: base },
        scale: 1
      },
      animations: {
        idle: ['idle1'],
        opening: ['idle1', 'open1', 'open2'],
        open: ['open2'],
        idleh: ['idleh1'],
        openingh: ['idleh1', 'openh1', 'openh2'],
        openh: ['openh2']
      }
    };

    await PIXI.Assets.load(atlasData.meta.image);
    const texture = PIXI.Texture.from(atlasData.meta.image);

    // Create the SpriteSheet from data and image
    this.spritesheet = new PIXI.Spritesheet(
      texture,
      atlasData
    );

    // Generate all the Textures asynchronously
    await this.spritesheet.parse();

    this.sprite = new PIXI.AnimatedSprite(this.spritesheet.animations.idle);
    this.sprite.loop = false;
    this.sprite.animationSpeed = 0.05;
    this.sprite.play();

    this.sprite.eventMode = 'static';
    this.app.stage.addChild(this.sprite);
  }

  async loot () {
    this.state = 'opening';
    this.redrawHighlight();
    this.lootingstarted = this.now();
    return this.table.roll().then(result => {
      // this.state = 'open';
      // this.redrawHighlight();
      return result.collapsed();
    });
  }

  now () {
    return (new Date()).valueOf();
  }

  isBeingLooted () {
    if (this.lootingstarted === false) {
      return false;
    }
    return (this.now() - this.lootingstarted < this.lootingtimeout);
  }

  tick () {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.tickDeath();
  }
}

export default Lootbox;
