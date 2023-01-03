import { createQueueMarkup } from './createQueueMarkup';
import toastr from 'toastr';
import { createsFilmsQueue, onMovieCardClick } from './addToQueue';

import './toastr.config';
import 'toastr/build/toastr.min.css';

const refs = {
  showQueueBtn: document.querySelector('#showQueueBtn'),
  queueList: document.querySelector('.main-list'),
};

const render = markup => {
  refs.queueList.innerHTML = `${createQueueMarkup(markup)}`;
};

const onShowQueueBtnClick = () => {
  const filmsQueue = JSON.parse(localStorage.filmsQueue);

  if (filmsQueue.length === 0)
    toastr.warning('There are no films in the queue yet');

  render(filmsQueue);
};

createsFilmsQueue();

refs.showQueueBtn.addEventListener('click', onShowQueueBtnClick);
refs.queueList.addEventListener('click', onMovieCardClick);
