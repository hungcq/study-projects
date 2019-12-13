const { gcs } = require('./config/connection');

const SLIDES_BUCKET_NAME = 'lecture-slides';

const storage = gcs.bucket(SLIDES_BUCKET_NAME);

const getPublicUrl = filename => `https://storage.googleapis.com/${SLIDES_BUCKET_NAME}/${filename}`;

module.exports = {
  storage,
  SLIDES_BUCKET_NAME,
  getPublicUrl,
};
