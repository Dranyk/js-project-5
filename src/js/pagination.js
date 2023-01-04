import { renderImg } from "./popular_film";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const PER_PAGE = 20;

const options = {
  totalItems: 20000,
  itemsPerPage: PER_PAGE,
  visiblePages: 7,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};

const paginat = new Pagination('pagination', options);

const loadMorePopylarMovie = event => {
  
  const currentPage = event.page;
  // spinerPlay()
  const paginatOff = paginat.off('beforeMove', loadMorePopylarMovie);
  renderImg(currentPage, paginatOff);
};

paginat.on('beforeMove', loadMorePopylarMovie);
paginat.on('afterMove', loadMorePopylarMovie);
