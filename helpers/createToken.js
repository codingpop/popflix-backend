import jwt from 'jsonwebtoken';

import config from '../config';

/**
 * Generate JWT for authentication and sets user in the request object
 *
 * @param {Object} req - Request object
 * @param {Object} payload - JWT Payload
 *
 * @returns {string} - JSON web token
 */
const createToken = (req, payload) => jwt.sign(
  payload,
  config.jwtSecret,
  { expiresIn: config.jwtExpiry },
);

export default createToken;
