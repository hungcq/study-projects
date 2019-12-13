const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'hust-remote-study',
  keyFilename: 'src/infrastructure/persistence/firestore/config/googleCloudKey.json',
});

module.exports = {
  firestore,
};
