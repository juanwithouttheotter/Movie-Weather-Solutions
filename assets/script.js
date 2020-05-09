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
    $("#searchInput").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var zipcode = $("#searchInput").val();
            console.log(zipcode);
            var APIKey = "b212266a3b5800f1c727bf9539b273bb";
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + zipcode + ",Us&appid=" + APIKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $.ajax({ url: queryURL, method: 'GET' })
                var tempFahrenheit = Math.round(((response.main.temp) - 273.15) * 1.80 + 32);
                console.log(response);
                
                var main = response.weather.temp;


            });
        }


    });
});