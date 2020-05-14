This will be information for how to navigate the movie api

Switched over to The movie data base, to allow for genre search. 

search by genre (use code number):
Action<28>, Adventure<12>, Animation<16>, Comedy<35>, Crime<80>, Documentary<99>,
Drama<18>, Family<10751>, Fantasy<14>, History<36>, Horror<27>, Music<10402>, Mystery<9648>,
Romance<10749>, Science Fiction<878>, TV Movie<10770>, Thriller<53>, War<10752>, Western<37>

"https://api.themoviedb.org/3/discover/movie?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + {genre code}

https://api.themoviedb.org/3/genre/movie/list?api_key=e7f668e97c13dfe1d5f7100b7a29d6bd

for more results possibly randomize page number "&page=1" most lists are out of 400+

Keys:
  title:
  overview:
  release_date:
