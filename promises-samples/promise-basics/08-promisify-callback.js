// Promisifying a callback-based function
// Sometimes, you want to convert a function that uses callbacks into one that returns a Promise.
// This is called 'promisifying'.

// Example: Promisify setTimeout
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${ms} ms`);
    }, ms);
  });
}

wait(1000).then((msg) => {
  console.log(msg); // Output: Waited 1000 ms
});
