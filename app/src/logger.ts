import winston, { format, transports } from 'winston';
import Transport from 'winston-transport';
import SocketTransport from './server/socket/transport';
import { getFileTransport } from './storage/logs';

const { combine, json, timestamp, colorize, cli } = format;

const levelFormat = { level: 'debug', format: combine(timestamp(), json()) };

const socketTransport = new SocketTransport(levelFormat);

export default function createLogger(account: string) {
  return _createLogger(account, getFileTransport(account), socketTransport);
}

function _createLogger(account: string, ..._transports: Transport[]) {
  return winston.createLogger({
    ...levelFormat,
    defaultMeta: { account },
    transports: [
      new transports.Console({ format: combine(colorize(), cli()) }),
      ..._transports
    ]
  });
}

export const logger = createLogger('system');
export const cleanLogger = _createLogger('system');
