/**
 * Exclude specified properties from an object
 *
 * @param {Object} object - Object with properties to be removed
 * @param {string[]} properties - Array of properties to be removed
 *
 * @returns {Object}
 */
const excludeProperties = (object, properties) => {
  const tempObj = { ...object };

  properties.forEach((property) => {
    delete tempObj[property];
  });

  return tempObj;
};

export default excludeProperties;
