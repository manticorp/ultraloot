import Game from './lootbox_game/game.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
const game = new Game(app);

await game.init();

// const loots = [];

// run.on('pointerdown', () => {
//   console.log('Clicked Down');
//   const idle = new PIXI.AnimatedSprite(spritesheet.animations.idle);
//   idle.animationSpeed = 1 / 6;
//   idle.play();
//   app.stage.addChild(idle);
//   idle.x = run.x;
//   idle.y = run.y;
//   loots.push(idle);
// });

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((ticker) => {
  game.loop();
  // elapsed += ticker.deltaTime;
  // run.x = 0.0 + Math.pow(Math.cos(elapsed / 100.0), 2) * (640.0 - 64);
  // loots.forEach(l => {
  //   l.y += 4;
  //   if (l.y > 360) {
  //     app.stage.removeChild(l);
  //     loots.splice(loots.indexOf(l), 1);
  //   }
  // });
});
