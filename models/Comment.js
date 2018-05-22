import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
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
  comment: {
    type: String,
    minlength: 20,
    maxlength: 200,
  },
});

export default mongoose.model('Comment', commentSchema);
