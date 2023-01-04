import { MovieApiService } from "./popular_film_key";
import { renderImg } from "./popular_film";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const containerPaginationRef = document.getElementById("pagination");
const containerRef = document.querySelector(".container");

const PER_PAGE = 20;

const unsplash = new MovieApiService({ per_page: PER_PAGE });

const pagination = new Pagination(containerPaginationRef);

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

// const paginat = new Pagination(containerPaginationRef, options);
// console.log("paginat", paginat);
  const paginat = new Pagination('pagination', options);
// const page = paginat.getCurrentPage();
// console.log("page", page);

const loadMorePopylarMovie = event => {
  
  const currentPage = event.page;
  // spinerPlay()
  paginat.reset(options.totalItems);
  
        renderImg(currentPage);
//   unsplash
//     .axiosApiMovie(currentPage)
//     .then((results) => {
//       renderImg(results.data);
//     })
//     .catch(error => {
//       // Notify.failure(error.message);
//       // containerPaginationRef.classList.add('is-hidden');
//     })
//     .finally(() => {
//       // spinerStop();
      
//       paginat.off('beforeMove', loadMorePopylarMovie);
//     });
// };
console.log('<<<<<paginat', paginat);

paginat.on('beforeMove', loadMorePopylarMovie);
paginat.on('afterMove', loadMorePopylarMovie);



