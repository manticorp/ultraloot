export default class Dies {
  hasDies = true;
  dyingOver;
  deathStart;
  dying = false;
  dead = false;

  die () {
    if (!this.dead) {
      this.dead = true;
    }
  }

  dieIn (n, over) {
    if (n < 1) {
      throw new Error('Cannot die in <  - must be positive');
    }
    if (over) {
      this.dieOver(over);
    }
    this.dying = performance.now() + n;
  }

  dieOver (n) {
    if (n < 1) {
      throw new Error('Cannot die over < 1ms - must be positive');
    }
    this.dyingOver = n;
    this.dying = performance.now();
  }

  tickDeath () {
    if (this.dying) {
      const elapsed = performance.now() - this.dying;
      const perc = Math.max(0, Math.min(elapsed / this.dyingOver, 1));
      if (this.sprite) {
        this.sprite.alpha = (1 - perc);
      }
      if (perc >= 1) {
        this.dead = true;
        if (this.app && this.sprite) {
          this.app.stage.removeChild(this.sprite);
        }
      }
    }
  }
}
