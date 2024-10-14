import { LootTableFunctionSignature } from './../table';
import { RngInterface } from './../rng';
import LootTableEntryResult from './../table/pool/entry/result';
import {
  dotSet,
  dotGet
} from './../utils';

type InheritLooterSignature = ({
  looted,
  looter,
  args
}: {
  looted: LootTableEntryResult,
  looter: any,
  args: {
    property?: string,
    looterProperty?: string,
    lootedProperty?: string,
    default?: any,
  }
}) => void;

/**
 * Inherits some property from looter to looted
 * @param args
 * @example
 * inheritLooter({looted, looter, {
 *   looterProperty: 'equipped.color',
 *   lootedProperty: 'item.color'
 *   default: 'red',
 * }})
 */
export const inheritLooter: InheritLooterSignature = ({ looted, looter, args }) => {
  dotSet(looted, args.property ?? args.lootedProperty, dotGet(looter, args.property ?? args.looterProperty, args.default));
};

type InheritContextSignature = ({
  looted,
  context,
  args
}: {
  looted: LootTableEntryResult,
  context: any,
  args: {
    property?: string,
    contextProperty?: string,
    lootedProperty?: string,
    default?: any,
  }
}) => void;

/**
 * Inherits some property from context to looted
 * @param args
 * @example
 * inheritContext({looted, looter, {
 *   contextProperty: 'dyed.color',
 *   lootedProperty: 'item.color'
 *   default: 'brown',
 * }})
 */
export const inheritContext: InheritContextSignature = ({ looted, context, args }) => {
  dotSet(looted, args.property ?? args.lootedProperty, dotGet(context, args.property ?? args.contextProperty, args.default));
};

type SetToRandomChoiceSignature = ({
  rng,
  looted,
  args
}: {
  rng: RngInterface,
  looted: LootTableEntryResult,
  args: {
    property?: string,
    choices?: Array<any> | Record<any, number> | Map<any, number>
  }
}) => void;

/**
 * Sets a property of looted to some random choice from choices list
 *
 * Choices can be a simple array, or a map of anything => weight.
 *
 * @param args
 * @example
 * setToRandomChoice({rng, looted, {
 *   property: 'item.color',
 *   choices: ['red', 'green', 'blue']
 * }}); // looted.item.color will be one of red, green or blue.
 */
export const setToRandomChoice: SetToRandomChoiceSignature = ({ rng, looted, args }) => {
  const { property, choices } = args;
  if (property && looted && choices) {
    dotSet(looted, property, rng.weightedChoice(choices));
  }
};
