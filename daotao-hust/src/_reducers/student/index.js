import { combineReducers } from 'redux';
import course from './course-reducer';
import forms from './form-reducer';
import projectRef from './project-ref-reducer';
import studentProjects from './student-projects-reducer';
import topics from './topics-reducer';

export default combineReducers({
  course,
  forms,
  projectRef,
  studentProjects,
  topics,
});