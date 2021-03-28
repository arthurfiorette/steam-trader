import React from 'react';
import './main.css';

import InfoBox from '../components/infoBox';
import Logs from '../components/logs';
import Account from '../components/accounts'
import Trades from '../components/trades';

export default function Main() {
  return (
    <main id="main" className="bg-light">
      <div className="container-fluid h-100 mt-3">
        <Row>
          <Column size="sm-12 col-lg-6" title="Logs">
            <Logs />
          </Column>
          <Column size="sm-12 col-lg-6" title="Accounts">
            <Account />
          </Column>
          <Column size="12" title="Trades">
            <Trades />
          </Column>
        </Row>
      </div>
    </main>
  );
}

function Column({ size, title, children }: any) {
  return (
    <div className={`col-${size}`}>
      <InfoBox title={title}>{children}</InfoBox>
    </div>
  );
}

function Row({ children }: any) {
  return <div className="row mb-4">{children}</div>;
}
