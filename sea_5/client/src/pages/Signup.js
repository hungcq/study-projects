import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { doRegister } from '../actions';
import { doChangeMenuItem } from '../actions/menu-actions';
import { menuItems } from '../constants';
import './Styles.css';
import connect from 'react-redux/es/connect/connect';

class MySignup extends Component {
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    const {username, password} = this.state;
    if (username !== null && password !== null) {
      this.props.signup(username, password);
    }
  };

  render () {
    return (
      <div className='signup-form'>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png'/> Signup for FunBid
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  name='username'
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={this.handleChange}
                />
                <Form.Input
                  name='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large'>
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a id='clickable' onClick={() => this.props.goToLogin()}>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  signup: (username, password) => dispatch(doRegister(username, password)),
  goToLogin: () => dispatch(doChangeMenuItem(menuItems.LOGIN)),
});

const Signup = connect(mapStateToProps, mapDispatchToProps)(MySignup);

export default Signup;
