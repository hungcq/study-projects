import { sortBy } from 'lodash';
import { filterTypes } from '../_constants/filter-types';

export const getCurrentItems = (tableData, pageNumber, itemsPerPage) => {
  let lastItemIndex = pageNumber * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  if (lastItemIndex > tableData.length) {
    lastItemIndex = tableData.length;
  }
  return tableData.slice(firstItemIndex, lastItemIndex);
};

export const getSortedData = (list, sortKey, isSortReverse) => {
  return isSortReverse ? sortBy(list, sortKey).reverse() : sortBy(list,
    sortKey);
};

export const getFilteredData = (list, filterMap) => {
  return list.filter(item => {
    for (let [key, value] of filterMap.entries()) {
      switch (value.filterType) {
        case filterTypes.MATCH:
          if (!item[key]) {
            return true;
          }
          if (item[key].toString() !== value.fieldValue.toString()) {
            return false;
          }
          break;
        case filterTypes.CONTAIN:
          if (!item[key].toString().toLowerCase().includes(value.fieldValue.toString().toLowerCase())) {
            return false;
          }
          break;
      }
    }
    return true;
  });
};