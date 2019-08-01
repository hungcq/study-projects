import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../_reducers';

const middleWare = applyMiddleware(
  thunk,
  logger
);

export default (initState) => {
  return createStore(rootReducer, initState, middleWare);
};