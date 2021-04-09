import Transport from 'winston-transport';
import { io } from '../index';

export default class SocketTransport extends Transport {
  constructor({ format, level }: any) {
    super({ format, level });
    this.setMaxListeners(30);
  }

  log(info: any, next: () => void) {
    io.emit('log', info);
    return next?.();
  }
}
