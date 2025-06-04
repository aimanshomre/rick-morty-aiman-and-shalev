// Promise chaining example
// You can chain multiple .then() calls to run code in sequence after each promise resolves.
new Promise((resolve) => {
  resolve(1); // Start with the number 1
})
  .then((num) => {
    console.log("First then:", num); // 1
    return num + 1;
  })
  .then((num) => {
    console.log("Second then:", num); // 2
    return num * 3;
  })
  .then((num) => {
    console.log("Third then:", num); // 6
  });
