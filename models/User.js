import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
});

userSchema.pre('save', async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model('User', userSchema);

