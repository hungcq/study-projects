import io from 'socket.io-client';
import {
  doAddItem,
  doBidFail,
  doChangeUserInfo,
  doReceiveAllItems,
  doUpdateItem,
} from '../actions';
import { socketUrl } from '../constants';

let isConnecting;
let socket;

export const createSocketConnection = (store) => {
  if (!isConnecting) {
    socket = io(socketUrl);
    isConnecting = true;

    socket.on('connect', () => {
      console.log('SOCKET connect success');
      // isConnecting = true;
    });

    socket.on('accept', data => {
      socket.emit('joined', {});
    });

    socket.on('auction', data => {
      store.dispatch(doReceiveAllItems(data));
    });

    socket.on('update-item', data => {
      store.dispatch(doUpdateItem(data));
      console.log('SOCKET update item');
    });

    socket.on('new_item', data => {
      store.dispatch(doAddItem(data));
      console.log('SOCKET add item');
    });

    socket.on('disconnect', () => {
      isConnecting = false;
      console.log('SOCKET disconnect');
    });

    socket.on('bid_fail', data => {
      store.dispatch(doBidFail(data.message));
    });

    socket.on('bid_success', data => {
      console.log(data);
      if (data.item) {
        store.dispatch(doUpdateItem(data.item));
        console.log('SOCKET bid success update item');
      }
      if (data.user) {
        store.dispatch(doChangeUserInfo(data.user));
        console.log('SOCKET bid success update user info');
      }
    });

    socket.on('start', data => {
      store.dispatch(doUpdateItem(data));
      console.log('SOCKET start auction');
    });

    socket.on('close', data => {
      store.dispatch(doUpdateItem(data));
      console.log('SOCKET close auction');
    });
  }
};

export const emitBidEvent = (token, itemId) => {
  console.log('SOCKET emit bid', { token, itemId });
  socket.emit('bid', { token, item_id: itemId });
};