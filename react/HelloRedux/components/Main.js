/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Button, FlatList,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import store from '../store/index'
import {addArticle} from "../actions/index";
import {connect, Provider} from "react-redux";
import Form from "./Form";


type Props = {};
class Main extends Component<Props> {

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item, index}) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
    };

    render() {
        console.log(this.props.articles);
        return (
                <View style={styles.container}>
                    <FlatList
                        data={this.props.articles}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <Form/>
                </View>
        );
    }
}

const mapStateToProps = state => {
    return {articles: state.articles};
};
export default connect(mapStateToProps)(Main);

class ListItem extends React.PureComponent {
    _onPress = () => {

    };

    render() {
        const item = this.props.item;
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
