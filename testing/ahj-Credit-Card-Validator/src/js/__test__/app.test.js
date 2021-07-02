import CardValidator from '../engine/cardValidator';
import app from '../app';

jest.mock('../engine/cardValidator');

beforeEach(() => {
  CardValidator.mockClear();
});

test('new CardValidator wont be created automatically', () => {
  expect(CardValidator).not.toHaveBeenCalled();
});

test('app() should create new CardValidator', () => {
  app();
  expect(CardValidator).toHaveBeenCalledTimes(1);
});

test('app() should call method init', () => {
  expect(CardValidator).not.toHaveBeenCalled();
  app();
  expect(CardValidator).toHaveBeenCalledTimes(1);

  const cardValidatorInstance = CardValidator.mock.instances[0];
  const mockInit = cardValidatorInstance.init;

  expect(mockInit).toHaveBeenCalledTimes(1);
});
