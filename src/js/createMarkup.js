import MoviesApi from './movie-service';
const moviesApi = new MoviesApi();

const body = document.querySelector('.main-list');
export async function createMarkup(data) {
    const genres = await moviesApi.fetchGenres().then((response) => response.genres);
    
    return data.results.map(({id, poster_path, release_date, genre_ids, title}) => {
        const genresList = genres.filter(e => genre_ids.includes(e.id))
          .map(e => e.name)
          .join(', ');
        
        const markup = 
        `<li class="table-item film-card__item" data-id="${id}">
            <div class="card-thumb">
                <img 
                src="https://image.tmdb.org/t/p/w400${poster_path}" 
                alt="${title}" 
                loading="lazy"
                />
            </div>
            <div class="card-desc">
                <p class="card-title">${title}</p>
                <p class="card-info">${genresList}<span class="card-year">${release_date.slice(0,4)}</span></p>
            </div>
        </li> `;
        body.insertAdjacentHTML('beforeend', markup);                    
    }).join('');
}