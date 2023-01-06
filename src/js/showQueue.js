import { createQueueMarkup } from './createQueueMarkup';
import { createsFilmsQueue } from './queueLocalStorageApi';
import { LOCAL_ST_KEY } from './queueLocalStorageApi';
import toastr from 'toastr';

import './toastr.config';
import 'toastr/build/toastr.min.css';

const refs = {
  showQueueBtn: document.querySelector('#showQueueBtn'),
  queueList: document.querySelector('.main-list'),
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
};

const render = filmsQueue => {
  refs.queueList.innerHTML = `${createQueueMarkup(filmsQueue)}`;
};

const onShowQueueBtnClick = () => {
  const filmsQueue = JSON.parse(localStorage.getItem(LOCAL_ST_KEY));
  refs.showWatchedBtn.classList.remove('menu_btn_default');
  if (filmsQueue.length === 0)
    toastr.warning('There are no films in the queue yet');

  render(filmsQueue);
};

createsFilmsQueue();

refs.showQueueBtn.addEventListener('click', onShowQueueBtnClick);
