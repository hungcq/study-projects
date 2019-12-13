const { firestore } = require('./config/connection');

const findOneById = (id, callback) => {
  firestore.collection('streams').doc(id).get().then((doc) => {
    if (!doc.exists) callback(null);
    else callback(doc.data());
  });
};

module.exports = {
  findOneById,
};
