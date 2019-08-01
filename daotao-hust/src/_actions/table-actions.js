import { tableActionTypes } from '../_constants/index';

export const doChangePage = pageNumber => ({
  type: tableActionTypes.CHANGE_PAGE,
  pageNumber,
});

export const doSortItem = (sortKey) => ({
  type: tableActionTypes.SORT_ITEM,
  sortKey,
});

export const doSetData = (tableData, itemsPerPage) => ({
  type: tableActionTypes.SET_DATA,
  tableData,
  itemsPerPage,
});

export const doSetItemsPerPage = (itemsPerPage) => ({
  type: tableActionTypes.SET_ITEMS_PER_PAGE,
  itemsPerPage,
});

export const doSetFilter = (fieldName, fieldValue, filterType) => ({
  type: tableActionTypes.SET_FILTER,
  fieldName,
  fieldValue,
  filterType,
});

export const doRemoveFilter = (fieldName) => ({
  type: tableActionTypes.REMOVE_FILTER,
  fieldName,
});