import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default class ItemDetails extends Component {
    static navigationOptions = {
        title: 'Details',
    };

    render() {
        const {params} = this.props.navigation.state;
        console.log(params);
        const details = params.details;
        const price = details.price_formatted.split(' ')[0];
        return (
            <View>
                <Image style={styles.image} source={{uri: details.img_url}}/>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.title}  numberOfLines={1}>{details.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    image: {
        width: 400,
        height: 300
    },

    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});