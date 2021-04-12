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
  if (socket.disconnected) {
    try {
      const { data } = await ping();
      return data.response === 'Pong';
    } catch (ignore) {
      return false;
    }
  }
  return true;
}

// socket.on('connect_error', (err: any) =>
//   alert(
//     `Oops! Occurred and error and we are disconnected from the app socket: ${err.message}. Make sure you started the all this app correctly.`
//   )
// );
