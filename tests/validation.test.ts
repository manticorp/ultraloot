import UltraLoot from '../src/ultraloot';
import { validateTable } from '../src/validation';

test('diagnostics identify invalid weights, ranges, references and callback modes', () => {
  const ul = new UltraLoot(123);
  ul.registerFunction('async', async () => {});
  const result = ul.validateTable({
    pools: [{
      rolls: { min: 3, max: 1 },
      entries: [
        { weight: NaN, functions: [{ function: 'async' }] },
        { type: 'table', item: 'missing' },
        { conditions: [{ function: 'unregistered' }] }
      ]
    }]
  }, { mode: 'sync' });
  expect(result.valid).toBe(false);
  expect(result.errors).toEqual(expect.arrayContaining([
    expect.objectContaining({ path: '$.pools[0].entries[0].weight', code: 'number.range' }),
    expect.objectContaining({ code: 'callback.async' }),
    expect.objectContaining({ code: 'callback.missing' }),
    expect.objectContaining({ code: 'reference.missing' }),
    expect.objectContaining({ code: 'chancy.bounds' })
  ]));
});

test('shared references are valid and actual cycles have useful diagnostics', () => {
  const leaf = { pools: [{ entries: [{ id: 'gold', weight: 0, qty: '2d6' }] }] };
  const root = { pools: [{ entries: [{ type: 'table', item: 'leaf' }, { type: 'table', item: 'leaf' }] }] };
  expect(validateTable(root, { tables: { leaf } }).valid).toBe(true);
  expect(validateTable(root, { tables: { leaf: root } }).errors.some(error => error.code === 'table.cycle')).toBe(true);
});

test('validation does not invoke callbacks, consume RNG, or mutate definitions', () => {
  const ul = new UltraLoot(123);
  const callback = jest.fn();
  ul.registerFunction('safe', callback);
  const definition = { pools: [{ entries: [{ functions: [{ function: 'safe' }] }] }] };
  const state = ul.getRng().serialize();
  const before = JSON.stringify(definition);
  expect(ul.validateTable(definition).valid).toBe(true);
  expect(ul.getRng().serialize()).toEqual(state);
  expect(JSON.stringify(definition)).toBe(before);
  expect(callback).not.toHaveBeenCalled();
});

test.each([null, [], 1, 'table', { pools: {} }, { pools: [{ entries: [null] }] }])('invalid structure is reported rather than throwing: %p', value => {
  expect(validateTable(value).valid).toBe(false);
});
