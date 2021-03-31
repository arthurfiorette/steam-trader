import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './header';
import Main from './main';

const element = (
  <Fragment>
    <Header />
    <Main />
  </Fragment>
);

ReactDOM.render(element, document.getElementById('app'));
