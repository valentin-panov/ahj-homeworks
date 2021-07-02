import Table from '../engine/table';
import init from '../app';

jest.mock('../engine/table');

beforeEach(() => {
  Table.mockClear();
});

test('new Table wont be created automatically', () => {
  expect(Table).not.toHaveBeenCalled();
});

test('init() should create new Table', () => {
  init();
  expect(Table).toHaveBeenCalledTimes(1);
});

test('init() should call renderTable method', () => {
  expect(Table).not.toHaveBeenCalled();
  init();
  expect(Table).toHaveBeenCalledTimes(1);

  const tableInstance = Table.mock.instances[0];
  const mokRenderTable = tableInstance.renderTable;

  expect(mokRenderTable).toHaveBeenCalledTimes(1);
});

test('init() should call addListners method', () => {
  expect(Table).not.toHaveBeenCalled();
  init();
  expect(Table).toHaveBeenCalledTimes(1);

  const tableInstance = Table.mock.instances[0];
  const mokAddListeners = tableInstance.addListeners;

  expect(mokAddListeners).toHaveBeenCalledTimes(1);
});
