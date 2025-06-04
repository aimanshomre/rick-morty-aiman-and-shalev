// Chaining multiple fetch requests example
// This example fetches a post, then fetches the user for that post using Promises

const BASE_URL = "https://jsonplaceholder.typicode.com";
const postId = "1";

fetch(`${BASE_URL}/posts/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    console.log("Fetched post:", post);

    // Now fetch the user for this post
    const userId = post.userId;
    return fetch(`${BASE_URL}/users/${userId}`);
  })
  .then((response) => response.json())
  .then((user) => {
    console.log("Fetched user:", user);
  })
  .catch((error) => {
    console.log("Fetch error:", error);
  });
