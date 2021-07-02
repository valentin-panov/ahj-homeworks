/* eslint-disable no-console */
import works from '../app';

test('func works should consoleloggin "it works!"', () => {
  console.log = jest.fn();
  works();
  expect(console.log).toHaveBeenCalledWith('it works!');
});
