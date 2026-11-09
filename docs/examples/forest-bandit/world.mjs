// All game rules live here; rendering and input stay in app.js.
export const WORLD = { width: 960, height: 640, home: { x: 225, y: 239 } };
export const ITEMS = {
  berry: { name: 'Bramble berries', icon: 'berry', value: 2, rarity: 'common', note: 'One for the basket. One for the bandit.' },
  mushroom: { name: 'Honeycap', icon: 'mushroom', value: 3, rarity: 'common', note: 'Smells like a very small pancake.' },
  twig: { name: 'Excellent twig', icon: 'twig', value: 1, rarity: 'common', note: 'Structurally sound. Emotionally supportive.' },
  acorn: { name: 'Pocket acorn', icon: 'acorn', value: 2, rarity: 'common', note: 'A tree, still in its travel case.' },
  button: { name: 'Brass button', icon: 'button', value: 5, rarity: 'uncommon', note: 'Someone is having a breezy afternoon.' },
  ribbon: { name: 'Lost ribbon', icon: 'ribbon', value: 5, rarity: 'uncommon', note: 'For tying things together. Mostly outfits.' },
  pebble: { name: 'Smooth pebble', icon: 'pebble', value: 2, rarity: 'common', note: 'An extremely good pebble, objectively.' },
  feather: { name: 'Blue feather', icon: 'feather', value: 6, rarity: 'uncommon', note: 'A tiny piece of sky with a handle.' },
  bottle: { name: 'Dewdrop bottle', icon: 'bottle', value: 7, rarity: 'uncommon', note: 'Contains a sip of this morning.' },
  teacup: { name: 'Thimble teacup', icon: 'teacup', value: 9, rarity: 'uncommon', note: 'Tea for someone with a very little problem.' },
  moonstone: { name: 'Moonstone', icon: 'moonstone', value: 18, rarity: 'rare', note: 'The moon insists it has no idea where this came from.' },
  firefly: { name: 'Firefly lantern', icon: 'firefly', value: 20, rarity: 'rare', note: 'A willing travelling companion. Paid in compliments.' },
  crown: { name: 'King of the Acorns', icon: 'crown', value: 50, rarity: 'legendary', note: 'A crown for a ruler with absolutely no responsibilities.' }
};
export const SPOTS = [
  { id: 'berries', name: 'Bramble patch', x: 400, y: 280, icon: 'berry', cost: 1, hint: 'Berries, acorns & little surprises', verb: 'Pick berries' },
  { id: 'hollow', name: 'Hollow log', x: 258, y: 523, icon: 'twig', cost: 1, hint: 'Twigs, acorns & forgotten shinies', verb: 'Rummage around' },
  { id: 'mushrooms', name: 'Mushroom nook', x: 121, y: 447, icon: 'mushroom', cost: 1, hint: 'Honeycaps love a drizzly day', verb: 'Gather honeycaps' },
  { id: 'picnic', name: 'Old picnic', x: 558, y: 369, icon: 'teacup', cost: 1, hint: 'Buttons, ribbons & abandoned tea', verb: 'Investigate picnic' },
  { id: 'pond', name: 'Willow pond', x: 761, y: 233, icon: 'bottle', cost: 1, tool: 'net', hint: 'Pebbles, feathers & bottled dew', verb: 'Sweep the shallows' },
  { id: 'ruins', name: 'Moonlit ruins', x: 760, y: 482, icon: 'moonstone', cost: 2, tool: 'shovel', hint: 'Two daylight • the good mysterious stuff', verb: 'Unearth a treasure' }
];
export const REQUESTS = [
  { id: 'tea', who: 'Mabel the badger', face: 'badger', title: 'A little tea party', line: '“Something sweet, something mushroomy. You know the sort.”', needs: { berry: 4, mushroom: 2 }, reward: 18 },
  { id: 'nest', who: 'Pip the owl', face: 'owl', title: 'A nest with character', line: '“Twigs for the walls. Acorns for the aesthetic.”', needs: { twig: 5, acorn: 3 }, reward: 22 },
  { id: 'outfit', who: 'Juniper the rabbit', face: 'rabbit', title: 'Best-dressed in the woods', line: '“Is it too much? It is not nearly enough.”', needs: { button: 2, ribbon: 1 }, reward: 24 },
  { id: 'shelf', who: 'Fern the frog', face: 'frog', title: 'The tiny museum', line: '“Three rocks, a feather, a bottle. Culture, darling.”', needs: { pebble: 3, feather: 1, bottle: 1 }, reward: 32 }
];
export const UPGRADES = {
  pack: { name: 'Roomier satchel', icon: 'pack', cost: 16, max: 2, note: '+6 backpack spaces per upgrade' },
  net: { name: 'Little pond net', icon: 'net', cost: 18, max: 1, note: 'Explore the shallows at Willow pond' },
  shovel: { name: 'Trusty trowel', icon: 'shovel', cost: 28, max: 1, note: 'Uncover the treasures in the ruins' },
  lantern: { name: 'Last-light lantern', icon: 'firefly', cost: 22, max: 1, note: '+4 daylight for every outing' },
  charm: { name: 'Lucky little charm', icon: 'moonstone', cost: 24, max: 1, note: 'More rare finds & more sparkly treasures' }
};
export const WEATHER = {
  sunny: { label: 'Golden afternoon', icon: 'sun', note: 'Warm paws. Excellent rummaging weather.' },
  drizzle: { label: 'A little drizzle', icon: 'rain', note: 'Honeycaps and berries grow in extra handfuls.' },
  fireflies: { label: 'Firefly evening', icon: 'firefly', note: 'The tiny lantern keepers are out tonight.' }
};
export const capacity = state => 8 + state.upgrades.pack * 6;
export const daylight = state => 12 + state.upgrades.lantern * 4;
export const bagSize = state => state.bag.reduce((sum, item) => sum + item.qty, 0);
export const atHome = state => Math.hypot(state.position.x - WORLD.home.x, state.position.y - WORLD.home.y) < 67;
export const countItem = (items, id) => items.filter(item => item.id === id).reduce((sum, item) => sum + item.qty, 0);
export const upgradeCost = (state, id) => UPGRADES[id].cost * (state.upgrades[id] + 1);
export const weatherFor = state => {
  if (state.day === 1) return 'sunny';
  let hash = 0;
  for (const char of state.seed) hash = (Math.imul(hash, 31) + char.charCodeAt(0)) | 0;
  return ['sunny', 'drizzle', 'fireflies'][((hash + state.day) % 3 + 3) % 3];
};
export function createGame (seed = 'mosswood') {
  return { version: 1, rng: null, seed: String(seed).trim().slice(0, 64) || 'mosswood', day: 1, energy: 12, coins: 0, position: { ...WORLD.home }, bag: [], stash: [], pending: [], discovered: [], completed: [], upgrades: { pack: 0, net: 0, shovel: 0, lantern: 0, charm: 0 }, searches: {}, stats: { searches: 0, traded: 0 }, lastTrace: [], lastSpot: null };
}
function addStack (items, item) {
  const existing = items.find(other => other.id === item.id && other.sparkly === item.sparkly);
  if (existing) existing.qty += item.qty;
  else items.push({ ...item });
}
function requireHome (state) {
  if (!atHome(state)) throw new Error('Head back to your den first.');
  if (state.pending.length) throw new Error('Finish sorting your finds first.');
}
export function searchProblem (state, id) {
  const spot = SPOTS.find(spot => spot.id === id);
  if (!spot) return 'That spot is not in Mosswood.';
  if (state.pending.length) return 'Finish sorting your finds first.';
  if (spot.tool && !state.upgrades[spot.tool]) return `Visit the den to get a ${UPGRADES[spot.tool].name.toLowerCase()}.`;
  if ((state.searches[id] ?? 0) >= 3) return 'Picked clean for today. More treasures tomorrow.';
  if (state.energy < spot.cost) return 'Time to head home and start a fresh day.';
  if (bagSize(state) >= capacity(state)) return 'Your satchel is full. Head home to stash your finds.';
  if (Math.hypot(state.position.x - spot.x, state.position.y - spot.y) > 68) return 'Wander a little closer first.';
  return null;
}
// Nested tables share the same registered callbacks. Conditions see the current
// player/weather; modifiers change individual rewards, not the definitions.
function lootTable (state, id, UltraLoot) {
  const ul = new UltraLoot(`forest-bandit-v1|${state.seed}`);
  if (state.rng) ul.setRng(ul.getRngConstructor().unserialize(state.rng));
  ul.registerCondition('evening', ({ context }) => context.weather === 'fireflies');
  ul.registerCondition('notCollected', ({ looter, args }) => !looter.discovered.includes(args.id));
  ul.registerFunction('woodlandQuality', ({ looted, rng, context, looter }) => {
    looted.item.sparkly = rng.random() < (looter.upgrades.charm ? 0.22 : 0.08);
    if (context.weather === 'drizzle' && ['berry', 'mushroom'].includes(looted.id)) looted.qty++;
  });
  const entry = (item, weight = 1, qty = 1, extra = {}) => ({ id: item, name: ITEMS[item].name, item: { id: item, sparkly: false }, weight, qty, functions: [{ function: 'woodlandQuality' }], ...extra });
  const shinies = ul.createTable({ id: 'shared-shinies', pools: [{ id: 'shiny-items', entries: [entry('button', 4), entry('ribbon', 3), entry('teacup', 2), entry('moonstone', state.upgrades.charm ? 2 : 0.7)] }] });
  const common = {
    berries: [entry('berry', 1, { type: 'integer', min: 1, max: 3 })],
    mushrooms: [entry('mushroom', 1, { type: 'integer', min: 1, max: 3 })],
    hollow: [entry('twig', 3, { type: 'integer', min: 2, max: 4 }), entry('acorn', 2, { type: 'integer', min: 1, max: 3 })],
    picnic: [entry('button', 3), entry('ribbon', 3), entry('teacup', 1)],
    pond: [entry('pebble', 3, { type: 'integer', min: 1, max: 3 }), entry('feather', 2), entry('bottle', 2)],
    ruins: [entry('moonstone', 2), entry('button', 3), entry('teacup', 2)]
  };
  return ul.createTable({
    id: `woodland-${id}`,
    pools: [
      { id: 'local-finds', entries: common[id] },
      {
        id: 'little-surprises',
        nulls: id === 'ruins' ? 1 : 5,
        entries: [
          { id: 'shiny-cache', item: shinies, weight: state.upgrades.charm ? 2 : 1 },
          entry('acorn', id === 'berries' || id === 'hollow' ? 3 : 0.5),
          entry('firefly', 1, 1, { conditions: [{ function: 'evening' }, { function: 'notCollected', args: { id: 'firefly' } }] }),
          entry('crown', id === 'ruins' ? 2 : 0.08, 1, { unique: true, conditions: [{ function: 'notCollected', args: { id: 'crown' } }] })
        ]
      }
    ]
  });
}
export function search (state, id, UltraLoot) {
  const problem = searchProblem(state, id);
  if (problem) throw new Error(problem);
  const trace = [];
  const table = lootTable(state, id, UltraLoot);
  const rewards = table.rollSync({ looter: state, context: { weather: weatherFor(state) }, trace: event => trace.push(event) });
  state.rng = table.rng.serialize();
  state.pending = [];
  for (const reward of rewards) if (reward.qty > 0) addStack(state.pending, { id: reward.id, qty: reward.qty, sparkly: Boolean(reward.item.sparkly) });
  state.energy -= SPOTS.find(spot => spot.id === id).cost;
  state.searches[id] = (state.searches[id] ?? 0) + 1;
  state.stats.searches++;
  state.lastTrace = trace;
  state.lastSpot = id;
  return state.pending;
}
export function takeFind (state, index) {
  const item = state.pending[index];
  if (!item) return 0;
  const qty = Math.min(item.qty, capacity(state) - bagSize(state));
  if (qty <= 0) return 0;
  addStack(state.bag, { ...item, qty });
  if (!state.discovered.includes(item.id)) state.discovered.push(item.id);
  item.qty -= qty;
  if (!item.qty) state.pending.splice(index, 1);
  return qty;
}
export function takeAll (state) {
  let kept = 0;
  for (let i = state.pending.length - 1; i >= 0; i--) kept += takeFind(state, i);
  return kept;
}
export function leaveFinds (state) { state.pending = []; }
export function discardBagItem (state, index) { state.bag.splice(index, 1); }
export function deposit (state) {
  requireHome(state);
  const count = bagSize(state);
  for (const item of state.bag) addStack(state.stash, item);
  state.bag = [];
  return count;
}
export const canDeliver = (state, request) => !state.completed.includes(request.id) && Object.entries(request.needs).every(([id, qty]) => countItem(state.stash, id) >= qty);
export function deliver (state, id) {
  requireHome(state);
  const request = REQUESTS.find(request => request.id === id);
  if (!request || !canDeliver(state, request)) throw new Error('Stash the requested finds at home first.');
  for (const [itemId, required] of Object.entries(request.needs)) {
    let remaining = required;
    for (const item of state.stash) {
      if (item.id === itemId) {
        const used = Math.min(remaining, item.qty); item.qty -= used; remaining -= used;
      }
    }
  }
  state.stash = state.stash.filter(item => item.qty > 0);
  state.completed.push(id);
  state.coins += request.reward;
  return request;
}
export function trade (state) {
  requireHome(state);
  const reserve = {};
  for (const request of REQUESTS) {
    if (!state.completed.includes(request.id)) {
      for (const [id, qty] of Object.entries(request.needs)) reserve[id] = (reserve[id] ?? 0) + qty;
    }
  }
  let coins = 0;
  for (const item of state.stash) {
    if (['crown', 'firefly'].includes(item.id)) continue;
    const saved = Math.min(reserve[item.id] ?? 0, item.qty);
    reserve[item.id] = Math.max(0, (reserve[item.id] ?? 0) - saved);
    const sold = item.qty - saved;
    coins += sold * ITEMS[item.id].value * (item.sparkly ? 2 : 1);
    item.qty = saved;
  }
  state.stash = state.stash.filter(item => item.qty > 0);
  state.coins += coins; state.stats.traded += coins;
  return coins;
}
export function buy (state, id) {
  requireHome(state);
  const upgrade = UPGRADES[id];
  if (!upgrade || state.upgrades[id] >= upgrade.max) throw new Error('That upgrade is already complete.');
  const cost = upgradeCost(state, id);
  if (state.coins < cost) throw new Error(`You need ${cost - state.coins} more woodland coins.`);
  state.coins -= cost; state.upgrades[id]++;
  if (id === 'lantern') state.energy += 4;
  return upgrade;
}
export function nextDay (state) {
  requireHome(state); deposit(state);
  state.day++; state.energy = daylight(state); state.searches = {};
  return weatherFor(state);
}
export function restoreGame (text) {
  const saved = JSON.parse(text);
  if (saved?.version !== 1 || typeof saved.seed !== 'string' || !saved.seed.trim() || saved.seed.length > 64) throw new Error('Unrecognised Forest Bandit save.');
  const integer = (value, min, max) => Number.isSafeInteger(value) && value >= min && value <= max;
  if (!integer(saved.day, 1, 100000) || !integer(saved.coins, 0, 100000000) || !saved.upgrades) throw new Error('Invalid save values.');
  for (const [id, upgrade] of Object.entries(UPGRADES)) if (!integer(saved.upgrades[id], 0, upgrade.max)) throw new Error('Invalid upgrade.');
  if (!integer(saved.energy, 0, daylight(saved))) throw new Error('Invalid daylight.');
  for (const key of ['bag', 'stash', 'pending']) {
    if (!Array.isArray(saved[key]) || saved[key].length > 100) throw new Error('Invalid inventory.');
    for (const item of saved[key]) if (!Object.hasOwn(ITEMS, item.id) || !integer(item.qty, 1, 100000) || typeof item.sparkly !== 'boolean') throw new Error('Invalid item.');
  }
  if (saved.rng !== null && (!saved.rng || !Number.isSafeInteger(saved.rng.seed) || !Number.isSafeInteger(saved.rng.m_z) || saved.rng.mask !== 4294967295 || saved.rng.samplingVersion !== 2)) throw new Error('Invalid RNG state.');
  if (bagSize(saved) > capacity(saved)) throw new Error('Overfull save.');
  if (!Array.isArray(saved.completed) || new Set(saved.completed).size !== saved.completed.length || saved.completed.some(id => !REQUESTS.some(request => request.id === id))) throw new Error('Invalid requests.');
  if (!Array.isArray(saved.discovered) || saved.discovered.some(id => !Object.hasOwn(ITEMS, id))) throw new Error('Invalid field guide.');
  if (!saved.position || !Number.isFinite(saved.position.x) || !Number.isFinite(saved.position.y)) throw new Error('Invalid position.');
  if (!saved.searches || typeof saved.searches !== 'object' || Array.isArray(saved.searches) || Object.entries(saved.searches).some(([id, count]) => !SPOTS.some(spot => spot.id === id) || !integer(count, 0, 3))) throw new Error('Invalid search counts.');
  const result = { ...createGame(saved.seed), ...saved, lastTrace: [], lastSpot: SPOTS.some(spot => spot.id === saved.lastSpot) ? saved.lastSpot : null };
  result.stats = { searches: integer(saved.stats?.searches, 0, 10000000) ? saved.stats.searches : 0, traded: integer(saved.stats?.traded, 0, 100000000) ? saved.stats.traded : 0 };
  result.position = { x: Math.max(45, Math.min(915, saved.position.x)), y: Math.max(75, Math.min(585, saved.position.y)) };
  return result;
}
