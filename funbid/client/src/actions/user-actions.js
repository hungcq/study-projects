import { localStorageKeys, userActionTypes } from '../constants';
import { userService } from '../services';

export const doRegister = (username, password) => {
  return dispatch => userService.register(username, password).then(res => {
    if (res.data.status === 'success') {
      const token = res.data.Authorization;
      localStorage.setItem(localStorageKeys.TOKEN, token);
      dispatch({
        type: userActionTypes.REGISTER_SUCCESS,
        token: token,
      });
    }
  }).catch(error => {
      if (error.response) {
        dispatch({
          type: userActionTypes.REGISTER_FAIL,
          error: error.response.data.message,
        });
      }
    },
  );
};

export const doGetUserInfo = token => dispatch => {
  userService.getUserInfo(token).then(res => {
    if (res.data) {
      dispatch({
        type: userActionTypes.INFO_CHANGE,
        data: res.data,
      });
    }
  }).catch(error => {
      // dispatch({
      //   type: userActionTypes.REGISTER_FAIL,
      //   error: error.response.data.message,
      // });
    },
  );
};

export const doChangeUserInfo = userInfo => ({
  type: userActionTypes.INFO_CHANGE,
  data: userInfo,
});

export const doBuyBid = (noBids, token) => dispatch => {
  userService.buyBid(noBids, token).then(res => {
    if (res.data) {
      dispatch({
        type: userActionTypes.INFO_CHANGE,
        data: res.data,
      });
    }
  }).catch(error => {
      // dispatch({
      //   type: userActionTypes.REGISTER_FAIL,
      //   error: error.response.data.message,
      // });
    },
  );
};