import React, { Component } from 'react';
import { Container, Divider, Grid, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

class MyContainer extends Component {

  render () {
    const {children, modalType, useModal} = this.props;
    return (
      <div>
        <div id="approot" style={{
          // backgroundColor: 'grey',
          // paddingLeft: '1%',
          // paddingRight: '1%'
        }}
        >
          <Container fluid style={{
            position: 'absolute !important',
            zIndex: '99',
            backgroundColor: 'white',
          }}
          >
            <div>
              <Container fluid style={{paddingLeft: '5%', paddingRight: '3%'}}>
                <Container textAlign="right" fluid>
                  <Image
                    src="https://www.yueimg.com/en/images/common/avatar.b6a87.png"
                    href="#"
                    size="mini"
                  />
                  <a onClick={() => {}}
                     href="#"
                  >
                    <Icon name="user"/>
                    Chử Quốc Hưng
                  </a>
                  <a onClick={() => {}}
                     href="#"
                  >
                    - Đổi mật khẩu -
                  </a>
                  <a onClick={() => { }}
                     href="#"
                  >
                    <Icon name="facebook square" color="blue"/>
                  </a>
                  <a
                    href="#"
                  >-
                  </a>
                  <a onClick={() => { }}
                     href="#"
                  >
                    <Icon name="google" color="red"/>
                  </a>
                </Container>
                <Container fluid>
                  <Grid>
                    <Grid.Column width={2}>
                      <Image
                        src='https://chemeng-hust.appspot.com/images/HUST-60-years.png'
                        size='small'/>
                    </Grid.Column>
                    <Grid.Column width={14} verticalAlign='bottom' style={{marginLeft: '-30px'}}>
                      <div style={{fontSize: '1.2em', marginBottom: '3px'}}>HỆ
                        THỐNG QUẢN LÝ GIẢNG DẠY, ĐỒ ÁN VÀ DỊCH VỤ TRỰC TUYẾN
                      </div>
                      <div style={{fontSize: '0.9em'}}>VIỆN KỸ THUẬT HOÁ HỌC
                      </div>
                    </Grid.Column>
                  </Grid>
                </Container>
                <Divider/>
                {children}
              </Container>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

const LecturerContainer = connect(null, null)(MyContainer);
export default LecturerContainer;