import { lectureActionTypes } from '../_constants';
import { lectureService } from '../_services';
import { NotificationManager } from 'react-notifications';

export const doFetchLectures = (limit, page) => dispatch => {
  lectureService.get(limit, page)
    .then(response => {
      dispatch({
        type: lectureActionTypes.FETCH_SUCCESS,
        data: {
          lectureList: response.data,
        },
      });
    })
    .catch(error => {
    NotificationManager.error(JSON.stringify(error));
      console.log(JSON.stringify(error));
    })
    .then(() => {
      // always executed
    });
};