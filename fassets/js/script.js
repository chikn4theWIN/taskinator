// DELCARED VARIABLES
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];


// TASK FORM HANDLER FUNCTION
var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if the the input values are empty strings.
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill of the task form idiot!");
    return false;
  }

  formEl.reset();

  var isEdit = formEl.hasAttribute("data-task-id");

  // it has data attribute, so get the task id and call the function to complete the edit process.
if (isEdit) {
  var taskId = formEl.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
} 
// it has no data attribute, so create an object as normal and pass it to the createTaskEl function.
else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
  };

  createTaskEl(taskDataObj);
  console.log(taskDataObj);
  console.log(taskDataObj.status);
  }
};

// COMPLETE EDITED TASK FUNCTION
var completeEditTask = function(taskName, taskType, taskId) {
  
  // find the matching task list item.
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set the new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through the tasks array and the task object with new content.
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  saveTasks();

  alert("Task has been updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

// CREATE TASK FUNCTION
var createTaskEl = function(taskDataObj) {
  // create a list item!
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add a task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create a div to hold task info and add to list item.
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  saveTasks();

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to the list.
  taskToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create an edit button.
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create a delete button.
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "status-select";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create an option element.
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // appened to the selected element.
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

// BUTTON HANDLER FUNCTION
var taskButtonHandler = function(event) {
  // get the target element from the event.
  var targetEl = event.target;

  // edit button was clicked.
  if (event.target.matches(".edit-btn")) {
    // get the elements task ID.
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked.
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// EDIT BUTTON FUNCTION
var editTask = function(taskId) {
  console.log("editing task #" + taskId);

  // get the task list item element.
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from the task name and type.
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector ("input[name='task-name']").value = taskName;
  document.querySelector ("select[name='task-type']").value = taskType;
  document.querySelector ("#save-task").textContent = "Save Task";
  formEl.setAttribute ("data-task-id", taskId);
};

// DELETE BUTTON FUNCTION
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // create a new array to hold the updated list of tasks.
  var updateTaskArr = [];

  // loop through the current tasks.
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesnt match the value of taskId, let's keep that task and push it into the new array.
    if (tasks[i].id !== parseInt(taskId)) {
      updateTaskArr.push(tasks[i]);
    }
  } 

  // reassign the tasks array to be the same as updatedTaskArr.
  tasks = updateTaskArr;

  saveTasks();
};

// CHANGE STATUS FUNCTION
var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value, and convert it to lowercase.
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on its id.
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // add the task to the right column.
  if (statusValue === "to do") {
    taskToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    taskInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    taskCompletedEl.appendChild(taskSelected);
  }

  // update the tasks in the tasks array.
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  console.log(tasks);

  saveTasks();
};

var saveTasks = function() {
  localStorage.setItem("tasks", tasks);

}

// EVENT LISTENERS

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);