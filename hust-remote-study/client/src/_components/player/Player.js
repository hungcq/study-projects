import React, { Component } from 'react';

import './reset.css';
import './defaults.css';
import './range.css';
import './Player.css';

import ReactPlayer from 'react-player';
import Duration from './Duration';
import { mediaStatusTypes, roomActionTypes } from '../../_constants';
import { emitPerformActionLecture, getUsername } from '../../_utils';
import { doSetNumPages } from '../../_actions';
import { connect } from 'react-redux';
import { accountTypes } from '../../_constants';

const SEEK_MIN = 0.05;

class Player extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };
  stop = () => {
    this.setState({
      url: null,
      playing: false,
    });
  };
  toggleControls = () => {
    const url = this.state.url;
    this.setState({
      controls: !this.state.controls,
      url: null,
    }, () => this.load(url));
  };
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  onEnablePIP = () => {
    console.log('onEnablePIP');
    this.setState({ pip: true });
  };
  onDisablePIP = () => {
    console.log('onDisablePIP');
    this.setState({ pip: false });
  };
  onPlay = () => {
    console.log('onPlay');
    if (this.props.auth.accountType === accountTypes.LECTURER && !this.props.replaying) {
      const data = {
        lectureId: this.props.lectureId,
        actionType: roomActionTypes.CONTROL_MEDIA,
        mediaStatus: mediaStatusTypes.PLAY,
        username: getUsername(this.props.auth),
      };
      emitPerformActionLecture(data);
    }
    this.setState({ playing: true });
  };

  onPause = () => {
    console.log('onPause');
    if (this.props.auth.accountType === accountTypes.LECTURER && !this.props.replaying) {
      this.setState({ playing: false });
      const data = {
        lectureId: this.props.lectureId,
        actionType: roomActionTypes.CONTROL_MEDIA,
        mediaStatus: mediaStatusTypes.PAUSE,
        username: getUsername(this.props.auth),
      };
      emitPerformActionLecture(data);
    }
    this.setState({ playing: false });
  };

  onProgress = state => {
    // console.log('onProgress', state);
    if (this.props.auth.accountType === accountTypes.LECTURER && !this.props.replaying
      && Math.abs(this.state.played - state.played) > SEEK_MIN) {
      const data = {
        lectureId: this.props.lectureId,
        actionType: roomActionTypes.CONTROL_MEDIA,
        mediaTime: state.played,
        username: getUsername(this.props.auth),
      };
      emitPerformActionLecture(data);
    }
    this.setState(state);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('receive props', nextProps);
    const { mediaTime, mediaStatus } = nextProps;
    if (mediaTime !== 0 && mediaStatus !== mediaStatusTypes.STOP && (!this.lastMediaTime || this.lastMediaTime !== mediaTime)) {
      this.player.seekTo(mediaTime);
      this.lastMediaTime = mediaTime;
    }
  }

  onEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  };
  onDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };
  ref = player => {
    this.player = player;
  };

  render() {
    const { volume, muted, pip } = this.state;
    const { url, width, mediaStatus } = this.props;
    return (
      <div className='app'>
        <section className='section'>
          <div style={{
            width: width / 2.1,
            height: width / 3.5,
          }}>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              // played={mediaTime}
              playing={mediaStatus === mediaStatusTypes.PLAY}
              controls={this.props.auth.accountType === accountTypes.LECTURER}
              loop={true}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onEnablePIP={this.onEnablePIP}
              onDisablePIP={this.onDisablePIP}
              onPause={this.onPause}
              onPlay={this.onPlay}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>
        </section>
        {/*<section className='section'>*/}
        {/*  <h2>State</h2>*/}
        {/*  <table>*/}
        {/*    <tbody>*/}
        {/*    <tr>*/}
        {/*      <th>url</th>*/}
        {/*      <td className={!url ? 'faded' : ''}>*/}
        {/*        {(url instanceof Array ? 'Multiple' : url) || 'null'}*/}
        {/*      </td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>playing</th>*/}
        {/*      <td>{mediaStatus === mediaStatusTypes.PLAY ? 'true' : 'false'}</td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>volume</th>*/}
        {/*      <td>{volume.toFixed(3)}</td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>played</th>*/}
        {/*      <td>{played.toFixed(3)}</td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>loaded</th>*/}
        {/*      <td>{loaded.toFixed(3)}</td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>duration</th>*/}
        {/*      <td><Duration seconds={duration}/></td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>elapsed</th>*/}
        {/*      <td><Duration seconds={duration * played}/></td>*/}
        {/*    </tr>*/}
        {/*    <tr>*/}
        {/*      <th>remaining</th>*/}
        {/*      <td><Duration seconds={duration * (1 - played)}/></td>*/}
        {/*    </tr>*/}
        {/*    </tbody>*/}
        {/*  </table>*/}
        {/*</section>*/}
      </div>
    );
  }
}

const mapState = state => state;

const mapDispatch = (dispatch) => ({
  setNumPages: data => dispatch(doSetNumPages(data)),
});

const connectedPlayer = connect(mapState, mapDispatch)(Player);
export { connectedPlayer as Player };