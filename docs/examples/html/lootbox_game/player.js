import Vector from './../common/vector.js';
import Mover from './mover.js';

export default class Player extends Mover {
  app;
  impulse;
  acceleration;
  maxacceleration = 1;
  minimpulse;
  maximpulse;
  friction;
  position;
  spritesheet;
  sprite;
  mass = 100;
  constructor (def) {
    super(def);
    this.app = def.app;
    this.impulse = new Vector();
    this.acceleration = new Vector();
    this.minimpulse = (new Vector()).all(0.05);
    this.maximpulse = (new Vector()).all(1.5);
    this.friction = (new Vector()).all(1.05);
    this.position = new Vector();
    this.bounds = [new Vector(16, 0), new Vector(this.app.screen.width - 16, this.app.screen.height - 32)];
  }

  async init () {
    const atlasData = {
      frames: {
        idle1: {
          frame: { x: 0, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
        idle2: {
          frame: { x: 64, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
        run1: {
          frame: { x: 64 * 2, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
        run2: {
          frame: { x: 64 * 3, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
        run3: {
          frame: { x: 64 * 4, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
        run4: {
          frame: { x: 64 * 5, y: 0, w: 64, h: 64 },
          sourceSize: { w: 64, h: 64 },
          spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
        },
      },
      meta: {
        image: 'lootbox_game/ZombieToast.png',
        format: 'RGBA8888',
        size: { w: 1600, h: 64 },
        scale: 1
      },
      animations: {
        idle: ['idle1', 'idle1', 'idle2', 'idle2'], // array of frames by name
        run: ['run1', 'run2', 'run3', 'run4'] // array of frames by name
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
    this.sprite.eventMode = 'dynamic';
    this.sprite.animationSpeed = 0.25;
    this.sprite.anchor.set(0.5);
    this.sprite.loop = false;
    this.sprite.play();
    this.app.stage.addChild(this.sprite);
  }

  face (dir) {
    this.sprite.scale.x = -dir;
  }

  getBounds (pos) {
    if (typeof pos === 'undefined') {
      pos = this.position;
    }
    return {
      x: pos.x - 16,
      y: pos.y,
      width: 32,
      height: 32,
    };
  }

  tick () {
    if (this.impulse.length > 0) {
      if (this.impulse.x > 0) {
        this.face(1);
      } else if (this.impulse.x < 0) {
        this.face(-1);
      }
      if (!this.sprite.playing || this.sprite.textures !== this.spritesheet.animations.run) {
        this.sprite.textures = this.spritesheet.animations.run;
        this.sprite.play();
      }
    } else {
      if (!this.sprite.playing || this.sprite.textures !== this.spritesheet.animations.idle) {
        this.sprite.textures = this.spritesheet.animations.idle;
        this.sprite.play();
      }
    }
    this.tickImpulses();
  }
}
