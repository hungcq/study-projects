import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {connect, Provider} from "react-redux";
import uuid from 'uuid/v4';
import {getNotifications, getTodo, getTodosAsIds} from "./app/selectors";
import {doAddTodoWithNotification, doSetFilter, doToggleTodo} from "./app/action_creators";
import store from "./app/store";

function TodoList({ todosAsIds }) {
    return (
        <div>
            {todosAsIds.map(todoId => <ConnectedTodoItem
                key={todoId}
                todoId={todoId}
            />)}
        </div>
    );
}

function mapStateToPropsList(state) {
    return {
        todosAsIds: getTodosAsIds(state),
    };
}

const ConnectedTodoList = connect(mapStateToPropsList)(TodoList);

function TodoItem({todo, ...props}) {
    const {name, id, completed} = todo;
    return (
        <div>
            {name}
            <button
                type="button"
                onClick={() => props.onToggleTodo(id)}
            >
                {completed ? "Incomplete" : "Complete"}
            </button>
        </div>
    );
}

function mapStateToPropsItem(state, props) {
    return {
        todo: getTodo(state, props.todoId)
    };
}

function mapDispatchToPropsItem(dispatch) {
    return {
        onToggleTodo: id => dispatch(doToggleTodo(id)),
    };
}

const ConnectedTodoItem = connect(mapStateToPropsItem, mapDispatchToPropsItem)(TodoItem);

class TodoCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.onCreateTodo = this.onCreateTodo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    onChangeName(event) {
        this.setState({ value: event.target.value });
    }
    onCreateTodo(event) {
        this.props.onAddTodo(this.state.value);
        this.setState({ value: '' });
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onCreateTodo}>
                    <input
                        type="text"
                        placeholder="Add Todo..."
                        value={this.state.value}
                        onChange={this.onChangeName}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToPropsCreate(dispatch) {
    return {
        onAddTodo: name => dispatch(doAddTodoWithNotification(uuid(), name)),
    };
}

const ConnectedTodoCreate = connect(null, mapDispatchToPropsCreate)(TodoCreate);

function Filter({ onSetFilter }) {
    return (
        <div>
            Show
            <button
                type="button"
                onClick={() => onSetFilter('SHOW_ALL')}>
                All</button>
            <button
                type="button"
                onClick={() => onSetFilter('SHOW_COMPLETED')}>
                Completed</button>
            <button
                type="button"
                onClick={() => onSetFilter('SHOW_INCOMPLETED')}>
                Incompleted</button>
        </div>
    );
}

function mapDispatchToPropsFilter(dispatch) {
    return {
        onSetFilter: filterType => dispatch(doSetFilter(filterType)),
    };
}

const ConnectedFilter = connect(null, mapDispatchToPropsFilter)(Filter);

function Notifications({ notifications }) {
    return (
        <div>
            {notifications.map(note => <div key={note}>{note}</div>)}
        </div>
    );
}

function mapStateToPropsNotifications(state, props) {
    return {
        notifications: getNotifications(state),
    };
}
const ConnectedNotifications = connect(mapStateToPropsNotifications)(Notifications);

function TodoApp() {
    return (
        <div>
            <ConnectedFilter />
            <ConnectedTodoCreate />
            <ConnectedTodoList />
            <ConnectedNotifications />
        </div>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);