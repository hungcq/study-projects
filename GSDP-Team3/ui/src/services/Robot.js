import axios from 'axios';
import { getHeaders, robotUrls } from '../config/api';
import auth from '../utils/auth';

const RobotService = {
  getRobots() {
    return axios({
      method: 'get',
      url: robotUrls.robots,
    });
  },
  createRobot(data) {
    return axios({
      method: 'post',
      url: robotUrls.robots,
      headers: getHeaders(),
      data,
    });
  },
  overrideRobot(data) {
    return axios({
      method: 'post',
      url: robotUrls.robotOverride,
      headers: getHeaders(),
      data,
    });
  },
  sendManual(data) {
    return axios({
      method: 'post',
      url: robotUrls.robotManual,
      headers: getHeaders(),
      data,
    });
  },
  deleteRobot(id) {
    return axios({
      method: 'delete',
      url: robotUrls.robotById(id),
      headers: getHeaders(),
    });
  },
};

export default RobotService;
