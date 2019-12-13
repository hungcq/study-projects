import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid, Segment } from 'semantic-ui-react';
import {
  doClearState,
  doGetLectureInfo,
  doRequestReload,
} from '../../_actions';
import { ChatBox, LeaveButton, Slide, Stream, Voice } from '../';
import { emitStopLecture } from '../../_utils';
import history from '../../_utils/history';
import { routerPaths } from '../../_constants';
import { confirmAlert } from 'react-confirm-alert';

class LectureLecturerPage extends Component {

  cancelReload = () => {
    this.props.setRequestReload(false);
  };

  confirmReload = () => {
    this.props.setRequestReload(false);
    window.location.reload();
  };

  stopLecture = () => {
    history.push(routerPaths.INDEX);
    console.log(this.props.liveLecture.lectureId);
    emitStopLecture({
      lectureId: this.props.match.params.id,
    });
  };

  componentDidMount () {
    this.props.clearState();
    this.lectureId = this.props.match.params.id;
    this.props.getLectureInfo(this.lectureId);
  }

  componentWillUnmount () {
    this.props.clearState();
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const {requestReload} = nextProps.liveLecture;
    if (requestReload) {
      confirmAlert({
        title: 'Confirm',
        message: 'There is a problem connecting to the server. Reload the page?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.confirmReload(),
          },
          {
            label: 'No',
            onClick: () => this.cancelReload(),
          },
        ],
      });
    }
  }

  render () {
    const {stream: {currentState}} = this.props.liveLecture;
    const screenSharing = currentState && currentState.meta
      && currentState.meta.publisher.screen > 0;
    const {
      numPages, currentPage, slideUrl, chatList, requestReload,
      documentList, mediaStatus, slideType, mediaTime,
    } = this.props.liveLecture;
    return (
      <Container fluid>
        <Grid stackable padded>
          <Grid.Column width={4}>
            <Grid.Row>
              <Voice/>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Segment>
                <Stream/>
              </Segment>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid stackable>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Row style={{display: !screenSharing && 'none'}}>
                    <Grid.Column width={16} id="screenPublisherContainer"/>
                  </Grid.Row>
                  <Grid.Row style={{display: !!screenSharing && 'none'}}>
                    <Grid.Column width={16}>
                      <Slide numPages={numPages}
                             currentPage={currentPage}
                             slideUrl={slideUrl}
                             lectureId={this.lectureId}
                             documentList={documentList}
                             mediaStatus={mediaStatus}
                             slideType={slideType}
                             replaying={false}
                             mediaTime={mediaTime}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid.Row>
                  <ChatBox
                    lectureId={this.lectureId}
                    replaying={false}
                    chatList={chatList}/>
                </Grid.Row>
                <Grid.Row>
                  <LeaveButton onConfirmAction={this.stopLecture}
                               content="Stop lecture"/>
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
  getLectureInfo: lectureId => dispatch(doGetLectureInfo(lectureId)),
  setRequestReload: reload => dispatch(doRequestReload(reload)),
  clearState: () => dispatch(doClearState()),
});

const connectedLectureLecturerPage = connect(mapState, mapDispatch)(
  LectureLecturerPage);

export { connectedLectureLecturerPage as LectureLecturerPage };