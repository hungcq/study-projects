const { firestore } = require('./config/connection');

const findOneById = (id, callback) => {
  firestore.collection('lectures').doc(id).get().then((doc) => {
    if (!doc.exists) callback(null);
    else callback(doc.data());
  });
};

const find = (filter, callback) => {
  const queryRequest = firestore.collection('lectures');
  if (filter.teacherIds) {
    filter.teacherIds.forEach(
      teacherId => filter.where('teacherIds', 'array-contains', teacherId),
    );
  }
  if (filter.limit && filter.page) {
    queryRequest.limit(filter.limit * filter.page);
  }
  queryRequest.get().then((snapshot) => {
    const lectures = [];
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const { password, ...lecture } = doc.data();
        lecture.id = doc.id;
        lectures.push(lecture);
      });
    }
    callback(lectures);
  }).catch((error) => {
    callback(null);
    console.log(error);
  });
};

const deleteOneById = (id, callback) => {
  firestore.collection('lectures').doc(id).delete().then(() => {
    callback({ succeeded: true });
  })
    .catch(() => callback({ succeeded: false }));
};

const add = (lectureDoc, callback) => {
  firestore.collection('lectures')
    .add(lectureDoc)
    .then(ref => callback({ ...lectureDoc, id: ref.id }))
    .catch(() => callback(null));
};

const update = (id, lectureDoc, callback) => {
  firestore.collection('lectures')
    .doc(id)
    .update(lectureDoc)
    .then(ref => callback({ ...lectureDoc, id: ref.id }))
    .catch(() => callback(null));
};

module.exports = {
  findOneById, find, deleteOneById, add, update,
};
