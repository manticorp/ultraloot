import { default as validate, NumberValidationError, ArrayNumberValidator, NumberValidator } from './../../src/number';

describe('Testing Number Validation', () => {
  describe('validate function', () => {
    test('validate returns correct validator for array', () => {
      expect(validate([1, 2, 3])).toBeInstanceOf(ArrayNumberValidator);
    });

    test('validate returns correct validator for array', () => {
      expect(validate(5)).toBeInstanceOf(NumberValidator);
    });

    test('basic suite', () => {
      expect(() => {
        // Validate single numbers
        validate(2).gt(1).lt(3);

        // Also used with arrays of numbers
        validate([1, 2, 3]).lt(10);
        validate([1, 2, 3]).sumto(6);

        // All single number validations
        validate(1).int();
        validate(1).positive();
        validate(-1).negative();
        validate(1).between(0, 2);
        validate(1).betweenEq(1, 2);
        validate(1).gt(0);
        validate(1).gteq(1);
        validate(1).lt(2);
        validate(1).lteq(1);

        // All array of numbers validations
        validate([1, 2, 3]).sumcloseto(6);
        validate([1, 2, 3.0001]).sumcloseto(6, 0.001);
        validate([1, 2, 3]).sumto(6);
        validate([1, 2, 3]).sumtolt(7);
        validate([1, 2, 3]).sumtogt(5);
        validate([1, 2, 3]).sumtolteq(6);
        validate([1, 2, 3]).sumtogteq(1);
        validate([1, 2, 3]).int();
        validate([1, 2, 3]).positive();
        validate([-1, -2, -4]).negative();
        validate([1, 2, 3]).between(0, 4);
        validate([1, 2, 3]).betweenEq(1, 3);
        validate([1, 2, 3]).gt(0);
        validate([1, 2, 3]).gteq(1);
        validate([1, 2, 3]).lt(4);
        validate([1, 2, 3]).lteq(3);
      }).not.toThrow();
    });

    test('Object name setting', () => {
      const numvalidator = validate({ my_name: 5 });

      expect(numvalidator.name).toBe('my_name');
      expect(numvalidator.number).toBe(5);

      const nums = [5, 6];
      const arrvalidator = validate({ my_array: nums });

      expect(arrvalidator.name).toBe('my_array');
      expect(arrvalidator.numbers).toBe(nums);
    });

    test('fluent chaining', () => {
      expect(() => {
        validate(1).lteq(1).gt(0).validate(2).lt(3);
      }).not.toThrow();

      expect(() => {
        validate(1).gt(0).lt(1).validate(2).lt(3);
      }).toThrow(NumberValidationError);

      expect(() => {
        validate(1).lteq(1).gt(0).validate([1, 2, 3]).lteq(3);
      }).not.toThrow();

      expect(() => {
        validate([1, 2, 3]).gt(0).lt(4).validate([3, 2, 1]).lt(1);
      }).toThrow(NumberValidationError);

      expect(() => {
        validate([1, 2, 3]).gt(0).lt(4).validate(2).lt(1);
      }).toThrow(NumberValidationError);
    });

    test('variable naming', () => {
      expect(() => {
        validate(1).varname('lambda').lteq(1).gt(0);
      }).not.toThrow();

      expect(() => {
        validate(1).varname('lambda').lt(1).gt(0);
      }).toThrow(NumberValidationError);

      expect(() => {
        validate(1).varname('lambda').lt(1).gt(0);
      }).toThrow(/lambda/);

      expect(() => {
        validate([1, 2, 3]).varname('lambda').lt(1).gt(0);
      }).toThrow(NumberValidationError);

      expect(() => {
        validate([1, 2, 3]).varname('lambda').lt(1).gt(0);
      }).toThrow(/lambda/);
    });

    test('Validate all', () => {
      expect(() => {
        validate().all([1, 2, 3]).lt(6);
      }).not.toThrow();

      expect(() => {
        validate().all([1, 2, 3]).gt(2);
      }).toThrow(NumberValidationError);
    });

    test('Validating nothing doesn\'t work', () => {
      expect(() => {
        validate().gt(2);
      }).toThrow(NumberValidationError);
    });

    test('Trying to validate non-number doesn\'t work', () => {
      expect(() => {
        // @ts-ignore
        validate('a').gt(2);
      }).toThrow(NumberValidationError);

      expect(() => {
        // @ts-ignore
        validate([1, 2, 3, 'a']).gt(2);
      }).toThrow(NumberValidationError);
    });
  });
});
