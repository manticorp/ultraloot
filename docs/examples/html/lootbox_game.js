import Game from './lootbox_game/game.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
const game = new Game(app);

await game.init();

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((ticker) => {
  game.loop();
});
