import * as api from "./weather.js";
import weatherImages from "./constans.js";
import { getGifUrl } from "./gifs.js";
import { getWeekdayFromDate, convertTimestamp } from "./utils.js";
const searchBar = document.querySelector(".search-bar input");
searchBar.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    const searchCity = e.target.value;

    await displayWeatherData(searchCity);
    await displayTodayDetail(searchCity);
    await displayGifImage(searchCity);

    searchBar.value = "";
  }
});

const displayWeatherData = async (cityName = "Seoul") => {
  const { lat, lon } = await api.getCoords(cityName);
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

const displayTodayDetail = async (cityName = "Seoul") => {
  const { lat, lon } = await api.getCoords(cityName);
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

const displayGifImage = async (searchTerm = "Seoul") => {
  const url = await getGifUrl(searchTerm);
  const gifImage = document.querySelector(".gif-image");
  gifImage.src = url;
};

displayTodayDetail();
displayWeatherData();
displayGifImage();
api.getWeatherMap();
