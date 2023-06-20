import { API_KEY } from './api-service';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchYoutube, openLightbox } from './trailer';
import { fetchGenres, fetchMovies } from './fetch';

const modalBackdrop = document.querySelector('.modal__backdrop');
const modalContainer = document.querySelector('.modal__container');

function saveToLocalStorage(key, movie) {
  let movies = localStorage.getItem(key);

  if (!movies) {
    movies = [];
  } else {
    movies = JSON.parse(movies);
  }

  movies.push(movie);
  localStorage.setItem(key, JSON.stringify(movies));
}

function removeFromLocalStorage(key, movieId) {
  let movies = localStorage.getItem(key);

  if (!movies) {
    return;
  }

  movies = JSON.parse(movies);
  movies = movies.filter(movie => movie.id !== movieId);
  localStorage.setItem(key, JSON.stringify(movies));
}

export function buildModalContent(movie) {
  const content = document.createElement('div');
  content.classList.add('modal-content');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('close__button');
  closeButton.dataset.action = 'close-modal';
  closeButton.innerHTML = `<svg class="modal__icon__close" width="30" height="30" viewbox="0 0 30 30" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path d="M8 8L22 22" stroke="black" stroke-width="2" />
  <path d="M8 22L22 8" stroke="black" stroke-width="2" />
  </svg>`;
  content.appendChild(closeButton);

  const filmImageContainer = document.createElement('div');
  filmImageContainer.classList.add('film__image');

  const image = document.createElement('img');
  image.classList.add('image');

  image.addEventListener('load', function () {
    const loaderDiv = document.querySelector('.image-loader');
    if (loaderDiv) {
      loaderDiv.style.display = 'none';
      Loading.remove();
      image.style.display = 'block';
    }
  });

  if (movie.poster_path) {
    image.src = `https://www.themoviedb.org/t/p/w500${movie.poster_path}`;
    image.onerror = function () {
      this.onerror = null;
      this.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    };
    image.alt = movie.title;
    image.title = movie.title;
  } else {
    image.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    image.alt = 'film photo';
  }

  const loaderDiv = document.createElement('div');

  loaderDiv.classList.add('image-loader');
  loaderDiv.style.display = 'none';
  image.addEventListener('load', function () {
    loaderDiv.style.display = 'none';
    Loading.remove();
    image.style.display = 'block';
  });

  image.addEventListener('error', function () {
    loaderDiv.style.display = 'none';
    Loading.remove();
    this.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  });

  filmImageContainer.style.position = 'relative';
  loaderDiv.style.position = 'absolute';
  loaderDiv.style.top = '50%';
  loaderDiv.style.left = '50%';
  loaderDiv.style.transform = 'translate(-50%, -50%)';

  filmImageContainer.appendChild(loaderDiv);
  filmImageContainer.appendChild(image);
  content.appendChild(filmImageContainer);

  const filmInformationContainer = document.createElement('div');
  filmInformationContainer.classList.add('film__information');

  const div1 = document.createElement('div');

  const titleContainer = document.createElement('h2');
  titleContainer.classList.add('film__title');
  titleContainer.textContent = movie.title;
  div1.appendChild(titleContainer);

  const ul = document.createElement('ul');

  const voteVotes = document.createElement('li');
  voteVotes.classList.add('film__item');
  const voteVotesDetails = document.createElement('p');
  voteVotesDetails.classList.add('film__details');
  voteVotesDetails.textContent = 'Vote / Votes';
  const voteVotesInfo = document.createElement('p');
  voteVotesInfo.classList.add('film__info--uper');
  const voteAverage = document.createElement('span');
  voteAverage.classList.add('film__rating--orange');
  voteAverage.textContent = movie.vote_average;
  const voteCount = document.createElement('span');
  voteCount.classList.add('film__info--down');
  voteCount.textContent = movie.vote_count;
  voteVotesInfo.appendChild(voteAverage);
  voteVotesInfo.appendChild(voteCount);
  voteVotes.appendChild(voteVotesDetails);
  voteVotes.appendChild(voteVotesInfo);

  const releaseDate = document.createElement('li');
  releaseDate.classList.add('film__item');
  const releaseDateDetails = document.createElement('p');
  releaseDateDetails.classList.add('film__details');
  releaseDateDetails.textContent = 'Release Date';
  const releaseDateInfo = document.createElement('p');
  releaseDateInfo.classList.add('film__info');
  releaseDateInfo.textContent = movie.release_date;
  releaseDate.appendChild(releaseDateDetails);
  releaseDate.appendChild(releaseDateInfo);

  const originalLanguage = document.createElement('li');
  originalLanguage.classList.add('film__item');
  const originalLanguageDetails = document.createElement('p');
  originalLanguageDetails.classList.add('film__details');
  originalLanguageDetails.textContent = 'Original Language';
  const originalLanguageInfo = document.createElement('p');
  originalLanguageInfo.classList.add('film__info');
  originalLanguageInfo.textContent = movie.original_language;
  originalLanguage.appendChild(originalLanguageDetails);
  originalLanguage.appendChild(originalLanguageInfo);

  const genres = document.createElement('li');
  genres.classList.add('film__item');
  const genresDetails = document.createElement('p');
  genresDetails.classList.add('film__details');
  genresDetails.textContent = 'Genres';
  const genresInfo = document.createElement('p');
  genresInfo.classList.add('film__info');
  const genresList = movie.genres.map(genre => genre.name).join(', ');
  genresInfo.textContent = genresList;
  genres.appendChild(genresDetails);
  genres.appendChild(genresInfo);

  ul.appendChild(voteVotes);
  ul.appendChild(releaseDate);
  ul.appendChild(originalLanguage);
  ul.appendChild(genres);

  div1.appendChild(ul);

  const div2 = document.createElement('div');

  const overviewContainer = document.createElement('h3');
  overviewContainer.classList.add('film__overview');
  overviewContainer.textContent = 'Overview';
  div2.appendChild(overviewContainer);

  const overviewText = document.createElement('p');
  overviewText.classList.add('film__overview__text');
  overviewText.textContent = movie.overview;
  div2.appendChild(overviewText);

  filmInformationContainer.appendChild(div1);
  filmInformationContainer.appendChild(div2);

  content.appendChild(filmInformationContainer);

  return content;
}


export function openModal(movie) {
  const modalContent = buildModalContent(movie);
  modalContainer.innerHTML = '';
  modalContainer.appendChild(modalContent);

  const loaderDiv = document.querySelector('.image-loader');
  loaderDiv.style.display = 'block';
  Loading.pulse({
    target: '.image-loader',
    svgColor: 'red',
  });

  modalBackdrop.style.display = 'flex';
  document.body.classList.add('modal-open');

  modalBackdrop.addEventListener('click', outsideClick);
  document.addEventListener('keydown', escKeyPress);

  const closeButton = document.querySelector('.close__button');
  closeButton.addEventListener('click', closeModal);
}

function closeModal() {
  modalBackdrop.style.display = 'none';
  modalContainer.innerHTML = '';
  modalBackdrop.classList.remove('modal-open');
  document.body.classList.remove('modal-open');

  modalBackdrop.removeEventListener('click', outsideClick);
  document.removeEventListener('keydown', escKeyPress);

  const closeButton = document.querySelector('.close__button');
  if (closeButton) {
    closeButton.removeEventListener('click', closeModal);
  }
}

function outsideClick(event) {
  if (event.target === modalBackdrop) {
    closeModal();
  }
}

function escKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function isMovieInLocalStorage(key, movieId) {
  const movies = localStorage.getItem(key);

  if (movies) {
    const parsedMovies = JSON.parse(movies);
    return parsedMovies.some(movie => movie.id === movieId);
  }

  return false;
}

function generateMovieLibrary() {
  const watchedMovies = localStorage.getItem('watchedMovies');
  const queuedMovies = localStorage.getItem('queuedMovies');

  const watchedMoviesContainer = document.querySelector('#watchedMoviesContainer');
  const queuedMoviesContainer = document.querySelector('#queuedMoviesContainer');

  if (watchedMovies) {
    const parsedWatchedMovies = JSON.parse(watchedMovies);
    parsedWatchedMovies.forEach(movie => {
      const galleryItem = createGalleryItem(movie);
      watchedMoviesContainer.appendChild(galleryItem);
    });
  }

  if (queuedMovies) {
    const parsedQueuedMovies = JSON.parse(queuedMovies);
    parsedQueuedMovies.forEach(movie => {
      const galleryItem = createGalleryItem(movie);
      queuedMoviesContainer.appendChild(galleryItem);
    });
  }
}

    function createGalleryItem(movie) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery__item');

        const thumbnail = document.createElement('img');
        thumbnail.src = movie.thumbnail;
        thumbnail.alt = movie.title;

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const addButton = document.createElement('button');
        addButton.classList.add('add__button');
        addButton.textContent = 'Add to Queue';

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove__button');
        removeButton.textContent = 'Remove';

        if (isMovieInLocalStorage('watchedMovies', movie.id)) {
            addButton.disabled = true;
            addButton.textContent = 'Added to Watched';
        }

        if (isMovieInLocalStorage('queuedMovies', movie.id)) {
            addButton.disabled = true;
            addButton.textContent = 'Added to Queue';
        }

        addButton.addEventListener('click', () => {
            saveToLocalStorage('queuedMovies', movie);
            addButton.disabled = true;
            addButton.textContent = 'Added to Queue';
            Notiflix.Notify.success(`"${movie.title}" has been added to your queue.`);
        });

        removeButton.addEventListener('click', () => {
            removeFromLocalStorage('watchedMovies', movie.id);
            removeFromLocalStorage('queuedMovies', movie.id);
            galleryItem.remove();
            Notiflix.Notify.info(`"${movie.title}" has been removed.`);
        });

        galleryItem.appendChild(thumbnail);
        galleryItem.appendChild(title);
        galleryItem.appendChild(addButton);
        galleryItem.appendChild(removeButton);

        galleryItem.addEventListener('click', () => {
            openModal(movie);
        });

        return galleryItem;
    }

    // Wywołanie funkcji generującej bibliotekę filmów przy załadowaniu strony
    window.addEventListener('load', generateMovieLibrary);

