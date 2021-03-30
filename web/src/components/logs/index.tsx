import React, { useEffect, useState, Fragment } from 'react';
import Log from './log';
import socket from '../../services/socket';

export default function Logs() {
  let [logs, setLogs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    socket.on('log', (log: any) => {
      if (logs.length >= 50) logs = logs.slice(1, 50);
      logs.push(<Log log={log} />);
      setLogs(logs);
    });
  }, []);

  return <Fragment>{logs}</Fragment>;
}
