import io from 'socket.io-client';

const socket = io('ws://localhost:1228');

socket.on('connect_error', (err: any) =>
  alert(
    `Oops! Occurred and error and we are disconnected from the app socket: ${err.message}. Make sure you started the all this app correctly.`
  )
);

export default socket;
