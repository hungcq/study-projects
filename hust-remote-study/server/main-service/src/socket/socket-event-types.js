const socketEventTypes = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  LOGGED_IN: 'logged-in',
  LOGGED_OUT: 'logged-out',
  START: 'start',
  STOP: 'stop',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  ACTION: 'action'
};
module.exports = {
  socketEventTypes
};