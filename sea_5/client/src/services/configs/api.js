import { baseUrl } from '../../constants';

export const getHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    // 'Access-Control-Allow-Headers': 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
  };
};

export const authUrls = {
  login: () => `${baseUrl}/auth/login`,
  logout: () => `${baseUrl}/auth/logout`,
};

export const userUrls = {
  register: () => `${baseUrl}/user/register`,
  getUserInfo: () => `${baseUrl}/user`,
  buyBid: () => `${baseUrl}/user/buybid`,
  getUserList: () => `${baseUrl}/user/list`,
};

export const dataUrls = {
  allItems: () => `${baseUrl}/item`,
  itemById: (id) => `${baseUrl}/item/${id}`,
  createItem: () => `${baseUrl}/item/register`,
};