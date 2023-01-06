import { createWatched } from './createWatched';
import { addWatched } from './watched';

const refs = {
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
  watchedList: document.querySelector('.main-list'),
};

const render = markup => {
  refs.watchedList.innerHTML = `${createWatched(markup)}`;
};

const onShowWatchedBtnClick = () => {
  const filmsWatched = JSON.parse(localStorage.filmsWatched);

  render(filmsWatched);
};

addWatched();
onShowWatchedBtnClick();
refs.showWatchedBtn.addEventListener('click', onShowWatchedBtnClick);
