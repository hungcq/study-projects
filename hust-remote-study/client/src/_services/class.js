import axios from 'axios';
import { getHeaders, classUrl } from './';

export const classService = {
  getById(id) {
    return axios({
      method: 'get',
      url: classUrl.classesById(id),
      header: getHeaders.getHeaders(),
    });
  },
  getByTeacherId(teacherId) {
    return axios({
      method: 'get',
      url: classUrl.classesByTeacherId(teacherId),
      header: getHeaders.getHeaders(),
    });
  },
  getByStudentId(id) {
    return axios({
      method: 'get',
      url: classUrl.classesByStudentId(id),
      header: getHeaders.getHeaders(),
    });
  },
};