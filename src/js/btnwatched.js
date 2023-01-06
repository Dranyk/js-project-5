// import { createWatched } from './createWatched';
// import { addWatched } from './watched';

// const refs = {
//   showWatchedBtn: document.querySelector('#showWatchedBtn'),
//   watchedList: document.querySelector('.main-list'),
// };

// const render = markup => {
//   refs.watchedList.innerHTML = `${createWatched(markup)}`;
// };

// const onShowWatchedBtnClick = () => {
//   const filmsWatched = JSON.parse(localStorage.filmsWatched);
//   console.log(filmsWatched);

//   render(filmsWatched);
// };

// addWatched();

// refs.showWatchedBtn.addEventListener('click', onShowWatchedBtnClick);
import { localStorageApi } from './watched';
import toastr from 'toastr';

import './toastr.config';
import 'toastr/build/toastr.min.css';
import { LocalStorageApi } from './localStorageApi';

// console.log(localStorageApi.createsDataModel);

const refs = {
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
  watchedList: document.querySelector('.main-list'),
};

let watchedFilms = JSON.parse(localStorage.getItem(localStorageApi.key));

// export const render = filmsQueue => {
//   refs.queueList.innerHTML = `${createQueueMarkup(filmsQueue)}`;
// };

const onShowWatchedBtnClick = () => {
  watchedFilms = JSON.parse(localStorage.getItem(localStorageApi.key));

  if (watchedFilms.length === 0)
    toastr.warning('There are no films in the watched yet');

  console.log(watchedFilms);

  localStorageApi.render(refs.watchedList, watchedFilms);
};

localStorageApi.createsDataModel();

localStorageApi.render(refs.watchedList, watchedFilms);

refs.showWatchedBtn.addEventListener('click', onShowWatchedBtnClick);
