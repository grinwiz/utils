const { isMissing, isObject } = require('../conditionals');
const dateTimeHelpers = require('./datetime');
const stringHelpers = require('./string');
const jsonHelpers = require('./json');
const arrayList = require('./arrayList');

const generateRandomNumber = (length) => {
  const maxLength = 10 ** length;
  const randomNumber = Math.floor(Math.random() * maxLength);

  return randomNumber.toString().padEnd(length, '0');
};

const cleanUpUnicodeCharacters = (input) => {
  if (!input) {
    return input;
  }

  const trimInput = input.trim();

  const noUnicodeChar = trimInput.replace(/[^\x20-\x7F]/g, '');

  return noUnicodeChar;
};

const removeObjectMissingProperties = (fields = {}) => {
  return Object.keys(fields)
    .filter(key => !isMissing(fields[key]))
    .reduce((obj, key) => {
      if (isObject(fields[key])) {
        const result = removeObjectMissingProperties(fields[key]);
        return Object.assign({}, obj, { [key]: result });
      }

      return Object.assign({}, obj, { [key]: fields[key] });
    }, {});
};

module.exports = {
  generateRandomNumber,
  cleanUpUnicodeCharacters,
  removeObjectMissingProperties,
  ...dateTimeHelpers,
  ...stringHelpers,
  ...jsonHelpers,
  arrayList
};