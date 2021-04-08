import { getColor } from './util';

export default function Log({ level, message, date, account }: any) {
  return (
    <li key={date.getTime()} data-bs-toggle="tooltip" data-bs-placement="top" title={getTooltipTitle(account)}>
      <span className={`pe-3 text-${getColor(level)}`}>{date.toLocaleTimeString()}</span>
      <span className="text-wrap text-muted mw-100">{message}</span>
    </li>
  );
}

function getTooltipTitle(text: string) {
  return text === 'system' ? 'System log' : text;
}
