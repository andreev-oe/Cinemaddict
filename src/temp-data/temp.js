import {
  EMOTIONS,
  TEMP_DESCRIPTION,
  TEMP_TITLES,
  TEMP_POSTERS,
  TEMP_FILM_STUFF,
  TEMP_RELEASE_COUNTRIES,
  TEMP_GENRES,
} from '../constants.js';
import {
  getRandomInteger,
  getRandomFloat,
  translitLatinToCyrillic,
} from '../utilities.js';

let filmIdCounter = 0;

const getFilmData = () => ({
  id: filmIdCounter++,
  comments: [
    123, 456, 789
  ],
  filmInfo: {
    title: TEMP_TITLES[getRandomInteger(0, TEMP_TITLES.length - 1)],
    alternativeTitle: translitLatinToCyrillic(TEMP_TITLES[getRandomInteger(0, TEMP_TITLES.length - 1)]),
    totalRating: getRandomFloat(0, 10, 1),
    poster: `images/posters/${TEMP_POSTERS[getRandomInteger(0, TEMP_POSTERS.length - 1)]}`,
    ageRating: getRandomInteger(0, 5),
    director: `${TEMP_FILM_STUFF[getRandomInteger(0, TEMP_FILM_STUFF.length - 1)]}`,
    writers: [
      `${TEMP_FILM_STUFF[getRandomInteger(0, TEMP_FILM_STUFF.length - 1)]}`
    ],
    actors: [
      `${TEMP_FILM_STUFF[getRandomInteger(0, TEMP_FILM_STUFF.length - 1)]}`
    ],
    release: {
      date: getRandomInteger(1991, 2020),
      releaseCountry: `${TEMP_RELEASE_COUNTRIES[getRandomInteger(0, TEMP_RELEASE_COUNTRIES.length - 1)]}`
    },
    runtime: getRandomInteger(0, 240),
    genre: [
      `${TEMP_GENRES[getRandomInteger(0, TEMP_GENRES.length - 1)]}`
    ],
    description: TEMP_DESCRIPTION.slice(0, getRandomInteger(0, TEMP_DESCRIPTION.length))
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});

const getComment = () => ({
  id: '42',
  author: `${TEMP_FILM_STUFF[getRandomInteger(0, TEMP_FILM_STUFF.length - 1)]}`,
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: '2019-05-11T16:12:32.554Z',
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length)],
});

export {
  getFilmData,
  getComment,
};
