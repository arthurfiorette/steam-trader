export function getColor(level: string) {
  switch (level) {
    case 'warn':
      return 'warning';
    case 'info':
      return 'info';
    case 'debug':
    case 'http':
      return 'success';
    case 'error':
      return 'danger';
    default:
      return 'dark';
  }
}
