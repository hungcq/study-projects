import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { doSelectMenuItem } from '../../../_actions/menu-actions';
import { lecturerMenuItems } from '../../../_constants/lecturer/lecturer-menu-items';
import { connect } from 'react-redux';

class MyMenu extends Component {
  state = {
    dropdownOpen: false,
  };

  handleChange = () => {
    this.setState({dropdownOpen: false});
  };

  render () {
    const {activeMenuItem, selectMenuItem} = this.props;
    const {dropdownOpen} = this.state;
    return (
      <Menu stackable>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.TEACHING}
          onClick={() => selectMenuItem(lecturerMenuItems.TEACHING)}
        >
          Giảng Dạy
        </Menu.Item>
        <Dropdown item text="Đồ Án">
          <Dropdown.Menu open={false}>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.PROJECT_GRADUATE}
              onClick={() => selectMenuItem(lecturerMenuItems.PROJECT_GRADUATE)}
            >
              Đồ án Tốt nghiệp
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.PROJECT_STUDY}
              onClick={() => selectMenuItem(lecturerMenuItems.PROJECT_STUDY)}
            >
              Đồ án Môn học
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.PROJECT_THESIS}
              onClick={() => selectMenuItem(lecturerMenuItems.PROJECT_THESIS)}
            >
              Luận văn ThS/TS
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.PROJECT_TOPIC_LIST}
              onClick={() => selectMenuItem(
                lecturerMenuItems.PROJECT_TOPIC_LIST)}
            >
              Danh sách đề tài
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.PROJECT_REGISTER}
              onClick={() => selectMenuItem(lecturerMenuItems.PROJECT_REGISTER)}
            >
              Nguyện vọng Đồ án
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.SUBJECT}
          onClick={() => selectMenuItem(lecturerMenuItems.SUBJECT)}
        >
          Môn Học
        </Menu.Item>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.DOCUMENT}
          onClick={() => selectMenuItem(lecturerMenuItems.DOCUMENT)}
        >
          Tài Liệu
        </Menu.Item>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.CADRES}
          onClick={() => selectMenuItem(lecturerMenuItems.CADRES)}
        >
          Cán Bộ
        </Menu.Item>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.STUDENT_LIST}
          onClick={() => selectMenuItem(lecturerMenuItems.STUDENT_LIST)}
        >
          Sinh Viên
        </Menu.Item>
        <Dropdown item text="Quản Trị">
          <Dropdown.Menu>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_DEPARTMENT}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_DEPARTMENT)}
            >
              Danh sách đơn vị
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_TITLE}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_TITLE)}
            >
              Danh sách chức danh
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_POSITION}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_POSITION)}
            >
              Danh sách chức vụ
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_PROGRAM}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_PROGRAM)}
            >
              Chương trình đào tạo
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_FIELD_OF_STUDY}
              onClick={() => selectMenuItem(
                lecturerMenuItems.ADMIN_FIELD_OF_STUDY)}
            >
              Quản lý chuyên ngành
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_CLASS_SIZE}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_CLASS_SIZE)}
            >
              Hệ số quy mô lớp
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_TIME}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_TIME)}
            >
              Loại giờ
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_DEADLINE}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_DEADLINE)}
            >
              Quản lý deadline
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_SEMESTER}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_SEMESTER)}
            >
              Quản lý học kỳ
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.ADMIN_LOG}
              onClick={() => selectMenuItem(lecturerMenuItems.ADMIN_LOG)}
            >
              Log hệ thống
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Kê Khai">
          <Dropdown.Menu>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.LISTING_TEACHING}
              onClick={() => selectMenuItem(lecturerMenuItems.LISTING_TEACHING)}
            >
              Khối lượng giảng dạy
            </Dropdown.Item>
            <Dropdown.Item
              active={activeMenuItem === lecturerMenuItems.LISTING_CLASS}
              onClick={() => selectMenuItem(lecturerMenuItems.LISTING_CLASS)}
            >
              Lớp thi
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          active={activeMenuItem === lecturerMenuItems.STATISTIC}
          onClick={() => selectMenuItem(lecturerMenuItems.STATISTIC)}
        >
          Thống Kê
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

const LecturerMenu = connect(mapStateToProps, mapDispatchToProps)(MyMenu);
export default LecturerMenu;