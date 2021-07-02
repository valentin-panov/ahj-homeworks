import TaskController from './engine/taskController';

export default function app() {
  const taskController = new TaskController();
  taskController.render();
}

app();
