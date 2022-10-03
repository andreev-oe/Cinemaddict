import FilmPopupView from '../view/film-popup-view.js';
import {
  remove,
  render
} from '../framework/render.js';
import {updateFilm} from '../utils/utilities.js';
import {
  UpdateType,
  UserAction,
  DEFAULT_EMOJI
} from '../constants.js';
import dayjs from 'dayjs';
import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890', 10);

export default class PopupPresenter {
  #filmPopupView = null;
  #films = null;
  #comments = null;
  #mainContainer = null;
  #popupPresenter = null;
  #evt = null;
  #popupClosed = true;
  #changeData = null;
  #film = null;
  #commentsModel = null;

  constructor(filmsModel, commentsModel, mainContainer, changeData) {
    this.#films = [...filmsModel.getFilms()];
    this.#commentsModel = commentsModel;
    this.#comments = [...commentsModel.getAllComments()];
    this.#mainContainer = mainContainer;
    this.#filmPopupView = null;
    this.#popupPresenter = new Map();
    this.#changeData = changeData;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      document.body.removeEventListener('keydown', this.#onEscKeyDown);
      this.destroy();
      this.#popupClosed = true;
    }
  };

  #onClosePopupButtonClick = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeEventListener('keydown', this.#onEscKeyDown);
    this.destroy();
    this.#popupClosed = true;
  };

  onFilmImgClick = (evt) => {
    if (evt.target.nodeName === 'IMG' && evt.target.dataset.filmId){
      if (this.#filmPopupView) {
        this.destroy();
      }
      this.#film = this.#films[evt.target.dataset.filmId];
      this.renderPopup(evt);
      this.#popupClosed = false;
      this.#commentsModel.init(UpdateType.PATCH, this.#film);
    }
  };

  get popupClosedState () {
    return this.#popupClosed;
  }

  updatePopup = (popupToUpdate) => {
    if (this.#filmPopupView !== null) {
      this.#films = updateFilm(this.#films, popupToUpdate);
      this.renderPopup(this.#evt);
    }
  };

  renderPopup = (evt) => {
    this.#comments = this.#commentsModel.getAllComments();
    this.#evt = evt;
    const prevPopupView = this.#filmPopupView;
    this.#filmPopupView = new FilmPopupView(this.#film, this.#comments);
    this.#filmPopupView.setOnAddToFavoritesButtonClick(this.#onAddToFavoritesButtonClick);
    this.#filmPopupView.setOnAddToWatchButtonClick(this.#onAddToWatchedButtonClick);
    this.#filmPopupView.setOnAddToWatchedButtonClick(this.#onAddToWatchButtonClick);
    this.#filmPopupView.setOnEmojiClick(this.#onEmojiClick);
    this.#filmPopupView.setOnCommentDeleteButtonClick(this.#onDeleteCommentButtonClick);
    this.#filmPopupView.setOnCommentAddButtonsPress(this.#onCommentAddButtonsPress);
    document.body.addEventListener('keydown', this.#onEscKeyDown);
    this.#filmPopupView.setOnClosePopupButtonClick(this.#onClosePopupButtonClick);
    if (prevPopupView === null) {
      document.body.classList.add('hide-overflow');
      render(this.#filmPopupView, this.#mainContainer);
      return;
    }
    if (prevPopupView.element) {
      document.body.classList.add('hide-overflow');
      render(this.#filmPopupView, this.#mainContainer);
    }
    remove(prevPopupView);
  };

  #onAddToFavoritesButtonClick = (film) => {
    film.userDetails.favorite = !film.userDetails.favorite;
  };

  #onAddToWatchedButtonClick = (film) => {
    film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
  };

  #onAddToWatchButtonClick = (film) => {
    film.userDetails.watchlist = !film.userDetails.watchlist;
  };

  #onEmojiClick = (evt, emojiInputs, setNewCommentEmoji) => {
    if (evt.target.dataset.emojiName) {
      for (const input of emojiInputs) {
        input.checked = input.id === evt.target.dataset.emojiName;
      }
      setNewCommentEmoji();
    }
  };

  #onDeleteCommentButtonClick = (evt) => {
    const commentId = Number(evt.target.dataset.commentId);
    const commentIdIndex = this.#film.comments.findIndex((comment) => comment === commentId);
    const commentToDelete = this.#comments.find((comment) => comment.id === commentId);
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#film,
        comments: [
          ...this.#film.comments.slice(0, commentIdIndex),
          ...this.#film.comments.slice(commentIdIndex + 1)
        ]
      },
      commentToDelete
    );
  };

  #onCommentAddButtonsPress = (evt, selectedEmoji = DEFAULT_EMOJI) => {
    const commentToAdd = {
      id: Number(nanoid()),
      author: 'defaultUser',
      comment: evt.target.value,
      date: dayjs(),
      emotion: selectedEmoji,
    };
    this.#film.comments.push(commentToAdd.id);
    this.#comments.push(commentToAdd);
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      this.#film,
      commentToAdd
    );
  };

  destroy = () => remove(this.#filmPopupView);
}
