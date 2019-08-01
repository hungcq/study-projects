import { AuthService } from '../_services';
import { authActionTypes, localStorageKeys } from '../_constants';

export const doLogin = (username, password, birthday) => {
  return dispatch => AuthService.login(username, password, birthday)
    .then((res) => {
      if (res.data.status === 1) {
        localStorage.setItem(localStorageKeys.LOGIN_DATA, JSON.stringify(res.data.data));

        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          data: res.data.data,
        });
      } else {
        dispatch({
          type: authActionTypes.LOGIN_FAIL,
          error: res.data.data,
        });
      }
    });
};

export const doLogout = () => {
  localStorage.removeItem(localStorageKeys.LOGIN_DATA);
  return {
    type: authActionTypes.LOGOUT,
  };
};

export const doGetLoginData = () => {
  const loginData = localStorage.getItem(localStorageKeys.LOGIN_DATA);
  return {
    type: authActionTypes.GET_LOGIN_DATA,
    data: JSON.parse(loginData),
  };
};