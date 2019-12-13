const express = require('express');
const uuid = require('uuid/v1');
const fetch = require('node-fetch');
const userService = require('../service/userService');

// const ssoDomain = 'http://localhost:8080';
// const ssoDomain = 'https://hust-sso.appspot.com';
const ssoDomain = 'https://hust-sso.herokuapp.com';
const uiDomain = 'http://localhost:3000';

const router = express.Router();

const demoAuthCache = {};

const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
};

const getUserInfo = (bearerToken, callback) => {
  fetch(`${ssoDomain}/user/me`, {
    method: 'get',
    headers: {
      Authorization: `bearer ${bearerToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      let userInfo = {};
      try {
        userInfo = JSON.parse(json.principal);
      } catch (e) {
        userInfo = {};
      }
      // console.log(userInfo);
      userInfo.roles = {};
      Object.keys(userInfo).forEach((key) => {
        if (userInfo[key] === null
          || userInfo[key] === undefined
          || userInfo[key] === ''
          || (typeof userInfo[key] === 'object' && (userInfo[key].length === 0 || isEmpty(userInfo[key])))
        ) {
          delete userInfo[key];
        }
      });
      callback({
        access_token: bearerToken,
        user_info: userInfo,
      });
    });
};

router.post('/lectures/:lectureId/members', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  userService.join(req.params.lectureId, req.query.userId, data => res.json(data));
});
router.post('/lectures/:lectureId/streams', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  userService.stream(req.params.lectureId, data => res.json(data));
});

router.get('/user/me', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.query.tempToken) {
    const authCache = demoAuthCache[req.query.tempToken];
    if (authCache && new Date().getTime() - authCache.createdAt <= 60000) {
      res.json(authCache.auth);
      delete demoAuthCache[req.query.tempToken];
    } else {
      res.status(401);
    }
    return;
  }
  const { authorization } = req.header;
  if (!authorization) {
    res.send(`${ssoDomain}/oauth/authorize?client_id=demo-client&redirect_uri=http://localhost:3001/api/user/callback&response_type=code&state=123456`);
    // res.redirect(`${ssoDomain}/oauth/authorize?client_id=demo-client&redirect_uri=http://localhost:3001/api/user/callback&response_type=code&state=123456`);
    return;
  }
  const authorizationInfo = authorization.split(',');
  if ((authorizationInfo[0] !== 'Bearer'
    && authorizationInfo[0] !== 'bearer')
    || !authorizationInfo[1]
    || authorizationInfo[1] === '') {
    res.send(`${ssoDomain}/oauth/authorize?client_id=demo-client&redirect_uri=http://localhost:3001/api/user/callback&response_type=code&state=123456`);
    // res.redirect(`${ssoDomain}/oauth/authorize?client_id=demo-client&redirect_uri=http://localhost:3001/api/user/callback&response_type=code&state=123456`);
  } else getUserInfo(authorizationInfo[1], (info) => { res.json(info); });
});

router.get('/user/callback', (req, res) => {
  // console.log('hello');
  res.header('Access-Control-Allow-Origin', '*');
  const { URLSearchParams } = require('url');

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', 'http://localhost:3001/api/user/callback');
  params.append('code', req.query.code);

  const basicAuthBase64 = Buffer.from('demo-client:secret').toString('base64');

  fetch(`${ssoDomain}/oauth/token`, {
    method: 'post',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `basic ${basicAuthBase64}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      getUserInfo(json.access_token, (info) => {
        const authCookie = JSON.stringify(info);
        const tempToken = uuid();
        demoAuthCache[tempToken] = {
          auth: authCookie,
          createdAt: new Date().getTime(),
        };
        // res.cookie('auth', authCookie, { maxAge: 10 * 60 * 1000 });
        res.redirect(`${uiDomain}?tempToken=${tempToken}`);
      });
    });
});

module.exports = {
  mainApiRouter: router,
};
