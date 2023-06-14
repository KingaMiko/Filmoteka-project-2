import { findMovie } from '../searchbox';
const searchForm = document.querySelector('.header__pane-search-form');
searchForm.removeEventListener('submit', findMovie);
