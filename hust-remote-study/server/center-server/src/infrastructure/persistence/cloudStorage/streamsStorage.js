const { gcs } = require('./config/connection');

const STREAMS_BUCKET_NAME = 'lecture-streams';

const storage = gcs.bucket(STREAMS_BUCKET_NAME);

const getPublicUrl = filename => `https://storage.googleapis.com/${STREAMS_BUCKET_NAME}/${filename}`;

module.exports = {
  storage,
  STREAMS_BUCKET_NAME,
  getPublicUrl,
};
