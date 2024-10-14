/**
 * Simple dot getter function. If property is undefined, returns default value
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotGet(ob, 'a.b.c'); // 'foo'
 * dotGet(ob, 'a.z.c'); // undefined
 * dotGet(ob, 'a.z.c', 'bar'); // 'bar'
 */
export const dotGet = (ob: Record<string, any>, path: string, defaultValue?: any) => {
  const result = path.split('.').reduce((o, i) => ((typeof o !== 'undefined') ? o[i] : o), ob);
  return (typeof result === 'undefined' ? defaultValue : result);
};

/**
 * Simple dot setter
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotSet(ob, 'a.b.c', 'bar'); // ob.a.b.c === 'bar';
 * dotSet(ob, 'a.b.d', 'baz'); // ob.a.b.d === 'baz';
 */
export const dotSet = (ob: any, path: string, value: any) => {
  const keys = path.split('.');
  let parent = ob;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in parent) || parent[key] == null) {
      parent[key] = {};
    }
    parent = parent[key];
  }
  parent[keys[keys.length - 1]] = value;
};

/**
 * returns true or false depending on property of ob
 * @example
 * depend(false); // false
 * depend(false, null, true); // true
 * depend({foo: false}, 'foo'); // false
 * depend({foo: false}, 'foo', null, true); // true
 * depend({foo: true}, 'foo'); // true
 * depend({foo: true}, 'foo', null, true); // false
 */
export const depend = (ob: any, { property, tobe, min, max, inverse = false, strict = true } : { property?: string, min?: number, max?: number, tobe?: any, inverse?: boolean, strict?: boolean } = {}) => {
  inverse = !!inverse;
  if (!ob) {
    return inverse;
  }
  let val = ob;
  if (typeof property === 'string') {
    val = dotGet(ob, property);
  }

  if (typeof tobe !== 'undefined') {
    if (strict) {
      val = (val === tobe);
    } else {
      // eslint-disable-next-line eqeqeq
      val = (val == tobe);
    }
    return inverse ? !val : !!val;
  }

  if (
    (
      typeof min !== 'undefined' ||
      typeof max !== 'undefined'
    ) &&
    strict &&
    typeof val !== 'number'
  ) {
    return false;
  }

  if (
    typeof val !== 'undefined' &&
    val !== null
  ) {
    if (typeof min !== 'undefined' && parseFloat(val) < min) {
      return inverse;
    }
    if (typeof max !== 'undefined' && parseFloat(val) > max) {
      return inverse;
    }
    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
      return !inverse;
    }
  }

  return inverse ? !val : !!val;
};
