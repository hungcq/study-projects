import { myProjectActionTypes } from '../../_constants';

const initState = {
  loading: true,
};

const studentProjects = (state = initState, action) => {
  switch (action.type) {
    case myProjectActionTypes.GET_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case myProjectActionTypes.GET_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default studentProjects;