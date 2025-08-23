const conditionals = require('../conditionals');

const noop = () => { };

const makeThrowable = (condition = noop, expectedType) => (val, errMessage, Err = TypeError) => {
  if (!conditionals.isNonEmptyString(expectedType)) {
    throw new TypeError('"expectedType" has to be a non-empty string');
  }

  const valid = condition(val);
  const errorMessage = conditionals.isNonEmptyString(errMessage)
    ? errMessage
    : `Error – expected "${expectedType}", instead got "${val}: ${typeof val}"`;

  if (conditionals.isTrue(valid)) {
    return undefined;
  }
  throw new Err(errorMessage);
};

const emptyObject = (obj, errMessage, Err = TypeError) => {
  throwIf.notObject(obj);

  if (conditionals.isEmptyObject(obj)) {
    const errorMessage = conditionals.isNonEmptyString(errMessage)
      ? errMessage
      : `Error – object is empty`;

    throw new Err(errorMessage);
  }
};

const keysMissing = (obj, keys, errMessage, Err = TypeError) => {
  throwIf.notObject(obj);
  throwIf.notArray(keys);

  const keyMissing = key => !(key in obj);
  const missingKeys = keys.filter(keyMissing);

  if (conditionals.isNonEmptyArray(missingKeys)) {
    const errorMessage = conditionals.isNonEmptyString(errMessage)
      ? `${errMessage}; Keys missing: "${missingKeys}"`
      : `Error – keys "${missingKeys}" are missing in object provided`;

    throw new Err(errorMessage);
  }
};

const throwIf = Object.freeze({
  missing: makeThrowable(conditionals.isPresent, 'Something'),
  notBoolean: makeThrowable(conditionals.isBoolean, 'Boolean'),
  notObject: makeThrowable(conditionals.isObject, 'Object'),
  notArray: makeThrowable(conditionals.isArray, 'Array'),
  notString: makeThrowable(conditionals.isString, 'String'),
  notNumber: makeThrowable(conditionals.isNumber, 'Number'),
  notNumeric: makeThrowable(conditionals.isNumeric, 'Numeric'),
  notInteger: makeThrowable(conditionals.isInteger, 'Integer'),
  notFunction: makeThrowable(conditionals.isFunction, 'Function'),
  emptyString: makeThrowable(conditionals.isNonEmptyString, 'Non-empty String'),
  emptyObject,
  emptyArray: makeThrowable(conditionals.isNonEmptyArray, 'Non-empty Array'),
  notUnsignedInteger: makeThrowable(conditionals.isUnsignedInteger, 'Unsigned Integer'),
  notPositiveInteger: makeThrowable(conditionals.isPositiveInteger, 'Positive Integer'),
  notPositiveNumber: makeThrowable(conditionals.isPositiveNumber, 'Positive Number'),
  notConstructible: makeThrowable(conditionals.isConstructible, 'Constructible'),
  keysMissing
});

module.exports = { throwIf };