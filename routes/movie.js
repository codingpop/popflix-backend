import { Router } from 'express';
import { celebrate, errors } from 'celebrate';

import { uploadMovie, likeMovie } from '../utils/joiSchemas';
import MovieController from '../controllers/MovieController';
import LikeController from '../controllers/LikeController';
import composeError from '../helpers/composeError';
import Guard from '../middleware/Guard';
import multer from '../middleware/multer';
import Movie from '../models/Movie';
import Like from '../models/Like';

const movie = Router();

const movieController = new MovieController({
  composeError,
  model: Movie,
});

const likeController = new LikeController({
  model: Like,
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

/**
 * Like routes
 */
movie.post(
  '/:movieId/likes',
  Guard.auth,
  celebrate(likeMovie),
  likeController.likeMovie,
);

movie.get(
  '/:movieId/likes',
  Guard.auth,
  likeController.fetchAll,
);

movie.use(errors);

export default movie;
