const apiKey = 'c9769c2da639ff9e854a387ed1b7b891';
const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

// Pobieranie danych popularnych filmów z API TMDB
fetch(trendingMoviesUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Błąd pobierania danych z API TMDB');
    }
    return response.json();
  })
  .then(data => {
    const movies = data.results;
    const gallery = document.querySelector('.gallery');

    // Iteruj przez filmy i twórz elementy galerii dla każdego z nich
    const trendingMovies = movies.map(movie => {
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
      (subtitle.textContent = movie.genre_ids), movie.release_date;

      //   const genres = movie.genre_ids.map(genreId => {
      //     const genre = data.genres.find(genre => genre.id === genreId);
      //     return genre ? genre.name : '';
      //   });

      // const productionYear = movie.release_date ? movie.release_date.slice(0, 4) : '';
      // const genresAndYear = genres.length > 0 ? `${genres.join(', ')} | ${productionYear}` : productionYear;
      // const subtitle = document.createElement('h3');
      // subtitle.textContent = genresAndYear;

      info.appendChild(title);
      // info.appendChild(subtitle);

      link.appendChild(image);
      link.appendChild(info);

      card.appendChild(link);
      gallery.appendChild(card);
    });
  })
  .catch(error => console.error(error));
