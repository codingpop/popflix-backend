/**
 * @classdesc AppController
 */
class AppController {
  /**
   * @constructor
   *
   * @param {Object} dependencies - Dependencies
   */
  constructor(dependencies) {
    this.dependencies = dependencies;
  }

  /**
   * @desc Create a new database entry
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  create = async (req, res, next) => {
    try {
      const newEntry = await this.dependencies.model.create(req.body);

      res.status(200).json({ data: newEntry });
    } catch (err) {
      next(err);
    }
  }
}

export default AppController;
