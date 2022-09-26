import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import he from 'he';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

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
              <img src="./images/emoji/${filteredComments[i].emotion}.png" width="55" height="55" alt="emoji-${filteredComments[i].emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(filteredComments[i].comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${filteredComments[i].author}</span>
                <span class="film-details__comment-day">${dayjs(filteredComments[i].date).fromNow()}</span>
                <button class="film-details__comment-delete" data-comment-id = "${filteredComments[i].id}">Delete</button>
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
              <td class="film-details__cell">${dayjs(release.date).format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${dayjs.duration(runtime, 'minutes').format('H[h] : mm[m]')}</td>
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

      <section class="film-details__controls" data-film-id="${film.id}">
        <button type="button" data-button="watchlist" class="film-details__control-button film-details__control-button--watchlist ${watchlist === true ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" data-button="watched" class="film-details__control-button film-details__control-button--watched ${alreadyWatched === true ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" data-button="favourite" class="film-details__control-button film-details__control-button--favorite ${favorite === true ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
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
              <img src="./images/emoji/smile.png" width="30" height="30" data-emoji-name = "emoji-smile" alt="smile">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" data-emoji-name = "emoji-sleeping" alt="sleeping">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" data-emoji-name = "emoji-puke" alt="puke">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" data-emoji-name = "emoji-angry" alt="angry">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
};

export default class FilmPopupView extends AbstractStatefulView {
  constructor(film, commentsText) {
    super();
    this._state.film = FilmPopupView.parseFilmDataToState(film);
    this._state.commentsText = FilmPopupView.parseFilmCommentsToState(commentsText);
    this.#setInnerHandlers();
  }

  get template () {
    return createFilmPopupElement(this._state.film, this._state.commentsText);
  }

  setOnClosePopupButtonClick = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onClosePopupButtonClick);
  };

  #onClosePopupButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setOnAddToFavoritesButtonClick = (eventListener) => {
    this._callback.onFavoriteClick = eventListener;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onAddToFavoritesButtonClick);
  };

  #onAddToFavoritesButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onFavoriteClick(this._state.film);
  };

  setOnAddToWatchedButtonClick = (eventListener) => {
    this._callback.onWatchedClick = eventListener;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onAddToWatchedButtonClick);
  };

  #onAddToWatchedButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchedClick(this._state.film);
  };

  setOnAddToWatchButtonClick = (eventListener) => {
    this._callback.onWatchClick = eventListener;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onAddToWatchButtonClick);
  };

  #onAddToWatchButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onWatchClick(this._state.film);
  };

  setOnEmojiClick = (eventListener) => {
    this._callback.onEmojiClick = eventListener;
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#onEmojiClick);
  };

  #onEmojiClick = (evt) => {
    evt.preventDefault();
    const emojiInputs = this.element.querySelectorAll('.film-details__emoji-item');
    const setNewCommentEmoji = () => {
      const newCommentEmoji = this.element.querySelector('.film-details__add-emoji-label');
      newCommentEmoji.innerHTML = `<img src="./images/emoji/${evt.target.alt}.png" width="55" height="55" alt="${evt.target.alt}">`;
    };
    this._callback.onEmojiClick(evt, emojiInputs, setNewCommentEmoji);
  };

  #onCommentDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.onCommentDeleteButtonClick(evt);
  };

  setOnCommentDeleteButtonClick = (eventListener) => {
    this._callback.onCommentDeleteButtonClick = eventListener;
    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((deleteButton) => deleteButton.addEventListener('click', this.#onCommentDeleteButtonClick));
  };

  #onCommentAddButtonsPress = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();
      let selectedEmoji;
      const selectedEmojiElement = this.element.querySelector('.film-details__add-emoji-label').firstChild;
      if (selectedEmojiElement) {
        selectedEmoji = selectedEmojiElement.alt;
      }
      this._callback.onCommentAddButtonPress(evt, selectedEmoji);
    }
  };

  setOnCommentAddButtonsPress = (eventListener) => {
    this._callback.onCommentAddButtonPress = eventListener;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#onCommentAddButtonsPress);
  };

  static parseFilmDataToState = (data) => ({...data});
  static parseFilmCommentsToState = (data) => ([...data]);

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onAddToFavoritesButtonClick);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onAddToWatchedButtonClick);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onAddToWatchButtonClick);
  };

  _restoreHandlers = () => {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onClosePopupButtonClick);
    this.#setInnerHandlers();
  };

}
