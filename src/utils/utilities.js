const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (scaleLow, scaleHigh, digitsAfterDecimalPoint = 0) => {
  if (digitsAfterDecimalPoint === 0) {
    return getRandomInteger(scaleLow,scaleHigh);
  } else if (digitsAfterDecimalPoint < 0) {
    throw new RangeError ('Количество знаков после запятой не может быть меньше 0');
  }
  return Number((Math.random() * (scaleHigh - scaleLow) + scaleLow).toFixed(digitsAfterDecimalPoint));
};

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

const translitLatinToCyrillic = (word) => {
  const translitMap = {
    'a': 'а',
    'b': 'б',
    'c': 'ц',
    'ch': 'ч',
    'd': 'д',
    'e': 'е',
    'eh': 'э',
    'f': 'ф',
    'g': 'г',
    'h': 'х',
    'i': 'и',
    'ia': 'я',
    'ie': 'е',
    'iu': 'ю',
    'iy': 'ий',
    'j': 'й',
    'ja': 'я',
    'jo': 'ё',
    'ju': 'ю',
    'k': 'к',
    'kh': 'х',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'r': 'р',
    's': 'с',
    'sch': 'щ',
    'sh': 'ш',
    't': 'т',
    'ts': 'ц',
    'u': 'у',
    'v': 'в',
    'y': 'ы',
    'ya': 'я',
    'yo': 'ё',
    'z': 'з',
    'zh': 'ж',
  };

  return word.toLowerCase()
    .split('')
    .map((l, k, a) => {
      if ((l === 'c' && a[k + 1] === 'h' && k - 1 >= 0 && a[k - 1] !== 's')
        || (l === 'e' && a[k + 1] === 'h')
        || (l === 'i' && a[k + 1] === 'a')
        || (l === 'i' && a[k + 1] === 'e')
        || (l === 'i' && a[k + 1] === 'u')
        || (l === 'i' && a[k + 1] === 'y')
        || (l === 'j' && a[k + 1] === 'a')
        || (l === 'j' && a[k + 1] === 'o')
        || (l === 'j' && a[k + 1] === 'u')
        || (l === 'k' && a[k + 1] === 'h')
        || (l === 's' && a[k + 1] === 'h')
        || (l === 't' && a[k + 1] === 's')
        || (l === 'y' && a[k + 1] === 'a')
        || (l === 'y' && a[k + 1] === 'o')
        || (l === 'z' && a[k + 1] === 'h')) {
        return translitMap[l + a[k + 1]];
      } else if (l === 's' && a[k + 1] === 'c' && a[k + 2] === 'h') {
        return translitMap[l + a[k + 1] + a[k + 2]];
      } else if ((l === 'h' && k - 1 >= 0 && a[k - 1] === 'c')
        || (l === 'h' && k - 1 !== 0 && a[k - 1] === 'e')
        || (l === 'a' && k - 1 !== 0 && a[k - 1] === 'i')
        || (l === 'e' && k - 1 !== 0 && a[k - 1] === 'i')
        || (l === 'y' && k - 1 !== 0 && a[k - 1] === 'i')
        || (l === 'a' && k - 1 >= 0 && a[k - 1] === 'j')
        || (l === 'o' && k - 1 >= 0 && a[k - 1] === 'j')
        || (l === 'u' && k - 1 >= 0 && a[k - 1] === 'j')
        || (l === 'h' && k - 1 >= 0 && a[k - 1] === 'k')
        || (l === 'c' && k - 1 >= 0 && a[k - 1] === 's' && k + 1 >= 0 && a[k + 1] === 'h')
        || (l === 'h' && k - 1 >= 0 && a[k - 1] === 's')
        || (l === 's' && k - 1 >= 0 && a[k - 1] === 't')
        || (l === 'a' && k - 1 >= 0 && a[k - 1] === 'y')
        || (l === 'o' && k - 1 >= 0 && a[k - 1] === 'y')
        || (l === 'h' && k - 1 >= 0 && a[k - 1] === 'z')) {
        return '';
      }

      return translitMap[l];
    })
    .join('');
};

export {
  getRandomInteger,
  getRandomFloat,
  updateFilm,
  translitLatinToCyrillic,
};
