import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { rollNo, name, date, status } = req.body;
    if (!rollNo || !name || !date || !status) return res.status(400).json({ message: 'Missing fields' });
    const doc = await Attendance.create({ rollNo, name, date, status });
    res.status(201).json(doc);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'Attendance already exists for this rollNo and date' });
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  const items = await Attendance.find().sort({ date: -1, rollNo: 1 });
  res.json(items);
});

router.get('/present', async (req, res) => {
  const items = await Attendance.find({ status: 'Present' }).sort({ date: -1, rollNo: 1 });
  res.json(items);
});

router.get('/by-date', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'date is required' });
  const items = await Attendance.find({ date }).sort({ rollNo: 1 });
  res.json(items);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { rollNo, name, date, status } = req.body;
  const updated = await Attendance.findByIdAndUpdate(
    id,
    { rollNo, name, date, status },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Attendance.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
