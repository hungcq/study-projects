import {
  liveLectureActionTypes,
  replayActionTypes,
  roomActionTypes,
  routerPaths,
} from '../_constants';
import { lectureService } from '../_services';
import history from '../_utils/history';
import { NotificationManager } from 'react-notifications';
import { getSlideType, getUsername, emitLeaveLecture } from '../_utils';

export const doStartLecture = data => {
  return {
    type: liveLectureActionTypes.START,
    data,
  };
};

export const doStopLecture = data => (dispatch, getState) => {
  const lectureId = getState().liveLecture.lectureId;
  if (lectureId === data.lectureId) {
    history.push(routerPaths.INDEX);
  }
  dispatch({
    type: liveLectureActionTypes.STOP,
    data,
  });
};

export const doJoinLecture = data => (dispatch, getState) => {
  NotificationManager.info(`${data.username} has just joined.`);
  console.log(data);
  console.log(getState());
  if (data.elearning
    && getState().liveLecture.lectureId === data.lectureId
    && getState().auth.userInfo
    && getState().auth.userInfo.id === data.username) {
    localStorage.removeItem(data.lectureId + 'accountId');
    localStorage.removeItem(data.lectureId + 'courseId');
    localStorage.removeItem('LOGIN_DATA');
    // emitLeaveLecture({
    //   lectureId: data.lectureId,
    //   username: data.username,
    // });
    dispatch({
      type: 'LOGOUT',
    });
    dispatch(doClearState());
    return;
  }
  dispatch({
    type: liveLectureActionTypes.JOIN,
    data,
  });
};

export const doLeaveLecture = data => dispatch => {
  NotificationManager.info(`${data.username} has just left.`);
  dispatch({
    type: liveLectureActionTypes.LEAVE,
    data,
  });
};

export const doPerformAction = data => (dispatch, getState) => {
  if (data.actionType === roomActionTypes.RAISE_HAND) {
    NotificationManager.info(`${data.username} has just raised hand.`);
  }
  if (data.error) {
    NotificationManager.error(`${data.error}`);
  } else {
    if ((data.actionType === roomActionTypes.CONTROL_MEDIA ||
      data.actionType === roomActionTypes.DRAW)
      && data.username === getUsername(getState().auth)) {

    } else {
      dispatch({
        type: liveLectureActionTypes.ACT,
        data,
      });
    }
  }
};

export const doSetNumPages = data => dispatch => {
  dispatch({
    type: liveLectureActionTypes.SET_NUM_PAGES,
    data,
  });
  dispatch({
    type: replayActionTypes.SET_NUM_PAGES,
    data,
  });
};

export const doGetLectureInfo = lectureId => (dispatch, getState) => {
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
          NotificationManager.error(error.response.data.error);
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
            type: liveLectureActionTypes.GET_LECTURE_INFO,
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

export const doAddNewSlide = slideUrl => dispatch => {
  NotificationManager.info(`A new document has just been added.`);
  dispatch({
    type: liveLectureActionTypes.UPLOAD_SLIDE,
    data: {
      documentList: slideUrl,
    },
  });
};

export const doClearState = () => (dispatch, getState) => {
  const { otCore } = getState().liveLecture.stream;

  if (otCore) {
    otCore.endCall();
    otCore.disconnect();
  }

  dispatch({
    type: liveLectureActionTypes.CLEAR_STATE,
  });
};

export const doRequestReload = reload => {
  return {
    type: liveLectureActionTypes.REQUEST_RELOAD,
    data: {
      requestReload: reload,
    },
  };
};