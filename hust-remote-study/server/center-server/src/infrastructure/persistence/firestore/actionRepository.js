const { firestore } = require('./config/connection');

const findOneById = (id, callback) => {
  firestore.collection('actions').doc(id).get().then((doc) => {
    if (!doc.exists) callback(null);
    else callback(doc.data());
  });
};

const find = (filter, callback) => {
  const queryRequest = firestore.collection('actions');
  if (!filter.lectureId) {
    callback(null);
  }
  queryRequest.where('lectureId', '==', filter.lectureId).
    get().
    then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        callback(null);
      }
      const actions = [];
      snapshot.forEach((doc) => {
        const action = doc.data();
        actions.push(action);
      });
      callback(actions);
    }).
    catch(() => callback(null));
};

const deleteOneById = (id, callback) => {
  firestore.collection('actions').doc(id).delete().then(() => {
    callback({ succeeded: true });
  }).catch(() => callback({ succeeded: false }));
};

const add = (actionDoc, callback) => {
  firestore.collection('actions').
    add(actionDoc).
    then(ref => callback({ ...actionDoc, id: ref.id })).
    catch((error) => {
      callback(null);
    });
};

const update = (id, actionDoc, callback) => {
  firestore.collection('actions').
    doc(id).
    update(actionDoc).
    then(ref => callback({ ...actionDoc, id: ref.id })).
    catch(() => callback(null));
};

module.exports = {
  findOneById, find, deleteOneById, add, update,
};
