const axios = require('axios');
const { getHeader, urls } = require('./config');

const studentApi = {
  getStudentsByClassId(classId, callback) {
    return axios({
      method: 'get',
      url: urls.studentsByClassId(classId),
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
  studentApi,
};
