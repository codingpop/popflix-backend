import AppController from './AppController';

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

      const data = await this.dependencies.model.update(
        { movieId },
        { ...req.body, movieId, userId: _id },
        { upsert: true, setDefaultsOnInsert: true },
      );

      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default LikeController;
