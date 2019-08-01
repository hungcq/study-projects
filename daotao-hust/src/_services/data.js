import axios from 'axios';

import { homePageUrls } from './configs/api';

export const DataService = {
  getAppData() {
    return axios({
      method: 'get',
      url: homePageUrls.appData
    });
  },
};