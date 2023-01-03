import { fetchMovieById } from './fetchMovieById';

const refs = {
  MoviesList: document.querySelector('.main-list'),
  modal: document.querySelector('.modal'),
};

let currentMovieId = null;

export const createsFilmsQueue = () => {
  if (!localStorage.filmsQueue) {
    localStorage.setItem('filmsQueue', JSON.stringify([]));
  }
};

const saveData = ({ id, poster_path, release_date, title }) => {
  const movieData = {
    id,
    poster_path,
    release_date,
    title,
  };

  localStorage.setItem(
    'filmsQueue',
    JSON.stringify([
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      movieData,
    ])
  );
};

const removeData = ({ id }) => {
  const updatedMovies = JSON.parse(localStorage.filmsQueue).filter(
    movie => movie.id != id
  );

  localStorage.removeItem('filmsQueue');

  localStorage.setItem('filmsQueue', JSON.stringify(updatedMovies));
};

const onQueueModalBtnClick = async e => {
  if (!e.target.classList.contains('modal-movie__btn-queue')) return;

  const data = await fetchMovieById(currentMovieId);

  if (!data) return;

  if (JSON.parse(localStorage.filmsQueue).some(({ id }) => id === data.id)) {
    removeData(data);

    e.target.textContent = 'ADD TO QUEUE';
    return;
  }

  saveData(data);

  e.target.textContent = 'REMOVE FROM QUEUE';
};

export const onMovieCardClick = e => {
  if (e.target === e.currentTarget) return;

  currentMovieId = e.target.closest('.table-item').dataset.id;
};

createsFilmsQueue();

refs.modal.addEventListener('click', onQueueModalBtnClick);
refs.MoviesList.addEventListener('click', onMovieCardClick);
