import { API_KEY } from './api-service';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchYoutube, openLightbox } from './trailer';
import { fetchGenres, genresList } from './fetch';
import { openModal } from './movie-modal';

const ITEMS_PER_PAGE = 10;
const paginationContainer = document.querySelector('#pagination-container');
let currentPage = 1;

// Funkcja do pobierania filmów na podstawie wybranej kategorii
async function fetchMoviesByGenre(genreId, page) {
  if (genresList.length === 0) {
    await fetchGenres();
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`,
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

// Funkcja do tworzenia galerii filmów
async function createGallery() {
  try {
    const movies = await fetchMoviesByGenre(currentGenreId, currentPage);

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      gallery.appendChild(card);

      const link = document.createElement('a');

      const image = document.createElement('img');
      image.classList.add('card__pic');
      image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      image.addEventListener('click', function () {
        openModal(movie);
      });

      const info = document.createElement('div');
      info.classList.add('card__info');

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const subtitle = document.createElement('h3');
      const year = movie.release_date.substring(0, 4);
      const genre = movie.genres ? movie.genres.slice(0, 3).join(', ') : 'N/A';
      subtitle.textContent = `${genre} | ${year}`;

      const trailerButton = createTrailerButton(movie.id);
      link.appendChild(trailerButton);

      link.appendChild(image);
      link.appendChild(info);

      info.appendChild(title);
      info.appendChild(subtitle);

      card.appendChild(link);
      gallery.appendChild(card);
    });

    // Inicjalizacja paginacji
    const totalItems = await fetchTotalMoviesCount();
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const pagination = new Pagination(paginationContainer, {
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
      visiblePages: 5,
      page: currentPage,
      centerAlign: true,
    });

    pagination.on('afterMove', async e => {
      currentPage = e.page;
      await createGallery();
    });
  } catch (error) {
    Notiflix.Notify.failure(`An error occurred: ${error.message}`);
  }
}

export function createTrailerButton(movieId) {
  const button = document.createElement('button');
  button.classList.add('card', 'trailer-button');
  button.textContent = 'Trailer';

  button.addEventListener('click', async () => {
    try {
      const youtubeData = await fetchYoutube(movieId);
      if (youtubeData.results.length > 0) {
        const trailerKey = youtubeData.results[0].key;
        const youtubeUrl = `https://www.youtube-nocookie.com/embed/${trailerKey}`;
        openLightbox(youtubeUrl);
      } else {
        Report.warning('Video not found', `There is no trailer to display.`, 'Ok');
      }
    } catch (error) {
      Notiflix.Notify.failure(`An error occurred: ${error.message}`);
    }
  });
  return button;
}

// Funkcja do pobierania całkowitej liczby filmów
async function fetchTotalMoviesCount() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
  );
  const data = await response.json();
  return data.total_results;
}

// Funkcja obsługująca zmianę kategorii
async function handleGenreChange() {
  const genreSelect = document.getElementById('genre');
  const selectedGenreId = genreSelect.value;
  currentGenreId = selectedGenreId;
  currentPage = 1;
  await createGallery();
}

// Wywołanie funkcji handleGenreChange() przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
  const genreSelect = document.getElementById('genre');
  genreSelect.addEventListener('change', handleGenreChange);
});

// Inicjalizacja galerii filmów
let currentGenreId = '';
createGallery();
