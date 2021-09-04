import React, { useEffect, useState } from 'react';
import { Else, If } from '../components/if';
import { RECONNECT_INTERVAL } from '../constants';
import { testConnection } from '../services';
import { Main } from './main';
import { setIntervalAndRun } from './util';

export const App = (({}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const interval = setIntervalAndRun(RECONNECT_INTERVAL * 1000, async () => {
      testConnection().then((conn) => conn !== connected && setConnected(conn));
    });
    return () => clearInterval(interval);
  }, [connected]);

  return (
    <If test={connected}>
      <Main />
      <Else>
        <div className="d-flex">
          <figure className="alert m-5 mb-0 w-100 text-center border-2 alert-danger text-center">
            <blockquote className="blockquote mb-1">
              <p>We were disconnected from the server.</p>
            </blockquote>
            <figcaption>
              Trying to <em>reconnect</em>...
            </figcaption>
          </figure>
        </div>
      </Else>
    </If>
  );
}) as React.FC<{}>;
