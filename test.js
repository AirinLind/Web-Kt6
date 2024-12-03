const { expect } = chai;

describe("Task List Component", () => {
  let taskList;

  beforeEach(() => {
    taskList = document.createElement("task-list");
    document.body.appendChild(taskList);
  });

  afterEach(() => {
    document.body.removeChild(taskList);
  });

  it("should initialize with an empty task list", () => {
    const tasks = taskList.shadowRoot.querySelector("#task-container").children;
    expect(tasks.length).to.equal(0);
  });

  it("should add a task to the list", () => {
    const input = taskList.shadowRoot.querySelector("#task-input");
    const form = taskList.shadowRoot.querySelector("#task-form");

    input.value = "Test Task";
    form.dispatchEvent(new Event("submit"));

    const tasks = taskList.shadowRoot.querySelector("#task-container").children;
    expect(tasks.length).to.equal(1);
    expect(tasks[0].querySelector("span").textContent).to.equal("Test Task");
  });

  it("should toggle task completion status", () => {
    const input = taskList.shadowRoot.querySelector("#task-input");
    const form = taskList.shadowRoot.querySelector("#task-form");

    input.value = "Test Task";
    form.dispatchEvent(new Event("submit"));

    const taskItem = taskList.shadowRoot.querySelector("#task-container li");
    const taskText = taskItem.querySelector("span");

    taskText.click();
    expect(taskItem.classList.contains("completed")).to.be.true;

    taskText.click();
    expect(taskItem.classList.contains("completed")).to.be.false;
  });

  it("should delete a task", () => {
    const input = taskList.shadowRoot.querySelector("#task-input");
    const form = taskList.shadowRoot.querySelector("#task-form");

    input.value = "Test Task";
    form.dispatchEvent(new Event("submit"));

    const deleteButton = taskList.shadowRoot.querySelector(
      "#task-container li button"
    );
    deleteButton.click();

    const tasks = taskList.shadowRoot.querySelector("#task-container").children;
    expect(tasks.length).to.equal(0);
  });
});
