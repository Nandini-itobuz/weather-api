const getLocation = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");
const tempNumber = document.getElementsByClassName("temprature");
const backgroundTemp = document.querySelector(".sunny");
const weather = document.getElementsByClassName("current-condition");
const time = document.getElementsByClassName("time");
const place = document.getElementsByClassName("place");
const errorMessage = document.getElementById("error-msg");

function processUserLocation(name, text, temp_c) {
  const curr_condition = text;
  const degreeSymbol = "\u00B0";
  const date = new Date();
  newDate = date.toDateString();

  tempNumber[0].textContent = temp_c + degreeSymbol;
  place[0].textContent = name;
  weather[0].textContent = curr_condition;
  errorMessage.textContent = "";
  time[0].textContent = newDate;
  if (
    curr_condition === "Partly cloudy" ||
    curr_condition === "Mist" ||
    curr_condition === "Freezing fog" ||
    curr_condition === "Light snow" ||
    curr_condition === "Cloudy" ||
    curr_condition === "Moderate or heavy snow showers"
  ) {
    backgroundTemp.classList.remove("rainy");
    backgroundTemp.classList.remove("sunny");
    backgroundTemp.classList.add("snowy");
  }

  if (
    curr_condition === "Light rain" ||
    curr_condition === "Overcast" ||
    curr_condition === "Patchy rain nearby" ||
    curr_condition === "Moderate or heavy rain with thunder" ||
    curr_condition === "Moderate rain"
  ) {
    backgroundTemp.classList.remove("sunny");
    backgroundTemp.classList.remove("snowy");
    backgroundTemp.classList.add("rainy");
  }

  if (curr_condition === "Clear" || curr_condition === "Sunny") {
    backgroundTemp.classList.remove("rainy");
    backgroundTemp.classList.remove("snowy");
    backgroundTemp.classList.add("sunny");
  }
}

function locationNotFound() {
  errorMessage.textContent = "Location not Found!";
  tempNumber[0].textContent = "-";
  place[0].textContent = "----";
  weather[0].textContent = "----";
  time[0].textContent = "-----------";
}

function fetchData() {
  loc = getLocation.value;
  let apiurl ="https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +loc +"&aqi=no";
  getLocation.value = "";
  fetch(apiurl)
    .then((response) => {
      return response.json();
    })
    .then((userLoc) => {
      const { location: locationMain, current: current } = userLoc;
      const {name } = locationMain;
      const {condition :{text} } = current;
      const {temp_c} =current;
      processUserLocation(name, text, temp_c);
    })
    .catch((error) => {
      locationNotFound();
      console.error("Error:", error);
    });
}

function getPlace() {
  fetchData();
}

getLocation.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchData();
  }
});
