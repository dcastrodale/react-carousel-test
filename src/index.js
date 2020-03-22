import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

ReactDOM.render(
  <App
    numberOfImages={6}
    query="happy dog"
  />,
document.querySelector('#root'));