import { useEffect, useState, Fragment } from 'react';
import Trade from './trade';
import socket from '../../services/socket';

export default function Trades() {
  let [trades, setTrades] = useState<JSX.Element[]>([]);

  useEffect(() => {
    socket.on('trade', (trade: any) => {
      if (trades.length >= 50) trades = trades.slice(1, 50);
      trades.push(<Trade trade={trade} />);
      setTrades(trades);
    });
  }, []);

  return <Fragment>{trades}</Fragment>;
}
