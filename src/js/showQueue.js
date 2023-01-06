// import { createQueueMarkup } from './createQueueMarkup';
// import { createsFilmsQueue } from './queueLocalStorageApi';
// import { LOCAL_ST_KEY } from './queueLocalStorageApi';
import { localStorageApi } from './filmsQueue';
import toastr from 'toastr';

import './toastr.config';
import 'toastr/build/toastr.min.css';

// console.log(localStorageApi.createsDataModel);

const refs = {
  showQueueBtn: document.querySelector('#showQueueBtn'),
  queueList: document.querySelector('.main-list'),
};

// export const render = filmsQueue => {
//   refs.queueList.innerHTML = `${createQueueMarkup(filmsQueue)}`;
// };

const onShowQueueBtnClick = () => {
  const filmsQueue = JSON.parse(localStorage.getItem(localStorageApi.key));

  if (filmsQueue.length === 0)
    toastr.warning('There are no films in the queue yet');

  localStorageApi.render(refs.queueList, filmsQueue);
};

localStorageApi.createsDataModel();

refs.showQueueBtn.addEventListener('click', onShowQueueBtnClick);