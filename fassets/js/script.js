var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");


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

  // package up the data as an object.
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl.
  createTaskEl(taskDataObj);
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
  listItemEl.appendChild (taskInfoEl);

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
}

// DELETE BUTTON FUNCTION
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);