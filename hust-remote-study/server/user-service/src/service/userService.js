const fs = require('fs');
const { firestore } = require('../config/firestoreConnection');
const { openTok } = require('../config/openTok');

const getCurrentDemoSession = () => {
  const currentSessionId = fs.readFileSync('./src/config/demoTokSession.txt', 'utf8');
  return currentSessionId;
};
const saveCurrentDemoSession = (sessionId) => {
  fs.writeFile('./src/config/demoTokSession.txt', sessionId, (err) => {
    if (err) {
      console.log('saveCurrentDemoSession err', err);
    } else console.log('saveCurrentDemoSession succeeded');
  });
};

const join = async (lectureId, userId, callback) => {
  if (!lectureId) callback({ error: 'Invalid lectureId' });
  else if (!userId) callback({ error: 'Invalid userId' });
  else if (lectureId === 'demo') {
    const currentSessionId = getCurrentDemoSession();
    if (userId === 'teacher') {
      // console.log(currentSessionId);

      // Teacher join lecture => create session
      if (currentSessionId) {
        callback({
          sessionId: currentSessionId.trim(),
          token: openTok.generateToken(currentSessionId.trim(), { role: 'moderator' }),
          role: 'moderator',
        });
      } else {
        openTok.createSession({ mediaMode: 'routed' }, (err, session) => {
          if (err) {
            console.log('createSession', err);
            callback({ error: 'Cannot start lecture' });
          } else {
            saveCurrentDemoSession(session.sessionId);
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
        sessionId: currentSessionId.trim(),
        token: openTok.generateToken(currentSessionId.trim(), { role: 'subscriber' }),
        role: 'subscriber',
      });
    } else callback({ error: 'User not found' });
  } else {
    // const memberDoc = { lectureId, userId };

    // firestore.collection('members')
    //   .add(memberDoc)
    //   .then((ref) => {
    //     memberDoc.id = ref.id;
    //     callback(memberDoc);
    //   })
    //   .catch(() => {
    //     callback({ error: 'Error when joining room' });
    //   });
    callback({ error: 'Lecture not found' });
  }
};

const stream = (lectureId, callback) => {
  if (lectureId === 'demo') {
    callback({ error: 'Lecture found' });
  } else callback({ error: 'Lecture not found' });
};

module.exports = {
  join, stream,
};
