import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import {filterReducer, notificationReducer, todoReducer} from "./reducers";
import createSagaMiddleware, { delay } from 'redux-saga';
import {watchAddTodoWithNotification} from "./action_creators";

// store
const rootReducer = combineReducers({
    todoState: todoReducer,
    filterState: filterReducer,
    notificationState: notificationReducer
});

const saga = createSagaMiddleware();
const logger = createLogger();

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(saga, logger)
);

saga.run(watchAddTodoWithNotification);

export default store;
