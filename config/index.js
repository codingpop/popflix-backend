import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
  jwtExpiry: process.env.JWT_EXPIRY,
  jwtSecret: process.env.JWT_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  environment: process.env.NODE_ENV,
  testDbUrl: process.env.DB_URL_TEST,
};


cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

if (config.environment === 'test') {
  mongoose.connect(config.testDbUrl);
} else {
  mongoose.connect(config.dbURL);
}

export default config;
