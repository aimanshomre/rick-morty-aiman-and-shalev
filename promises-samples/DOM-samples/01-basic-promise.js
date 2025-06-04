// Basic Promise Example
function simulateAsyncOperation(shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Operation completed successfully!");
      } else {
        reject("Operation failed!");
      }
    }, 1000);
  });
}

function runBasicPromise() {
  const output = document.getElementById("basic-output");
  output.innerHTML = "Loading...";

  simulateAsyncOperation()
    .then((result) => {
      output.innerHTML = `Success: ${result}`;
    })
    .catch((error) => {
      output.innerHTML = `Error: ${error}`;
    });
}
