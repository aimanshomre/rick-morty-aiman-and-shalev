// Promise.allSettled with fetch example

const BASE_URL = "https://jsonplaceholder.typicode.com";

// These will succeed
const postsPromise = fetch(`${BASE_URL}/posts`).then((response) =>
  response.json()
);
const usersPromise = fetch(`${BASE_URL}/users`).then((response) =>
  response.json()
);

// This one will fail
const commentsPromise = fetch(`${BASE_URL}/comments`).then((response) => {
  throw new Error("Something went wrong");
});

const promises = [postsPromise, usersPromise, commentsPromise];

Promise.allSettled(promises).then((results) => {
  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      console.log(`Fetch ${idx + 1} succeeded:`, result.value);
    } else {
      console.log(`Fetch ${idx + 1} failed:`, result.reason.message);
    }
  });
});
