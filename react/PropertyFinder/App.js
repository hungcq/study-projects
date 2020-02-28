/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React from 'react';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import {
    StackNavigator,
} from 'react-navigation';
import ItemDetails from "./ItemDetails";

const App = StackNavigator({
    Home: {screen: SearchPage},
    Results: {screen: SearchResults},
    ItemDetails: {screen: ItemDetails},
});
export default App;