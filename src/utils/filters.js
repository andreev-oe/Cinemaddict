const sortByDefault = (model, element, cssClass) => {
  element.classList.add(cssClass);
  return model;
};

const sortByDay = (model, element, cssClass) => {
  element.classList.add(cssClass);
  const clonedModel = JSON.parse(JSON.stringify(model));
  clonedModel.sort((a, b) => {
    if (a.filmInfo.release.date > b.filmInfo.release.date) {
      return -1;
    }
    if (a.filmInfo.release.date === b.filmInfo.release.date) {
      return 0;
    }
    if (a.filmInfo.release.date < b.filmInfo.release.date) {
      return 1;
    }
  });
  return clonedModel;
};

const sortByRating = (model, element, cssClass) => {
  element.classList.add(cssClass);
  const clonedModel = JSON.parse(JSON.stringify(model));
  clonedModel.sort((a, b) => {
    if (a.filmInfo.totalRating > b.filmInfo.totalRating) {
      return -1;
    }
    if (a.filmInfo.totalRating === b.filmInfo.totalRating) {
      return 0;
    }
    if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
      return 1;
    }
  });
  return clonedModel;
};

export {
  sortByDefault,
  sortByDay,
  sortByRating,
};
