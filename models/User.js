import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  avatar: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model('User', userSchema);
