import { Router } from 'express';
import { celebrate, errors } from 'celebrate';

import { uploadMovie } from '../utils/joiSchemas';
import MovieController from '../controllers/MovieController';
import composeError from '../helpers/composeError';
import Guard from '../middleware/Guard';
import multer from '../middleware/multer';
import Movie from '../models/Movie';

const movie = Router();

const movieController = new MovieController({
  composeError,
  model: Movie,
});

movie.post(
  '/',
  Guard.auth,
  Guard.admin,
  multer.single('movie'),
  celebrate(uploadMovie),
  movieController.uploadMovie,
);

movie.get(
  '/',
  Guard.auth,
  movieController.fetchAll,
);

movie.get(
  '/:id',
  Guard.auth,
  movieController.fetchOne,
);

movie.use(errors);

export default movie;
