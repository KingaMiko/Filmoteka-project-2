import debounce from 'lodash.debounce';
const apiKey = 'c9769c2da639ff9e854a387ed1b7b891';
const MOVIES_PATH = 'https://api.themoviedb.org/3/search/keyword?query=';
const searchBox = document.querySelector('.header__search-form-input');
const searchForm = document.querySelector('.header__pane-search-form');

const gallery = document.querySelector('.gallery');

function findMovie(e) {
  e.preventDefault();
  const searchTerm = searchBox.value.trim();
  if (searchTerm === '') {
    clearFields();
    return;
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTc2OWMyZGE2MzlmZjllODU0YTM4N2VkMWI3Yjg5MSIsInN1YiI6IjY0ODJmNjFhZTM3NWMwMDBjNTI2Y2E2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-e0pQI1sxEGJ4JEJ59Sreac2JKX6PA1NDAayyIXVyBg',
    },
  };

  fetch(`${MOVIES_PATH}${searchTerm}&page=1`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Błąd pobierania danych z API TMDB');
      }
      return response.json();
    })
    .then(data => {
      const movies = data.results;
      gallery.innerHTML = '';

      // Pobieranie danych o gatunkach
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then(response => response.json())
        .then(genreData => {
          const genres = genreData.genres;

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
            const movieGenres = movie.genre_ids.map(genreId => {
              const genre = genres.find(genre => genre.id === genreId);
              return genre ? genre.name : '';
            });
            const maxGenres = 2;
            const displayedGenres = movieGenres.slice(0, maxGenres);
            subtitle.textContent = `${displayedGenres.join(', ')} | ${year}`;

            info.appendChild(title);
            info.appendChild(subtitle);

            link.appendChild(image);
            link.appendChild(info);

            card.appendChild(link);
          });
        })
        .catch(error => {
          console.error('Wystąpił błąd:', error);
        });
    })
    .catch(error => console.error(error));
}

searchForm.addEventListener('submit', debounce(findMovie, 300));
