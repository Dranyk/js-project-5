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

function handleClick() {
  console.log('hello');
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
    const btWatched = document.querySelector('#title');
    console.log(btWatched);
    btWatched.addEventListener('click', handleClick);
    window.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onClickOutsideModal);
  });
}

refs.openModalCard.addEventListener('click', createMarkupModal);
refs.closeModalBtn.addEventListener('click', closeModal);
