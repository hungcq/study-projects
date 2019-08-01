import { authActionTypes } from '../_constants';

const initState = {
  accountType: null,
  loginFailedReason: '',
  userInfo: null,
};

export function authReducer (state = initState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        accountType: action.data.studentYear ? 'student' : 'lecturer',
        userInfo: {
          ...action.data
        },
      };
    case authActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginFailedReason: action.error,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        userInfo: null,
      };
    case authActionTypes.GET_LOGIN_DATA:
      let accountType = null;
      if (action.data) {
        if (action.data.studentYear) {
          accountType = 'student';
        } else {
          accountType = 'lecturer';
        }
      }
      return {
        ...state,
        userInfo: {...action.data},
        accountType: accountType,
      };
    default:
      return state;
  }
}
