/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Main from "./src/components/Main";
import {Provider} from "react-redux";
import store from "./src/store";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}
console.disableYellowBox = true;