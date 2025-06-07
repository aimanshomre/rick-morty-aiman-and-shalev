// import { updatePagination } from "./characters-list.js";
import { getEpisodesByPage } from "./modules/api.js";
import { debounce, getUrlSearchParamByKey } from "./modules/utils.js";

/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */
const episodeUrl = `https://rickandmortyapi.com/api/episode`;
let currentPage = getUrlSearchParamByKey("page") || 1;
const prevBtn = document.getElementById("episodePreviusPage");
const nextBtn = document.getElementById("episodeNextPage");
const searchInpEl = document.getElementById("episodesSeachInput");

// const searchInpEl = document.getElementById("seachInput");

// State management for the episodes page
// const state = {
//   page: 1,
//   data: null,
//   search: "",
// };

/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 *
 */

function updateUI(data) {
  console.log(data);

  const grid = document.getElementById("episodes-grid");
  if (!grid) return;
  if (!data.results.length) {
    const notFound = document.createElement("h2");
    grid.textContent = "";
    notFound.textContent = `no episodes with this name was found`;
    grid.appendChild(notFound);

    return;
  }

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
    const parent = document.getElementById("pageScroll");
    if (currentPage >= 3 && parent.contains(nextBtn)) {
      parent.removeChild(nextBtn);
    }
    if (currentPage <= 1 && parent.contains(prevBtn)) {
      parent.removeChild(prevBtn);
    }
  });
}

/**
 * Loads episode data from the API
 */
function loadEpisodes() {
  if (currentPage < 1 || currentPage > 3 || isNaN(currentPage)) {
    currentPage = 1;
    window.location.href = `episodes.html?page=${currentPage}`;
  }
  const grid = document.getElementById("episodes-grid");
  if (grid) grid.innerHTML = "<p>Loading...</p>";

  getEpisodesByPage(currentPage)
    .then((data) => {
      updatePagination(data);
      updateUI(data);
    })
    .catch((err) => {
      if (grid) grid.innerHTML = `<p>Error loading episodes.</p>`;
      console.error(err);
    });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadEpisodes();

  // const prevBtn = document.getElementById("prev-page");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        window.location.href = `episodes.html?page=${currentPage}`;
        // loadEpisodes();
      }
    });
  }

  // const nextBtn = document.getElementById("next-page");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentPage++;
      window.location.href = `episodes.html?page=${currentPage}`;

      // loadEpisodes();
    });
  }

  searchInpEl.addEventListener("input", () => {
    const seachTimer = debounce(search, 800);
    seachTimer();
  });
});

function search() {
  const inputVal = searchInpEl.value.toLowerCase();
  getEpisodesByPage(currentPage)
    .then((chars) => {
      return chars.results.filter((char) => {
        return char.name.toLowerCase().includes(inputVal);
      });
    })
    .then((res) => {
      if (!res) {
      }
      updateUI({ results: res });
    });
  return;
}

// // 4. Update pagination UI
function updatePagination(data) {
  const pageNumber = document.getElementById("page-number");
  if (pageNumber && data.info) {
    pageNumber.textContent = `Page ${currentPage} of ${data.info.pages}`;
  }
}

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
