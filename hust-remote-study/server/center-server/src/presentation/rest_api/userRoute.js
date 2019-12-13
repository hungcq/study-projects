const express = require('express');
const uuid = require('uuid/v1');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const userService = require('../../core/user/userService');
const { SSO_DOMAIN, UI_DOMAIN, SERVER_DOMAIN } = require('../../common/config');

const router = express.Router();

router.post('/elearning/:id', (req, res) => {
  userService.loginElearning(req.params.id, req.body, (data) => {
    res.json(data);
  });
});

router.get('/me', (req, res) => {
  if (req.query.tempToken && req.query.tempToken !== '') {
    userService.getRecentlyLoggedInUser(req.query.tempToken, (user) => {
      if (!user) res.status(401).json({ error: 'Invalid user' });
      else res.json(user);
    });
  } else if (!req.header.authorization) {
    res.send(`${SSO_DOMAIN}/oauth/authorize?client_id=demo-client&redirect_uri=${SERVER_DOMAIN}/api/users/callback&response_type=code&state=${uuid()}`);
  } else {
    const authorizationInfo = req.header.split(',');
    if (authorizationInfo[0].toLowerCase() !== 'bearer' || !authorizationInfo[1]) {
      res.send(`${SSO_DOMAIN}/oauth/authorize?client_id=demo-client&redirect_uri=${SERVER_DOMAIN}/api/users/callback&response_type=code&state=${uuid()}`);
    } else {
      userService.getUserByOauthToken(authorizationInfo[1], null, (info) => {
        if (!info) res.status(401).status({ error: 'Invalid user' });
        else res.json(info);
      });
    }
  }
});

router.post('/me/logout', (req, res) => {
  fetch(`${SSO_DOMAIN}/logout`, {
    method: 'get',
    headers: { Authorization: `${req.headers.authorization}` },
  })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      res.json({});
    });
});

router.get('/callback', (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', `${SERVER_DOMAIN}/api/users/callback`);
  params.append('code', req.query.code);

  fetch(`${SSO_DOMAIN}/oauth/token`, {
    method: 'post',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `basic ${Buffer.from('demo-client:secret').toString('base64')}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      const tempToken = uuid();
      userService.getUserByOauthToken(json.access_token, tempToken, () => {
        res.redirect(`${UI_DOMAIN}?tempToken=${tempToken}`);
      });
    });
});

router.post('/:id/lectures', (req, res) => {
  userService.joinLectureStream(req.query.lectureId, req.params.id, (data) => {
    if (!data) res.status(404).send({ error: 'Cannot join lecture' });
    else res.json(data);
  });
});

module.exports = { router };
