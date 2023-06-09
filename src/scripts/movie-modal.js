const modalBackdrop = document.querySelector('.modal__backdrop');
const modalContainer = document.querySelector('.modal__container');

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
  filmImageContainer.style.width = '100%';
  filmImageContainer.style.position = 'relative';

  const image = document.createElement('img');
  image.classList.add('image');

  const loaderDiv = document.createElement('div');
  loaderDiv.classList.add('image-loader');
  loaderDiv.style.width = '100px';
  loaderDiv.style.height = '100px';
  loaderDiv.style.display = 'none';

  image.addEventListener('load', function () {
    loaderDiv.style.display = 'none';
    loaderDiv.style.width = this.width + 'px';
    loaderDiv.style.height = this.height + 'px';
    image.style.display = 'block';
  });

  if (movie.poster_path) {
    image.src = `https://www.themoviedb.org/t/p/w500${movie.poster_path}`;
    image.onerror = function () {
      this.onerror = null;
      this.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    };
    image.alt = movie.title;
    image.title = movie.title;

    loaderDiv.style.display = 'block'; // Start loading here
  } else {
    image.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    image.alt = 'film photo';
  }

  image.addEventListener('error', function () {
    loaderDiv.style.display = 'none';
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
  if (movie.overview) {
    const aboutTitle = document.createElement('h3');
    aboutTitle.classList.add('film__about__title');
    aboutTitle.textContent = getTranslation('filmabout');
    div2.appendChild(aboutTitle);

    const aboutText = document.createElement('p');
    aboutText.classList.add('film__about__text');
    aboutText.textContent = movie.overview;
    div2.appendChild(aboutText);

    // Teraz dodajemy div2 do filmInformationContainer tylko wtedy, gdy mamy opis
    filmInformationContainer.appendChild(div2);
  }

  const div3 = document.createElement('div');
  div3.classList.add('film__button__wrapper');

  voteVotesDetails.textContent = getTranslation('filmvote');
  popularityDetails.textContent = getTranslation('filmpop');
  originalTitleDetails.textContent = getTranslation('filmtitle');
  genreDetails.textContent = getTranslation('filmg');
  //aboutTitle.textContent = getTranslation('filmabout');

  const addToWatchedButton = document.createElement('button');
  addToWatchedButton.type = 'button';
  addToWatchedButton.classList.add('film__button', 'btn__watch');
  addToWatchedButton.dataset.id = movie.id;

  if (isMovieInLocalStorage('watchedMovies', movie.id)) {
    addToWatchedButton.classList.add('activated');
    addToWatchedButton.textContent = 'Remove from watched';
  } else {
    addToWatchedButton.textContent = 'Add to watched';
  }

  addToWatchedButton.addEventListener('click', () => {
    toggleWatched(addToWatchedButton, movie);
  });
  div3.appendChild(addToWatchedButton);

  const addToQueueButton = document.createElement('button');
  addToQueueButton.type = 'button';
  addToQueueButton.classList.add('film__button', 'btn__queue');
  addToQueueButton.dataset.id = movie.id;

  if (isMovieInLocalStorage('queuedMovies', movie.id)) {
    addToQueueButton.classList.add('activated');
    addToQueueButton.textContent = 'Remove from queue';
  } else {
    addToQueueButton.textContent = 'Add to queue';
  }

  addToQueueButton.addEventListener('click', () => {
    toggleQueue(addToQueueButton, movie);
  });
  div3.appendChild(addToQueueButton);

  function toggleWatched(addToWatchedButton, movie) {
    const watchedMovies = localStorage.getItem('watchedMovies');
    let movies = watchedMovies ? JSON.parse(watchedMovies) : [];

    if (addToWatchedButton.classList.contains('activated')) {
      addToWatchedButton.classList.remove('activated');
      addToWatchedButton.textContent = 'Add to watched';
      movies = movies.filter(m => m.id !== movie.id);
      removeFromWatched(addToWatchedButton, movie);
    } else {
      addToWatchedButton.classList.add('activated');
      addToWatchedButton.textContent = 'Remove from watched';
      movies.push(movie);
    }

    localStorage.setItem('watchedMovies', JSON.stringify(movies));
  }

  function toggleQueue(addToQueueButton, movie) {
    const queuedMovies = localStorage.getItem('queuedMovies');
    let movies = queuedMovies ? JSON.parse(queuedMovies) : [];

    if (addToQueueButton.classList.contains('activated')) {
      addToQueueButton.classList.remove('activated');
      addToQueueButton.textContent = 'Add to queue';

      movies = movies.filter(m => m.id !== movie.id);
      removeFromQueue(addToQueueButton, movie);
    } else {
      addToQueueButton.classList.add('activated');
      addToQueueButton.textContent = 'Remove from queue';
      movies.push(movie);
    }

    localStorage.setItem('queuedMovies', JSON.stringify(movies));
  }

  function removeFromWatched(addToWatchedButton, movie) {
    addToWatchedButton.classList.remove('activated');
    addToWatchedButton.textContent = 'Add to watched';
    addToWatchedButton.removeEventListener('click', () => toggleWatched(addToWatchedButton, movie));
  }

  function removeFromQueue(addToQueueButton, movie) {
    addToQueueButton.classList.remove('activated');
    addToQueueButton.textContent = 'Add to queue';
    addToQueueButton.removeEventListener('click', () => toggleQueue(addToQueueButton, movie));
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
