import { Router } from 'express';
import { celebrate, errors } from 'celebrate';

import {
  uploadMovie,
  likeMovie,
  getOneMovie,
  postComment,
} from '../utils/joiSchemas';
import MovieController from '../controllers/MovieController';
import LikeController from '../controllers/LikeController';
import CommentController from '../controllers/CommentController';
import composeError from '../helpers/composeError';
import Guard from '../middleware/Guard';
import multer from '../middleware/multer';
import Movie from '../models/Movie';
import Like from '../models/Like';
import Comment from '../models/Comment';
import isExist from '../helpers/isExist';

const movie = Router();

const movieController = new MovieController({
  composeError,
  model: Movie,
});

const likeController = new LikeController({
  model: Like,
  isExist,
  composeError,
});

const commentController = new CommentController({
  model: Comment,
  isExist,
  composeError,
});

/**
 * Movie routes
 */
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
  celebrate(getOneMovie),
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
  celebrate(likeMovie),
  likeController.fetchAll,
);

movie.delete(
  '/:movieId/likes',
  Guard.auth,
  celebrate(likeMovie),
  likeController.unlikeMovie,
);

/**
 * Comment Routes
 */
movie.post(
  '/:movieId/comments',
  Guard.auth,
  celebrate(postComment),
  commentController.commentMovie,
);

movie.use(errors);

export default movie;
