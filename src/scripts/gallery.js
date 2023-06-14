import { API_KEY } from './api-service';
import Pagination from 'tui-pagination';

const itemsPerPage = 10; // liczba filmów wyświetlanych na stronie
let currentPage = 1; // aktualna strona

// Funkcja do pobierania filmów z API TMDB
async function fetchMovies(page, itemsPerPage) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`,
  );
  const data = await response.json();
  return data.results;
}

// Funkcja do tworzenia galerii filmów
export async function createGallery(page = 1) {
  try {
    const movies = await fetchMovies(page, itemsPerPage);

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Wyczyść galerię przed dodaniem nowych filmów

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
      subtitle.textContent = `${year}`;

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
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Wyczyść kontener paginacji przed inicjalizacją

    const pagination = new Pagination(paginationContainer, {
      totalItems,
      itemsPerPage,
      visiblePages: 5,
      page,
      centerAlign: true,
    });

    pagination.on('afterMove', async e => {
      currentPage = e.page;
      await createGallery(currentPage);
    });
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

export function createTrailerButton(movieId) {
  const button = document.createElement('button');
  button.classList.add('card', 'trailer-button');
  button.textContent = 'Trailer';

  button.addEventListener('click', async () => {
    try {
      const movieDetails = await fetchMovieDetails(movieId);

      const trailer = movieDetails.videos.results.find(video => video.type === 'Trailer');

      if (trailer) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        window.open(youtubeUrl, '_blank', 'noopener');
      } else {
        console.log('Brak trailera.');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  });

  return button;
}

// Funkcja do pobierania liczby wszystkich filmów
async function fetchTotalMoviesCount() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
  );
  const data = await response.json();
  return data.total_results;
}

// Inicjalizacja galerii po załadowaniu strony
createGallery();
