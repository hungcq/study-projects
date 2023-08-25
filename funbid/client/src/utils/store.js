import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import { createSocketConnection } from './socket';

const initSocketConnection = store => next => action => {
  createSocketConnection(store);
  next(action);
};

export default (initState) => {
  return createStore(rootReducer, initState,
    applyMiddleware(
      thunk,
      logger,
      initSocketConnection,
    ));
};