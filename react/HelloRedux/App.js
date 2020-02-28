import {Component} from "react";
import store from "./store";
import React from "react";
import {Provider} from "react-redux";
import Main from "./components/Main"


export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}