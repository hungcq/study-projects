import { authService, lectureService } from '../_services';
import { authActionTypes, localStorageKeys } from '../_constants';
import history from '../_utils/history';
import { emitStartLecture } from '../_utils/socket';

export const doLogin = () => {
  return dispatch => authService.loginSSO().then((res) => {
    if (res.data) window.location.href = res.data;
  });
};

export const loginElearning = (username, password, lectureId) => {
  return dispatch => authService.loginElearning(username, password, lectureId).
    then((res) => {
      if (!res.data || res.data.status !== 1 || !res.data.data ||
        !res.data.data.id || !res.data.data.id === '') {
        alert('Invalid Elearning credentials');
      } else if (!res.data.data.permissions) {
        console.log('elearning login data', res.data.data);
        alert('You do not have permission to join this lecture');
      } else {
        localStorage.setItem(localStorageKeys.LOGIN_DATA,
          JSON.stringify(res.data.data));
        lectureService.getTopicInfo(lectureId).then(topicInfoRes => {
          if (topicInfoRes.data && topicInfoRes.data.data &&
            topicInfoRes.data.data.courseId) {
            if (!res.data.data.permissions[topicInfoRes.data.data.courseId]) {
              alert('You do not have permission to join this lecture');
              return;
            }
            dispatch(doGetLoginData({
              user_info: res.data.data,
              access_token: 'elearning',
              accounTypeElearning: res.data.data.permissions[topicInfoRes.data.data.courseId]
                ? res.data.data.permissions[topicInfoRes.data.data.courseId].roleType
                : 0,
            }));
            localStorage.setItem(lectureId + 'accountId', res.data.data.id);
            localStorage.setItem(lectureId + 'courseId', topicInfoRes.data.data.courseId);
            console.log('elearning login data', res.data.data);
            emitStartLecture({
              lectureId,
              username: res.data.data.id,
              elearning: true,
            });
          } else {
            alert('No data of this topic');
          }
        }).catch(error => {
          console.log(error);
          alert('No data of this topic');
          // if (error.response && error.response.data && error.response.data.error) {
          // NotificationManager.error(error.response.data.error);
          // }
        }).then(() => {
          // always executed
        });
      }
    });
};

export const doLogout = (ssoToken) => {
  console.log('doLogout', ssoToken)
  if (ssoToken && ssoToken !== 'elearning') {
    authService.logoutSSO(ssoToken).then((res) => {
      if (res.data) {
        console.log(res.data)
      }
    });
  }
  localStorage.removeItem(localStorageKeys.LOGIN_DATA);
  history.push('/login');
  return {
    type: authActionTypes.LOGOUT,
  };
};

export const doGetAuthInfo = (tempToken) => {
  return dispatch => authService.loginSSO(tempToken).then((res) => {
    localStorage.setItem(localStorageKeys.LOGIN_DATA, JSON.stringify(res.data));
    dispatch(doGetLoginData(res.data));
  });
};

export const doGetLoginData = (loginData) => {
  return {
    type: authActionTypes.GET_LOGIN_DATA,
    data: !loginData ? null : loginData.user_info,
    accessToken: !loginData ? null : loginData.access_token,
    accounTypeElearning: loginData.accounTypeElearning,
  };
};