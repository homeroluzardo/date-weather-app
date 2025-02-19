function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds}`;

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-US",
    dateOptions
  );
}
setInterval(updateClock, 1000);
updateClock();

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ec9e4a021a867c6c90925b09040ad853&units=metric&lang=en`
    );
    const data = await response.json();

    // Temperatura en Celsius
    const tempCelsius = data.main.temp;
    // Conversión a Fahrenheit
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;

    // Obtener el código del icono del clima
    const weatherIconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`; // URL del icono

    // Mostrar el clima con la temperatura en °C y °F
    document.getElementById("weather").textContent = `Weather in ${
      data.name
    }: ${data.weather[0].description}, ${tempFahrenheit.toFixed(
      1
    )}°F / ${tempCelsius}°C`;

    // Mostrar el icono del clima
    document.getElementById("weather-icon").src = iconUrl;
  } catch (error) {
    document.getElementById("weather").textContent =
      "Unable to fetch weather data";
  }
}

async function getLocation() {
  try {
    const response = await fetch("http://ip-api.com/json");
    const data = await response.json();
    const lat = data.lat;
    const lon = data.lon;
    const city = data.city; // Obtener el nombre de la ciudad

    // Mostrar el nombre de la ciudad
    document.getElementById("city").textContent = `City: ${city}`;

    fetchWeather(lat, lon);
  } catch (error) {
    document.getElementById("weather").textContent =
      "Unable to fetch location data";
  }
}

getLocation();

// OBTENER LA GEOLOCALIZACION DEL USUARIO.

/*
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds}`;

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-US",
    dateOptions
  );
}
setInterval(updateClock, 1000);
updateClock();

async function fetchWeather(lat, lon) {
  const apiKey = "ec9e4a021a867c6c90925b09040ad853";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
    );
    const data = await response.json();
    document.getElementById(
      "weather"
    ).textContent = `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
  } catch (error) {
    document.getElementById("weather").textContent =
      "Unable to fetch weather data";
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        document.getElementById("weather").textContent =
          "Location access denied";
      }
    );
  } else {
    document.getElementById("weather").textContent =
      "Geolocation not supported";
  }
}

getLocation();
*/
