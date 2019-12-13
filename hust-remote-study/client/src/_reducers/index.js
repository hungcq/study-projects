import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { menuReducer } from './menu-reducer';
import { liveLectureReducer } from './live-lecture-reducer';
import { lectureReducer } from './lecture-reducer';
import { replayReducer } from './replay-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  liveLecture: liveLectureReducer,
  lecture: lectureReducer,
  replay: replayReducer
});

export default rootReducer;