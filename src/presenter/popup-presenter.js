import FilmPopupView from '../view/film-popup-view.js';
import {
  remove,
  render
} from '../framework/render.js';
import {
  UpdateType,
  UserAction,
  DEFAULT_EMOJI
} from '../constants.js';

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
  #filmsModel = null;
  #commentsModel = null;
  #scrollTop = null;
  #uiBlocker = null;
  #deleteButton = null;
  #isFormSubmit = null;
  #isDeleteBtnPressed = null;

  constructor(filmsModel, commentsModel, mainContainer, changeData, UiBlocker) {
    this.#films = [...filmsModel.getFilms()];
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#comments = [...commentsModel.getAllComments()];
    this.#mainContainer = mainContainer;
    this.#filmPopupView = null;
    this.#popupPresenter = new Map();
    this.#changeData = changeData;
    this.#uiBlocker = UiBlocker;
  }

  get popupView () {
    return this.#filmPopupView;
  }

  get commentDeleteBtn () {
    return this.#deleteButton.textContent;
  }

  set commentDeleteBtn (comment) {
    this.#deleteButton.textContent = comment;
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
      this.#films = this.#filmsModel.getFilms();
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

  updatePopup = () => {
    if (this.#filmPopupView !== null) {
      this.#films = this.#filmsModel.getFilms();
      if (!this.#films.length) {
        this.#uiBlocker.unblock();
        if (!this.#isFormSubmit && !this.#isDeleteBtnPressed) {
          this.#filmPopupView.setControlButtonsShake();
        }
        return;
      }
      this.renderPopup(this.#evt);
    }
  };

  renderPopup = (evt) => {
    this.#films = this.#filmsModel.getFilms();
    this.#film = this.#films[evt.target.dataset.filmId];
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
      this.#scrollTop = 0;
      return;
    }
    if (prevPopupView.element) {
      this.#scrollTop = prevPopupView.element.scrollTop;
      document.body.classList.add('hide-overflow');
      render(this.#filmPopupView, this.#mainContainer);
    }
    this.#filmPopupView.element.scrollTop = this.#scrollTop;
    remove(prevPopupView);
  };

  #onAddToFavoritesButtonClick = (film) => {
    this.#isFormSubmit = false;
    this.#isDeleteBtnPressed = false;
    film.userDetails.favorite = !film.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
  };

  #onAddToWatchedButtonClick = (film) => {
    this.#isFormSubmit = false;
    this.#isDeleteBtnPressed = false;
    film.userDetails.alreadyWatched = !film.userDetails.alreadyWatched;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
  };

  #onAddToWatchButtonClick = (film) => {
    this.#isFormSubmit = false;
    this.#isDeleteBtnPressed = false;
    film.userDetails.watchlist = !film.userDetails.watchlist;
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      film,
    );
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
    this.#isDeleteBtnPressed = true;
    const commentId = evt.target.dataset.commentId;
    this.#deleteButton = evt.target;
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
    this.#isFormSubmit = true;
    const commentToAdd = {
      comment: evt.target.value,
      emotion: selectedEmoji,
    };
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      this.#film,
      commentToAdd
    );
  };

  destroy = () => remove(this.#filmPopupView);
}
