import React, { Component, createRef } from 'react';
import io from 'socket.io-client';

interface LogsState {
  logs: JSX.Element[];
}

export default class Logs extends Component<any, LogsState> {
  socket = io('ws://localhost:1228');

  constructor(props: any) {
    super(props);
    this.state = { logs: [] };
    this.openSocket();
  }

  private openSocket() {
    this.socket.on('log', (msg: any) => {
      let { logs } = this.state;
      if (logs.length == 50) logs = logs.slice(1, 50);
      logs.push(createLog(msg));
      this.setState({ logs });
    });
  }

  render() {
    return (
      <div className="logger">
        {this.state.logs}
      </div>
    );
  }
}

function createLog({ message, level, timestamp }: any) {
  return (
    <div>
      <span className={`pe-3 text-${getColor(level)}`}>{new Date(timestamp).toLocaleTimeString()}</span>
      <span className="text-wrap text-muted mw-100">{message}</span>
    </div>
  );
}

function getColor(level: string) {
  switch (level) {
    case 'warn':
      return 'warning';
    case 'info':
      return 'info';
    case 'debug':
      return 'dark';
    case 'error':
      return 'danger';
    default:
      return 'secondary';
  }
}
