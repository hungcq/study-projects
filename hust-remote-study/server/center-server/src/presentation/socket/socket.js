const {
  startLecture,
  stopLecture,
  joinLecture,
  leaveLecture,
  removeUserFromLectures,
  changeLectureStatus,
  initOngoingLectures,
  performAction,
  joinLectureStream,
} = require('../../core/liveLecture/liveLecture');

const { stopArchiving } = require('../../core/user/userService');

const {
  lectureStatus,
} = require('../../common/constants');

const socketEventTypes = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  LOGGED_IN: 'logged-in',
  LOGGED_OUT: 'logged-out',
  START: 'start',
  STOP: 'stop',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  ACTION: 'action',
  JOIN_STREAM: 'join-stream',
  UPLOAD_SLIDE: 'upload-slide',
};

const setupSocket = (io) => {
  io.set('origins', '*:*');
  initOngoingLectures();

  io.on(socketEventTypes.CONNECTION, (socket) => {
    console.log('a user connected');
    socket.on(socketEventTypes.DISCONNECT, () => {
      console.log(`${socket.username} disconnected`);
      if (socket.username) {
        const lectures = removeUserFromLectures(socket.username);
        lectures.map((item) => {
          io.to(item.lectureId).emit(socketEventTypes.LEAVE_ROOM,
            {
              lectureId: item.lectureId,
              username: socket.username,
              timestamp: Date.now(),
              studentList: item.studentList,
            });
        });
      }
    });
    socket.on(socketEventTypes.JOIN_ROOM, (data) => {
      socket.username = data.username;
      console.log('user joined', data);
      socket.join(data.lectureId);
      if (data.username) {
        const lecture = joinLecture(data.lectureId, data.username);
        if (lecture) {
          io.to(data.lectureId).emit(socketEventTypes.JOIN_ROOM,
            {
              ...data,
              timestamp: Date.now(),
              lecture,
            });
        }
      }
    });
    socket.on(socketEventTypes.LEAVE_ROOM, (data) => {
      console.log('user left', data);
      socket.leave(data.lectureId);
      if (data.username) {
        const lecture = leaveLecture(data.lectureId, data.username);
        if (lecture) {
          io.to(data.lectureId).emit(socketEventTypes.LEAVE_ROOM,
            {
              ...data,
              timestamp: Date.now(),
              studentList: lecture.studentList,
            });
        }
      }
    });
    socket.on(socketEventTypes.START, (data) => {
      console.log('user start lecture', data);
      socket.join(data.lectureId);
      // io.to(data.lectureId)
      if (data.username) {
        if (data.elearning) {
          startLecture(data.lectureId, data.username, true);
          io.emit(socketEventTypes.START,
            {
              ...data,
              timestamp: Date.now(),
            });
          const lectureAfterJoin = joinLecture(data.lectureId, data.username);
          if (lectureAfterJoin) {
            io.to(data.lectureId).emit(socketEventTypes.JOIN_ROOM,
              {
                ...data,
                timestamp: Date.now(),
                lecture: lectureAfterJoin,
              });
          }
        } else {
          changeLectureStatus(data.lectureId, lectureStatus.ON_GOING,
            (lecture) => {
              if (lecture) {
                startLecture(data.lectureId, data.username, false);
                io.emit(socketEventTypes.START,
                  {
                    ...data,
                    timestamp: Date.now(),
                  });
              }
              const lectureAfterJoin = joinLecture(data.lectureId, data.username);
              if (lectureAfterJoin) {
                io.to(data.lectureId).emit(socketEventTypes.JOIN_ROOM,
                  {
                    ...data,
                    timestamp: Date.now(),
                    lecture: lectureAfterJoin,
                  });
              }
            });
        }
      }
    });
    socket.on(socketEventTypes.STOP, (data) => {
      console.log('user stop lecture', data);
      changeLectureStatus(data.lectureId, lectureStatus.FINISHED, (lecture) => {
        if (lecture) {
          stopLecture(data.lectureId);
          stopArchiving(data.lectureId);
          io.emit(socketEventTypes.STOP,
            {
              ...data,
              timestamp: Date.now(),
            });
        }
      });
    });
    socket.on(socketEventTypes.ACTION, (data) => {
      console.log('user act');
      const lecture = performAction(data);
      if (!lecture.error) {
        io.to(data.lectureId).emit(socketEventTypes.ACTION,
          {
            ...data,
            timestamp: Date.now(),
          });
      } else {
        socket.emit(socketEventTypes.ACTION,
          {
            error: lecture.error,
            timestamp: Date.now(),
          });
      }
    });
    socket.on(socketEventTypes.UPLOAD_SLIDE, (data) => {
      io.to(data.lectureId).emit(socketEventTypes.UPLOAD_SLIDE,
        {
          ...data,
          timestamp: Date.now(),
        });
    });
    socket.on(socketEventTypes.JOIN_STREAM, (data) => {
      // console.log(joinLectureStream(data));
      const lecture = joinLectureStream(data);
      if (lecture) {
        io.to(data.lectureId).emit(socketEventTypes.JOIN_STREAM,
          {
            ...lecture,
          });
      }
    });
  });
};

module.exports = {
  setupSocket,
};
