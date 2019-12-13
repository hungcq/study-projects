import {
  liveLectureActionTypes,
  replayActionTypes,
  roomActionTypes,
  servicePort,
  serviceUrl,
} from '../_constants';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { lectureService } from '../_services';
import { getSlideType } from '../_utils';

export const doStartReplay = data => {
  NotificationManager.info(`The lecture started.`);
  return {
    type: replayActionTypes.START,
    data,
  };
};

export const doStopReplay = data => (dispatch, getState) => {
  NotificationManager.info(`The lecture stopped.`);
  dispatch({
    type: replayActionTypes.STOP,
    data,
  });
};

export const doJoinReplay = data => dispatch => {
  NotificationManager.info(`${data.username} joined.`);

  dispatch({
    type: replayActionTypes.JOIN,
    data,
  });
};

export const doLeaveReplay = data => dispatch => {
  NotificationManager.info(`${data.username} left.`);
  dispatch({
    type: replayActionTypes.LEAVE,
    data,
  });
};

export const doPerformActionReplay = data => (dispatch, getState) => {
  if (data.actionType === roomActionTypes.RAISE_HAND) {
    NotificationManager.info(`${data.username} raised hand.`);
  }
  dispatch({
    type: replayActionTypes.ACT,
    data,
  });
};

export const doGetLectureInfoReplay = lectureId => (dispatch, getState) => {
  const isElearning = getState().auth.accessToken === 'elearning';
  if (isElearning) {
    lectureService.getTopicInfo(lectureId)
      .then(response => {
        if (response.data && response.data.data && response.data.data.documents) {
          dispatch({
            type: liveLectureActionTypes.GET_LECTURE_INFO,
            data: {
              documentList: response.data.data.documents.map(item => {
                return {
                  ...item,
                  slideType: getSlideType(item.url),
                };
              }),
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.error) {
          // NotificationManager.error(error.response.data.error);
        }
      })
      .then(() => {
        // always executed
      });
  } else {
    lectureService.getById(lectureId)
      .then(response => {
        if (response.data) {
          dispatch({
            type: replayActionTypes.GET_LECTURE_INFO,
            data: {
              documentList: response.data.slideUrl,
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.error) {
          NotificationManager.error(error.response.data.error);
        }
      })
      .then(() => {
        // always executed
      });
  }
};

export const doClearStateReplay = () => dispatch => {
  dispatch({
    type: replayActionTypes.CLEAR_STATE,
  });
};

export const doGetStreamsInfoReplay = (lectureId) => dispatch => {
  const options = {
    method: 'get',
    url: `${serviceUrl}:${servicePort}/api/lectures/${lectureId}/streams`,
    headers: {},
  };
  axios(options)
    .then((res) => {
      console.log(res.data);
      if (res.data.error) {
        NotificationManager.error(res.data.error);
      } else {
        dispatch({
          type: 'RECEIVE_REPLAY_STREAM',
          stream: res.data,
        });
      }
    });
};