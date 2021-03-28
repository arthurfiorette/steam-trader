import React, { Fragment } from 'react';
import './app.css';

import Header from './header';
import Main from './main';

export default function () {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
}
