function changeEngine(evt) {
  const engine = document.getElementById("currentengine");
  engine.value = evt.currentTarget.value;
  document.forms["searchform"].requestSubmit();
}

function searchWithEngine(evt) {
  evt.preventDefault();
  const engine = document.getElementById("currentengine").value;
  const url = engine + evt.currentTarget.elements[0].value;
  window.location.href = url;
}

const weathercodes = {
  0: "clear",
  1: "clear",
  2: "cloudy",
  3: "overcast",
  45: "fog",
  48: "rime_fog",
  51: "drizzle1",
  53: "drizzle2",
  55: "drizzle3",
  56: "freezing_drizzle1",
  57: "freezing_drizzle2",
  61: "rain1",
  63: "rain2",
  65: "rain3",
  66: "freezing_rain1",
  67: "freezing_rain2",
  71: "snow1",
  73: "snow2",
  75: "snow5",
  77: "snow_grains",
  80: "rain_shower1",
  81: "rain_shower2",
  82: "rain_shower3",
  85: "snow_shower1",
  86: "snow_shower2",
  95: "thunderstorm",
  96: "thunderstorm_hail1",
  99: "thunderstorm_hail2",
};

const icons = {
  clear: "sun",
  overcast: "cloudy",
  cloudy: "cloudy",
  fog: "foggy",
  freeze: "hail",
  hail: "hail",
  snow: "snowy",
  drizzle: "drizzle",
  rain: "rainy",
  rain_shower: "showers",
  thunderstorm: "thunderstorms",
};

function loadicons(el) {
  for (let o of new Set(Object.values(icons))) {
    const svg = document.createElement("img");
    svg.src = `icons/weather/${o}.svg`;
    svg.classList.add("weathericon");
    svg.classList.add(`${o}`);
    el.appendChild(svg);
  }
}

function weather_ui(num) {
  const wth = weathercodes[num] ?? -1;
  [...document.querySelectorAll(".weathericon")].map((e) => {
    e.classList.add("hide");
  });
  for (const icon of new Set(Object.keys(icons))) {
    if (wth.includes(icon)) {
      document.querySelector(`.${icons[icon]}`).classList.remove("hide");
    }
  }
}

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function weather_load(latitude, longitude) {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    console.error("Latitude/Longitude not a number");
  }
  const site = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max&current_weather=true&timezone=auto&forecast_days=1`;
  fetchAsync(site).then((val) => weather_process(val));
}

function set_degree_text(id, text) {
  document.getElementById(id).innerText = `${text} °C`;
}

function weather_process(j) {
  set_degree_text("w_tmin", j.daily.temperature_2m_min[0]);
  set_degree_text("w_tmax", j.daily.temperature_2m_max[0]);
  set_degree_text("w_a_tmax", j.daily.apparent_temperature_max[0]);
  set_degree_text("w_a_tmin", j.daily.apparent_temperature_min[0]);
  set_degree_text("w_ctemp", j.current_weather.temperature);
  weather_ui(j.daily.weathercode[0]);
}
