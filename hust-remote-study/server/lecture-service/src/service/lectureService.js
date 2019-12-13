const { firestore } = require('../config/firestoreConnection');
const { status } = require('../config/constants');

const create = (request, callback) => {
  const lecture = request.body;
  if (request.file && request.file.cloudStoragePublicUrl) {
    lecture.slideUrl = request.file.cloudStoragePublicUrl;
  } else {
    lecture.slideUrl = '';
  }

  const currentTime = new Date();
  const lectureDoc = {
    classId: lecture.classId,
    startTime: Number.parseInt(lecture.startTime),
    endTime: Number.parseInt(lecture.endTime),
    session: lecture.session,
    name: lecture.name || `${lecture.classId} - ${currentTime.getTime()}`,
    description: lecture.description || '',
    password: lecture.password || null,
    teacherIds: lecture.teacherIds || [],
    createdTime: currentTime.getTime(),
    updatedTime: currentTime.getTime(),
    slideUrl: lecture.slideUrl,
    status: status.START_SOON,
    publiclyOpen: lecture.publiclyOpen === 'true' || false,
    maxLateTime: lecture.maxLateTime || 15,
  };
  if (!lectureDoc.classId) callback({ error: 'classId must not be null' });
  else if (lectureDoc.teacherIds.length === 0) callback(
    { error: 'teacherIds must not be empty' });
  else {
    firestore.collection('lectures').add(lectureDoc).then((ref) => {
      lectureDoc.id = ref.id;
      callback(lectureDoc);
    }).catch((e) => {
      callback({ error: JSON.stringify(e) });
    });
  }
};

const fetch = (filter, callback) => {
  const queryRequest = firestore.collection('lectures');
  if (filter.teacherIds) {
    filter.teacherIds.forEach(
      teacherId => filter.where('teacherIds', 'array-contains', teacherId));
  }
  queryRequest.limit(filter.limit * filter.page);
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
  }).catch(() => {
    callback({ error: 'Error when fetching lecture' });
  });
};

const fetchOne = (id, callback) => {
  if (!id) callback({ error: 'Invalid lecture id' });
  else {
    firestore.collection('lectures').doc(id).get().then((doc) => {
      if (!doc.exists) callback({ error: 'No lecture found' });
      else {
        const { password, ...lecture } = doc.data();
        lecture.id = doc.id;
        callback(lecture);
      }
    });
  }
};

const deleteOne = (id, callback) => {
  if (!id) callback({ error: 'Invalid lecture id' });
  else {
    firestore.collection('lectures').doc(id).delete().then(() => {
      callback({ succeeded: true });
    }).catch(() => {
      callback({ succeeded: false });
    });
  }
};

const updateOne = (id, request, callback) => {
  if (!id) {
    callback({ error: 'Invalid lecture id' });
  } else {
    const lecture = request.body;
    console.log(request.body);
    if (request.file && request.file.cloudStoragePublicUrl) {
      lecture.slideUrl = request.file.cloudStoragePublicUrl;
    } else {
      lecture.slideUrl = undefined;
    }
    const currentTime = new Date();
    const lectureDoc = {
      classId: lecture.classId,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      session: lecture.session,
      name: lecture.name,
      description: lecture.description || '',
      password: lecture.password || null,
      teacherIds: lecture.teacherIds || [],
      updatedTime: currentTime.getTime(),
      slideUrl: lecture.slideUrl,
      status: status.START_SOON,
      publiclyOpen: lecture.publiclyOpen || false,
      maxLateTime: lecture.maxLateTime
    };
    Object.keys(lectureDoc).
      forEach(key => lectureDoc[key] === undefined && delete lectureDoc[key]);
    if (!lectureDoc.classId) callback({ error: 'classId must not be null' });
    else if (lectureDoc.teacherIds.length === 0) callback(
      { error: 'teacherIds must not be empty' });
    else {
      firestore.collection('lectures').
        doc(id).
        update(lectureDoc).
        then((ref) => {
          lectureDoc.id = ref.id;
          callback(lectureDoc);
        }).
        catch(() => {
          callback({ error: 'Error when creating lecture' });
        });
    }
  }
};

module.exports = {
  create, fetch, fetchOne, deleteOne, updateOne,
};
