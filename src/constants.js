const FILM_CARDS_AMOUNT = 12;
const FILMS_PORTION = 5;
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
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
};
const UserAction = {
  UPDATE_FILM: 'updateFilm',
  ADD_COMMENT: 'addComment',
  DELETE_COMMENT: 'deleteComment',
};

export {
  FILM_CARDS_AMOUNT,
  FILMS_PORTION,
  EMOTIONS,
  FilterType,
  UpdateType,
  UserAction,
  DEFAULT_EMOJI
};
