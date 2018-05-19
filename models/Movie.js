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
  views: {
    type: Number,
    default: 0,
  },
  secureUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Movie', movieSchema);
