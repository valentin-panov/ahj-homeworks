import fadeOut from './fadeOut';
import TaskWidget from '../template/taskWidget';
import Task from '../template/task';

export default class TaskController {
  constructor() {
    document.body.append(new TaskWidget().element);
    this.inputSearchForm = document.getElementById('inputSearchForm');
    this.searchInput = document.querySelector('.container__input');
    this.pinnedBox = document.querySelector('.pinned__box');
    this.pinnedBoxEmpty = document.querySelector('.pinned-empty');
    this.allTasksBox = document.querySelector('.all-tasks__box');
    this.allTasksBoxEmpty = document.querySelector('.all-tasks-empty');
    this.success = document.querySelector('.success');
    this.failure = document.querySelector('.failure');

    this.taskArray = [];

    this.addNewTask('Чебоксары');
    this.addNewTask('Чебурашка');
    this.addNewTask('Чебурек');
    this.addNewTask('Черепаха');
    this.pinTask(TaskController.getTaskById(0));

    this.render();
    this.addInputListener();

    this.searchInput.focus();
  }

  render() {
    this.taskArray
      .filter((element) => !element.classList.contains('unpinned'))
      .forEach((element) => this.pinnedBox.append(element));

    this.taskArray
      .filter((element) => element.classList.contains('unpinned'))
      .forEach((element) => this.allTasksBox.append(element));

    this.searchInput.value = '';

    this.renderEmptyBoxes();
  }

  renderEmptyBoxes() {
    if (this.allTasksBox.querySelector('.task')) {
      this.allTasksBoxEmpty.remove();
    } else {
      this.allTasksBox.append(this.allTasksBoxEmpty);
    }
    if (this.pinnedBox.querySelector('.task')) {
      this.pinnedBoxEmpty.remove();
    } else {
      this.pinnedBox.append(this.pinnedBoxEmpty);
    }
  }

  addInputListener() {
    this.searchInput.addEventListener(
      'input',
      (event) => {
        event.preventDefault();
        this.onSearch();
      },
      false
    );
    this.inputSearchForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        this.addNewTask(this.searchInput.value.trim());
        this.render();
      },
      false
    );
  }

  addCheckBoxListener(trg) {
    trg.addEventListener('click', (event) => {
      event.target.closest('.task').classList.toggle('unpinned');
      this.render();
    });
  }

  addNewTask(text) {
    if (
      this.taskArray.find((element) => element.textContent.toLowerCase() === text.toLowerCase())
    ) {
      fadeOut(this.failure);
      return;
    }
    const newTask = new Task(text).element;
    newTask.setAttribute('id', `task${this.taskArray.length}`);
    this.taskArray.push(newTask);
    this.allTasksBox.append(newTask);
    this.addCheckBoxListener(newTask);
    this.searchInput.value = '';
    fadeOut(this.success);
  }

  pinTask(task) {
    task.classList.remove('unpinned');
    this.render();
  }

  unPinTask(task) {
    task.classList.add('unpinned');
    this.render();
  }

  onSearch() {
    const matches = this.getMatches(this.searchInput.value.trim().toLowerCase());
    this.renderMatches(matches);
  }

  getMatches(text) {
    return this.taskArray
      .filter((element) => element.classList.contains('unpinned'))
      .filter((element) => element.textContent.toLowerCase().includes(text));
  }

  renderMatches(matches) {
    this.allTasksBox.querySelectorAll('.task').forEach((element) => element.remove());
    matches.forEach((element) => this.allTasksBox.append(element));
    this.renderEmptyBoxes();
  }

  static getTaskById(index) {
    return document.getElementById(`task${index}`);
  }
}
