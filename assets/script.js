$(document).ready(function(){
    
    var existingCities = [];

    $('#searchInput').autoComplete({
        resolver: 'custom',
        minLength: 1,
        events: {
            search: function (query, callback) {
    
                var foundCities = getCitiesSearchResult(existingCities, query);
    
                if (foundCities.length != 0) {
                    callback(foundCities);
                } else {
                    $.ajax({
                        url: "./assets/cities.json",
                    }).done(function (data) {
                        existingCities = data;
    
                        callback(getCitiesSearchResult(existingCities, query));
                    }).fail(function (e) {
                        console.log(e);
                    });
                }
            }
        }
    });
    
    function getCitiesSearchResult(existingCities, query) {
        var foundCities = existingCities.filter(function (entry) {
            return entry.city.toLowerCase().includes(query.toLowerCase());
        });
    
        return foundCities.map(function(entry){
            return entry.city + ', ' + entry.state_id;
        });
    }
});