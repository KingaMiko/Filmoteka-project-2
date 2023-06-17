import { API_KEY } from './api-service';

let genresList = [];

export async function fetchGenres() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();
  console.log(data);
  genresList = data.genres;
}

export async function fetchMovies(page) {
  if (genresList.length === 0) {
    await fetchGenres();
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`,
  );
  const data = await response.json();
  const movies = data.results;

  movies.forEach(movie => {
    movie.genres = movie.genre_ids
      .map(id => {
        const genre = genresList.find(genre => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(name => name !== null);
  });

  return movies;
}
