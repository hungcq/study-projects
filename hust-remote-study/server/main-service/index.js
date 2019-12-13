const {socketEventTypes} = require('./src/socket/socket-event-types');

const express = require('express');
const bodyParser = require('body-parser');
const {storage} = require('./src/config/storageConnection');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {PORT} = require('./src/config/env');

// Config
app.use(bodyParser.json());

// Router
const {mainApiRouter} = require('./src/router/main');

app.use('/api', mainApiRouter);

app.get('/', async (req, res) => {
  const bucket = storage.bucket('hust-online-learning.appspot.com');
  const [files] = await bucket.getFiles({prefix: 'build'});
  console.log('Files:');
  files.forEach((file) => {
    console.log(file.name);
  });
  res.send('Main service');
});

app.use('*', (req, res) => res.send('fobidden'));

const CURRENT_PORT = process.env.PORT || PORT;
http.listen(CURRENT_PORT,
  () => console.log(`Lecture service listening on port ${CURRENT_PORT}!`));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let lectureList = [];

io.on(socketEventTypes.CONNECTION, socket => {
  console.log('a user connected');
  socket.on(socketEventTypes.DISCONNECT, () => {
    console.log('user disconnected');
    // TODO emit leave room
  });
  socket.on(socketEventTypes.JOIN_ROOM, data => {
      console.log('user joined', data);
      socket.join(data.lectureId);
      console.log(lectureList);
      const lecture = getLectureById(data.lectureId, lectureList);
      if (lecture && !lecture.studentList.find(item => (item.username === data.username))) {
        lecture.studentList = [
          ...lecture.studentList,
          {username: data.username},
        ];
        io.to(data.lectureId).emit(socketEventTypes.JOIN_ROOM,
          {
            ...data,
            timestamp: Date.now(),
            studentList: lecture.studentList,
          });
      }
    }
  );
  socket.on(socketEventTypes.LEAVE_ROOM, data => {
    console.log('user left', data);
    socket.leave(data.lectureId);
    const lecture = getLectureById(data.lectureId, lectureList);
    lecture.studentList = lecture.studentList.filter(item => {
      return item.username !== data.username;
    });
    io.to(data.lectureId).emit(socketEventTypes.LEAVE_ROOM,
      {
        ...data,
        timestamp: Date.now(),
        studentList: lecture.studentList,
      });
  });
  socket.on(socketEventTypes.START, data => {
    console.log('user start lecture', data);
    socket.join(data.lectureId);
    // io.to(data.lectureId)
    lectureList = [
      ...lectureList,
      {
        lectureId: data.lectureId,
        studentList: [],
      },
    ];
    io.emit(socketEventTypes.START,
      {
        ...data,
        timestamp: Date.now(),
      });
  });
  socket.on(socketEventTypes.STOP, data => {
    console.log('user stop lecture', data);
    socket.join(data.lectureId);
    io.to(data.lectureId)
    // io
      .emit(socketEventTypes.STOP,
        {
          ...data,
          timestamp: Date.now(),
        });
  });
  socket.on(socketEventTypes.ACTION, data => {
    console.log('user act', data);
    io.to(data.lectureId).emit(socketEventTypes.ACTION,
      {
        ...data,
        timestamp: Date.now(),
      });
  });
});

const getLectureById = (id, list) => {
  const result = list.filter(item => {
    return item.lectureId === id;
  });
  if (result.length > 0) {
    return result[0];
  }
  return null;
};