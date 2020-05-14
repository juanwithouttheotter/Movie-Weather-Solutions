$(document).ready(function () {

    // var existingCities = [];

    // // $('#searchInput').autoComplete({
    //     resolver: 'custom',
    //     minLength: 1,
    //     events: {
    //         search: function (query, callback) {

    //             var foundCities = getCitiesSearchResult(existingCities, query);

    //             if (foundCities.length != 0) {
    //                 callback(foundCities);
    //             } else {
    //                 $.ajax({
    //                     url: "./assets/cities.json",
    //                 }).done(function (data) {
    //                     existingCities = data;

    //                     callback(getCitiesSearchResult(existingCities, query));
    //                 }).fail(function (e) {
    //                     console.log(e);
    //                 });
    //             }
    //         }
    //     }
    // });

    // function getCitiesSearchResult(existingCities, query) {
    //     var foundCities = existingCities.filter(function (entry) {
    //         return entry.city.toLowerCase().includes(query.toLowerCase());
    //     });

    //     return foundCities.map(function (entry) {
    //         return entry.city + ', ' + entry.state_id;
    //     });
    // }

    //refacting the weather url
    $("#searchInput").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var cityObject = $("#searchInput").val();
            console.log(cityObject);
            showWeatherConditions(cityObject);
        }
    });

    function showWeatherConditions(cityObject) {

        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityObject + "&appid=b212266a3b5800f1c727bf9539b273bb";

        $.get(weatherUrl, function (response) {

            onWeatherInformation(response, cityObject);
        });
    }

    //rule for the weather and the genre
    function WeatherGenreMap() {
    }
    
    WeatherGenreMap.prototype.Weather = "";
    WeatherGenreMap.prototype.Genres = "";
    
    function getWeatherGenreMappings() {
        var mappingArray = [];
    
        mappingArray.push(createWeatherGenreMap('Clear', '28,10752'));
        mappingArray.push(createWeatherGenreMap('Tornado', '9648'));
        mappingArray.push(createWeatherGenreMap('Fog', '12,16'));
        mappingArray.push(createWeatherGenreMap('Drizzle', '80'));
        mappingArray.push(createWeatherGenreMap('Clouds', '37,36'));
        mappingArray.push(createWeatherGenreMap('Rain', '10749,10402,14'));
        mappingArray.push(createWeatherGenreMap('Thunderstorm', '27,878'));
        mappingArray.push(createWeatherGenreMap('Snow', '18,10751'));
        mappingArray.push(createWeatherGenreMap('Mist', '35'));
    
        return mappingArray;
    }
    
    function createWeatherGenreMap(weather,  genres) {
       var weatherGenreMap = new WeatherGenreMap();
       weatherGenreMap.Weather = weather;
       weatherGenreMap.Genres = genres;
    
       return weatherGenreMap;
    }
    
    

    //retrieving movies by genre code
    // see MovieAPI.md for more genre codes
    var genreCode = 28;
    var pageNum = Math.floor((Math.random() * 400) + 1);
    var movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&with_genres=${genreCode}`
    $.get(movieURL, function (response) {
        var randomMovie = Math.floor((Math.random() * response.results.length));
        //poster image
        //<img src="image.tmbd.org/t/p/w500/${response.results[randomMovie].poster_path}" alt="${response.results[randomMovie].title} poster"/>

        //to be later used to append to html
        console.log(response.results[randomMovie]);
        console.log(response.results[randomMovie].title);
        console.log(response.results[randomMovie].overview);
        console.log(response.results[randomMovie].release_date);

    });
});