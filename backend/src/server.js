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

app.use('/api/attendance', attendanceRouter);

async function start() {
  try {
    if (!MONGODB_URL) {
      console.error('Missing required env variable: MONGODB_URL');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URL, { dbName: 'FSD' });
    console.log('Successfully connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

start();
