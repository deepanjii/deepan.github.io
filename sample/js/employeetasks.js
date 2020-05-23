var tasks = null;
var statusDropdowns = {}

function getStatusDropdown() {
  var values = ["Assigned", "Work In Progress", "Completed"];

  var select = document.createElement("select");
  select.name = "taskStatus";
  select.id = "taskStatus"

  for (const val of values) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val;
    select.appendChild(option);
  }

  return select;
}


function setStatusDropdownValue(dropdown, value) {
  dropdown.value = value;
}


function clearTable() {
  var mytbl = document.getElementById("myTable");
  mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;
}


function getAssignedTasks() {
  var assigneeDropdown = document.getElementById("assigneeDropdown");
  var employeeName = assigneeDropdown.options[assigneeDropdown.selectedIndex].text;

  // Creating a XHR object 
  let xhr = new XMLHttpRequest();
  let url = "http://192.168.1.43:3000/tasks/assignedTo/" + employeeName;

  sendRequest(url, "GET", null, populateEmployeeTasks);
}


function populateEmployeeTasks(tasksObj) {
  var table = document.getElementById("myTable");
  result = JSON.parse(tasksObj);

  tasks = result;

  clearTable();

  // Print received data from server 
  for (var i = 0; i < result.length; i++) {
    var index = table.rows.length;
    currentRow = table.insertRow(index);

    var taskNameCell = currentRow.insertCell(0);
    var assignedByCell = currentRow.insertCell(1);
    var assignedToCell = currentRow.insertCell(2);
    var estimatedTimeCell = currentRow.insertCell(3);
    var priorityCell = currentRow.insertCell(4);
    var statusCell = currentRow.insertCell(5);
    var updateTaskCell = currentRow.insertCell(6);

    taskNameCell.innerHTML = result[i].taskName;
    assignedByCell.innerHTML = result[i].assignedBy;
    assignedToCell.innerHTML = result[i].assignedTo;
    estimatedTimeCell.innerHTML = result[i].estimatedTime;
    priorityCell.innerHTML = result[i].priority;
    var statusDropdown = getStatusDropdown();
    statusCell.appendChild(statusDropdown);
    setStatusDropdownValue(statusDropdown, result[i].status);

    var taskId = result[i].id;
    statusDropdowns[taskId] = statusDropdown;

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Update Task";
    btn.id = taskId;

    btn.onclick = function() {
      updateTask(this.id)
    };

    updateTaskCell.appendChild(btn);


    console.log(result[i]);
  }
}


function updateTask(taskId) {
  for (var i = 0; i < tasks.length; i++) {
    var currentTask = tasks[i];
    if (currentTask.id == taskId) {
      console.log("task id " + taskId + " has to be updated");

      var currentTaskStatusDropdown = statusDropdowns[taskId];

      var statusText = currentTaskStatusDropdown.options[currentTaskStatusDropdown.selectedIndex].text;

      // Converting JSON data to string 
      var data = JSON.stringify({
        "taskName": currentTask.taskName,
        "assignedTo": currentTask.assignedTo,
        "assignedBy": currentTask.assignedBy,
        "estimatedTime": currentTask.estimatedTime,
        "priority": currentTask.priority,
        "status": statusText
      });

      let url = "http://192.168.1.43:3000/tasks/id/" + taskId;

      sendRequest(url, "PUT", data);
    }
  }
  console.log("task has been updated");
}