import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable{

  filterAll = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return model;
  };

  filterWatchList = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.watchlist);
  };

  filterHistory = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.alreadyWatched);
  };

  filterFavorites = (model, element, cssClass) => {
    element.classList.add(cssClass);
    return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.favorite);
  };
}
