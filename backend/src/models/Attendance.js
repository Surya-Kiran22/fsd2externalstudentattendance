import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true }
  },
  { timestamps: true }
);

AttendanceSchema.index({ rollNo: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', AttendanceSchema);
