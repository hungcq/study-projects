import axios from 'axios';
import { getHeaders, lectureUrl } from './';

export const lectureService = {
  get() {
    return axios({
      method: 'get',
      url: lectureUrl.lectures,
      header: getHeaders.getHeaders(),
    });
  },
  getById(id) {
    return axios({
      method: 'get',
      url: lectureUrl.lectureById(id),
      header: getHeaders.getHeaders(),
    });
  },
  create(obj, file) {
    let formData = new FormData();
    Object.keys(obj)
      .forEach(key => {
        const value = obj[key];
        formData.set(key, value);
      });
    formData.append('slide', file);
    return axios({
      method: 'post',
      url: lectureUrl.lectures,
      header: getHeaders.getMultipartHeaders(),
      data: formData,
    });
  },
  update(id, obj, file) {
    let formData = new FormData();
    Object.keys(obj)
      .forEach(key => {
        const value = obj[key];
        formData.set(key, value);
      });
    formData.append('slide', file);
    return axios({
      method: 'put',
      url: lectureUrl.lectureById(id),
      header: getHeaders.getMultipartHeaders(),
      data: formData,
    });
  },
  addSlide(id, url, file) {
    let formData = new FormData();
    if (url) {
      formData.set('url', url);
    }
    if (file) {
      formData.append('slide', file);
    }
    return axios({
      method: 'put',
      url: lectureUrl.addSlide(id),
      header: getHeaders.getMultipartHeaders(),
      data: formData,
    });
  },
  getTopicInfo(id) {
    return axios({
      method: 'get',
      url: lectureUrl.getTopicInfo(id),
      header: getHeaders.getHeaders(),
    });
  },
};