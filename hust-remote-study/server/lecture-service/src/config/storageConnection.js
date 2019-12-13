const { Storage } = require('@google-cloud/storage');
const { PROJECT_ID, BUCKET_NAME, KEY_FILE_NAME } = require('./constants');

const gcs = new Storage({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_NAME
});

const slidesStorage = gcs.bucket(BUCKET_NAME);

module.exports = {
  slidesStorage,
};