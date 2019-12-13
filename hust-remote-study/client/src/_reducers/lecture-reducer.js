import { lectureActionTypes, lectureStatus, liveLectureActionTypes } from '../_constants';

const initState = {
  lectureList: [],
};

export function lectureReducer(state = initState, action) {
  switch (action.type) {
    case liveLectureActionTypes.START:
      return {
        ...state,
        lectureList: state.lectureList.map(item => {
          if (item.id === action.data.lectureId) {
            return {
              ...item,
              status: lectureStatus.ON_GOING,
            };
          }
          return item;
        }),
      };
    case liveLectureActionTypes.STOP:
      return {
        ...state,
        lectureList: state.lectureList.map(item => {
          if (item.id === action.data.lectureId) {
            return {
              ...item,
              status: lectureStatus.FINISHED,
            };
          }
          return item;
        }),
      };
    case lectureActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        lectureList: action.data.lectureList,
      };
    default:
      return state;
  }
}
