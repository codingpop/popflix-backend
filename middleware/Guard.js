import jwt from 'jsonwebtoken';

import User from '../models/User';
import config from '../config';
import composeError from '../helpers/composeError';

/**
 * @classdesc Guard
 */
class Guard {
  /**
   * @desc Auth guard
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  static async auth(req, res, next) {
    try {
      const { token } = req.headers;

      if (token) {
        const payload = await jwt.verify(token, config.jwtSecret);
        const user = await User.findById(payload._id);

        if (user) {
          req.user = user;

          next();
        } else {
          throw composeError('AuthorizationError', 'Invalid token');
        }
      } else {
        throw composeError('AuthorizationError', 'Token not found');
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @desc Admin guard
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  static admin(req, res, next) {
    if (req.user.role !== 'admin') {
      next(composeError('AuthorizationError', 'Only admin allowed'));
    } else {
      next();
    }
  }
}

export default Guard;
