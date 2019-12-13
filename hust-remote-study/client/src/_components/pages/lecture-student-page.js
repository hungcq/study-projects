import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid, Segment } from 'semantic-ui-react';
import { doClearState, doGetLectureInfo } from '../../_actions';
import { ChatBox, LeaveButton, Slide, Stream, Voice } from '../';
import { emitLeaveLecture, getUsername } from '../../_utils';
import history from '../../_utils/history';
import { routerPaths } from '../../_constants';
import { confirmAlert } from 'react-confirm-alert';

class LectureStudentPage extends Component {

  cancelReload = () => {
    this.props.setRequestReload(false);
  };

  confirmReload = () => {
    this.props.setRequestReload(false);
    window.location.reload();
  };

  leaveLecture = () => {
    if (this.props.liveLecture.lectureId !== '') {
      history.push(routerPaths.INDEX);
      emitLeaveLecture({
        lectureId: this.props.liveLecture.lectureId,
        username: getUsername(this.props.auth),
      });
    }
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
    const screenSharing = currentState && currentState.meta &&
      currentState.meta.subscriber.screen >
      0;
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
                    <Grid.Column width={16} id="screenSubscriberContainer"/>
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
  getLectureInfo: lectureId => dispatch(doGetLectureInfo(lectureId)),
  clearState: () => dispatch(doClearState()),
});

const connectedLectureStudentPage = connect(mapState, mapDispatch)(
  LectureStudentPage);

export { connectedLectureStudentPage as LectureStudentPage };