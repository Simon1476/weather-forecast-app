import * as api from "./weather.js";
import weatherImages from "./constans.js";

const displayWeatherData = async () => {
  const { lat, lon } = await api.getCoords();
  const forecastData = await api.getforeCast(lat, lon);

  const ulElements = document.querySelectorAll("ul");
  ulElements.forEach((ul, index) => {
    if (index <= ulElements.length) {
      const maxtmp = forecastData.maxtmp[index];
      const mintmp = forecastData.mintmp[index];
      const weatherCode = forecastData.weathercode[index];
      const dateString = forecastData.time[index];
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

const getWeekdayFromDate = (dateString) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return dayNames[dayIndex];
};

const displayTodayDetail = async () => {
  const { lat, lon } = await api.getCoords();
  const weatherData = await api.getTodayWeather(lat, lon);
  console.log(weatherData);
  const location = document.querySelector(".location");
  location.textContent = weatherData.cityName;

  const feelsLike = document.querySelector(".feels-like-info > span");
  const humidity = document.querySelector(".humidity-info > span");
  const sunset = document.querySelector(".sunset-info > span");
  const windSpeed = document.querySelector(".wind-speed-info > span");

  feelsLike.textContent = parseInt(weatherData.feelsLike);
  humidity.textContent = weatherData.humidity;
  sunset.textContent = weatherData.sunset;
  windSpeed.textContent = weatherData.windSpeed;
};

displayTodayDetail();
displayWeatherData();
