import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../_reducers';
import { createSocketConnection } from './socket';


const initSocketConnection = store => next => action => {
  createSocketConnection(store);
  next(action);
};

const middleWare = applyMiddleware(
  initSocketConnection,
  thunk,
  logger,
);

export default (initState) => {
  return createStore(rootReducer, initState, middleWare);
};