import axios from 'axios';

export default function ping() {
  return axios.get('http://localhost:1228/ping');
}
