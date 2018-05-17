/**
 * @classdesc AuthController
 */
class AuthController {
  /**
   * @constructor
   *
   * @param {Object} dependencies - Dependencies
   */
  constructor(dependencies) {
    this.dependencies = dependencies;
  }

  /**
   * @desc Register a new user
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  register = async (req, res, next) => {
    try {
      const newUser = await this.dependencies.model.create(req.body);
      const user = this.dependencies
        .excludeProperties(newUser.toObject(), ['password']);

      res.status(201).json({
        user,
        token: this.dependencies.createToken(req, user),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @desc Log in user
   *
   * @callback function
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {function} next - Pass execution to the next middleware
   *
   * @returns {void}
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existingUser = await this.dependencies.model.findOne({ email });

      if (existingUser) {
        const passwordMatches = await this.dependencies.bcrypt
          .compare(password, existingUser.password);

        if (passwordMatches) {
          const user = this.dependencies
            .excludeProperties(existingUser.toObject(), ['password']);

          res.status(200).json({
            user,
            token: this.dependencies.createToken(req, user),
          });
        } else {
          next(this.dependencies
            .composeError('AuthenticationError', 'Incorrect credentials'));
        }
      } else {
        next(this
          .dependencies
          .composeError('NotFoundError', 'Email is not registered'));
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
