import fs from 'fs/promises';
import { resolve } from 'path';
import { transports } from 'winston';

function getPath(...paths: string[]) {
  return resolve(__dirname, '../../output/logs/', ...paths);
}

// Create the log folder
fs.mkdir(getPath()).catch(() => {});

function getDate(fileName: string) {
  return fileName !== 'system'
    ? ''
    : `-${new Date().toLocaleDateString().replace(/\//gi, '')}`;
}

export function getFileTransport(fileName: string) {
  return new transports.File({
    filename: `${getPath(fileName)}${getDate(fileName)}.log`
  });
}
