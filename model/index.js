// models/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// MongoDB 연결 설정
const dbUri = process.env.DB_URL;
export const db = mongoose.connect(dbUri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));