import { API_KEY } from './api-service';
import Notiflix from 'notiflix';
import { createGallery, createTrailerButton } from './gallery';

const MOVIES_PATH = 'https://api.themoviedb.org/3/search/movie';
const GENRES_PATH = 'https://api.themoviedb.org/3/genre/movie/list';
const searchBox = document.querySelector('.header__search-form-input');
const searchForm = document.querySelector('.header__pane-search-form');
const gallery = document.querySelector('.gallery');

async function findMovie(e) {
  e.preventDefault();
  const searchQuery = searchBox.value.trim();
  if (searchQuery === '') {
    Notiflix.Notify.warning('The field cannot be empty. Enter correct movie title');
    clearMovies();
    createGallery();
    return;
  }
  try {
    const movies = await searchMovies(searchQuery);
    if (movies.length === 0) {
      Notiflix.Notify.warning(
        'Search result not successful. Enter the correct movie name and try again',
      );
      clearMovies();
      showNoResultsMessage();
      searchBox.value = '';
      return;
    }

    const genres = await fetchGenres();

    gallery.innerHTML = '';

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      gallery.appendChild(card);

      const link = document.createElement('a');
      link.href = `https://www.themoviedb.org/movie/${movie.id}`;

      const image = new Image();
      image.classList.add('card__pic');
      image.loading = 'lazy';
      image.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

      const info = document.createElement('div');
      info.classList.add('card__info');

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const subtitle = document.createElement('h3');
      const year = movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown';
      const movieGenres = Array.isArray(movie.genre_ids)
        ? movie.genre_ids.map(genreId => {
            const genre = genres.find(genre => genre.id === genreId);
            return genre ? genre.name : '';
          })
        : [];
      const maxGenres = 2;
      const displayedGenres = movieGenres.slice(0, maxGenres);
      subtitle.textContent = `${displayedGenres.join(', ')} | ${year}`;

      const trailerButton = createTrailerButton(movie.id);
      link.appendChild(trailerButton);

      info.appendChild(title);
      info.appendChild(subtitle);

      link.appendChild(image);
      link.appendChild(info);

      card.appendChild(link);
    });
  } catch (error) {
    Notiflix.Notify.failure(
      'Search result not successful. Enter the correct movie name and try again',
    );
  } finally {
    searchBox.value = '';
  }
}

async function searchMovies(query) {
  const url = `${MOVIES_PATH}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`;
  const response = await fetch(url);
  if (!response.ok) {
    Notiflix.Notify.failure(
      'Search result not successful. Enter the correct movie name and try again',
    );
  }
  const data = await response.json();
  return data.results;
}

async function fetchGenres() {
  const url = `${GENRES_PATH}?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    Notiflix.Notify.failure(
      'Search result not successful. Enter the correct movie name and try again',
    );
  }
  const data = await response.json();
  return data.genres;
}

function clearMovies() {
  gallery.innerHTML = '';
}

function showNoResultsMessage() {
  const noResultsMessage = document.createElement('div');
  noResultsMessage.classList.add('no-results');
  gallery.appendChild(noResultsMessage);
}

createTrailerButton();
searchForm.addEventListener('submit', findMovie);
