import { enable } from 'colors';

enable();

function printAll(prefix: string, color: string | undefined, ...message: string[]) {
  message.forEach((msg) => console.log(`[${prefix}]`.blue, color ? msg[color] : msg));
}

export function info(...message: string[]) {
  printAll('INFO', 'green', ...message);
}

export function warn(...message: string[]) {
  printAll('WARN', 'yellow', ...message);
}

export function error(...message: string[]) {
  printAll('ERROR', 'red', ...message);
}

export function log(...message: string[]) {
  printAll('#', undefined, ...message);
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
