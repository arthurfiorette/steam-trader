import { getColor } from './util';

export default function Log({level, message, date }: any) {
  return (
    <li key={date.getTime()}>
      <span className={`pe-3 text-${getColor(level)}`}>{date.toLocaleTimeString()}</span>
      <span className="text-wrap text-muted mw-100">{message}</span>
    </li>
  );
}
