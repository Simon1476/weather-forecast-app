import * as api from "./weather.js";
import weatherImages from "./constans.js";

const showWeatherData = async () => {
  const { lat, lon } = await api.getCoords();
  const weatherData = await api.getforeCast(lat, lon);
  console.log(weatherData);

  const ulElements = document.querySelectorAll("ul");
  ulElements.forEach((ul, index) => {
    if (index <= ulElements.length) {
      const maxtmp = weatherData.maxtmp[index];
      const mintmp = weatherData.mintmp[index];
      const weatherCode = weatherData.weathercode[index];
      const dateString = weatherData.time[index];

      const weekday = getWeekdayFromDate(dateString);

      const dayElement = ul.querySelector(".day");
      const maxTempElement = ul.querySelector(".maxtmp");
      const minTempElement = ul.querySelector(".mintmp");
      const ulElement = ul.querySelector(".weather-img");
      // Update the temperature values
      dayElement.textContent = weekday;
      ulElement.setAttribute("src", weatherImages[weatherCode]);
      maxTempElement.textContent = parseInt(maxtmp);
      minTempElement.textContent = parseInt(mintmp);
    }
  });
};

showWeatherData();
