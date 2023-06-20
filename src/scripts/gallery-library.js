import { createGallery, createTrailerButton } from './gallery';
import { openModal } from './movie-modal';
import Pagination from 'tui-pagination';
const gallery = document.querySelector('.gallery');
const watchedButton = document.querySelector('#w'); // Zastąp odpowiednim selektorem

export function showWatchedMovies() {
  // Pobieramy listę filmów z localStorage
  let watchedMovies = localStorage.getItem('watchedMovies');
  if (watchedMovies) {
    watchedMovies = JSON.parse(watchedMovies);
  } else {
    watchedMovies = [];
  }

  // Czyścimy galerię
  gallery.innerHTML = '';

  // Dla każdego filmu...
  watchedMovies.forEach(movie => {
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
    subtitle.textContent = `${year}`;

    const trailerButton = createTrailerButton(movie.id);
    link.appendChild(trailerButton);

    info.appendChild(title);
    info.appendChild(subtitle);

    link.appendChild(image);
    link.appendChild(info);

    card.appendChild(link);
  });

  // Dodajemy funkcjonalność przycisku do trailera
  createTrailerButton();
}

// Nasłuchujemy kliknięcia na przycisk watched i wyświetlamy listę filmów
watchedButton.addEventListener('click', showWatchedMovies);
