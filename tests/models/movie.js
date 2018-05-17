import test from 'ava';
import faker from 'faker';
import { Types } from 'mongoose';

import '../../config';
import Movie from '../../models/Movie';

const movie = {
  title: faker.lorem.words(),
  synopsis: faker.lorem.words().repeat(5),
  poster: faker.image.image(),
  thumbnail: faker.image.image(),
  views: faker.random.number(),
};

test('Movie model - creates a new movie', async (t) => {
  const newMovie = await Movie.create(movie);

  t.true(Types.ObjectId.isValid(newMovie._id));
  t.is(newMovie.title, movie.title);
  t.is(newMovie.synopsis, movie.synopsis);
  t.is(newMovie.poster, movie.poster);
  t.is(newMovie.views, movie.views);
  t.is(newMovie.thumbnail, movie.thumbnail);
});
