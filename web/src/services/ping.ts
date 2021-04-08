import axios from 'axios';

export async function ping() {
  return (await axios({ method: 'GET', url: 'http://localhost:1228/ping' })).data.response === 'Pong';
}
