import { Router } from 'express';
import { celebrate, errors } from 'celebrate';

import AuthController from '../controllers/AuthController';
import User from '../models/User';
import excludeProperties from '../helpers/excludeProperties';
import createToken from '../helpers/createToken';
import composeError from '../helpers/composeError';
import { register, login } from '../utils/joiSchemas';
import { sendOne } from '../helpers/mailer';

const auth = Router();

const authController = new AuthController({
  model: User,
  excludeProperties,
  createToken,
  composeError,
  mailer: sendOne,
});

auth.post('/register', celebrate(register), authController.register);
auth.post('/login', celebrate(login), authController.login);

auth.use(errors);

export default auth;
