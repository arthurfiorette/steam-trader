import { cleanLogger as logger } from './logger';

function log(...msg: string[]) {
  msg.forEach((msg) => logger.info(msg));
  logger.info('');
}

export function startup() {
  log(
    'This app was developed by Arthur Fiorette',
    'Visit us on GitHub!',
    'https://github.com/ArthurFiorette/steam-trader'
  );
}

export function listening(port: any) {
  log(
    `We started at port '${port}'`,
    'If you are using docker-compose you only need',
    'to wait the web service starts itself.',
    'If not, you are able to start it now.'
  );
}
