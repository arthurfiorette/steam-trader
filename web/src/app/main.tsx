import React from 'react';
import './main.css';

import InfoBox from '../components/infoBox';
import { Row, Container } from '../components/bootstrap';

export default function Main() {
  return (
    <main id="main" className="bg-light">
      <Container>
        <Row>
          <ColSm title="Logs" />
          <ColSm title="Accounts" />
        </Row>
        <Row>
          <div className="col-12">
            <InfoBox title="Trades" />
          </div>
        </Row>
      </Container>
    </main>
  );
}

function ColSm({ title }: any) {
  return (
    <div className="col-sm-12 col-md-6">
      <InfoBox title={title} />
    </div>
  );
}
