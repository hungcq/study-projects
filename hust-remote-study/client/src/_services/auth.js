import axios from 'axios';
import CryptoJS from 'crypto-js';
import md5 from 'md5';
import {servicePort, serviceUrl, proxyUrl, ssoUrl} from '../_constants';

function hashPassword(username, password) {
  const keymd5 = md5(username + '.' + password);
  const key = CryptoJS.enc.Utf8.parse(keymd5);
  return CryptoJS.DES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

export const authService = {
  loginSSO(tempToken) {
    const loginData = localStorage.getItem('LOGIN_DATA');
    const options = {
      method: 'get',
      url: `${serviceUrl}:${servicePort}/api/users/me`,
      headers: {},
    };
    if (loginData && loginData.accessToken) {
      options.headers.authorization = `bearer ${loginData.accessToken}`;
    }
    if (tempToken) {
      options.url += '?tempToken=' + tempToken;
    }
    return axios(options);
  },

  loginElearning(username, password, lectureId) {
    console.log({
      sessionId: `${username}${new Date().getTime()}`,
      account: username,
      password: hashPassword(username, password),
    });
    const options = {
      method: 'POST',
      url: `${serviceUrl}:${servicePort}/api/users/elearning/${username}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: {
        sessionId: `${username}${new Date().getTime()}`,
        account: username,
        password: hashPassword(username, password),
      }
    };
    return axios(options);
  },

  logoutSSO(ssoToken) {
    const options = {
      method: 'POST',
      url: `${serviceUrl}:${servicePort}/api/users/me/logout`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `bearer ${ssoToken}`
      },
    };
    return axios(options);
  }
};
