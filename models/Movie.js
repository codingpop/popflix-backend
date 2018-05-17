import mongoose, { Schema } from 'mongoose';

const movieSchema = Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80,
  },
  synopsis: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 200,
  },
  poster: {
    type: String,
    required: true,
  },
  views: Number,
  thumbnail: String,
});

export default mongoose.model('Movie', movieSchema);
