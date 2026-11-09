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


test.each(['int', 'normal_int'])('accepts the supported distribution alias %s', type => {
  const definition = { pools: [{ rolls: { type, min: 1, max: 3 }, entries: [{ id: 'gold', qty: { type, min: 1, max: 3 } }] }] };
  expect(validateTable(definition).valid).toBe(true);
});


test.each([{ type: 'dice', n: 2, d: 6 }, { type: 'dice', d: 8 }, { type: 'dice', plus: 2 }, { type: 'dice', dice: '2d6' }])('accepts inline and wrapped dice parameters: %p', rolls => {
  const definition = { pools: [{ rolls, entries: [{ id: 'gold' }] }] };
  expect(validateTable(definition).valid).toBe(true);
});

test('rejects a dice descriptor without any dice parameters', () => {
  const definition = { pools: [{ rolls: { type: 'dice' } }] };
  expect(validateTable(definition).valid).toBe(false);
});
