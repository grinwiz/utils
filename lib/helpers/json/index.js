const { isString, isNonEmptyArray, isObject, isNull, isEmptyObject } = require("../../conditionals");

const _applyMask = (value, rule) => {
  if (!isString(value)) return value;

  const {
    visible = 0,
    length,
    mask = "*"
  } = rule;

  if (visible === 0) {
    return length ? mask.repeat(length) : mask.repeat(value.length);
  }

  if (visible > 0) {
    const prefix = value.slice(0, visible);
    const maskPart = mask.repeat(length ?? (value.length - visible));
    return prefix + maskPart;
  }

  if (visible < 0) {
    const suffix = value.slice(value.length + visible);
    const maskPart = mask.repeat(length ?? (value.length - suffix.length));
    return maskPart + suffix;
  }

  return value;
};

const maskJson = (data, rules) => {
  if (isNonEmptyArray(data)) {
    return data.map(item => maskJson(item, rules));
  } else if (isObject(data) && !isNull(data) && !isEmptyObject(data)) {
    const masked = {};
    for (const key in data) {
      if (rules[key]) {
        masked[key] = _applyMask(data[key], rules[key]);
      } else {
        masked[key] = maskJson(data[key], rules);
      }
    }
    return masked;
  }
  return data;
};

module.exports = {
  maskJson
};