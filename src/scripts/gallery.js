import { API_KEY } from './api-service';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchYoutube, openLightbox } from './trailer';
import { fetchGenres, fetchMovies } from './fetch';
import { openModal } from './movie-modal';

const ITEMS_PER_PAGE = 10;
const paginationContainer = document.querySelector('#pagination-container');
let currentPage = 1;

// Funkcja do pobierania całkowitej liczby filmów
async function fetchTotalMoviesCount() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
  );
  const data = await response.json();
  return data.total_results;
}

// Funkcja do tworzenia galerii filmów
export async function createGallery() {
  try {
    const movies = await fetchMovies(currentPage);

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
      gallery.appendChild(card);

      const link = document.createElement('a');

      const image = new Image();
      image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const loader = document.createElement('div');
      loader.style.border = '5px solid #f3f3f3'; // Light gray
      loader.style.borderTop = '5px solid #ff9505 '; // orange
      loader.style.borderRadius = '50%';
      loader.style.width = '50px';
      loader.style.height = '50px';
      loader.style.animation = 'spin 2s linear infinite';
      loader.style.position = 'absolute';
      loader.style.top = '50%';
      loader.style.left = '50%';
      loader.style.transform = 'translate(-50%, -50%)';
      loader.style.display = 'block'; // Initially visible

      link.appendChild(loader);

      // Hide the loader once the image is loaded
      image.addEventListener('load', function () {
        loader.style.display = 'none';
      });

      image.addEventListener('error', function () {
        loader.style.display = 'none';
      });

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
      scrollToTop(); // Przewiń stronę do góry
    });
  } catch (error) {
    //Notiflix.Notify.failure(`An error occurred: ${error.message}`);
  }
}

export function createTrailerButton(movieId) {
  const button = document.createElement('button');
  button.classList.add('card', 'trailer-button');
  button.textContent = 'Trailer';

  button.addEventListener('click', async () => {
    try {
      const youtubeData = await fetchYoutube(movieId);
      const trailers = youtubeData.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
