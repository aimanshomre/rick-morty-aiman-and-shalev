// Promise.race() Example
function fetchWithTimeout(id, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Source ${id} responded in ${delay}ms`);
    }, delay);
  });
}

function runPromiseRace() {
  const output = document.getElementById("race-output");
  output.innerHTML = "Racing between multiple sources...";

  // Simulate fetching data from different sources with different speeds
  const promises = [
    fetchWithTimeout(1, 2000), // Slow source
    fetchWithTimeout(2, 1500), // Medium source
    fetchWithTimeout(3, 1000), // Fast source
  ];

  const startTime = Date.now();

  Promise.race(promises)
    .then((result) => {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
      output.innerHTML = `First response received in ${totalTime} seconds:<br>${result}`;
    })
    .catch((error) => {
      output.innerHTML = `Error: ${error}`;
    });
}
