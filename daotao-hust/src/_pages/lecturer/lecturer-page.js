import React from 'react';
import { connect } from 'react-redux';
import LecturerContainer from '../../_components/lecturer/container/LecturerContainer';
import LecturerMenu from '../../_components/lecturer/container/LecturerMenu';
import { lecturerMenuItems } from '../../_constants/lecturer/lecturer-menu-items';
import AdminClassSize from '../../_components/lecturer/main/AdminClassSize';
import AdminDeadline from '../../_components/lecturer/main/AdminDeadline';
import AdminDepartment from '../../_components/lecturer/main/AdminDepartment';
import AdminFieldOfStudy
  from '../../_components/lecturer/main/AdminFieldOfStudy';
import AdminLog from '../../_components/lecturer/main/AdminLog';
import AdminPosition from '../../_components/lecturer/main/AdminPosition';
import AdminProgram from '../../_components/lecturer/main/AdminProgram';
import AdminSemester from '../../_components/lecturer/main/AdminSemester';
import AdminTime from '../../_components/lecturer/main/AdminTime';
import AdminTitle from '../../_components/lecturer/main/AdminTitle';
import Cadres from '../../_components/lecturer/main/Cadres';
import Document from '../../_components/lecturer/main/Document';
import ListingClass from '../../_components/lecturer/main/ListingClass';
import ListingTeaching from '../../_components/lecturer/main/ListingTeaching';
import ProjectGraduate from '../../_components/lecturer/main/ProjectGraduate';
import ProjectRegister from '../../_components/lecturer/main/ProjectRegister';
import ProjectStudy from '../../_components/lecturer/main/ProjectStudy';
import ProjectThesis from '../../_components/lecturer/main/ProjectThesis';
import ProjectTopicList from '../../_components/lecturer/main/ProjectTopicList';
import Statistic from '../../_components/lecturer/main/Statistic';
import StudentList from '../../_components/lecturer/main/StudentList';
import Teaching from '../../_components/lecturer/main/Teaching';
import Subject from '../../_components/lecturer/main/Subject';

class Lecturer extends React.Component {
  componentDidMount() {
    this.props.test();
  }

  render() {
    const { activeMenuItem } = this.props;
    return (
      <LecturerContainer>
        <LecturerMenu />
        {activeMenuItem === lecturerMenuItems.ADMIN_CLASS_SIZE
          ? <AdminClassSize />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_DEADLINE
          ? <AdminDeadline />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_DEPARTMENT
          ? <AdminDepartment />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_FIELD_OF_STUDY
          ? <AdminFieldOfStudy />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_LOG
          ? <AdminLog />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_POSITION
          ? <AdminPosition />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_PROGRAM
          ? <AdminProgram />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_SEMESTER
          ? <AdminSemester />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_TIME
          ? <AdminTime />
          : null}
        {activeMenuItem === lecturerMenuItems.ADMIN_TITLE
          ? <AdminTitle />
          : null}
        {activeMenuItem === lecturerMenuItems.CADRES
          ? <Cadres />
          : null}
        {activeMenuItem === lecturerMenuItems.DOCUMENT
          ? <Document />
          : null}
        {activeMenuItem === lecturerMenuItems.LISTING_CLASS
          ? <ListingClass />
          : null}
        {activeMenuItem === lecturerMenuItems.LISTING_TEACHING
          ? <ListingTeaching />
          : null}
        {activeMenuItem === lecturerMenuItems.PROJECT_GRADUATE
          ? <ProjectGraduate />
          : null}
        {activeMenuItem === lecturerMenuItems.PROJECT_REGISTER
          ? <ProjectRegister />
          : null}
        {activeMenuItem === lecturerMenuItems.PROJECT_STUDY
          ? <ProjectStudy />
          : null}
        {activeMenuItem === lecturerMenuItems.PROJECT_THESIS
          ? <ProjectThesis />
          : null}
        {activeMenuItem === lecturerMenuItems.PROJECT_TOPIC_LIST
          ? <ProjectTopicList />
          : null}
        {activeMenuItem === lecturerMenuItems.STATISTIC
          ? <Statistic />
          : null}
        {activeMenuItem === lecturerMenuItems.STUDENT_LIST
          ? <StudentList />
          : null}
        {activeMenuItem === lecturerMenuItems.SUBJECT
          ? <Subject />
          : null}
        {activeMenuItem === lecturerMenuItems.TEACHING
          ? <Teaching />
          : null}
      </LecturerContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { activeMenuItem: state.menu.activeMenuItem };
};

export default connect(mapStateToProps, null)(Lecturer);