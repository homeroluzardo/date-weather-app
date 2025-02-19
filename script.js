function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").textContent = now.toLocaleDateString("en-US", dateOptions);
}
setInterval(updateClock, 1000);
updateClock();

async function fetchWeather(lat, lon, cityName = "Unknown") {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ec9e4a021a867c6c90925b09040ad853&units=metric&lang=en`
    );
    const data = await response.json();

    // Temperatura en Celsius y Fahrenheit
    const tempCelsius = data.main.temp;
    const tempFahrenheit = (tempCelsius * 9/5) + 32;

    // Obtener el icono del clima
    const weatherIconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

    // Mostrar el clima con la temperatura en °C y °F
    document.getElementById("weather").textContent = 
      `Weather in ${cityName}: ${data.weather[0].description}, ${tempCelsius}°C / ${tempFahrenheit.toFixed(1)}°F`;

    // Mostrar el icono del clima
    document.getElementById("weather-icon").src = iconUrl;
  } catch (error) {
    document.getElementById("weather").textContent = "Unable to fetch weather data";
  }
}

async function getLocation() {
  try {
    const response = await fetch("https://www.geoplugin.net/json.gp");
    const data = await response.json();

    if (!data.geoplugin_latitude || !data.geoplugin_longitude) {
      throw new Error("Location data unavailable");
    }

    const lat = data.geoplugin_latitude;
    const lon = data.geoplugin_longitude;
    const city = data.geoplugin_city || "Unknown";

    // Mostrar la ciudad obtenida
    document.getElementById("city").textContent = `City: ${city}`;
    
    fetchWeather(lat, lon, city);
  } catch (error) {
    // Si hay un error, usar New York por defecto
    document.getElementById("city").textContent = "City: New York";
    fetchWeather(40.7128, -74.0060, "New York");
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
