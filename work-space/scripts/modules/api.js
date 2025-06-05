let charecters = [];
const baseUrl = "https://rickandmortyapi.com/api/";
const carectersUrl = `https://rickandmortyapi.com/api/character`;
const locationUrl = `https://rickandmortyapi.com/api/location`;
const episodeUrl = `https://rickandmortyapi.com/api/episode`;

export function fetchCharactersinPage(pageNum) {
  return fetch(`${carectersUrl}?page=${pageNum}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not OK");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.warn("Fetch error:", error);
    });
}
export function fetchCharacterbyId(charId) {
  return fetch(`${baseUrl}character/${charId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not OK");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.warn("Fetch error:", error);
    });
}
export function getEpisodesByPage(pageNum) {
  return fetch(`${episodeUrl}?page=${pageNum}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      return data.results;
    })
    .catch((error) => {
      console.warn("fet episodes error:", error);
    });
}
export function getLocationsByPage(pageNum) {
  return fetch(`${locationUrl}?page=${pageNum}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response not OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      return data.results;
    })
    .catch((error) => {
      console.warn("fet episodes error:", error);
    });
}
