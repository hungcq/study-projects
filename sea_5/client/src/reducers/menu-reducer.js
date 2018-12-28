import { menuActionTypes } from '../constants/menu-action-types';

const initState = {
  name: '',
};

export function menuReducer (state = initState, action) {
  switch (action.type) {
    case menuActionTypes.CHANGE_MENU_ITEM:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
}
