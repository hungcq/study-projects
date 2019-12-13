import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { doLogin } from '../../_actions';
import './Styles.css';

class LoginPage extends Component {

  handleSubmit = (e) => {
    this.props.login();
  };

  render() {
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }}
              verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='grey' textAlign='center'>
              <Image src='/logo_hust.jpg'/> Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Button fluid size='large'>
                  Login with HUST Account
                </Form.Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>);
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(doLogin()),
});

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(
  LoginPage);

export { connectedLoginPage as LoginPage };