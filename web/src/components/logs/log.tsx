import React from 'react';
import { getColor } from './util';

export default function Log({ message, level, timestamp }: any) {
  return (
    <div>
      <span className={`pe-3 text-${getColor(level)}`}>{new Date(timestamp).toLocaleTimeString()}</span>
      <span className="text-wrap text-muted mw-100">{message}</span>
    </div>
  );
}
