import { useEffect, useState,  useRef } from 'react';
import Trade from './trade';
import socket from '../../services/socket';

export default function Trades() {
  const [trades, setTrades] = useState<JSX.Element[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('trade', (trade: any) => {
      setTrades((trades) => [...trades, <Trade trade={trade} />]);
      console.log(trade)
      if (ulRef.current) {
        const { children } = ulRef.current;
        children[children.length - 1]?.scrollIntoView({behavior:'smooth'});
      }
    });
  }, []);

  return <ul ref={ulRef}>{trades}</ul>;
}
