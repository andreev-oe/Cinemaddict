const filterAll = (model, element, cssClass) => {
  element.classList.add(cssClass);
  return model;
};

const filterWatchList = (model, element, cssClass) => {
  element.classList.add(cssClass);
  return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.watchlist);
};

const filterHistory = (model, element, cssClass) => {
  element.classList.add(cssClass);
  return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.alreadyWatched);
};

const filterFavorites = (model, element, cssClass) => {
  element.classList.add(cssClass);
  return JSON.parse(JSON.stringify(model)).filter((film) => film.userDetails.favorite);
};

export {
  filterAll,
  filterWatchList,
  filterHistory,
  filterFavorites,
};
