import { WORLD, ITEMS, SPOTS, REQUESTS, UPGRADES, WEATHER, createGame, restoreGame, capacity, daylight, bagSize, atHome, countItem, upgradeCost, weatherFor, searchProblem, search, takeFind, takeAll, leaveFinds, discardBagItem, deposit, canDeliver, deliver, trade, buy, nextDay } from './world.mjs';
import { drawIcon, iconNode } from './pixels.mjs';

const $ = id => document.getElementById(id);
const SAVE = 'forest-bandit:v1';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let state = createGame(); let resumed = false; let saveError = false;
try { const saved = localStorage.getItem(SAVE); if (saved) { state = restoreGame(saved); resumed = true; } } catch { saveError = true; }
let tab = 'bag'; let target = null; let nearest = 'home'; let sound = false; let audio; let toastTimer; let facing = 1; let walking = false;
const keys = new Set(); const particles = []; const floating = [];
const canvas = $('world'); const ctx = canvas.getContext('2d');
const mapImage = new window.Image(); const banditImage = new window.Image();
mapImage.src = 'assets/mosswood.png'; banditImage.src = 'assets/bandit.png';
const anyDialog = () => Boolean(document.querySelector('dialog[open]'));
const node = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined) element.textContent = text; return element; };
function toast (message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4200); }
function save () {
  try { localStorage.setItem(SAVE, JSON.stringify({ ...state, lastTrace: [] })); $('save-status').textContent = 'Adventure saved on this device'; $('save-status').classList.remove('storage-warning'); } catch { $('save-status').textContent = 'Saving unavailable in this browser'; $('save-status').classList.add('storage-warning'); }
}
function chime (kind = 'find') {
  if (!sound) return;
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)(); audio.resume();
    const frequencies = kind === 'reward' ? [392, 494, 587, 784] : kind === 'step' ? [220] : [523, 659, 784];
    frequencies.forEach((frequency, index) => {
      const oscillator = audio.createOscillator(); const gain = audio.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      const start = audio.currentTime + index * 0.09;
      gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(0.045, start + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(start); oscillator.stop(start + 0.35);
    });
  } catch { sound = false; $('sound').textContent = 'Sound unavailable'; $('sound').setAttribute('aria-pressed', 'false'); }
}
function burst (x, y) {
  if (reduced) return;
  for (let i = 0; i < 16; i++) particles.push({ x, y: y - 20, vx: Math.cos(i * 2.4) * (20 + i * 3), vy: -50 - i * 4, life: 1.2, color: ['#f3d78c', '#e8f2b5', '#cfb5d5'][i % 3] });
}
function commit (message) { save(); renderUI(); if (message) toast(message); }
function runAction (action) { try { action(); } catch (error) { toast(error.message); } }
function setTab (value) {
  tab = value;
  for (const button of document.querySelectorAll('[data-tab]')) { button.setAttribute('aria-selected', String(button.dataset.tab === tab)); button.tabIndex = button.dataset.tab === tab ? 0 : -1; }
  $('notebook-page').setAttribute('aria-labelledby', `tab-${tab}`); renderPage();
}
function emptyBag () {
  const empty = node('div', 'empty-bag'); empty.append(iconNode('pack', 64), node('h3', '', 'Room for a little wonder.'), node('p', '', 'The best things in the woods are usually hiding under something.'));
  const mission = node('div', 'first-mission'); mission.append(node('p', 'eyebrow', 'YOUR FIRST GOOD DEED'), node('strong', '', 'Tea with Mabel'), node('p', '', 'Find 4 berries and 2 honeycaps, then stash them at home.'));
  const go = node('button', '', 'Find the bramble patch →'); go.onclick = () => goTo('berries'); mission.append(go); empty.append(mission); return empty;
}
function itemRow (item, index, removable = false) {
  const definition = ITEMS[item.id]; const row = node('div', `item-row rarity-${definition.rarity}`);
  const text = node('div', 'item-text'); text.append(node('strong', '', `${item.sparkly ? '✧ Sparkly ' : ''}${definition.name}`), node('small', '', `${definition.rarity} · ${definition.value * (item.sparkly ? 2 : 1)} coins each`));
  row.append(iconNode(definition.icon), text, node('span', 'item-qty', `×${item.qty}`));
  if (removable) { const drop = node('button', 'discard', '×'); drop.setAttribute('aria-label', `Leave ${item.qty} ${definition.name} behind`); drop.title = 'Leave this stack behind'; drop.onclick = () => { discardBagItem(state, index); commit(`Left ${definition.name.toLowerCase()} for another little bandit.`); }; row.append(drop); }
  return row;
}
function heading (text, detail) { const wrap = node('div', 'page-heading'); wrap.append(node('h3', '', text), node('span', '', detail)); return wrap; }
function actionButton (text, handler, disabled = false, primary = false) { const button = node('button', primary ? 'primary' : '', text); button.disabled = disabled; button.onclick = () => runAction(handler); return button; }
function renderPage () {
  const page = $('notebook-page'); const scroll = page.scrollTop; page.replaceChildren(); const home = atHome(state);
  if (tab === 'bag') {
    page.append(heading('Your satchel', `${bagSize(state)} / ${capacity(state)} spaces`));
    if (!state.bag.length) page.append(emptyBag());
    else {
      const list = node('div', 'inventory-list'); state.bag.forEach((item, index) => list.append(itemRow(item, index, true))); page.append(list);
      const actions = node('div', 'bag-actions'); actions.append(actionButton(home ? 'Stash all finds' : 'Head home to stash', () => { if (atHome(state)) commit(`Stashed ${deposit(state)} little treasures. Safe and sound.`); else goTo('home'); }, false, true)); page.append(actions);
      page.append(node('p', 'small-note', 'Each item takes one space. Sparkly finds trade for double. Leaving a stack makes room for something new.'));
    }
  } else if (tab === 'requests') {
    page.append(heading('A few good neighbours', `${state.completed.length} / 4 helped`));
    if (!home) page.append(node('p', 'small-note', 'Gather what they need, then stash it at the den. Deliveries happen at home.'));
    for (const request of REQUESTS) {
      const complete = state.completed.includes(request.id); const card = node('article', `request-card${complete ? ' complete' : ''}`);
      const person = node('div', 'request-person'); const portrait = node('div', 'portrait'); portrait.append(iconNode(request.face)); const title = node('div'); title.append(node('small', '', request.who), node('h3', '', request.title)); person.append(portrait, title); card.append(person, node('p', '', request.line));
      const ingredients = node('div', 'ingredients');
      for (const [id, qty] of Object.entries(request.needs)) {
        const stored = countItem(state.stash, id); const carried = countItem(state.bag, id); const ingredient = node('span', `ingredient${stored >= qty || complete ? ' ready' : ''}`, `${complete ? '✓' : `${Math.min(stored, qty)}/${qty}`} ${ITEMS[id].name}`);
        if (carried && !complete) ingredient.title = `${carried} more in your satchel; stash them first`; ingredients.append(ingredient);
      }
      card.append(ingredients, actionButton(complete ? 'Delivered with a little love ✓' : `Deliver · earn ${request.reward} coins`, () => {
        const delivered = deliver(state, request.id); chime('reward'); burst(state.position.x, state.position.y); commit(`${delivered.who} is delighted. +${delivered.reward} woodland coins.`);
        if (state.completed.length === REQUESTS.length) { $('victory-stats').textContent = `${state.day} woodland days · ${state.discovered.length} discoveries · ${state.stats.searches} little adventures.`; $('victory').showModal(); }
      }, complete || !home || !canDeliver(state, request), !complete && canDeliver(state, request)));
      page.append(card);
    }
  } else if (tab === 'den') {
    page.append(heading('Make yourself at home', home ? 'You are home' : 'Visit the den to upgrade'));
    page.append(node('p', 'den-note', 'Trade spare finds for woodland coins. Anything still needed for a neighbour’s request is kept safe. Your crown and firefly stay with you, too.'));
    const actions = node('div', 'bag-actions');
    actions.append(actionButton('Stash satchel', () => commit(`Stashed ${deposit(state)} treasures.`), !home || !state.bag.length, true), actionButton('Trade spare finds', () => { const coins = trade(state); if (coins) chime('reward'); commit(coins ? `Spare finds traded for ${coins} coins. Request ingredients kept safe.` : 'Nothing spare yet. We saved what your neighbours need.'); }, !home || !state.stash.length)); page.append(actions);
    for (const [id, upgrade] of Object.entries(UPGRADES)) {
      const maxed = state.upgrades[id] >= upgrade.max; const row = node('div', 'upgrade-card'); const info = node('div'); info.append(node('strong', '', upgrade.name), node('p', '', upgrade.note));
      row.append(iconNode(upgrade.icon), info, actionButton(maxed ? 'Yours ✓' : `${upgradeCost(state, id)} coins`, () => { const bought = buy(state, id); chime('reward'); commit(`${bought.name} is yours. ${bought.note}.`); }, maxed || !home || state.coins < upgradeCost(state, id))); page.append(row);
    }
    const sleep = actionButton('Sleep & start a fresh day ☀', () => { const weather = nextDay(state); chime('step'); commit(`Day ${state.day}. ${WEATHER[weather].note}`); }, !home, true); sleep.classList.add('wide'); sleep.style.marginTop = '17px'; page.append(sleep);
    page.append(heading('Safe in your hollow', `${state.stash.reduce((sum, item) => sum + item.qty, 0)} finds`)); page.lastChild.classList.add('stash-heading');
    const stash = node('div', 'inventory-list stash-list'); state.stash.forEach((item, index) => stash.append(itemRow(item, index))); page.append(stash);
    if (!state.stash.length) page.append(node('p', 'small-note', 'A fine empty shelf. Let’s put something wonderful on it.'));
  } else {
    page.append(heading('Almost-useful treasures', `${state.discovered.length} / ${Object.keys(ITEMS).length}`)); page.append(node('p', 'small-note', 'A record of everything you’ve brought home in your pockets. Find the legendary acorn crown in the ruins.'));
    const grid = node('div', 'guide-grid');
    for (const [id, item] of Object.entries(ITEMS)) {
      const known = state.discovered.includes(id); const cell = node('div', `guide-item${known ? '' : ' unknown'}`); cell.title = known ? `${item.name}: ${item.note}` : 'An undiscovered little wonder'; cell.append(iconNode(item.icon), node('span', '', known ? item.name : '???')); grid.append(cell);
    }
    page.append(grid);
  }
  page.scrollTop = scroll;
}
function renderUI () {
  $('day').textContent = state.day; $('coins').textContent = state.coins; $('seed-name').textContent = state.seed;
  $('light-label').textContent = `${state.energy} daylight left`; $('light-fill').style.width = `${state.energy / daylight(state) * 100}%`;
  $('weather-name').textContent = WEATHER[weatherFor(state)].label;
  $('bag-count').textContent = `${bagSize(state)}/${capacity(state)}`; $('request-count').textContent = `${state.completed.length}/4`;
  $('tab-requests').classList.toggle('attention', REQUESTS.some(request => canDeliver(state, request)));
  $('objective').textContent = state.completed.length === 4 ? 'An honorary Forest Bandit. The woods are lucky to have you.' : state.completed.length === 0 ? 'Make Mabel’s tea party happen. Four berries. Two honeycaps. One happy badger.' : `${state.completed.length} happy ${state.completed.length === 1 ? 'neighbour' : 'neighbours'}. ${4 - state.completed.length} more little good deeds to go.`;
  $('map-caption').textContent = state.energy === 0 ? 'A good day’s banditing. Time to head home.' : weatherFor(state) === 'drizzle' ? 'A little rain makes the honeycaps happy.' : state.completed.length === 4 ? 'Your woodland. Your very good neighbours.' : 'A whole forest of almost-useful things.';
  $('destinations').replaceChildren();
  for (const spot of SPOTS) { const locked = spot.tool && !state.upgrades[spot.tool]; const button = node('button', '', `${locked ? '⌑ ' : ''}${spot.name}`); button.dataset.locked = Boolean(locked); button.title = locked ? `Requires ${UPGRADES[spot.tool].name}` : spot.hint; button.onclick = () => goTo(spot.id); $('destinations').append(button); }
  renderPage(); updateInteraction(true);
}
function closest () {
  const locations = [{ id: 'home', ...WORLD.home }, ...SPOTS];
  return locations.find(spot => Math.hypot(state.position.x - spot.x, state.position.y - spot.y) < (spot.id === 'home' ? 67 : 64))?.id ?? null;
}
function updateInteraction (force = false) {
  const found = closest(); if (!force && found === nearest) return; const changedHome = (nearest === 'home') !== (found === 'home'); nearest = found;
  if (found === 'home') {
    $('place-eyebrow').textContent = 'HOME, SWEET HOLLOW'; $('place-name').textContent = 'Your little den'; $('place-hint').textContent = 'Stash finds, help a neighbour, make yourself at home.';
    $('interact').textContent = state.bag.length ? 'Stash your finds →' : 'Open the den →'; $('interact').disabled = false;
  } else if (found) {
    const spot = SPOTS.find(spot => spot.id === found); const problem = searchProblem(state, found);
    $('place-eyebrow').textContent = `${3 - (state.searches[found] ?? 0)} SEARCHES LEFT TODAY`; $('place-name').textContent = spot.name;
    $('place-hint').textContent = problem ?? `${spot.hint} · ${spot.cost} daylight`; $('interact').textContent = problem ? 'Take a little breather' : `${spot.verb} →`; $('interact').disabled = Boolean(problem);
  } else {
    $('place-eyebrow').textContent = 'A LITTLE WANDER'; $('place-name').textContent = 'Follow your curiosity'; $('place-hint').textContent = 'Tap a woodland spot below, or walk up to something interesting.'; $('interact').textContent = 'Wander closer'; $('interact').disabled = true;
  }
  if (changedHome && !force) renderPage();
}
function goTo (id) {
  if (anyDialog()) return;
  const destination = id === 'home' ? WORLD.home : SPOTS.find(spot => spot.id === id); if (!destination) return;
  if (destination.tool && !state.upgrades[destination.tool]) { toast(`Get a ${UPGRADES[destination.tool].name.toLowerCase()} at your den first.`); setTab('den'); return; }
  target = { x: destination.x, y: destination.y + (id === 'home' ? 0 : 16), id };
  if (reduced) { state.position = { x: target.x, y: target.y }; arrive(); }
  $('world').focus({ preventScroll: true });
}
function arrive () { const id = target?.id; target = null; walking = false; save(); updateInteraction(true); if (id && id !== 'home') interact(); else if (id === 'home') { chime('step'); if (state.bag.length) toast('Home again. Stash your finds to make a little space.'); setTab('den'); } }
function interact () {
  if (anyDialog()) return;
  runAction(() => {
    if (nearest === 'home') { if (state.bag.length) commit(`Stashed ${deposit(state)} finds. Your neighbours will be pleased.`); setTab('den'); return; }
    if (!nearest) return;
    search(state, nearest, window.UltraLoot); target = null; chime(); save(); renderUI(); openFinds();
  });
}
function openFinds () {
  $('finds-location').textContent = (SPOTS.find(spot => spot.id === state.lastSpot)?.name ?? 'A little discovery').toUpperCase();
  renderFinds(); if (!$('finds').open) $('finds').showModal();
}
function renderFinds () {
  $('finds-items').replaceChildren(); const free = capacity(state) - bagSize(state);
  $('finds-capacity').textContent = free ? `${free} spaces in your satchel. What shall we take?` : 'A very full satchel. Leave the rest for the forest, or make space on your next outing.';
  for (const [index, item] of state.pending.entries()) {
    const definition = ITEMS[item.id]; const row = node('div', `find-card rarity-${definition.rarity}`); const text = node('div'); text.append(node('small', '', item.sparkly ? `Sparkly ${definition.rarity} · double trade value` : definition.rarity), node('strong', '', `${definition.name} ×${item.qty}`), node('p', '', definition.note));
    row.append(iconNode(definition.icon, 48), text, actionButton(free ? `Keep ${Math.min(free, item.qty)}` : 'Full', () => { const kept = takeFind(state, index); afterPacking(kept); }, !free)); $('finds-items').append(row);
  }
  $('take-all').disabled = free === 0; $('take-all').textContent = state.pending.reduce((sum, item) => sum + item.qty, 0) > free ? `Pack what fits (${free}) →` : 'Pack these finds →';
}
function afterPacking (kept) {
  if (kept) { chime(); burst(state.position.x, state.position.y); floating.push({ text: `+${kept} little treasures`, x: state.position.x, y: state.position.y - 70, life: 1.7 }); }
  commit(); if (state.pending.length) renderFinds(); else { $('finds').close(); $('world').focus({ preventScroll: true }); toast(bagSize(state) === capacity(state) ? 'Satchel full! Head home to stash your treasures.' : `${kept} finds tucked safely away.`); }
}
$('take-all').onclick = () => afterPacking(takeAll(state));
$('leave-finds').onclick = () => { leaveFinds(state); $('finds').close(); commit('A little something left for the next wanderer.'); $('world').focus({ preventScroll: true }); };
$('finds').addEventListener('cancel', event => { event.preventDefault(); toast('Pack your favourites, or choose “Leave the rest”.'); });
$('interact').onclick = interact; $('home').onclick = () => goTo('home');
for (const button of document.querySelectorAll('[data-tab]')) button.onclick = () => setTab(button.dataset.tab);
document.querySelector('.tabs').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault(); const names = ['bag', 'requests', 'den', 'guide']; const index = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (names.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : 3)) % 4; setTab(names[index]); $(`tab-${tab}`).focus();
});
$('sound').onclick = () => { sound = !sound; $('sound').textContent = sound ? 'Sound on' : 'Sound off'; $('sound').setAttribute('aria-pressed', String(sound)); if (sound) chime(); };
$('help').onclick = () => { target = null; $('welcome').showModal(); }; $('begin').onclick = () => { $('welcome').close(); $('world').focus({ preventScroll: true }); save(); };
$('seed-button').onclick = () => { $('seed-input').value = state.seed; $('seed-dialog').showModal(); };
$('cancel-seed').onclick = () => $('seed-dialog').close();
$('seed-form').onsubmit = event => { event.preventDefault(); state = createGame($('seed-input').value); target = null; particles.length = 0; floating.length = 0; $('seed-dialog').close(); setTab('bag'); commit('A fresh patch of woods. A fresh little adventure.'); };
$('keep-playing').onclick = () => $('victory').close();
$('trace-button').onclick = () => {
  $('trace-summary').replaceChildren();
  if (!state.lastTrace.length) $('trace-summary').append(node('p', 'small-note', 'Search a woodland spot first. Traces are kept for this play session.'));
  for (const event of state.lastTrace) {
    let text;
    if (event.type === 'condition') text = `${event.name}: ${event.passed ? 'allowed' : 'not this time'}${event.entryId ? ` · ${ITEMS[event.entryId]?.name ?? event.entryId}` : ''}`;
    if (event.type === 'choice') text = event.entryId ? `Found a path to: ${ITEMS[event.entryId]?.name ?? event.entryId}` : 'No bonus in this pool. Sometimes a twig is just a twig.';
    if (event.type === 'modifier') text = `${event.name}: final quantity ${event.quantity}`;
    if (text) $('trace-summary').append(node('div', 'trace-event', text));
  }
  $('trace-output').textContent = JSON.stringify(state.lastTrace, null, 2); $('trace-dialog').showModal();
};
$('close-trace').onclick = () => $('trace-dialog').close();
canvas.addEventListener('pointerdown', event => {
  if (anyDialog()) return;
  const rect = canvas.getBoundingClientRect(); const x = (event.clientX - rect.left) * WORLD.width / rect.width; const y = (event.clientY - rect.top) * WORLD.height / rect.height;
  const location = [{ id: 'home', ...WORLD.home }, ...SPOTS].find(spot => Math.hypot(x - spot.x, y - spot.y) < 55);
  if (location) goTo(location.id); else { target = { x: Math.max(45, Math.min(915, x)), y: Math.max(75, Math.min(585, y)) }; if (reduced) { state.position = { x: target.x, y: target.y }; arrive(); } canvas.focus({ preventScroll: true }); }
});
const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
window.addEventListener('keydown', event => {
  if (anyDialog() || ['INPUT', 'TEXTAREA', 'BUTTON', 'SUMMARY'].includes(document.activeElement?.tagName)) return;
  const key = event.key.toLowerCase();
  if (movementKeys.includes(key)) { event.preventDefault(); keys.add(key); target = null; }
  if (['e', ' '].includes(key)) { event.preventDefault(); if (!event.repeat) interact(); }
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => { keys.clear(); save(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { keys.clear(); save(); } });
window.addEventListener('pagehide', save);

function pixelLabel (text, x, y, active = false) {
  ctx.font = '600 12px ui-monospace, monospace'; const width = ctx.measureText(text).width + 18;
  ctx.fillStyle = '#172d28aa'; ctx.fillRect(Math.round(x - width / 2) + 2, y + 2, width, 24);
  ctx.fillStyle = active ? '#fff4cc' : '#f7f2deef'; ctx.fillRect(Math.round(x - width / 2), y, width, 22);
  ctx.fillStyle = active ? '#a26832' : '#3e5641'; ctx.textAlign = 'center'; ctx.fillText(text, x, y + 15);
}
function renderMap (time, dt) {
  ctx.imageSmoothingEnabled = false; ctx.drawImage(mapImage, 0, 0, 960, 640);
  const weather = weatherFor(state);
  if (weather !== 'sunny' || state.energy < 4) { ctx.fillStyle = weather === 'drizzle' ? '#2b4f6630' : '#29385928'; ctx.fillRect(0, 0, 960, 640); }
  // A picnic blanket, little empty bowls, and upgrade decorations belong to the
  // game layer rather than being baked into the generated environment artwork.
  ctx.fillStyle = '#c28a6a'; ctx.fillRect(534, 347, 49, 32); ctx.fillStyle = '#dfc09a';
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) ctx.fillRect(535 + i * 8, 348 + j * 8, 7, 7);
  drawIcon(ctx, 'teacup', 550, 352, 22);
  if (state.upgrades.lantern) drawIcon(ctx, 'firefly', 264, 210, 28);
  if (state.upgrades.net) drawIcon(ctx, 'net', 174, 224, 27);
  for (let i = 0; i < state.completed.length; i++) { ctx.fillStyle = ['#d69c64', '#b7c786', '#b6a0bb', '#e1c473'][i]; ctx.fillRect(252 + i * 14, 183 + i * 2, 9, 13); }
  for (const spot of SPOTS) {
    const locked = spot.tool && !state.upgrades[spot.tool]; const exhausted = (state.searches[spot.id] ?? 0) >= 3;
    const active = nearest === spot.id; const bob = reduced ? 0 : Math.sin(time * 2 + spot.x) * 2;
    ctx.globalAlpha = exhausted ? 0.6 : 1;
    ctx.fillStyle = active ? '#fff4c9' : '#f8f3dce6'; ctx.fillRect(spot.x - 15, spot.y - 47 + bob, 30, 30);
    ctx.strokeStyle = active ? '#d9b05f' : '#486448'; ctx.lineWidth = 2; ctx.strokeRect(spot.x - 15, spot.y - 47 + bob, 30, 30);
    drawIcon(ctx, spot.icon, spot.x - 12, spot.y - 44 + bob, 24);
    if (locked) { ctx.fillStyle = '#354e3e'; ctx.fillRect(spot.x + 8, spot.y - 30 + bob, 11, 12); ctx.fillStyle = '#e8d9b2'; ctx.fillRect(spot.x + 11, spot.y - 28 + bob, 5, 6); }
    pixelLabel(exhausted ? 'Back tomorrow' : spot.name, spot.x, spot.y + 16, active); ctx.globalAlpha = 1;
    if (!locked && !exhausted && !reduced) { const sparkle = (Math.sin(time * 2 + spot.y) + 1) / 2; ctx.fillStyle = `rgba(255,246,185,${sparkle})`; ctx.fillRect(spot.x + 22, spot.y - 22, 3, 9); ctx.fillRect(spot.x + 19, spot.y - 19, 9, 3); }
  }
  if (nearest !== 'home') pixelLabel('Your den', WORLD.home.x, WORLD.home.y + 25);
  if (target && !reduced) { ctx.strokeStyle = '#f8edb5bb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(target.x, target.y, 12 + Math.sin(time * 6) * 2, 5, 0, 0, Math.PI * 2); ctx.stroke(); }
  // Feet remain anchored while the raccoon bobs and leans during a walk.
  const player = state.position; const bob = reduced ? 0 : walking ? Math.abs(Math.sin(time * 13)) * 4 : Math.sin(time * 2.2) * 1.3;
  ctx.fillStyle = '#193f2a44'; ctx.beginPath(); ctx.ellipse(player.x, player.y + 2, 23, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(Math.round(player.x), Math.round(player.y - bob)); ctx.scale(facing, 1); if (walking && !reduced) ctx.rotate(Math.sin(time * 13) * 0.045); ctx.drawImage(banditImage, -36, -66, 72, 72); ctx.restore();
  for (let i = particles.length - 1; i >= 0; i--) { const p = particles[i]; p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += dt * 95; ctx.globalAlpha = Math.max(0, p.life / 1.2); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4); if (p.life <= 0) particles.splice(i, 1); } ctx.globalAlpha = 1;
  for (let i = floating.length - 1; i >= 0; i--) { const f = floating[i]; f.life -= dt; if (!reduced) f.y -= dt * 17; pixelLabel(f.text, f.x, f.y, true); if (f.life <= 0) floating.splice(i, 1); }
  if (weather === 'fireflies' && !reduced) for (let i = 0; i < 20; i++) { ctx.fillStyle = `rgba(255,241,143,${0.3 + 0.5 * Math.sin(time * 2 + i) ** 2})`; ctx.fillRect(90 + (i * 137) % 780 + Math.sin(time + i) * 9, 110 + (i * 97) % 440 + Math.cos(time * 0.7 + i) * 7, 3, 3); }
  if (weather === 'drizzle' && !reduced) { ctx.fillStyle = '#d1e5d443'; for (let i = 0; i < 32; i++) ctx.fillRect((i * 137 + time * 35) % 960, (i * 79 + time * 160) % 640, 1, 7); }
}
let previous = 0;
function frame (now) {
  const dt = Math.min((now - previous) / 1000 || 0, 0.04); previous = now;
  if (!anyDialog() && !document.hidden) {
    let dx = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
    let dy = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
    if (target && !dx && !dy) { dx = target.x - state.position.x; dy = target.y - state.position.y; if (Math.hypot(dx, dy) < 5) { arrive(); dx = dy = 0; } }
    const distance = Math.hypot(dx, dy); const wasWalking = walking; walking = distance > 0;
    if (walking) { const speed = Math.min(225 * dt, target ? distance : Infinity); state.position.x = Math.max(45, Math.min(915, state.position.x + dx / distance * speed)); state.position.y = Math.max(75, Math.min(585, state.position.y + dy / distance * speed)); if (dx) facing = dx < 0 ? -1 : 1; }
    if (wasWalking && !walking) save(); updateInteraction();
  } else { walking = false; keys.clear(); }
  renderMap(now / 1000, dt); window.requestAnimationFrame(frame);
}
async function init () {
  try {
    if (!window.UltraLoot) throw new Error('UltraLoot is not built yet. From the repository, run npm run ci, then serve docs over HTTP.');
    await Promise.all([mapImage.decode(), banditImage.decode()]); $('loading').hidden = true;
    setTab('bag'); renderUI(); window.requestAnimationFrame(frame);
    if (state.pending.length) openFinds(); else if (!resumed) $('welcome').showModal();
    if (saveError) toast('The previous save could not be read. A fresh adventure is ready.');
  } catch (error) { $('loading').textContent = error.message; $('loading').style.padding = '30px'; $('loading').style.fontSize = '16px'; }
}
init();
