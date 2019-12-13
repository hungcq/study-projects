import axios from 'axios';
import { getHeaders, actionUrl } from './';

export const actionService = {
  getByLectureId(lectureId) {
    return axios({
      method: 'get',
      url: actionUrl.actionsByLectureId(lectureId),
      header: getHeaders.getHeaders(),
    });
  },
};