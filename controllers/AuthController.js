import bcrypt from 'bcryptjs';

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
      const {
        model,
        excludeProperties,
        mailer,
        createToken,
      } = this.dependencies;

      const newUser = await model.create(req.body);
      const user = excludeProperties(newUser.toObject(), ['password']);

      mailer({
        to: user.email,
        subject: 'Welcome to PopFlix',
        html: '<strong>You are welcome</strong>',
      });

      res.status(201).json({
        user,
        token: createToken(req, user),
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
      const {
        model,
        excludeProperties,
        composeError,
        createToken,
      } = this.dependencies;

      const existingUser = await model.findOne({ email });

      if (existingUser) {
        const passwordMatches = await bcrypt
          .compare(password, existingUser.password);

        if (passwordMatches) {
          const user = excludeProperties(existingUser.toObject(), ['password']);

          res.status(200).json({
            user,
            token: createToken(req, user),
          });
        } else {
          throw composeError('AuthenticationError', 'Incorrect credentials');
        }
      } else {
        throw composeError('NotFoundError', 'Email is not registered');
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
