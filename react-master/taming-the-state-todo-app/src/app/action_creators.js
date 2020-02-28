import {FILTER_SET, NOTIFICATION_HIDE, TODO_ADD, TODO_ADD_WITH_NOTIFICATION, TODO_TOGGLE} from "./constants";
import {takeEvery, put} from 'redux-saga/effects';
import {delay} from "redux-saga";

// action creators
function doAddTodo(id, name) {
    return {
        type: TODO_ADD,
        todo: {id, name},
    };
}

export function doAddTodoWithNotification(id, name) {
    return {
        type: TODO_ADD_WITH_NOTIFICATION,
        todo: {id, name},
    };
}

// sagas
export function* watchAddTodoWithNotification() {
    yield takeEvery(TODO_ADD_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleAddTodoWithNotification(action) {
    const {todo} = action;
    const {id, name} = todo;
    yield put(doAddTodo(id, name));
    yield delay(5000);
    yield put(doHideNotification(id));
}

export function doToggleTodo(id) {
    return {
        type: TODO_TOGGLE,
        todo: {id},
    };
}

export function doSetFilter(filter) {
    return {
        type: FILTER_SET,
        filter,
    };
}

export function doHideNotification(id) {
    return {
        type: NOTIFICATION_HIDE,
        id
    };
}
