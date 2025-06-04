// Error Handling Example
function simulateAPI(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API request failed!"));
      } else {
        resolve({ data: "Success!" });
      }
    }, 1000);
  });
}

function runErrorHandling() {
  const output = document.getElementById("error-output");
  output.innerHTML = "Starting error handling demo...<br>";

  // First, successful case
  simulateAPI(false)
    .then((result) => {
      output.innerHTML += `✅ Success case: ${result.data}<br>`;
      // Now trigger the error case
      return simulateAPI(true);
    })
    .then((result) => {
      // This won't execute
      output.innerHTML += "This won't show up";
    })
    .catch((error) => {
      output.innerHTML += `❌ Error caught: ${error.message}<br>`;
      // We can still continue the chain after an error
      return "Recovery value";
    })
    .then((result) => {
      output.innerHTML += `✅ Recovered with: ${result}`;
    });
}
