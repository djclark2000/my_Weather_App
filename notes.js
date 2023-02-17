let weather = {
    apiKey: "4b512a877bb2f723b4bc54f99fc15d08",
    latAndLong(city) {
        //Using the city name to get the lat and long
        //This is the geo-coding fetch 
        //We give it a city, it gives us the limit(ie.top 5) results 
        fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=imperial&limit=5&appid=${this.apiKey}`
            )
            //take what we got from the fetch (which is a json file), 
            //and turn it into something JS understands (parse it into JS(object))
            .then((response) => response.json())
            //now we have a data object via the weather map api, and 
            //we refer to it as 'data'(or pizza) in the parameter
            //we call the getWeather()function and enter lat and long as the arguments
            .then((data) => this.getWeather(data[0].lat, data[0].lon));
    
    },

    cityData: "",

    getWeather(latitude, longitude){

        //Current weather data fetch: 
        //Gets temp, visibilty, wind-speed, etc
        //string interpolate the latitude and longitude parameters into to the fetch:
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${this.apiKey}`
        )
         //take what we got from the fetch (which is a json file), 
        //and turn it into something JS understands (parse it into JS(object))
        .then((response) => response.json())
        //now we have a data object via the weather map api, and 
        //we refer to it as 'data'(or pizza) in the parameter
        //we call the updateDom function and enter this.cityData as the argument, and cityData gets updated with all of the data info (the 'blob' that was promised)
        .then((data) => {
            this.cityData = data;
            updateDom(this.cityData); 
            
        });
        //We're ready to plug this function into the .then callback function of latAndLong()
    },

    //function that adds the value of input.search-bar as the argument for latAndlong() - and calls it; 
    search(){
        this.latAndLong(document.querySelector(".search-bar").value);
    }
    //We'll now add this to the Event Listener callback function below
}; 


//adding the event listener to the button:
const searchButton = document.querySelector(".search button");
searchButton.addEventListener("click", function () {
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
// weather.latAndLong("Austin");





//titleCase function for strings that need title-casing
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}