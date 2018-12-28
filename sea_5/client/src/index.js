import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}