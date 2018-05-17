import test from 'ava';
import faker from 'faker';
import { Types, mongo } from 'mongoose';

import '../../config';
import Review from '../../models/Review';

// console.log(Types.ObjectId(), 'sfsfdsfks');

const review = {
  movieId: new mongo.ObjectID(),
  userId: new mongo.ObjectID(),
  comment: faker.lorem.words().repeat(5),
  rating: 4,
};

test('Creates a new movie', async (t) => {
  const newReview = await Review.create(review);

  t.true(Types.ObjectId.isValid(newReview._id));
  t.is(newReview.movieId, review.movieId);
  t.is(newReview.synopsis, review.synopsis);
  t.is(newReview.comment, review.comment);
  t.is(newReview.thumbnail, review.thumbnail);
});
