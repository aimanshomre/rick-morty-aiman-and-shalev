// Promise Chaining Example
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe" });
    }, 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: user,
        posts: [
          { id: 1, title: "Promise Basics" },
          { id: 2, title: "Promise Chaining" },
        ],
      });
    }, 1000);
  });
}

function runPromiseChain() {
  const output = document.getElementById("chain-output");
  output.innerHTML = "Loading user data...";

  // Demonstrate Promise chaining
  fetchUserData(1)
    .then((user) => {
      output.innerHTML = `Found user: ${user.name}<br>Loading posts...`;
      return fetchUserPosts(user);
    })
    .then((result) => {
      const posts = result.posts.map((post) => `- ${post.title}`).join("<br>");
      output.innerHTML = `${result.user.name}'s posts:<br>${posts}`;
    })
    .catch((error) => {
      output.innerHTML = `Error: ${error}`;
    });
}
