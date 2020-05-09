info about weatherAPI

https://openweathermap.org/current

API call by city name:
api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

API call by ZIP code:
api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

API response:
  "weather":
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
 
  "main": 
    "temp": 281.52,
    "feels_like": 278.99,
    "temp_min": 280.15,
    "temp_max": 283.71,
    "pressure": 1016,
    "humidity": 93
 
  "wind": 
    "speed": 0.47,
    "deg": 107.538
  
  "clouds": 
    "all": 2
  
  "dt": 1560350192,
  "sys": 
    "type": 3,
    "id": 2019346,
    "message": 0.0065,
    "country": "JP",
    "sunrise": 1560281377,
    "sunset": 1560333478
  
  "timezone": 32400,
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200

  "weather":
    "main":
      Descriptions:
        clear sky
        few clouds
        scattered clouds
        broken clouds
        shower rain
        rain
        thunderstorm
        snow
        mist


    var APIKey = "559128091adc296606d81557e10424fa";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $.ajax({url: queryURL, method: 'GET'})
      console.log(response)
      var tempFahrenheit = Math.round(((response.main.temp) - 273.15) * 1.80 + 32);
      console.log(tempFahrenheit)
      var main = response.weather[0].description;
      console.log(main);
      $('').html(`  ${tempFahrenheit}        `);
      $('').html(`  ${main}                  `);

