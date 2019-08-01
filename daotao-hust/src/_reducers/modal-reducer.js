import {modalTypes} from "../_constants/modal-types";
import {USE_MODAL} from "../_constants/student/student-action-types";

const initState = {
  modalType: modalTypes.NONE,
};

export function modalReducer(state = initState, action) {
  switch (action.type) {
    case USE_MODAL:
      return {...state, modalType: action.modalType};
    default:
      return state;
  }
}