'use strict';

import {ADD_PLACE, PLACE_AVAILABLE, REMOVE_PLACE} from "../constants";
import {AsyncStorage} from 'react-native'

export function getPlaceList() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, placeList) => {
            if (placeList !== null) {
                dispatch({type: PLACE_AVAILABLE, placeList: JSON.parse(placeList)});
            }
        });
    };
}

export function addPlace(place) {
    return (dispatch) =>
        AsyncStorage.getItem('data', (err, placeList) => {
            if (placeList !== null) {
                placeList = JSON.parse(placeList);
                if (getIndex(placeList, place) === -1) {
                    placeList.unshift(place);
                }
                AsyncStorage.setItem('data', JSON.stringify(placeList), () => {
                    dispatch({type: ADD_PLACE, place: place});
                });
            }
        });
}

export function removePlace(place) {
    return (dispatch) =>
        AsyncStorage.getItem('data', (err, placeList) => {
            if (placeList !== null) {
                placeList = JSON.parse(placeList);
                let index = getIndex(placeList, place);
                if (index !== -1) {
                    placeList.splice(index, 1);
                }
                AsyncStorage.setItem('data', JSON.stringify(placeList), () => {
                    dispatch({type: REMOVE_PLACE, place: place});
                });
            }
        });
}

export function requestPlaceList() {

}

function getIndex(placeList, obj) {
    let cloneList = [...placeList];
    return cloneList.findIndex((place) => place.id === obj.id);
}