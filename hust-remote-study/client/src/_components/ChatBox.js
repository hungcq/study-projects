import React from 'react';
import { Button, Divider, Form, Header, List, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { roomActionTypes } from '../_constants';
import { emitPerformActionLecture, getUsername } from '../_utils';
import _ from 'lodash';

class ChatBox extends React.Component {

  state = {
    text: '',
  };

  onChange = (e, { value }) => {
    if (!value.includes('\n')) {
      this.setState({
        text: value,
      });
    }
  };

  onSubmit = (e) => {
    const { text } = this.state;
    if (text !== '') {
      this.setState({
        text: '',
      });
      // let data;
      // if (text === '/raisehand') {
      //   data = {
      //     lectureId: this.props.liveLecture.lectureId,
      //     actionType: roomActionTypes.CHAT,
      //     content: 'just raised hand.',
      //     username: getUsername(this.props.auth),
      //     type: 'action',
      //   };
      // } else {
      //   data = {
      //     lectureId: this.props.liveLecture.lectureId,
      //     actionType: roomActionTypes.CHAT,
      //     content: text,
      //     type: 'text',
      //     username: getUsername(this.props.auth),
      //   };
      // }

      const data = {
        lectureId: this.props.lectureId,
        actionType: roomActionTypes.CHAT,
        content: text,
        // type: 'text',
        username: getUsername(this.props.auth),
      };
      emitPerformActionLecture(data);
    }
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    const { chatList, replaying } = this.props;
    return (
      <Segment>
        <Header>
          Chat
        </Header>
        <Divider/>
        {/*<Grid padded='horizontally'>*/}
        {/*<Grid.Row height={12}>*/}
        <List verticalAlign='middle' style={style.chatList}>
          {_.orderBy(chatList, ['timestamp'], ['desc'])
            .map(item => {
                // if (item.type === 'text') {
                return (
                  <List.Item key={item.username + '_' + item.timestamp}>
                    <List.Icon name='user'/>
                    <List.Content>
                      <a href='#'>{item.username}</a>: {item.content}
                    </List.Content>
                  </List.Item>
                );
                // } else {
                //   return (
                //     <List.Item key={item.username + '_' + item.timestamp}>
                //       <List.Icon name='user'/>
                //       <List.Content>
                //         <List.Header as='a' href='#'>{item.username}</List.Header>
                //         <List.Description>
                //           {item.content}
                //         </List.Description>
                //       </List.Content>
                //     </List.Item>
                //   );
                // }
              },
            )}
        </List>
        {/*</Grid.Row>*/}
        <Divider/>
        {/*<Grid.Row height={4}>*/}
        {/*  <Grid>*/}
        {replaying
          ?
          null
          :
          <Form onSubmit={this.onSubmit} onKeyPress={this.onKeyPress}>
            <Form.Group>
              <Form.TextArea
                rows={1}
                placeholder='Send a message'
                width={14}
                onChange={this.onChange}
                value={this.state.text}
              />
              <Button
                width={2}
                size='mini' type='submit'>
                Chat
              </Button>
            </Form.Group>
          </Form>
        }
        {/*</Grid>*/}
        {/*</Grid.Row>*/}
        {/*</Grid>*/}
      </Segment>
    );
  }
}

const style = {
  chatList: {
    overflow: 'auto',
    maxHeight: '29em',
    minHeight: '29em',
  },
};

const mapState = state => state;

const mapDispatch = (dispatch) => ({});

const connectedChatBox = connect(mapState, mapDispatch)(ChatBox);
export { connectedChatBox as ChatBox };