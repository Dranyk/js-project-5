import poster404 from '../images/404.jpg';
import MoviesApi from './movie-service';
const moviesApi = new MoviesApi();
const message = document.querySelector('.error-search');
const container = document.querySelector('.main-list');
export async function createMarkup(data) {
    if (data.results.length === 0) {
        message.classList.remove('is-hidden');
    } else {  
        message.classList.add('is-hidden');     
    const genres = await moviesApi.fetchGenres().then((response) => response.genres);  
        return data.results.map(({id, poster_path, release_date, genre_ids, title}) => {
        const genresList = genres.filter(e => genre_ids.includes(e.id))
          .map(e => e.name)
          .join(', ');
        let moviePosterPath = `https://image.tmdb.org/t/p/w400${poster_path}`;
        if (!poster_path) {
            moviePosterPath = poster404;
        }
        let movieData = '';
        if (release_date) {
            movieData = release_date.slice(0, 4);
        }
        const markup = 
        `<li class="table-item film-card__item" data-id="${id}">
            <div class="card-thumb">
                <img 
                src="${moviePosterPath}" 
                alt="${title}" 
                loading="lazy"
                />
            </div>
            <div class="card-desc">
                <p class="card-title">${title}</p>
                <p class="card-info">${genresList}<span class="card-year">${movieData}</span></p>
            </div>
        </li> `;
        container.insertAdjacentHTML('beforeend', markup);                    
    }).join('');
    }
}

export function clearMarkup() {
    container.innerHTML = "";    
}