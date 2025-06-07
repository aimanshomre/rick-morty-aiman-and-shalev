/**
 * Utility functions for the Rick and Morty Explorer application
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param {Function} func - The function to
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timer;
  function deFunc() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  }
  return deFunc;
}
export function getUrlSearchParamByKey(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}
