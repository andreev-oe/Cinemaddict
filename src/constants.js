const FILM_CARDS_AMOUNT = 12;
const EXTRA_FILMS_CARDS_AMOUNT = 2;
const FILMS_PORTION = 5;
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const SortType = {
  DEFAULT: 'byDefault',
  BY_DATE: 'byDate',
  BY_RATING: 'byRating',
};
const FilterType = {
  DEFAULT: 'default',
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
  EXTRA_FILMS_CARDS_AMOUNT,
  FILMS_PORTION,
  EMOTIONS,
  SortType,
  FilterType,
  UpdateType,
  UserAction,
};
