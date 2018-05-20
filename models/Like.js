import mongoose, { Schema } from 'mongoose';

const likeSchema = Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Like', likeSchema);
