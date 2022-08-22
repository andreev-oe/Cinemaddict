const sortByDefault = (model) => model;

const sortByDay = (model) => {
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

const sortByRating = (model) => {
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
