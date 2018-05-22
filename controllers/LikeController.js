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


  likeMovie = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      const { isExist, model, composeError } = this.dependencies;
      const movieExists = await isExist(movieId, Movie);

      if (movieExists) {
        const data = await model.update(
          { userId: _id, movieId },
          { ...req.body, movieId, userId: _id },
          { upsert: true, setDefaultsOnInsert: true },
        );

        if (data.upserted) {
          res.status(201).json({
            data: {
              movieId,
              ...req.body,
            },
          });
        } else {
          res.status(200).json({
            data: {
              movieId,
              ...req.body,
            },
          });
        }
      } else {
        throw composeError('BadRequest', 'Movie does not exist');
      }
    } catch (err) {
      next(err);
    }
  }
}

export default LikeController;
