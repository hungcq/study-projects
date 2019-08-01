import React, { Component } from 'react';
import { Container, Divider, Grid, Icon, Image } from 'semantic-ui-react';
import ProfileModal from '../sub/ProfileModal';
import ChangePasswordModal from '../sub/ChangePasswordModal';
import { doUseModal } from '../../../_actions/modal-actions';
import { connect } from 'react-redux';
import { modalTypes } from '../../../_constants/modal-types';
import { studentMenuItems } from '../../../_constants/student/student-menu-items';
import { doLogout } from '../../../_actions';

class MyContainer extends Component {
  state = { modalOpen: false };

  handleClose = () => this.props.useModal(modalTypes.NONE);

  logout = () => this.props.logout();

  render() {
    const { children, modalType, useModal } = this.props;
    return (
      <div>
        <div id="approot">
          <Container fluid style={{
            position: 'absolute !important',
            zIndex: '99',
            backgroundColor: '#F1F1F1',
            paddingLeft: '4%',
            paddingRight: '4%',
            paddingTop: '2%',
            paddingBottom: '2%',
          }}
          >
            <div>
              <Container fluid style={{ backgroundColor: 'white' }}>
                <ProfileModal handleClose={this.handleClose}
                  modelOpen={modalType === modalTypes.PROFILE}
                />
                <ChangePasswordModal handleClose={this.handleClose}
                  modelOpen={modalType ===
                    modalTypes.CHANGE_PASSWORD}
                />

                <ChangePasswordModal handleClose={this.handleClose}
                  modelOpen={this.state.modalOpen}
                />
                <Container textAlign="right" fluid style={{
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  paddingTop: '1%',
                }}
                >
                  {/*<Image*/}
                  {/*src="https://www.yueimg.com/en/images/common/avatar.b6a87.png"*/}
                  {/*href="#"*/}
                  {/*size="mini"*/}
                  {/*/>*/}
                  <a onClick={() => useModal(modalTypes.PROFILE)}
                    href="#"
                  >
                    <Icon name="user" />
                    Chử Quốc Hưng
                  </a>
                  <a onClick={() => useModal(modalTypes.CHANGE_PASSWORD)}
                    href="#"
                  >
                    - Đổi mật khẩu -
                  </a>
                  <a onClick={() => { }}
                    href="#"
                  >
                    <Icon name="facebook square" color="blue" />
                  </a>
                  <a
                    href="#"
                  >-
                  </a>
                  <a onClick={() => { }}
                    href="#"
                  >
                    <Icon name="google" color="red" />
                  </a>
                  <a onClick={this.logout}
                    href="#"
                  >
                    - Đăng xuất
                  </a>
                  <Divider />
                </Container>

                <Container fluid
                  style={{ paddingLeft: '1%', paddingRight: '1%' }}
                >
                  <Grid>
                    <Grid.Column>
                      <Image
                        src="http://daotao.soict.hust.edu.vn/images/logo.png"
                      />
                    </Grid.Column>
                    <Grid.Column width={15} verticalAlign="bottom">
                      <div style={{ fontSize: '1.2em', marginBottom: '3px' }}>HỆ
                        THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
                      </div>
                      <div style={{ fontSize: '0.9em' }}>VIỆN CÔNG NGHỆ THÔNG TIN
                        VÀ TRUYỀN THÔNG
                      </div>
                    </Grid.Column>
                  </Grid>
                  <Divider />
                </Container>
                {children}
                <Container fluid style={{
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  paddingBottom: '1%',
                }}
                >
                  <Divider />
                  <Grid>
                    <Grid.Column width={1} style={{ marginRight: '-3%' }}>
                      <Image
                        src="http://daotao.soict.hust.edu.vn/images/logo.png"
                        size="mini"
                      />
                    </Grid.Column>
                    <Grid.Column width={15} verticalAlign="bottom">
                      <div style={{ marginBottom: '3px' }}>
                        Hệ thống do Viện CNTT&TT thiết kế & phát triển.
                      </div>
                      <div>
                        Các thắc mắc cần hỗ trợ xin vui lòng gửi mail đến địa
                        chỉ <a>hungnt@soict.hust.edu.vn</a>
                      </div>
                    </Grid.Column>
                  </Grid>
                </Container>
              </Container>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { modalType: state.modal.modalType };
};

const mapDispatchToProps = (dispatch) => ({
  useModal: (modalType) => dispatch(doUseModal(modalType)),
  logout: () => dispatch(doLogout()),
});

const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(MyContainer);
export default StudentContainer;