const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'hust-remote-study',
  keyFilename: 'src/config/googleCloudKey.json',
});

module.exports = {
  firestore,
};
