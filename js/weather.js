const API_KEY = "aeaf790446d5d5bd11a6d4eff7e273c2";

const searchBar = document.querySelector(".search-bar input");
const todayImg = document.querySelector(".today-img");

const getCoords = async (city = "Seoul") => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );

  const result = await response.json();
  const {
    coord: { lat, lon },
  } = result;

  return { lat, lon };
};

const getTodayWeather = async (lat, lon, unit = "metric") => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  );
  const result = await response.json();
  const {
    main: { temp_max, temp_min, feels_like, humidity },
    name,
    wind: { speed },
    sys: {},
  } = result;

  const iconcode = result.weather[0].icon;

  const weatherData = {
    temperatureMax: temp_max,
    temperatureMin: temp_min,
    feelsLike: feels_like,
    humidity: humidity,
    cityName: name,
    windSpeed: speed,
    iconcode: iconcode,
  };

  return weatherData;
};

getCoords();
