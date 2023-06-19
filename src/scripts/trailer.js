import { API_KEY } from './api-service';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export async function fetchYoutube(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    );
    if (!response.ok) {
      Notiflix.Notify.failure('Failed to fetch data from the server.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Notiflix.Notify.failure(`An error occurred: ${error.message}`);
  }
}

export async function openLightbox(url) {
  try {
    Loading.pulse({
      svgColor: 'red',
    });

    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('id', 'youtube-close-btn');
    closeButton.setAttribute('class', 'modal__btn-close');
    closeButton.innerHTML = `<svg class="modal__icon__close" width="30" height="30" viewbox="0 0 30 30" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M8 8L22 22" stroke="white" stroke-width="2" />
<path d="M8 22L22 8" stroke="white" stroke-width="2" />
</svg>`;

    const content = document.createElement('div');
    content.innerHTML = `
<iframe src="${url}?autoplay=1&mute=1&controls=1"></iframe>
`;

    content.appendChild(closeButton);

    const instance = basicLightbox.create(content.innerHTML, {
      onShow: instance => {
        instance.element().querySelector('#youtube-close-btn').onclick = () => {
          instance.close();
          Loading.remove();
        };
        document.body.addEventListener('keydown', e => {
          if (e.key === 'Escape') instance.close();
        });
      },
    });
    instance.show();
  } catch (error) {
    Notiflix.Notify.failure('An error occurred while opening the lightbox.');
  } finally {
    Loading.remove();
  }
}
