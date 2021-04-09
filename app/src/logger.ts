import winston, { format, Logger, transports } from 'winston';
import Transport from 'winston-transport';
import SocketTransport from './server/socket/transport';
import { getFileTransport } from './storage/logs';

const { combine, json, timestamp, colorize, cli } = format;

const levelFormat = { level: 'debug', format: combine(timestamp(), json()) };

const socketTransport = new SocketTransport(levelFormat);
const loggers: Logger[] = [];

export default function createLogger(account: string) {
  const logger = _createLogger(
    account,
    getFileTransport(account),
    socketTransport
  );
  loggers.push(logger);
  return logger;
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
