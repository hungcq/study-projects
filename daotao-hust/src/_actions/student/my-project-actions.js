import { myProjectActionTypes, tableActionTypes } from '../../_constants';
import { MyProjectService } from '../../_services/index';

export const doGetMyProject = (username, itemsPerPage) => {
  return dispatch => MyProjectService.getMyProject(username).then((res) => {
    if (res.data.status === 1) {
      dispatch({
        type: tableActionTypes.SET_DATA,
        tableData: res.data.data,
        itemsPerPage,
      });
    } else {
      dispatch({
        type: myProjectActionTypes.GET_FAIL,
      });
    }
  });
};
