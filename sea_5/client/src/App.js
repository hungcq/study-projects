import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { doGetToken } from './actions';
import { Container } from 'semantic-ui-react';
import MyMenu from './components/Menu';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import configStore from './utils/store';
import { menuItems } from './constants';

const store = configStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>

        <Container>
          <MyMenu/>
          <Main/>
        </Container>
      </Provider>
    );
  }
}

class MyMain extends Component {

  componentDidMount () {
    this.props.getToken();
  }

  render () {
    const token = this.props.auth.token;
    const activeMenuItem = this.props.menu.name;
    if (token) {
      switch (activeMenuItem) {
        case menuItems.HOMEPAGE:
          return <Homepage/>;
        case menuItems.PROFILE:
          return <Profile/>;
        default:
          return <Homepage/>;
      }
    } else {
      switch (activeMenuItem) {
        case menuItems.HOMEPAGE:
          return <Homepage/>;
        case menuItems.LOGIN:
          return <Login/>;
        case menuItems.SIGNUP:
          return <Signup/>;
        default:
          return <Homepage/>;
      }
    }
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(doGetToken()),
});

const Main = connect(mapStateToProps, mapDispatchToProps)(MyMain);
export default App;
