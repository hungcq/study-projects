import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import studentReducer from './student/index';
import { menuReducer } from './menu-reducer';
import { modalReducer } from './modal-reducer';
import { tableReducer } from './table-reducer';
import { dataReducer } from './data-reducer';

const rootReducer = combineReducers({
  student: studentReducer,
  auth: authReducer,
  menu: menuReducer,
  modal: modalReducer,
  table: tableReducer,
  data: dataReducer
});

export default rootReducer;