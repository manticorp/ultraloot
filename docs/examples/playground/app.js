const $ = id => document.getElementById(id);
const samples = {
  coins: { id: 'root', pools: [{ rolls: 1, nulls: 2, entries: [{ id: 'coins', name: 'Coins', weight: 8, qty: '2d6' }, { id: 'gem', name: 'Emerald', weight: 1, qty: 1 }, { id: 'relic', name: 'Ancient relic', weight: 0.1, qty: 1 }] }] },
  unique: { id: 'root', pools: [{ rolls: 5, entries: [{ id: 'sword', name: 'Iron sword', unique: true, weight: 2 }, { id: 'shield', name: 'Oak shield', unique: true, weight: 1 }, { id: 'coins', name: 'Coins', weight: 4, qty: 3 }] }] },
  nested: { __version__: '0.3.0', tables: { root: { id: 'root', pools: [{ nulls: 1, entries: [{ type: 'table', item: 'treasure', weight: 2 }] }] }, treasure: { id: 'treasure', pools: [{ entries: [{ id: 'gem', name: 'Emerald', weight: 3 }, { id: 'crown', name: 'Golden crown', weight: 1 }] }] } } }
};
let worker;
const percent = value => `${(value * 100).toFixed(2)}%`;
function busy (value) { $('run').disabled = value; $('trace').disabled = value; $('cancel').hidden = !value; }
function stop () { worker?.terminate(); worker = undefined; busy(false); }
function persist () {
  try { localStorage.setItem('ultraloot-lab', JSON.stringify({ json: $('definition').value, seed: $('seed').value, sample: $('sample').value })); } catch {}
}
function invalidate () {
  stop();
  $('status').textContent = 'Definition changed. Ready to run.';
  $('trace-output').textContent = 'Trace one roll to inspect its decisions.';
  $('metric-rolls').textContent = '—'; $('metric-empty').textContent = '—'; $('metric-items').textContent = '—';
  $('results').replaceChildren(); $('table-wrap').hidden = true; $('empty').hidden = false;
  $('empty').textContent = 'Definition changed. Run a simulation to refresh the results.';
  $('run-label').textContent = 'No experiment yet'; $('trace-panel').open = false;
}
function render (result) {
  $('metric-rolls').textContent = result.iterations.toLocaleString();
  $('metric-empty').textContent = percent(result.noDropProbability);
  $('metric-items').textContent = result.items.length;
  $('empty').hidden = result.items.length > 0;
  $('empty').textContent = 'No items were observed. Check your conditions, weights, and sample size.';
  $('table-wrap').hidden = result.items.length === 0;
  $('results').replaceChildren();
  for (const item of result.items) {
    const row = document.createElement('tr');
    const label = document.createElement('td'); label.textContent = item.name ?? item.id ?? 'Unidentified item'; row.append(label);
    const probability = document.createElement('td'); probability.className = 'probability'; probability.textContent = percent(item.probability);
    const bar = document.createElement('span'); bar.className = 'bar'; const fill = document.createElement('i'); fill.style.width = percent(item.probability); bar.append(fill); probability.append(bar); row.append(probability);
    for (const value of [`${percent(item.probability95[0])} – ${percent(item.probability95[1])}`, item.meanQuantity.toFixed(3), item.rollsFor95Percent.toLocaleString()]) { const cell = document.createElement('td'); cell.textContent = value; row.append(cell); }
    $('results').append(row);
  }
}
function run (action) {
  stop();
  try {
    JSON.parse($('definition').value);
    const iterations = Number($('iterations').value);
    if (!Number.isSafeInteger(iterations) || iterations < 1 || iterations > 1000000) throw new Error('Choose a whole number of rolls between 1 and 1,000,000.');
    const payload = { action, iterations, seed: $('seed').value, json: $('definition').value, root: $('root').value, looter: JSON.parse($('looter').value), context: JSON.parse($('context').value) };
    worker = new Worker('worker.js'); busy(true); persist(); $('status').textContent = action === 'trace' ? 'Following one roll…' : `Simulating ${iterations.toLocaleString()} rolls…`;
    const start = performance.now();
    worker.onmessage = ({ data }) => {
      stop();
      if (data.error) { $('status').textContent = data.error; return; }
      if (data.result) { render(data.result); $('run-label').textContent = `Seed ${payload.seed} · ${Math.round(performance.now() - start)} ms`; }
      if (data.trace) { $('trace-output').textContent = JSON.stringify(data.trace, null, 2); $('trace-panel').open = true; $('trace-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      $('status').textContent = data.trace ? 'Trace ready below.' : 'Experiment complete.';
    };
    worker.onerror = event => { stop(); $('status').textContent = event.message || 'Worker could not load. Serve this folder over HTTP and build the library first.'; };
    worker.postMessage(payload);
  } catch (error) { $('status').textContent = error.message; }
}
$('definition').value = JSON.stringify(samples.coins, null, 2);
try { const saved = JSON.parse(localStorage.getItem('ultraloot-lab')); if (saved?.json) { $('definition').value = saved.json; $('seed').value = saved.seed; $('sample').value = saved.sample ?? 'custom'; } } catch {}
$('sample').onchange = () => { invalidate(); if (samples[$('sample').value]) $('definition').value = JSON.stringify(samples[$('sample').value], null, 2); persist(); };
$('run').onclick = () => run('simulate'); $('trace').onclick = () => run('trace');
$('cancel').onclick = () => { stop(); $('status').textContent = 'Experiment cancelled.'; };
$('import').onclick = () => $('file').click();
$('file').onchange = async () => { const file = $('file').files[0]; if (!file) return; try { const definition = JSON.stringify(JSON.parse(await file.text()), null, 2); invalidate(); $('definition').value = definition; $('sample').value = 'custom'; persist(); $('status').textContent = 'Definition loaded.'; } catch (error) { $('status').textContent = error.message; } };
$('export').onclick = () => { try { const data = JSON.stringify(JSON.parse($('definition').value), null, 2); const url = URL.createObjectURL(new Blob([data], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = 'loot-table.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (error) { $('status').textContent = error.message; } };

for (const id of ['definition', 'seed', 'iterations', 'root', 'looter', 'context']) $(id).addEventListener('input', () => { invalidate(); if (id === 'definition') $('sample').value = 'custom'; persist(); });
