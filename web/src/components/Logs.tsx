import React, { Component, useState, createRef } from 'react';
import io from 'socket.io-client';
import './logs.css';

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
      this.setState({ logs: [...this.state.logs, createLog(msg)] });
    });
  }

  componentDidUpdate() {
    const logger = this.logger.current;
    logger && (logger.scrollTop = logger.scrollHeight);
  }

  render() {
    return (
      <div ref={this.logger} className="logger overflow-y-scroll">
        {this.state.logs}
      </div>
    );
  }
}

function createLog({ message, level, timestamp }: any) {
  return (
    <div className={`log ${getColor(level)} border-bottom border-2`}>
      <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
      {message}
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
