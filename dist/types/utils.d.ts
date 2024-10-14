/**
 * Simple dot getter function. If property is undefined, returns default value
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotGet(ob, 'a.b.c'); // 'foo'
 * dotGet(ob, 'a.z.c'); // undefined
 * dotGet(ob, 'a.z.c', 'bar'); // 'bar'
 */
export declare const dotGet: (ob: Record<string, any>, path: string, defaultValue?: any) => any;
/**
 * Simple dot setter
 * @example
 * const ob = { a: { b: { c: 'foo' } } };
 * dotSet(ob, 'a.b.c', 'bar'); // ob.a.b.c === 'bar';
 * dotSet(ob, 'a.b.d', 'baz'); // ob.a.b.d === 'baz';
 */
export declare const dotSet: (ob: any, path: string, value: any) => void;
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
export declare const depend: (ob: any, { property, tobe, min, max, inverse, strict }?: {
    property?: string;
    min?: number;
    max?: number;
    tobe?: any;
    inverse?: boolean;
    strict?: boolean;
}) => boolean;
