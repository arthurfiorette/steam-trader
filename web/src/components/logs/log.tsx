import { getColor } from './util';

export default function Log({ level, message, date, account }: any) {
  return (
    <li key={date.getTime()}>
      <span
        className={`text-${getColor(level)}`}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={level.toUpperCase()}>
        {date.toLocaleTimeString()}
      </span>
      <span
        className="ms-3 text-wrap text-muted mw-100"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={getTooltipTitle(account)}>
        {message}
      </span>
    </li>
  );
}

function getTooltipTitle(text: string) {
  return text === 'system' ? 'System log' : text;
}
