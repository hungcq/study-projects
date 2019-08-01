import * as actionType from '../../_constants/student/student-action-types';

const initState = {
  isFetching: false,
  category: 'all',
  allCourseList: [],
  shownCourseList: [],
  page: 1,
  query: ''
};

const course = (state = initState, action) => {
  switch (action.type) {
    case actionType.REQUEST_COURSE_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.RECEIVE_COURSE_LIST:
      return {
        ...initState,
        allCourseList: action.allCourseList,
        isFetching: false
      };
    case actionType.CHANGE_COURSE_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case actionType.CHANGE_COURSE_QUERY:
      return {
        ...state,
        query: action.query
      };
    case actionType.CHANGE_COURSE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

export default course;