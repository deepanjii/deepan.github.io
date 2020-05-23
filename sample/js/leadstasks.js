function createTask() {
  let url = "http://192.168.1.43:3000/tasks";

  var taskName = document.getElementById("taskName").value;
  var assignorDropdown = document.getElementById("assignorDropdown");
  var assignor = assignorDropdown.options[assignorDropdown.selectedIndex].text;
  var assigneeDropdown = document.getElementById("assigneeDropdown");
  var assignee = assigneeDropdown.options[assigneeDropdown.selectedIndex].text;
  var estimatedTime = document.getElementById("estimatedTime").value;
  var priorityDropdown = document.getElementById("priorityDropdown");
  var priority = priorityDropdown.options[priorityDropdown.selectedIndex].text;

  // Converting JSON data to string 
  var data = JSON.stringify({
    "taskName": taskName,
    "assignedTo": assignee,
    "assignedBy": assignor,
    "estimatedTime": estimatedTime,
    "priority": priority,
    "status": "Assigned"
  });

  sendRequest(url, "POST", data, clearForm);
}

function clearForm(){
  document.getElementById("taskName").value = "";

  var assignorDropdown = document.getElementById("assignorDropdown");
  assignorDropdown.selectedIndex = -1;

  var assigneeDropdown = document.getElementById("assigneeDropdown");
  assigneeDropdown.selectedIndex = -1;
  
  document.getElementById("estimatedTime").value = "";
  
  var priorityDropdown = document.getElementById("priorityDropdown");
  priorityDropdown.selectedIndex = -1;
}