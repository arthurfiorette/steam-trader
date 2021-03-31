import { useEffect, useState, useRef } from 'react';
import Log from './log';
import socket from '../../services/socket';

export default function Logs() {
  const [logs, setLogs] = useState<JSX.Element[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('log', (log: any) => {
      setLogs((logs) => [...logs, <Log log={log} />]);
    });
  }, []);

  useEffect(() => {
    if (ulRef.current) {
      const { children } = ulRef.current;
      children[children.length - 1]?.scrollIntoView();
    }
  }, [logs]);

  return (
    <ul ref={ulRef} className="list-unstyled">
      {logs}
    </ul>
  );
}
