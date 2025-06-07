function fetchEpisodeById(id) {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Episode not found");
    return res.json();
  });
}

function fetchCharactersByIds(ids) {
  if (!ids.length) return Promise.resolve([]);
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Characters not found");
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : [data]));
}

function createEpisodeHeader(episode) {
  const header = document.createElement("div");
  header.innerHTML = `
    <h2>${episode.name}</h2>
    <p><strong>Episode:</strong> ${episode.episode}</p>
    <p><strong>Air Date:</strong> ${episode.air_date}</p>
  `;
  return header;
}

function createCharacterCard(char) {
  const card = document.createElement("div");
  card.className = "character-card";

  const link = document.createElement("a");
  const pgnumForChar = localStorage.getItem(`pgnum_${char.id}`) || 1;
  link.href = `character-detail.html?id=${char.id}&pgnum=${pgnumForChar}`;

  const img = document.createElement("img");
  img.src = char.image;
  img.alt = char.name;
  img.style.width = "100px";
  img.style.borderRadius = "1rem";

  const name = document.createElement("h4");
  name.textContent = char.name;

  const species = document.createElement("p");
  species.textContent = `Species: ${char.species}`;

  const status = document.createElement("p");
  status.textContent = `Status: ${char.status}`;

  link.appendChild(img);
  link.appendChild(name);
  link.appendChild(species);
  link.appendChild(status);

  card.appendChild(link);
  return card;
}

function updateUI(episode, characters) {
  const container = document.getElementById("containerList");
  container.innerHTML = "";
  container.appendChild(createEpisodeHeader(episode));

  const grid = document.createElement("div");
  grid.className = "containers";
  if (!characters.length) {
    const noChars = document.createElement("p");
    noChars.textContent = "No characters in this episode.";
    grid.appendChild(noChars);
  } else {
    characters.forEach((char) => {
      grid.appendChild(createCharacterCard(char));
    });
  }
  container.appendChild(grid);
}

function loadEpisodeDetails(id) {
  const container = document.getElementById("containerList");
  container.textContent = "Loading...";
  fetchEpisodeById(id)
    .then((episode) => {
      const charIds = episode.characters.map((url) => url.split("/").pop());
      fetchCharactersByIds(charIds)
        .then((characters) => {
          updateUI(episode, characters);
        })
        .catch((err) => {
          container.textContent = "Error loading characters: " + err.message;
        });
    })
    .catch((err) => {
      container.textContent = "Error loading episode: " + err.message;
    });
}

// --- Initialize page ---
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("containerList");
  if (!id || isNaN(Number(id))) {
    container.textContent = "Invalid episode ID.";
    return;
  }
  loadEpisodeDetails(id);
});
