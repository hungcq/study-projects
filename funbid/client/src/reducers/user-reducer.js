import { userActionTypes } from '../constants';

const initState = {
  registerFailedMessage: '',
  userInfo: {
    username: 'username',
    number_bid: 0,
    admin: false,
  },
};

export function userReducer (state = initState, action) {
  switch (action.type) {
    case userActionTypes.REGISTER_SUCCESS:
      console.log('register success');
      return {
        ...state,
      };
    case userActionTypes.REGISTER_FAIL:
      return {
        ...state,
        registerFailedMessage: action.error,
      };
    case userActionTypes.INFO_CHANGE:
      return {
        ...state,
        userInfo: action.data,
      };
    default:
      return state;
  }
}
