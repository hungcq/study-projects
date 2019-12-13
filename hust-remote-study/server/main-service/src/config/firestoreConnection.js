const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'hust-online-learning',
  keyFilename: 'src/config/googleCloudKey.json',
});

module.exports = {
  firestore,
};
