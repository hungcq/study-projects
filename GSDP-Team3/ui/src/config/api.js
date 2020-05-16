import auth from '../utils/auth';

const baseUrl = 'http://localhost:5000';

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${auth.getAccessToken()}`,
});

export const authenticationUrls = {
  login: `${baseUrl}/login`,
};

export const robotUrls = {
  robots: `${baseUrl}/robots`,
  robotOverride: `${baseUrl}/robots/override`,
  robotManual: `${baseUrl}/robots/manual`,
  robotById: id => `${baseUrl}/robots/${id}`,
};

export const packetUrls = {
  packets: `${baseUrl}/packets`,
  packetById: (id) => `${baseUrl}/packets/${id}`,
};

export const shelfUrls = {
  shelves: `${baseUrl}/shelves`,
  shelfById: id => `${baseUrl}/shelves/${id}`,
};

export const userUrls = {
  users: `${baseUrl}/users`,
  userById: id => `${baseUrl}/users/${id}`,
};
