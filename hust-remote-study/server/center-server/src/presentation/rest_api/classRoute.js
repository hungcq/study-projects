const express = require('express');
const classService = require('../../core/class/classService');

const router = express.Router();

router.get('/:id', (req, res) => {
  classService.getClassesById(req.params.id, result => {
    if (!result) res.status(404).json({ error: 'Cannot find class' });
    else res.json(result);
  });
});

router.get('/', (req, res) => {
  const { teacherId, studentId } = req.query;
  if (!teacherId && !studentId) {
    res.status(404).json({ error: 'Please provide teacherId or studentId' });
    return;
  }
  if (teacherId) {
    classService.getClassesByTeacher(teacherId, result => {
      if (!result) res.status(404).json({ error: 'Cannot find classes' });
      else res.json(result);
    });
    return;
  }
  if (studentId) {
    classService.getClassesByStudent(studentId, result => {
      if (!result) res.status(404).json({ error: 'Cannot find classes' });
      else res.json(result);
    });
  }
});

module.exports = { router };
