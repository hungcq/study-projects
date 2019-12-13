const express = require('express');
const memberService = require('../service/userService');

const router = express.Router();

router.post('/lectures/:lectureId/members', (req, res) => {
  memberService.join(req.params.lectureId, req.query.userId, member => res.json(member));
});
router.get('/lectures/:lectureId/members', (req, res) => {
  memberService.join(req.params.lectureId, req.query.userId, member => res.json(member));
});

module.exports = {
  mainApiRouter: router,
};
