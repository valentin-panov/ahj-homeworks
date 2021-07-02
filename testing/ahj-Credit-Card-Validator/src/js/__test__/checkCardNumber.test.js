import checkCardNumber from '../engine/checkCardNumber';

const cases = [
  ['4929437165482757', true],
  ['6011258666284219', true],
  ['30573845747286', true],
  ['5187395418270367', true],
  ['3537503533220074', true],
  ['379230032922326', true],
  ['2200240864413360', true],
];

describe('validate card numbers', () => {
  test.each(cases)('given %p, returns %p', (arg, expectedResult) => {
    const result = checkCardNumber(arg);
    expect(result).toBe(expectedResult);
  });
});
