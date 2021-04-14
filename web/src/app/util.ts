export function setIntervalAndRun(ms: number = 0, callback: () => void,) {
  callback();
  return setInterval(callback, ms);
}
