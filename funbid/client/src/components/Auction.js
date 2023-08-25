import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { emitBidEvent } from '../utils/socket';
import { BID_VALUE } from '../constants';
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

class MyAuction extends Component {

  render () {
    const { status } = this.props.data;
    switch (status) {
      case auctionStatus.OPENING:
        return opening(this.props.data, this.props.token, this.props.userInfo);
      case auctionStatus.CLOSED:
        return closed(this.props.data);
      case auctionStatus.WILL_OPEN:
      default:
        return willOpen(this.props.data);
    }
  }
}

const opening = (data, token, userInfo) => (
  <Card>
    <Card.Content header={data.item_name} textAlign="center"/>
    <Card.Content>
      <Image src='/macbook.jpeg'/>
      <Card.Meta textAlign="center">
        <span className='date'>{data.start_price}$ Start price</span>
      </Card.Meta>
      <Card.Header textAlign="center">
        {data.start_price + BID_VALUE * data.number_bid}$
      </Card.Header>
      {
        data.username ?
          <Card.Header textAlign="center">
            <a>{data.username}</a> just bid
          </Card.Header>
          : null
      }
      <Card.Header textAlign="center">
        <Countdown date={Date.now() + data.time_remain * 1000}/>
      </Card.Header>
    </Card.Content>

    <Card.Content extra>
      <Button fluid color='orange' size="large"
              onClick={() => {emitBidEvent(token, data.item_id);}}
              disabled={!token || userInfo.number_bid === 0}>
        BID ({userInfo.number_bid} bids left)
      </Button>
    </Card.Content>
  </Card>
);

const closed = (data) => (
  <Card>
    <Card.Content header={data.item_name} textAlign="center"/>
    <Card.Content>
      <Image src='/macbook.jpeg'/>
      <Card.Meta textAlign="center">
        <span className='date'>{data.start_price}$ Start price</span>
      </Card.Meta>
      <Card.Header textAlign="center">
        {data.start_price + BID_VALUE * data.number_bid}$
      </Card.Header>
      {
        data.username ?
          <Card.Header textAlign="center">
            Winner: <a>{data.username}</a>
          </Card.Header>
          : null
      }
    </Card.Content>

    <Card.Content extra>
      <Button fluid color='orange' size="large"
              disabled={true}>
        BID
      </Button>
    </Card.Content>
  </Card>
);

const willOpen = (data) => (
  <Card>
    <Card.Content header={data.item_name} textAlign="center"/>
    <Card.Content>
      <Image src='/macbook.jpeg'/>
      <Card.Meta textAlign="center">
        <span className='date'>
        Start at {new Date(data.start_time + ' GMT').toLocaleString('en-GB',
          { timeZone: 'Asia/Ho_Chi_Minh' })}
        </span>
      </Card.Meta>
      <Card.Header textAlign="center">
        {data.start_price + BID_VALUE * data.number_bid}$
      </Card.Header>
      <Card.Header textAlign="center">
        <Countdown date={Date.parse(data.start_time  + ' GMT')}/>
      </Card.Header>
    </Card.Content>

    <Card.Content extra>
      <Button fluid color='orange' size="large"
              disabled={true}>
        BID
      </Button>
    </Card.Content>
  </Card>
);

const auctionStatus = {
  OPENING: 'opening',
  CLOSED: 'closed',
  WILL_OPEN: 'will_open',
};

const mapStateToProps = state => ({
  token: state.auth.token,
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = dispatch => ({});

const Auction = connect(mapStateToProps, mapDispatchToProps)(MyAuction);

export default Auction;
