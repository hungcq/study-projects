import axios from 'axios';
import { dataUrls, getHeaders } from './configs/api';

export const dataService = {
  getAllItems() {
    return axios({
      method: 'get',
      url: dataUrls.allItems()
    });
  },
  getItemById(id) {
    return axios({
      method: 'get',
      url: dataUrls.itemById(id)
    });
  },
  createItem(name, startPrice, startTs, token) {
    return axios({
      method: 'post',
      url: dataUrls.createItem(),
      headers: getHeaders(token),
      data: {
        name,
        start_price: startPrice,
        start_time: startTs,
      }
    });
  },
};