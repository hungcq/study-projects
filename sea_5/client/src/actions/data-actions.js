import { dataActionTypes } from '../constants';
import { dataService } from '../services';

export const doGetAllItems = () => (dispatch) => {
  dispatch({
    type: dataActionTypes.REQUEST_ALL_ITEMS,
  });
  dataService.getAllItems().then((res) => {
    if (res.data) {
      dispatch({
        type: dataActionTypes.RECEIVE_ALL_ITEMS,
        itemList: res.data,
      });
    }
  });
};

export const doReceiveAllItems = itemList => ({
  type: dataActionTypes.RECEIVE_ALL_ITEMS,
  itemList,
});

export const doUpdateItem = (data) => ({
  type: dataActionTypes.UPDATE_ITEM,
  item: data,
});

export const doAddItem = (data) => ({
  type: dataActionTypes.NEW_ITEM,
  item: data,
});

export const doBidFail = message => ({
  type: dataActionTypes.BID_FAIL,
  error: message,
});