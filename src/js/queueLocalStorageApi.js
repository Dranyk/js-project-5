import { fetchMovieById } from './fetchMovieById';
const refs = {
  modal: document.querySelector('.modal'),
};

export const LOCAL_ST_KEY = 'filmsQueue';

export const createsFilmsQueue = () => {
  if (!localStorage.getItem(LOCAL_ST_KEY)) {
    localStorage.setItem(LOCAL_ST_KEY, JSON.stringify([]));
  }
};

const saveData = async ({ id, poster_path, release_date, title, genres }) => {
  const movieData = {
    id,
    poster_path,
    release_date,
    title,
    genresList: `${genres
      .map(({ name }) => name)
      .slice(0, 2)
      .join(', ')}${genres.length > 2 ? ', Other' : ''}`,
  };

  localStorage.setItem(
    LOCAL_ST_KEY,
    JSON.stringify([
      ...JSON.parse(localStorage.getItem(LOCAL_ST_KEY)),
      movieData,
    ])
  );
};

const removeData = ({ id }) => {
  const updatedMovies = JSON.parse(localStorage.getItem(LOCAL_ST_KEY)).filter(
    movie => movie.id != id
  );

  localStorage.removeItem(LOCAL_ST_KEY);

  localStorage.setItem(LOCAL_ST_KEY, JSON.stringify(updatedMovies));
};

const onQueueModalBtnClick = async e => {
    if (!e.target.classList.contains('modal-movie__btn-queue')) return;
    const currentMovieId = e.target.dataset.id;
    const data = await fetchMovieById(currentMovieId);
  
    if (!data) return;
  
    if (
      JSON.parse(localStorage.getItem(LOCAL_ST_KEY)).some(
        ({ id }) => id === data.id
      )
    ) {
      removeData(data);
  
      e.target.textContent = 'add to queue';
    return;
  }
  saveData(data);
  e.target.textContent = 'remove from queue';
};
createsFilmsQueue();
refs.modal.addEventListener('click', onQueueModalBtnClick);