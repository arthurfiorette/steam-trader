import React from 'react';

import InfoBox from './components/infoBox';
import Logs from './components/logs';
import Accounts from './components/accounts';
import Trades from './components/trades';

export default function Main() {
  return (
    <main id="main">
      <div className="container mb-3">
        <div className="row">
          <InfoBoxColumn size="xl-7 col-xxl-8" title="Trades" Children={Trades} />
          <InfoBoxColumn size="md-6 col-xl-5 col-xxl-4" title="Accounts" Children={Accounts} />
          <InfoBoxColumn size="md-6 col-xl-12" title="Logs" Children={Logs} />
        </div>
      </div>
    </main>
  );
}

function InfoBoxColumn({ size, title, Children }: any) {
  return (
    <section className={`col-12 col-${size} mt-3`}>
      <InfoBox title={title}>
        <Children />
      </InfoBox>
    </section>
  );
}
