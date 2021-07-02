export default class Task {
  constructor(name) {
    this.element = document.createElement('div');
    this.element.classList.add('task');
    this.element.classList.add('unpinned');
    this.element.innerHTML = name;
  }
}
