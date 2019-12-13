const express = require('express');
const Multer = require('multer');
const lectureService = require('../../core/lecture/lectureService');

const {
  startLecture,
  stopLecture,
} = require('../../core/liveLecture/liveLecture');

const router = express.Router();
const multer = Multer();

router.get('/:id/streams', (req, res) => {
  lectureService.getStreamsById(req.params.id, (lecture) => {
    if (!lecture) res.status(200).json({ error: 'The stream are being upload and not available now. This can take awhile after the class finished' });
    else res.json(lecture);
  });
});

router.get('/:id', (req, res) => {
  lectureService.getOneLectureById(req.params.id, (lecture) => {
    if (!lecture) res.status(404).json({ error: 'Cannot find lecture' });
    else res.json(lecture);
  });
});

router.get('/:id/start', (req, res) => {
  const result = startLecture(req.params.id, '', true);
  if (result.error) {
    res.json({result: result.error})
  } else {
    res.json({ result: 'Success' });
  }
});

router.get('/:id/stop', (req, res) => {
  stopLecture(req.params.id);
  res.json({result: 'Success'});
});

router.get('/:id', (req, res) => {
  lectureService.getOneLectureById(req.params.id, (lecture) => {
    if (!lecture) res.status(404).json({ error: 'Cannot find lecture' });
    else res.json(lecture);
  });
});

router.put('/:id', multer.single('slide'), lectureService.uploadSlide, (req, res) => {
  lectureService.updateLecture(req.params.id, req, (lecture) => {
    if (!lecture) res.status(503).json({ error: 'Cannot update lecture' });
    else res.json(lecture);
  });
});

router.put('/:id/addSlide', multer.single('slide'), lectureService.uploadSlide, (req, res) => {
  lectureService.addSlide(req.params.id, req, (lecture) => {
    if (!lecture) res.status(503).json({ error: 'Cannot update lecture' });
    else res.json(lecture);
  });
});

router.delete('/:id', (req, res) => {
  lectureService.deleteOneLectureById(req.params.id, succeeded => res.json({ succeeded }));
});

router.get('/', (req, res) => {
  const { limit, page } = req.query;
  const filter = { limit: limit || 20, page: page || 1 };
  lectureService.getLectures(filter, (lectures) => {
    if (!lectures) res.status(404).json({ error: 'Cannot find lectures' });
    else res.json(lectures);
  });
});

router.post('/', multer.single('slide'), lectureService.uploadSlide, (req, res) => {
  lectureService.createLecture(req, (lecture) => {
    if (!lecture) res.status(503).json({ error: 'Cannot create lecture' });
    else res.json(lecture);
  });
});

module.exports = { router };
