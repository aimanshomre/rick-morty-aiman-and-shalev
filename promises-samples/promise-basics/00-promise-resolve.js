// What is a Promise?
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.

// Here is a very basic example:

const myPromise = new Promise((resolve, reject) => {
  resolve("Hello from the Promise!"); // The promise is fulfilled (resolved)
  console.log("this is running synchronously!");
});

// Using the promise
myPromise.then((message) => {
  console.log(message); // Output: Hello from the Promise!
});

// The code after this runs immediately, before the promise resolves
console.log("This runs before the promise resolves!");
