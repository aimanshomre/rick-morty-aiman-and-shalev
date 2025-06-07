function fetchLocationById(id) {
  const url = `https://rickandmortyapi.com/api/location/${id}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Location not found");
    return res.json();
  });
}

function fetchResidentsByIds(ids) {
  if (!ids.length) return Promise.resolve([]);
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Residents not found");
      return res.json();
    })
    .then((data) => (Array.isArray(data) ? data : [data]));
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const pgnum = params.get("pgnum");
  if (!id || isNaN(Number(id))) {
    document.getElementById("containerList").innerHTML =
      "<p>Invalid location ID.</p>";
    return;
  }
  loadLocationDetails(id, pgnum);
});

function loadLocationDetails(id, pgnum) {
  const container = document.getElementById("containerList");
  container.innerHTML = "<p>Loading...</p>";
  fetchLocationById(id)
    .then((location) => {
      const residentIds = location.residents.map((url) => url.split("/").pop());
      fetchResidentsByIds(residentIds)
        .then((residents) => {
          updateUI(location, residents, pgnum);
        })
        .catch((err) => {
          container.innerHTML = `<p>Error loading residents: ${err.message}</p>`;
        });
    })
    .catch((err) => {
      container.innerHTML = `<p>Error loading location: ${err.message}</p>`;
    });
}

function updateUI(location, residents, pgnum) {
  const container = document.getElementById("containerList");
  container.innerHTML = "";

  // Location header
  const header = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = location.name;
  const type = document.createElement("p");
  type.innerHTML = `<strong>Type:</strong> ${location.type}`;
  const dimension = document.createElement("p");
  dimension.innerHTML = `<strong>Dimension:</strong> ${location.dimension}`;
  header.appendChild(title);
  header.appendChild(type);
  header.appendChild(dimension);
  container.appendChild(header);

  // Residents grid
  const grid = document.createElement("div");
  grid.className = "containers";
  if (!residents.length) {
    const noRes = document.createElement("p");
    noRes.textContent = "No residents in this location.";
    grid.appendChild(noRes);
  } else {
    residents.forEach((resident) => {
      const card = document.createElement("div");
      card.className = "character-card";
      const link = document.createElement("a");
      const pgnumForChar = localStorage.getItem(`pgnum_${resident.id}`) || 1;
      link.href = `character-detail.html?id=${resident.id}&pgnum=${pgnumForChar}`;

      const img = document.createElement("img");
      img.src = resident.image;
      img.alt = resident.name;
      img.style.width = "100px";
      img.style.borderRadius = "1rem";

      const name = document.createElement("h4");
      name.textContent = resident.name;

      const species = document.createElement("p");
      species.textContent = `Species: ${resident.species}`;

      const status = document.createElement("p");
      status.textContent = `Status: ${resident.status}`;

      link.appendChild(img);
      link.appendChild(name);
      link.appendChild(species);
      link.appendChild(status);

      card.appendChild(link);
      grid.appendChild(card);
    });
  }
  container.appendChild(grid);
}
