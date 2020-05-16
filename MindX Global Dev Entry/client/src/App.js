import React from 'react';
import './App.css';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { routerPaths } from './constants/router-paths';
import history from './utils/history';
import Homepage from './components/pages/home-page';

const routes =
  (
    <Router history={history}>
      <Switch>
        <Route path={routerPaths.INDEX} name='Index' component={Homepage}/>
        <Redirect from='*' to={routerPaths.INDEX}/>
      </Switch>
    </Router>
  );

function App () {
  return (
    routes
  );
}

export default App;
