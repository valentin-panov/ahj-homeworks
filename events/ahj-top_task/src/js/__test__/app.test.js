import TaskController from '../engine/taskController';
import app from '../app';

jest.mock('../engine/taskController');

beforeEach(() => {
  TaskController.mockClear();
});

test('new TaskController wont be created automatically', () => {
  expect(TaskController).not.toHaveBeenCalled();
});

test('app() should create new TaskController', () => {
  app();
  expect(TaskController).toHaveBeenCalledTimes(1);
});

test('app() should call method render', () => {
  expect(TaskController).not.toHaveBeenCalled();
  app();
  expect(TaskController).toHaveBeenCalledTimes(1);

  const taskControllerInstance = TaskController.mock.instances[0];
  const mockInit = taskControllerInstance.render;

  expect(mockInit).toHaveBeenCalledTimes(1);
});
