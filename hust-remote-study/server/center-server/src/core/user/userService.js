const fetch = require('node-fetch');
const { demoCacheClient } = require('../../infrastructure/persistence/demoCache');
const { openTok } = require('../../infrastructure/streaming/opentok/config');
const { SSO_DOMAIN } = require('../../common/config');
// const objectUtils = require('../../common/objectUtil');

const getRecentlyLoggedInUser = (tempToken, callback) => {
  const tempTokenCache = demoCacheClient.getTempToken(tempToken);
  if (tempTokenCache) {
    if (tempTokenCache.createdAt - new Date().getTime() <= 60000) callback(tempTokenCache.data);
    demoCacheClient.setTempToken(tempToken, null);
  } else callback(null);
};

const getUserByOauthToken = (bearerToken, tempToken, callback) => {
  fetch(`${SSO_DOMAIN}/user/me`, {
    method: 'get',
    headers: { Authorization: `bearer ${bearerToken}` },
  })
    .then(response => response.json())
    .then((json) => {
      let userInfo = {};
      try { userInfo = JSON.parse(json.principal); } catch (e) { userInfo = {}; }
      const userAuthInfo = { access_token: bearerToken, user_info: userInfo };
      if (tempToken) {
        demoCacheClient.setTempToken(
          tempToken, { data: userAuthInfo, createdAt: new Date().getTime() },
        );
      }
      callback(userAuthInfo);
    })
    .catch(() => { callback(null); });
};

const joinDemoLectureStream = (lectureId, userId, callback) => {
  console.log('joinDemoLectureStream');
  const currentSessionId = demoCacheClient.getSessionId('demo');
  if (userId === 'teacher') {
    if (currentSessionId) {
      callback({
        sessionId: currentSessionId,
        token: openTok.generateToken(currentSessionId, { role: 'moderator' }),
        role: 'moderator',
      });
    } else {
      openTok.createSession({ mediaMode: 'routed' }, (err, session) => {
        if (err) {
          callback(null);
        } else {
          demoCacheClient.setSessionId('demo', session.sessionId);
          callback({
            sessionId: session.sessionId,
            token: openTok.generateToken(session.sessionId, { role: 'moderator' }),
            role: 'moderator',
          });
        }
      });
    }
  } else if (userId === 'student' && currentSessionId) {
    callback({
      sessionId: currentSessionId,
      token: openTok.generateToken(currentSessionId, { role: 'publisher' }),
      role: 'publisher',
      lectureId: 'demo',
    });
  } else callback(null);
};

const startArchiving = (sessionId, lectureId, time = 0) => {
  if (time > 10) return;
  openTok.startArchive(sessionId, {
    name: `${lectureId}-${new Date().getTime()}`,
    outputMode: 'composed',
  }, (error, archive) => {
    if (error) {
      // console.log(error);
      startArchiving(sessionId, lectureId, time + 1);
    } else {
      // console.log(archive);
      demoCacheClient.setArchiveId(sessionId, archive.id);
    }
  });
};

const stopArchiving = (lectureId) => {
  const currentSessionId = demoCacheClient.getSessionId(lectureId);
  if (currentSessionId) {
    const currentArchiveId = demoCacheClient.getArchiveId(currentSessionId);
    if (currentArchiveId) {
      openTok.stopArchive(currentArchiveId, (error, archive) => {

      });
    }
  }
};

const joinLectureStreamById = (lectureId, userId, callback) => {
  console.log('joinLectureStreamById');
  const currentSessionId = demoCacheClient.getSessionId(lectureId);
  const role = userId === 'teacher' ? 'moderator' : 'publisher';
  if (currentSessionId) {
    if (userId === 'teacher') {
      startArchiving(currentSessionId, lectureId);
    }
    callback({
      sessionId: currentSessionId,
      token: openTok.generateToken(currentSessionId, { role }),
      role,
    });
  } else {
    openTok.createSession({ mediaMode: 'routed' }, (err, session) => {
      if (err) {
        callback(null);
      } else {
        if (userId === 'teacher') {
          startArchiving(session.sessionId, lectureId);
        }
        demoCacheClient.setSessionId(lectureId, session.sessionId);
        callback({
          sessionId: session.sessionId,
          token: openTok.generateToken(session.sessionId, { role }),
          role,
        });
      }
    });
  }
};

const joinLectureStream = (lectureId, userId, callback) => {
  if (!lectureId) callback({ error: 'Invalid lectureId' });
  else if (!userId) callback({ error: 'Invalid userId' });
  else if (lectureId === 'demo') joinDemoLectureStream(lectureId, userId, callback);
  else joinLectureStreamById(lectureId, userId, callback);
};

const loginElearning = (userId, body, callback) => {
  if (userId !== body.account) callback({ error: 'Invalid user' });
  else {
    fetch('https://api-dot-ielts-fighters.appspot.com/api?action=login', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((json) => {
        callback({
          ...json,
          data: {
            ...json.data,
            password: null,
          },
        });
      })
      .catch((e) => {
        callback({ error: e });
      });
  }
};

module.exports = {
  getRecentlyLoggedInUser,
  getUserByOauthToken,
  joinLectureStream,
  stopArchiving,
  loginElearning,
};
