// catch selector
let taskInput = document.querySelector(".task input"); //input
//=======
let addBtn = document.querySelector(".task button"); // add button
//========
let tasksBody = document.querySelector(".body");
//===================
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//================
createTask();
//=================

function createTask() {
  tasksBody.innerHTML = "";
  allTasks.forEach((task, index) => {
    let divTask = document.createElement("div");
    divTask.className = "task-body";
    //==============
    if (task.complete) {
      divTask.classList.add("done");
    } else {
      divTask.classList.remove("done");
    }
    let divText = document.createElement("div");
    divText.className = "task-text";
    //==============
    let divButton = document.createElement("div");
    divButton.className = "button";
    //============== buttons
    let btn1 = document.createElement("button");
    btn1.innerHTML = task.complete
      ? `<i class="material-icons commpleted">check</i>`
      : `<i class="material-icons" >cancel</i>`;

    //================
    let btn2 = document.createElement("button");
    btn2.innerHTML = `<i class="material-icons" >edit</i>`;
    //=================
    let btn3 = document.createElement("button");
    btn3.innerHTML = `<i class="material-icons">delete</i>`;
    //=================
    divButton.appendChild(btn1);
    divButton.appendChild(btn2);
    divButton.appendChild(btn3);
    //==============

    //========================
    btn1.addEventListener("click", () => {
      taskDone(index);
      createTask();
    });
    //========================
    btn2.addEventListener("click", () => {
      editTask(index);
    });

    //=======================
    btn3.addEventListener("click", () => {
      deleteTask(index);
    });
    //============= divText
    let taskTitle = document.createElement("p");
    taskTitle.appendChild(document.createTextNode(task.title));
    let spanDate = document.createElement("span");
    spanDate.appendChild(document.createTextNode(task.date));
    divText.appendChild(taskTitle);
    divText.appendChild(spanDate);
    //===============
    //============== add to main divTask
    divTask.appendChild(divText);
    divTask.appendChild(divButton);
    //==============
    tasksBody.appendChild(divTask);
  });
}

//======================
addBtn.addEventListener("click", () => {
  //==============
  let dateNow = new Date();
  let now = `${dateNow.getDate()}/${
    dateNow.getMonth() + 1
  }/${dateNow.getFullYear()}_${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
  //=================
  if (taskInput.value !== "") {
    allTasks.push({ title: taskInput.value, date: now, complete: false });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }
  createTask();
  taskInput.value = "";
});
//==================
function taskDone(index) {
  console.log(index);
  allTasks[index].complete = !allTasks[index].complete;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
// //==================
function deleteTask(index) {
  allTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  createTask();
}

function editTask(index) {
  let task = allTasks[index];
  let newTitle = prompt(" type new title:", task.title);
  if (newTitle && newTitle.trim() !== "") {
    allTasks[index].title = newTitle.trim();
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTask();
  }
}
