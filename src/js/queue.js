import { fetchMovieById } from './fetchMovieById';

const createBtnMurkup = () => {
  return `<button class="queue-modal-btn">Add to queue</button>`;
};

document.body.insertAdjacentHTML('beforeend', createBtnMurkup());

refs = {
  queueModalBtn: document.querySelector('.queue-modal-btn'),
};

if (!localStorage.filmQueue) {
  localStorage.setItem('filmQueue', JSON.stringify([]));
}

const saveData = ({ id, poster_path, release_date, title } = {}) => {
  if (JSON.parse(localStorage.filmQueue).some(movie => movie.id === id)) return;

  const movieData = {
    id,
    poster_path,
    release_date,
    title,
  };

  localStorage.setItem(
    'filmQueue',
    JSON.stringify([
      ...JSON.parse(localStorage.getItem('filmQueue')),
      movieData,
    ])
  );
};

const onQueueModalBtnClick = async () => {
  const data = await fetchMovieById();

  // console.log(data);
  saveData(data);
  console.log(localStorage.filmQueue);
};

refs.queueModalBtn.addEventListener('click', onQueueModalBtnClick);
