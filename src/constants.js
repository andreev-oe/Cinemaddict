const FILMS_PORTION = 5;
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

export {
  FILMS_PORTION,
  FilterType,
  UpdateType,
  UserAction,
  DEFAULT_EMOJI
};
