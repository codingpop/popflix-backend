import test from 'ava';
import { Types } from 'mongoose';

import '../../config';
import Movie from '../../models/Movie';
import { movie } from '../testData';

test('Creates a new movie', async (t) => {
  const newMovie = await Movie.create(movie);

  t.true(Types.ObjectId.isValid(newMovie._id));
  t.is(newMovie.title, movie.title);
  t.is(newMovie.synopsis, movie.synopsis);
  t.is(newMovie.poster, movie.poster);
  t.is(newMovie.views, movie.views);
  t.is(newMovie.thumbnail, movie.thumbnail);
});
