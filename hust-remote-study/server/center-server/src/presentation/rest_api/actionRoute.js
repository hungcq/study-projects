const express = require('express');
const actionService = require('../../core/action/actionService');

const router = express.Router();

router.get('/', (req, res) => {
  const { lectureId } = req.query;
  const filter = { lectureId };
  actionService.getActions(filter, actions => {
    if (!actions) res.status(404).json({ error: 'Cannot find actions' });
    else res.json(actions);
  });
});

module.exports = { router };
