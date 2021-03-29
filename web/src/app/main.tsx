import React from 'react';

import InfoBox from '../components/infoBox';
import Logs from '../components/logs';
import Account from '../components/accounts';
import Trades from '../components/trades';

export default function Main() {
  return (
    <main id="main">
      <div className="container h-100 pb-5">
        <Row>
          <Column size="12 col-xl-7 col-xxl-8" title="Trades">
            <Trades />
          </Column>
          <Column size="12 col-md-6 col-xl-5 col-xxl-4" title="Accounts">
            <Account />
          </Column>
          <Column size="12 col-md-6 col-xl-12" title="Logs">
            <Logs />
          </Column>
        </Row>
      </div>
    </main>
  );
}

function Column({ size, title, children }: any) {
  return (
    <div className={`col-${size} mt-3`}>
      <InfoBox title={title}>{children}</InfoBox>
    </div>
  );
}

function Row({ children }: any) {
  return <div className="row mb-4">{children}</div>;
}
