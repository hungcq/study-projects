import axios from 'axios'
import { getHeaders, shelfUrls } from '../config/api'

const ShelfService = {
  getShelves () {
    return axios({
      method: 'get',
      url: shelfUrls.shelves,
    })
  },
  createShelf (data) {
    return axios({
      method: 'post',
      url: shelfUrls.shelves,
      headers: getHeaders(),
      data,
    })
  },
  updateShelf (id, data) {
    return axios({
      method: 'put',
      url: shelfUrls.shelfById(id),
      headers: getHeaders(),
      data,
    })
  },
  deleteShelf (id) {
    return axios({
      method: 'delete',
      url: shelfUrls.shelfById(id),
      headers: getHeaders(),
    })
  },
}

export default ShelfService;
