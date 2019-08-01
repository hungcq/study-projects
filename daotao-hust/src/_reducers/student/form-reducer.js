import * as actionType from '../../_constants/student/student-action-types';

const initState = {
  isFetching: false,
  formsList: [],
};

const forms = (state = initState, action) => {
  switch (action.type) {
    case actionType.REQUEST_FORM_LIST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.RECEIVE_FORM_LIST:
      return {
        formsList: action.formsList,
        isFetching: false
      };
    case actionType.CREATE_FORM:
      return {
        formsList: state.formsList.push(action.forms)
      };
    case actionType.CANCEL_FORM:
    default:
      return state;
  }
};

export default forms;