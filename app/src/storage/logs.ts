import { transports } from 'winston';
import { resolve } from 'path';
import fs from 'fs/promises';

function getPath(...paths: string[]) {
  return resolve(__dirname, '../../output/logs/', ...paths);
}

// Create the log folder
fs.mkdir(getPath()).catch(() => {});

export function getFileTransport(fileName: string) {
  return new transports.File({
    filename: `${getPath(fileName)}.log`
  });
}
