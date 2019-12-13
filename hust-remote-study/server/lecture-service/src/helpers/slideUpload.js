'use strict';
const { slidesStorage } = require('../config/storageConnection');
const { BUCKET_NAME } = require('../config/constants');
const uuidv4 = require('uuid/v4');

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + BUCKET_NAME + '/' + filename;
}

let slideUpload = {};

slideUpload.uploadToGcs = (req, res, next) => {
  if(!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = uuidv4();
  const file = slidesStorage.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = slideUpload;