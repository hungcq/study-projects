import React from "react";
import {Button, Image, Text, TouchableHighlight, View, StyleSheet} from "react-native";
import {API_KEY_3} from "../constants";

export default class ListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    };

    constructor(props) {
        super(props);
    }

    render() {
        const place = this.props.item;
        const photoRef = this.props.photoRef;
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={{uri: getPhotoUrl(photoRef, 100, 100)}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.address}
                            numberOfLines={2}>{place.name}</Text>
                            <Text style={styles.title}
                                  numberOfLines={2}>{place.address}</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                title={this.props.btnTitle}
                                onPress={this.props.onBtnPressed}
                                color={this.props.btnColor}/>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

export function getPhotoUrl(photoRef, width, height) {
    const data = {
        key: API_KEY_3,
        maxwidth: width,
        maxheight: height
    };
    data['photoreference'] = photoRef;

    const queryString = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'https://maps.googleapis.com/maps/api/place/photo?' + queryString;
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    thumb: {
        marginTop: 3,
        width: 80,
        height: 80
    },
    textContainer: {
        paddingLeft: 10,
        width: 220
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 16,
        color: '#656565'
    },
    btnContainer: {
        paddingTop: 40
    }
});