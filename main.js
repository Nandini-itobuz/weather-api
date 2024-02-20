const getLocation = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");
const tempNumber = document.getElementsByClassName("temprature");
const backgroundTemp = document.querySelector(".sunny");
const weather = document.getElementsByClassName("current-condition");
const time = document.getElementsByClassName("time");
const place = document.getElementsByClassName("place");
const errorMessage = document.getElementById("error-msg");

function processUserLocation(userLoc) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const curr_condition = userLoc.current.condition.text;
  const degreeSymbol = "\u00B0";
  const date = new Date();

  tempNumber[0].textContent = userLoc.current.temp_c + degreeSymbol;
  place[0].textContent = userLoc.location.name;
  weather[0].textContent = curr_condition;
  errorMessage.textContent = "";
  time[0].textContent = date.toLocaleString("en-IN", options);
  if (curr_condition === "Mist") {
    backgroundTemp.classList.remove("rainy");
    backgroundTemp.classList.remove("sunny");
    backgroundTemp.classList.add("snowy");
  }

  if (
    curr_condition === "Partly cloudy" ||
    curr_condition === "Light rain" ||
    curr_condition === "Overcast" ||
    curr_condition === "Moderate or heavy rain with thunder"
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

getLocation.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    loc = getLocation.value;
    let apiurl ="https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +loc +"&aqi=no";
    getLocation.value = "";
    fetch(apiurl)
      .then((response) => {
        if (!response.ok) {
          console.log("Not Ok");
        }
        return response.json();
      })
      .then((userLoc) => {
        processUserLocation(userLoc);
      })
      .catch((error) => {
        locationNotFound();
        console.error("Error:", error);
      });
  }
});
