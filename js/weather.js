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

const getforeCast = async (lat, lon, unit = "metric") => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}4&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FTokyo`
  );
  const result = await response.json();
  console.log(result);
  const {
    daily: {
      temperature_2m_max: maxtmp,
      temperature_2m_min: mintmp,
      time,
      weathercode,
    },
  } = result;

  const forecastData = {
    maxtmp,
    mintmp,
    time,
    weathercode,
  };

  return forecastData;
};

getCoords();

export { getCoords, getTodayWeather, getforeCast };
