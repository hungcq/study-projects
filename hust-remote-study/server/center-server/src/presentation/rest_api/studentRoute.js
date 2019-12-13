const express = require('express');
const studentService = require('../../core/student/studentService');

const router = express.Router();

router.get('/', (req, res) => {
  const { classId } = req.query;
  if (!classId) {
    res.status(404).json({ error: 'Please provide class id' });
    return;
  }
  studentService.getStudentsByClassId(classId, (result) => {
    if (!result) res.status(404).json({ error: 'Cannot find students' });
    else res.json(result);
  });
});

module.exports = { router };
