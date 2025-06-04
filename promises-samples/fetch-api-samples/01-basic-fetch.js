// Basic fetch GET request example
// This example fetches a list of posts from a public API using fetch and Promises

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Response not OK");
    }

    // The response is a ReadableStream, so we need to call .json() to get the data
    return response.json();
  })
  .then((data) => {
    console.log("Fetched posts:", data); // Show first 3 posts
  })
  .catch((error) => {
    console.warn("Fetch error:", error);
  });
