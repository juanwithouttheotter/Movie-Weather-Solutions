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
            var zipcode = $("#searchInput").val();
            console.log(zipcode);
            showWeatherConditions(zipcode);
        }
    });

    function showWeatherConditions(zipcode) {

        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + zipcode + "&appid=b212266a3b5800f1c727bf9539b273bb";

        $.get(weatherUrl, function (response) {

            onWeatherInformation(response, zipcode);
        });
    }
    function onWeatherInformation(response, zipcode) {

        var weather = response.weather[0].main;
        $('#weathercategory').html(weather);
    }

    //retrieving movies by genre code
    // see MovieAPI.md for more genre codes
    var genreCode = 28;
    var movieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreCode
    $.get(movieURL, function (response) {
        //examples of key retrieval paths
        console.log(response.page);
        console.log(response.results[3]);
        console.log(response.results[3].title);
    });

});