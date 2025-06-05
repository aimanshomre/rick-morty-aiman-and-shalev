/**
 * Location Detail Page Script
 * Handles the display of detailed information for a single location
 */

async function fetchLocationById(id) {
  const url = `https://rickandmortyapi.com/api/location/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Location not found");
  return res.json();
}

async function fetchResidentsByIds(ids) {
  if (!ids.length) return [];
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Residents not found");
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

document.addEventListener("DOMContentLoaded", () => {
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

async function loadLocationDetails(id, pgnum) {
  const container = document.getElementById("containerList");
  container.innerHTML = "<p>Loading...</p>";
  try {
    const location = await fetchLocationById(id);
    const residentIds = location.residents.map((url) => url.split("/").pop());
    const residents = await fetchResidentsByIds(residentIds);
    updateUI(location, residents, pgnum);
  } catch (err) {
    container.innerHTML = `<p>Error loading location: ${err.message}</p>`;
  }
}

function updateUI(location, residents, pgnum) {
  const container = document.getElementById("containerList");
  container.innerHTML = "";

  // Location header
  const header = document.createElement("div");
  header.innerHTML = `
    <h2>${location.name}</h2>
    <p><strong>Type:</strong> ${location.type}</p>
    <p><strong>Dimension:</strong> ${location.dimension}</p>
  `;
  container.appendChild(header);

  // Residents grid
  const grid = document.createElement("div");
  grid.className = "containers";
  if (!residents.length) {
    grid.innerHTML = "<p>No residents in this location.</p>";
  } else {
    console.log(residents);
    residents.forEach((resident) => {
      const card = document.createElement("div");
      card.className = "character-card";
      const pgnumForChar = localStorage.getItem(`pgnum_${resident.id}`) || 1;
      card.innerHTML = `
    <a href="character-detail.html?id=${resident.id}&pgnum=${pgnumForChar}">
      <img src="${resident.image}" alt="${resident.name}" style="width:100px;border-radius:1rem;">
      <h4>${resident.name}</h4>
      <p>Species: ${resident.species}</p>
      <p>Status: ${resident.status}</p>
    </a>
  `;
      grid.appendChild(card);
    });
  }
  container.appendChild(grid);
}
