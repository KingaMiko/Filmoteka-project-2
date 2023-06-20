import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchMovies } from './fetch.js';

// Funkcja do renderowania listy filmów
function renderMovies(movies) {
  const moviesContainer = document.querySelector('.movies');

  moviesContainer.innerHTML = ''; // Wyczyść kontener przed dodaniem nowych filmów

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');
    movieItem.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <button class="btn-watch" data-id="${movie.id}">Add to watched</button>
      <button class="btn-queue" data-id="${movie.id}">Add to queue</button>
    `;

    moviesContainer.appendChild(movieItem);
  });
}

// Funkcja do obsługi kliknięcia na przycisk "Add to watched"
function toggleWatched(event) {
  const addToWatchedButton = event.target;
  const movieId = addToWatchedButton.dataset.id;

  if (addToWatchedButton.classList.contains('activated')) {
    removeFromWatched(movieId);
  } else {
    addToWatchedButton.classList.add('activated');
    addToWatchedButton.textContent = 'Remove from watched';
    addToWatchedButton.removeEventListener('click', toggleWatched);
    addToWatchedButton.addEventListener('click', function () {
      removeFromWatched(movieId);
    });

    console.log('Film został dodany do listy obejrzanych!');
  }
}

// Funkcja do obsługi kliknięcia na przycisk "Add to queue"
function toggleQueue(event) {
  const addToQueueButton = event.target;
  const movieId = addToQueueButton.dataset.id;

  if (addToQueueButton.classList.contains('activated')) {
    removeFromQueue(movieId);
  } else {
    addToQueueButton.classList.add('activated');
    addToQueueButton.textContent = 'Remove from queue';
    addToQueueButton.removeEventListener('click', toggleQueue);
    addToQueueButton.addEventListener('click', function () {
      removeFromQueue(movieId);
    });

    console.log('Film został dodany do kolejki!');
  }
}

// Funkcja do usuwania filmu z listy obejrzanych
function removeFromWatched(movieId) {
  const addToWatchedButton = document.querySelector(`button[data-id="${movieId}"]`);

  addToWatchedButton.classList.remove('activated');
  addToWatchedButton.textContent = 'Add to watched';
  addToWatchedButton.removeEventListener('click', function () {
    removeFromWatched(movieId);
  });
  addToWatchedButton.addEventListener('click', toggleWatched);

  console.log('Film został usunięty z listy obejrzanych!');
}

// Funkcja do usuwania filmu z kolejki
function removeFromQueue(movieId) {
  const addToQueueButton = document.querySelector(`button[data-id="${movieId}"]`);

  addToQueueButton.classList.remove('activated');
  addToQueueButton.textContent = 'Add to queue';
  addToQueueButton.removeEventListener('click', function () {
    removeFromQueue(movieId);
  });
  addToQueueButton.addEventListener('click', toggleQueue);

  console.log('Film został usunięty z kolejki!');
}


// Funkcja do inicjalizacji aplikacji
async function initializeApp() {
  try {
    const movies = await fetchMovies();
    renderMovies(movies);

    const movieButtons = document.querySelectorAll('.btn-watch, .btn-queue');
    movieButtons.forEach(button => {
      button.addEventListener('click', () => {
        const movieId = button.dataset.id;
        const movie = movies.find(movie => movie.id === movieId);
        openModal(movie);
      });
    });

    const closeModalButton = document.querySelector('.close-modal');
    closeModalButton.addEventListener('click', closeModal);

    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.addEventListener('click', closeModal);

    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.error('Error:', error);
  }
}

initializeApp();

const libraryWatchedBtn = document.querySelector('[data-watched]');

libraryWatchedBtn.addEventListener('click', async () => {
  Loading.pulse('Loading...');

  try {
    let movies = await fetchMovies();

    if (isLoggedIn) {
      const response = await getUserLibrary();
      const library = response;

      movies = movies.filter(movie => library.watched.includes(movie.id));
    } else {
      getGuestLibrary();
      movies = movies.filter(movie => guestLibrary.watched.includes(movie.id));
    }

    renderMovies(movies);

    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.error('Error:', error);
  }
});

const libraryQueueBtn = document.querySelector('[data-queue]');
libraryQueueBtn.addEventListener('click', async () => {
  Loading.pulse('Loading...');

  try {
    let movies = await fetchMovies();

    if (isLoggedIn) {
      const response = await getUserLibrary();
      const library = response;

      movies = movies.filter(movie => library.queue.includes(movie.id));
    } else {
      getGuestLibrary();
      movies = movies.filter(movie => guestLibrary.queue.includes(movie.id));
    }

    renderMovies(movies);

    Loading.remove();
  } catch (error) {
    Loading.remove();
    console.error('Error:', error);
  }
});
