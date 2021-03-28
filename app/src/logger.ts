import winston, { format, Logger, transports } from 'winston';
import Transport from 'winston-transport';
import SocketTransport from './server/socket/transport';
import path from 'path';
import fs from 'fs';

const { combine, json, timestamp, colorize, cli } = format;

function getPath(...paths: string[]) {
  return path.resolve(__dirname, '../output/logs/', ...paths);
}

// Create the log folder
fs.open(getPath(), 'w', () => {});

const levelFormat = { level: 'debug', format: combine(timestamp(), json()) };

export const socketTransport = new SocketTransport(levelFormat);
const loggers: Logger[] = [];

export default function createLogger(filename: string) {
  const logger = _createLogger(new transports.File({ filename: `${getPath(filename)}.log` }), socketTransport);
  loggers.push(logger);
  return logger;
}

function _createLogger(..._transports: Transport[]) {
  return winston.createLogger({
    ...levelFormat,
    transports: [new transports.Console({ format: combine(colorize(), cli()) }), ..._transports]
  });
}

export const logger = createLogger('system');
export const cleanLogger = _createLogger();