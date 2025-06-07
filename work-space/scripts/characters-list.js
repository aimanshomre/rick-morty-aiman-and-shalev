import { fetchCharactersinPage } from "./modules/api.js";
import { debounce, getUrlSearchParamByKey } from "./modules/utils.js";

/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */
let currentPage = getUrlSearchParamByKey("page") || 1;
const prevBtn = document.getElementById("previusPage");
const nextBtn = document.getElementById("nextPage");
const searchInpEl = document.getElementById("seachInput");

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

  if (!data.results.length) {
    const notFound = document.createElement("h2");
    grid.textContent = "";
    notFound.textContent = `no charecters with this name was found`;
    grid.appendChild(notFound);

    return;
  }

  // 2. Clear existing content
  grid.textContent = "";

  // 3. For each character in data.results:
  data.results.forEach((character) => {
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
    const parent = document.getElementById("pageScroll");
    if (currentPage >= 42 && parent.contains(nextBtn)) {
      parent.removeChild(nextBtn);
    }
    if (currentPage <= 1 && parent.contains(prevBtn)) {
      parent.removeChild(prevBtn);
    }
  });
}

// 4. Update pagination UI
export function updatePagination(data) {
  const pageNumber = document.getElementById("page-number");
  if (pageNumber && data.info) {
    console.log(data);

    pageNumber.textContent = `Page ${currentPage} of ${data.info.pages}`;
  }
}

nextBtn.addEventListener("click", () => {
  currentPage++;
  window.location.href = `characters.html?page=${currentPage}`;
  fetchCharactersinPage(currentPage).then((charArray) => {
    updateUI(charArray);
  });
});
prevBtn.addEventListener("click", () => {
  currentPage--;
  window.location.href = `characters.html?page=${currentPage}`;
  fetchCharactersinPage(currentPage).then((charArray) => {
    updateUI(charArray);
  });
});

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
  if (currentPage < 1 || currentPage > 42 || isNaN(currentPage)) {
    currentPage = 1;
    window.location.href = `characters.html?page=${currentPage}`;
  }

  fetchCharactersinPage(currentPage).then((charArray) => {
    updatePagination(charArray);

    updateUI(charArray);
  });
  searchInpEl.addEventListener("input", () => {
    const seachTimer = debounce(search, 800);
    seachTimer();
  });
});

function search() {
  const inputVal = searchInpEl.value.toLowerCase();
  fetchCharactersinPage(currentPage)
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
// link.addEventListener("click", () => {
//   localStorage.setItem(`pgnum_${character.id}`, currentPgnum);
// });
