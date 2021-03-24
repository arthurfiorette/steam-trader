import winston, { format, Logger, transports } from 'winston';
import SocketTransport from './server/socket/transport';
import path from 'path';
import fs from 'fs';

const { combine, json, timestamp, colorize, cli } = format;

function getPath(...paths: string[]) {
  return path.resolve(__dirname, '../../output/logs/', ...paths);
}

// Create the log folder
fs.mkdir(getPath(), (_err) => {});

const levelFormat = { level: 'debug', format: combine(timestamp(), json()) };

export const socketTransport = new SocketTransport(levelFormat);
const loggers: Logger[] = [];

export default function createLogger(filename: string) {
  const logger = _createLogger(filename);
  loggers.push(logger);
  return logger;
}

function _createLogger(filename: string) {
  return winston.createLogger({
    ...levelFormat,
    transports: [
      new transports.Console({ format: combine(colorize(), cli()) }),
      new transports.File({ filename: getPath(filename) }),
      socketTransport
    ]
  });
}

export const logger = createLogger('system');
