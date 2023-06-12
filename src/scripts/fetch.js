import { API_KEY } from './api-service';

export async function fetchTrendingMovies() {
  const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  const response = await fetch(trendingMoviesUrl);
  if (!response.ok) {
    throw new Error('Błąd pobierania danych z API TMDB');
  }
  const data = await response.json();
  return data.results;
}
