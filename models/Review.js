import mongoose, { Schema } from 'mongoose';

const reviewSchema = Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    minlength: 20,
    maxlength: 200,
  },
});

export default mongoose.model('Review', reviewSchema);
