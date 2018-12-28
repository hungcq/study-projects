import { menuActionTypes } from '../constants';

export const doChangeMenuItem = (name) => {
  return {
    type: menuActionTypes.CHANGE_MENU_ITEM,
    name,
  };
};