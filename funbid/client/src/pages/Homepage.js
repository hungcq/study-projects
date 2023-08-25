import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Auction from '../components/Auction';
import { doGetAllItems, doGetUserInfo } from '../actions';
import connect from 'react-redux/es/connect/connect';

class MyHomepage extends Component {

  componentDidMount () {
    if (this.props.auth.token) {
      this.props.getUserInfo(this.props.auth.token);
    }
  }

  render () {
    const data = this.props.data.itemList;
    return (
      <div>
        <Card.Group>
          {data.map(item => (
            <Auction key={item.item_id} data={item}>
            </Auction>
          ))}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getAllItems: () => dispatch(doGetAllItems()),
  getUserInfo: (token) => dispatch(doGetUserInfo(token)),
});

const Homepage = connect(mapStateToProps, mapDispatchToProps)(MyHomepage);

export default Homepage;
