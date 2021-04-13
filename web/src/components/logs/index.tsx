import { useEffect, useState, useRef } from 'react';
import Log from './log';
import socket from '../../services/socket';

export default function Logs() {
  const [logs, setLogs] = useState<JSX.Element[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('log', (log: any) => {
      const { level, message, timestamp, account } = log;
      const date = new Date(timestamp);
      setLogs((logs) => [
        ...logs,
        <Log
          level={level}
          message={message}
          account={account}
          date={date}
          key={date.getTime()}
        />
      ]);
    });
    return () => setLogs([]);
  }, []);

  useEffect(() => {
    if (ulRef.current) {
      const { children } = ulRef.current;
      children[children.length - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <ul ref={ulRef} className="list-unstyled">
      {logs}
    </ul>
  );
}
