import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from '../utils/history';
import auth from '../utils/auth';
import { Container, Grid } from 'semantic-ui-react';
// Pages
import Login from '../pages/Login';
import Main from '../pages/Main';
import Robot from '../pages/Robot';
import Order from '../pages/Order';
import Packet from '../pages/Packet';
import Shelf from '../pages/Shelf';
import Sensor from '../pages/Sensor';
import Manual from '../pages/Manual';
import User from '../pages/User';
import MyMenu from '../components/Menu';
import Stream from '../components/Stream';

class MyContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isAuth: auth.isAuth(),
    };
  }

  componentDidMount () {
    this.removeAuthListener = auth.addListener(
      () => this.setState({isAuth: auth.isAuth()}));
  }

  componentWillUnmount () {
    this.removeAuthListener();
  }

  render () {
    if (!this.state.isAuth) {
      return (
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/login" name="Login" component={Login}/>
              <Redirect from="/" to="/login"/>
            </Switch>
          </div>
        </Router>
      );
    }
    return (
      <Router history={history}>
        <Container>
          <MyMenu/>
          <Grid colums={2}>
            <Grid.Column width={6}>
              <Stream/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Switch>
                {/*<Route path="/main" name="Main" component={Main}/>*/}
                <Route path="/robot" name="Robot" component={Robot}/>
                {/*<Route path="/order" name="Order" component={Order}/>*/}
                <Route path="/packet" name="Packet" component={Packet}/>
                <Route path="/shelf" name="Shelf" component={Shelf}/>
                {/*<Route path="/sensor" name="Sensor" component={Sensor}/>*/}
                <Route path="/manual" name="Manual" component={Manual}/>
                <Route path="/user" name="User" component={User}/>
                <Redirect from="/" to="/robot"/>
              </Switch>
            </Grid.Column>
          </Grid>

        </Container>
      </Router>
    );
  }
}

export default MyContainer;
