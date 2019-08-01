import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { doSelectMenuItem } from '../../../_actions/menu-actions';
import { studentMenuItems } from '../../../_constants/student/student-menu-items';
import { connect } from 'react-redux';

class MyMenu extends Component {
  render() {
    const { activeMenuItem, selectMenuItem } = this.props;
    return (
      <Menu stackable>
        <Dropdown item text="Đồ án">
          <Dropdown.Menu>
            <Dropdown.Item
              active={activeMenuItem === studentMenuItems.USER_PROJECT}
              onClick={() => selectMenuItem(studentMenuItems.USER_PROJECT)}
            >
              Danh sách Đồ án
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === studentMenuItems.REGISTER_INSTRUCTOR}
              onClick={() => selectMenuItem(studentMenuItems.REGISTER_INSTRUCTOR)}
            >
              Đăng ký Giáo viên
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === studentMenuItems.REFERENCE_PROJECT}
              onClick={() => selectMenuItem(studentMenuItems.REFERENCE_PROJECT)}
            >
              Đồ án Tham khảo
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === studentMenuItems.TOPIC_LIST}
              onClick={() => selectMenuItem(studentMenuItems.TOPIC_LIST)}
            >
              Định hướng đề tài
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          active={activeMenuItem === studentMenuItems.FORM}
          onClick={() => selectMenuItem(studentMenuItems.FORM)}
        >
          Biểu mẫu
        </Menu.Item>
        <Menu.Item
          active={activeMenuItem === studentMenuItems.COURSE_LIST}
          onClick={() => selectMenuItem(studentMenuItems.COURSE_LIST)}
        >
          Học phần
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  activeMenuItem: state.menu.activeMenuItem,
});

const mapDispatchToProps = (dispatch) => ({
  selectMenuItem: menuItem => dispatch(doSelectMenuItem(menuItem)),
});

const StudentMenu = connect(mapStateToProps, mapDispatchToProps)(MyMenu);
export default StudentMenu;