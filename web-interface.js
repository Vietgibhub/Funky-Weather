let weather = {
  apiKey: "1729b525dc136d91e7e16745986693e3",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data)); 
  },
  displayWeather: function (data) { //data is the object that is returned from the API
    const { name } = data; 
    const { icon, description, main} = data.weather[0];
    const { temp, humidity} = data.main; 
    const { speed } = data.wind; 
    document.querySelector(".city").innerText = "Weather in " + name; //display 
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; //display 
    document.querySelector(".description").innerText = description; //display 

    document.querySelector(".temp").innerText = temp + "°F"; //display 
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%"; //display 
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h"; //display 
    document.querySelector(".weather").classList.remove("loading"); //remove the loading class
	document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + main + "')";	
  }, //display the background image followings the weather
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value); //fetch the weather of the city that is typed in the search bar
  },
};

document.querySelector(".search button").addEventListener("click", function () { 
  weather.search(); //when the search button is clicked, the search function is called
});

document
  .querySelector(".search-bar") //when the enter key is pressed, the search function is called
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Lawrence");


function myFunction() {
  if (weather.main == "Rain"){
window.open("rain-game/index.html", "_blank", 
"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=960,height=740");}
else {
window.open("sun-game/index.html", "_blank", 
 "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=960,height=740");}
}
