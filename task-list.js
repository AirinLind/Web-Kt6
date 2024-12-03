class TaskList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.tasks = [];

    this.shadowRoot.innerHTML = `
        <style>
          @import './task-list.css';
        </style>
        <div class="task-list">
          <form id="task-form">
            <input type="text" id="task-input" placeholder="Add a task" required />
            <button type="submit">Add Task</button>
          </form>
          <ul id="task-container"></ul>
        </div>
      `;

    this.taskForm = this.shadowRoot.querySelector("#task-form");
    this.taskInput = this.shadowRoot.querySelector("#task-input");
    this.taskContainer = this.shadowRoot.querySelector("#task-container");
  }

  connectedCallback() {
    this.taskForm.addEventListener("submit", this.addTask.bind(this));
  }

  disconnectedCallback() {
    this.taskForm.removeEventListener("submit", this.addTask.bind(this));
  }

  addTask(event) {
    event.preventDefault();

    const taskText = this.taskInput.value.trim();
    if (taskText) {
      this.tasks.push({ text: taskText, completed: false });
      this.taskInput.value = "";
      this.renderTasks();
    }
  }

  toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.renderTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
  }

  renderTasks() {
    this.taskContainer.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = task.completed ? "completed" : "";

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.onclick = () => this.toggleTask(index);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => this.deleteTask(index);

      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteButton);
      this.taskContainer.appendChild(taskItem);
    });
  }
}

customElements.define("task-list", TaskList);
