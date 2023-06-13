import { fetchTrendingMovies } from './fetch';
import { API_KEY } from './api-service';
export async function createGallery() {
  try {
    const movies = await fetchTrendingMovies();
    const genresResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    const genreData = await genresResponse.json();
    const genres = genreData.genres;

    const gallery = document.querySelector('.gallery');

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

      // // Tworzenie przycisku traileru
      // function createTrailerButton(movieId) {
      //   const button = document.createElement('button');
      //   button.classList.add('card', 'trailer-button');
      //   button.textContent = 'Trailer';

      //   button.addEventListener('click', async () => {
      //     try {
      //       const movieDetails = await fetchMovieDetails(movieId);
      //       const trailer = movieDetails.videos.results.find(video => video.type === 'Trailer');

      //       if (trailer) {
      //         const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      //         window.open(youtubeUrl, '_blank');
      //       } else {
      //         console.log('Brak trailera. ');
      //       }
      //     } catch (error) {
      //       console.error('Wystąpił błąd:', error);
      //     }
      //   });

      //   return button;
      // }

      // const trailerButton = createTrailerButton(movie.id);
      // card.appendChild(trailerButton);

      // //KONIEC

      const trailerButton = createTrailerButton(movie.id);
      link.appendChild(trailerButton);

      info.appendChild(title);
      info.appendChild(subtitle);

      link.appendChild(image);
      link.appendChild(info);

      card.appendChild(link);
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}
// trailer

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos`,
  );
  const data = await response.json();
  return data;
}

function createTrailerButton(movieId) {
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
// koniec

createGallery();
