const FILMS_PORTION = 5;
const GENRES_MIN_LENGTH = 1;
const ACTIVE_FILTER_BUTTON_CLASS = 'main-navigation__item--active';
const MAX_DESCRIPTION_LENGTH = 139;
const DEFAULT_EMOJI = 'smile';
const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVOURITES: 'favourites',
};
const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};
const UserAction = {
  UPDATE_FILM: 'updateFilm',
  ADD_COMMENT: 'addComment',
  DELETE_COMMENT: 'deleteComment',
};
const ProfileRating = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff'
};
const ProfileRatingGrade = {
  NONE: 0,
  NOVICE : 10,
  FAN: 20,
  MOVIE_BUFF: 21,
};
const UiBlockerLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 2000,
};

const DeleteButtonText = {
  DELETE: 'Delete',
  DELETING: 'Deleting',
};

export {
  FILMS_PORTION,
  FilterType,
  UpdateType,
  UserAction,
  DEFAULT_EMOJI,
  GENRES_MIN_LENGTH,
  ACTIVE_FILTER_BUTTON_CLASS,
  MAX_DESCRIPTION_LENGTH,
  ProfileRating,
  ProfileRatingGrade,
  UiBlockerLimit,
  DeleteButtonText
};
