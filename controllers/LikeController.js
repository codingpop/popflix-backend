import AppController from './AppController';
import Movie from '../models/Movie';

/**
 * @classdesc LikeController
 */
class LikeController extends AppController {
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
   * @desc Like a movie
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  likeMovie = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      const { isExist, model, composeError } = this.dependencies;
      const movieExists = await isExist(movieId, Movie);

      if (movieExists) {
        const data = await model.create({ like: true, movieId, userId: _id });

        res.status(200).json({
          data,
        });
      } else {
        throw composeError('BadRequest', 'Movie does not exist');
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @desc Unlike a movie
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  unlikeMovie = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      const { model, composeError } = this.dependencies;

      const data = await model.findOneAndRemove({ movieId, userId: _id });

      if (data) {
        res.sendStatus(204);
      } else {
        throw composeError('ForbiddenError', 'This movie never existed, or you never liked it');
      }
    } catch (err) {
      next(err);
    }
  }
}

export default LikeController;
