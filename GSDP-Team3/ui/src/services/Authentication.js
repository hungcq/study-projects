import axios from 'axios';
import { authenticationUrls } from '../config/api';
import auth from '../utils/auth';

const AuthenticationService = {
  login(data) {
    return axios({
      method: 'post',
      url: authenticationUrls.login,
      data,
    });
  },
};

export default AuthenticationService;
