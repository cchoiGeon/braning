// models/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../src/util/logging';
dotenv.config();
// MongoDB 연결 설정
const dbUri = process.env.DB_URL;
export const db = mongoose.connect(dbUri)
    .then(() => logger.log('MongoDB connected'))
    .catch((error) => logger.warn('MongoDB connection error:', error));