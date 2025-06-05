import { getEpisodesByPage } from "./modules/api.js";

/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */
const episodeUrl = `https://rickandmortyapi.com/api/episode`;

// State management for the episodes page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 *
 */

function updateUI(data) {
  const grid = document.getElementById("episodes-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!data || !Array.isArray(data.results)) {
    grid.innerHTML = "<p>No episodes found.</p>";
    return;
  }

  data.results.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "episode-card";

    const link = document.createElement("a");
    link.href = `episode-detail.html?id=${episode.id}`;

    const name = document.createElement("h3");
    name.textContent = episode.name;

    const airDate = document.createElement("p");
    airDate.textContent = `Air Date: ${episode.air_date}`;

    const code = document.createElement("p");
    code.textContent = `Episode: ${episode.episode}`;

    const chars = document.createElement("p");
    chars.textContent = `Characters: ${episode.characters.length}`;

    link.appendChild(name);
    link.appendChild(airDate);
    link.appendChild(code);
    link.appendChild(chars);

    card.appendChild(link);
    grid.appendChild(card);
  });

  // Update pagination UI
  const pageNumber = document.getElementById("current-page");
  if (pageNumber && data.info) {
    pageNumber.textContent = state.page;
  }
  const prevBtn = document.getElementById("prev-page");
  if (prevBtn) prevBtn.disabled = !data.info.prev;
  const nextBtn = document.getElementById("next-page");
  if (nextBtn) nextBtn.disabled = !data.info.next;
}

/**
 * Loads episode data from the API
 */
function loadEpisodes() {
  const grid = document.getElementById("episodes-grid");
  if (grid) grid.innerHTML = "<p>Loading...</p>";

  getEpisodesByPage(state.page, state.search)
    .then((data) => {
      if (Array.isArray(data)) {
        data = { results: data, info: { page: state.page, pages: 1 } };
      }
      state.data = data;
      updateUI(data);
    })
    .catch((err) => {
      if (grid) grid.innerHTML = `<p>Error loading episodes.</p>`;
      console.error(err);
    });
}

// Debounce helper
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadEpisodes();

  const prevBtn = document.getElementById("prev-page");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.page > 1) {
        state.page--;
        loadEpisodes();
      }
    });
  }

  const nextBtn = document.getElementById("next-page");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      state.page++;
      loadEpisodes();
    });
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        state.search = e.target.value;
        state.page = 1;
        loadEpisodes();
      }, 400)
    );
  }
});

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
