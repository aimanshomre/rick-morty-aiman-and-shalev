import { fetchCharacterbyId, fetchCharactersinPage } from "./modules/api.js";
import { getUrlSearchParamByKey } from "./modules/utils.js";

/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */
const spesificChar = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
    "https://rickandmortyapi.com/api/episode/4",
    "https://rickandmortyapi.com/api/episode/5",
    "https://rickandmortyapi.com/api/episode/6",
    "https://rickandmortyapi.com/api/episode/7",
    "https://rickandmortyapi.com/api/episode/8",
    "https://rickandmortyapi.com/api/episode/9",
    "https://rickandmortyapi.com/api/episode/10",
    "https://rickandmortyapi.com/api/episode/11",
    "https://rickandmortyapi.com/api/episode/12",
    "https://rickandmortyapi.com/api/episode/13",
    "https://rickandmortyapi.com/api/episode/14",
    "https://rickandmortyapi.com/api/episode/15",
    "https://rickandmortyapi.com/api/episode/16",
    "https://rickandmortyapi.com/api/episode/17",
    "https://rickandmortyapi.com/api/episode/18",
    "https://rickandmortyapi.com/api/episode/19",
    "https://rickandmortyapi.com/api/episode/20",
    "https://rickandmortyapi.com/api/episode/21",
    "https://rickandmortyapi.com/api/episode/22",
    "https://rickandmortyapi.com/api/episode/23",
    "https://rickandmortyapi.com/api/episode/24",
    "https://rickandmortyapi.com/api/episode/25",
    "https://rickandmortyapi.com/api/episode/26",
    "https://rickandmortyapi.com/api/episode/27",
    "https://rickandmortyapi.com/api/episode/28",
    "https://rickandmortyapi.com/api/episode/29",
    "https://rickandmortyapi.com/api/episode/30",
    "https://rickandmortyapi.com/api/episode/31",
    "https://rickandmortyapi.com/api/episode/32",
    "https://rickandmortyapi.com/api/episode/33",
    "https://rickandmortyapi.com/api/episode/34",
    "https://rickandmortyapi.com/api/episode/35",
    "https://rickandmortyapi.com/api/episode/36",
    "https://rickandmortyapi.com/api/episode/37",
    "https://rickandmortyapi.com/api/episode/38",
    "https://rickandmortyapi.com/api/episode/39",
    "https://rickandmortyapi.com/api/episode/40",
    "https://rickandmortyapi.com/api/episode/41",
    "https://rickandmortyapi.com/api/episode/42",
    "https://rickandmortyapi.com/api/episode/43",
    "https://rickandmortyapi.com/api/episode/44",
    "https://rickandmortyapi.com/api/episode/45",
    "https://rickandmortyapi.com/api/episode/46",
    "https://rickandmortyapi.com/api/episode/47",
    "https://rickandmortyapi.com/api/episode/48",
    "https://rickandmortyapi.com/api/episode/49",
    "https://rickandmortyapi.com/api/episode/50",
    "https://rickandmortyapi.com/api/episode/51",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

document.addEventListener("DOMContentLoaded", initContainerDetails);

function initContainerDetails() {
  const characterId = getUrlSearchParamByKey("id");
  const character = loadCharacterDetails(characterId);
  console.log(character);

  if (!character) {
    // redirct to home-page
    console.log("hi");

    window.location.href = "characters.html";
    return;
  }
}
/**
 * Loads and displays details for a specific character
 * @param {string} id - The character ID to load
 */
function loadCharacterDetails(id) {
  return fetchCharacterbyId(id).then((char) => {
    updateUI(char, char.episode);
  });

  // TODO: Implement character detail loading
  // 1. Show loading state
  // 2. Fetch character data using the API module
  // 3. Extract episode IDs from character.episode URLs
  // 4. Fetch all episodes this character appears in
  // 5. Update UI with character and episode data
  // 6. Handle any errors
  // 7. Hide loading state
}

/**
 * Updates the UI with character and episode data
 * @param {Object} character - The character data
 * @param {Array} episodes - Array of episode data
 */
function updateUI(character, episodes) {
  console.log(character);
  console.log(episodes);

  const grid = document.getElementById("characters-grid");
  if (!grid) return;

  // 2. Clear existing content
  grid.textContent = "";

  // 3. For each character in data.results:

  // - Create a card element
  const card = document.createElement("div");
  card.className = "character-card";

  // - Add character image, name, status, species, location (textContent)
  // const link = document.createElement("a");
  // link.href = `character-detail.html?id=${character.id}`;

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;

  const name = document.createElement("h3");
  name.textContent = character.name;

  const status = document.createElement("p");
  status.textContent = `Status: ${character.status}`;

  const species = document.createElement("p");
  species.textContent = `Species: ${character.species}`;
  let origin;
  if (!character.origin.url) {
    origin = document.createElement("p");
    origin.textContent = `Origin: ${character.origin.name}`;
  } else {
    origin = document.createElement("a");
    origin.textContent = `Origin: ${character.origin.name}`;
    const originLinkId = character.origin.url.split("/").pop();
    origin.href = `location-detail.html?id=${originLinkId}`;
  }

  let location;
  if (!character.location.url) {
    location = document.createElement("p");
    location.textContent = `Location: ${character.location.name}`;
  } else {
    location = document.createElement("a");
    location.textContent = `Location: ${character.location.name}`;
    const locationLinkId = character.location.url.split("/").pop();
    location.href = `location-detail.html?id=${locationLinkId}`;
  }
  const episodCard = document.createElement("div");
  episodCard.className = "character-card";
  episodes.forEach((ep) => {
    const epEl = document.createElement("a");
    const epNum = ep.split("/").pop();
    epEl.textContent = `episode: ${epNum}`;
    epEl.href = `episode-detail.html?id=${epNum}`;
    episodCard.appendChild(epEl);
  });

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(status);
  card.appendChild(species);
  card.appendChild(origin);
  card.appendChild(location);

  // card.appendChild(link);
  grid.appendChild(card);
  grid.appendChild(episodCard);
}

// TODO: Implement the UI update
// 1. Get the detail container element
// 2. Create character header with image and basic info
// 3. Add links to origin and current location
// 4. Create episodes section with all episodes the character appears in
// 5. Handle empty states and errors
// throw new Error("updateUI not implemented");

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing
