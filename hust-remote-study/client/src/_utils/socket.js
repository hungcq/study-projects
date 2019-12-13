import io from 'socket.io-client';
import {
  doAddNewSlide,
  doJoinLecture,
  doLeaveLecture,
  doPerformAction, doRequestReload,
  doStartLecture,
  doStopLecture,
} from '../_actions';
import { roomActionTypes, serviceUrl, socketEventTypes, socketPort } from '../_constants';

const TIMEOUT = 10000;
const socketUrl = `${serviceUrl}:${socketPort}/`;
let isConnecting;
let socket;
let timeOut;
let myStore;

export const createSocketConnection = (store) => {
  // console.log('isconnecting: ', isConnecting);
  myStore = store;
  if (!isConnecting) {
    socket = io(socketUrl);
    isConnecting = true;

    socket.on(socketEventTypes.CONNECT, () => {
      console.log('SOCKET on connect success');
      // isConnecting = true;
    });

    socket.on(socketEventTypes.JOIN_ROOM, data => {
      console.log('SOCKET on join', data);
      if (data.error) {
        console.log(data.error);
      }
      store.dispatch(doJoinLecture(data));
    });

    socket.on(socketEventTypes.LEAVE_ROOM, data => {
      console.log('SOCKET on leave', data);
      store.dispatch(doLeaveLecture(data));
    });

    socket.on(socketEventTypes.START, data => {
      console.log('SOCKET on start', data);
      store.dispatch(doStartLecture(data));
    });

    socket.on(socketEventTypes.STOP, data => {
      console.log('SOCKET on start', data);
      store.dispatch(doStopLecture(data));
    });

    socket.on(socketEventTypes.ACTION, data => {
      console.log('SOCKET on action', data);
      store.dispatch(doPerformAction(data));
      if (timeOut) {
        clearTimeout(timeOut);
      }
    });

    socket.on(socketEventTypes.UPLOAD_SLIDE, data => {
      console.log('SOCKET on upload slide', data);
      store.dispatch(doAddNewSlide(data.slideUrl));
    });

    socket.on(socketEventTypes.DISCONNECT, () => {
      isConnecting = false;
      console.log('SOCKET on disconnect');
    });

    socket.on('join-stream', (data) => {
      store.dispatch({
        type: 'JOIN_STREAM_SERVER',
        data: data,
      });
    });
  }
};

export const emitLoggedIn = data => {
  console.log('SOCKET emit logged in', data);
  socket.emit(socketEventTypes.LOGGED_IN, data);
};

export const emitLoggedOut = data => {
  console.log('SOCKET emit logged out', data);
  socket.emit(socketEventTypes.LOGGED_OUT, data);
};

export const emitStartLecture = data => {
  console.log('SOCKET emit start lecture', data);
  socket.emit(socketEventTypes.START, data);
};

export const emitStopLecture = data => {
  console.log('SOCKET emit stop lecture', data);
  socket.emit(socketEventTypes.STOP, data);
};

export const emitJoinLecture = data => {
  console.log('SOCKET emit join lecture', data.lectureId);
  socket.emit(socketEventTypes.JOIN_ROOM, data);
};

export const emitLeaveLecture = data => {
  console.log('SOCKET emit leave lecture', data.lectureId);
  socket.emit(socketEventTypes.LEAVE_ROOM, data);
};

export const emitPerformActionLecture = data => {
  console.log('SOCKET emit perform action', data.lectureId);
  socket.emit(socketEventTypes.ACTION, data);
  if (timeOut) {
    clearTimeout(timeOut);
  }
  if (data.actionType !== roomActionTypes.CONTROL_MEDIA && data.actionType !== roomActionTypes.DRAW) {
    timeOut = setTimeout(() => {
      console.log('socket not response');
      myStore.dispatch(doRequestReload(true));
    }, TIMEOUT);
  }
};

export const emitJoinStream = data => {
  console.log('SOCKET emit join stream', data);
  socket.emit('join-stream', data);
};

export const emitUploadSlide = data => {
  console.log('SOCKET emit upload slide', data);
  socket.emit(socketEventTypes.UPLOAD_SLIDE, data);
};