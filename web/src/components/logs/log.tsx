import { getColor } from './util';

export default function Log({ log }: any) {
  return (
    <li>
      <span className={`pe-3 text-${getColor(log.level)}`}>{new Date(log.timestamp).toLocaleTimeString()}</span>
      <span className="text-wrap text-muted mw-100">{log.message}</span>
    </li>
  );
}
