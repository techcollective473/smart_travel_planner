let places = [];

// FETCH DATA
fetch("data.json")
.then(res => res.json())
.then(data => {
  places = data;
  renderFilters();
});

// TOGGLE DROPDOWN
function toggleBox(id) {
  document.querySelectorAll(".dropdown-menu").forEach(d => {
    if (d.id !== id) d.style.display = "none";
  });

  const box = document.getElementById(id);
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function closeBox(id) {
  document.getElementById(id).style.display = "none";
}

// RENDER FILTERS
function renderFilters() {

 const interestList = [
  "Spiritual","Historical","UNESCO","Wildlife","Beaches",
  "Mountains","Festivals","Adventure","Hiking","Ecological","Scenic"
];

const stateList = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu","Delhi",
  "Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"
];

  const iBox = document.getElementById("interestBox");
  const sBox = document.getElementById("stateBox");

  // keep apply button safe
  const iApply = iBox.querySelector(".apply-btn");
  const sApply = sBox.querySelector(".apply-btn");

  iBox.innerHTML = "";
  sBox.innerHTML = "";

  interestList.forEach(i => {
    iBox.innerHTML += `<label><input type="checkbox" value="${i}"> ${i}</label>`;
  });

  stateList.forEach(s => {
    sBox.innerHTML += `<label><input type="checkbox" value="${s}"> ${s}</label>`;
  });

  // re-add apply button
  iBox.appendChild(iApply);
  sBox.appendChild(sApply);
}

// APPLY FILTER
function applyFilter() {

  const selectedI = [...document.querySelectorAll("#interestBox input:checked")].map(i => i.value);
  const selectedS = [...document.querySelectorAll("#stateBox input:checked")].map(i => i.value);

  const result = places.filter(p => {

    const tags = p.tags || [];
    const state = p.state || "";

    const iMatch = selectedI.length === 0 || selectedI.some(i => tags.includes(i));
    const sMatch = selectedS.length === 0 || selectedS.includes(state);

    return iMatch && sMatch;
  });

  showCards(result);
}

// SHOW CARDS
function showCards(data) {

  const container = document.getElementById("filteredCards");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<h2>No places found 😕</h2>";
    return;
  }

  data.forEach(p => {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <h2>${p.name}</h2>
    `;

    div.onclick = () => openModal(p);

    container.appendChild(div);
  });
}

// RESET
function resetAll() {
  document.querySelectorAll("input").forEach(i => i.checked = false);
  document.getElementById("filteredCards").innerHTML = "";
}

// MODAL
async function openModal(p) {
  document.getElementById("modal").style.display = "block";

  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalTitle").innerText =
    p.name + ", " + (p.state || "");

  document.getElementById("shortDesc").innerText = p.short;
  document.getElementById("longDesc").innerText = p.long;

  document.getElementById("airport").innerText = p.nearest_airport;
  document.getElementById("rail").innerText = p.nearest_railway_station;

  // WEATHER (demo safe)
  document.getElementById("weather").innerText = "Weather not available";
  /*if (p.lat && p.lon) {
    try {
      const res = await fetch(
        https://api.openweathermap.org/data/2.5/weather?lat=${p.lat}&lon=${p.lon}&appid=YOUR_API_KEY&units=metric
      );
      const data = await res.json();
      document.getElementById("weather").innerText =
        data.main.temp + "°C";
    } catch {
      document.getElementById("weather").innerText = "Error";
    }
  }

  // MAP
  document.getElementById("map").src =
    https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed;8*/
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function toggleDesc() {
  const d = document.getElementById("longDesc");
  const btn = document.getElementById("toggleBtn");

  if (d.style.display === "none") {
    d.style.display = "block";
    btn.innerText = "See Less";   // 🔥 change text
  } else {
    d.style.display = "none";
    btn.innerText = "See More";
  }
}