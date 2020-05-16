This will be information for how to navigate the movie api

Switched over to The movie data base, to allow for genre search. 

search by genre (use code number):
Action<28> 500pg results,
Adventure<12>500pg results,
Animation<16>500pg results,
Comedy<35>500pg results,
Crime<80>500pg results,
Documentary<99>500pg results,
Drama<18>500pg results,
Family<10751>500pg results,
Fantasy<14>500pg results,
* History<36>390pg results,
Horror<27>500pg results,
Music<10402>500pg results,
Mystery<9648>500pg results,
Romance<10749>500pg results,
Science Fiction<878>500pg results,
* TV Movie<10770>476pg results,
Thriller<53>500pg results
* War<10752>314pg results,
* Western<37>277pg results

"https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + {genre code}

https://api.themoviedb.org/3/genre/movie/list?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd

for more results possibly randomize page number "&page=1" most lists are out of 400+

Keys:
  title:
  overview:
  release_date:
