import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import attendanceRouter from './routes/attendance.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL, { dbName: 'FSD' })
  
  
  .then(() => {
    app.listen(PORT, () => {});
    console.log('Sucessfully Connected to MongoDB Data base')
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

app.use('/api/attendance', attendanceRouter);
