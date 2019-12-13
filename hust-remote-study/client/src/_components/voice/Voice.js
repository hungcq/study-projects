import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Grid, Header, Icon, List, Segment } from 'semantic-ui-react';
import { toggleStudentAudio, publishVoiceChat } from '../stream/streamActions';
import { accountTypes, roomActionTypes } from '../../_constants';
import { emitPerformActionLecture, getUsername } from '../../_utils';

class VoiceChat extends Component {
  onClickVoiceChatButton = (ownAudioEnabled, isModerator, item, audioEnabled) => {
    console.log('audioEnabled', audioEnabled);
    if (isModerator) {
      this.props.toggleStudentAudio(!audioEnabled, item);
    } else if (ownAudioEnabled) this.props.publishVoiceChat();
  };

  closeAll = () => {
    const data = {
      lectureId: this.props.liveLecture.lectureId,
      actionType: roomActionTypes.CLOSE_ALL,
      username: getUsername(this.props.auth),
    };
    emitPerformActionLecture(data);
  };

  raiseHand = () => {
    const data = {
      lectureId: this.props.liveLecture.lectureId,
      actionType: roomActionTypes.RAISE_HAND,
      username: getUsername(this.props.auth),
    };
    emitPerformActionLecture(data);
  };

  render() {
    const { stream: { connections, connection, streamConnections } } = this.props.liveLecture;
    const studentNameCount = {}
    let studentList = connections
      .sort((a, b) => b.permissions.forceDisconnect - a.permissions.forceDisconnect)
      .map(c => {
        let name = Object.keys(streamConnections).find(username => {
          return streamConnections[username].includes(c.id)
        })
        if (name) {
          console.log(streamConnections)
          if (studentNameCount[name]) {
            name = `${name} - ${studentNameCount[name]}`;
            studentNameCount[name] += 1;
          } else studentNameCount[name] = 1;
        }
        return {
          ...c,
          username: name
        }
      });

    return (
      <Segment>
        <Header>Audio Conference</Header>
        <Divider />
        <Grid padded='horizontally'>
          <Grid.Row height={14}>
            <List animated verticalAlign='middle' style={style.audioList}>
              {studentList.map((item, index) => {
                const audioEnabled = item && !!item.audioEnabled;
                const ownAudioEnabled = audioEnabled && connection && connection.id === item.id;
                const isModerator = connection && connection.permissions.forceDisconnect === 1;
                return (
                  <List.Item key={index}>
                    <List.Content floated='right'>
                      {
                        item.permissions.forceDisconnect === 1
                          ? (
                            <Button size='tiny' icon disabled>
                              <Icon name='home' />
                            </Button>
                          )
                          : (
                            <Button
                              size='tiny'
                              icon
                              disabled={!isModerator}
                              onClick={() => this.onClickVoiceChatButton(ownAudioEnabled, isModerator,
                                item, audioEnabled)}
                            >
                              <Icon name={audioEnabled ? 'unmute' : 'mute'} />
                            </Button>
                          )
                      }
                    </List.Content>
                    {
                      connection && item.id === connection.id
                        ? (
                          <Icon name='user' size='big' />
                        ) : (
                          <Icon name='user circle' size='big' />
                        )
                    }
                    <List.Content>
                      <List.Header as='a'>{item.username}</List.Header>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Grid.Row>
          <Divider />
          <Grid.Row height={2}>
            {this.props.auth.accountType === accountTypes.LECTURER ?
              <div>
                <Button icon='hand paper outline' primary compact onClick={this.closeAll} />
                Close all
              </div>
              :
              <div>
                <Button icon='hand paper outline' primary compact onClick={this.raiseHand} />
                Raise hand
              </div>
            }
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const style = {
  audioList: {
    overflow: 'auto',
    maxHeight: '20em',
    minHeight: '20em',
  },
};

const mapState = state => state;

const mapDispatch = (dispatch) => ({});

const connectedVoiceChat = connect(mapState, {
  toggleStudentAudio,
  publishVoiceChat,
})(VoiceChat);

export { connectedVoiceChat as Voice };