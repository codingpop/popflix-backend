import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
  jwtExpiry: process.env.JWT_EXPIRY,
  jwtSecret: process.env.JWT_SECRET,
};

mongoose.connect(config.dbURL);

export default config;
