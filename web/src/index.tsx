import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { Header } from './header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <>
    <Header />
    <App />
  </>,
  document.getElementById('app')
);
