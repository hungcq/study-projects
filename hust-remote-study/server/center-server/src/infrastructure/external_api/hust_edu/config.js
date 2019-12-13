const getHeader = () => ({
  'Content-Type': 'application/json',
});

const HUST_EDU_BASE_URL = 'https://qldt.hust.edu.vn';
const SEMESTER = 20182;

const urls = {
  classesByTeacher: username =>
    `${HUST_EDU_BASE_URL}/api?type=teaching&semester=${SEMESTER}&teacherid=${username}`,
  classesById: classId =>
    `${HUST_EDU_BASE_URL}/api?type=teaching&semester=${SEMESTER}&classid=${classId}`,
  classesByStudent: username =>
    `${HUST_EDU_BASE_URL}/api?type=classes&studentid=${username}`,
  studentsByClassId: classId =>
    `${HUST_EDU_BASE_URL}/api?type=students&classid=${classId}`,
};

module.exports = {
  SSO_DOMAIN: process.env.SSO_DOMAIN || 'https://hust-sso.herokuapp.com',
  SERVER_DOMAIN: process.env.SERVER_DOMAIN || 'http://localhost:3001',
  UI_DOMAIN: process.env.UI_DOMAIN || 'http://localhost:3000',
  getHeader,
  urls
};