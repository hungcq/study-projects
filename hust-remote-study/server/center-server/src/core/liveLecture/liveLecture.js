const lectureRepository = require(
  '../../infrastructure/persistence/firestore/lectureRepository',
);
const {
  lectureStatus,
  errors,
} = require('../../common/constants');

const actionRepo = require(
  '../../infrastructure/persistence/firestore/actionRepository',
);

const CHAT_LIST_MAX_SIZE = 50;

const roomActionTypes = {
  CONTROL_SLIDE: 'CONTROL_SLIDE',
  CHANGE_SLIDE: 'CHANGE_SLIDE',
  CHAT: 'CHAT',
  CONTROL_AUDIO: 'CONTROL_AUDIO',
  RAISE_HAND: 'RAISE_HAND',
  CLOSE_ALL: 'CLOSE_ALL',
  CONTROL_MEDIA: 'CONTROL_MEDIA',
  DRAW: 'DRAW',
};

const liveLectureActionTypes = {
  START: 'START',
  STOP: 'STOP',
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  ACT: 'ACT',
  SET_NUM_PAGES: 'SET_NUM_PAGES',
  GET_LECTURE_INFO: 'GET_LECTURE_INFO',
  REQUEST_RELOAD: 'REQUEST_RELOAD',
};

let lectureList = [];

const getLectureById = (id, list) => {
  const result = list.filter(item => item.lectureId === id);
  if (result.length > 0) {
    return result[0];
  }
  return null;
};

const joinLectureStream = (data) => {
  const lecture = getLectureById(data.lectureId, lectureList);
  if (lecture) {
    if (!lecture.streamConnections) lecture.streamConnections = {};
    if (!lecture.streamConnections[data.username]) lecture.streamConnections[data.username] = [];
    lecture.streamConnections[data.username].push(data.connectionId);
    return lecture;
  }
  return null;
};

const performAction = (data) => {
  const lecture = getLectureById(data.lectureId, lectureList);
  // const lecture = {};
  if (lecture) {
    switch (data.actionType) {
      case roomActionTypes.CONTROL_SLIDE:
        if (data.username === lecture.userInControl || lecture.isElearning) {
          lecture.currentPage = data.currentPage;
        } else if (lecture.userInControl === '') {
          lecture.currentPage = data.currentPage;
          lecture.userInControl = data.username;
        } else {
          return { error: errors.NOT_CONDUCTOR };
        }
        break;
      case roomActionTypes.CHANGE_SLIDE:
        if (data.username === lecture.userInControl || lecture.isElearning) {
          lecture.slideUrl = data.slideUrl;
          lecture.slideType = data.slideType;
          lecture.currentPage = 1;
        } else if (lecture.userInControl === '') {
          lecture.slideUrl = data.slideUrl;
          lecture.slideType = data.slideType;
          lecture.userInControl = data.username;
          lecture.currentPage = 1;
        } else {
          return { error: errors.NOT_CONDUCTOR };
        }
        break;
      case roomActionTypes.CONTROL_MEDIA:
        if (data.username === lecture.userInControl || lecture.isElearning) {
        } else if (lecture.userInControl === '') {
          lecture.userInControl = data.username;
        } else {
          return { error: errors.NOT_CONDUCTOR };
        }
        break;
      case roomActionTypes.DRAW:
        if (data.username === lecture.userInControl || lecture.isElearning) {
        } else if (lecture.userInControl === '') {
          lecture.userInControl = data.username;
        } else {
          return { error: errors.NOT_CONDUCTOR };
        }
        break;
      case roomActionTypes.CHAT:
        lecture.chatList.push(
          {
            content: data.content,
            username: data.username,
            // type: data.type,
            timestamp: Date.now(),
          },
        );
        if (lecture.chatList.length > CHAT_LIST_MAX_SIZE) {
          lecture.chatList = lecture.chatList.slice(
            lecture.chatList.length - 100, lecture.chatList.length,
          );
        }
        break;
      case roomActionTypes.RAISE_HAND:
        lecture.studentList = lecture.studentList.map((item) => {
          if (item.username === data.username) {
            return { ...item, raisedHand: true };
          }
          return item;
        });
        break;
      case roomActionTypes.CLOSE_ALL:
        if (data.username === lecture.userInControl || lecture.isElearning) {
          lecture.studentList = lecture.studentList.map(
            item => ({ ...item, raisedHand: false }),
          );
        } else if (lecture.userInControl === '') {
          lecture.studentList = lecture.studentList.map(
            item => ({ ...item, raisedHand: false }),
          );
          lecture.userInControl = data.username;
        } else {
          return { error: errors.NOT_CONDUCTOR };
        }
        break;
      default:
        break;
    }
    const actionDoc = {
      lectureId: data.lectureId,
      type: liveLectureActionTypes.ACT,
      timestamp: Date.now(),
      data,
    };
    actionRepo.add(actionDoc, () => {});
    return lecture;
  }
  return { error: errors.NOT_STARTED };
};

const startLecture = (lectureId, username, isElearning) => {
  const lecture = getLectureById(lectureId, lectureList);
  if (lecture) {
    return { error: errors.LECTURE_EXISTED };
  } else {
    lectureList = [
      ...lectureList,
      {
        lectureId,
        studentList: [],
        slide: {
          url: '',
          currentPage: 0,
        },
        chatList: [],
        userInControl: username,
        slideType: 'PDF',
        isElearning,
      },
    ];
    const actionDoc = {
      lectureId,
      type: liveLectureActionTypes.START,
      timestamp: Date.now(),
    };
    actionRepo.add(actionDoc, () => {});
    return { error: errors.SUCCESS };
  }
};

const stopLecture = (lectureId) => {
  lectureList = lectureList.filter(item => item.lectureId !== lectureId);
  const actionDoc = {
    lectureId,
    type: liveLectureActionTypes.STOP,
    timestamp: Date.now(),
  };
  actionRepo.add(actionDoc, () => {});
};

const joinLecture = (lectureId, username) => {
  const lecture = getLectureById(lectureId, lectureList);
  if (lecture) {
    if (!lecture.studentList.find(item => (item.username === username))) {
      const actionDoc = {
        lectureId,
        type: liveLectureActionTypes.JOIN,
        timestamp: Date.now(),
        username,
      };
      actionRepo.add(actionDoc, () => {});
      lecture.studentList = [
        ...lecture.studentList,
        { username },
      ];
    }
    return lecture;
  }
  return null;
};

const leaveLecture = (lectureId, username) => {
  if (username) {
    const lecture = getLectureById(lectureId, lectureList);
    if (lecture) {
      lecture.studentList = lecture.studentList.filter(
        item => item.username !== username,
      );
      const actionDoc = {
        lectureId,
        type: liveLectureActionTypes.LEAVE,
        timestamp: Date.now(),
        username,
      };
      if (lecture.userInControl === username) {
        lecture.userInControl = '';
      }
      actionRepo.add(actionDoc, () => {});
      return lecture;
    }
    return null;
  }
  return null;
};

const removeUserFromLectures = (username) => {
  let lectures = [];
  lectureList = lectureList.map((lecture) => {
    let removed = false;
    lecture.studentList = lecture.studentList.filter((item) => {
      if (item.username === username) {
        removed = true;
        const actionDoc = {
          lectureId: lecture.lectureId,
          type: liveLectureActionTypes.LEAVE,
          timestamp: Date.now(),
          username,
        };
        actionRepo.add(actionDoc, () => {});
      }
      return item.username !== username;
    });
    if (lecture.userInControl === username) {
      lecture.userInControl = '';
    }
    if (removed) {
      lectures = [...lectures, lecture];
    }
    return lecture;
  });
  return lectures;
};

const changeLectureStatus = (id, status, callback) => {
  const currentTime = new Date();
  const lectureDoc = {
    updatedTime: currentTime.getTime(),
    status,
  };
  if (status === lectureStatus.ON_GOING) {
    lectureDoc.startTime = new Date().getTime();
  } else if (status === lectureStatus.FINISHED) {
    lectureDoc.endTime = new Date().getTime();
  }
  lectureRepository.update(id, lectureDoc, callback);
};

const initOngoingLectures = () => {
  lectureRepository.find({}, (lectures) => {
    if (lectures) {
      lectures.map((item) => {
        if (item.status === lectureStatus.ON_GOING) {
          lectureList = [
            ...lectureList,
            {
              lectureId: item.id,
              studentList: [],
              currentPage: 1,
              chatList: [],
              userInControl: '',
              slideType: 'PDF',
            },
          ];
        }
      });
    }
  });
};

module.exports = {
  startLecture,
  stopLecture,
  joinLecture,
  leaveLecture,
  removeUserFromLectures,
  changeLectureStatus,
  initOngoingLectures,
  performAction,
  joinLectureStream,
};
