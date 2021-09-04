import React, { useEffect, useRef, useState } from 'react';
import socket from '../../services/socket';
import { LogJSON } from '../../types';
import { Log } from './log';

export const LogsBox = (({}) => {
  const [logs, setLogs] = useState<LogJSON[]>([]);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('log', (log: LogJSON) => {
      setLogs((logs) => [...logs, log]);
      if (ref.current) {
        const { children } = ref.current;
        children[children.length - 1]?.scrollIntoView({ behavior: 'smooth' });
      }
    });
    return () => setLogs([]);
  }, []);

  return (
    <ul ref={ref} className="list-unstyled">
      {logs.map(({ level, message, timestamp, account }) => (
        <Log {...{ level, message, account, date: new Date(timestamp) }} />
      ))}
    </ul>
  );
}) as React.FC<{}>;
