export function getColor(level: string) {
  switch (level) {
    case 'warn':
      return 'warning';
    case 'info':
      return 'info';
    case 'debug':
      return 'dark';
    case 'error':
      return 'danger';
    default:
      return 'secondary';
  }
}
