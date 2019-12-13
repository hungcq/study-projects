import { accountTypes } from '../_constants';
import { slideTypes } from '../_constants';

export * from './store';
export * from './socket';
export * from './history';

export const getUsername = (auth) => {
  if (auth.accessToken === 'elearning') return auth.userInfo.id;
  switch (auth.accountType) {
    case accountTypes.STUDENT:
      // return auth.userInfo.studentId;
      return `${auth.userInfo.fullName ? auth.userInfo.fullName + '-' : ''}${auth.userInfo.studentId}`;
    case accountTypes.LECTURER:
      // return auth.userInfo.userName;
      return `${auth.userInfo.fullName ? auth.userInfo.fullName + '-' : ''}${auth.userInfo.userName}`;
    default:
      return `Unknown_User${new Date().getTime()}`;
  }
};

export const getSlideType = (url) => {
  const split = url.toLowerCase().split('.');
  let slideType = slideTypes.PDF;
  if (split.length > 0 && split[split.length - 1] === 'pdf') {
    slideType = slideTypes.PDF;
  } else {
    slideType = slideTypes.MEDIA;
  }
  return slideType;
};

export const isStudent = (auth) => {
  return auth.accountType === accountTypes.STUDENT;
};