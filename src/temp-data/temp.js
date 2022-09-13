import {
  TEMP_DESCRIPTION,
  TEMP_TITLES,
  TEMP_POSTERS,
  TEMP_FILM_STUFF,
  TEMP_RELEASE_COUNTRIES,
  TEMP_GENRES,
  TEMP_COMMENTS,
  TEMP_AGE,
  TEMP_RATING,
  TEMP_FILM_STUFF_AMOUNT,
  TEMP_DATES,
  TEMP_DURATION,
  TEMP_BOOLEAN,
  TEMP_MAX_COMMENTS
} from './constants.js';
import {EMOTIONS} from '../constants.js';
import {
  getRandomInteger,
  getRandomFloat,
  translitLatinToCyrillic,
} from '../utils/utilities.js';

let filmIdCounter = 0;
let commentIdCounter = 0;

const getSmthList = (smth) => {
  const smthList = [];
  for (let i = 0; i < getRandomInteger(TEMP_FILM_STUFF_AMOUNT.MIN, TEMP_FILM_STUFF_AMOUNT.MAX); i++) {
    smthList.push(smth[getRandomInteger(0, smth.length - 1)]);
  }
  return Array.from(new Set(smthList));
};

const getCommentId = () => {
  const idList = [];
  for (let i = 0; i < getRandomInteger(0, TEMP_MAX_COMMENTS); i++) {
    idList.push(getRandomInteger(0, TEMP_COMMENTS.length - 1));
  }
  return Array.from(new Set(idList));
};

const getFilmData = () => ({
  id: filmIdCounter++,
  comments: getCommentId(),
  filmInfo: {
    title: TEMP_TITLES[getRandomInteger(0, TEMP_TITLES.length - 1)],
    alternativeTitle: translitLatinToCyrillic(TEMP_TITLES[getRandomInteger(0, TEMP_TITLES.length - 1)]),
    totalRating: getRandomFloat(TEMP_RATING.MIN, TEMP_RATING.MAX, 1),
    poster: `images/posters/${TEMP_POSTERS[getRandomInteger(0, TEMP_POSTERS.length - 1)]}`,
    ageRating: `${getRandomInteger(TEMP_AGE.MIN, TEMP_AGE.MAX)}+`,
    director: `${TEMP_FILM_STUFF[getRandomInteger(TEMP_FILM_STUFF_AMOUNT.MIN, TEMP_FILM_STUFF.length - 1)]}`,
    writers: getSmthList(TEMP_FILM_STUFF),
    actors: getSmthList(TEMP_FILM_STUFF),
    release: {
      date:`${getRandomInteger(TEMP_DATES.Y_MIN, TEMP_DATES.Y_MAX)}-${getRandomInteger(TEMP_DATES.M_MIN, TEMP_DATES.M_MAX)}-${getRandomInteger(TEMP_DATES.D_MIN, TEMP_DATES.D_MAX)}`,
      releaseCountry: `${TEMP_RELEASE_COUNTRIES[getRandomInteger(0, TEMP_RELEASE_COUNTRIES.length - 1)]}`
    },
    runtime: getRandomInteger(TEMP_DURATION.MIN, TEMP_DURATION.MAX),
    genre: getSmthList(TEMP_GENRES),
    description: TEMP_DESCRIPTION.slice(0, getRandomInteger(0, TEMP_DESCRIPTION.length))
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(TEMP_BOOLEAN.FALSE,TEMP_BOOLEAN.TRUE)),
    alreadyWatched: Boolean(getRandomInteger(TEMP_BOOLEAN.FALSE,TEMP_BOOLEAN.TRUE)),
    watchingDate: `${getRandomInteger(TEMP_DATES.Y_MIN, TEMP_DATES.Y_MAX)} - ${getRandomInteger(TEMP_DATES.M_MIN, TEMP_DATES.M_MAX)} - ${getRandomInteger(TEMP_DATES.D_MIN, TEMP_DATES.D_MAX)}`,
    favorite: Boolean(getRandomInteger(TEMP_BOOLEAN.FALSE,TEMP_BOOLEAN.TRUE))
  }
});

const getComment = () => ({
  id: commentIdCounter++,
  author: `${TEMP_FILM_STUFF[getRandomInteger(0, TEMP_FILM_STUFF.length - 1)]}`,
  comment: TEMP_COMMENTS[getRandomInteger(0, TEMP_COMMENTS.length - 1)],
  date: `${getRandomInteger(TEMP_DATES.Y_MIN, TEMP_DATES.Y_MAX)}-${getRandomInteger(TEMP_DATES.M_MIN, TEMP_DATES.M_MAX)}-${getRandomInteger(TEMP_DATES.D_MIN, TEMP_DATES.D_MAX)}`,
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
});

export {
  getFilmData,
  getComment,
};
