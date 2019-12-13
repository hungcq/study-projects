const { classApi } = require('../../infrastructure/external_api/hust_edu/classApi');

const getClassesByTeacher = (username, callback) => {
  classApi.getClassesByTeacher(username, callback);
};

const getClassesByStudent = (username, callback) => {
  classApi.getClassesByStudent(username, callback);
};

const getClassesById = (classId, callback) => {
  classApi.getClassesById(classId, callback);
};

module.exports = {
  getClassesById,
  getClassesByTeacher,
  getClassesByStudent,
};
