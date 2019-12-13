import axios from 'axios';
import AccCore from 'opentok-accelerator-core';
import 'opentok-solutions-css';
import 'opentok-annotation';
import 'opentok-screen-sharing';
import { servicePort, serviceUrl, streamConfig } from '../../_constants';
import { emitJoinStream, getUsername } from '../../_utils';


export const connectToStreamSession = (userId, lectureId, userType) => (dispatch, getState) => {
  axios({
    method: 'POST',
    url: `${serviceUrl}:${servicePort}/api/users/${userId}/lectures?lectureId=${lectureId}`,
  })
    .then((res) => {
      dispatch({
        type: 'RECEIVE_STREAM_SESSION_INFO',
        sessionInfo: res.data
      })

      const otCoreOptions = getOTCoreOptions(res.data.sessionId, res.data.token, userType.toLowerCase());
      const otCore = new AccCore(otCoreOptions);
      dispatch({
        type: 'INIT_OPEN_TOK_CORE',
        otCore,
        otCoreOptions
      })

      otCore.connect().then(() => {
        dispatch({
          type: 'CONNECT_OPEN_TOK_SESSION'
        })
        subscribeToStreamEvents(otCore, dispatch, getState);
        dispatch(subscribeToExistedStreams(otCore));
      });
    });
}

export const startStream = () => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (otCore) {
    otCore.startCall().then(data => {
      dispatch({
        type: 'START_STREAM',
        currentState: data
      });
    })
  }
}

export const stopStream = () => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (otCore) {
    otCore.endCall();
    dispatch({ type: 'STOP_STREAM' });
  }
}

export const toggleStreamAudio = (nextState) => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (otCore) otCore.toggleLocalAudio(nextState);
}

export const toggleStreamVideo = (nextState) => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (otCore) otCore.toggleLocalVideo(nextState);
}

export const publishVoiceChat = (nextState) => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (otCore) {
    const streams = Object.values(otCore.state().streams);
    console.log(otCore.state());
    streams.forEach(stream => {
      console.log(stream)
    })
    otCore.endCall()
    setTimeout(() => {
      otCore.startCall({ publishVideo: false }).then(data => {
        dispatch({
          type: 'START_STREAM',
          currentState: data
        });
      })
    }, 1000);

  }
}

export const subscribeToExistedStreams = (otCore) => (dispatch, getState) => {
  console.log('subscribeToExistedStreams enter', getState().liveLecture.stream)
  if (!getState().liveLecture.stream) {
    return;
  }
  if (!otCore) otCore = getState().liveLecture.stream.otCore;
  console.log('subscribeToExistedStreams otCore', otCore)
  if (!otCore) return;

  const streams = Object.values(otCore.state().streams);
  console.log('subscribeToExistedStreams streams', Object.values(otCore.state().streams))
  streams.forEach(stream => {
    try {
      cameraPublisherContainerCheck(getState)
      cameraSubscriberContainerCheck(getState)
      otCore.subscribe(stream, { insertMode: 'replace' }, (x) => { console.log(x) })
        .then(d => console.log(d))
        .catch(e => console.log(e));
    } catch (e) {
      console.log('subscribeToExistedStreams error', e)
    }
  })
}

export const toggleStudentAudio = (nextState, connection) => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;
  if (!otCore) return;

  // Object.values(otCore.state().streams).forEach(stream => {
  //   if (stream.connection.id === connection.id) {
  //     console.log('force unpub')
  //     otCore.forceUnpublish(stream)
  //       .then(d => console.log('d', d))
  //       .catch(e => console.log('e', e))
  //   }
  // })
  otCore.signal('toggleStudentAudio', { ...connection, audioEnabled: nextState })
    .then(error => {
      if (!error) {
        dispatch({
          type: 'TOGGLE_STUDENT_AUDIO',
          audioEnabled: nextState,
          connection
        })
      } else {
        console.log('Error in toggleStudentAudio', error)
      }
    })
}

const subscribeToStreamEvents = (otCore, dispatch, getState) => {
  const events = [
    'subscribeToCamera',
    'unsubscribeFromCamera',
    'subscribeToScreen',
    'unsubscribeFromScreen',
    'startScreenShare',
    'endScreenShare',
  ];

  events.forEach(event => otCore.on(event, (data) => {
    console.log(event, data)
    dispatch({
      type: 'UPDATE_STREAM',
      currentState: data
    });
  }));

  otCore.on('streamCreated', (data) => {
    console.log('streamCreated', data);
    try {
      cameraPublisherContainerCheck(getState)
      cameraSubscriberContainerCheck(getState)
      otCore.subscribe(data.stream, { insertMode: 'replace' }, (x) => { console.log(x) })
        .then(d => console.log(d))
        .catch(e => console.log(e));
    } catch (e) {
      console.log('streamCreated subscribe error', e)
    }
  })

  otCore.on('signal', (event) => {
    console.log('signal', event)
    if (event.type === 'signal:toggleStudentAudio') {
      const connection = JSON.parse(event.data)
      dispatch({
        type: 'ADD_OPEN_TOK_CONNECTION',
        connection
      });
      console.log(getState().auth.accountType)
      if (getState().auth.accountType === 'STUDENT' && getState().liveLecture.stream.connection.id === connection.id) {
        if (connection.audioEnabled) {
          if (getState().liveLecture.stream.permissionsGranted) {
            console.log('1')
            otCore.toggleLocalAudio(true)
          } else {
            console.log('2')
            otCore.startCall({ publishVideo: false }).then(data => {
              dispatch({
                type: 'START_STREAM',
                currentState: data
              });
            })
          }
        } else {
          console.log('3')
          otCore.toggleLocalAudio(false)
        }
      }
    }
  });

  otCore.on('connectionCreated', (data) => {
    console.log('connectionCreated', data);
    dispatch({
      type: 'ADD_OPEN_TOK_CONNECTION',
      connection: data.connection
    });
  })

  otCore.on('connectionDestroyed', (data) => {
    console.log('connectionDestroyed', data);
    dispatch({
      type: 'REMOVE_OPEN_TOK_CONNECTION',
      connection: data.connection
    });
  })

  otCore.getSession().connections.forEach(connection => {
    dispatch({
      type: 'ADD_OPEN_TOK_CONNECTION',
      connection
    });
  });

  dispatch({
    type: 'ADD_OWN_OPEN_TOK_CONNECTION',
    connection: otCore.getSession().connection
  })

  const yourConnectionId = otCore.getSession().connection.id;
  emitJoinStream({
    connectionId: yourConnectionId,
    username: getUsername(getState().auth),
    lectureId: getState().liveLecture.lectureId
  })
}

const getOTCoreOptions = (sessionId, token, userType) => {
  return {
    credentials: {
      apiKey: streamConfig.API_KEY,
      sessionId,
      token,
    },
    // A container can either be a query selector or an HTML Element
    streamContainers(pubSub, type, data, stream) {
      if (userType === 'teacher') {
        return {
          publisher: {
            camera: '#cameraPublisherContainer',
            screen: '#screenPublisherContainer',
          },
          subscriber: {
            camera: '#cameraSubscriberContainer',
            screen: '#screenSubscriberContainer',
          },
        }[pubSub][type];
      } else {
        return {
          publisher: {
            camera: '#cameraPublisherContainer',
            screen: '#screenPublisherContainer',
          },
          subscriber: {
            camera: '#cameraSubscriberContainer',
            screen: '#screenSubscriberContainer',
          },
        }[pubSub][type];
      }
    },
    controlsContainer: '#controls',
    packages: ['screenSharing', 'annotation'],
    communication: {
      callProperties: null, // Using default
      autoSubscribe: true,
      subscribeOnly: false,
    },
    screenSharing: {
      extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
      // annotation: true,
      externalWindow: false,
      dev: true,
      screenProperties: {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        showControls: true,
        style: {
          buttonDisplayMode: 'off',
        },
        videoSource: 'window',
        fitMode: 'contain', // Using default
      },
    },
    // annotation: {
    //   absoluteParent: {
    //     publisher: '.App-video-container',
    //     subscriber: '.App-video-container',
    //   },
    // },
  };
};

const htmlToElement = (html) => {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const cameraPublisherContainerCheck = (getState) => {
  const appContainer = document.getElementById('App-video-container');
  if (appContainer) {
    const existed = appContainer.querySelector("#cameraPublisherContainer") != null;
    console.log('cameraPublisherContainerCheck existed', existed)
    if (!existed) {
      appContainer.appendChild(htmlToElement(` <div
            id="cameraPublisherContainer"
            class="video-container"
            ${getState().liveLecture.stream.sessionInfo
          && getState().liveLecture.stream.sessionInfo.role === 'publisher'
          ? 'style="display: none;"'
          : ''}
          />`))
    }
  }
}

const cameraSubscriberContainerCheck = (getState) => {
  const appContainer = document.getElementById('App-video-container');
  if (appContainer) {
    const existed = appContainer.querySelector("#cameraSubscriberContainer") != null;
    console.log('cameraPublisherContainerCheck existed', existed)
    if (!existed) {
      appContainer.appendChild(htmlToElement(` <div
            id="cameraSubscriberContainer"
            class="video-container"
            ${getState().liveLecture.stream.sessionInfo
          && getState().liveLecture.stream.sessionInfo.role === 'moderator'
          ? 'style="display: none;"'
          : ''}
          />`))
    }
  }
}
