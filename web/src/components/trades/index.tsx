import React, { Component, createRef } from 'react';
import { Item as IItem } from './util';
import Trade from './trade';
import io from 'socket.io-client';

interface LogsState {
  trades: JSX.Element[];
}

export default class Trades extends Component<any, LogsState> {
  socket = io('ws://localhost:1228');

  constructor(props: any) {
    super(props);
    this.state = { trades: [] };
    this.openSocket();
  }

  private openSocket() {
    this.socket.on('trade', (trade: any) => {
      let { trades } = this.state;
      if (trades.length == 50) trades = trades.slice(1, 50);
      trades.push(<Trade trade={trade} />);
      this.setState({ trades });
    });
  }

  render() {
    return this.state.trades;
  }
}
