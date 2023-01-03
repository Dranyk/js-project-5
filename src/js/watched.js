import MoviesApi from './movie-service';
import { modalWindowMovieMarkup } from './template-modal-movie';

const btWatched = document.querySelector('.modal-movie__btn-watched');

function handleClick() {
  console.log('hello');
}
btWatched.addEventListener('click', handleClick);
