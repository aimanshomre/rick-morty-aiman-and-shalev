import { getEpisodesByPage } from "./modules/api.js";

async function fetchEpisodeById(id) {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Episode not found");
  return res.json();
}

async function fetchCharactersByIds(ids) {
  if (!ids.length) return [];
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Characters not found");
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

async function loadEpisodeDetails(id) {
  const container = document.getElementById("containerList");
  container.innerHTML = "<p>Loading...</p>";
  try {
    const episode = await fetchEpisodeById(id);
    // extract character IDs from URLs
    const charIds = episode.characters.map((url) => url.split("/").pop());
    const characters = await fetchCharactersByIds(charIds);
    updateUI(episode, characters);
  } catch (err) {
    container.innerHTML = `<p>Error loading episode: ${err.message}</p>`;
  }
}

function updateUI(episode, characters) {
  const container = document.getElementById("containerList");
  container.innerHTML = "";

  // Episode header
  const header = document.createElement("div");
  header.innerHTML = `
    <h2>${episode.name}</h2>
    <p><strong>Episode:</strong> ${episode.episode}</p>
    <p><strong>Air Date:</strong> ${episode.air_date}</p>
  `;
  container.appendChild(header);

  // Characters grid
  const grid = document.createElement("div");
  grid.className = "books"; // reuse grid style
  if (!characters.length) {
    grid.innerHTML = "<p>No characters in this episode.</p>";
  } else {
    characters.forEach((char) => {
      const card = document.createElement("div");
      card.className = "book";
      card.innerHTML = `
        <a href="character-detail.html?id=${char.id}">
          <img src="${char.image}" alt="${char.name}" style="width:100px;border-radius:1rem;">
          <h4>${char.name}</h4>
          <p>Species: ${char.species}</p>
          <p>Status: ${char.status}</p>
        </a>
      `;
      grid.appendChild(card);
    });
  }
  container.appendChild(grid);
}

// --- Initialize page ---
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id || isNaN(Number(id))) {
    document.getElementById("containerList").innerHTML =
      "<p>Invalid episode ID.</p>";
    return;
  }
  loadEpisodeDetails(id);
});
