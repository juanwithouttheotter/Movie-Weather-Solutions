$(document).ready(function () {
    if (localStorage.getItem('savedMovies') !== null) {
        var savedMovies = localStorage.getItem('savedMovies');
        savedMovies = JSON.parse(savedMovies);
        console.log(savedMovies);
    } else {
        var savedMovies = [];
    }
    

    //refacting the weather url
    $("#searchInput").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var userCityString = $("#searchInput").val();
            console.log(userCityString);
            showWeatherConditions(userCityString);
        }
    });

    function showWeatherConditions(userCityString) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCityString + "&appid=b212266a3b5800f1c727bf9539b273bb&units=imperial";
        $.get(weatherUrl, function (response) {
            var weather = response.weather[0].main;
            console.log(weather);
            onWeatherInformation(weather);
            $("#weathercategory").append(`
                <div class="weatherCard col-md-4">
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
            Clear: [28, 10752],
            Tornado: [9648],
            Fog: [12, 16],
            Drizzle: [80],
            Clouds: [37, 36],
            Rain: [10749, 10402, 14],
            Thunderstorm: [27, 878],
            Snow: [18, 10751],
            Mist: [35]
        }
        return weatherMapping[weather]

    }
    //function to store onto local storage
    var storeMovie = function (movie) {
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
    //function to append saved movies
    var seeOldMovies = function (savedMovies) {
        $('.screen1').append(`
            <div class="row old-movies">
            </div>
        `)
        for (movie in savedMovies) {
            $('.old-movies').append(`
            <div class="col saved-movie">
                <div class="historyTitle"><p>${savedMovies[movie].title}</p></div>
                <div class="historyImg">
                <img style="max-width:100px;" src="https://image.tmdb.org/t/p/original/${savedMovies[movie].movie_poster}" alt="${savedMovies[movie].title} poster">
                </div>
                <div class="historyRelise"><p>${savedMovies[movie].release_date}</p></div>
            </div>
            `)
        }
    }

    function onWeatherInformation(weather) {
        var genreCode = getWeatherGenreMappings(weather);
        console.log(genreCode);
        var movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&with_genres=${genreCode.join()}`;
        $.get(movieURL, function (response) {
            var randomMovie = Math.floor((Math.random() * response.results.length));
            console.log(response);
            var movie = response.results[randomMovie];
            console.log(movie);
            var title = movie.title;
            console.log(title);
            var releaseDate = movie.release_date;
            var overview = movie.overview;
            var poster = movie.poster_path;
            
            $("#moviegenre").append(`
                <p>Movie title: ${title}.</p>
                <p>Movie release date: ${releaseDate}.</p>
                <p>Movie Overview: ${overview}.</p>`
            );

            var videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US`;
            $.get(videosUrl, function (response) {
                var firstvideo = response.results[0];
                var youtubeUrl = `https://www.youtube.com/embed/${firstvideo.key}`;

                var videohtml = `<div class="teaser"><iframe src="${youtubeUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
                $("#moviegenre").append(videohtml);
            });

            // poster output on 2nd screen
            $(".poster").append(`<img class="img1" src="https://image.tmdb.org/t/p/original/${poster}" alt="${title} poster">`);
            // poster output on last screen
            $(".poster2").append(`<p><img class="img2" src="https://image.tmdb.org/t/p/original/${poster}" alt="${title} poster"></p>`);

            $("#moviegenre2").append(`
            <p>Movie title: ${title}.</p>
            <p>Movie release date: ${releaseDate}.</p>
            <p>Movie Overview: ${overview}.</p>`
            );

            $(".screen-1st").hide();
            $(".screen-2nd").show();
            //call Function to store onto local storage
            storeMovie(movie);
        });
    }

    $('.warmerLocation').on('click', function () {
        window.location = "./index.html";
    })

    $("#buttonyes").click(function () {
        lastscreen();
        
    })

    $("#buttonno").click(function () {
        $("#wrongbutton").modal('show');
        setInterval(() => {
            $(".screen-1st").hide(0);
            $(".screen-2nd").hide(0);
            $(".screen-3d").show(0);
            $("#wrongbutton").modal('hide')
        }, 3000);

    })

    function lastscreen() {
        $(".screen-1st").hide();
        $(".screen-2nd").hide();
        $(".screen-3d").show();
    }
    //testing the appending function
    seeOldMovies(savedMovies);
});