import history from '../_utils/history';
import { routerPaths, uiActionTypes, menuItems } from '../_constants';

export const doSelectMenuItem = menuItem => {
  return dispatch => {
    dispatch({
      type: uiActionTypes.SELECT_MENU_ITEM,
      menuItem,
    });
    switch (menuItem) {
      case menuItems.HOME:
        history.push(routerPaths.INDEX);
        break;
      case menuItems.ON_GOING_LECTURE_LIST:
      case menuItems.LECTURE_LIST:
        break;
      case menuItems.CREATE_LECTURE:
        history.push(routerPaths.CREATE_LECTURE);
      case menuItems.CLASS_LIST:
      default:
        break;
    }
  };
};