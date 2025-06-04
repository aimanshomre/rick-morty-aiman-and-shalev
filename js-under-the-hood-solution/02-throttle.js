/*
 * Throttling limits how often a function can be called.
 * It ensures the function is called at most once in every X milliseconds.
 * Unlike debounce, throttle will execute the function at regular intervals.
 *
 * Example use cases:
 * - Scroll events
 * - Game loop updates
 * - API calls that need rate limiting
 *
 * Implementation steps:
 * 1. Create a variable to track the last call (Timestamp)
 * 2. Return a new function that:
 *    - Checks if the time passed from the last call and now is greater then the limit parameter
 *    - If if is:
 *      - Execute the function
 *      - Set last call flag time to now
 *    - If its not: do nothing
 */
function throttle(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall > limit) {
      fn(...args);
      lastCall = now;
    }
  };
}

const throttledLog = throttle((value) => {
  console.log(value);
}, 1000);

setInterval(() => {
  console.log("interval");
  throttledLog("hello!");
}, 200);

// should log "interval" every 200ms
// should log "hello!" every 1000ms
