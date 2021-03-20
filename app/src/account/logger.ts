import winston, { format, transports } from 'winston';
import Account from './account';
import path from 'path';
import fs from 'fs';

const { combine, json, timestamp, colorize, cli } = format;

const PATH = path.resolve('../../output/logs/accounts.log');

fs.mkdir(PATH, (err) => {} /* Folder already exists */);

export default function Logger({ options }: Account) {
  return winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    defaultMeta: { username: options.login.username },
    transports: [
      new transports.File({ filename: path.resolve(PATH, `${options.login.username}.log`) }),
      new transports.Console({ format: combine(colorize(), cli()) })
    ]
  });
}
