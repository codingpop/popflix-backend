import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
};

mongoose.connect(config.dbURL);

export default config;
