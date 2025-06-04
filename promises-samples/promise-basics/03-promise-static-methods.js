// Promise.resolve and Promise.reject
// These static methods create promises that are already resolved or rejected.

// Promise.resolve creates a promise that is immediately resolved
const resolved = Promise.resolve("Resolved value");

resolved.then((value) => {
  console.log("Promise.resolve:", value); // Output: Promise.resolve: Resolved value
});

// Promise.reject creates a promise that is immediately rejected
const rejected = Promise.reject("Rejected value");
rejected.catch((error) => {
  console.log("Promise.reject:", error); // Output: Promise.reject: Rejected value
});
