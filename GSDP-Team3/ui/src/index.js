import React from 'react';
import ReactDOM from 'react-dom';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Main styles for this application
import './scss/main.scss';
// Containers

import 'semantic-ui-css/semantic.min.css';
import MyContainer from './container';

ReactDOM.render(
  <MyContainer/>
  , document.getElementById('root'),
);
