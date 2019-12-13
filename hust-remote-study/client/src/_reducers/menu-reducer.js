import { menuItems, uiActionTypes } from '../_constants';

const initState = {
  activeMenuItem: menuItems.HOME,
};

export function menuReducer(state = initState, action) {
  switch (action.type) {
    case uiActionTypes.SELECT_MENU_ITEM:
      return { ...state, activeMenuItem: action.menuItem };
    default:
      return state;
  }
}