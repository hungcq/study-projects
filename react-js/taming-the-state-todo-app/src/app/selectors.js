// filters
const VISIBILITY_FILTERS = {
    SHOW_COMPLETED: item => item.completed,
    SHOW_INCOMPLETED: item => !item.completed,
    SHOW_ALL: item => true,
};

// selectors
export function getTodosAsIds(state) {
    return state.todoState.ids
        .map(id => state.todoState.entities[id])
        .filter(VISIBILITY_FILTERS[state.filterState])
        .map(todo => todo.id);
}

export function getTodo(state, todoId) {
    return state.todoState.entities[todoId];
}

export function getNotifications(state) {
    return getArrayOfObject(state.notificationState);
}

export function getArrayOfObject(object) {
    return Object.keys(object).map(key => object[key]);
}