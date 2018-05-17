/**
 * @desc Compose error message
 *
 * @param {string} name - Error name
 * @param {string} message - Error message
 */
const composeError = (name, message) => {
  const err = new Error();
  err.name = name;
  err.message = message;

  return err;
};

export default composeError;
