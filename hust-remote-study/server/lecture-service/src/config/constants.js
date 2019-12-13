const PROJECT_ID = 'hust-online-learning';
const KEY_FILE_NAME = 'src/config/googleCloudKey.json';
const BUCKET_NAME = 'lecture-slides';

const status = {
  START_SOON: 0,
  ON_GOING: 1,
  FINISHED: 2,
};

module.exports = {
  PROJECT_ID,
  KEY_FILE_NAME,
  BUCKET_NAME,
  status
};