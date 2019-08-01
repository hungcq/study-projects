import * as actionType from '../../_constants/student/student-action-types';

const initState = {
  allProjectRefList: [],
  isFetching: false,
  page: 1,
  shownProjectRefList: [],
  query: '',
  semester: '20172',
  category: 'all'
};

const projectRef = (state = initState, action) => {
  switch (action.type) {
    case actionType.REQUEST_PROJECT_REF_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.RECEIVE_PROJECT_REF_LIST:
      return {
        ...initState,
        allProjectRefList: action.allProjectRefList
      };
    case actionType.CHANGE_PROJECT_REF_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case actionType.CHANGE_PROJECT_REF_PAGE:
      return {
        ...state,
        page: action.page
      };
    case actionType.CHANGE_PROJECT_REF_SEMESTER:
      return {
        ...state,
        semester: action.semester
      };
    case actionType.CHANGE_PROJECT_REF_QUERY:
      return {
        ...state,
        query: action.query
      };
    default:
      return state;
  }
};

export default projectRef;