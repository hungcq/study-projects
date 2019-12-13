const actionRepo = require('../../infrastructure/persistence/firestore/actionRepository');

const getActions = (filter, callback) => {
  actionRepo.find(filter, callback);
};


module.exports = {
  getActions,
};
