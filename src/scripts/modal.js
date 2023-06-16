import { API_KEY } from './api-service';

// Funkcja do pobierania informacji o filmie z API TMDB
async function fetchMovieDetails(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

// Funkcja otwierająca okno modalne z danymi filmu
function openModal(movieId) {
  const modal = document.getElementById('modal');
  const closeBtn = modal.querySelector('.close');
  const modalPoster = document.getElementById('modal-poster');
  const modalTitle = document.getElementById('modal-title');
  const modalOriginalTitle = document.getElementById('modal-original-title');
  const modalVoteAverage = document.getElementById('modal-vote-average');
  const modalVoteCount = document.getElementById('modal-vote-count');
  const modalGenres = document.getElementById('modal-genres');
  const modalOverview = document.getElementById('modal-overview');
  const modalPopularity = document.getElementById('modal-popularity');
  const modalId = document.getElementById('modal-id');

  // Pobieranie informacji o filmie
  fetchMovieDetails(movieId)
    .then(movie => {
      // Wypełnianie okna modalnego danymi filmu
      modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      modalTitle.textContent = movie.title;
      modalOriginalTitle.textContent = movie.original_title || '';
      modalVoteAverage.textContent = `Vote Average: ${movie.vote_average || ''}`;
      modalVoteCount.textContent = `Vote Count: ${movie.vote_count || ''}`;
      modalGenres.textContent = `Genres: ${
        movie.genres ? movie.genres.map(genre => genre.name).join(', ') : ''
      }`;
      modalOverview.textContent = `Overview: ${movie.overview || ''}`;
      modalPopularity.textContent = `Popularity: ${movie.popularity || ''}`;
      modalId.textContent = `ID: ${movie.id || ''}`;

      // Otwieranie okna modalnego
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });

  // Zamykanie okna modalnego po kliknięciu na przycisk zamknięcia
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Zamykanie okna modalnego po kliknięciu poza obszarem okna
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

