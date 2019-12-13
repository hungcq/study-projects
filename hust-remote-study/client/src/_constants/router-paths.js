export const routerPaths = {
  DEFAULT: '/',
  INDEX: '/index',
  LOGIN: '/login',
  LECTURE: '/lecture/:id',
  REPLAY: '/replay/:id',
  EDIT_LECTURE: '/lecture/edit/:id',
  lectureById: lectureId => `/lecture/${lectureId}`,
  replayById: lectureId => `/replay/${lectureId}`,
  CREATE_LECTURE: '/lecture/create',
  editLecture: lectureId => `/lecture/edit/${lectureId}`,
};