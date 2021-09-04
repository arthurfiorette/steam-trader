import React, { useEffect, useRef, useState } from 'react';
import socket from '../../services/socket';
import { TradeJSON } from '../../types';
import { Trade } from './trade';

export const TradesBox = (({}) => {
  const [trades, setTrades] = useState<TradeJSON[]>([]);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('trade', (trade: TradeJSON) => {
      setTrades((trades) => [...trades, trade]);
      if (ref.current) {
        const { children } = ref.current;
        children[children.length - 1]?.scrollIntoView({ behavior: 'smooth' });
      }
    });
    return () => setTrades([]);
  }, []);

  return (
    <ul ref={ref}>
      {trades.map((trade) => (
        <Trade trade={trade} key={trade.offerId} />
      ))}
    </ul>
  );
}) as React.FC<{}>;
