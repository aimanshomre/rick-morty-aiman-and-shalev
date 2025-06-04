// Promise rejection example
// A Promise can also represent a failure using 'reject'.

const errorPromise = new Promise((resolve, reject) => {
  reject("Something went wrong!"); // The promise is rejected
});

// Handling rejection with .catch()
errorPromise
  .then((result) => {
    console.log("This will not run:", result);
    // throw new Error("baba");
  })
  .catch((error) => {
    console.log("Caught an error:", error); // Output: Caught an error: Something went wrong!
  });
