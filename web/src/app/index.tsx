import React, { Fragment } from 'react';

import Header from '../components/Header';
import Logs from '../components/Logs';
import Accounts from '../components/Logs';
import Trades from '../components/Logs';

import { Container } from 'react-bootstrap';

export default function () {
  return (
    <Fragment>
      <Header />
      <Container></Container>
    </Fragment>
  );
}
