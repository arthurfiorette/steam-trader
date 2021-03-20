function log(...msg: string[]) {
  msg.forEach(console.log);
}

export function startup() {
  log(
    'This app was developed by Arthur Fiorette',
    'Visit us on GitHub!',
    'https://github.com/ArthurFiorette/steam-trader',
    '',
    'Loading...'
  );
}
