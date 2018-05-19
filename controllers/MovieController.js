import { fork } from 'child_process';
import path from 'path';

import AppController from './AppController';

/**
 * @classdesc MovieController
 */
class MovieController extends AppController {
  /**
   * @constructor
   *
   * @param {Object} dependencies - Dependencies
   */
  constructor(dependencies) {
    super(dependencies);

    this.dependencies = dependencies;
  }

  /**
   * @desc Upload a movie
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  uploadMovie = async (req, res, next) => {
    try {
      const movie = req.file;

      if (!movie) {
        throw this.dependencies
          .composeError('BadRequest', 'SNo movie uploaded');
      } else {
        const child = fork(path.join(
          __basedir,
          'processes/backgroundUploader.js',
        ));

        child.send({
          uploader: req.user.email,
          file: req.file,
          info: req.body,
        });

        res.status(202).json({
          message: 'Movie is being processed. You will be notified once processing is complete',
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default MovieController;
