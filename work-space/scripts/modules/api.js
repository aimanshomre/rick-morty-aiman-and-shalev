let charecters = [];
const baseUrl = "https://rickandmortyapi.com/api/";
const carectersUrl = `https://rickandmortyapi.com/api/character`;
const locationUrl = `https://rickandmortyapi.com/api/location`;
const episodeUrl = `https://rickandmortyapi.com/api/episode`;

export function fetchCharactersinPage(url, pageNum) {
  return fetch(`${url}?page=${pageNum}`)
    .then((response) => {
      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      return response.json();
    })
    .then((data) => {
      console.log("Fetched posts:", data.results);
      console.log("Fetched posts:", data.info.pages);
      return data.results;
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
