import {tableActionTypes} from '../_constants/index';

import { sortBy } from 'lodash';

const initState = {
  tableData: [],
  itemsPerPage: 10,
  pageNumber: 1,
  isSortReverse: false,
  sortKey: '',
  filterMap: new Map(),
};

export function tableReducer (state = initState, action) {
  switch (action.type) {
    case tableActionTypes.SET_DATA:
      return {
        ...state,
        tableData: [...action.tableData],
        itemsPerPage: action.itemsPerPage,
        pageNumber: 1,
        isSortReverse: false,
        sortKey: '',
        filterMap: new Map(),
      };
    case tableActionTypes.CHANGE_PAGE:
      if (isNaN(action.pageNumber)) {
        return {...state};
      }
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    case tableActionTypes.SORT_ITEM:
      const isSortReverse = state.sortKey === action.sortKey &&
        !state.isSortReverse;
      // can get back to page 1 if necessary
      return {
        ...state,
        isSortReverse,
        sortKey: action.sortKey,
      };
    case tableActionTypes.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        pageNumber: 1,
        itemsPerPage: action.itemsPerPage,
      };
    case tableActionTypes.SET_FILTER:
      return {
        ...state,
        pageNumber: 1,
        filterMap: new Map(state.filterMap).set(action.fieldName,
          {fieldValue: action.fieldValue, filterType: action.filterType}),
      };
    case tableActionTypes.REMOVE_FILTER:
      const newMap = new Map(state.filterMap);
      newMap.delete(action.fieldName);
      return {
        ...state,
        pageNumber: 1,
        filterMap: newMap,
      };
    default:
      return state;
  }
}