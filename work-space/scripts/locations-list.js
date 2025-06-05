import { getLocationsByPage } from "./modules/api.js";

/**
 * Locations Page Script
 * Handles the display and interaction of the locations list page
 */

// State management for the locations page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with location data
 * @param {Object} data - The location data from the API
 * @param {Array} data.results - Array of location objects
 * @param {Object} data.info - Pagination information
 */
function updateUI(data) {
  const grid = document.getElementById("locations-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!data || !Array.isArray(data.results)) {
    grid.innerHTML = "<p>No locations found.</p>";
    return;
  }

  data.results.forEach((location) => {
    const card = document.createElement("div");
    card.className = "location-card";

    const link = document.createElement("a");
    link.href = `location-detail.html?id=${location.id}`;

    const name = document.createElement("h3");
    name.textContent = location.name;

    const type = document.createElement("p");
    type.textContent = `Type: ${location.type}`;

    const dimension = document.createElement("p");
    dimension.textContent = `Dimension: ${location.dimension}`;

    const residents = document.createElement("p");
    residents.textContent = `Residents: ${location.residents.length}`;

    link.appendChild(name);
    link.appendChild(type);
    link.appendChild(dimension);
    link.appendChild(residents);

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
 * Loads location data from the API
 */
function loadLocations() {
  const grid = document.getElementById("locations-grid");
  if (grid) grid.innerHTML = "<p>Loading...</p>";

  getLocationsByPage(state.page, state.search)
    .then((results) => {
      const data = {
        results: results || [],
        info: {},
      };
      state.data = data;
      updateUI(data);
    })
    .catch((err) => {
      if (grid) grid.innerHTML = `<p>Error loading locations.</p>`;
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
  loadLocations();

  const prevBtn = document.getElementById("prev-page");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (state.page > 1) {
        state.page--;
        loadLocations();
      }
    });
  }

  const nextBtn = document.getElementById("next-page");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      state.page++;
      loadLocations();
    });
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        state.search = e.target.value;
        state.page = 1;
        loadLocations();
      }, 400)
    );
  }
});
