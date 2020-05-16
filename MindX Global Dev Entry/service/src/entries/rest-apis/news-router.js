const express = require('express');
const {logger} = require('../../utils');
const news = require('../../core/news');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    news.get(req.query, (result) => {
      res.json(result);
    });
  } catch (e) {
    logger.error(e);
  }
});

router.post('/', (req, res) => {
  try {
    news.create(req.body, (result) => {
      res.json(result);
    });
  } catch (e) {
    logger.error(e);
  }
});

router.post('/login', (req, res) => {
  try {
    news.login(req.body, (result) => {
      res.json(result);
    });
  } catch (e) {
    logger.error(e);
  }
});

module.exports = {router};