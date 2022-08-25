import AbstractView from '../framework/view/abstract-view.js';

const createCommentElement = (commentsId, commentsText) => {
  const divElement = document.createElement('div');
  const filteredComments = commentsText.filter((comment) => {
    for (let i = 0; i < commentsId.length; i++) {
      if (comment.id === commentsId[i]) {
        return true;
      }
    }
  });

  for (let i = 0; i < filteredComments.length; i++) {
    divElement.textContent += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${commentsText[i].emotion}.png" width="55" height="55" alt="emoji-sleeping">
            </span>
            <div>
              <p class="film-details__comment-text">${filteredComments[i].comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${filteredComments[i].author}</span>
                <span class="film-details__comment-day">${filteredComments[i].date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }
  return divElement.textContent;
};

const createGenreElement = (genre) => {
  const divElement = document.createElement('div');
  for (let i = 0; i < genre.length; i++) {
    divElement.textContent += `<span class="film-details__genre">${genre[i]}</span>`;
  }
  return divElement.textContent;
};

const createFilmPopupElement = (film, commentsText) => {
  const {title, description, release, poster, genre, runtime, actors, writers, director, totalRating, ageRating} = film.filmInfo;
  const {favorite, alreadyWatched, watchlist} = film.userDetails;
  const {length} = film.comments;
  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating"${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${release.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${createGenreElement(genre)}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist === true ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatched === true ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite === true ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentElement(film.comments, commentsText)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
};

export default class FilmPopupView extends AbstractView {
  #film = null;
  #commentsText = null;

  constructor(film, commentsText) {
    super();
    this.#film = film;
    this.#commentsText = commentsText;
  }

  get template () {
    return createFilmPopupElement(this.#film, this.#commentsText);
  }

  setOnClosePopupButtonClick = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onClosePopupButtonClick);
  };

  #onClosePopupButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setOnAddToFavoritesButtonClick = (callback, eventListener) => {
    this._callback.render = callback;
    this._callback.onFavoriteClick = eventListener;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onAddToFavoritesButtonClick);
  };

  #onAddToFavoritesButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onFavoriteClick(this.#film);
    this._callback.render(this.#film);
  };

  setOnAddToWatchedButtonClick = (callback, eventListener) => {
    this._callback.render = callback;
    this._callback.onWatchedClick = eventListener;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onAddToWatchedButtonClick);
  };

  #onAddToWatchedButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchedClick(this.#film);
    this._callback.render(this.#film);
  };

  setOnAddToWatchButtonClick = (callback, eventListener) => {
    this._callback.render = callback;
    this._callback.onWatchClick = eventListener;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onAddToWatchButtonClick);
  };

  #onAddToWatchButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchClick(this.#film);
    this._callback.render(this.#film);
  };
}
