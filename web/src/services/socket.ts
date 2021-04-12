import io from 'socket.io-client';

const socket = io('ws://localhost:1228');

export default socket;
