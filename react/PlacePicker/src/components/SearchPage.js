import {API_KEY_3} from "../constants";
import {addPlace} from "../actions";
import React from "react";
import PlaceInfo from "../models/place";
import {ActivityIndicator, AsyncStorage, Button, FlatList, Text, TextInput, View, StyleSheet} from "react-native";
import ListItem from "./ListItem";
import {connect} from "react-redux";

class SearchPage extends React.Component {
    componentDidMount() {
        AsyncStorage.getItem('data', (err, data) => {
            if (data === null) {
                AsyncStorage.setItem('data', JSON.stringify([]));
            }
        });
    }

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large' marginTop={30}/> : null;
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for places!
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged}
                        placeholder='Search via name'/>
                    <Button
                        onPress={this.onSearchButtonPressed}
                        color='#48BBEC'
                        title='Search'
                    />
                </View>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
                <FlatList
                    data={this.state.placeList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item, index}) => {
        item.address = item.formatted_address;
        let photoRef;
        if (typeof item.photos === "undefined") {
            photoRef = "";
        } else photoRef =  item.photos[0].photo_reference;
        return (
            <ListItem
                item={item}
                index={index}
                onPressItem={this._onPressItem}
                btnTitle="+"
                btnColor="#48BBEC"
                photoRef={photoRef}
                onBtnPressed={() => {
                    this.props.addPlace(new PlaceInfo(item.id, item.name, item.formatted_address, photoRef));
                }}
            />
        );
    };

    _onPressItem = (index) => {
        const {navigate, state} = this.props.navigation;
        let item = this.state.placeList[index];
        let placeInfo = new PlaceInfo(item.id, item.name, item.formatted_address, item.photos !== undefined ? item.photos[0].photo_reference : "");
        navigate('PlaceDetails', {place: placeInfo});
    };

    constructor(props) {
        super(props);
        this.state = {
            placeList: [],
            isLoading: false,
            searchString: 'university in hanoi',
            message: ''
        };
    }

    onSearchTextChanged = (event) => {
        this.setState({searchString: event.nativeEvent.text});
    };

    onSearchButtonPressed = () => {
        const url = getPlaceListUrl(this.state.searchString);
        this.fetchUrl(url);
    };

    fetchUrl = (url) => {
        this.setState({isLoading: true});
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({isLoading: false, placeList: json.results});
                if (json.results.length === 0) {
                    this.setState({message: 'No result.'});
                }
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }
}

const SearchScreen = connect(null, {addPlace})(SearchPage);
export default SearchScreen;

function getPlaceListUrl(searchString) {
    const data = {
        key: API_KEY_3
    };
    data['query'] = searchString;

    const queryString = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'https://maps.googleapis.com/maps/api/place/textsearch/json?' + queryString;
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 90
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    }
});