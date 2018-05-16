import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter first name'],
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'Please enter last name'],
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
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must contain, at least, 8 characters, and include at least, 1 lowercase letter, 1 uppercase letter, and 1 special character'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter phone number'],
    unique: true,
  },
});

userSchema.pre('save', async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model('User', userSchema);
