import { API_KEY } from './api-service';
import Notiflix from 'notiflix';
import { createGallery, createTrailerButton } from './gallery';
import debounce from 'lodash/debounce';
import Pagination from 'tui-pagination';
//import { fetchGenres, fetchMovies } from './fetch';
import { openModal } from './movie-modal';

const MOVIES_PATH = 'https://api.themoviedb.org/3/search/movie';
const GENRES_PATH = 'https://api.themoviedb.org/3/genre/movie/list';
const searchBox = document.querySelector('.header__search-form-input');
const searchForm = document.querySelector('.header__pane-search-form');
const gallery = document.querySelector('.gallery');
const paginationContainer = document.querySelector('#pagination-container');
const preferredLanguage = localStorage.getItem('language') || 'en';

let debounceTimeout;
let lastSearchQuery = '';

let genresList = [];

fetchGenres().then(genres => {
  genresList = genres;
});

export async function findMovie(page = 1) {
  const searchQuery = searchBox.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('The field cannot be empty. Enter correct movie title');
    clearMovies();
    createGallery();
    return;
  }
  try {
    const movies = await searchMovies(searchQuery, page);
    if (movies.length === 0) {
      Notiflix.Notify.warning(
        'Search result not successful. Enter the correct movie name and try again',
      );
      clearMovies();
      showNoResultsMessage();
      return;
    }

    const genres = await fetchGenres();

    gallery.innerHTML = '';

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      gallery.appendChild(card);

      const link = document.createElement('a');
      //link.href = `https://www.themoviedb.org/movie/${movie.id}`;

      const image = new Image();
      image.classList.add('card__pic');
      image.loading = 'lazy';
      image.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

      const info = document.createElement('div');
      info.classList.add('card__info');

      image.addEventListener('click', function () {
        openModal(movie);
      });

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

    // Inicjalizacja paginacji
    const totalItems = movies.length;
    const itemsPerPage = 10; // liczba filmów wyświetlanych na stronie
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pagination = new Pagination(paginationContainer, {
      totalItems,
      itemsPerPage,
      visiblePages: 5,
      page,
      centerAlign: true,
    });

    pagination.on('afterMove', async e => {
      await findMovie(e.page);
    });
  } catch (error) {
    Notiflix.Notify.failure(
      'Search result not successful. Enter the correct movie name and try again',
    );
  }
}

function searchMovies(query, page) {
  const url = `${MOVIES_PATH}?api_key=${API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}&language=${preferredLanguage}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure(
          'Search result not successful. Enter the correct movie name and try again',
        );
      }
      return response.json();
    })
    .then(data => {
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
    });
}

function fetchGenres() {
  const url = `${GENRES_PATH}?api_key=${API_KEY}&language=${preferredLanguage}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure(
          'Search result not successful. Enter the correct movie name and try again',
        );
      }
      return response.json();
    })
    .then(data => data.genres);
}

function clearMovies() {
  gallery.innerHTML = '';
}

function showNoResultsMessage() {
  const noResultsMessage = document.createElement('div');
  noResultsMessage.classList.add('no-results');
  gallery.appendChild(noResultsMessage);
}

function handleSearch() {
  const searchQuery = searchBox.value.trim();

  if (searchQuery === lastSearchQuery) {
    return;
  }

  lastSearchQuery = searchQuery;

  clearTimeout(debounceTimeout);

  if (searchQuery === '') {
    clearMovies();
    createGallery();
    return;
  }

  debounceTimeout = setTimeout(() => {
    findMovie();
  }, 300);
}

createGallery();

createTrailerButton();

searchBox.addEventListener('input', debounce(handleSearch, 300));
searchForm.addEventListener('submit', e => e.preventDefault());
