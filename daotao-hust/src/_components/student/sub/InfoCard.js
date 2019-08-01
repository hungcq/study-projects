import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import '../Styles.css';
import { doUseModal } from '../../../_actions/modal-actions';
import { connect } from 'react-redux';
import { modalTypes as modelTypes } from '../../../_constants/modal-types';
import { doSelectMenuItem } from '../../../_actions/menu-actions';
import { studentMenuItems } from '../../../_constants/student/student-menu-items';
import { doLogin } from '../../../_actions';

class MyInfoCard extends Component {
  componentDidMount () {
    // this.props.login();
  }

  render () {
    const {userInfo} = this.props;
    return (
      <Card color='grey' fluid>
        <Card.Content header='THÔNG TIN CÁ NHÂN'/>
        <Card.Content
          onClick={() => console.log('CARD CONTENT CLICKED')}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Mã số : {userInfo.id}
        </Card.Content>
        <Card.Content>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Họ tên : {userInfo.fullName}
        </Card.Content>
        <Card.Content>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Email : {userInfo.email}
        </Card.Content>
        <Card.Content>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Điện thoại : {userInfo.phoneNumber}
        </Card.Content>
      </Card>
    );
  }
}

class MyFunctionCard extends Component {

  onItemClicked = (modelType) => {
    this.props.useModal(modelType);
  };

  selectMenu = menuItem => {
    this.props.selectMenuItem(menuItem);
  };

  render () {
    return (
      <Card color='grey' fluid>
        <Card.Content
          header='THAO TÁC HỆ THỐNG'/>
        <Card.Content
          id='clickable'
          onClick={() => this.onItemClicked(modelTypes.PROFILE)}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Cập nhật thông tin cá nhân
        </Card.Content>
        <Card.Content
          id='clickable'
          onClick={() => this.selectMenu(studentMenuItems.USER_PROJECT)}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Danh sách đồ án
        </Card.Content>
        <Card.Content
          id='clickable'
          onClick={() => this.selectMenu(studentMenuItems.REGISTER_INSTRUCTOR)}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Nguyện vọng đồ án
        </Card.Content>
        <Card.Content
          id='clickable'
          onClick={() => this.selectMenu(studentMenuItems.REFERENCE_PROJECT)}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Đồ án tham khảo
        </Card.Content>
        <Card.Content
          id='clickable'
          onClick={() => this.onItemClicked(modelTypes.CHANGE_PASSWORD)}>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Đổi password
        </Card.Content>
        <Card.Content
          id='clickable'>
          <Icon name="list ul"/>
          &nbsp;&nbsp;&nbsp;Đăng xuất
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  useModal: modalType => dispatch(doUseModal(modalType)),
  selectMenuItem: menuItem => dispatch(doSelectMenuItem(menuItem)),
  login: () => dispatch(doLogin('20142137', 'hung1996')),
});

export const FunctionCard = connect(mapStateToProps, mapDispatchToProps)(
  MyFunctionCard);

export const InfoCard = connect(mapStateToProps, mapDispatchToProps)(MyInfoCard);