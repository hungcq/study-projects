'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';
import {getPhotoUrl} from "./ListItem";

export default class PlaceDetails extends Component {
    static navigationOptions = {
        title: 'Place Details',
    };

    render() {
        const { params } = this.props.navigation.state;
        let place = params.place;
        let name = place.name;
        let address = place.address;

        return (
            <View style={styles.container}>
                <Image style={styles.image}
                       source={{uri: getPhotoUrl(place.photoRef, 400, 400)}} />
                <View style={styles.heading}>
                    <Text style={styles.price}>{name}</Text>
                    <Text style={styles.title}>{address}</Text>
                    <View style={styles.separator}/>
                </View>
                <Text style={styles.description}>{""}</Text>
                <Text style={styles.description}>{""}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0
    },
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: 400,
        height: 300
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        margin: 5,
        color: '#656565'
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    }
});