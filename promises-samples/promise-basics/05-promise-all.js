// Promise.all example
// Promise.all takes an array of promises and returns a new promise that resolves when all of them resolve.
// If any promise rejects, the whole Promise.all rejects.

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("baba"), 2000)
);

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("Promise.all resolved values:", values); // [1, 2, 3]
  })
  .catch((error) => {
    console.log("Promise.all error:", error);
  });
