import {addArticle} from "../actions/index";
import {Button, Text, TextInput, View} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {Component} from "react";

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
};

class ConnectedForm extends Component {
    constructor() {
        super();

        this.state = {
            text: ""
        };
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        const title = this.state.text;
        const id = 1;
        this.props.addArticle({name: title, id: id});
        this.setState({text: ""});
    };

    _onTextChange = (text) => {
        this.setState({text});
    };

    render() {
        return (
            <View>
                <Text>
                    Title
                </Text>
                <TextInput
                    value={this.state.text}
                    onChangeText={this._onTextChange}
                />
                <Button title="Submit" onPress={this._handleSubmit}/>
            </View>
        )
    }
}

const Form = connect(null, {addArticle})(ConnectedForm);
export default Form;
