import React, { Component } from 'react';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch,
} from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import configStore from '../_utils/store';
import './App.css';
import studentPage from '../_pages/student/student-page';
import lecturerPage from '../_pages/lecturer/lecturer-page';
import guestPage from '../_pages/guest/guest-page';
import { doGetLoginData, doLogin, doGetAppData } from '../_actions';
import { localStorageKeys } from '../_constants/index';

const store = configStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <div>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

const studentRoute =
  (
    <div>
      <Switch>
        <Route path="*" component={studentPage} />
      </Switch>
    </div>
  );

const lecturerRoute =
  (
    <div>
      <Switch>
        <Route path="*" component={lecturerPage} />
      </Switch>
    </div>
  );

const notLoggedIn =
  (
    <div>
      <Switch>
        <Route path="*" component={guestPage} />
      </Switch>
    </div>
  );

class MyMain extends Component {
  componentDidMount() {
    this.props.getAppData();
    this.props.getLoginData();
  }

  render() {
    const { userInfo, accountType } = this.props.auth;
    return (
      <div>
        {
          userInfo === null || accountType === null
            ? notLoggedIn
            : (
              accountType === 'student'
                ? studentRoute
                : lecturerRoute
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getLoginData: () => dispatch(doGetLoginData()),
  getAppData: () => dispatch(doGetAppData()),
  // login: () => dispatch(doLogin('20142137, hung1996')),
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MyMain);
export default App;
