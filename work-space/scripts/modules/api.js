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
        window.location.href = "characters.html";
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
        window.location.href = "characters.html";
        throw new Error("Response not OK");
      }
      return response.json();
    })
    .then((data) => {
      return data;
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

export function fetchEpisodeById(id) {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Episode not found");
    return res.json();
  });
}

export function fetchCharactersByIds(ids) {
  if (!ids.length) return Promise.resolve([]);
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Characters not found");
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : [data]));
}

export function fetchLocationById(id) {
  const url = `https://rickandmortyapi.com/api/location/${id}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Location not found");
    return res.json();
  });
}

export function fetchResidentsByIds(ids) {
  if (!ids.length) return Promise.resolve([]);
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Residents not found");
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : [data]));
}
