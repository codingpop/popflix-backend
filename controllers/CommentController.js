import AppController from './AppController';
import Movie from '../models/Movie';

/**
 * @class CommentController
 *
 * @extends {AppController}
 */
class CommentController extends AppController {
  /**
   * Create an instance of CommentController.
   *
   * @param {Object} dependencies - Dependencies
   *
   * @memberof CommentController
   */
  constructor(dependencies) {
    super(dependencies);

    this.dependencies = dependencies;
  }

  /**
   * Add comment to a movie
   *
   * @memberof CommentController
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  commentMovie = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      const { isExist, model, composeError } = this.dependencies;

      if (isExist(movieId, Movie)) {
        const data = await model.create({
          ...req.body,
          userId: _id,
          movieId,
        });

        res.status(201).json({
          data,
        });
      } else {
        throw composeError('BadRequest', 'Movie does not exist');
      }
    } catch (err) {
      next(err);
    }
  }
}

export default CommentController;
