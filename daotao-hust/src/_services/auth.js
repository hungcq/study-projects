import axios from 'axios';
import uuidv1 from 'uuid/v1';

import { hashPassword } from '../_utils/index';
import { authUrls } from './configs/api';

export const AuthService = {
  login(username, password, birthday) {
    if (!birthday) {
      birthday = -1;
    }
    const hashedPassword = hashPassword(username, password);
    return axios({
      method: 'get',
      url: authUrls.login(username, hashedPassword, birthday, uuidv1()),
    });
  },
};