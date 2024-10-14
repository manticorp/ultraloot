import Vector from './../common/vector.js';

export default class Mover {
  impulse;
  acceleration;
  maxacceleration = 1;
  minimpulse;
  maximpulse;
  friction;
  position;
  sprite;
  bounds;
  width = 1;
  height = 1;
  mass = 1;
  dead = false;
  constructor (def) {
    this.impulse = new Vector(def.impulse ?? 0);
    this.acceleration = new Vector();
    this.minimpulse = (new Vector()).all(def.minimpulse ?? 0);
    this.maximpulse = (new Vector()).all(def.maximpulse ?? Number.POSITIVE_INFINITY);
    this.friction = (new Vector()).all(def.friction ?? 1.01);
    this.position = new Vector(def.position ?? 0);
    this.width = def.width ?? 1;
    this.height = def.height ?? 1;
    this.sprite = def.sprite;
    this.bounds = def.bounds;
  }

  get x () {
    return this.position.x;
  }

  get y () {
    return this.position.y;
  }

  get w () {
    return this.width;
  }

  get h () {
    return this.height;
  }

  get nextPosition () {
    const pos = this.position.copy.add(this.impulse).bound(new Vector(16, 0), new Vector(this.app.screen.width - 16, this.app.screen.height - 32));
    return {
      ...pos,
      ...{
        getBounds: () => {
          return this.getBounds(pos);
        },
        mass: this.mass,
        position: pos,
        acceleration: this.acceleration.copy,
        impulse: this.impulse.copy.add(this.acceleration.copy.maxMagnitude(this.maxacceleration))
          .divide(this.friction)
          .minAbs(this.maximpulse)
          .fallToZeroIfBelowMagnitude(this.minimpulse)
      }
    };
  }

  getBounds (pos) {
    if (typeof pos === 'undefined') {
      pos = this.position;
    }
    return {
      x: pos.x,
      y: pos.y,
      width: this.width,
      height: this.height,
    };
  }

  nanCheck () {
    const coords = ['x', 'y', 'z'];
    const toCheck = [
      'acceleration',
      'position',
      'friction',
      'impulse',
      'position',
    ];
    for (const tc of toCheck) {
      for (const c of coords) {
        if (Number.isNaN(this[tc][c])) {
          throw new Error(`${tc}[${c}] was NaN`);
        }
      }
    }
  }

  tickImpulses () {
    this.acceleration.maxMagnitude(this.maxacceleration);
    this.position.add(this.impulse);
    this.impulse.add(this.acceleration);
    this.impulse.divide(this.friction);
    this.impulse.minAbs(this.maximpulse);
    this.impulse.fallToZeroIfBelowMagnitude(this.minimpulse);
    this.acceleration.zero();

    if (this.bounds) {
      this.position.bound(this.bounds[0], this.bounds[1]);
    }

    if (this.sprite) {
      this.sprite.x = this.position.x;
      this.sprite.y = this.position.y;
    }

    this.nanCheck();
  }

  tick () {
    this.tickImpulses();
  }
}
