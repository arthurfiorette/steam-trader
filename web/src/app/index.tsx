import { useEffect, useState } from 'react';
import If, { Else } from '../components/if';
import Main from './main';
import Unconnected from './unconnected';
import { testConnection } from '../services';
import { RECONNECT_INTERVAL } from '../constants';

export default function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = async () =>
      testConnection().then((conn) => conn !== connected && setConnected(conn));

    connect();

    const interval = setInterval(connect, RECONNECT_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <If test={connected}>
      <Main />
      <Else>
        <Unconnected />
      </Else>
    </If>
  );
}
