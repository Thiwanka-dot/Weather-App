const apiKey = "3f985a0817320ae101fed1e2c20ea91c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn= document.querySelector(".search button"); //when the button is clicked, checkWeather function is working
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){ //from here, we can change the image of weather of on city name
        weatherIcon.src = "Images/cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "Images/sun.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "Images/cloudy (1).png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "Images/rainy-day.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "Images/fog.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value); //this checks whether the city info is displayed in the input field.
    //the searchBox will give the city name written in the input field and it will pass the city name checkWeather function
    //so that it will be added in the API and provide the info of the targeted city
})