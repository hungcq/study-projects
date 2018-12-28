import React, { Component } from 'react';
import { Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { doBuyBid, doGetUserInfo } from '../actions';
import connect from 'react-redux/es/connect/connect';

class MyProfile extends Component {

  state = {
    noBids: 10,
  };

  componentDidMount () {
     this.props.getUserInfo(this.props.auth.token);
  }

  handleChange = (e) => {
    this.setState({noBids: e.target.value});
  };

  handleClickBuy = (e) => {
    this.props.buyBid(this.state.noBids, this.props.auth.token);
  };

  render () {
    const userInfo = this.props.user.userInfo;
    return (
      <div className='profile-form'>
        <Grid textAlign='center' style={{ height: '100%' }}
              verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png'/> Account Details
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' readOnly
                            value={userInfo.username}/>
                <Form.Input
                  fluid
                  label='Bids left'
                  readOnly
                  value={userInfo.number_bid}
                />
                <Form.Input
                  fluid
                  label='Buy Bids'
                  placeholder='Number of bids'
                  type='number'
                  action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'cart',
                    content: 'Buy',
                    onClick: this.handleClickBuy,
                  }}
                  value={this.state.noBids}
                  onChange={this.handleChange}
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  buyBid: (noBids, token) => dispatch(doBuyBid(noBids, token)),
  getUserInfo: (token) => dispatch(doGetUserInfo(token)),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(MyProfile);

export default Profile;
