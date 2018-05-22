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

movieSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'movieId',
});

movieSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'movieId',
});

movieSchema.pre('find', function () { // eslint-disable-line func-names
  this.populate('likes');
});

movieSchema.pre('findOne', function () { // eslint-disable-line func-names
  this.populate('comments');
});

movieSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Movie', movieSchema);
