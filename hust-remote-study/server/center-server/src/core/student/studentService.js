const {studentApi} = require('../../infrastructure/external_api/hust_edu/studentApi');

const getStudentsByClassId = (classId, callback) => {
  studentApi.getStudentsByClassId(classId, callback);
};

module.exports = {
  getStudentsByClassId
};