const baseUrl = 'http://api.soict-edu.appspot.com';

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${auth.getAccessToken()}`
});

export const authUrls = {
  login: (username, password, birthday, sessionId) => `${baseUrl}/api?action=login&sessionid=${sessionId}&username=${username}&password=${password}&birthday=${birthday}`,
};

export const myProjectUrls = {
  projectsById: id => `${baseUrl}/api?action=myprojects&studentid=${id}`,
};

export const homePageUrls = {
  appData: `${baseUrl}/api?action=appdata`,
};