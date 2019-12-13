const tempToken = {};

const sessionId = {};

const archiveId = {};

const demoCacheClient = {
  getSessionId(key) {
    return sessionId[key];
  },
  setSessionId(key, value) {
    if (!value) delete sessionId[key];
    else sessionId[key] = value;
  },
  getTempToken(key) {
    return tempToken[key];
  },
  setTempToken(key, value) {
    if (!value) delete tempToken[key];
    else tempToken[key] = value;
  },
  getArchiveId(key) {
    return tempToken[key];
  },
  setArchiveId(key, value) {
    if (!value) delete tempToken[key];
    else tempToken[key] = value;
  },
};

module.exports = {
  demoCacheClient,
};
