const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

function sanitize(body) {
  const data = { ...body };
  if (data.year !== undefined) data.year = Number(data.year);
  if (data.gpa !== undefined) data.gpa = data.gpa === '' || data.gpa === null ? null : Number(data.gpa);
  if (data.phone !== undefined) data.phone = data.phone === '' ? null : data.phone;
  return data;
}

// GET /api/students?search=&page=1&limit=10
router.get('/', async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { studentId: { $regex: search, $options: 'i' } },
            { department: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [students, total] = await Promise.all([
      Student.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Student.countDocuments(query),
    ]);

    res.json({ students, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:id
router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// POST /api/students
router.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(sanitize(req.body));
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

// PUT /api/students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, sanitize(req.body), {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
