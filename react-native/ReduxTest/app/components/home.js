'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, TouchableWithoutFeedback
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import {Actions} from 'react-native-router-flux';
import {getQuotes} from "../actions";


var _this;

class Home extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }

    componentDidMount() {
        this.props.getQuotes();
        _this = this;
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                    <ListView enableEmptySections={true}
                              dataSource={this.state.ds.cloneWithRows(this.props.quotes)}
                              renderRow={this.renderRow.bind(this)}/>

                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.removeButton}
                                        underlayColor='#ff7043' onPress={this.removeQuote}>
                        <Text style={{fontSize: 25, color: 'white'}}>-</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableWithoutFeedback onPress={() => this.showOptions(rowData)}>
                <View style={styles.row}>
                    <Text style={styles.description}>
                        {rowData.quote}
                    </Text>
                    <Text style={styles.author}>
                        {rowData.author}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    showOptions(quote) {
        Actions.new_quote({quote: quote, edit: true, title: "Edit Quote"});
    }

    removeQuote = () => {
        if (this.props.quotes.length > 0) {
            _this.props.deleteQuote(this.props.quotes[0].id);
        }
    }
};


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        quotes: state.dataReducer.quotes
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

var styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    row: {
        backgroundColor: "#fff",
        padding: 8 * 2,
        marginBottom: 1
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    quote: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    removeButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 80,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});