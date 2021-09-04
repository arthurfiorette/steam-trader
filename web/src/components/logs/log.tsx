import React from 'react';
import { getColor } from './util';

export const Log = (({ level, message, date, account }) => {
  return (
    <li key={`${date.getTime()}-${message.length}`}>
      <span
        className={`text-${getColor(level)}`}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={level.toUpperCase()}
      >
        {date.toLocaleTimeString()}
      </span>
      <span
        className="ms-3 text-wrap text-muted mw-100"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={account === 'system' ? 'System log' : account}
      >
        {message}
      </span>
    </li>
  );
}) as React.FC<{ level: string; message: string; date: Date; account: string }>;
