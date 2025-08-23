const { isUndefined, isTrue, isEqual, isNonEmptyString } = require('../../conditionals');
const { throwIf } = require('../../throwIfs');

const generateRandomString = (length) => {
  throwIf.notPositiveInteger(length, 'length must be a positive integer');

  const characterPool = 'abcdefghijklmnopqrstuvwxyz0123456789';

  if (characterPool.length === 0) {
    throwIf.emptyString(characterPool);
  }

  let str = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    str += characterPool[randomIndex];
  }

  return str;
};

const generatePassword = (opts) => {
  throwIf.missing(opts, 'opts is required');
  throwIf.missing(opts.length, 'length opts is required');
  throwIf.notPositiveInteger(opts.length, 'length opts must be a positive integer');

  let { length, lowerCase, upperCase, numeric, symbol } = opts;

  if (isUndefined(lowerCase)) lowerCase = true;
  else throwIf.notBoolean(lowerCase, 'lowerCase must be a boolean');
  if (isUndefined(upperCase)) upperCase = true;
  else throwIf.notBoolean(upperCase, 'upperCase must be a boolean');
  if (isUndefined(numeric)) numeric = true;
  else throwIf.notBoolean(numeric, 'numeric must be a boolean');
  if (isUndefined(symbol)) symbol = false;
  else throwIf.notBoolean(symbol, 'symbol must be a boolean');

  const lowerCaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const number = '0123456789';
  const symbols = '$%^&*-_';

  let characterPool = '';

  if (lowerCase) characterPool += lowerCaseAlphabet;
  if (upperCase) characterPool += upperCaseAlphabet;
  if (numeric) characterPool += number;
  if (symbol) characterPool += symbols;

  if (characterPool.length === 0) {
    throwIf.emptyString(characterPool);
  }

  let str = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    str += characterPool[randomIndex];
  }

  return str;
};

const createSlug = (text) => {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  const cleanSlug = slug.replace(/[^a-zA-Z0-9-]/g, "");
  return cleanSlug + `-${Math.random().toString(36).substring(2, 10)}`;
};

const transformSnakeToCamel = (snakeStr) => {
  throwIf.emptyString(snakeStr);

  return snakeStr
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};

const makeIdentifier = (prefix = '') => {
  const date = new Date().valueOf().toString(26);
  const time = date.slice(date.length - 8);
  const result = `${prefix}${time.toUpperCase()}`;
  return result;
};

const toTitleCase = (str) => {
  throwIf.emptyString(str);

  return str
    .split(' ')
    .map(word => {
      if (word === word.toUpperCase()) return word;

      if (/^[A-Z][^a-zA-Z]*[a-zA-Z]*$/.test(word)) return word;

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

function getCurrencySymbol(currency, locale = 'en-US') {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(0);

  const symbol = formatted.replace(/[0-9\s,.]/g, '');
  return symbol;
}

function formatCurrency(amount, opts = {}) {
  throwIf.missing(amount);
  throwIf.notNumber(amount);
  throwIf.notObject(opts);

  const {
    locale = 'en-US',
    currency = 'USD',
    symbol = false,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = opts;

  let currencySymbol = getCurrencySymbol(currency);
  if (isEqual(locale, 'id-ID') && isEqual(currency, 'IDR')) {
    currencySymbol = 'Rp';
  } else if (isEqual(locale, 'en-SG') && isEqual(currency, 'SGD')) {
    currencySymbol = '$';
  }

  if (isTrue(symbol)) {
    const formatter = new Intl.NumberFormat(locale, {
      style: isTrue(symbol) ? 'currency' : 'decimal',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    });

    return formatter.format(Number(amount));
  }

  const formattedNumber = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Number(amount));

  return `${currencySymbol}${formattedNumber}`;
};

module.exports = {
  generateRandomString,
  generatePassword,
  createSlug,
  transformSnakeToCamel,
  makeIdentifier,
  toTitleCase,
  formatCurrency
}