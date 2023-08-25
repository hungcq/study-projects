import axios from 'axios';
import { getHeaders, userUrls } from './configs/api';

export const userService = {
  register (username, password) {
    return axios({
      method: 'post',
      url: userUrls.register(),
      data: {username, password}
    });
  },
  userList (token) {
    return axios({
      method: 'get',
      url: userUrls.getUserList(),
      headers: getHeaders(token),
    });
  },
  getUserInfo (token) {
    return axios({
      method: 'get',
      url: userUrls.getUserInfo(),
      headers: getHeaders(token),
    });
  },
  buyBid (noBid, token) {
    return axios({
      method: 'post',
      url: userUrls.buyBid(),
      data: {bid: noBid},
      headers: getHeaders(token),
    });
  },
};