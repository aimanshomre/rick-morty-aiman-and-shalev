// Fetch error handling example
// This example shows how to handle network errors and non-2xx HTTP status codes with fetch and Promises

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log("Response.ok:", response.ok);

    if (!response.ok) {
      // If the response status is not 2xx, throw an error
      throw new Error("HTTP error! Status: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log("This will not run for 404:", data);
  })
  .catch((error) => {
    console.log("Fetch error:", error.message);
  });
