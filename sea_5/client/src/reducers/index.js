import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { dataReducer } from './data-reducer';
import { menuReducer } from './menu-reducer';
import { userReducer } from './user-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  menu: menuReducer,
  user: userReducer,
});

export default rootReducer;