import { authActionTypes, userActionTypes } from '../constants';

const initState = {
  loginFailedReason: '',
  token: null,
};

export function authReducer (state = initState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case authActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginFailedReason: action.error,
      };
    case authActionTypes.GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
      };
    case userActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
