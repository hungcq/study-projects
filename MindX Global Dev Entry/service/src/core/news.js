const {logger} = require('../utils');
const {dbConfigs} = require('../configs/db-configs');
const MongoClient = require('mongodb').MongoClient;
const {commonConfigs} = require('../configs/common-configs');

const config = dbConfigs[commonConfigs.env];

const get = (data, callback) => {
  if (!data) {
    callback({error: 'Data is null.'});
    return;
  }
  MongoClient.connect(config.host, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      logger.error(err);
      callback({
        error: JSON.stringify(err),
      });
    } else {
      const collection = client.db(config.dbName).collection(dbConfigs.collection);
      collection.find().toArray((err, docs) => {
        if (err) {
          callback({
            error: JSON.stringify(err),
          });
        } else {
          callback(docs);
        }
        client.close();
      });
    }
  });
};

const create = (data, callback) => {
  if (!data) {
    callback({error: 'Data is null.'});
    return;
  }
  const {
    username, fullname, email, password
  } = data;
  if (!username || !password) {
    callback({
      error: `Some required fields are null.`,
    });
    return;
  }
  MongoClient.connect(config.host, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      logger.error(err);
      callback({
        error: JSON.stringify(err),
      });
    } else {
      const collection = client.db(config.dbName).collection(dbConfigs.collection);
      const doc = {
        _id: username,
        username,
        password,
        fullname,
        email
      };
      collection.insertOne(doc, (error, result) => {
        if (error) {
          logger.error(error);
          callback({
            error: JSON.stringify(err),
          });
        } else {
          callback(doc);
        }
      });
    }
  });
};

const login = (data, callback) => {
  if (!data) {
    callback({error: 'Data is null.'});
    return;
  }
  const {
    username, password
  } = data;
  if (!username || !password) {
    callback({
      error: `Some required fields are null.`,
    });
    return;
  }
  MongoClient.connect(config.host, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      logger.error(err);
      callback({
        error: JSON.stringify(err),
      });
    } else {
      const collection = client.db(config.dbName).collection(dbConfigs.collection);
      collection.findOne({username, password}, (error, result) => {
        if (error) {
          logger.error(error);
          if (callback) {
            callback({
              error: 'DB error',
            });
          }
        } else {
          if (!result) {
            callback({
              error: 'Wrong username or password.',
            });
          } else {
            callback({});
          }
        }
      });
    }
  });
};

module.exports = {
  get,
  create,
  login
};