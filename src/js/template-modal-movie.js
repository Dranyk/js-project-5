const imgURL = 'https://image.tmdb.org/t/p';

export const modalWindowMovieMarkup = ({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genres,
  id,
}) =>
  ` <div class="modal-movie__img-wrapper">
      <img
        src="${imgURL}/w400${poster_path}"
        alt="${title}"
        
        class="modal-movie__img"
      />
      </div>
      <div class="modal-content-wrapper">
        <h2 class="modal-movie__title">${title.toUpperCase()}</h2>
      <div class="modal-movie__info">
        <ul class="modal-movie__list-specifications">
          <li class="modal-movie__item-specifications">Vote / Votes</li>
          <li class="modal-movie__item-specifications">Popularity</li>
          <li class="modal-movie__item-specifications">Original Title</li>
          <li class="modal-movie__item-specifications">Genre</li>
        </ul>
        <ul class="modal-movie__list-values">
          <li class="modal-movie__item-values">
            <span class="modal-movie__item-vote">${vote_average}</span
            ><span class="slash"> / </span
            ><span class="modal-movie__item-votes">${vote_count}</span>
          </li>
          <li class="modal-movie__item-values">${popularity}</li>
          <li class="modal-movie__item-values">${original_title.toUpperCase()}</li>
          <li class="modal-movie__item-values"><span class="modal-movie__item-genres">${genres
            .map(genre => genre.name)
            .join(',')}</span></li>
        </ul>
      </div>
      <h3 class="modal-movie__subtitle">About</h3>
      <p class="modal-movie__text">
        ${overview}
      </p>
      <div class="modal-movie__btn-wrapper">
        <button type="button" class="modal-btn modal-movie__btn-watched">
          ADD TO WATCHED
        </button>
        <button type="button" class="modal-btn modal-movie__btn-queue">
          ${
            JSON.parse(localStorage.filmsQueue).some(
              data => data.id === Number(id)
            )
              ? 'REMOVE FROM QUEUE'
              : 'ADD TO QUEUE'
          }
        </button>
      </div>
      </div>
      `;
