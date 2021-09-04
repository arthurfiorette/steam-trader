import React from 'react';
import { AccountsBox } from '../components/accounts';
import { InfoBoxColumn } from '../components/infoBox';
import { LogsBox } from '../components/logs';
import { TradesBox } from '../components/trades';

export const Main = (({}) => {
  return (
    <div className="container-lg mb-3">
      <div className="row">
        <InfoBoxColumn size="xl-7 col-xxl-8" title="Trades">
          <TradesBox />
        </InfoBoxColumn>
        <InfoBoxColumn size="md-6 col-xl-5 col-xxl-4" title="Accounts">
          <AccountsBox />
        </InfoBoxColumn>
        <InfoBoxColumn size="md-6 col-xl-12" title="Logs">
          <LogsBox />
        </InfoBoxColumn>
      </div>
    </div>
  );
}) as React.FC<{}>;
