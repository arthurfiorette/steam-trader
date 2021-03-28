import Transport from 'winston-transport';
import { Server } from 'socket.io';

export default class SocketTransport extends Transport {
  constructor({ format, level }: any, public server?: Server) {
    super({ format, level });
    this.setMaxListeners(30);
  }

  log(info: any, next: () => void) {
    if (this.server) this.server.emit('log', info);
    if (next) return next();
  }
}