var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let itemList = [];
let item_id = 0;
let mySocket;

app.get('/newItem', function (req, res) {
  itemList = [
    ...itemList,
    {
      item_id: item_id++,
      item_name: 'name' + item_id,
      start_price: 100,
      start_time: Math.floor(Date.now() / 1000) + 20,
      end_time: '',
      time_remain: '',
      username: '',
      number_bid: 0,
      status: 'will_open',
    },
  ];
  res.send(itemList);
});

app.get('/item', (req, res) => {
  res.send(itemList);
});

setInterval(() => {
  itemList.map(item => {
    const timestamp = Math.floor(Date.now() / 1000);
    switch (item.status) {
      case 'will_open':
        if (timestamp >= item.start_time) {
          item.status = 'opening';
          item.time_remain = 100;
          if (mySocket) {
            mySocket.emit('start', item);
          }
        }
        break;
      case 'opening':
        item.time_remain--;
        if (item.time_remain === 0) {
          item.status = 'closed';
          item.end_time = timestamp;
          if (mySocket) {
            mySocket.emit('close', item);
          }
        }
        break;
    }
    return item;
  });
}, 1000);

http.listen(1918, function () {
  console.log('listening on *:1918');
});

io.on('connection', function (socket) {
  mySocket = socket;
  console.log('a user connected');
  socket.emit('auction', itemList);
  socket.on('bid', data => {
    itemList.map(item => {
      if (item.item_id === data.item_id) {
        switch (item.status) {
          case 'closed':
            socket.emit('bid_fail', {
              message: 'item closed'
            });
            break;
          case 'will_open':
            socket.emit('bid_fail', {
              message: 'item not opened yet'
            });
            break;
          case 'opening':
            item.number_bid++;
            item.time_remain = 100;
            item.username = 'hung';
            socket.emit('bid_success', {
              item
            });
            break;
        }
      }
      return item;
    })
  });
});

