$(document).ready(function () {
    if (localStorage.getItem('savedMovies') !== null) {
        var savedMovies = localStorage.getItem('savedMovies');
        savedMovies = JSON.parse(savedMovies);
    } else {
        var savedMovies = [];
    }
    $("#searchInput").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var userCityString = $("#searchInput").val();
            showWeatherConditions(userCityString);
        }
    });
    function showWeatherConditions(userCityString) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityString + "&appid=b212266a3b5800f1c727bf9539b273bb&units=imperial";
        $.get(weatherUrl, function (response) {
            var weather = response.weather[0].main;
            onWeatherInformation(weather);
            $("#weathercategory").append(`
                <div class="weatherCard rounded col-md-4 p-2">
                    <div><p> ${weather} </p></div>
                        <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${weather} icon" class="icon"/>
                    
                    <div><p> Temperature: ${response.main.temp}\&degF </p></div>
                    <div><p> Wind: ${response.wind.speed} mph </p></div>
                    <div><p> Humidity: ${response.main.humidity}% </p></div>
                </div>
            `);
        });
    }
    function getWeatherGenreMappings(weather) {
        var weatherMapping = {
            Clear: [28],
            Tornado: [12],
            Fog: [9648],
            Drizzle: [80],
            Clouds: [53],
            Rain: [10749],
            Thunderstorm: [27],
            Snow: [10751],
            Mist: [878]
        }
        return weatherMapping[weather]

    }
    var storeMovie = function (movie) {
        var alreadySavedMovie = savedMovies.find(function (savedMovie) { return savedMovie.title == movie.title });
        if (alreadySavedMovie == null) {
            savedMovies.unshift(
                {
                    'title': movie.title,
                    'release_date': movie.release_date,
                    'movie_poster': movie.poster_path
                }
            );
            if (savedMovies.length > 6) {
                savedMovies.pop();
            }
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }
    }
    var seeOldMovies = function (savedMovies) {
        $('.screen1').append(`
            <div class="row old-movies">
            </div>
        `)
        for (movie in savedMovies) {
            $('.old-movies').append(`
            <div class="saved-movie col text-center m-auto">
                <div class="historyTitle m-auto col-12"><p>${savedMovies[movie].title}</p></div>
                <div class="historyImg mb-2">
                <img style="max-width:100px;" src="https://image.tmdb.org/t/p/original/${savedMovies[movie].movie_poster}" onerror="this.onerror=null;this.src='./assets/PosterComingSoon.jpg';" alt="${savedMovies[movie].title} poster">
                </div>
                <div class="p-0 mb-2">${savedMovies[movie].release_date}</div>
            </div> 
            `);
        }
    }
    var trailerMovie = function (movie) {
        var videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US`;
        $.get(videosUrl, function (response) {
            var videohtml = `<div class="teaser my-3"><iframe src="https://www.youtube.com/embed/${response.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            $("#moviegenre").append(videohtml);
        });
    }
    var onWeatherInformation = function (weather) {
        var genreCode = getWeatherGenreMappings(weather);
        var pageVariation = Math.floor((Math.random() * 500));
        var movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${pageVariation}&with_genres=${genreCode}`;
        $.get(movieURL, function (response) {
            var randomMovie = Math.floor((Math.random() * response.results.length));
            var movie = response.results[randomMovie];
            $("#moviegenre, #moviegenre2").append(`
                <p>Movie title: ${movie.title}.</p>
                <p>Movie release date: ${movie.release_date}.</p>
                <p class="overview d-inline">Movie Overview: ${movie.overview}.</p>`
            );
            $(".poster, .poster2").append(`<img class="img1 m-auto" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" onerror="this.onerror=null;this.src='./assets/PosterComingSoon.jpg';" alt="${movie.title} poster">`);
            $(".screen-1st").hide();
            $(".screen-2nd").show();
            trailerMovie(movie);
            storeMovie(movie);
        });
    }
    var lastscreen = function () {
        $(".screen-1st, .screen-2nd").hide();
        $(".screen-3d").show();
    }

    $('.screen-2nd, .screen-3d').hide();

    $('.warmerLocation').on('click', function () {
        window.location = "./index.html";
    });

    $("#buttonyes").click(function () {
        lastscreen();

    });

    $("#buttonno").click(function () {
        $("#wrongbutton").modal('show');
        setInterval(() => {
            $(".screen-1st, .screen-2nd").hide(0);
            $(".screen-3d").show(0);
            $("#wrongbutton").modal('hide')
        }, 5000);
    });
    seeOldMovies(savedMovies);
});