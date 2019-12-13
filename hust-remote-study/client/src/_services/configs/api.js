import { newServiceUrl, servicePort, serviceUrl } from '../../_constants';

export const getHeaders = {
    getMultipartHeaders: () => ({
      'Content-Type': 'multipart/form-data',
    }),
    getHeaders: () => ({
      'Content-Type': 'application/json',
    }),
// 'Authorization': `Bearer ${auth.getAccessToken()}`
  }
;

export const lectureUrl = {
  lectureById: id => `${serviceUrl}:${servicePort}/api/lectures/${id}`,
  lectures: `${serviceUrl}:${servicePort}/api/lectures/`,
  getTopicInfo:
    id => `${newServiceUrl}/api?action=getTopicById&topicId=${id}`,
  addSlide: id => `${serviceUrl}:${servicePort}/api/lectures/${id}/addSlide`
};

export const actionUrl = {
  actionsByLectureId:
    lectureId => `${serviceUrl}:${servicePort}/api/actions?lectureId=${lectureId}`,
};

export const classUrl = {
  classesById: id => `${serviceUrl}:${servicePort}/api/classes/${id}`,
  classesByTeacherId:
    teacherId => `${serviceUrl}:${servicePort}/api/classes?teacherId=${teacherId}`,
  classesByStudentId:
    studentId => `${serviceUrl}:${servicePort}/api/classes?studentId=${studentId}`,
};