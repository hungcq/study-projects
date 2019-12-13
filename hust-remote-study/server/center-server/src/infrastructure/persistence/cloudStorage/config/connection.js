const { Storage } = require('@google-cloud/storage');

const gcs = new Storage({
  projectId: 'hust-remote-study',
  keyFilename: 'src/infrastructure/persistence/cloudStorage/config/googleCloudKey.json',
});

module.exports = { gcs };
