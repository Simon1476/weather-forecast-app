const getGifUrl = async (searchTerm = "Seoul") => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=iFooQPDHMmF6NnBtd6fxQNLXW9xg0DI2&s=${searchTerm}`,
    {
      mode: "cors",
    }
  );
  const result = await response.json();
  const url = result.data.images.original.url;
  return url;
};

const saveGifImage = () => {
  const gifImage = document.querySelector(".gif-image");
  const gifImageUrl = gifImage.getAttribute("src");

  // Create an invisible anchor element
  const downloadLink = document.createElement("a");
  console.log(downloadLink);
  downloadLink.href = gifImageUrl;
  downloadLink.target = "_blank";

  // Append the anchor to the document and trigger the click event
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove the anchor element from the document
  document.body.removeChild(downloadLink);
};

export { getGifUrl, saveGifImage };
