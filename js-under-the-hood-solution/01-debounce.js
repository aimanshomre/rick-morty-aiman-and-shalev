/*
 * Debouncing ensures that a function is only executed after a certain amount of time
 * has passed since its last invocation. Think of it like "waiting for quiet time".
 *
 * Example use cases:
 * - Search input: wait until user stops typing
 * - Window resize: wait until user finishes resizing
 *
 * Implementation steps:
 * 1. Create a variable to store the timeout ID (should be cupture in closure)
 * 2. Return a new function that:
 *    - Clears any existing timeout (clearTimeout)
 *    - Creates a new timeout (setTimeout)
 *    - The timeout should call the original function with arguments (use spread and rest)
 */
function debounce(fn, wait) {
  let timer = undefined;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

const debounceLog = debounce((value, value2) => {
  console.log(value, value2);
}, 1000);

debounceLog(1, 2); // should not log
debounceLog(2, 15); // should not log
debounceLog(3, "baba"); // should log 3
