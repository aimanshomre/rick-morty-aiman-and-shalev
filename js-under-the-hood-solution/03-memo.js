/*
 * Memoization is a technique to cache the results of function calls.
 * When the function is called again with the same arguments, return the cached result
 * instead of computing it again.
 *
 * Implementation steps:
 * 1. Create a cache (using an object or Map)
 * 2. Return a new function that wraps the original callback
 * 3. Create a cache key from the arguments
 * 4. Check if result exists in cache
 * 5. If not in cache: compute, store, and return result
 * 6. If in cache: return stored result
 * tip: Use JSON.stringify to handle the cache
 */
function memo(fn) {
  /*
    {
      "[1,2]": 3,
      "[2,3]": 5,
      "[3,4]": 7,
    }
   */
  const cache = {};

  cache["name"];

  window.myCache = cache;

  return function (...args) {
    const key = JSON.stringify(args); // "[2,3]"

    if (cache[key]) {
      return `return from cache. result: ${cache[key]}`;
    }

    const reslut = fn(...args);
    cache[key] = reslut;
    return `calculating... result: ${reslut}`;
  };
}

const memoizedAdd = memo((a, b) => a + b);
console.log(window.myCache);
console.log(memoizedAdd(1, 2)); // calculating... result: 3
console.log(window.myCache);
console.log(memoizedAdd(2, 3)); // calculating... result: 5
console.log(window.myCache);
console.log(memoizedAdd(3, 4)); // calculating... result: 7
console.log(window.myCache);

console.log(memoizedAdd(1, 2)); // return from cache. result: 3
console.log(window.myCache);
console.log(memoizedAdd(2, 3)); // return from cache. result: 5
console.log(window.myCache);
console.log(memoizedAdd(3, 4)); // return from cache. result: 7
