const getGifUrl = async () => {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=iFooQPDHMmF6NnBtd6fxQNLXW9xg0DI2&s=cats",
    {
      mode: "cors",
    }
  );
  const result = await response.json();
  const url = result.data.images.original.url;
  return url;
};

export { getGifUrl };
