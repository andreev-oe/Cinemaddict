const updateFilm = (films, filmToUpdate) => {
  const index = films.findIndex((film) => film.id === filmToUpdate.id);
  if (index === -1) {
    return films;
  }
  return [
    ...films.slice(0, index),
    filmToUpdate,
    ...films.slice(index + 1),
  ];
};

export {
  updateFilm,
};
