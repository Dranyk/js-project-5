<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
=======
import { fetchMovieById } from './fetchMovieById';

const refs = {
  //modal: document.querySelector('.modal'),
  btWatched: document.querySelector('#title'),
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
>>>>>>> Stashed changes

const handleClick = async e => {
  if (!e.target.classList.contains('modal-movie__btn-watched')) return;

  const currentMovieId = e.target.dataset.id;

  const data = await fetchMovieById(currentMovieId);

  if (!data) return;

  if (JSON.parse(localStorage.filmsQueue).some(({ id }) => id === data.id)) {
    removeData(data);

    e.target.textContent = 'add to watched';
    return;
  }

  saveData(data);

  e.target.textContent = 'remove from watched';
};

createsFilmsQueue();

refs.btWatched.addEventListener('click', handleClick);
