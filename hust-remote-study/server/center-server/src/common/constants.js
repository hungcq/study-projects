const lectureStatus = {
  START_SOON: 0,
  ON_GOING: 1,
  FINISHED: 2,
};

const slideTypes = {
  PDF: 'PDF',
  MEDIA: 'MEDIA',
};

const errors = {
  NOT_CONDUCTOR: 'Another teacher is conducting the live lecture.',
  NOT_STARTED: 'The lecture has not been started.',
  LECTURE_EXISTED: 'The lecture has already been started.',
  SUCCESS: 'Success',
};

module.exports = {
  lectureStatus,
  slideTypes,
  errors
};