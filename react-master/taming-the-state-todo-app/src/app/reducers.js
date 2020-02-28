import {schema, normalize} from 'normalizr';
import {FILTER_SET, NOTIFICATION_HIDE, TODO_ADD, TODO_TOGGLE} from "./constants";

const todos = [
    {id: '1', name: 'Hands On: Redux Standalone with advanced Actions'},
    {id: '2', name: 'Hands On: Redux Standalone with advanced Reducers'},
    {id: '3', name: 'Hands On: Bootstrap App with Redux'},
    {id: '4', name: 'Hands On: Naive Todo with React and Redux'},
    {id: '5', name: 'Hands On: Sophisticated Todo with React and Redux'},
    {id: '6', name: 'Hands On: Connecting State Everywhere'},
    {id: '7', name: 'Hands On: Todo with advanced Redux'},
    {id: '8', name: 'Hands On: Todo but more Features'},
    {id: '9', name: 'Hands On: Todo with Notifications'},
    {id: '10', name: 'Hands On: Hacker News with Redux'},
];

const todoSchema = new schema.Entity('todo');

const normalizedTodos = normalize(todos, [todoSchema]);
const initialTodoState = {
    entities: normalizedTodos.entities.todo,
    ids: normalizedTodos.result,
};

// reducers
export function todoReducer(state = initialTodoState, action) {
    switch (action.type) {
        case TODO_ADD : {
            return applyAddTodo(state, action);
        }
        case TODO_TOGGLE : {
            return applyToggleTodo(state, action);
        }
        default :
            return state;
    }
}

function applyAddTodo(state, action) {
    const todo = {...action.todo, completed: false};
    const entities = {...state.entities, [todo.id]: todo};
    const ids = [...state.ids, action.todo.id];
    return {...state, entities, ids};
}

function applyToggleTodo(state, action) {
    const id = action.todo.id;
    const todo = state.entities[id];
    const toggledTodo = {...todo, completed: !todo.completed};
    const entities = {...state.entities, [id]: toggledTodo};
    return {...state, entities};
}

export function filterReducer(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case FILTER_SET : {
            return applySetFilter(state, action);
        }
        default :
            return state;
    }
}

function applySetFilter(state, action) {
    return action.filter;
}

export function notificationReducer(state = {}, action) {
    switch (action.type) {
        case TODO_ADD :
            return applySetNotifyAboutAddTodo(state, action);
        case NOTIFICATION_HIDE :
            return applyRemoveNotification(state, action);
        default :
            return state;
    }
}

function applySetNotifyAboutAddTodo(state, action) {
    const {name, id} = action.todo;
    return {...state, [id]: 'Todo Created: ' + name};
}

function applyRemoveNotification(state, action) {
    const {[action.id]: notificationToRemove, ...restNotifications,} = state;
    return restNotifications;
}