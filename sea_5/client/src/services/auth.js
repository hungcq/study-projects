import axios from 'axios';
import { authUrls, getHeaders } from './configs/api';

export const authService = {
  login (username, password) {
    return axios({
      method: 'post',
      url: authUrls.login(),
      data: {username, password},
    });
  },
  logout (token) {
    return axios({
      method: 'post',
      url: authUrls.logout(),
      headers: getHeaders(token)
    });
  },
};