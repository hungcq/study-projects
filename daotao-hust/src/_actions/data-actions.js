import { DataService } from '../_services';

export const doGetAppData = () => (dispatch) => {
  DataService.getAppData()
    .then((res) => {
      if (res.data.status === 1) {
        dispatch({
          type: 'RECEIVE_APP_DATA',
          appData: res.data.data,
        });
      }
    });
};