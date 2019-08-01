import { SELECT_MENU_ITEM } from '../_constants/student/student-action-types'

export const doSelectMenuItem = menuItem => ({
  type: SELECT_MENU_ITEM,
  menuItem,
});