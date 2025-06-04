// Promise.all with fetch example
// This example multiple fetches and uses Promise.all to show that it resolves only if all succeed, and rejects if any fail.
// Useful when you want to fetch multiple resources that are not *dependent* on each other.

const BASE_URL = "https://jsonplaceholder.typicode.com";

const postsPromise = fetch(`${BASE_URL}/posts`).then((response) =>
  response.json()
);
const usersPromise = fetch(`${BASE_URL}/users`).then((response) =>
  response.json()
);
const commentsPromise = fetch(`${BASE_URL}/comments`).then((response) =>
  response.json()
);

Promise.all([postsPromise, usersPromise, commentsPromise])
  .then((results) => {
    console.log("All fetches succeeded:", results);
  })
  .catch((error) => {
    console.log("At least one fetch failed:", error.message);
  });
