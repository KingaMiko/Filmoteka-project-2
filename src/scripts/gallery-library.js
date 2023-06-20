import { createGallery, createTrailerButton } from './gallery';
import { openModal } from './movie-modal';
import Pagination from 'tui-pagination';

const ITEMS_PER_PAGE = 10;
const gallery = document.querySelector('.gallery');
const watchedButton = document.querySelector('.header-library #w');
const queuedButton = document.querySelector('.header-library #q');
const paginationContainer = document.querySelector('#pagination-container');

let currentPage = 1;
let activeButton = '';
function getPreferredLanguage() {
  return localStorage.getItem('language') || 'en';
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('card');

  const link = document.createElement('a');

  const image = new Image();
  image.classList.add('card__pic');
  image.loading = 'lazy';
  image.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}?language=${getPreferredLanguage()}`
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
  subtitle.textContent = `${year}`;

  const trailerButton = createTrailerButton(movie.id);
  link.appendChild(trailerButton);

  info.appendChild(title);
  info.appendChild(subtitle);

  link.appendChild(image);
  link.appendChild(info);

  card.appendChild(link);

  return card;
}

function renderMoviesPage(watchedMovies) {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const moviesPage = watchedMovies.slice(start, end);

  gallery.innerHTML = '';

  moviesPage.forEach(movie => {
    const card = createMovieCard(movie);
    gallery.appendChild(card);
  });
}

function setActiveButton(button) {
  if (activeButton) {
    activeButton.classList.remove('header-library-buttons__button--active');
  }

  if (button) {
    button.classList.add('header-library-buttons__button--active');
    activeButton = button;
  }
}

export function showWatchedMovies() {
  setActiveButton(watchedButton);
  let watchedMovies = localStorage.getItem('watchedMovies');
  if (watchedMovies) {
    watchedMovies = JSON.parse(watchedMovies);
  } else {
    watchedMovies = [];
  }

  const totalItems = watchedMovies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const pagination = new Pagination(paginationContainer, {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: 5,
    page: currentPage,
    centerAlign: true,
  });

  pagination.on('afterMove', e => {
    currentPage = e.page;
    renderMoviesPage(watchedMovies);
  });

  renderMoviesPage(watchedMovies);
}
export function showQueuedMovies() {
  setActiveButton(queuedButton);
  let queuedMovies = localStorage.getItem('queuedMovies');
  if (queuedMovies) {
    queuedMovies = JSON.parse(queuedMovies);
  } else {
    queuedMovies = [];
  }

  // Inicjalizacja paginacji
  const totalItems = queuedMovies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const pagination = new Pagination(paginationContainer, {
    totalItems,
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: 5,
    page: currentPage,
    centerAlign: true,
  });

  pagination.on('afterMove', e => {
    currentPage = e.page;
    renderMoviesPage(queuedMovies);
  });

  renderMoviesPage(queuedMovies);
}

watchedButton.addEventListener('click', showWatchedMovies);
queuedButton.addEventListener('click', showQueuedMovies);
document.addEventListener('DOMContentLoaded', showWatchedMovies);
