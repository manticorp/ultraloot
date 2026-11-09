import Ajv from 'ajv';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import schema from '../ultraloot.schema.json';

const validate = new Ajv({ allErrors: true, strict: false }).compile(schema);
const fixtures = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const filename = path.join(directory, entry.name);
  return entry.isDirectory() ? fixtures(filename) : entry.name.endsWith('.json') ? [filename] : [];
});

test.each(fixtures(path.join(__dirname, '../docs/examples/tables')))('published schema accepts documented table %s', filename => {
  const definition = JSON.parse(readFileSync(filename, 'utf8'));
  if (!validate(definition)) throw new Error(JSON.stringify(validate.errors));
});

test.each([
  { pools: [{ entries: [{ weight: -1 }] }] },
  { pools: [{ rolls: [] }] },
  { pools: [{ entries: [{ type: 'table' }] }] },
  { pools: [{ entries: [{ unique: 'yes' }] }] },
  { pools: [{ entries: [{ functions: [{}] }] }] },
  { pools: [{ rolls: { type: 'unknown' } }] }
])('published schema rejects invalid descriptors: %p', definition => {
  expect(validate(definition)).toBe(false);
});


test.each(['int', 'normal_int'])('accepts the supported distribution alias %s', type => {
  const definition = { pools: [{ rolls: { type, min: 1, max: 3 }, entries: [{ id: 'gold', qty: { type, min: 1, max: 3 } }] }] };
  expect(validate(definition)).toBe(true);
});


test.each([{ type: 'dice', n: 2, d: 6 }, { type: 'dice', d: 8 }, { type: 'dice', plus: 2 }, { type: 'dice', dice: '2d6' }])('accepts inline and wrapped dice parameters: %p', rolls => {
  const definition = { pools: [{ rolls, entries: [{ id: 'gold' }] }] };
  expect(validate(definition)).toBe(true);
});

test('rejects a dice descriptor without any dice parameters', () => {
  const definition = { pools: [{ rolls: { type: 'dice' } }] };
  expect(validate(definition)).toBe(false);
});
