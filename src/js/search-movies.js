import MoviesApi from './movie-service';
import { createMarkup } from './createMarkup';

const formRef = document.querySelector('form');
formRef.addEventListener('submit', onSearch);

const moviesApi = new MoviesApi();

async function onSearch(e) {
    e.preventDefault();      
    moviesApi.query = e.currentTarget.elements.searchFilm.value.trim();
    moviesApi.resetPage();
    await moviesApi.fetchMovieByQuery().then((data) => {
        createMarkup(data);      
    })
  }




