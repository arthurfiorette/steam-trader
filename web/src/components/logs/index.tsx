import React, { Component, useState, createRef } from 'react';
import io from 'socket.io-client';
import './index.css';

interface LogsState {
  logs: JSX.Element[];
}

export default class Logs extends Component<any, LogsState> {
  logger: React.RefObject<HTMLDivElement> = createRef();
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
      <div ref={this.logger} className="logger overflow-y-scroll">
        <div className="rounded">{this.state.logs}</div>
      </div>
    );
  }
}

function createLog({ message, level, timestamp }: any) {
  return (
    <div className={`log ${getColor(level)} border-bottom border-2`}>
      <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
      <span className="text-wrap text-muted">{message}</span>
    </div>
  );
}

function getColor(level: string) {
  switch (level) {
    case 'warn':
      return 'border-warning';
    case 'info':
      return 'border-info';
    case 'debug':
      return 'border-secondary';
    default:
      return '';
  }
}
