import ReactDOM from 'react-dom';

import Header from './header';
import App from './app';

const element = (
  <>
    <Header />
    <App />
  </>
);

ReactDOM.render(element, document.getElementById('app'));
