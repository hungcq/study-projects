import {ADD_ARTICLE} from "../constants/action-types";

const initialState = {
    articles: [{name: "1918", id: 1},
        {name: "1918", id: 1},
        {name: "1918", id: 1},
        {name: "1918", id: 1}]
};
const rootReducer = function(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload]};
    }
    return state;
};
export default rootReducer;