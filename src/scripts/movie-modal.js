import { Loading } from 'notiflix/build/notiflix-loading-aio';
const modalBackdrop = document.querySelector('.modal__backdrop');
const modalContainer = document.querySelector('.modal__container');
//import { fetchGenres, fetchMovies } from './fetch';
import Notiflix from 'notiflix';

const translations = {
  filmvote: {
    en: 'Vote / Votes',
    pl: 'Głosów',
  },
  filmpop: {
    en: 'Popularity',
    pl: 'Popularność',
  },
  filmtitle: {
    en: 'Original Title',
    pl: 'Oryginalny tytuł',
  },
  filmg: {
    en: 'Genre',
    pl: 'Gatunek filmu',
  },
  filmabout: {
    en: 'About',
    pl: 'Opis',
  },
};

function getTranslation(key) {
  const language = localStorage.getItem('language') || 'en';
  return translations[key][language];
}

function buildModalContent(movie) {
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
  const voteDivider = document.createElement('span');
  voteDivider.classList.add('film__rating--divider');
  voteDivider.textContent = ' / ';
  const voteCount = document.createElement('span');
  voteCount.textContent = movie.vote_count;
  voteVotesInfo.appendChild(voteAverage);
  voteVotesInfo.appendChild(voteDivider);
  voteVotesInfo.appendChild(voteCount);
  voteVotes.appendChild(voteVotesDetails);
  voteVotes.appendChild(voteVotesInfo);
  ul.appendChild(voteVotes);

  const popularity = document.createElement('li');
  popularity.classList.add('film__item');
  const popularityDetails = document.createElement('p');
  popularityDetails.classList.add('film__details');
  popularityDetails.textContent = 'Popularity';
  const popularityInfo = document.createElement('p');
  popularityInfo.classList.add('film__info--uper');
  popularityInfo.textContent = movie.popularity;
  popularity.appendChild(popularityDetails);
  popularity.appendChild(popularityInfo);
  ul.appendChild(popularity);

  const originalTitle = document.createElement('li');
  originalTitle.classList.add('film__item');
  const originalTitleDetails = document.createElement('p');
  originalTitleDetails.classList.add('film__details');
  originalTitleDetails.textContent = 'Original title';
  const originalTitleInfo = document.createElement('p');
  originalTitleInfo.textContent = movie.original_title;
  originalTitle.appendChild(originalTitleDetails);
  originalTitle.appendChild(originalTitleInfo);
  ul.appendChild(originalTitle);

  const genre = document.createElement('li');
  genre.classList.add('film__item');
  const genreDetails = document.createElement('p');
  genreDetails.classList.add('film__details');
  genreDetails.textContent = 'Genre';
  const genreInfo = document.createElement('p');
  genreInfo.classList.add('film__info');
  if (movie.genres) {
    movie.genres.forEach((genre, index) => {
      const genreSpan = document.createElement('span');
      genreSpan.textContent = genre;
      genreInfo.appendChild(genreSpan);
      if (index !== movie.genres.length - 1) {
        const commaSpan = document.createElement('span');
        commaSpan.textContent = ', ';
        genreInfo.appendChild(commaSpan);
      }
    });
  } else {
    const genreSpan = document.createElement('span');
    genreSpan.textContent = 'N/A';
    genreInfo.appendChild(genreSpan);
  }
  genre.appendChild(genreDetails);
  genre.appendChild(genreInfo);
  ul.appendChild(genre);

  div1.appendChild(ul);
  filmInformationContainer.appendChild(div1);

  const div2 = document.createElement('div');
  const aboutTitle = document.createElement('h3');
  aboutTitle.classList.add('film__about__title');
  aboutTitle.textContent = 'About';
  const aboutText = document.createElement('p');
  aboutText.classList.add('film__about__text');
  aboutText.textContent = movie.overview;
  div2.appendChild(aboutTitle);
  div2.appendChild(aboutText);
  filmInformationContainer.appendChild(div2);

  const div3 = document.createElement('div');
  div3.classList.add('film__button__wrapper');

  voteVotesDetails.textContent = getTranslation('filmvote');
  popularityDetails.textContent = getTranslation('filmpop');
  originalTitleDetails.textContent = getTranslation('filmtitle');
  genreDetails.textContent = getTranslation('filmg');
  aboutTitle.textContent = getTranslation('filmabout');

  const addToWatchedButton = document.createElement('button');
  addToWatchedButton.type = 'button';
  addToWatchedButton.classList.add('film__button', 'btn__watch');
  addToWatchedButton.dataset.id = movie.id;
  addToWatchedButton.textContent = 'Add to watched';
  div3.appendChild(addToWatchedButton);

  addToWatchedButton.addEventListener('click', toggleWatched);
  function toggleWatched() {
    if (addToWatchedButton.classList.contains('activated')) {
      removeFromWatched();
    } else {
      addToWatchedButton.classList.add('activated');
      addToWatchedButton.textContent = 'Remove from watched';
      addToWatchedButton.addEventListener('click', removeFromWatched);

      console.log('Film został dodany do listy obejrzanych!');
    }
  }

  function removeFromWatched() {
    addToWatchedButton.classList.remove('activated');
    addToWatchedButton.textContent = 'Add to watched';
    addToWatchedButton.removeEventListener('click', removeFromWatched);

    console.log('Film został usunięty z listy obejrzanych!');
  }

  const addToQueueButton = document.createElement('button');
  addToQueueButton.type = 'button';
  addToQueueButton.classList.add('film__button', 'btn__queue');
  addToQueueButton.dataset.id = movie.id;
  addToQueueButton.textContent = 'Add to queue';
  div3.appendChild(addToQueueButton);

  addToQueueButton.addEventListener('click', toggleQueue);
  function toggleQueue() {
    if (addToQueueButton.classList.contains('activated')) {
      removeFromQueue();
    } else {
      addToQueueButton.classList.add('activated');
      addToQueueButton.textContent = 'Remove from queue';
      addToQueueButton.addEventListener('click', removeFromQueue);

      console.log('Film został dodany do kolejki!');
    }
  }

  function removeFromQueue() {
    addToQueueButton.classList.remove('activated');
    addToQueueButton.textContent = 'Add to queue';
    addToQueueButton.removeEventListener('click', removeFromQueue);

    console.log('Film został usunięty z kolejki!');
  }

  filmInformationContainer.appendChild(div3);

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
