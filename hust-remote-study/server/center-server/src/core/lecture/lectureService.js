const uuidv4 = require('uuid/v4');
const slidesStorage = require(
  '../../infrastructure/persistence/cloudStorage/slidesStorage',
);

const lectureRepository = require(
  '../../infrastructure/persistence/firestore/lectureRepository',
);
const streamRepository = require(
  '../../infrastructure/persistence/firestore/streamRepository',
);

const { openTok } = require('../../infrastructure/streaming/opentok/config');

const {
  lectureStatus,
  slideTypes,
} = require('../../common/constants');

const uploadSlide = (req, res, next) => {
  if (!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = uuidv4();
  const file = slidesStorage.storage.file(gcsname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = slidesStorage.getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

const createLecture = (request, callback) => {
  const lecture = request.body;
  lecture.slideUrl = [];
  if (request.file && request.file.cloudStoragePublicUrl) {
    lecture.slideUrl.push({
      title: request.file.originalname,
      url: request.file.cloudStoragePublicUrl,
      slideType: slideTypes.PDF,
    });
  }
  lecture.teacherIds = JSON.parse(lecture.teacherIds);
  if (!lecture.name) {
    callback(null);
    return;
  }
  if (!lecture.classId) {
    callback(null);
    return;
  }
  if (lecture.teacherIds.length === 0) {
    callback(null);
    return;
  }

  const currentTime = new Date();
  const lectureDoc = {
    classId: lecture.classId,
    startTime: Number.parseInt(lecture.startTime, 10),
    endTime: Number.parseInt(lecture.endTime, 10),
    session: Number.parseInt(lecture.session),
    name: lecture.name,
    description: lecture.description || '',
    password: lecture.password || null,
    teacherIds: lecture.teacherIds || [],
    createdTime: currentTime.getTime(),
    updatedTime: currentTime.getTime(),
    slideUrl: lecture.slideUrl,
    status: lectureStatus.START_SOON,
    publiclyOpen: lecture.publiclyOpen === 'true' || false,
    maxLateTime: Number.parseInt(lecture.maxLateTime),
  };
  lectureRepository.add(lectureDoc, callback);
};

const getLectures = (filter, callback) => {
  lectureRepository.find(filter, callback);
};

const getOneLectureById = (id, callback) => {
  if (!id) callback(null);
  else {
    lectureRepository.findOneById(id, (data) => {
      if (!data) callback(null);
      else {
        const { password, ...lecture } = data;
        lecture.id = id;
        callback(lecture);
      }
    });
  }
};

const deleteOneLectureById = (id, callback) => {
  if (!id) callback(false);
  else lectureRepository.deleteOneById(id, callback);
};

const updateLecture = (id, request, callback) => {
  if (!id) {
    callback(null);
    return;
  }
  const lecture = request.body;
  lecture.slideUrl = [];
  if (request.file && request.file.cloudStoragePublicUrl) {
    lecture.slideUrl.push({
      title: request.file.originalname,
      url: request.file.cloudStoragePublicUrl,
      slideType: slideTypes.PDF,
    });
  }
  lecture.teacherIds = JSON.parse(lecture.teacherIds);
  if (!lecture.name) {
    callback(null);
    return;
  }
  if (!lecture.classId) {
    callback(null);
    return;
  }
  if (lecture.teacherIds.length === 0) {
    callback(null);
    return;
  }
  const currentTime = new Date();
  const lectureDoc = {
    classId: lecture.classId,
    startTime: Number.parseInt(lecture.startTime, 10),
    endTime: Number.parseInt(lecture.endTime, 10),
    session: Number.parseInt(lecture.session),
    name: lecture.name,
    description: lecture.description || '',
    password: lecture.password || null,
    teacherIds: lecture.teacherIds || [],
    updatedTime: currentTime.getTime(),
    slideUrl: lecture.slideUrl,
    status: lectureStatus.START_SOON,
    publiclyOpen: lecture.publiclyOpen === 'true' || false,
    maxLateTime: Number.parseInt(lecture.maxLateTime),
  };
  Object.keys(lectureDoc)
    .forEach(key => lectureDoc[key] === undefined && delete lectureDoc[key]);
  lectureRepository.update(id, lectureDoc, callback);
};

const addSlide = (id, request, callback) => {
  if (!id) {
    callback(null);
    return;
  }
  getOneLectureById(id, (lecture) => {
    if (!lecture) {
      callback(null);
      return;
    }
    if (request.file && request.file.cloudStoragePublicUrl) {
      const slideType = getSlideType(request.file.originalname);
      lecture.slideUrl.push({
        title: request.file.originalname,
        url: request.file.cloudStoragePublicUrl,
        slideType,
      });
    } else {
      const slideType = getSlideType(request.body.url);
      lecture.slideUrl.push({
        title: request.body.url,
        url: request.body.url,
        slideType,
      });
    }

    const lectureDoc = {
      updatedTime: new Date().getTime(),
      slideUrl: lecture.slideUrl,
    };
    lectureRepository.update(id, lectureDoc, callback);
  });
};

const getSlideType = (fileName) => {
  const split = fileName.toLowerCase().split('.');
  let slideType = slideTypes.PDF;
  if (split.length > 0 && split[split.length - 1] === 'pdf') {
    slideType = slideTypes.PDF;
  } else {
    slideType = slideTypes.MEDIA;
  }
  return slideType;
};

const uploadStreams = (lectureId, archive) => {

};

const getStreamsById = (id, callback) => {
  if (!id) callback(null);
  else {
    streamRepository.findOneById(id, (streamDoc) => {
      if (!streamDoc) {
        openTok.listArchives({}, (error, archives) => {
          if (error) callback(null);
          else {
            const matchedArchives = archives.filter(a => a.name.includes(id));
            if (matchedArchives.length > 0) {
              const nonEmptyArchives = matchedArchives.filter(
                a => a.size > 0 && a.status === 'available',
              );
              if (nonEmptyArchives.length > 0) {
                callback(nonEmptyArchives[0]);
                uploadStreams(id, nonEmptyArchives[0]);
              } else callback(null);
            } else callback(null);
          }
        });
      }
    });
  }
};

module.exports = {
  getOneLectureById,
  getLectures,
  deleteOneLectureById,
  createLecture,
  uploadSlide,
  updateLecture,
  getStreamsById,
  addSlide,
};
