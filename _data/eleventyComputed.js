const Image = require("@11ty/eleventy-img");
async function getAllIcons(data) {
  icons = {};
  if (Object.keys(data).length === 0) return icons;
  for (const [name, page] of Object.entries(data.pages)) {
    const url = `node_modules/@svg-icons/fa-solid/${page["icon"]}.svg`;
    const url2 = `node_modules/@svg-icons/remix-fill/${page["icon"]}.svg`;
    try {
      let metadata = await Image(url, {
        formats: ["svg"],
        dryRun: true,
      });
      icons[page["icon"]] = metadata.svg[0].buffer.toString();
    } catch (error) {
      try {
        let metadata2 = await Image(url2, {
          formats: ["svg"],
          dryRun: true,
        });
        icons[page["icon"]] = metadata2.svg[0].buffer.toString();
      } catch (error) {
        console.error(error);
        console.error("no image.");
      }
    }
  }
  return icons;
}
async function getWeatherIcons(data) {
  icons = {};
  if (Object.keys(data).length === 0) return icons;
  for (const o of Object.values(data.weather_map)) {
    const url = `node_modules/@svg-icons/remix-fill/${o}.svg`;
    try {
      let metadata = await Image(url, {
        formats: ["svg"],
        dryRun: true,
      });
      icons[o] = metadata.svg[0].buffer.toString();
    } catch (error) {
      console.error(error);
    }
  }
  return icons;
}
module.exports = {
  computedicons: async function (data) {
    const icons = await getAllIcons(data);
    return icons;
  },
  weather_map: {
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
  },
  weathericons: async (data) => getWeatherIcons(data),
};
