const isUndefined = (val) => {
  return typeof val === 'undefined';
};

const isNull = (val) => {
  return val === null;
};

const isMissing = (val) => {
  return isUndefined(val) || isNull(val);
};

const isPresent = (val) => {
  return !isMissing(val);
};

const isBoolean = (val) => {
  return isPresent(val) && typeof val === 'boolean';
};

const isObject = (val) => {
  return isPresent(val) && typeof val === 'object' && !isArray(val);
};

const isArray = (val) => {
  return isPresent(val) && Array.isArray(val);
};

const isString = (val) => {
  return isPresent(val) && typeof val === 'string';
};

const isNumber = (val) => {
  return isPresent(val) && typeof val === 'number' && !Number.isNaN(val);
};

const isNumeric = (val) => {
  const numericPattern = /^\d+$/;
  return isPresent(val) && numericPattern.test(val);
};

const isFunction = (val) => {
  return isPresent(val) && typeof val === 'function';
};

const isInteger = (val) => {
  return isNumber(val) && Number.isInteger(val);
};

const isEqual = (val1, val2) => {
  return val1 === val2;
};

const isEmptyString = (val) => {
  return isString(val) && isEqual(val.length, 0);
};

const isNonEmptyString = (val) => {
  return isString(val) && val.length > 0;
};

const isEmptyObject = (val) => {
  if (isObject(val)) {
    const propertyNames = Object.getOwnPropertyNames(val);
    const symbolKeys = Object.getOwnPropertySymbols(val);

    const keysLength = propertyNames.length + symbolKeys.length;

    return isEqual(keysLength, 0);
  }
  return false;
};

const isEmptyArray = (val) => {
  return isArray(val) && isEqual(val.length, 0);
};

const isNonEmptyArray = (val) => {
  return isArray(val) && val.length > 0;
};

const hasOneItem = (val) => {
  return isArray(val) && val.length === 1;
};

const hasMultipleItems = (val) => {
  return isArray(val) && val.length > 1;
};

const isTrue = (val) => {
  return isBoolean(val) && val === true;
};

const isFalse = (val) => {
  return isBoolean(val) && val === false;
};

const isUnsignedInteger = (val) => {
  return isInteger(val) && val >= 0;
};

const isPositiveInteger = (val) => {
  return isInteger(val) && val > 0;
};

const isPositiveNumber = (val) => {
  return isNumber(val) && val > 0;
};

const isNegativeNumber = (val) => {
  return isNumber(val) && val < 0;
};

const isZero = (val) => {
  return isNumber(val) && val === 0;
};

const isConstructible = (val) => {
  if (isFunction(val)) return false;

  const str = Function.prototype.toString.call(val);

  if (str.startsWith("class")) return true;
  if (str.includes("function bound")) return true;
  if (val.prototype) return true;

  try {
    Reflect.construct(String, [], val);
    return true;
  } catch {
    return false;
  }
};

const hasExactKeys = (val, keys) => {
  if (isObject(val) && isArray(keys)) {
    const objKeys = Object.keys(val);
    const propertiesInKeys = keys.filter(key => key in val);
    return isEqual(propertiesInKeys.length, objKeys.length) && isEqual(objKeys.length, keys.length);
  }
  return false;
};

const haveKeys = (val, keys) => {
  return isNonEmptyArray(val) && isNonEmptyArray(keys) && val.every(obj =>
    keys.every(key => Object.prototype.hasOwnProperty.call(obj, key))
  );
};

module.exports = {
  isUndefined,
  isNull,
  isMissing,
  isPresent,
  isBoolean,
  isObject,
  isArray,
  isString,
  isNumber,
  isNumeric,
  isFunction,
  isInteger,
  isEqual,
  isEmptyString,
  isNonEmptyString,
  isEmptyObject,
  isEmptyArray,
  isNonEmptyArray,
  hasOneItem,
  hasMultipleItems,
  isTrue,
  isFalse,
  isUnsignedInteger,
  isPositiveInteger,
  isPositiveNumber,
  isNegativeNumber,
  isZero,
  isConstructible,
  hasExactKeys,
  haveKeys
};
