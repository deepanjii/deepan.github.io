function sendRequest(url, requestType, body = null, callback = null) {
  let xhr = new XMLHttpRequest();
  
  xhr.open(requestType, url, true);
  // Set the request header i.e. which type of content you are sending 
  xhr.setRequestHeader("Content-Type", "application/json");
  // Create a state change callback 
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // Print received data from server 
      console.log(xhr.response);
      if (callback)
        callback(xhr.response);
    }
  };

  if (body) {
    xhr.send(body);
  } else {
    xhr.send();
  }
}