const { firestore } = require('../config/firestoreConnection');

const join = (lectureId, userId, callback) => {
  if (!lectureId) callback({ error: 'Invalid lectureId' });
  else if (!userId) callback({ error: 'Invalid userId' });
  else {
    const memberDoc = { lectureId, userId };

    firestore.collection('members')
      .add(memberDoc)
      .then((ref) => {
        memberDoc.id = ref.id;
        callback(memberDoc);
      })
      .catch(() => {
        callback({ error: 'Error when joining room' });
      });
  }
};

module.exports = {
  join,
};
