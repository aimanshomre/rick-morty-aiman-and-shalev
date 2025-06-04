// Promise.finally example
// .finally() runs after a promise settles, whether it was resolved or rejected.

const successPromise = Promise.resolve("Success!");
const failPromise = Promise.reject("Failure!");

successPromise
  .then((value) => {
    console.log("Resolved:", value);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("This runs after successPromise is settled.");
  });

failPromise
  .then((value) => {
    console.log("Resolved:", value);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("This runs after failPromise is settled.");
  });
