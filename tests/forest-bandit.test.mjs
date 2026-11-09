import { test } from 'node:test';
import assert from 'node:assert/strict';
import UltraLoot from '../dist/ultraloot.mjs';
import { WORLD, SPOTS, ITEMS, REQUESTS, createGame, restoreGame, search, searchProblem, capacity, bagSize, daylight, takeFind, takeAll, leaveFinds, deposit, canDeliver, deliver, trade, buy, nextDay, weatherFor, countItem } from '../docs/examples/forest-bandit/world.mjs';
const visit = (state, id) => { const place = id === 'home' ? WORLD.home : SPOTS.find(spot => spot.id === id); state.position = { x: place.x, y: place.y }; };
const item = (id, qty, sparkly = false) => ({ id, qty, sparkly });

test('the same seed and search history reproduce finds across save/resume', () => {
  const a = createGame('pocket-forest'); const b = restoreGame(JSON.stringify(a));
  for (const id of ['berries', 'mushrooms', 'hollow', 'picnic']) {
    for (const state of [a, b]) { visit(state, id); search(state, id, UltraLoot); }
    assert.deepEqual(a.pending, b.pending); assert.deepEqual(a.lastTrace, b.lastTrace);
    for (const state of [a, b]) { takeAll(state); leaveFinds(state); visit(state, 'home'); deposit(state); }
  }
  assert.deepEqual(a.bag, b.bag); assert.deepEqual(a.stash, b.stash);
});
test('each biome creates valid integer rewards, and first finds include local ingredients', () => {
  for (let seed = 0; seed < 80; seed++) {
    for (const spot of SPOTS) {
      const state = createGame(String(seed)); state.upgrades.net = state.upgrades.shovel = 1;
      visit(state, spot.id); search(state, spot.id, UltraLoot);
      assert.ok(state.pending.length);
      for (const reward of state.pending) { assert.ok(ITEMS[reward.id]); assert.ok(Number.isSafeInteger(reward.qty) && reward.qty > 0); }
      if (['berries', 'mushrooms'].includes(spot.id)) assert.ok(state.pending.some(item => item.id === (spot.id === 'berries' ? 'berry' : 'mushroom')));
      assert.equal(state.energy, 12 - spot.cost);
      assert.ok(state.lastTrace.some(event => event.type === 'choice'));
    }
  }
});
test('location, tools, daylight, pending finds, and daily depletion gate searching without mutation', () => {
  const state = createGame();
  assert.throws(() => search(state, 'berries', UltraLoot), /closer/);
  visit(state, 'pond'); assert.throws(() => search(state, 'pond', UltraLoot), /net/);
  visit(state, 'berries'); search(state, 'berries', UltraLoot);
  const before = JSON.stringify(state); assert.throws(() => search(state, 'berries', UltraLoot), /sorting/); assert.equal(JSON.stringify(state), before);
  leaveFinds(state); state.searches.berries = 3; assert.match(searchProblem(state, 'berries'), /tomorrow/);
  state.searches.berries = 0; state.energy = 0; assert.match(searchProblem(state, 'berries'), /fresh day/);
});
test('packing can take part of a stack and never exceeds capacity', () => {
  const state = createGame(); state.bag = [item('twig', 7)]; state.pending = [item('berry', 3), item('mushroom', 2)];
  assert.equal(takeFind(state, 0), 1); assert.equal(bagSize(state), 8); assert.equal(state.pending[0].qty, 2);
  assert.equal(takeAll(state), 0); assert.equal(bagSize(state), capacity(state));
  leaveFinds(state); visit(state, 'home'); assert.equal(deposit(state), 8); assert.equal(bagSize(state), 0);
  assert.equal(countItem(state.stash, 'berry'), 1); assert.ok(state.discovered.includes('berry'));
});
test('deliveries consume stored ingredients once and award coins once', () => {
  const state = createGame(); state.stash = [item('berry', 3), item('berry', 2, true), item('mushroom', 2)];
  assert.ok(canDeliver(state, REQUESTS[0])); deliver(state, 'tea');
  assert.equal(state.coins, 18); assert.equal(countItem(state.stash, 'berry'), 1); assert.equal(countItem(state.stash, 'mushroom'), 0);
  assert.throws(() => deliver(state, 'tea')); assert.equal(state.coins, 18);
  visit(state, 'hollow'); assert.throws(() => deposit(state), /den/);
});
test('trading protects outstanding request ingredients and unique keepsakes', () => {
  const state = createGame(); state.stash = [item('berry', 6), item('button', 1), item('button', 3, true), item('crown', 1), item('firefly', 1)];
  assert.equal(trade(state), 24); // 2 spare berries + 2 sparkly buttons
  assert.equal(countItem(state.stash, 'berry'), 4); assert.equal(countItem(state.stash, 'button'), 2);
  assert.equal(countItem(state.stash, 'crown'), 1); assert.equal(countItem(state.stash, 'firefly'), 1);
  assert.equal(trade(state), 0);
});
test('upgrades have bounded levels, unlock biomes and preserve daylight across sleep', () => {
  const state = createGame(); assert.throws(() => buy(state, 'net'), /more woodland coins/);
  state.coins = 200; buy(state, 'pack'); buy(state, 'pack'); assert.equal(capacity(state), 20); assert.throws(() => buy(state, 'pack'), /complete/);
  buy(state, 'net'); buy(state, 'shovel'); buy(state, 'lantern'); assert.equal(state.energy, 16);
  visit(state, 'pond'); assert.equal(searchProblem(state, 'pond'), null);
  visit(state, 'home'); state.energy = 0; state.bag = [item('berry', 2)]; nextDay(state);
  assert.equal(state.energy, daylight(state)); assert.equal(state.day, 2); assert.equal(countItem(state.stash, 'berry'), 2);
});
test('weather quantity modifiers and already-collected conditions affect actual rolls', () => {
  for (const seed of ['mosswood', 'drizzle', 'rainy']) {
    const state = createGame(seed);
    while (weatherFor(state) !== 'drizzle') nextDay(state);
    visit(state, 'berries'); search(state, 'berries', UltraLoot); assert.ok(state.pending.find(item => item.id === 'berry').qty >= 2);
  }
  const state = createGame(); state.upgrades.shovel = 1; state.discovered = ['crown', 'firefly'];
  visit(state, 'ruins'); search(state, 'ruins', UltraLoot);
  assert.ok(!state.pending.some(item => ['crown', 'firefly'].includes(item.id)));
  assert.ok(state.lastTrace.some(event => event.type === 'condition' && event.name === 'notCollected' && event.passed === false));
});
test('saves retain pending decisions and reject broken inventory/progression data', () => {
  const state = createGame(); visit(state, 'berries'); search(state, 'berries', UltraLoot);
  const saved = JSON.stringify(state); assert.deepEqual(restoreGame(saved).pending, state.pending);
  for (const mutate of [s => { s.bag = [item('twig', 99)]; }, s => { s.pending[0].qty = NaN; }, s => { s.upgrades.net = 2; }, s => { s.completed = ['tea', 'tea']; }, s => { s.position.x = Infinity; }]) {
    const broken = JSON.parse(saved); mutate(broken); assert.throws(() => restoreGame(JSON.stringify(broken)));
  }
});
test('complete adventures are achievable without losing requests or getting stuck', () => {
  const source = { berry: 'berries', mushroom: 'mushrooms', twig: 'hollow', acorn: 'hollow', button: 'picnic', ribbon: 'picnic', pebble: 'pond', feather: 'pond', bottle: 'pond' };
  for (let seed = 0; seed < 20; seed++) {
    const state = createGame(`playthrough-${seed}`);
    for (let turns = 0; turns < 250 && state.completed.length < 4; turns++) {
      visit(state, 'home'); deposit(state);
      for (const request of REQUESTS) if (canDeliver(state, request)) deliver(state, request.id);
      if (state.completed.length === 4) break;
      if (!state.upgrades.net && state.coins >= 18) buy(state, 'net');
      const request = REQUESTS.find(request => !state.completed.includes(request.id));
      const targets = [...new Set(Object.entries(request.needs).filter(([id, qty]) => countItem(state.stash, id) < qty).map(([id]) => source[id]))];
      const target = targets.find(id => (state.searches[id] ?? 0) < 3 && state.energy > 0 && (id !== 'pond' || state.upgrades.net));
      if (!target) { nextDay(state); continue; }
      visit(state, target); search(state, target, UltraLoot); takeAll(state); leaveFinds(state);
    }
    assert.equal(state.completed.length, 4, `seed ${seed} should finish`);
    assert.ok(state.day < 15, `seed ${seed} should finish in a reasonable number of outings`);
  }
});


test('rejects non-object search counters before gameplay resumes', () => {
  for (const searches of [true, 1, 'counters', [], null]) {
    const saved = createGame(); saved.searches = searches;
    assert.throws(() => restoreGame(JSON.stringify(saved)), /search counts/);
  }
  assert.deepEqual(restoreGame(JSON.stringify(createGame())).searches, {});
});
