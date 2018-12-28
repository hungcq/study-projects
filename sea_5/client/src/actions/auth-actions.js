import { authActionTypes, localStorageKeys } from '../constants';
import { authService } from '../services';

export const doLogin = (username, password) => {
  return dispatch => authService.login(username, password).then(res => {
    if (res.data.status === 'success') {
      const token = res.data.Authorization;
      localStorage.setItem(localStorageKeys.TOKEN, token);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        token: token,
      });
    }
  }).catch(error => {
    if (error.response) {
      dispatch({
        type: authActionTypes.LOGIN_FAIL,
        error: error.response.data.message,
      });
    }
  });
};

export const doLogout = () => {
  localStorage.removeItem(localStorageKeys.TOKEN);
  return {
    type: authActionTypes.LOGOUT,
  };
};

export const doGetToken = () => {
  const token = localStorage.getItem(localStorageKeys.TOKEN);
  return {
    type: authActionTypes.GET_TOKEN,
    token,
  };
};