import axios from 'axios';
import { myProjectUrls } from '../configs/api';

export const MyProjectService = {
  getMyProject(username) {
    return axios({
      method: 'get',
      url: myProjectUrls.projectsById(username)
    });
  },
};