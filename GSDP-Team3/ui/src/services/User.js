import axios from 'axios'
import { getHeaders, userUrls } from '../config/api'

const UserService = {
  getUsers () {
    return axios({
      method: 'get',
      headers: getHeaders(),
      url: userUrls.users,
    })
  },
  createUser (data) {
    return axios({
      method: 'post',
      url: userUrls.users,
      headers: getHeaders(),
      data,
    })
  },
  updateUser (id, data) {
    return axios({
      method: 'put',
      url: userUrls.userById(id),
      headers: getHeaders(),
      data,
    })
  },
  deleteUser (id) {
    return axios({
      method: 'delete',
      url: userUrls.userById(id),
      headers: getHeaders(),
    })
  },
}

export default UserService
