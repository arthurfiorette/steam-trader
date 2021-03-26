import React from 'react';
import './main.css';

import InfoBox from '../components/infoBox';
import { Row, Container } from '../components/bootstrap';
import Logs from '../components/logs';
import Account from '../components/accounts';

export default function Main() {
  return (
    <main id="main" className="bg-light">
      <Container>
        <Row>
          <ColSm title="Logs">
            <Logs />
          </ColSm>
          <ColSm title="Accounts">
            <Account />
          </ColSm>
        </Row>
        <Row>
          <div className="col-12">
            <InfoBox title="Trades"></InfoBox>
          </div>
        </Row>
      </Container>
    </main>
  );
}

function ColSm({ title, children }: any) {
  return (
    <div className="col-sm-12 col-lg-6">
      <InfoBox title={title}>{children}</InfoBox>
    </div>
  );
}
