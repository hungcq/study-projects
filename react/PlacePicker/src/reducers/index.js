'use strict';

import {combineReducers} from 'redux';

import {ADD_PLACE, PLACE_AVAILABLE, REMOVE_PLACE} from "../constants";

let dataState = {placeList: [], loading: true};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            var placeList = [...state.placeList];
            if (getIndex(placeList, action.place) === -1) {
                placeList.unshift(action.place);
            }
            return {...state, ...{placeList: placeList}};
        case PLACE_AVAILABLE:
            return {...state, ...{placeList: action.placeList, loading: false}};
        case REMOVE_PLACE:
            var place = action.place;
            var placeList = [...state.placeList];
            var index = getIndex(placeList, place);
            if (index !== -1) {
                placeList.splice(index, 1);
            }
            return {...state, ...{placeList: placeList}};
        default:
            return state;
    }
};

function getIndex(placeList, obj) {
    let cloneList = [...placeList];
    return cloneList.findIndex((place) => place.id === obj.id);
}

const rootReducer = combineReducers({
    dataReducer
});

export default rootReducer;