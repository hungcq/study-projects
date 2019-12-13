const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'hust-online-learning',
  keyFilename: 'src/config/googleCloudKey.json',
});

module.exports = {
  storage,
};
