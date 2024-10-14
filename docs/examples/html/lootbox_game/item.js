import Vector from './../common/vector.js';
import utils from './../common/utils.js';
import Mover from './mover.js';
import Dies from './dies.js';

class Item extends utils.aggregation(Mover, Dies) {
  graphic;
  sprite;
  id;
  color = 0x000000;
  shape = 'rectangle';
  mass = 1;
  qty = 1;

  constructor (def) {
    super(def);
    this.id = def.id;
    this.app = def.app;
    this.color = def.color ?? this.color;
    this.shape = def.shape ?? this.shape;
    this.width = 16;
    this.height = 16;
    this.bounds = [new Vector(16, 0), new Vector(this.app.screen.width - 16, this.app.screen.height - 32)];
  }

  async init () {
    this.sprite = new PIXI.Container();
    this.graphic = new PIXI.Graphics();

    if (this.shape === 'rectangle' || this.shape === 'square') {
      this.graphic.rect(0, 0, this.width, this.height);
    } else if (this.shape === 'circle') {
      this.graphic.circle(0, 0, this.width / 2);
    } else if (this.shape === 'gem') {
      this.graphic.moveTo(this.width / 3, 0);
      this.graphic.lineTo(2 * (this.width / 3), 0);
      this.graphic.lineTo(this.width, this.height / 4);
      this.graphic.lineTo(this.width, this.height / 3);
      this.graphic.lineTo(this.width / 2, this.height);
      this.graphic.lineTo(0, this.height / 3);
      this.graphic.lineTo(0, this.height / 4);
      this.graphic.lineTo(this.width / 3, 0);
    }
    this.graphic.fill(this.color);

    this.sprite.eventMode = 'dynamic';

    this.sprite.addChild(this.graphic);
    this.app.stage.addChild(this.sprite);
    return this;
  }

  tick () {
    this.tickImpulses();
    this.tickDeath();
  }
}

export default Item;
