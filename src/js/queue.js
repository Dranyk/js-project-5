import { fetchMovieById } from './fetchMovieById';
import { createQueueMarkup } from './createQueueMarkup';

const refs = {
  queueModalBtn: document.querySelector('.queue-modal-btn'),
};

console.log(refs.queueModalBtn);

if (!localStorage.filmsQueue) {
  localStorage.setItem('filmsQueue', JSON.stringify([]));
}

const saveData = ({ id, poster_path, release_date, title } = {}) => {
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

const moviesQueueRender = () => {};

const onQueueModalBtnClick = async () => {
  // movieId = 10;
  const data = await fetchMovieById();

  if (JSON.parse(localStorage.filmsQueue).some(({ id }) => id === data.id)) {
    removeData(data);
    return;
  }

  saveData(data);
  console.log(localStorage.filmsQueue);
};

refs.queueModalBtn.addEventListener('click', onQueueModalBtnClick);
