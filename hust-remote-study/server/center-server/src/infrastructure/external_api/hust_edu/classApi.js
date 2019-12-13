const axios = require('axios');
const { getHeader, urls } = require('./config');

const classApi = {
  getClassesByTeacher(username, callback) {
    console.log('getClassesByTeacher', username);
    axios({
      method: 'get',
      url: urls.classesByTeacher(username.split('-')[1]),
      header: getHeader(),
    }).then((response) => {
      callback(response.data);
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      // always executed
    });
  },
  getClassesByStudent(username, callback) {
    console.log('getClassesByStudent', username);
    return axios({
      method: 'get',
      url: urls.classesByStudent(username.split('-')[1]),
      header: getHeader(),
    }).then((response) => {
      callback(response.data);
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      // always executed
    });
  },
  getClassesById(classId, callback) {
    return axios({
      method: 'get',
      url: urls.classesById(classId),
      header: getHeader(),
    }).then((response) => {
      callback(response.data);
    }).catch((error) => {
      console.log(error);
    }).then(() => {
      // always executed
    });
  },
};

module.exports = {
  classApi,
};
