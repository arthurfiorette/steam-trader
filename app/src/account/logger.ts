import winston, { format, transports } from 'winston';
import Account from './account';

const { combine, json, timestamp, colorize, cli } = format;

export default function Logger({options}: Account) {
  return winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    defaultMeta: { username: options.login.username },
    transports: [
      new transports.File({ filename: 'logs/accounts.log' }),
      new transports.Console({ format: combine(colorize(), cli()) })
    ]
  });
}