let weather = {
    apiKey: "4b512a877bb2f723b4bc54f99fc15d08",
    //when you call a function w/arrow notation, this is bound to it by default
    latAndLong (city) {
        console.log(this); 
        console.log(typeof this.apiKey);
        console.log(typeof city);
        fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}`
            )
           
            .then((response) => response.json())
           
            .then((data) => this.getWeather(data[0].lat, data[0].lon))
            .catch((e) => {
                console.error(e);
            });
    },

    cityData: "",

    getWeather(latitude, longitude){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${this.apiKey}`
        )
        
        .then((response) => response.json())
        
        .then((data) => {
            this.cityData = data;
            updateDom(this.cityData); 
            
        })
        .catch((e) => {
            console.error(e);
        });
       
    },
    
    search(){
        let searchCity = document.querySelector(".search-bar").value;
        this.latAndLong(searchCity);
        // console.log(typeof document.querySelector(".search-bar").value);
    }

    
    
}; 


//adding the event listener to the button:
const searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", function () {
    console.log(weather);
    weather.search();
});


// console.log(searchValue);
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feels");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");



function updateDom(data){
    console.log(data);
    let roundedFeelsLike = data.main.feels_like.toFixed(1);
    let roundedTemp = data.main.feels_like.toFixed(1);

    //update city, temp, description, etc with Current weather data fetch info: 
    // city.textContent = `Weather in ${weather.latAndLong.data[0].name}`;
    let weatherDescription = `${data.weather[0].description}`;
    // console.log(data.name); 
    city.textContent = `Weather in ${data.name}`;
    temp.textContent = `Temperature: ${roundedTemp}°F`; 
    feelsLike.textContent = `Feels Like: ${roundedFeelsLike}°F`; 
    description.textContent = titleCase(weatherDescription);
    humidity.textContent = `Humidity: ${data.main.humidity}%`; 
    wind.textContent = `Wind Speed: ${data.wind.speed} mph`;
}


//Starts up the app, manually. Placed here for testing purposes:
//weather.latAndLong("Philadelphia");





//titleCase function for strings that need title-casing
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}