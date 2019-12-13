import { accountTypes, authActionTypes } from '../_constants';

const initState = {
  accountType: null,
  loginFailedReason: '',
  userInfo: null,
  accessToken: null,
};

export function authReducer (state = initState, action) {
  switch (action.type) {
    case authActionTypes.LOGOUT:
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        loginFailedReason: '',
      };
    case authActionTypes.GET_LOGIN_DATA:
      let accountType = null;
      if (action.data) {
        if (action.data.studentYear) {
          accountType = accountTypes.STUDENT;
        } else {
          accountType = accountTypes.LECTURER;
        }
        if (action.accessToken === "elearning") {
          accountType = action.accounTypeElearning === 0 ? accountTypes.STUDENT : accountTypes.LECTURER;
        }
      }
      return {
        ...state,
        userInfo: {...action.data},
        accountType: accountType,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
}
