import ping from './ping';
import socket from './socket';

export async function checkConnection() {
  try {
    return (await ping()).data.response === 'Pong';
  } catch (err) {
    return false;
  }
}

export async function testConnection() {
  if (!socket.disconnected) return true;
  try {
    const { data } = await ping();
    return data.response === 'Pong';
  } catch (ignore) {
    return false;
  }
}
