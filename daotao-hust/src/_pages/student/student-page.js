import React from 'react';
import { connect } from 'react-redux';
import StudentMenu from '../../_components/student/container/StudentMenu';
import { studentMenuItems } from '../../_constants/student/student-menu-items';
import ConnectedForm from '../../_components/form/Form';
import ConnectedCourseList from '../../_components/student/main/CourseList';
import ConnectedReferenceProject
  from '../../_components/student/main/ReferenceProject';
import ConnectedUserProject from '../../_components/student/main/UserProject';
import ConnectedTopicList from '../../_components/student/main/TopicList';
import ConnectedRegisterInstructor
  from '../../_components/student/main/RegisterInstructor';
import MyContainer from '../../_components/student/container/StudentContainer';
import { Container } from 'semantic-ui-react';

class Student extends React.Component {
  componentDidMount() {

  }

  render() {
    const { activeMenuItem } = this.props;
    return (
      <MyContainer>
        <Container fluid style={{ paddingLeft: '1%', paddingRight: '1%' }}>
          <StudentMenu />
          {activeMenuItem === studentMenuItems.COURSE_LIST
            ? <ConnectedCourseList />
            : null}
          {activeMenuItem === studentMenuItems.FORM ? <ConnectedForm /> : null}
          {activeMenuItem === studentMenuItems.REFERENCE_PROJECT ?
            <ConnectedReferenceProject /> : null}
          {activeMenuItem === studentMenuItems.USER_PROJECT
            ? <ConnectedUserProject />
            : null}
          {activeMenuItem === studentMenuItems.TOPIC_LIST ?
            <ConnectedTopicList /> : null}
          {activeMenuItem === studentMenuItems.REGISTER_INSTRUCTOR ?
            <ConnectedRegisterInstructor /> : null}
        </Container>
      </MyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { activeMenuItem: state.menu.activeMenuItem };
};

export default connect(mapStateToProps, null)(Student);