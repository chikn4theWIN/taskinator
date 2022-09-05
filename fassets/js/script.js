var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-value']").value;

  //create a list item!
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create a div to hold task info and add to list item.
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  // add HTML content to the div.
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-value'>" + taskTypeInput + "</span>";
  listItemEl.appendChild (taskInfoEl);

  // add entire list item to the list.
  taskToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);