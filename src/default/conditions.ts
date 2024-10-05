import { LootTableConditionSignature } from './../table';
import {
  depend
} from './../utils';

type DependContextSignature = ({
  context,
  args
}: {
  context: any,
  args: {
    property?: string,
    min?: number,
    max?: number,
    tobe?: any,
    inverse?: boolean,
    strict?: boolean
  }
}) => boolean;

/**
 * Returns true or false depending on value set in looter
 * @param args
 * @example
 * const context = { a: { b: 'foo', c: true, d: false } };
 * dependContext({ context, args: { property: 'a.b' } }); // true
 * dependContext({ context, args: { property: 'a.b', tobe: 'foo' } }); // true
 * dependContext({ context, args: { property: 'a.c', tobe: 'foo' } }); // false
 * dependContext({ context, args: { property: 'a.c' } }); // true
 * dependContext({ context, args: { property: 'a.d' } }); // false
 *
 * @example
 * // Use in a json file:
 * {
 *   "pools": [
 *     {
 *       "conditions": [
 *         {
 *           "function": "dependContext",
 *           "args": {
 *             "property": "physical.wet"
 *           }
 *         }
 *       ],
 *       "entries": [
 *         {
 *           "id": "soggy_newspaper"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const dependContext: DependContextSignature = ({ context, args }) => {
  return depend(context, args);
};

type DependLooterSignature = ({
  looter,
  args
}: {
  looter: any,
  args: {
    property?: string,
    min?: number,
    max?: number,
    tobe?: any,
    inverse?: boolean,
    strict?: boolean
  }
}) => boolean;

/**
 * Returns true or false depending on value set in looter
 * @param args
 * @example
 * const looter = { a: { b: 'foo', c: true, d: false } };
 * dependLooter({ looter, args: { property: 'a.b' } }); // true
 * dependLooter({ looter, args: { property: 'a.b', tobe: 'foo' } }); // true
 * dependLooter({ looter, args: { property: 'a.c', tobe: 'foo' } }); // false
 * dependLooter({ looter, args: { property: 'a.c' } }); // true
 * dependLooter({ looter, args: { property: 'a.d' } }); // false
 *
 * @example
 * // Use in a json file:
 * {
 *   "pools": [
 *     {
 *       "conditions": [
 *         {
 *           "function": "dependLooter",
 *           "args": {
 *             "property": "status.sickness",
 *             "min": 0.5
 *           }
 *         }
 *       ],
 *       "entries": [
 *         {
 *           "id": "sickness_healing_pack"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const dependLooter: DependLooterSignature = ({ looter, args }) => {
  return depend(looter, args);
};
