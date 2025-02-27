function refreshweather(response) {
  let temperatureElement = document.querySelector('#temperature');
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector('#weather-app-city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let speedElement = document.querySelector('#speed');
  let timeElement = document.querySelector('#time');
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector('#icon');

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = 'e2f90841bba6oe00351f9aa2e3877b4t';
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e2f90841bba6oe00351f9aa2e3877b4t&units=metric`;
  axios.get(apiURL).then(refreshweather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#search-form-input');
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector('#searchform');
searchFormElement.addEventListener('submit', handleSearchSubmit);

searchCity('London');
