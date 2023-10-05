const API_KEY = "aeaf790446d5d5bd11a6d4eff7e273c2";

const searchBar = document.querySelector(".search-bar input");

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

getCoords();
