// Promise.race example
// Promise.race returns a promise that settles as soon as any of the input promises settles (resolves or rejects).

const fast = new Promise((resolve) => setTimeout(() => resolve("fast"), 200));
const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 1000));

Promise.race([fast, slow])
  .then((winner) => {
    console.log("Promise.race winner:", winner); // 'fast'
  })
  .catch((error) => {
    console.log("Promise.race error:", error);
  });
