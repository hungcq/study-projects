const Firestore = require('@google-cloud/firestore');
const { PROJECT_ID, KEY_FILE_NAME } = require('./constants');

const firestore = new Firestore({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_NAME,
});

module.exports = {
  firestore,
};
