import axios from 'axios';
import { getHeaders, packetUrls, shelfUrls } from '../config/api'
import auth from '../utils/auth';

const PacketService = {
  getPackets() {
    return axios({
      method: 'get',
      url: packetUrls.packets,
    });
  },
  createPacket(data) {
    return axios({
      method: 'post',
      url: packetUrls.packets,
      headers: getHeaders(),
      data,
    });
  },
  updatePacket (id, data) {
    return axios({
      method: 'put',
      url: packetUrls.packetById(id),
      headers: getHeaders(),
      data,
    })
  },
  deletePacket(id) {
    return axios({
      method: 'delete',
      url: packetUrls.packetById(id),
      headers: getHeaders(),
    });
  },
};

export default PacketService;
