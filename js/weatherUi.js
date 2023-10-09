import * as api from "./weather.js";
import weatherImages from "./constans.js";
import { createGifImage } from "./gifs.js";
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
      maxTempElement.textContent = parseInt(maxtmp) + "°";
      minTempElement.textContent = parseInt(mintmp) + "°";
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

  feelsLike.textContent = parseInt(weatherData.feelsLike) + "°";
  humidity.textContent = weatherData.humidity + "%";
  sunset.textContent = convertTimestamp(weatherData.sunset);
  windSpeed.textContent = weatherData.windSpeed + "m/s";
};

function convertTimestamp(sunsetTimestamp) {
  const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert to milliseconds

  const hours = String(sunsetDate.getHours()).padStart(2, "0");
  const minutes = String(sunsetDate.getMinutes()).padStart(2, "0");
  const seconds = String(sunsetDate.getSeconds()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
}

displayTodayDetail();
displayWeatherData();
