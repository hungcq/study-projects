var socket = require('socket.io-client')('http://54.169.152.208:80/bid');
socket.on('connect', function () {
  console.log('connected');
});
socket.on('accept', function (data) {
  console.log(JSON.stringify(data));
  socket.emit('joined', {});
});
socket.on('auction', function (data) {
  console.log(JSON.stringify(data));
});
socket.on('joined', function (data) {
  console.log(JSON.stringify(data));
});
socket.on('disconnect', function () {
  console.log('disconnected');
});