// ROLLING TEXT
const texts = ["नमस्ते","নমস্কার","வணக்கம்","ನಮಸ್ಕಾರ","ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ"];
let i = 0;

function rollText() {
  const text = document.getElementById("text");

  text.style.transform = "translateY(-60px)";

  setTimeout(() => {
    i = (i + 1) % texts.length;
    text.innerText = texts[i];

    text.style.transition = "none";
    text.style.transform = "translateY(60px)";

    setTimeout(() => {
      text.style.transition = "transform 0.6s ease";
      text.style.transform = "translateY(0)";
    }, 50);

  }, 600);
}

setInterval(rollText, 1500);

// INTRO SWIPE
setTimeout(() => {
  document.getElementById("intro").style.transform = "translateY(-100%)";
    document.body.style.overflow = "auto";
}, 6000);

// ==============================
// 🔥 CARDS + JSON
// ==============================
let places = [];
let autoIndex = 0;

// FETCH JSON
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    places = data;

    // optional random shuffle
    places.sort(() => Math.random() - 0.5);

    createCards();
    renderFilters(); 
  });

// CREATE CARDS
function createCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  places.forEach(p => {
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

// UPDATE
function updateSlide() {
  document.getElementById("cards").style.transform =
    `translateX(-${autoIndex * 304}px)`;
}

// NEXT
function next() {
  autoIndex++;
  if (autoIndex >= places.length) autoIndex = 0;
  updateSlide();
}

// PREV
function prev() {
  autoIndex--;
  if (autoIndex < 0) autoIndex = places.length - 1;
  updateSlide();
}

// AUTO SWIPE
setInterval(() => {
  if (!places.length) return;

  autoIndex++;
  if (autoIndex >= places.length) autoIndex = 0;

  updateSlide();
}, 2500);
// ==============================
// 🔥 MODAL
// ==============================

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
    https://maps.google.com/maps?q=${p.lat},${p.lon}&z=12&output=embed;*/
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
// ==============================
// 🔥 DISCOVER BUTTON NAVIGATION
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("discoverBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "destinations.html";
    });
  }
});
