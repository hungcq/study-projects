import { dataActionTypes } from '../constants';

const initState = {
  itemList: [],
};

export function dataReducer (state = initState, action) {
  switch (action.type) {
    case dataActionTypes.REQUEST_ALL_ITEMS:
      return {
        ...state,
      };
    case dataActionTypes.RECEIVE_ALL_ITEMS:
      return {
        ...state,
        itemList: action.itemList,
      };
    case dataActionTypes.UPDATE_ITEM:
      const newList = updateItem(state.itemList, action);
      console.log(newList);
      return {
        ...state,
        itemList: newList,
      };
    case dataActionTypes.NEW_ITEM:
      return {
        ...state,
        itemList: [...state.itemList, action.item],
      };
    default:
      return state;
  }
}

function updateItem (list, action) {
  return list.map((item, index) => {
    if (item.item_id !== action.item.item_id) {
      return item;
    }
    return {
      ...item,
      ...action.item,
    };
  });
}