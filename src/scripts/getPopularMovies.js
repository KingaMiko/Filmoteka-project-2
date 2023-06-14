import axios from 'axios';

const alert = document.querySelector('#wrongSearch');
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c9769c2da639ff9e854a387ed1b7b891';

export async function getPopular(page = 1) {
  const url = API_URL + `trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
