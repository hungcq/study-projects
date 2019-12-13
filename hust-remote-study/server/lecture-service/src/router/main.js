const express = require('express');
const lectureService = require('../service/lectureService');
const slideUpload = require('../helpers/slideUpload');
const Multer = require('multer');

const router = express.Router();
const multer = Multer();

router.get('/:id', (req, res) => {
  lectureService.fetchOne(req.params.id, lecture => res.json(lecture));
});

router.put('/:id', multer.single('slide'), slideUpload.uploadToGcs, (req, res) => {
  lectureService.updateOne(req.params.id, req, lecture => res.json(lecture));
});

router.delete('/:id', (req, res) => {
  lectureService.deleteOne(req.params.id, status => res.json(status));
});

router.get('/', (req, res) => {
  const { limit, page } = req.query;
  const filter = {
    limit: limit || 20,
    page: page || 1,
  };
  lectureService.fetch(filter, lectures => res.json(lectures));
});

router.post('/', multer.single('slide'), slideUpload.uploadToGcs, (req, res) => {
  lectureService.create(req, lecture => res.json(lecture));
});

module.exports = {
  mainApiRouter: router,
};
