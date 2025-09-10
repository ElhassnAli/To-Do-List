let taskValue = document.querySelector(".taskValue");
let addBtn = document.querySelector(".addBtn");
let renderTask = document.querySelector(".renderTask");
let tasks = JSON.parse(window.localStorage.getItem("Tasks"));

//create function add Task
function renderTasks(i, index) {
  let taskDiv = document.createElement("div");
  taskDiv.className = "main";
  let taskName = document.createElement("p");
  taskName.className = "text";
  let deleteTask = document.createElement("button");
  deleteTask.className ="button"
  deleteTask.innerText = "DELETE";
  taskName.innerText = i;
  //Add Event for Delete Task
  deleteTask.addEventListener("click", function () {
    let currentIndex = tasks.indexOf(taskName.innerText);
    tasks.splice(currentIndex, 1);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    taskDiv.remove();
  });
  taskDiv.append(taskName);
  taskDiv.append(deleteTask);
  renderTask.append(taskDiv);
}
for (let i = 0; i < tasks.length; i++) {
  let tasksName = tasks[i];
  renderTasks(tasksName, i);
}
addBtn.addEventListener("click", function () {
  if (taskValue.value !== "") {
    let taskAdded = taskValue.value;
    tasks.push(taskAdded);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    renderTasks(taskAdded, tasks.length - 1);
    taskValue.value = "";
  }
});
