const conditionals = require('./conditionals');
const throwifs = require('./throwIfs');
const helpers = require('./helpers');

module.exports = {
  ...conditionals,
  ...throwifs,
  ...helpers
};