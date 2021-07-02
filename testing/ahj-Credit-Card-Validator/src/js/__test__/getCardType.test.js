import getCardType from '../engine/getCardType';

test('getCardType(null) should return false', () => {
  expect(getCardType(null)).toBe(false);
});

test('getCardType(01234567890) should return true', () => {
  expect(getCardType('01234567890')).toBe(true);
});

const cases = [
  ['4929437165482757', 'visa'],
  ['6011258666284219', 'discover'],
  ['30573845747286', 'diners_club'],
  ['5187395418270367', 'master'],
  ['3537503533220074', 'jcb'],
  ['379230032922326', 'amex'],
  ['2200240864413360', 'mir'],
];

describe('check known card types', () => {
  test.each(cases)('given %p, returns %p', (arg, expectedResult) => {
    const result = getCardType(arg);
    expect(result).toBe(expectedResult);
  });
});
