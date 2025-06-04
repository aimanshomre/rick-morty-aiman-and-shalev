// Fetch response headers example
// This example shows how to read headers from a fetch response using Promises

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    // Read a specific header
    const contentType = response.headers.get("Content-Type");
    console.log("Content-Type header:", contentType);
    return response.json();
  })
  .then((data) => {
    console.log("Fetched post:", data);
  })
  .catch((error) => {
    console.log("Fetch error:", error);
  });
