// import { fetchMovieById } from './fetchMovieById';
// import { createWatched } from './createWatched';

// const refs = {
//   modal: document.querySelector('.modal'),
// };

// export const addWatched = () => {
//   if (!localStorage.filmsWatched) {
//     localStorage.setItem('filmsWatched', JSON.stringify([]));
//   }
// };
// const saveData = ({ id, poster_path, release_date, title }) => {
//   const movieData = {
//     id,
//     poster_path,
//     release_date,
//     title,
//   };

//   localStorage.setItem(
//     'filmsWatched',
//     JSON.stringify([
//       ...JSON.parse(localStorage.getItem('filmsWatched')),
//       movieData,
//     ])
//   );
// };

// const removeData = ({ id }) => {
//   const updatedMovies = JSON.parse(localStorage.filmsWatched).filter(
//     movie => movie.id !== id
//   );

//   localStorage.removeItem('filmsWatched');

//   localStorage.setItem('filmsWatched', JSON.stringify(updatedMovies));
// };

// const handleClick = async e => {
//   if (!e.target.classList.contains('modal-movie__btn-watched')) return;
//   console.log(e.target);
//   const currentMovieId = e.target.dataset.id;

//   const data = await fetchMovieById(currentMovieId);

//   if (!data) return;

//   if (JSON.parse(localStorage.filmsWatched).some(({ id }) => id === data.id)) {
//     removeData(data);

//     e.target.textContent = 'add to watched';
//     return;
//   }

//   saveData(data);

//   e.target.textContent = 'remove from watched';
// };

// addWatched();

// refs.modal.addEventListener('click', handleClick);
import { LocalStorageApi } from './localStorageApi';
import { fetchMovieById } from './fetchMovieById';

export const localStorageApi = new LocalStorageApi('filmsWatched');

const refs = {
  modal: document.querySelector('.modal'),
};

const onWatchedModalBtnClick = async e => {
  if (!e.target.classList.contains('modal-movie__btn-watched')) return;

  const currentMovieId = e.target.dataset.id;

  const data = await fetchMovieById(currentMovieId);

  if (!data) return;

  if (
    JSON.parse(localStorage.getItem(localStorageApi.key)).some(
      ({ id }) => id === data.id
    )
  ) {
    localStorageApi.removeData(data);

    e.target.textContent = 'add to watched';
    return;
  }

  localStorageApi.saveData(data);

  e.target.textContent = 'remove from watched';
};

localStorageApi.createsDataModel();

refs.modal.addEventListener('click', onWatchedModalBtnClick);
