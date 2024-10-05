import * as utils from './../src/utils';

describe('testing utils', () => {
  test('utils.dotGet', () => {
    // @ts-ignore
    const ob = { a: { b: { c: 'foo', d: null, e: 0, f: '0' } } };
    expect(utils.dotGet(ob, 'a.b.c')).toBe('foo');
    expect(utils.dotGet(ob, 'a.b.c', 'bar')).toBe('foo');

    expect(utils.dotGet(ob, 'a.z.c')).toBeUndefined();
    expect(utils.dotGet(ob, 'a.z.c', null)).toBeNull();

    expect(utils.dotGet(ob, 'a.b.d')).toBeNull();
    expect(utils.dotGet(ob, 'a.b.d', 1)).toBeNull();

    expect(utils.dotGet(ob, 'a.b.e')).toBe(0);
    expect(utils.dotGet(ob, 'a.b.e', 1)).toBe(0);
    expect(utils.dotGet(ob, 'a.b.e', null)).toBe(0);

    expect(utils.dotGet(ob, 'a.b.f')).toBe('0');
    expect(utils.dotGet(ob, 'a.b.f', 1)).toBe('0');
    expect(utils.dotGet(ob, 'a.b.f', null)).toBe('0');
  });

  test('utils.dotSet', () => {
    // @ts-ignore
    const ob = { a: { b: { c: 'foo', d: null, e: 0, f: '0' } } };
    expect(ob.a.b.c).toBe('foo');
    utils.dotSet(ob, 'a.b.c', 'bar');
    expect(ob.a.b.c).toBe('bar');
    utils.dotSet(ob, 'a.b.d', 'baz');
    expect(ob.a.b.d).toBe('baz');
  });

  test('utils.depend', () => {
    // @ts-ignore
    const ob = { a: { b: { c: 'foo', d: null, e: 0, f: '0' } } };

    expect(utils.depend(true)).toBeTruthy();
    expect(utils.depend(false)).toBeFalsy();
    expect(utils.depend(ob)).toBeTruthy();
    expect(utils.depend(true, { inverse: true })).toBeFalsy();
    expect(utils.depend(false, { inverse: true })).toBeTruthy();
    expect(utils.depend(ob, { inverse: true })).toBeFalsy();

    expect(utils.depend(ob, { property: 'a.b.c' })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.c', tobe: 'foo' })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.c', tobe: 'bar' })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.c', tobe: 'foo', inverse: true })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.c', tobe: 'bar', inverse: true })).toBeTruthy();

    expect(utils.depend(ob, { property: 'a.z.c' })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.z.c', tobe: 'foo' })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.z.c', inverse: true })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.z.c', tobe: 'foo', inverse: true })).toBeTruthy();

    expect(utils.depend(ob, { property: 'a.b.e', tobe: '0' })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.e', tobe: '0', strict: false })).toBeTruthy();

    expect(utils.depend(ob, { property: 'a.b.e', min: 0 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.e', min: -1 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.e', min: 1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.e', max: 0 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.e', max: -1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.e', max: 1 })).toBeTruthy();

    expect(utils.depend(ob, { property: 'a.b.f', strict: true, min: 0 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: true, min: -1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: true, min: 1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: true, max: 0 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: true, max: -1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: true, max: 1 })).toBeFalsy();

    expect(utils.depend(ob, { property: 'a.b.f', strict: false, min: 0 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: false, min: -1 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: false, min: 1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: false, max: 0 })).toBeTruthy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: false, max: -1 })).toBeFalsy();
    expect(utils.depend(ob, { property: 'a.b.f', strict: false, max: 1 })).toBeTruthy();
  });
});
