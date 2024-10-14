import { RngInterface } from './../rng';
import LootTableEntryResult from './../table/pool/entry/result';
type InheritLooterSignature = ({ looted, looter, args }: {
    looted: LootTableEntryResult;
    looter: any;
    args: {
        property?: string;
        looterProperty?: string;
        lootedProperty?: string;
        default?: any;
    };
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
export declare const inheritLooter: InheritLooterSignature;
type InheritContextSignature = ({ looted, context, args }: {
    looted: LootTableEntryResult;
    context: any;
    args: {
        property?: string;
        contextProperty?: string;
        lootedProperty?: string;
        default?: any;
    };
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
export declare const inheritContext: InheritContextSignature;
type SetToRandomChoiceSignature = ({ rng, looted, args }: {
    rng: RngInterface;
    looted: LootTableEntryResult;
    args: {
        property?: string;
        choices?: Array<any> | Record<any, number> | Map<any, number>;
    };
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
export declare const setToRandomChoice: SetToRandomChoiceSignature;
export {};
