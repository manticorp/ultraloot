/* global UltraLoot, importScripts, postMessage */
importScripts('../../js/ultraloot.js');
self.onmessage = async ({ data }) => {
  try {
    const ul = new UltraLoot(data.seed).registerDefaults();
    const definition = JSON.parse(data.json);
    const table = definition.tables
      ? ul.unserialize(definition)[data.root]
      : ul.createTable(definition);
    if (!table) throw new Error(`Root table "${data.root}" was not found.`);
    const validation = ul.validateTable(table, { mode: 'sync' });
    if (!validation.valid) throw new Error(validation.errors.map(error => `${error.path}: ${error.message}`).join('\n'));
    if (data.action === 'trace') {
      const events = [];
      const result = table.rollSync({ rng: ul.getRng(), looter: data.looter, context: data.context, trace: event => events.push(event) });
      postMessage({ trace: { result, events } });
    } else {
      const result = await ul.simulate(table, { iterations: data.iterations, seed: data.seed, looter: data.looter, context: data.context });
      postMessage({ result });
    }
  } catch (error) { postMessage({ error: error.message }); }
};
