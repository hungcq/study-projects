import {getPlaceList, removePlace} from "../actions";
import React from "react";
import {ActivityIndicator, FlatList, View, StyleSheet} from "react-native";
import ListItem from "./ListItem";
import {connect} from "react-redux";

class MyList extends React.Component {
    componentDidMount() {
        this.props.getPlaceList();
    }
    render() {
        const spinner = this.props.loading ?
            <ActivityIndicator size='large' marginTop={30}/> : null;
        return (
            <View style={styles.container}>
                {spinner}
                <FlatList
                    data={this.props.placeList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>);
    }
    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item, index}) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
            btnTitle="-"
            btnColor="#F44336"
            photoRef={item.photoRef}
            onBtnPressed={() => {
                this.props.removePlace(item);
            }}
        />
    );
    _onPressItem = (index) => {
        const {navigate, state} = this.props.navigation;
        navigate('PlaceDetails', {place: this.props.placeList[index]});
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.dataReducer.loading,
        placeList: state.dataReducer.placeList
    }
};

const ListScreen = connect(mapStateToProps, {removePlace, getPlaceList})(MyList);
export default ListScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 90
    }
});