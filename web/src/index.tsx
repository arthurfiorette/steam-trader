import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { Header } from './header';

ReactDOM.render(
  <>
    <Header />
    <App />
  </>,
  document.getElementById('app')
);
