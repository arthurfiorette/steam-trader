import { enable } from 'colors';

enable();

export function info(...message: any[]) {
  printAll('INFO', 'green', ...message);
}

export function warn(...message: any[]) {
  printAll('WARN', 'yellow', ...message);
}

export function error(...message: any[]) {
  printAll('ERROR', 'red', ...message);
}

export function log(...message: any[]) {
  printAll('#', undefined, ...message);
}

function printAll(prefix: string, color: string | undefined, ...message: any[]) {
  write(...message);
  message.forEach((msg) => console.log(`[${prefix}]`.blue, color ? msg[color] : msg));
}

export function write(...message: any[]) {
  //TODO: write in the logs only
}

export namespace Ad {
  export function startup() {
    log(
      'This bot was developed by Arthur Fiorette'.white,
      'Visit us on GitHub!'.white,
      'https://github.com/ArthurFiorette/steam-trader'.white,
      '',
      'Loading...'.green
    );
  }
}
