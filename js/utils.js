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

const convertTimestamp = (sunsetTimestamp) => {
  const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert to milliseconds

  const hours = String(sunsetDate.getHours()).padStart(2, "0");
  const minutes = String(sunsetDate.getMinutes()).padStart(2, "0");
  const seconds = String(sunsetDate.getSeconds()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export { getWeekdayFromDate, convertTimestamp };
