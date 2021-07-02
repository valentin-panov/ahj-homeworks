import App from '../app';

jest.useFakeTimers();
const app = new App(4);

test('new App(index) should generate board index**2', () => {
  expect(document.getElementsByClassName('hole').length).toBe(16);
});

test('app.gamePlay should call setInterval', () => {
  app.gamePlay();
  expect(setInterval).toHaveBeenCalled();
});

test('App.getHole should return element with id hole(index)', () => {
  const expected = document.createElement('div');
  expected.classList.add('hole');
  expected.setAttribute('id', `hole${1}`);
  expect(App.getHole(1)).toEqual(expected);
});

test('app.moveGoblin(index) should call App.getHole with (index)', () => {
  const expected = document.createElement('div');
  expected.classList.add('hole');
  expected.setAttribute('id', `hole${1}`);
  App.getHole = jest.fn(() => expected);
  app.moveGoblin(1);
  expect(App.getHole).toHaveBeenCalledWith(1);
});

test('app.moveGoblin(index) should append goblin element to the hole element with (index)', () => {
  const expected = document.createElement('div');
  expected.classList.add('hole');
  expected.setAttribute('id', `hole${1}`);
  App.getHole = jest.fn(() => expected);
  jest.spyOn(App.getHole(1), 'append');
  app.moveGoblin(1);
  expect(App.getHole(1).append).toBeCalledWith(app.goblin);
});

// не смог разобраться, как затестить содержимое интервального колбэка
