import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/main.scss';

const TUI_VISIBLE_PAGES = 5;

const container = document.querySelector('#pagination');

export function createPagination(totalItems, visiblePages) {
  const options = {
    itemsPerPage: 20,
    totalItems: totalItems,
    visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
  };

  const pagination = new Pagination(container, options);

  if (visiblePages > 1) {
    container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }

  return pagination;
}

