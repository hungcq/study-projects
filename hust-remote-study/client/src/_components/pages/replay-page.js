import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Progress } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import {
  doClearStateReplay,
  doGetLectureInfoReplay,
  doGetStreamsInfoReplay,
  doJoinReplay,
  doLeaveReplay,
  doPerformActionReplay,
  doStartReplay,
  doStopReplay,
} from '../../_actions';
import { ChatBox, LeaveButton, Slide } from '../';
import history from '../../_utils/history';
import {
  liveLectureActionTypes,
  replayConfig,
  routerPaths,
} from '../../_constants';
import { actionService } from '../../_services';
import _ from 'lodash';

const playStatus = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED',
};

class ReplayPage extends Component {
  state = {
    playing: playStatus.STOPPED,
    startTime: 0,
    endTime: 0,
    currentTime: 0,
    videoOpen: true,
  };

  onTogglePlay = () => {
    this.setState((prevState, props) => {
      switch (prevState.playing) {
        case playStatus.PLAYING:
          return {playing: playStatus.PAUSED};
        case playStatus.PAUSED:
          return {playing: playStatus.PLAYING};
        case playStatus.STOPPED:
          this.startLecture();
          return {playing: playStatus.PLAYING};
        default:
          return {playing: playStatus.PLAYING};
      }
    });

  };

  leaveLecture = () => {
    history.push(routerPaths.INDEX);
    this.setState((prevState, props) => {
      return {playing: playStatus.STOPPED};
    });
  };

  startLecture = () => {
    this.props.clearState();
    this.props.getLectureInfo(this.props.match.params.id);
    actionService.getByLectureId(this.props.match.params.id).then(response => {
      this.actionList = response.data;
      this.actionList = _.sortBy(this.actionList, ['timestamp']);
      if (this.actionList.length > 0) {
        this.setState({startTime: this.actionList[0].timestamp});
        this.setState(
          {endTime: this.actionList[this.actionList.length - 1].timestamp});
        this.setState({currentTime: this.actionList[0].timestamp});
      }
      this.interval = setInterval(() => {
        // console.log('update interval', this.state.currentTime);
        if (this.state.playing === playStatus.PLAYING) {
          let removedList = [];
          this.actionList = this.actionList.filter(action => {
            if (action.timestamp <= this.state.currentTime) {
              console.log('athis.state.playingction ts', action.timestamp);
              removedList.push(action);
            }
            return action.timestamp > this.state.currentTime;
          });
          removedList.map(action => {
            switch (action.type) {
              case liveLectureActionTypes.START:
                this.props.start({
                  lectureId: action.lectureId,
                });
                break;
              case liveLectureActionTypes.STOP:
                break;
              case liveLectureActionTypes.JOIN:
                this.props.join({username: action.username});
                break;
              case liveLectureActionTypes.LEAVE:
                this.props.leave({username: action.username});
                break;
              case liveLectureActionTypes.ACT:
                this.props.performAction({
                  ...action.data,
                  timestamp: action.timestamp,
                });
                break;
            }
            return action;
          });
          this.setState((prevState, props) => {
            return {
              currentTime: prevState.currentTime
                + replayConfig.REPLAY_TASK_INTERVAL * replayConfig.REPLAY_SPEED,
            };
          });
        }
        if (this.state.currentTime > this.state.endTime) {
          this.setState((prevState, props) => {
            return {
              currentTime: prevState.endTime,
              playing: playStatus.STOPPED,
            };
          });
          this.props.stop({
            lectureId: '',
          });
          clearInterval(this.interval);
        }
      }, replayConfig.REPLAY_TASK_INTERVAL);
    }).catch(error => {
      console.log(error);
    }).then(() => {
      // always executed
    });
  };

  componentDidMount () {
    this.props.clearState();
    this.props.getLectureInfo(this.props.match.params.id);
    this.props.getStreamsInfo(this.props.match.params.id);
  }

  componentWillUnmount () {
    this.props.clearState();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render () {
    const percent = (this.state.currentTime - this.state.startTime) /
      (this.state.endTime - this.state.startTime) * 100;
    const {
      numPages, currentPage, slideUrl, chatList, documentList,
      mediaStatus, slideType, mediaTime,
    } = this.props.replay;
    // console.log(this.state)

    return (
      <Container fluid>
        <Grid stackable padded>
          {/* <Grid.Column width={4}>
            <Grid.Row>
              <Voice/>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Segment>
              </Segment>
            </Grid.Row>
          </Grid.Column> */}
          <Grid.Column width={16}>
            <Grid stackable>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Slide numPages={numPages}
                             currentPage={currentPage}
                             slideUrl={slideUrl}
                             documentList={documentList}
                             mediaStatus={mediaStatus}
                             slideType={slideType}
                             replaying={true}
                             mediaTime={mediaTime}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Grid>
                        <Grid.Column width={1}>
                          <Button onClick={this.onTogglePlay}
                                  icon={this.state.playing ===
                                  playStatus.PLAYING
                                    ? 'pause'
                                    : 'play'}/>
                        </Grid.Column>
                        <Grid.Column width={15}>
                          <Progress
                            percent={percent}
                            indicating>
                            Playing at: {new Date(
                            this.state.currentTime).toLocaleString()},
                            End at: {new Date(
                            this.state.endTime).toLocaleString()},
                            Current replay speed: {replayConfig.REPLAY_SPEED}x
                          </Progress>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  {
                    this.props.replay.stream
                    && this.props.replay.stream.url
                    && this.state.currentTime <
                    this.props.replay.stream.updatedAt
                      ? (
                        <Grid.Row stretched>
                          <Grid.Column width={16}>
                            <div style={{
                              position: 'fixed',
                              bottom: '10px',
                              right: '10px',
                              zIndex: '999',
                            }}>
                              <Button onClick={() => {
                                this.setState({videoOpen: !this.state.videoOpen});
                              }}>Toggle</Button>
                              <ReactPlayer
                                style={{
                                  border: '1px solid black',
                                  display: this.state.videoOpen ? '' : 'none',
                                }}
                                // url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                width='100%'
                                height='450px'

                                url={this.props.replay.stream.url}
                                playing={this.state.playing === playStatus.PLAYING
                                && this.state.currentTime >
                                this.props.replay.stream.createdAt}
                                pip
                              />
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      )
                      : null
                  }
                </Grid>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid.Row>
                  <ChatBox
                    lectureId={this.lectureId}
                    replaying={true}
                    chatList={chatList}/>
                </Grid.Row>
                <Grid.Row>
                  <LeaveButton onConfirmAction={this.leaveLecture}
                               content="Leave lecture"/>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapState = state => state;

const mapDispatch = (dispatch) => ({
  performAction: data => dispatch(doPerformActionReplay(data)),
  start: data => dispatch(doStartReplay(data)),
  join: data => dispatch(doJoinReplay(data)),
  leave: data => dispatch(doLeaveReplay(data)),
  stop: data => dispatch(doStopReplay(data)),
  getLectureInfo: lectureId => dispatch(doGetLectureInfoReplay(lectureId)),
  clearState: () => dispatch(doClearStateReplay()),
  getStreamsInfo: lectureId => dispatch(doGetStreamsInfoReplay(lectureId)),
});

const connectedReplayPage = connect(mapState, mapDispatch)(ReplayPage);

export { connectedReplayPage as ReplayPage };