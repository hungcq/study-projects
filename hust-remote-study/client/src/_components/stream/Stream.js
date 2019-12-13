import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classname';
import { Icon } from "semantic-ui-react";

import './Stream.css';

import { accountTypes } from '../../_constants';

import {
  connectToStreamSession,
  startStream,
  stopStream,
  toggleStreamAudio,
  toggleStreamVideo,
  subscribeToExistedStreams
} from "./streamActions";

class Stream extends Component {
  initState = {
    active: false,
    localAudioEnabled: true,
    localVideoEnabled: true,
  };
  state = { ...this.initState };

  observer = new MutationObserver(function (e) {
    // console.log('MutationObserver', e)
    // if (e[0].removedNodes) console.log(1);
  });

  componentDidUpdate() {
    if (document.getElementById('App-video-container')) {
      this.observer.observe(document.getElementById('App-video-container'), { childList: true });
    }
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      console.log('xyz')
      return "Leaving this page will reset the wizard";
    };
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  componentWillReceiveProps(nextProps) {
    let { auth, stream, liveLecture } = nextProps;
    console.log(liveLecture)

    if (this.props.liveLecture.lectureId !== liveLecture.lectureId && liveLecture.lectureId !== '') {
      if (stream.sessionInfo && stream.sessionInfo.lectureId === liveLecture.lectureId) {
        if (auth && auth.accountType === accountTypes.STUDENT) this.props.subscribeToExistedStreams();
        return;
      }

      if (auth && auth.accountType === accountTypes.LECTURER) {
        this.props.connectToStreamSession('teacher', liveLecture.lectureId || 'demo', accountTypes.LECTURER);
      } else if (auth && auth.accountType === accountTypes.STUDENT) {
        this.props.connectToStreamSession('student', liveLecture.lectureId || 'demo', accountTypes.STUDENT);
      }
    }

    if (nextProps.stream.otCore) {
      const hostConnection = nextProps.stream.connections.find(c => c.permissions.forceDisconnect === 1)
      if (hostConnection) {
        const hostStream = Object.values(nextProps.stream.otCore.state().streams)
          .find(s => s.connection.id === hostConnection.id)
        if (hostStream) this.setState({ active: true })
        // else this.setState({ active: false })
      }
    }
    if (!nextProps.stream.currentState) this.setState({ ...this.initState })
    else if (nextProps.stream.connection.permissions.forceDisconnect === 1) {
      this.setState({ active: true })
    }
  }

  startStream = () => this.props.startStream();

  stopStream = () => this.props.stopStream();

  toggleStreamAudio = () => {
    this.props.toggleStreamAudio(!this.state.localAudioEnabled);
    this.setState({ localAudioEnabled: !this.state.localAudioEnabled });
  };

  toggleStreamVideo = () => {
    this.props.toggleStreamVideo(!this.state.localVideoEnabled);
    this.setState({ localVideoEnabled: !this.state.localVideoEnabled });
  };

  render() {
    const { connected, sessionInfo } = this.props.stream;
    const {
      cameraPublisherClass,
      // screenPublisherClass,
      cameraSubscriberClass
    } = this.getContainerClasses();

    return (
      <div className="App-main" style={{ width: '100%', height: 300, }}>
        <div className="App-video-container" id="App-video-container">
          {!connected && <div>Connecting to session...</div>}
          {this.renderStreamMask()}
          <div
            id="cameraPublisherContainer"
            className={classNames(cameraPublisherClass)}
            style={{ display: sessionInfo && sessionInfo.role === 'publisher' ? 'none' : '' }}
          />
          <div
            id="cameraSubscriberContainer"
            className={classNames(cameraSubscriberClass)}
            style={{ display: sessionInfo && sessionInfo.role === 'moderator' ? 'none' : '' }} />
          {/* {this.renderStreamCamera()} */}
          {/* <div id="screenSubscriberContainer" className={screenSubscriberClass} /> */}
        </div>
        {this.renderStreamControl()}
        {/* <div id="chat" className="App-chat-container" /> */}
      </div>
    );
  }

  renderStreamCamera() {
    const { sessionInfo, connected } = this.props.stream;
    const {
      cameraPublisherClass,
      // screenPublisherClass,
      cameraSubscriberClass
    } = this.getContainerClasses();

    if (!sessionInfo || !connected) return null;
    switch (sessionInfo.role) {
      case 'moderator':
        return (
          <div>
            {/* <div id="cameraPublisherContainer" className={cameraPublisherClass} /> */}
            {/* <div id="cameraSubscriberContainer" className={cameraSubscriberClass} style={{ display: 'none' }} /> */}
          </div>
        )
      case 'publisher':
      case 'subscriber':
        return (
          <div>
            {/* <div id="cameraPublisherContainer" className={cameraPublisherClass} style={{ display: 'none' }} /> */}
            {/* <div id="cameraSubscriberContainer" className={cameraSubscriberClass} /> */}
          </div>
        )
      default:
        return null;
    }
  }

  renderStreamMask() {
    const { sessionInfo, connected } = this.props.stream;
    const { active } = this.state;

    if (active || !sessionInfo || !connected) return null;
    switch (sessionInfo.role) {
      case 'moderator':
        return (
          <div className="App-mask">
            <button className="message button clickable" style={{ cursor: 'pointer' }} onClick={this.startStream}>Start stream</button>
          </div>
        )
      case 'publisher':
      case 'subscriber':
        return (
          <div className="App-mask">
            <button className="message button clickable">No stream available</button>
          </div>
        )
      default:
        return null;
    }
  }

  renderStreamControl() {
    const { sessionInfo } = this.props.stream;
    const {
      localAudioClass,
      localVideoClass,
      localCallClass,
      controlClass,
    } = this.getContainerClasses();

    if (sessionInfo && sessionInfo.role === 'moderator') {
      return (
        <div id="controls" className={controlClass}>
          <div className={localAudioClass} onClick={this.toggleStreamAudio} />
          <div className={localVideoClass} onClick={this.toggleStreamVideo} />
          <div className={localCallClass} onClick={this.stopStream} />
        </div>
      )
    }
    return null;
  }

  getContainerClasses = () => {
    const meta = this.props.stream.currentState && this.props.stream.currentState.meta;
    const { active, localAudioEnabled, localVideoEnabled } = this.state;

    // const sharingScreen = meta ? !!meta.publisher.screen : false;
    const sharingScreen = false;
    const viewingSharedScreen = meta ? meta.subscriber.screen : false;
    let activeCameraSubscribers = meta ? meta.subscriber.camera : 0;
    if (this.props.stream.sessionInfo
      && this.props.stream.sessionInfo.role === 'moderator') activeCameraSubscribers = false;
    const activeCameraSubscribersGt2 = activeCameraSubscribers > 2;
    const activeCameraSubscribersOdd = activeCameraSubscribers % 2;
    // const screenshareActive = viewingSharedScreen || sharingScreen;
    const screenshareActive = false;

    return {
      controlClass: classNames('App-control-container', { hidden: !active }),
      localAudioClass: classNames('ots-video-control circle audio', {
        hidden: !active,
        muted: !localAudioEnabled,
      }),
      localVideoClass: classNames('ots-video-control circle video', {
        hidden: !active,
        muted: !localVideoEnabled,
      }),
      localCallClass: classNames('ots-video-control circle end-call', { hidden: !active }),
      cameraPublisherClass: classNames('video-container', {
        hidden: !active,
        small: !!activeCameraSubscribers || screenshareActive,
        left: screenshareActive,
      }),
      screenPublisherClass: classNames('video-container', { hidden: !active || !sharingScreen }),
      cameraSubscriberClass: classNames('video-container',
        { hidden: !active || !activeCameraSubscribers },
        { 'active-gt2': activeCameraSubscribersGt2 && !screenshareActive },
        { 'active-odd': activeCameraSubscribersOdd && !screenshareActive },
        { small: screenshareActive },
      ),
      screenSubscriberClass: classNames('video-container',
        { hidden: !viewingSharedScreen || !active }),
    };
  };
}

const mapState = state => ({
  stream: state.liveLecture.stream,
  auth: state.auth,
  liveLecture: state.liveLecture
});

const connectedStream = connect(
  mapState,
  { connectToStreamSession, startStream, stopStream, toggleStreamAudio, toggleStreamVideo, subscribeToExistedStreams }
)(Stream);
export { connectedStream as Stream };