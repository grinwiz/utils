/**
 * Find the first object in an array where the given key matches the specified value.
 * @param {Array<Object>} arr - The array of objects to search.
 * @param {string} key - The key to match.
 * @param {*} value - The value to match against the key.
 * @returns {Object | undefined} The first matching object, or undefined if not found.
 */
const findByKey = (arr, key, value) =>
  arr.find(obj => obj[key] === value);

/**
 * Filter objects in an array where the given key matches the specified value.
 * @param {Array<Object>} arr - The array of objects to filter.
 * @param {string} key - The key to match.
 * @param {*} value - The value to match against the key.
 * @returns {Array<Object>} A new array containing matching objects.
 */
const filterByKey = (arr, key, value) =>
  arr.filter(obj => obj[key] === value);

/**
 * Group objects in an array by a specified key.
 * @param {Array<Object>} arr - The array of objects to group.
 * @param {string} key - The key to group by.
 * @returns {Record<string, Array<Object>>} An object where keys are group values and values are arrays of objects.
 */
const groupBy = (arr, key) =>
  arr.reduce((acc, obj) => {
    const group = obj[key];
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    return acc;
  }, {});

/**
 * Sort objects in an array by a specified key.
 * @param {Array<Object>} arr - The array of objects to sort.
 * @param {string} key - The key to sort by.
 * @param {"asc" | "desc"} [order="asc"] - Sort order (ascending or descending).
 * @returns {Array<Object>} A new sorted array.
 */
const sortByKey = (arr, key, order = "asc") =>
  [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });

/**
 * Remove duplicate objects from an array based on a specific key.
 * @param {Array<Object>} arr - The array of objects to deduplicate.
 * @param {string} key - The key to determine uniqueness.
 * @returns {Array<Object>} A new array with unique objects.
 */
const uniqueByKey = (arr, key) =>
  arr.filter((obj, index, self) =>
    index === self.findIndex(t => t[key] === obj[key])
  );

/**
 * Extract values of a specific key from an array of objects.
 * @param {Array<Object>} arr - The array of objects.
 * @param {string} key - The key to pluck values from.
 * @returns {Array<*>} An array of extracted values.
 */
const pluck = (arr, key) => arr.map(obj => obj[key]);

/**
 * Create an object indexed by the values of a specified key.
 * @param {Array<Object>} arr - The array of objects.
 * @param {string} key - The key to index by.
 * @returns {Record<string, Object>} An object indexed by key values.
 */
const indexBy = (arr, key) =>
  arr.reduce((acc, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {});

/**
 * Remove objects from an array where the given key matches the specified value.
 * @param {Array<Object>} arr - The array of objects.
 * @param {string} key - The key to match.
 * @param {*} value - The value to exclude.
 * @returns {Array<Object>} A new array excluding matching objects.
 */
const removeByKey = (arr, key, value) =>
  arr.filter(obj => obj[key] !== value);

module.exports = {
  findByKey,
  filterByKey,
  groupBy,
  sortByKey,
  uniqueByKey,
  pluck,
  indexBy,
  removeByKey
};
