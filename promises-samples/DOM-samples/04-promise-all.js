// Promise.all() Example
function fetchData(id, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data ${id} loaded after ${delay}ms`);
    }, delay);
  });
}

function runPromiseAll() {
  const output = document.getElementById("all-output");
  output.innerHTML = "Loading multiple requests in parallel...";

  const promises = [
    fetchData(1, 1000), // 1 second
    fetchData(2, 2000), // 2 seconds
    fetchData(3, 1500), // 1.5 seconds
  ];

  const startTime = Date.now();

  Promise.all(promises)
    .then((results) => {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
      output.innerHTML = `All promises completed in ${totalTime} seconds:<br>`;
      results.forEach((result) => {
        output.innerHTML += `${result}<br>`;
      });
    })
    .catch((error) => {
      output.innerHTML = `Error: ${error}`;
    });
}
