const weather = {};
weather.temperature = {
  unit: 'F',
};

// Get the Weather data
function getWeather() {
    
    let latitude = localStorage.getItem('lat');
    let longitude = localStorage.getItem('long');
    let key = localStorage.getItem('weatherApiKey');

    //let key = undefined;
    if (!key)
    {
        document.querySelector('.weather').remove();
    }

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    const KELVIN = 273.15;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            let celsius = Math.floor(data.main.temp - KELVIN);
            weather.temperature.value =
                weather.temperature.unit == 'C' ? celsius : (celsius * 9) / 5 + 32;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
        })
        .then(function () {
            displayWeather();
        })
        .catch((error) => 
        {
            console.log(error);
            document.querySelector('.weather').remove();
        })
}

// Display Weather info
function displayWeather() {
    console.log(weather);
    const weatherSpan =  document.querySelector('.weather');

    weatherSpan.innerHTML = `${weather.temperature.value}°<span class='temp-unit'>${weather.temperature.unit}</span> ${capitalizeTheFirstLetterOfEachWord(weather.description)}`
}


function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }