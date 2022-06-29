let apiKey = "a44c97cff6418cd583f07b8a2e2c5ff4";

function weatherData(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey)
        .then((response) => response.json())
        .then((data) => this.weatherDisplay(data));
}

function currentWeatherData(lat, long) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + apiKey)
            .then((response) => response.json())
            .then((data) => weatherDisplay(data));
}

function weatherDisplay(data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name, icon, description, temp, humidity, speed);

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weather-icon").innerHTML = "Weather Icon";
    document.querySelector(".description").innerHTML = description.substr(0, 1).toUpperCase() + description.substr(1);
    document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed : " + speed + " km/h";
}

function cityName() {
    let place = document.getElementById("search").value;
    weatherData(place);
}

function currentData() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat, long);
    currentWeatherData(lat, long);
}

function errorFunction(position) {
    alert('Error!');
}