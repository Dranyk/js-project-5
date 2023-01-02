import { fetchMovieById } from './fetchMovieById';

// const createBtnMurkup = () => {
//   return `<button class="queue-modal-btn">Add to queue</button>`;
// };

// document.body.insertAdjacentHTML('beforeend', createBtnMurkup());

const refs = {
  // queueModalBtn: document.querySelector('.queue-modal-btn'),
  MoviesList: document.querySelector('.main-list'),
  queueModalBtn: document.querySelector('.modal-movie__btn-queue'),
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

  refs.queueModalBtn.textContent = 'REMOVE FROM QUEUE';
};

const removeData = ({ id }) => {
  const updatedMovies = JSON.parse(localStorage.filmsQueue).filter(
    movie => movie.id != id
  );

  localStorage.removeItem('filmsQueue');

  localStorage.setItem('filmsQueue', JSON.stringify(updatedMovies));

  refs.queueModalBtn.textContent = 'ADD TO QUEUE';
};

const onQueueModalBtnClick = async () => {
  const data = await fetchMovieById(currentMovieId);

  if (!data) return;

  if (JSON.parse(localStorage.filmsQueue).some(({ id }) => id === data.id)) {
    removeData(data);
    return;
  }

  saveData(data);
  console.log(localStorage.filmsQueue);
};

export const initialQueueModalBtn = currentMovieId => {
  refs.queueModalBtn.textContent = JSON.parse(localStorage.filmsQueue).some(
    ({ id }) => id === Number(currentMovieId)
  )
    ? 'REMOVE FROM QUEUE'
    : 'ADD TO QUEUE';
};

export const onMovieCardClick = e => {
  if (e.target === e.currentTarget) return;

  currentMovieId = e.target.closest('.table-item').dataset.id;

  initialQueueModalBtn(currentMovieId);
};

createsFilmsQueue();

refs.queueModalBtn.addEventListener('click', onQueueModalBtnClick);
refs.MoviesList.addEventListener('click', onMovieCardClick);
