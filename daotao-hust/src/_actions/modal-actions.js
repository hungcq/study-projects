import { USE_MODAL } from '../_constants/student/student-action-types'

export const doUseModal = modalType => ({
  type: USE_MODAL,
  modalType,
});