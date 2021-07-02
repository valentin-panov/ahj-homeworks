export default class TaskWidget {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('wrapper');
    this.element.innerHTML = `
    <div class="container">
      <h1 class="title">TOP TASKS</h1>
      <div class="container__tasks">
        <form name="inputSearchForm" id="inputSearchForm">
          <input type="text" name="task-input" class="container__input" placeholder="add or search the task...">
        </form>
        <div class="alert-box success visually-hidden">Task added</div>

        <div class="alert-box failure visually-hidden">Error adding new task</div>
        
        <div class="pinned">
        <h2 class="pinned__title">Pinned:</h2>
          <div class="pinned__box">
            <div class="pinned__box notification pinned-empty">No pinned tasks</div>    
          </div>
        </div>
        <div class="all-tasks">
        <h2 class="all-tasks__title">All Tasks:</h2>
          <div class="all-tasks__box">
            <div class="all-tasks__box notification all-tasks-empty">No tasks found</div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
