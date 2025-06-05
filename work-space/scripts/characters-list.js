import { fetchCharactersinPage } from "./modules/api.js";

/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */
const carectersUrl = `https://rickandmortyapi.com/api/character`;

// State management for the characters page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with character data
 * @param {Object} data - The character data from the API
 * @param {Array} data.results - Array of character objects
 * @param {Object} data.info - Pagination information
 */
function updateUI(data) {
  // 1. Get the grid element
  const grid = document.getElementById("characters-grid");
  if (!grid) return;

  // 2. Clear existing content
  grid.textContent = "";

  // 3. For each character in data.results:
  data.forEach((character) => {
    // - Create a card element
    const card = document.createElement("div");
    card.className = "character-card";

    // - Add character image, name, status, species, location (textContent)
    const link = document.createElement("a");
    link.href = `character-detail.html?id=${character.id}`;

    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;

    const name = document.createElement("h3");
    name.textContent = character.name;

    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;

    const species = document.createElement("p");
    species.textContent = `Species: ${character.species}`;

    const location = document.createElement("p");
    location.textContent = `Location: ${character.location.name}`;

    link.appendChild(img);
    link.appendChild(name);
    link.appendChild(status);
    link.appendChild(species);
    link.appendChild(location);

    card.appendChild(link);
    grid.appendChild(card);
  });

  // 4. Update pagination UI
  const pageNumber = document.getElementById("page-number");
  if (pageNumber && data.info) {
    pageNumber.textContent = `Page ${state.page} of ${data.info.pages}`;
  }
}

/** *
 *
 */
// function loadCharacters() {
//   fetchCharactersinPage(carectersUrl, state.page)
//     .then((data) => {
//       updateUI(data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   const loadingIndicator = document.getElementById("loading-indicator");
//   if (loadingIndicator) {
// //     loadingIndicator.style.display = "none";
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   loadCharacters();
// });

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadCharacters() on page load

document.addEventListener("DOMContentLoaded", () => {
  // const data = {
  //   results: Array,
  //   info: { page: state.page, pages: 1 },
  // };
  fetchCharactersinPage(carectersUrl, 41).then((charArray) => {
    updateUI(charArray);
  });
});
