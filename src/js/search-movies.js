// import MovieApiService from './movie-service';
// import { createMarkup } from './createMarkup';
// import { clearMarkup } from './createMarkup';
// import { spinerPlay, spinerStop } from './spiner';
// const formRef = document.querySelector('form');
// // formRef.addEventListener('submit', onSearch);

// const movieApiService = new MovieApiService();

// renderImg();

// async function renderImg() {
//   spinerPlay();
//   await movieApiService.fetchMovie().then(data => {
//     createMarkup(data);
//     spinerStop();
//   })
//   .catch(error => {
//     console.log(error);
//   });  
// };

// async function onSearch(e) {
//     e.preventDefault(); 
//     clearMarkup();     
//     movieApiService.query = e.currentTarget.elements.searchFilm.value.trim();
//     movieApiService.resetPage();
//     e.currentTarget.elements.searchFilm.value = '';
//     spinerPlay();
//     await movieApiService.fetchMovieByQuery().then((data) => {
//       createMarkup(data);
//       spinerStop();
//   })
//   .catch(error => {
//     console.log(error);
//   });      
// }




