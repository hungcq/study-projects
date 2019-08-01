import { studentMenuItems } from '../_constants/student/student-menu-items';
import { SELECT_MENU_ITEM } from '../_constants/student/student-action-types';

const initState = {
  activeMenuItem: studentMenuItems.USER_PROJECT,
};

export function menuReducer(state = initState, action) {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return { ...state, activeMenuItem: action.menuItem };
    default:
      return state;
  }
}