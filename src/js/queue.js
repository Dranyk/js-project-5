import { fetchMovieById } from './fetchMovieById';

const createBtnMurkup = () => {
  return `<button class="queue-modal-btn">Add to queue</button>`;
};

document.body.insertAdjacentHTML('beforeend', createBtnMurkup());

refs = {
  queueModalBtn: document.querySelector('.queue-modal-btn'),
};

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

const onQueueModalBtnClick = async () => {
  const movieId = 19;
  const data = await fetchMovieById(movieId);

  if (!data) return;

  if (JSON.parse(localStorage.filmsQueue).some(({ id }) => id === data.id)) {
    removeData(data);
    return;
  }

  saveData(data);
  console.log(localStorage.filmsQueue);
};

createsFilmsQueue();

refs.queueModalBtn.addEventListener('click', onQueueModalBtnClick);
