import { TypedUltraLoot } from '../src/typed';

type Item = { value: number };
type Player = { level: number };
type Context = { multiplier: number };
type Functions = { scale: { factor: number } };
type Conditions = { level: { minimum: number } };

test('typed callbacks and items run through the normal engine', () => {
  const ul = new TypedUltraLoot<Item, Player, Context, Functions, Conditions>('sync', 123);
  ul.registerFunction('scale', ({ looted, context, args }) => { looted.item!.value *= args.factor * context.multiplier; });
  ul.registerCondition('level', ({ looter, args }) => looter.level >= args.minimum);
  const table = ul.createTable({ pools: [{ entries: [{ item: { value: 2 }, functions: [{ function: 'scale', args: { factor: 3 } }], conditions: [{ function: 'level', args: { minimum: 2 } }] }] }] });
  expect(table.rollSync({ looter: { level: 2 }, context: { multiplier: 2 } })[0].item!.value).toBe(12);
});

// Compile-only assertions: failures must remain TypeScript errors.
export function contracts () {
  const ul = new TypedUltraLoot<Item, Player, Context, Functions, Conditions>('sync');
  // @ts-expect-error async functions cannot be registered on a sync engine
  ul.registerFunction('scale', async () => {});
  // @ts-expect-error callback names are checked
  ul.registerCondition('missing', () => true);
  // @ts-expect-error item shape is checked
  ul.createTable({ pools: [{ entries: [{ item: { value: 'wrong' } }] }] });
  // @ts-expect-error callback arguments are checked
  ul.createTable({ pools: [{ entries: [{ functions: [{ function: 'scale', args: { factor: 'wrong' } }] }] }] });
  const asyncEngine = new TypedUltraLoot<Item, Player, Context, Functions, Conditions, 'async'>('async');
  // @ts-expect-error async tables cannot roll synchronously
  asyncEngine.createTable({}).rollSync({ looter: { level: 2 }, context: { multiplier: 1 } });
}

test('typed scalar and array registries preserve their runtime contracts', () => {
  const ul = new TypedUltraLoot<Item, Player, Context, { scalar: number, list: number[] }, {}>('sync', 123);
  ul.registerFunction('scalar', ({ looted, args }) => { looted.qty *= args; });
  ul.registerFunction('list', ({ looted, args }) => { looted.item!.value = args.reduce((sum, value) => sum + value, 0); });
  const table = ul.createTable({ pools: [{ entries: [{ item: { value: 0 }, functions: [{ function: 'scalar', args: 3 }, { function: 'list', args: [1, 2] }] }] }] });
  const result = table.rollSync({ looter: { level: 1 }, context: { multiplier: 1 } });
  expect(result[0].qty).toBe(3); expect(result[0].item!.value).toBe(3);
});
