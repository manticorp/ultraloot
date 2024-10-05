import * as conditions from './../src/default/conditions';

describe('testing default functions and conditions', () => {
  test('conditions.dependContext', () => {
    expect(conditions.dependContext({
      context: { a: { b: 'foo' } },
      args: {
        property: 'a.b',
        tobe: 'foo'
      }
    })).toBeTruthy();

    expect(conditions.dependContext({
      context: { a: { b: 'foo' } },
      args: {
        property: 'a.b',
        tobe: 'bar'
      }
    })).toBeFalsy();
  });

  test('conditions.dependLooter', () => {
    expect(conditions.dependLooter({
      looter: { a: { b: 'foo' } },
      args: {
        property: 'a.b',
        tobe: 'foo'
      }
    })).toBeTruthy();

    expect(conditions.dependLooter({
      looter: { a: { b: 'foo' } },
      args: {
        property: 'a.b',
        tobe: 'bar'
      }
    })).toBeFalsy();
  });
});
