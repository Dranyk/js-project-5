import MoviesApi from './movie-service';
import { modalWindowMovieMarkup } from './template-modal-movie';

const modalMoviesApi = new MoviesApi();

const refs = {
  openModalBtn: document.querySelector('[data-modal-about-open]'),
  closeModalBtn: document.querySelector('[data-modal-about-close]'),
  modal: document.querySelector('[data-modal-about]'),
  openModalCard: document.querySelector('.main-list'),
  renderModalCard: document.querySelector('.js-modal-window'),
  backdropCard: document.querySelector('.modal'),
};

function showModal() {
  refs.modal.classList.remove('is-hidden');
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
    return;
  }
}

function onClickOutsideModal(e) {
  const modalInside = e.target.closest('.modal');

  if (!modalInside) {
    closeModal();
  }
}

function clearModalInfo() {
  refs.renderModalCard.innerHTML = '';
}

function renderMarkupModal(data) {
  const renderModal = modalWindowMovieMarkup(data);
  refs.renderModalCard.insertAdjacentHTML('beforeend', renderModal);
}

async function createMarkupModal(e) {
  const parentMovieCard = e.target.closest('.film-card__item');
  const idMovieCard = parentMovieCard.dataset.id;

  modalMoviesApi.id = idMovieCard;

  await modalMoviesApi.fetchDetails().then(details => {
    console.log(details.data);
    clearModalInfo();
    renderMarkupModal(details.data);
    showModal();
    window.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onClickOutsideModal);
  });
}

refs.openModalCard.addEventListener('click', createMarkupModal);
refs.closeModalBtn.addEventListener('click', closeModal);

async function createMarkupModal(e) {
  const parentMovieCard = e.target.closest('.film-card__item');
  const idMovieCard = parentMovieCard.dataset.id;

  modalMoviesApi.id = idMovieCard;

  await modalMoviesApi.fetchDetails().then(details => {
    console.log(details.data);
    clearModalInfo();
    renderMarkupModal(details.data);
    showModal();
    const btWatched = document.querySelector('#title');
    btWatched.addEventListener('click', handleClick);
    window.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onClickOutsideModal);
  });
}

refs.openModalCard.addEventListener('click', createMarkupModal);
refs.closeModalBtn.addEventListener('click', closeModal);
const localStorageApi = {
  //Проверяет хранилище по ключу. Возвращает: Пустой массив - если не находит, и Данные - если находит
  getMovies(key) {
    const keyStorage = this.load(key);

    if (Array.isArray(keyStorage)) return keyStorage;

    this.save(key, []);
    return [];
  },

  //Добавляет фильм : Пушит переданный 'value' в LocalStorage с ключем 'key'
  addMovie(key, value) {
    const dataFromLocalStorage = this.load(key);
    this.save(key, [value, ...dataFromLocalStorage]);
  },

  removeMovie(key, value) {
    const dataFromLocalStorage = this.load(key);

    const valueIndex = dataFromLocalStorage.indexOf(value);

    if (0 <= valueIndex) {
      dataFromLocalStorage.splice(valueIndex, 1);

      this.save(key, dataFromLocalStorage);
    }
  },

  // Принимает ключ `key` по которому будет произведена выборка.
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },

  // Принимает ключ `key` и значение `value`.
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  },
};
function handleClick(e) {
  const storageKey = e.target.value;

  const action = e.target.checked ? 'add' : 'remove';

  localStorageApi.getMovies(storageKey);
  localStorageApi.addMovie(storageKey);
  localStorageApi.removeMovie(storageKey);
}
