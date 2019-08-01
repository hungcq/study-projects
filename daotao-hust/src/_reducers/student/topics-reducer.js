import * as actionType from '../../_constants/student/student-action-types';

const initState = {
  allTopicsList: [],
  isFetching: false,
  page: 1,
  shownTopicsList: [],
  query: '',
  instructor: '',
  category: 'all'
};

const topics = (state = initState, action) => {
  switch (action.type) {
    case actionType.REQUEST_TOPICS_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.RECEIVE_TOPICS_LIST:
      return {
        ...initState,
        allProjectRefList: action.allProjectRefList
      };
    case actionType.CHANGE_TOPICS_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case actionType.CHANGE_TOPICS_PAGE:
      return {
        ...state,
        page: action.page
      };
    case actionType.CHANGE_TOPICS_INSTRUCTOR:
      return {
        ...state,
        instructor: action.instructor
      };
    case actionType.CHANGE_TOPICS_QUERY:
      return {
        ...state,
        query: action.query
      };
    default:
      return state;
  }
};

export default topics;