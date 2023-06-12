import { fetchTrendingMovies } from './fetch';
import { API_KEY } from './api-service';
export async function createGallery() {
  try {
    const movies = await fetchTrendingMovies();
    const genresResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    const genreData = await genresResponse.json();
    const genres = genreData.genres;

    const gallery = document.querySelector('.gallery');

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      gallery.appendChild(card);

      const link = document.createElement('a');
      link.href = `https://www.themoviedb.org/movie/${movie.id}`;

      const image = document.createElement('img');
      image.classList.add('card__pic');
      image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const info = document.createElement('div');
      info.classList.add('card__info');

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const subtitle = document.createElement('h3');
      const year = movie.release_date.substring(0, 4);
      const movieGenres = movie.genre_ids.map(genreId => {
        const genre = genres.find(genre => genre.id === genreId);
        return genre ? genre.name : '';
      });
      const maxGenres = 2;
      const displayedGenres = movieGenres.slice(0, maxGenres);
      subtitle.textContent = `${displayedGenres.join(', ')} | ${year}`;

      info.appendChild(title);
      info.appendChild(subtitle);

      link.appendChild(image);
      link.appendChild(info);

      card.appendChild(link);
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

createGallery();
